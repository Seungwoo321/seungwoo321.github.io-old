---
front_matter_title: Amazon Linux2 OS에 레드마인을 설치하는 방법
author: Seungwoo Lee
date: 2022-01-20
tags: ["CodeCommit", "trouble shooting", "Redmine"]
description: AWS 코드 커밋(CodeCommit)에 구성된 모든 프로젝트들의 이슈 추적과 코드 리뷰 등을 위해 레드마인(Redmine)을 Amazon Linux2 OS에  설치하는 과정에 대한 기록과 이에 대한 후기입니다.
---

# Amazon Linux2 OS에 레드마인을 설치하는 방법

AWS 코드 커밋(CodeCommit)에 구성된 모든 프로젝트들의 이슈 추적과 코드 리뷰 등을 위해 레드마인(Redmine)을 Amazon Linux2 OS에  설치하는 과정에 대한 기록과 이에 대한 후기입니다.

## 인프라 구성

<img src="./img/redmine_architecture.png" width="100%" height="100%" style="border-radius:50% !important">

레드마인 EC2 인스턴스를 차후에는 프라이빗(private) 환경으로 이동할 것을 고려해서 서브넷을 구성했습니다. 실제 설치는 퍼블릭(public) 서브넷의 EC2에서 진행했습니다.

- vpc x 1(10.200.0.0/16) (redmine-vpc)
- subnet x 4 (redmine-pub-2a, redmine-pub-2c, redmine-pri-2a, redmine-pri-2c )
- 라우팅 테이블 x 2 (redmine-pub-rt, redmine-pri-rt)
- 인터넷 게이트웨이 (redmine-igw)
- route53 - 도메인 추가
- ACM 인증서 발급 - https 서비스를 위해 인증서 발급
- 보안그룹 (redmine-elb-sg, redmine-web-sg)
  - elb: 인바운드 443 포트 any 허용
  - web: 인바운드 80포트 redmine-elb-sg만 허용, 22포트 사무실만 허용
- ELB: 로드밸런서 (REDMINE-ALB), 타겟 그룹(REDMINE-ALB-TG)
  - 80포트는 443으로 리다이렉트 (ACM인증서 사용)
  - 443포트는 EC2 80포트로 포트포워딩
- EC2 (t2.medium, redmine 설치)

## 설치 과정

### 1. 데이터베이스 구성

#### mariadb 설치

```bash
## 설치 및 설정
sudo yum install -y mariadb-server mysql-devel
sudo mysql_secure_installation

## 부팅 자동 실행
sudo systemctl stop mariadb

## 서비스 시작 종료
sudo systemctl start mariadb
sudo systemctl enable mariadb
```

#### 데이터 베이스 생성

```sql
CREATE DATABASE redmine CHARACTER SET utf8;
CREATE USER 'redmine'@'localhost' IDENTIFIED BY 'redmine';
GRANT ALL PRIVILEGES ON redmine.* TO 'redmine'@'localhost';
```

### 2. 종속성 설치

#### 패키지 업데이트 및 설치

```bash
sudo yum -y update 
sudo yum -y install git make gcc-c++ patch libicu-devel readline-devel libxml2-devel libxslt-devel ImageMagick ImageMagick-devel openssl-devel libcurl-devel curl
```

#### ruby 2.5 이후 버전 설치

```bash
# rbenv 설치
git clone https://github.com/rbenv/rbenv.git ~/.rbenv
echo 'export PATH="$HOME/.rbenv/bin:$PATH"' >> ~/.bash_profile
echo 'eval "$(rbenv init -)"' >> ~/.bash_profile
source .bash_profile
git clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build

# ruby 2.7 설치
rbenv install 2.7.5
rbenv global 2.7.5
rbenv rehash
```

### 3. Gem 설치 및 데이터베이스 스키마 생성

```bash
# install 
wget https://www.redmine.org/releases/redmine-4.2.3.tar.gz
tar xvfz redmine-4.2.3.tar.gz
mv redmine-4.2.3 /var/www/
export REDMINE=/var/www/redmine-4.2.3
cd $REDMINE

# database 연결 설정
cp config/database.yml.example config/database.yml
vim config/database.yml

# bundle install
bundle install --without development test
bundle exec rake generate_secret_token

# create database schema
RAILS_ENV=production bundle exec rake db:migrate
RAILS_ENV=production REDMINE_LANG=ko bundle exec rake redmine:load_default_data
```

