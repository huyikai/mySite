# pnpm

[文档](https://pnpm.io/zh/installation)

## 安装

### 通过 npm 安装​

```shell
npm install -g pnpm
```

### 使用 HomeBrew​

如果您安装了包管理器，则可以使用以下命令安装 pnpm：

```shell
brew install pnpm
```



### 常用命令

```shell
pnpm -v #查看已安装的pnpm的版本

pnpm install xxx/pnpm i #xxx安装依赖

pnpm run xxx #运行package.json中scripts脚本

pnpm config get registry #查看源

pnpm config set registry <淘宝源或私服> #切换源

pnpm add xxx #安装依赖包到 dependencies

pnpm add -D xxx #安装依赖包到devDependencies

pnpm update xxx/pnpm up  #xxx更新依赖包

pnpm remove xxx #删除依赖包
```