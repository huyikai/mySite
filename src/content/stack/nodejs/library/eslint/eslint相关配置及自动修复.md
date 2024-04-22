---
title: 'eslint 相关配置及自动修复'
description: 'eslint 相关配置及自动修复'
author: 'huyikai'
tags: ['nodejs', 'eslint', 'configuration']
---

> 项目开发的整个流程中，保持代码风格的统一是非常重要的。很难硬性要求每个开发人员改变自己的开发习惯，所以需要借助工具的帮助。在工具的使用中也能潜移默化的影响开发人员的开发习惯，逐渐向正确的方向靠拢。

1. 安装 vsCode 插件 `EsLint` `Vetur` 插件。

   安装 `Vetur` 是因为 Eslint 不能修改 vue 模版，JSX 语法。所以要通过 Vetur。

2. 为项目安装`EsLint`依赖，注意要安在开发依赖中 即 `devDependencies` 中。

3. 在项目的根目录下添加`.eslintrc.js`，用于校验代码格式，根据项目情况，自行编写校验规则。

   ```json
   module.exports = {
     root: true,
     env: {
       node: true
     },
     'extends': [
       'plugin:vue/vue3-essential',
       'eslint:recommended'
     ],
     parserOptions: {
       parser: 'babel-eslint'
     },
     rules: {
       'quotes': [1, 'single'],// 单引号
       'semi': [2, 'always'], // 语句强制分号结尾
       "comma-dangle": ["error", "never"],
       'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
       'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
       'no-unused-vars': 'off'
     }
   }

   ```

4. 修改 vsCode 设置文件 `settings.json` ，增加如下代码。

   ```json
   //实现保存时自动根据规则修复问题
   "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
   },
   "eslint.validate": [
      "javascript",
      "vue",
      "html"
   ],
   //vetur 代码格式化配置，主动通过右键或者 alt+shift+f 格式化代码时的配置
   "vetur.format.defaultFormatterOptions": {
       "js-beautify-html": {
           // #vue组件中html代码格式化样式
           "wrap_attributes": "force-aligned", //也可以设置为“auto”，效果会不一样
           "wrap_line_length": 200,
           "end_with_newline": false,
           //设置分号
           "semi": true,
           //双引号变单引号
           "singleQuote": true
       },
       "prettier": {
           //设置分号
           "semi": true,
           //双引号变成单引号
           "singleQuote": true,
           //禁止行尾添加逗号
           "trailingComma": "none"
       }
   },
   ```

- 完成以上配置后，即可使用。打开要编辑的文件，有问题的地方会出现红色波浪线，不用动手修改，保存即可自动修复。

- 如果整个文件都飘红的话，不会一次性修改所有的格式问题，会只修改一部分，需要多按几次保存。

- 如果刚配置好以上设置，或者刚引入项目文件，或者很久没有保存修复过。有很多文件处于未修复状态。此时一个个文件去保存修复就显得很不理智，可以在 `pakeage.json` 文件中 `scripts` 里增加一条命令

  ```json
    "scripts":{
      "lint": "eslint --ext .js,.vue src --fix"
    }
    // --ext后面跟上的.js、.vue是你要检测文件的后缀，.vue后面的src是要检测的哪个目录下面的文件。
    // --fix的作用是自动修复根据你配置的规则检测出来的格式问题
  ```

  终端中输入 `npm run lint`，就可以自动修复你`src`文件夹下面的所有根据你配置的规则检测出来的格式问题

- 配置 `.eslintignore` 文件，让 eslint 不检测某些文件

  src/test/_
  src/test2/_

- **0、1、2 的意思：**

  `"off"` 或 0 - 关闭这项规则

  `"warn"` 或 1 - 将规则视为一个警告

  `"error"` 或 2 - 将规则视为一个错误
