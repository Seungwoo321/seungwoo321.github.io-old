---
title: VSCode에서 Vue.js 개발 환경 구성하기
author: Seungwoo Lee
date: 2019-01-09
description: Vue CLI 3 로 구성한 프로젝트가 VSCode 에서 Eslint 및 Intellisense 가 정상 작동하기 위해 필요한 플러그인을 소개하고 필요한 환경파일을 구성하는 방법을 정리한다.
---

VSCode에서 Vue.js 개발 환경 구성하기
------------------------------------------
## 개요 
Vue CLI 3 로 구성한 프로젝트가 VSCode 에서 Eslint 및 Intellisense 가 정상 작동하기 위해 필요한 플러그인을 소개하고 필요한 환경파일을 구성하는 방법을 정리한다.


## 요약
1. VSCode 플러그인 ESLint, TSLint Vue, Vetur, vue peek 을 설치한다 
2. `vue create <PROJECT NAME>` 으로 프로젝트를 생성할 때 `ESLint + Standard config` 옵션을 선택한다
3. 프로젝트 루트의 `.eslintrc.js` 의 설정을 수정한다
4. VSCode 의 `setting.json` 에 커스텀 설정을 추가한다
5. 프로젝트 루트의 `jsconfig.json` 의 설정을 구성한다



## 상세 

### 작업 폴더 열기
VSCode의 Intellisense 를 활성화 하기 위해 작업영역의 "폴더 추가"는 프로젝트 디렉토리를 직접 선택한다.

### 플러그인 설치 

VSCode 에서 ESLint 와 Intellisense 활성화 하기 위해 아래 플러그인을 설치한다.

    - ESLint 
    - TSLint Vue
    - Vetur
    - vue peek 

#### .eslintrc.js
vue-cli3 명령어인 `vue create <PROJECT_NAME>` 로 프로젝트를 생성 하는 중에 ESLint 에 대한 부분을 설정 하면 프로젝트 루트에 .eslintrc.js 가 만들어진다. 여기에서는 `ESLint + Standard config` 를 선택 하였고 Indent만 기본 설정에서 스페이스바 4칸으로 변경하여 사용한다.

```js
module.exports = {
    root: true,
    env: {
        node: true
    },
    plugins: ['vue'],
    extends: ['plugin:vue/essential', '@vue/standard'],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        indent: ['error', 4],
        'no-tabs': 0
    },
    "parserOptions": {
        "parser": "babel-eslint"
    }
}
```

#### setting.json
vue 파일에서도 eslint 를 실행하기 위해 VSCode 의 `setting.json` 에 다음 커스텀 설정을 추가한다 
```json
{
    "eslint.alwaysShowStatus": true,
	"eslint.validate": [
		{
            "language": "vue",
            "autoFix": true
        },
        {
            "language": "javascript",
            "autoFix": true
        }
    ],
    "eslint.options": {
        "extensions": [
            ".vue",
            ".js"
        ]
    }
}
```

플러그인 Vetur 0.19.2 버전에서는 구문오류를 방지하기 위해 VSCode의 `setting.json` 에 다음 커스텀 설정을 추가한다  

```json 
{
    "vetur.experimental.templateInterpolationService": false
}
```

#### jsconfig.json
Vue Cli3 로 생성한 프로젝트는 기본적으로 `src/` 에 대해 `@/` 가 alias 로 설정되어 있어서, `import` 구문에서 `@/` 를 사용 할 수 있는데, alias 를 사용한 `import` 구문은 VSCode의 Intellisense 가 활성화 되지 않는다. 이를 해결하기 위해 프로젝트 루트에 `jsconfig.json` 을 구성 할 수 있다.

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
    },
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}

```

#### vue peek
자바스크립트의 문법상으로 `import` 구문에서 `.vue`, `.js` 의 확장자를 생략 할 수 있다. `.vue` 파일에서 `@/` aslis 를 사용은 가능하지만, `.vue` 확장자를 생략한 `import` 구문은 VSCode의 Intellisense 가 동작 하지않는다. 이 부분은 `vue peek` 플러그인을 설치 하면 해결 할 수 있다. 마찬가지로 자바스크립트 파일에서도 `.vue` 파일에 대한 Intellisense 가 활성화 되지 않는데, 아직까지 해결 방법을 찾지 못 했다.


## 정리하면
ESLint는 기본적으로 Standard 스타일에 Indent는 스페이스바 4칸으로 규칙을 변경한 커스텀 룰을 사용한다. VSCode의 Intellisense는 자바스크립트 파일에서 `.vue` 파일의 `import` 구문에서는 활성화 되지 않고, 그 외에는 `@/` alias 사용하고 `.js` 및 `.vue` 의 확장자를 생략한 어느 `import` 구문에서도 VSCode 의 Path Intellisense 가 정상 작동한다. 


## 기타 플러그인 설치 목록(선택)
* Git 관련 
    - GitLens 
    - GitHistory 
* 테마 관련 
    - Material Icon Theme
    - Material Syntax - Dark 
* 스타일 작업 관련
    - Color Picker 
    - Sass
    - stylelint
* 기타 플러그인 
    - Atom Keymap 
    - Korean Language Pack for Visual Studio Code 

## 참조링크

* [VSCode의 Setting.json 알아보기](https://vscode.readthedocs.io/en/latest/getstarted/settings/)
* [VSCode의 jsconfig.json 알아보기](https://code.visualstudio.com/docs/languages/jsconfig)
* [JavaScript Standard Style 가이드](https://standardjs.com/)
* [Vue Cli3 default Alias @](https://github.com/vuejs/vue-cli/blob/ff57b8f55fa69873f643e418cfe6d4842d7c7674/packages/%40vue/cli-service/lib/config/base.js#L49-L50)


