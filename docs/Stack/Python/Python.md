# Python

Python 是一种高级编程语言，以其简洁易读的语法和强大的标准库而闻名，广泛应用于 Web 开发、数据分析、人工智能等领域。

## 安装

### MacOS

```shell
brew install python3
```

由于 MacOS 默认安装了 Python2，直接执行 Python 命令将运行 Python2 而非 Python3。为了便于使用，我们可以修改配置，使 Python 命令默认运行 Python3。

首先，编辑 bash_profile 文件：

```sh
vi ~/.bash_profile
```

然后，在文件末尾添加以下语句，其中的地址应替换为本机 Python3 的安装位置：

```txt
alias python="/usr/local/bin/python3"
```

保存并退出后，刷新 bash_profile 文件以应用新的配置：

```sh
source ~/.bash_profile
```

最后，输入`python`命令，如果显示的是 Python3 的版本信息，那么就说明切换成功了。
