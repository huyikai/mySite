---
title: yarn 常用命令
date: 2022-02-11
categories:
  - 前端
tags:
  - yarn
meta:
  - name: description
    content: yarn 常用命令
  - name: keywords
    content: yarn,Hadoop,依赖管理,npm
---

# yarn 常用指令

### 初始化新项目

```sh
$yarn init
```

### 添加依赖包

```sh
$yarn add [package]
$yarn add [package]@[version]
$yarn add [package]@[tag]
```

### 将依赖项添加到不同依赖项类别

分别添加到 devDependencies、peerDependencies 和 optionalDependencies：

```sh
$yarn add [package] --dev
$yarn add [package] --peer
$yarn add [package] --optional
```

### 升级依赖包

```sh
$yarn upgrade [package]
$yarn upgrade [package]@[version]
$yarn upgrade [package]@[tag]
```

### 移除依赖包

```sh
$yarn remove [package]
```

### 安装项目的全部依赖

```sh
$yarn
```

或

```sh
$yarn install
```

## yarn 和 npm 对比

### 1. 开始一个新工程

yarn init 与 npm init 一样通过交互式会话创建一个 package.json

```sh
$yarn init # yarn
$npm init # npm
# 跳过会话，直接通过默认值生成 package.json
$yarn init --yes # 简写 -y
$npm init -y
```

### 2. 添加一个依赖

通过 yarn add 添加依赖会更新 package.json 以及 yarn.lock 文件

`yarn add <packageName>` 依赖会记录在 `package.json` 的 `dependencies` 下

```sh
$yarn add webpack@2.3.3 # yarn  --save 是 yarn 默认的，默认记录在 package.json 中
$npm install webpack@2.3.3 --save # npm
```

`yarn add <packageName> --dev` 依赖会记录在 `package.json` 的 `devDependencies` 下

```sh
$yarn add webpack --dev # yarn 简写 -D
$npm install webpack --save-dev # npm
```

```sh
$yarn global add <packageName> 全局安装依赖
$yarn global add webpack # yarn
$npm install webpack -g # npm
```

### 3. 更新一个依赖

```sh
$yarn upgrade 用于更新包到基于规范范围的最新版本
$yarn upgrade # 升级所有依赖项，不记录在 package.json 中
$npm update # npm 可以通过 ‘--save|--save-dev’ 指定升级哪类依赖
$yarn upgrade webpack # 升级指定包
$npm update webpack --save-dev # npm
$yarn upgrade --latest # 忽略版本规则，升级到最新版本，并且更新 package.json
```

### 4. 移除一个依赖

`yarn remove <packageName>`

```sh
$yarn remove webpack # yarn
$npm uninstall webpack --save # npm 可以指定 --save | --save-dev
```

### 5. 安装 package.json 中的所有文件

yarn 或者 yarn install

```sh
$yarn install # 或者 yarn 在 node_modules 目录安装 package.json 中列出的所有依赖
$npm install # npm
# yarn install 安装时，如果 node_modules 中有相应的包则不会重新下载 --force 可以强制重新下载安装
$yarn install --force # 强制下载安装
$npm install --force # npm
```

### 6. 运行脚本

yarn run 用来执行在 package.json 中 scripts 属性下定义的脚本

```json
// package.json
{
  "scripts": {
    "dev": "node app.js",
    "start": "node app.js"
  }
}
```

```sh
$yarn run dev # yarn 执行 dev 对应的脚本 node app.js
$npm run # npm
$yarn start # yarn
$npm start # npm
```

与 npm 一样 可以有 yarn start 和 yarn test 两个简写的运行脚本方式

### 7. 显示某个包信息

`yarn info <packageName>` 可以用来查看某个模块的最新版本信息

```sh
$yarn info webpack # yarn
$npm info webpack # npm

$yarn info webpack --json # 输出 json 格式
$npm info webpack  --json # npm

$yarn info webpack readme # 输出 README 部分
$npm info webpack readme
```

### 8. 列出项目的所有依赖

`yarn list`

```sh
$yarn list # 列出当前项目的依赖
$npm list # npm

$yarn list --depth=0 # 限制依赖的深度
$sudo yarn global list # 列出全局安装的模块
```

### 9. 管理 yarn 配置文件

`yarn coinfig`

```sh
$yarn config set key value # 设置
$npm config set key value

$yarn config get key # 读取值
$npm config get key

$yarn config delete key # 删除
$npm config delete key

$yarn config list # 显示当前配置
$npm config list

$yarn config set registry https://registry.npm.taobao.org # 设置淘宝镜像
$npm config set registry https://registry.npm.taobao.org # npm
```

### 10. 缓存

```sh
$yarn cache
```

```sh
sudo yarn cache list # 列出已缓存的每个包
sudo yarn cache dir # 返回 全局缓存位置
sudo yarn cache clean # 清除缓存
```
