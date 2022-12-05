---
title: Linux 安装升级 gcc
date: 2022-02-19
categories:
  - 后端
tags:
  - Linux
meta:
  - name: description
    content: Linux 安装升级 gcc
  - name: keywords
    content: LINUX,linux,gcc,安装gcc
---

### 1. 下载源码包并解压缩

gcc-11.2.0.tar.gz
可在该地址寻找自己需要的版本 :link: http://ftp.gnu.org/gnu/gcc/

```sh
wget http://ftp.gnu.org/gnu/gcc/gcc-11.2.0/gcc-11.2.0.tar.gz
tar -zxvf gcc-11.2.0.tar.gz
```

### 2. 下载依赖及配置文件

```sh
yum -y install bzip2 #已安装可以跳过这一步

cd gcc-11.2.0
./contrib/download_prerequisites
```

### 3. 配置

```sh
mkdir build
cd build/
../configure -enable-checking=release -enable-languages=c,c++ -disable-multilib

# –enable-languages表示你要让你的gcc支持那些语言，
# –disable-multilib不生成编译为其他平台可执行代码的交叉编译器。
# –disable-checking生成的编译器在编译过程中不做额外检查，
# 也可以使用*–enable-checking=xxx*来增加一些检查
```

### 4. 编译

```sh
make
# 这一步需要时间非常久 可以使用 make -j 4 让make最多运行四个编译命令同时运行，加快编译速度（建议不要超过CPU核心数量的2倍）
```

### 5. 安装

```sh
make install
```

### 6. 验证 gcc 版本

```sh
gcc -v

Using built-in specs.
COLLECT_GCC=/usr/local/bin/gcc
COLLECT_LTO_WRAPPER=/usr/local/libexec/gcc/x86_64-pc-linux-gnu/11.2.0/lto-wrapper
Target: x86_64-pc-linux-gnu
Configured with: ../configure -enable-checking=release -enable-languages=c,c++ -disable-multilib
Thread model: posix
Supported LTO compression algorithms: zlib
gcc version 11.2.0 (GCC)

# 验证：gcc -v；或者g++ -v，如果显示的gcc版本仍是以前的版本，就需要重启系统；
# 或者可以查看gcc的安装位置：which gcc；
# 然后在查看版本 /usr/local/bin/gcc -v
# 确定以及配置成功后可以将原先的版本删除
```

### 7. 删除旧版本

```sh
yum -y remove gcc g++
```

### 8. 配置新版本全局可用

```sh
ln -s /usr/local/bin/gcc /usr/bin/gcc
```

### 9. 更新动态库

```sh
# 查看当前的动态库
strings /usr/lib64/libstdc++.so.6 | grep CXXABI
rm -f /usr/lib64/libstdc++.so.6
ln -s /usr/local/lib64/libstdc++.so.6.0.29 /usr/lib64/libstdc++.so.6
#查看更新后的动态库
strings /usr/lib64/libstdc++.so.6 | grep CXXABI

# 安装后的动态库会位于/usr/local/lib64目录下，
# 其他版本在该目录下寻找对应的动态库libstdc++.so.6.X.XX
```
