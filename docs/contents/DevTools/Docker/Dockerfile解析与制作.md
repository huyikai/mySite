---
title: Dockerfile 解析与制作
date: 2022-05-20
categories:
  - 开发工具
tags:
  - Docker
meta:
  - name: description
    content: Dockerfile解析与制作
  - name: keywords
    content: dockerfile解析与制作,docker,dockerfile
---

## Dockerfile 解析

`FROM`：基础镜像，当前镜像是基于哪个镜像的，必须为 Dockerfile 的第一个指令

```
# 格式：
FROM image
FROM image[:tag]
# 示例：
FROM mysql:5.6
# 注：tag是可选的，如果不写，则会默认使用latest版本的基础镜像
```

`MAINTAINER`：镜像维护者的姓名和邮箱地址 (已过时，推荐使用 LABEL)

```
# 格式：
MAINTAINER name<email>
# 示例：
MAINTAINER tiger
MAINTAINER tiger<****@***.com>
```

`LABEL`：为镜像指定标签

```
# 格式：
LABEL key1=value1 key2=value2...  #可以设置多个标签，每个标签为一个"key=value"的键值对，如果key中包含空格，可以使用\来进行转义，也可以通过""来进行标示；另外，反斜线\也可以用于续行
# 示例：
LABEL "maintainer"="tiger"
```

`RUN`：容器构建时需要运行的指令

```
# RUN用于在镜像容器中执行指令，其有以下两种指令执行方式：

# shell执行
# 格式：
RUN command
# 示例：
RUN yum -y install vim

# exec执行
# 格式：
RUN ["executable", "param1", "param2"]
# 示例：
RUN ["/etc/execfile", "arg1", "arg1"]

# 注：RUN指令创建的中间镜像会被缓存，并会在下次构建中使用。如果不想使用这些缓存镜像，可以在构建时指定--no-cache参数，如：docker build --no-cache
```

`EXPOSE`：指定当前容器与外界交互的端口

```
# 格式：
EXPOSE port [port...]
# 示例：
EXPOSE 80 443
EXPOSE 8080
EXPOSE 11211/tcp 11211/udp
# 注：
# EXPOSE并不会让容器的端口访问到主机。要使其可访问，需要在docker run运行容器时通过-p来指定映射这些端口
```

`WORKDIR`：创建容器后终端默认登录进来的工作目录，一个落脚点

```
# 格式：
WORKDIR /path/to/workdir
# 示例：
WORKDIR /a  # (这时工作目录为/a)

# 注：通过WORKDIR设置工作目录后，Dockerfile中其后的命令RUN、CMD、ENTRYPOINT、ADD、COPY等命令都会在该目录下执行。在使用docker run运行容器时，可以通过-w参数覆盖构建时所设置的工作目录。
```

`ENV`：用来在构建镜像过程中设置环境变量

```
# 格式：
ENV key value  #key之后的所有内容均会被视为其value的组成部分，因此，一次只能设置一个变量
ENV key1=value1 key2=value2...  #可以设置多个变量，每个变量为一个"key=value"的键值对，如果key中包含空格，可以使用\来进行转义，也可以通过""来进行标示；另外，反斜线\也可以用于续行
# 示例：
ENV MYPATH /usr/local
ENV MYPATH1=/usr1/local MYPATH2=/usr2/local \
MYPATH3=/usr3/local
```

`ADD`：将本地文件添加到容器中，会自动处理 url 网络资源和 解压 tar 类型文件(网络压缩资源不会被解压)

```
# 格式：
ADD src...dest
ADD ["src",... "dest"] 用于支持包含空格的路径
# 示例：
ADD hom* /mydir/              # 添加所有以"hom"开头的文件 到 /mydir/
ADD hom?.txt /mydir/          # ? 替代一个单字符,例如："home.txt"
ADD test.tar /absoluteDir/    # 自动解压缩test.tar，并添加到 /absoluteDir/
```

`COPY`：与类似 ADD，拷贝文件和目录到镜像中。将从构建上下文目录中 <源路径> 的文件/目录复制到新的一层的镜像内的 <目标路径> 位置，但是不会自动解压文件，也不能访问网络资源

`VOLUME`：容器数据卷，用于数据保存和持久化工作

```
# 格式：
VOLUME ["/path/to/dir"]
# 示例：
VOLUME ["/data"]
VOLUME ["/var/www", "/var/log/apache2", "/etc/apache2"]
# 注：
# 一个卷可以存在于一个或多个容器的指定目录，该目录可以绕过联合文件系统，并具有以下功能：
# 1、卷可以在容器间共享和重用
# 2、修改卷后会立即生效
# 3、对卷的修改不会对镜像产生影响
# 4、卷会一直存在，直到没有任何容器在使用它
```

`CMD`：指定一个容器启动时要运行的指令。Dockerfile 中可以有多个 CMD 指令，但只有最后一个生效，CMD 会被 docker run 之后的参数给替换

