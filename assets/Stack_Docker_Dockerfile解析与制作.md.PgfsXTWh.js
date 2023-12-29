import{_ as s,n as a,p as n,Y as p}from"./chunks/framework.KP8KjELV.js";const k=JSON.parse('{"title":"Dockerfile 解析与制作","description":"","frontmatter":{"title":"Dockerfile 解析与制作","date":"2022-05-20T00:00:00.000Z","categories":["开发工具"],"tags":["Docker"],"meta":[{"name":"description","content":"Dockerfile解析与制作"},{"name":"keywords","content":"dockerfile解析与制作,docker,dockerfile"}]},"headers":[],"relativePath":"Stack/Docker/Dockerfile解析与制作.md","filePath":"Stack/Docker/Dockerfile解析与制作.md","lastUpdated":1703840066000}'),e={name:"Stack/Docker/Dockerfile解析与制作.md"},l=p(`<h2 id="dockerfile-解析" tabindex="-1">Dockerfile 解析 <a class="header-anchor" href="#dockerfile-解析" aria-label="Permalink to &quot;Dockerfile 解析&quot;">​</a></h2><p><code>FROM</code>：基础镜像，当前镜像是基于哪个镜像的，必须为 Dockerfile 的第一个指令</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 格式：</span></span>
<span class="line"><span>FROM image</span></span>
<span class="line"><span>FROM image[:tag]</span></span>
<span class="line"><span># 示例：</span></span>
<span class="line"><span>FROM mysql:5.6</span></span>
<span class="line"><span># 注：tag是可选的，如果不写，则会默认使用latest版本的基础镜像</span></span></code></pre></div><p><code>MAINTAINER</code>：镜像维护者的姓名和邮箱地址 (已过时，推荐使用 LABEL)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 格式：</span></span>
<span class="line"><span>MAINTAINER name&lt;email&gt;</span></span>
<span class="line"><span># 示例：</span></span>
<span class="line"><span>MAINTAINER tiger</span></span>
<span class="line"><span>MAINTAINER tiger&lt;****@***.com&gt;</span></span></code></pre></div><p><code>LABEL</code>：为镜像指定标签</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 格式：</span></span>
<span class="line"><span>LABEL key1=value1 key2=value2...  #可以设置多个标签，每个标签为一个&quot;key=value&quot;的键值对，如果key中包含空格，可以使用\\来进行转义，也可以通过&quot;&quot;来进行标示；另外，反斜线\\也可以用于续行</span></span>
<span class="line"><span># 示例：</span></span>
<span class="line"><span>LABEL &quot;maintainer&quot;=&quot;tiger&quot;</span></span></code></pre></div><p><code>RUN</code>：容器构建时需要运行的指令</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># RUN用于在镜像容器中执行指令，其有以下两种指令执行方式：</span></span>
<span class="line"><span></span></span>
<span class="line"><span># shell执行</span></span>
<span class="line"><span># 格式：</span></span>
<span class="line"><span>RUN command</span></span>
<span class="line"><span># 示例：</span></span>
<span class="line"><span>RUN yum -y install vim</span></span>
<span class="line"><span></span></span>
<span class="line"><span># exec执行</span></span>
<span class="line"><span># 格式：</span></span>
<span class="line"><span>RUN [&quot;executable&quot;, &quot;param1&quot;, &quot;param2&quot;]</span></span>
<span class="line"><span># 示例：</span></span>
<span class="line"><span>RUN [&quot;/etc/execfile&quot;, &quot;arg1&quot;, &quot;arg1&quot;]</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 注：RUN指令创建的中间镜像会被缓存，并会在下次构建中使用。如果不想使用这些缓存镜像，可以在构建时指定--no-cache参数，如：docker build --no-cache</span></span></code></pre></div><p><code>EXPOSE</code>：指定当前容器与外界交互的端口</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 格式：</span></span>
<span class="line"><span>EXPOSE port [port...]</span></span>
<span class="line"><span># 示例：</span></span>
<span class="line"><span>EXPOSE 80 443</span></span>
<span class="line"><span>EXPOSE 8080</span></span>
<span class="line"><span>EXPOSE 11211/tcp 11211/udp</span></span>
<span class="line"><span># 注：</span></span>
<span class="line"><span># EXPOSE并不会让容器的端口访问到主机。要使其可访问，需要在docker run运行容器时通过-p来指定映射这些端口</span></span></code></pre></div><p><code>WORKDIR</code>：创建容器后终端默认登录进来的工作目录，一个落脚点</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 格式：</span></span>
<span class="line"><span>WORKDIR /path/to/workdir</span></span>
<span class="line"><span># 示例：</span></span>
<span class="line"><span>WORKDIR /a  # (这时工作目录为/a)</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 注：通过WORKDIR设置工作目录后，Dockerfile中其后的命令RUN、CMD、ENTRYPOINT、ADD、COPY等命令都会在该目录下执行。在使用docker run运行容器时，可以通过-w参数覆盖构建时所设置的工作目录。</span></span></code></pre></div><p><code>ENV</code>：用来在构建镜像过程中设置环境变量</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 格式：</span></span>
<span class="line"><span>ENV key value  #key之后的所有内容均会被视为其value的组成部分，因此，一次只能设置一个变量</span></span>
<span class="line"><span>ENV key1=value1 key2=value2...  #可以设置多个变量，每个变量为一个&quot;key=value&quot;的键值对，如果key中包含空格，可以使用\\来进行转义，也可以通过&quot;&quot;来进行标示；另外，反斜线\\也可以用于续行</span></span>
<span class="line"><span># 示例：</span></span>
<span class="line"><span>ENV MYPATH /usr/local</span></span>
<span class="line"><span>ENV MYPATH1=/usr1/local MYPATH2=/usr2/local \\</span></span>
<span class="line"><span>MYPATH3=/usr3/local</span></span></code></pre></div><p><code>ADD</code>：将本地文件添加到容器中，会自动处理 url 网络资源和 解压 tar 类型文件(网络压缩资源不会被解压)</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 格式：</span></span>
<span class="line"><span>ADD src...dest</span></span>
<span class="line"><span>ADD [&quot;src&quot;,... &quot;dest&quot;] 用于支持包含空格的路径</span></span>
<span class="line"><span># 示例：</span></span>
<span class="line"><span>ADD hom* /mydir/              # 添加所有以&quot;hom&quot;开头的文件 到 /mydir/</span></span>
<span class="line"><span>ADD hom?.txt /mydir/          # ? 替代一个单字符,例如：&quot;home.txt&quot;</span></span>
<span class="line"><span>ADD test.tar /absoluteDir/    # 自动解压缩test.tar，并添加到 /absoluteDir/</span></span></code></pre></div><p><code>COPY</code>：与类似 ADD，拷贝文件和目录到镜像中。将从构建上下文目录中 &lt;源路径&gt; 的文件/目录复制到新的一层的镜像内的 &lt;目标路径&gt; 位置，但是不会自动解压文件，也不能访问网络资源</p><p><code>VOLUME</code>：容器数据卷，用于数据保存和持久化工作</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 格式：</span></span>
<span class="line"><span>VOLUME [&quot;/path/to/dir&quot;]</span></span>
<span class="line"><span># 示例：</span></span>
<span class="line"><span>VOLUME [&quot;/data&quot;]</span></span>
<span class="line"><span>VOLUME [&quot;/var/www&quot;, &quot;/var/log/apache2&quot;, &quot;/etc/apache2&quot;]</span></span>
<span class="line"><span># 注：</span></span>
<span class="line"><span># 一个卷可以存在于一个或多个容器的指定目录，该目录可以绕过联合文件系统，并具有以下功能：</span></span>
<span class="line"><span># 1、卷可以在容器间共享和重用</span></span>
<span class="line"><span># 2、修改卷后会立即生效</span></span>
<span class="line"><span># 3、对卷的修改不会对镜像产生影响</span></span>
<span class="line"><span># 4、卷会一直存在，直到没有任何容器在使用它</span></span></code></pre></div><p><code>CMD</code>：指定一个容器启动时要运行的指令。Dockerfile 中可以有多个 CMD 指令，但只有最后一个生效，CMD 会被 docker run 之后的参数给替换</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 格式：</span></span>
<span class="line"><span>CMD [&quot;executable&quot;,&quot;param1&quot;,&quot;param2&quot;] (执行可执行文件，优先)</span></span>
<span class="line"><span>CMD [&quot;param1&quot;,&quot;param2&quot;] (设置了ENTRYPOINT，则直接调用ENTRYPOINT添加参数)</span></span>
<span class="line"><span>CMD command param1 param2 (执行shell内部命令)</span></span>
<span class="line"><span># 示例：</span></span>
<span class="line"><span>CMD echo &quot;This is a test.&quot;</span></span>
<span class="line"><span>CMD [&quot;catalina.sh&quot;,&quot;run&quot;]</span></span>
<span class="line"><span># 注：</span></span>
<span class="line"><span>CMD不同于RUN，CMD用于指定在容器启动时所要执行的指令，而RUN用于指定镜像构建时所要执行的指令。</span></span></code></pre></div><p><code>ENTRYPOINT</code>：指定一个容器启动时要运行的指令。ENTRYPOINT 的目的和 CMD 一样，都是在指定容器启动程序及参数，不同点是 docker run 之后的参数会被当做参数传递给 ENTRYPOINT，形成新的命令组合</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 格式：</span></span>
<span class="line"><span>ENTRYPOINT [&quot;executable&quot;, &quot;param1&quot;, &quot;param2&quot;] (可执行文件, 优先)</span></span>
<span class="line"><span>ENTRYPOINT command param1 param2 (shell内部命令)</span></span>
<span class="line"><span># 示例：</span></span>
<span class="line"><span>ENTRYPOINT [&quot;top&quot;, &quot;-b&quot;]</span></span>
<span class="line"><span># 注：ENTRYPOINT与CMD非常类似，不同的是通过docker run执行的指令不会覆盖ENTRYPOINT，而docker run指令中指定的任何参数，都会被当做参数再次传递给ENTRYPOINT。Dockerfile中只允许有一个ENTRYPOINT指令，多个ENTRYPOINT指令时会覆盖前面的设置，而只执行最后的ENTRYPOINT指令。</span></span></code></pre></div><p><code>ONBUILD</code>：当构建一个被继承的 Dockerfile 时，该指令将被运行，即父镜像在被子继承后，父镜像的 onbuild 将会被触发</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 格式：</span></span>
<span class="line"><span>ONBUILD [INSTRUCTION]</span></span>
<span class="line"><span># 示例：</span></span>
<span class="line"><span>ONBUILD RUN /usr/local/bin/python-build --dir /app/src</span></span>
<span class="line"><span># 注：</span></span>
<span class="line"><span>#当所构建的镜像被用做其它镜像当作基础镜像时，该镜像中的触发器将会被触发</span></span></code></pre></div><p><code>USER</code>：指定容器运行时的用户名或 UID，后续的 RUN 也会使用指定用户。使用 USER 指定用户时，可以使用用户名、UID 或 GID，或是两者的组合。当服务不需要管理员权限时，可以通过该命令指定运行用户。并且可以在之前创建所需要的用户</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># 格式:</span></span>
<span class="line"><span>USER user</span></span>
<span class="line"><span>USER user:group</span></span>
<span class="line"><span>USER uid</span></span>
<span class="line"><span>USER uid:gid</span></span>
<span class="line"><span>USER user:gid</span></span>
<span class="line"><span>USER uid:group</span></span>
<span class="line"><span># 示例：</span></span>
<span class="line"><span>USER myuser</span></span>
<span class="line"><span># 注：使用USER指定用户后，Dockerfile中其后的命令RUN、CMD、ENTRYPOINT都将使用该用户。镜像构建完成后，通过docker run运行容器时，可以通过-u参数来覆盖所指定的用户。</span></span></code></pre></div><h3 id="dockerfile-样例" tabindex="-1">dockerfile 样例 <a class="header-anchor" href="#dockerfile-样例" aria-label="Permalink to &quot;dockerfile 样例&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span># This my first nginx Dockerfile</span></span>
<span class="line"><span># Version 1.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Base images 基础镜像</span></span>
<span class="line"><span>FROM centos</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#LABEL 维护者信息</span></span>
<span class="line"><span>LABEL name=&quot;*****&quot; \\</span></span>
<span class="line"><span>    email=&quot;****@***.com&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#ENV 设置环境变量</span></span>
<span class="line"><span>ENV PATH /usr/local/nginx/sbin:$PATH</span></span>
<span class="line"><span>ENV WORKPATH /usr/local/nginx-1.8.0</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#ADD  文件放在当前目录下，拷过去会自动解压</span></span>
<span class="line"><span>ADD nginx-1.8.0.tar.gz /usr/local/</span></span>
<span class="line"><span>ADD epel-release-latest-7.noarch.rpm /usr/local/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#RUN 执行以下命令</span></span>
<span class="line"><span>RUN rpm -ivh /usr/local/epel-release-latest-7.noarch.rpm</span></span>
<span class="line"><span>RUN yum install -y wget lftp gcc gcc-c++ make openssl-devel pcre-devel pcre &amp;&amp; yum clean all</span></span>
<span class="line"><span>RUN useradd -s /sbin/nologin -M www</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#WORKDIR 相当于cd</span></span>
<span class="line"><span>WORKDIR $WORKPATH</span></span>
<span class="line"><span></span></span>
<span class="line"><span>RUN ./configure --prefix=/usr/local/nginx --user=www --group=www --with-http_ssl_module --with-pcre &amp;&amp; make &amp;&amp; make install</span></span>
<span class="line"><span></span></span>
<span class="line"><span>RUN echo &quot;daemon off;&quot; &gt;&gt; /etc/nginx.conf</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#EXPOSE 映射端口</span></span>
<span class="line"><span>EXPOSE 80</span></span>
<span class="line"><span></span></span>
<span class="line"><span>#CMD 运行以下命令</span></span>
<span class="line"><span>CMD [&quot;nginx&quot;]</span></span></code></pre></div><h2 id="镜像制作" tabindex="-1">镜像制作 <a class="header-anchor" href="#镜像制作" aria-label="Permalink to &quot;镜像制作&quot;">​</a></h2><h3 id="方式一-通过-dockerfile-使用-docker-build-指令生成镜像" tabindex="-1">方式一：通过 Dockerfile 使用 docker build 指令生成镜像 <a class="header-anchor" href="#方式一-通过-dockerfile-使用-docker-build-指令生成镜像" aria-label="Permalink to &quot;方式一：通过 Dockerfile 使用 docker build 指令生成镜像&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker build -f # 宿主机中Dockerfile文件的绝对路径 -t 新镜像名称[:版本号] 宿主机资源文件路径/.</span></span></code></pre></div><p><code>宿主机资源文件路径</code>：指的是 Dockerfile 文件中使用 ADD 或者 COPY 指令添加的宿主机资源文件路径，例如：上文 Dockerfile 文件中的<code>ADD nginx-1.8.0.tar.gz /usr/local/</code>命令，则宿主机资源文件路径指的是<code>nginx-1.8.0.tar.gz</code>资源文件在宿主机中的路径</p><p>举例：如果上文中添加的<code>nginx-1.8.0.tar.gz</code>资源文件在宿主机中的<code>/root/resources</code>路径下，与 Dockerfile 文件不在同一路径下，则命令后的宿主机资源文件路径为<code>/root/resources</code>。如果添加的资源文件与 Dockerfile 文件在同一路径下，则可以使用相对路径<code>.</code></p><h3 id="方式二-通过使用-docker-commit-指令生成镜像" tabindex="-1">方式二：通过使用 docker commit 指令生成镜像 <a class="header-anchor" href="#方式二-通过使用-docker-commit-指令生成镜像" aria-label="Permalink to &quot;方式二：通过使用 docker commit 指令生成镜像&quot;">​</a></h3><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>docker commit -m=&quot;提交的描述信息&quot; -a=&quot;作者&quot; # 容器ID/容器名称 要创建的目标镜像名[:版本号]</span></span></code></pre></div><p><strong>慎用 docker commit</strong></p><p>使用 docker commit 命令虽然可以比较直观的帮助理解镜像分层存储的概念，但是实际环境中并不会这样使用。如果使用 docker commit 制作镜像，以及后期修改的话，每一次修改都会让镜像更加臃肿一次，所删除的上一层的东西并不会丢失，会一直如影随形的跟着这个镜像，即使根本无法访问到。这会让镜像更加臃肿。</p>`,39),c=[l];function i(t,o,d,r,u,h){return a(),n("div",null,c)}const m=s(e,[["render",i]]);export{k as __pageData,m as default};
