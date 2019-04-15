#!/usr/bin/env sh

set -e
# build 
npm run docs:build

# move deploy file 
cd docs/.vuepress/dist/ 
mv * ../../../../Seungwoo321.github.io
cd ../../../../Seungwoo321.github.io

# if you are deploying to a custom domain
echo 'blog.devstory.kr' > CNAME

# commit 
DATE=`date`
git add -A
git commit -m "deploy $DATE"


# push
git push -u origin master
