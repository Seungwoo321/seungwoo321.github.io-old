#!/usr/bin/env sh
DATE=`date`
set -e
# build 
npm run build

# move deploy file 
cd docs/.vuepress/dist/ 
echo 'blog.devstory.kr' > CNAME
git init 
git remote add origin https://github.com/Seungwoo321/Seungwoo321.github.io.git
git add -A
git commit -m "deploy $DATE"
git push -f origin master 
