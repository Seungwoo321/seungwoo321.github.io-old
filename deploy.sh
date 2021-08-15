#!/usr/bin/env sh
DATE=`date`
set -e
rm -rf docs/.vuepress/dist/ 
npm run build
# cp -r static/ docs/.vuepress/dist/
cd docs/.vuepress/dist/
# echo 'blog.devstory.kr' > CNAME
git init 
git config --local user.name "Seungwoo Lee"
git config --local user.email "seungwoo321@gmail.com"
git remote add origin git@github.com:Seungwoo321/vuepress-blog-project.git
git add -A
git commit -m "publish $DATE"
git push -f origin master 
