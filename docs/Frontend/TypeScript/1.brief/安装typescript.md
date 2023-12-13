---
title: 安装typescript
date: 2022-05-26
categories:
  - 前端
tags:
  - typescript
meta:
  - name: description
    content: 安装typescript
  - name: keywords
    content: typescript
---

# 安装 TypeScript

TypeScript 的命令行工具安装方法如下：

```bash
npm install -g typescript
```

以上命令会在全局环境下安装 `tsc` 命令，安装完成之后，我们就可以在任何地方执行 `tsc` 命令了。

编译一个 TypeScript 文件很简单：

```bash
tsc hello.ts
```

我们约定使用 TypeScript 编写的文件以 `.ts` 为后缀，用 TypeScript 编写 React 时，以 `.tsx`为后缀。
