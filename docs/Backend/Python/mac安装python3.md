```shell
brew install python3
```

因为 Mac 自带 Python2，所以安装后直接执行 Python 命令会运行Python2 而不是 Python3。

为方便后续使用，可以按照以下方式修改配置。

编辑bash_profile文件

```sh
vi ~/.bash_profile 
```

在文件的最后新增下列语句，地址替换为本机python3的安装位置。

```
alias python="/usr/local/bin/python3"
```

添加后重新刷新bash_profile文件。

```sh
source ~/.bash_profile
```

输入`python`即可验证是否切换成功。