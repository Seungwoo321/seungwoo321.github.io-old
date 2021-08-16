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
git add -A
git commit -m "deploy with vuepress script $DATE"
git push -f git@github.com:Seungwoo321/Seungwoo321.github.io.git master:gh-pages

cd -