### 4. 파일 시스템 권한 설정

```bash
mkdir -p tmp tmp/pdf public/plugin_assets
sudo chown -R nginx:nginx files log tmp public/plugin_assets
sudo chmod -R 755 files log tmp public/plugin_assets

# Note: If you have files in these directories (e.g. restore files from backup), make sure these files are not executable.
sudo find files log tmp public/plugin_assets -type f -exec chmod -x {} +
```

### 5. 테스트

```bash
bundle exec rails server webrick -e production
```

- <http://localhost:3000> 으로 접속
  - login: admin
  - password: admin (초기 패스워드)

:::warning
webrick 은 production 으로 적합하지 않으니 그대로 사용하지 않습니다.
:::

### 6. nginx + passenger

production 환경을 위해서 nginx를 설치하는 과정입니다.

```bash
gem install passenger
sudo -s -E
/home/ec2-user/.rbenv/versions/2.7.5/bin/ruby /home/ec2-user/.rbenv/versions/2.7.5/lib/ruby/gems/2.7.0/gems/passenger-6.0.12/bin/passenger-install-nginx-module
```

nginx 시작 및 종료

```bash
# nginx 시작
sudo /opt/nginx/sbin/nginx

# nginx 종료
sudo pkill -9 nginx
```

## 기타 설정

### 레드마인 플러그인 설치

- 설치할 플러그인을 `/var/www/redmine-4.2.3/plugins` 에 위치 시킵니다.
- `/var/www/redmine-4.2.3/` 에서 다음 명령어를 실행 하고 nginx 서비스를 재시작합니다.

```bash
rake redmine:plugins:migrate RAILS_ENV=production
```

### 이메일 서버 설정하기

config 폴더에 있는 예제 파일을 복사하고 sendmail 서비스를 사용하는 설정을 추가합니다. 다른 메일 서버를 설정하려는 경우 공식 문서를 참고해 주세요.

```bash
cp configuration.yml.example configuration.yml
vim configuration.yml
```

```yml
production:
  email_delivery:
    delivery_method: :sendmail
```

## 설치 후기

설치를 진행하면서 크게 두 가지의 어려움이 있었습니다.

첫 번째는 Amazon Linux OS에 루비를 2.5 이후 버전으로 설치하는 부분입니다. 버전 선택은 레드마인 설치 가이드 공식문서에서 "루비(Ruby) 커뮤니티에서 루비 2.5 및 이전 버전에 대한 지원이 종료되었습니다."라는 문구와 "레드마인 4.2는 Ruby 2.7.2 이상을 사용하세요"라는 문구가 있었기 때문에 2.7.5 버전을 선택하게 되었습니다. 다행히도 노드(node.js)의 `nvm`과 같이 루비를 버전별로 관리할 수 있는 `rbenv`을 통해서 해결할 수 있었습니다.

두 번째로는 프로덕션 환경을 위해 webrick을 대신할 서버를 결정하고 설치하는 과정입니다. 설치를 진행하면서 레드마인은 루비로 작성된 MVC 패턴을 이용하는 오픈 소스 웹 프레임워크인 루비 온 레일즈(Ruby on Rails)로 개발되었고 엔지닉스(nginx)로 서비스하기 위해서는 패신저(passenger)를 설치하고 관련 설정을 엔지닉스에 추가해야 된다는 것까지 알게 되었습니다.

그래서 처음으로 시도한 방법이 yum으로 설치한 엔지닉스의 설정 파일에 젬(gem)으로 설치한 패신저에 관한 설정을 추가한 것인데 정상적으로 동작하지 않는 겁니다. 추가 검색을 통해서 yum으로 설치된 엔지닉스는 삭제를 하고 젬을 통해 패신저를 설치할 때 제공되는 옵션으로 엔지닉스를 함께 설치함으로 알 수 없던 패신저 설정이 엔지닉스 설정 파일에 자동 추가되면서 이 문제를 해결할 수 있었습니다.

## 참고링크

- <https://altkeycode.tistory.com/12>
- <https://www.redmine.org/projects/redmine/wiki/RedmineInstall>
- <https://www.redmine.org/projects/redmine/wiki/EmailConfiguration>

<Comment/>
