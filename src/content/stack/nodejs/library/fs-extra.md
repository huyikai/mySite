---
title: 'fs-extra'
description: 'fs-extra'
author: 'huyikai'
tags: ['nodejs', 'library']
---

fs-extra 是一个 Node.js 模块，它提供了对文件系统操作的扩展功能，包括异步和同步的方法，以及对 Promise 的支持。它是对 Node.js 原生 fs 模块的扩展，提供了更多的功能和便利的 API。

## 安装

```shell
npm install fs-extra
```

## 使用

```javascript
import fs from 'fs-extra';

// 异步写入文件
fs.writeFile('message.txt', 'Hello Node.js!', (err) => {
  if (err) throw err;
  console.log('文件已保存');
});

// 同步写入文件
fs.writeFileSync('message.txt', 'Hello Node.js!');

// 异步复制文件
fs.copy('source.txt', 'destination.txt', (err) => {
  if (err) throw err;
  console.log('文件已复制');
});

// 同步复制文件
fs.copySync('source.txt', 'destination.txt');

// 异步创建目录
fs.ensureDir('/path/to/directory')
  .then(() => {
    console.log('目录已创建');
  })
  .catch((err) => {
    console.error(err);
  });

// 同步创建目录
fs.ensureDirSync('/path/to/directory');
```
