---
head:
  - - meta
    - name: description
      content: nrm
  - - meta
    - name: keywords
      content: nrm,npm源,切换npm源,npm register
---

# NRM

`nrm` 是一个用来管理 `npm` 的镜像源。它可以帮助你快速地切换 `npm` 的镜像源，以提高包的下载速度。

## 安装

```shell
npm install -g nrm
```

## 常用命令

```shell
nrm ls
* npm ---------- https://registry.npmjs.org/
  yarn --------- https://registry.yarnpkg.com/
  tencent ------ https://mirrors.cloud.tencent.com/npm/
  cnpm --------- https://r.cnpmjs.org/
  taobao ------- https://registry.npmmirror.com/
  npmMirror ---- https://skimdb.npmjs.com/registry/
```

```shell
nrm use cnpm  # switch registry to cnpm
* Registry has been set to: http://r.cnpmjs.org/
```
