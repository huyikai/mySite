---
title: Git commit 规范
date: 2022-05-09
categories:
  - 开发工具
tags:
  - git
---

```shell
# type
feat: # 新特性 feature
fix: # 修改问题、错误修复
refactor:: # 重构(既不增加新功能，也不是修复bug)
docs: # 文档修改
test: # 测试用例修改
chore: # 其他修改, 比如构建流程, 依赖管理，既不修正错误也不增加功能的代码更改
style: # 代码格式修改, 注意不是 css 修改（空白，格式，缺少分号等）
perf: # 改进性能的代码更改
revert: # 回退
scope: #commit 影响的范围, 比如: route, component, utils, build...
subject: #commit 的概述, 建议符合 50/72 formatting(https://stackoverflow.com/questions/2290016/git-commit-messages-50-72-formatting)
body: #commit 具体修改内容, 可以分为多行, 建议符合 50/72 formatting
footer: #一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接.
```

