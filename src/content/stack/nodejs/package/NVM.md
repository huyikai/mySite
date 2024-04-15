---
title: 'NVM'
pubDate: 2022-07-01
description: '这是我 Astro 博客的第一篇文章。'
author: 'Astro 学习者'
image:
  url: 'https://docs.astro.build/assets/full-logo-light.png'
  alt: 'The full Astro logo.'
tags: ['NVM']
---

NVM 是一个在同一台设备管理多个 `Node.js` 版本的工具

## 安装

```sh
brew install nvm
```

## 常用命令

```sh
nvm ls # 列出所有安装的版本
nvm current # 显示当前的版本
nvm install --lts # 选择最新的LTS版本安装
nvm install <version> # 安装指定版本，可模糊安装，如：安装v4.4.0，既可nvm install v4.4.0，又可nvm install 4.4
nvm uninstall <version> # 删除已安装的指定版本
nvm use <version> # 切换使用指定的版本node
nvm alias default <version> # 切换默认版本
```

如果报错：zsh: command not found: nvm

解决方法如下：

step 1: 使用 vim 打开.bash_profile 文件进行修改

```sh
vim ~/.bash_profile
```

按 i 键进入插入模式，然后输入下面代码：

```sh
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```

然后按 esc 键，退出插入模型，然后输入 :wq! 按下回车 （即可完成文件的编辑和保存退出）

step 2: 使用 vim 打开.zshrc 文件进行修改

```sh
vim ~/.zshrc
```

同样按 i 键进入插入模式，然后输入下面代码：

```sh
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```

然后按 esc 键，退出插入模型，然后输入 :wq! 按下回车 （即可完成文件的编辑和保存退出）

step 3: 使用 vim 打开.profile 文件进行修改

```sh
vim ~/.profile
```

同样按 i 键进入插入模式，然后输入下面代码：

```sh
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```

然后按 esc 键，退出插入模型，然后输入 :wq! 按下回车 （即可完成文件的编辑和保存退出）

step 4: 依次运行下面代码，进行文件的重新加载

```sh
source  ~/.bash_profile
source  ~/.zshrc
source  ~/.profile
```

step 5: 输入下面代码，验证 nvm 是否可用

```sh
nvm --version
```
