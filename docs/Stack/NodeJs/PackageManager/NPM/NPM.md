---
date: 2022-02-18
head:
  - - meta
    - name: description
      content: NPM
  - - meta
    - name: keywords
      content: nodejs,npm,npm源,npm registry,npm源切换,切换npm源,npm设置,nvm
---

# NPM

NPM 是 Node.js 的包管理工具，用于安装、共享和管理 JavaScript 代码包。 NPM 也是一个命令行工具，允许开发者安装和管理 Node.js 应用程序的依赖项。

## NPM 基础操作命令

### 安装依赖

```sh
npm install <package_name> # 安装包
npm install # 安装项目中的所有依赖
```

### 卸载依赖

```sh
npm uninstall <package_name> # 卸载包
```

### 更新依赖

```sh
npm update <package_name> # 更新特定包
npm update # 更新所有包
```

### 查看已安装的包

```sh
npm list # 列出已安装的包
```

### 查看 NPM 镜像源

```sh
npm get registry # 查看当前的镜像源
```

### 切换 NPM 镜像源

```sh
npm config set registry <source_url> # 切换到指定的镜像源
```

### 使用临时镜像源安装依赖

```sh
npm install <package_name> --registry=<source_url> # 使用指定的镜像源安装包
```

### 清除 NPM 缓存

```sh
npm cache clean -f # 强制清除缓存
```

## NPM 包发布管理命令

### 创建用户

```sh
npm adduser # 创建新用户
```

### 登录

```sh
npm login # 登录到 npm
```

### 发布包

```sh
npm publish # 发布包
npm publish --access public # 发布公开的包
```

### 更新包版本

```sh
npm version <update_type> # 更新包版本，update_type 可以是 patch、minor 或 major
```

### 取消发布包

```sh
npm unpublish <package_name>@<version> # 取消发布特定版本的包
```
