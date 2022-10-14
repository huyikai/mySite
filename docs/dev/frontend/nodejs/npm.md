---
title: NPM、NVM
date: 2022-02-18
categories:
  - 前端
tags:
  - NPM
  - NVM
meta:
  - name: description
    content: npm、nvm
  - name: keywords
    content: nodejs,npm,npm源,npm registry,npm源切换,切换npm源,npm设置,nvm
---
# NPM、NVM

## NPM 源地址查看与切换

1. 查看镜像源

   ```sh
   npm get registry
   ```

2. 切换官方源

   ```sh
   npm config set registry http://registry.npmjs.org
   ```

3. 切换镜像源

   ```sh
   # 淘宝源
   npm config set registry https://registry.npmmirror.com
   # 华为源
   npm config set registry https://repo.huaweicloud.com/repository/npm/
   # 清除npm缓存
   npm cache clean -f
   ```

4. 使用临时镜像源(安装依赖时临时切换)

   ```sh
   npm install xxx（依赖名） --registry=https://xxx（源地址）
   ```

## 使用 NVM 管理 node 版本

- 安装 NVM

  ```sh
  brew install nvm
  ```

- nvm 常用命令

  ```sh
  nvm ls ## 列出所有安装的版本
  nvm current ## 显示当前的版本
  nvm install --lts ##选择最新的LTS版本安装
  nvm install <version> ## 安装指定版本，可模糊安装，如：安装v4.4.0，既可nvm install v4.4.0，又可nvm install 4.4
  nvm uninstall <version> ## 删除已安装的指定版本
  nvm use <version> ## 切换使用指定的版本node
  ```

如果报错：zsh: command not found: nvm

解决方法如下：

step 1: 使用vim打开.bash_profile文件进行修改

```sh
vim ~/.bash_profile
```


按 i 键进入插入模式，然后输入下面代码：

```sh
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```


然后按 esc 键，退出插入模型，然后输入 :wq! 按下回车 （即可完成文件的编辑和保存退出）

step 2: 使用vim打开.zshrc文件进行修改

```sh
vim ~/.zshrc
```


同样按 i 键进入插入模式，然后输入下面代码：

```sh
export NVM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```


然后按 esc 键，退出插入模型，然后输入 :wq! 按下回车 （即可完成文件的编辑和保存退出）

 step 3: 使用vim打开.profile文件进行修改

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


 step 5: 输入下面代码，验证nvm是否可用

```sh
nvm --version
```

