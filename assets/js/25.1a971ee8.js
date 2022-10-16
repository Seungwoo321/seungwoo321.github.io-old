(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{544:function(s,a,e){s.exports=e.p+"assets/img/redmine_architecture.e46cfcf6.png"},609:function(s,a,e){"use strict";e.r(a);var t=e(45),n=Object(t.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"amazon-linux2-os에-레드마인을-설치하는-방법"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#amazon-linux2-os에-레드마인을-설치하는-방법"}},[s._v("#")]),s._v(" Amazon Linux2 OS에 레드마인을 설치하는 방법")]),s._v(" "),t("p",[s._v("AWS 코드 커밋(CodeCommit)에 구성된 모든 프로젝트들의 이슈 추적과 코드 리뷰 등을 위해 레드마인(Redmine)을 Amazon Linux2 OS에  설치하는 과정에 대한 기록과 이에 대한 후기입니다.")]),s._v(" "),t("h2",{attrs:{id:"인프라-구성"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#인프라-구성"}},[s._v("#")]),s._v(" 인프라 구성")]),s._v(" "),t("img",{staticStyle:{"border-radius":"50% !important"},attrs:{src:e(544),width:"100%",height:"100%"}}),s._v(" "),t("p",[s._v("레드마인 EC2 인스턴스를 차후에는 프라이빗(private) 환경으로 이동할 것을 고려해서 서브넷을 구성했습니다. 실제 설치는 퍼블릭(public) 서브넷의 EC2에서 진행했습니다.")]),s._v(" "),t("ul",[t("li",[s._v("vpc x 1(10.200.0.0/16) (redmine-vpc)")]),s._v(" "),t("li",[s._v("subnet x 4 (redmine-pub-2a, redmine-pub-2c, redmine-pri-2a, redmine-pri-2c )")]),s._v(" "),t("li",[s._v("라우팅 테이블 x 2 (redmine-pub-rt, redmine-pri-rt)")]),s._v(" "),t("li",[s._v("인터넷 게이트웨이 (redmine-igw)")]),s._v(" "),t("li",[s._v("route53 - 도메인 추가")]),s._v(" "),t("li",[s._v("ACM 인증서 발급 - https 서비스를 위해 인증서 발급")]),s._v(" "),t("li",[s._v("보안그룹 (redmine-elb-sg, redmine-web-sg)\n"),t("ul",[t("li",[s._v("elb: 인바운드 443 포트 any 허용")]),s._v(" "),t("li",[s._v("web: 인바운드 80포트 redmine-elb-sg만 허용, 22포트 사무실만 허용")])])]),s._v(" "),t("li",[s._v("ELB: 로드밸런서 (REDMINE-ALB), 타겟 그룹(REDMINE-ALB-TG)\n"),t("ul",[t("li",[s._v("80포트는 443으로 리다이렉트 (ACM인증서 사용)")]),s._v(" "),t("li",[s._v("443포트는 EC2 80포트로 포트포워딩")])])]),s._v(" "),t("li",[s._v("EC2 (t2.medium, redmine 설치)")])]),s._v(" "),t("h2",{attrs:{id:"설치-과정"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#설치-과정"}},[s._v("#")]),s._v(" 설치 과정")]),s._v(" "),t("h3",{attrs:{id:"_1-데이터베이스-구성"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-데이터베이스-구성"}},[s._v("#")]),s._v(" 1. 데이터베이스 구성")]),s._v(" "),t("h4",{attrs:{id:"mariadb-설치"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mariadb-설치"}},[s._v("#")]),s._v(" mariadb 설치")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## 설치 및 설정")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" yum "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" -y mariadb-server mysql-devel\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" mysql_secure_installation\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## 부팅 자동 실행")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" systemctl stop mariadb\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("## 서비스 시작 종료")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" systemctl start mariadb\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" systemctl "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("enable")]),s._v(" mariadb\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br")])]),t("h4",{attrs:{id:"데이터-베이스-생성"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#데이터-베이스-생성"}},[s._v("#")]),s._v(" 데이터 베이스 생성")]),s._v(" "),t("div",{staticClass:"language-sql line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-sql"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("CREATE")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("DATABASE")]),s._v(" redmine "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("CHARACTER")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("SET")]),s._v(" utf8"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("CREATE")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("USER")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'redmine'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@'localhost'")]),s._v(" IDENTIFIED "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("BY")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'redmine'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("GRANT")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ALL")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("PRIVILEGES")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("ON")]),s._v(" redmine"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("TO")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'redmine'")]),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("@'localhost'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("h3",{attrs:{id:"_2-종속성-설치"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-종속성-설치"}},[s._v("#")]),s._v(" 2. 종속성 설치")]),s._v(" "),t("h4",{attrs:{id:"패키지-업데이트-및-설치"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#패키지-업데이트-및-설치"}},[s._v("#")]),s._v(" 패키지 업데이트 및 설치")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" yum -y update \n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" yum -y "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("make")]),s._v(" gcc-c++ patch libicu-devel readline-devel libxml2-devel libxslt-devel ImageMagick ImageMagick-devel openssl-devel libcurl-devel "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("curl")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("h4",{attrs:{id:"ruby-2-5-이후-버전-설치"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#ruby-2-5-이후-버전-설치"}},[s._v("#")]),s._v(" ruby 2.5 이후 버전 설치")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# rbenv 설치")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" clone https://github.com/rbenv/rbenv.git ~/.rbenv\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'export PATH=\"$HOME/.rbenv/bin:$PATH\"'")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">>")]),s._v(" ~/.bash_profile\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("echo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[s._v("'eval \"$(rbenv init -)\"'")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">>")]),s._v(" ~/.bash_profile\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("source")]),s._v(" .bash_profile\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("git")]),s._v(" clone https://github.com/rbenv/ruby-build.git ~/.rbenv/plugins/ruby-build\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# ruby 2.7 설치")]),s._v("\nrbenv "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2.7")]),s._v(".5\nrbenv global "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2.7")]),s._v(".5\nrbenv rehash\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br")])]),t("h3",{attrs:{id:"_3-gem-설치-및-데이터베이스-스키마-생성"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-gem-설치-및-데이터베이스-스키마-생성"}},[s._v("#")]),s._v(" 3. Gem 설치 및 데이터베이스 스키마 생성")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# install ")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("wget")]),s._v(" https://www.redmine.org/releases/redmine-4.2.3.tar.gz\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("tar")]),s._v(" xvfz redmine-4.2.3.tar.gz\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mv")]),s._v(" redmine-4.2.3 /var/www/\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("export")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("REDMINE")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("/var/www/redmine-4.2.3\n"),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("cd")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token variable"}},[s._v("$REDMINE")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# database 연결 설정")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" config/database.yml.example config/database.yml\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("vim")]),s._v(" config/database.yml\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# bundle install")]),s._v("\nbundle "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" --without development "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("test")]),s._v("\nbundle "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exec")]),s._v(" rake generate_secret_token\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# create database schema")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("RAILS_ENV")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("production bundle "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exec")]),s._v(" rake db:migrate\n"),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("RAILS_ENV")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("production "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("REDMINE_LANG")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("ko bundle "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exec")]),s._v(" rake redmine:load_default_data\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br")])]),t("h3",{attrs:{id:"_4-파일-시스템-권한-설정"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-파일-시스템-권한-설정"}},[s._v("#")]),s._v(" 4. 파일 시스템 권한 설정")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mkdir")]),s._v(" -p tmp tmp/pdf public/plugin_assets\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("chown")]),s._v(" -R nginx:nginx files log tmp public/plugin_assets\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("chmod")]),s._v(" -R "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("755")]),s._v(" files log tmp public/plugin_assets\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# Note: If you have files in these directories (e.g. restore files from backup), make sure these files are not executable.")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("find")]),s._v(" files log tmp public/plugin_assets -type f -exec "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("chmod")]),s._v(" -x "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" +\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br")])]),t("h3",{attrs:{id:"_5-테스트"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-테스트"}},[s._v("#")]),s._v(" 5. 테스트")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("bundle "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[s._v("exec")]),s._v(" rails server webrick -e production\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("ul",[t("li",[t("a",{attrs:{href:"http://localhost:3000",target:"_blank",rel:"noopener noreferrer"}},[s._v("http://localhost:3000"),t("OutboundLink")],1),s._v(" 으로 접속\n"),t("ul",[t("li",[s._v("login: admin")]),s._v(" "),t("li",[s._v("password: admin (초기 패스워드)")])])])]),s._v(" "),t("div",{staticClass:"custom-block warning"},[t("p",{staticClass:"custom-block-title"},[s._v("WARNING")]),s._v(" "),t("p",[s._v("webrick 은 production 으로 적합하지 않으니 그대로 사용하지 않습니다.")])]),s._v(" "),t("h3",{attrs:{id:"_6-nginx-passenger"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_6-nginx-passenger"}},[s._v("#")]),s._v(" 6. nginx + passenger")]),s._v(" "),t("p",[s._v("production 환경을 위해서 nginx를 설치하는 과정입니다.")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("gem "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("install")]),s._v(" passenger\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" -s -E\n/home/ec2-user/.rbenv/versions/2.7.5/bin/ruby /home/ec2-user/.rbenv/versions/2.7.5/lib/ruby/gems/2.7.0/gems/passenger-6.0.12/bin/passenger-install-nginx-module\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("p",[s._v("nginx 시작 및 종료")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# nginx 시작")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" /opt/nginx/sbin/nginx\n\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("# nginx 종료")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("sudo")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("pkill")]),s._v(" -9 nginx\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("h2",{attrs:{id:"기타-설정"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#기타-설정"}},[s._v("#")]),s._v(" 기타 설정")]),s._v(" "),t("h3",{attrs:{id:"레드마인-플러그인-설치"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#레드마인-플러그인-설치"}},[s._v("#")]),s._v(" 레드마인 플러그인 설치")]),s._v(" "),t("ul",[t("li",[s._v("설치할 플러그인을 "),t("code",[s._v("/var/www/redmine-4.2.3/plugins")]),s._v(" 에 위치 시킵니다.")]),s._v(" "),t("li",[t("code",[s._v("/var/www/redmine-4.2.3/")]),s._v(" 에서 다음 명령어를 실행 하고 nginx 서비스를 재시작합니다.")])]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[s._v("rake redmine:plugins:migrate "),t("span",{pre:!0,attrs:{class:"token assign-left variable"}},[s._v("RAILS_ENV")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v("production\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h3",{attrs:{id:"이메일-서버-설정하기"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#이메일-서버-설정하기"}},[s._v("#")]),s._v(" 이메일 서버 설정하기")]),s._v(" "),t("p",[s._v("config 폴더에 있는 예제 파일을 복사하고 sendmail 서비스를 사용하는 설정을 추가합니다. 다른 메일 서버를 설정하려는 경우 공식 문서를 참고해 주세요.")]),s._v(" "),t("div",{staticClass:"language-bash line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-bash"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" configuration.yml.example configuration.yml\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("vim")]),s._v(" configuration.yml\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("div",{staticClass:"language-yml line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-yml"}},[t("code",[t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("production")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("email_delivery")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token key atrule"}},[s._v("delivery_method")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("sendmail\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("h2",{attrs:{id:"설치-후기"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#설치-후기"}},[s._v("#")]),s._v(" 설치 후기")]),s._v(" "),t("p",[s._v("설치를 진행하면서 크게 두 가지의 어려움이 있었습니다.")]),s._v(" "),t("p",[s._v('첫 번째는 Amazon Linux OS에 루비를 2.5 이후 버전으로 설치하는 부분입니다. 버전 선택은 레드마인 설치 가이드 공식문서에서 "루비(Ruby) 커뮤니티에서 루비 2.5 및 이전 버전에 대한 지원이 종료되었습니다."라는 문구와 "레드마인 4.2는 Ruby 2.7.2 이상을 사용하세요"라는 문구가 있었기 때문에 2.7.5 버전을 선택하게 되었습니다. 다행히도 노드(node.js)의 '),t("code",[s._v("nvm")]),s._v("과 같이 루비를 버전별로 관리할 수 있는 "),t("code",[s._v("rbenv")]),s._v("을 통해서 해결할 수 있었습니다.")]),s._v(" "),t("p",[s._v("두 번째로는 프로덕션 환경을 위해 webrick을 대신할 서버를 결정하고 설치하는 과정입니다. 설치를 진행하면서 레드마인은 루비로 작성된 MVC 패턴을 이용하는 오픈 소스 웹 프레임워크인 루비 온 레일즈(Ruby on Rails)로 개발되었고 엔지닉스(nginx)로 서비스하기 위해서는 패신저(passenger)를 설치하고 관련 설정을 엔지닉스에 추가해야 된다는 것까지 알게 되었습니다.")]),s._v(" "),t("p",[s._v("그래서 처음으로 시도한 방법이 yum으로 설치한 엔지닉스의 설정 파일에 젬(gem)으로 설치한 패신저에 관한 설정을 \b추가한 것인데 정상적으로 동작하지 \b않는 겁니다. 추가 검색을 통해서 yum으로 설치된 엔지닉스는 삭제를 하고 젬을 통해 패신저를 설치할 때 제공되는 옵션으로 엔지닉스를 함께 설치함으로 알 수 없던 패신저 설정이 엔지닉스 설정 파일에 자동 추가되면서 이 문제를 해결할 수 있었습니다.")]),s._v(" "),t("h2",{attrs:{id:"참고링크"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#참고링크"}},[s._v("#")]),s._v(" 참고링크")]),s._v(" "),t("ul",[t("li",[t("a",{attrs:{href:"https://altkeycode.tistory.com/12",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://altkeycode.tistory.com/12"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("a",{attrs:{href:"https://www.redmine.org/projects/redmine/wiki/RedmineInstall",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://www.redmine.org/projects/redmine/wiki/RedmineInstall"),t("OutboundLink")],1)]),s._v(" "),t("li",[t("a",{attrs:{href:"https://www.redmine.org/projects/redmine/wiki/EmailConfiguration",target:"_blank",rel:"noopener noreferrer"}},[s._v("https://www.redmine.org/projects/redmine/wiki/EmailConfiguration"),t("OutboundLink")],1)])]),s._v(" "),t("Comment")],1)}),[],!1,null,null,null);a.default=n.exports}}]);