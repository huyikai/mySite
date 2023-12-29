---
date: 2023-02-28

meta:
  - name: description
    content: VsCode 用户配置
  - name: keywords
    content: VsCode 用户配置
---

# VsCode 用户配置

```json
{
  "editor.fontSize": 16, // 文字大小
  "editor.fontFamily": "'JetBrains Mono','source code pro',Menlo, Monaco, 'Courier New'", // 字体
  "debug.console.fontSize": 14, // debug 文字大小
  "editor.fontLigatures": true, // 字体连字===
  "editor.codeActionsOnSave": {
    "source.fixAll": true,
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode", // 默认格式化工具
  "editor.maxTokenizationLineLength": 50000, // 单行代码最大显示长度
  "explorer.confirmDelete": false, //确认删除
  "git.autofetch": true, // git自动fetch
  "security.workspace.trust.untrustedFiles": "open",
  "html.format.wrapAttributes": "force-expand-multiline", //属性换行
  // eslint
  "eslint.enable": true,
  "eslint.quiet": true,
  // prettier
  "prettier.enable": true,
  "prettier.semi": true, // 分号
  "prettier.singleQuote": true, //单引号
  "prettier.trailingComma": "none", //结尾逗号
  "prettier.singleAttributePerLine": true,
  "prettier.endOfLine": "auto",
  // vite
  "vite.autoStart": false,
  // volar
  "volar.autoCompleteRefs": true, //ref自动补充.value
  "volar.icon.splitEditors": true, //显示拆分编辑器
  "volar.inlayHints.eventArgumentInInlineHandlers": false,
  // 针对语言的编辑器设置
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[python]": {
    "editor.formatOnType": true
  },
  // git
  "git.confirmSync": false, // 同步 Git 前进行确认
  "[dotenv]": {
    "editor.defaultFormatter": "foxundermoon.shell-format"
  }
}
```