```
# 格式：
CMD ["executable","param1","param2"] (执行可执行文件，优先)
CMD ["param1","param2"] (设置了ENTRYPOINT，则直接调用ENTRYPOINT添加参数)
CMD command param1 param2 (执行shell内部命令)
# 示例：
CMD echo "This is a test."
CMD ["catalina.sh","run"]
# 注：
CMD不同于RUN，CMD用于指定在容器启动时所要执行的指令，而RUN用于指定镜像构建时所要执行的指令。
```

`ENTRYPOINT`：指定一个容器启动时要运行的指令。ENTRYPOINT 的目的和 CMD 一样，都是在指定容器启动程序及参数，不同点是 docker run 之后的参数会被当做参数传递给 ENTRYPOINT，形成新的命令组合

```
# 格式：
ENTRYPOINT ["executable", "param1", "param2"] (可执行文件, 优先)
ENTRYPOINT command param1 param2 (shell内部命令)
# 示例：
ENTRYPOINT ["top", "-b"]
# 注：ENTRYPOINT与CMD非常类似，不同的是通过docker run执行的指令不会覆盖ENTRYPOINT，而docker run指令中指定的任何参数，都会被当做参数再次传递给ENTRYPOINT。Dockerfile中只允许有一个ENTRYPOINT指令，多个ENTRYPOINT指令时会覆盖前面的设置，而只执行最后的ENTRYPOINT指令。
```

`ONBUILD`：当构建一个被继承的 Dockerfile 时，该指令将被运行，即父镜像在被子继承后，父镜像的 onbuild 将会被触发

```
# 格式：
ONBUILD [INSTRUCTION]
# 示例：
ONBUILD RUN /usr/local/bin/python-build --dir /app/src
# 注：
#当所构建的镜像被用做其它镜像当作基础镜像时，该镜像中的触发器将会被触发
```

`USER`：指定容器运行时的用户名或 UID，后续的 RUN 也会使用指定用户。使用 USER 指定用户时，可以使用用户名、UID 或 GID，或是两者的组合。当服务不需要管理员权限时，可以通过该命令指定运行用户。并且可以在之前创建所需要的用户

```
# 格式:
USER user
USER user:group
USER uid
USER uid:gid
USER user:gid
USER uid:group
# 示例：
USER myuser
# 注：使用USER指定用户后，Dockerfile中其后的命令RUN、CMD、ENTRYPOINT都将使用该用户。镜像构建完成后，通过docker run运行容器时，可以通过-u参数来覆盖所指定的用户。
```

### dockerfile 样例

```
# This my first nginx Dockerfile
# Version 1.0

# Base images 基础镜像
FROM centos

#LABEL 维护者信息
LABEL name="*****" \
    email="****@***.com"

#ENV 设置环境变量
ENV PATH /usr/local/nginx/sbin:$PATH
ENV WORKPATH /usr/local/nginx-1.8.0

#ADD  文件放在当前目录下，拷过去会自动解压
ADD nginx-1.8.0.tar.gz /usr/local/
ADD epel-release-latest-7.noarch.rpm /usr/local/

#RUN 执行以下命令
RUN rpm -ivh /usr/local/epel-release-latest-7.noarch.rpm
RUN yum install -y wget lftp gcc gcc-c++ make openssl-devel pcre-devel pcre && yum clean all
RUN useradd -s /sbin/nologin -M www

#WORKDIR 相当于cd
WORKDIR $WORKPATH

RUN ./configure --prefix=/usr/local/nginx --user=www --group=www --with-http_ssl_module --with-pcre && make && make install

RUN echo "daemon off;" >> /etc/nginx.conf

#EXPOSE 映射端口
EXPOSE 80

#CMD 运行以下命令
CMD ["nginx"]
```

## 镜像制作

### 方式一：通过 Dockerfile 使用 docker build 指令生成镜像

```
docker build -f # 宿主机中Dockerfile文件的绝对路径 -t 新镜像名称[:版本号] 宿主机资源文件路径/.
```

`宿主机资源文件路径`：指的是 Dockerfile 文件中使用 ADD 或者 COPY 指令添加的宿主机资源文件路径，例如：上文 Dockerfile 文件中的`ADD nginx-1.8.0.tar.gz /usr/local/`命令，则宿主机资源文件路径指的是`nginx-1.8.0.tar.gz`资源文件在宿主机中的路径

举例：如果上文中添加的`nginx-1.8.0.tar.gz`资源文件在宿主机中的`/root/resources`路径下，与 Dockerfile 文件不在同一路径下，则命令后的宿主机资源文件路径为`/root/resources`。如果添加的资源文件与 Dockerfile 文件在同一路径下，则可以使用相对路径`.`

### 方式二：通过使用 docker commit 指令生成镜像

```
docker commit -m="提交的描述信息" -a="作者" # 容器ID/容器名称 要创建的目标镜像名[:版本号]
```

**慎用 docker commit**

使用 docker commit 命令虽然可以比较直观的帮助理解镜像分层存储的概念，但是实际环境中并不会这样使用。如果使用 docker commit 制作镜像，以及后期修改的话，每一次修改都会让镜像更加臃肿一次，所删除的上一层的东西并不会丢失，会一直如影随形的跟着这个镜像，即使根本无法访问到。这会让镜像更加臃肿。
