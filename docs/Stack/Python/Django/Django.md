# Django

Django 是一个基于 Python 的开源 Web 应用程序框架，用于快速开发安全且可扩展的网站。

## 创建项目

```shell
django-admin startproject projectname
```

## 运行服务

```shell
python manage.py runserver
```

## 创建应用

```shell
python manage.py startapp appname
```

## 模型

- 编辑 `models.py` 文件，改变模型。

- 运行

  ```shell
  python manage.py makemigrations
  ```

  为模型的改变生成迁移文件。

- 运行

  ```shell
  python manage.py migrate
  ```

  来应用数据库迁移。

## 模版

### 模板命名空间

虽然可以将模板文件直接放在 `appname/templates` 文件夹中（而不是在 templates 中再建立一个 `appname` 子文件夹），但是这样做不太好。Django 将会选择第一个匹配的模板文件，如果你有一个模板文件正好和另一个应用中的某个模板文件重名，Django 没有办法 _区分_ 它们。我们需要帮助 Django 选择正确的模板，最好的方法就是把他们放入各自的 _命名空间_ 中，也就是把这些模板放入一个和 _自身_ 应用重名的子文件夹里。也就是说模板文件的路径应该是 `appname/templates/appname/index.html`

## 安装依赖

```shell
pip install -r requirements.txt
```

Django 的源文件在哪里？
如果你不知道 Django 源码在你系统的哪个位置，运行以下命令：
python -c "import django; print(django.**path**)"
