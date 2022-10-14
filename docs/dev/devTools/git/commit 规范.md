---
title: Git commit 规范
date: 2022-05-09
categories:
  - 开发工具
tags:
  - git
---

```shell
feat: # 新功能 feature
fix: # 一个错误修复
refactor:: # 重构(既不增加新功能，也不是修复bug)
docs: # 仅文档更改
test: # 添加缺失的测试或更正现有的测试
chore: # 既不修正错误也不增加功能的代码更改，比如构建流程, 依赖管理.
style: # 不影响代码含义的更改（空白，格式，缺少分号等）
perf: # 改进性能的代码更改
revert: # 回退
scope: #commit 影响的范围, 比如: route, component, utils, build...
subject: #commit 的概述, 建议符合 50/72 formatting
body: #commit 具体修改内容, 可以分为多行, 建议符合 50/72 formatting
footer: #一些备注, 通常是 BREAKING CHANGE 或修复的 bug 的链接.
```
