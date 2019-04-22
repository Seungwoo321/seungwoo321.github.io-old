---
title: Vue.js 프로젝트 개발 환경 구성하기
author: Seungwoo Lee
date: 2019-01-09
description: vue-cli3로 프로젝트를 셋팅하고 eslint, alias, vscode plugin 등의 개발환경을 구성하는 방법을 설명합니다. 
---

Vue.js 프로젝트 개발 환경 구성하기
------------------------------------------


### 개요
* vue-cli3 로 프로젝트를 셋업 한다
* eslint, alias, vscode plugin 등을 설정한다

-----


### 1. nmv 및 node.js 설치
1.1 nvm 설치
```bash
$ 
```
1.2 node.js 설치
```bash
$ 
```


### 2. Vue.js 프로젝트 셋업하기
```bash
$ npm i -g vue-cli3
$ vue create <Project Name>
```

### 3. eslint 설정하기 
`.eslintrc.js`

```javascript
module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ["vue"],
  extends: ["plugin:vue/essential", "@vue/standard"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    indent: ["error", 4],
    "no-tabs": 0
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
```

#### .editorconfig
```bash
[*.{js,jsx,ts,tsx,vue}]
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
insert_final_newline = true
```

### 4. VSCode에서 IntelliSense 사용하기 
vue-cli3 로 셋팅한 프로젝트는 `src` 가 `@` 로 alias 설정이 되어있지만, alias 로 파일을 import 하는 경우 VSCode 내에서 InterlliSense 가 작동하지 않는다. 따라서 다음과 같이 프로젝트 루트에 `jsconfig.json` 를 만든다.  
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
    },
    "sourceMap": true
  },
  "include": [
      "./src/**/*"
],
  "exclude": ["node_modules", "dist"]
}
```


## VS Code 플러그인 관리

#### requirement
* Vetur
* Vue.js Extension Pack
* TSLint Vue
* Sass
* Git History
* GitLens -- Git supercharged
* Korean Language Pack for Visiual Studio Code

#### options
* stylelint
* Color Picker
* Atom Keymap
* ESLint
* Material Syntax - Dark
* Material Icon Theme
* Debugger for Chrome
* Auto Rename Tag
* Auto Close Tag
* npm
* npm Intellisense
* Prettier - Code formatter