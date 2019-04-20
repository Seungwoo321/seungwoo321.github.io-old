---
title: Development Environment
author: Seungwoo Lee
date: 2019-01-09
description: test


---


# Development Environment

<!-- ## Vue CLI3 Project Setting  -->
<!-- *  -->

## Vue CLI3 Project Config

#### .eslintrc.js
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

#### jsconfig.json
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

## VS Code Installed Plugin

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
* AUto Close Tag
* npm
* npm Intellisense
* Prettier - Code formatter