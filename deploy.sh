#!/usr/bin/env sh
DATE=`date`
set -e
rm -rf docs/.vuepress/dist/ 
npm run build
cd docs/.vuepress/dist/ 
echo 'blog.devstory.kr' > CNAME
git init 
git remote add origin https://github.com/Seungwoo321/Seungwoo321.github.io.git
git add -A
git commit -m "deploy $DATE"
git push -f origin master 
