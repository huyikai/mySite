---
title: Linux 安装 Python3
date: 2022-02-19
categories:
  - 后端
tags:
  - Linux
meta:
  - name: description
    content: Linux 安装 python3
  - name: keywords
    content: LINUX,linux,python,python3
---

> 本文介绍 Linux 环境下安装 python3 以及一些需要注意点。

## 1. 依赖安装

gcc 是一个用于 linux 系统下编程的编译器，由于 python3 需要编译安装，因此，需要首先安装 gcc。先查看一下系统中，是否安装了 gcc。

```sh
gcc --versions
```

发现没有安装，则需要安装。参数-y 的作用是在安装过程中自动确认。

```sh
yum -y install gcc
```

编译安装 python3 过程中，根据系统本身的依赖，可能出现的不同的报错信息。提前按照好依赖包。

```sh
yum -y install zlib*
yum -y install libffi-devel
yum -y install openssl-devel
```

## 2. python3 下载

在下载前可以检查一下服务器中 python 的版本，一般 linux 服务器会自带 python2。以下所有操作都是在 root 账户中进行。

python --version
当服务器网络较好时，可以直接使用以下命令下载 python3 的压缩包。下载的版本为 python3.7，下载到服务器主目录中（位置可自定义）。

```sh
cd ~
wget https://www.python.org/ftp/python/3.7.0/Python-3.7.0.tgz
```

当服务器网络不好时，命令下载花费时间较长，可以考虑在其他机器上先下好压缩包，然后通过工具（MobaXterm,Xshell,...）上传到服务器。

## 3. python3 编译安装

解压下载的 python3 压缩包。

```sh
tar -zxvf Python-3.7.0.tgz
```

解压后主目录下会多出一个 Python-3.7.0 文件夹。

新建一个 python3 的安装目录(位置可自定义)。

```sh
mkdir /usr/lib/python3.7
```

进入 Python-3.7.0 目录下，「指定安装目录，设置启用 ssl 功能」。

```sh
cd Python-3.7.0
./configure --prefix=/usr/lib/python3.7 --with-ssl
```

编译安装。

```sh
make && make install
```

## 4. 创建软连接

上述步骤完成后，其实 python3 已经安装完毕，但是为了方便使用，一般会创建 python3 和 pip3 的软连接。创建后可直接在终端通过 python 命令进入 python 和 pip3 命令安装 python 包。

创建 python3 和 pip3 软连接：

```sh
ln -s /usr/lib/python3.7/bin/python3.7 /usr/bin/python3
ln -s /usr/lib/python3.7/bin/pip3.7 /usr/bin/pip3
ln -s /usr/bin/pip3 /usr/bin/pip
```

系统默认的 python 软连接指向的是 python2，如果我们需要更方便使用，可以删除原有的 python 软连接，并建立新的 python 软连接指向 python3。

```sh
rm -f /usr/bin/python
ln -s /usr/bin/python3 /usr/bin/python
```

查看最新的有 python 的软连接。

```sh
ll /usr/bin/ |grep python
```

查看 python 版本。显示为 python 3.7.0。

```sh
python --version
```

## 5. 修改 yum 配置

Linux centos7 自带的 python 版本是 2.7，yum 使用 python2.7 作为命令解释器。安装 python3 后，软连接/usr/bin/python 指向的版本是 python3，不修改 yum 的配置，会导致 yum 使用报错，无法安装包等。

「报错信息 1：」

> File "/usr/bin/yum", line 30 except KeyboardInterrupt, e: ^ SyntaxError: invalid syntax

「报错信息 2：」

> Downloading packages: File "/usr/libexec/urlgrabber-ext-down", line 28 except OSError, e: ^ SyntaxError: invalid syntax

「解决办法：」

修改 yum 配置文件，下面两个文件都要修改。

`vi /usr/bin/yum`
`vi /usr/libexec/urlgrabber-ext-down`

按 i 进入编辑模式，在第一行 `#!/usr/bin/python` 把修改为 `#!/usr/bin/python2.7`

按 ESC 退出编辑模式，`:wq` 退出保存。
