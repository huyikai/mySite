---
title: React 入门与实战
date: 2022-01-13
categories:
  - 前端
tags:
  - React
meta:
  - name: description
    content: React入门与实战
  - name: keywords
    content: React,前端,教程
---
# React 入门与实战

## react 简介

React 起源于 Facebook 的内部项目,因为对市场上所有 JavaScript MVC 框架都不满意,就决定自己写一套,用来架设 Instagram。做出来以后,发现很好用,就在 2013 年 5 月开源了。

清楚两个概念：1.Library(库) 2.Framework(框架)

## 为什么要学 React

1. 和 Angular 1 相比, React 设计很优秀,一切基于 JS 并且实现了组件化开发的思想;
2. 开发团队实力强悍,不必担心断更的情况;
3. 社区强大,很多问题都能找到对应的解决方案;
4. 提供了无缝转到 ReactNative 上的开发体验,让我们技术能力得到了拓展;增强了我们的核心竞争力;
5. 很多企业中前端技术选型是 React;

## React 中几个核心的概念

#### **虚拟 Dom（Virtual Document Object Model）**

**DOM 的本质是什么**:浏览器中的概念,用 JS 对象来表示页面上的元素,并提供了操作 DOM 对象的 API;

**什么是 React 中的虚拟 DOM**:用 JS 对象来模拟页面上的 DOM 和 DOM 嵌套;

**为什么要实现虚拟 DOM (虚拟 DOM 的目的)** :为了实现页面中, DOM 元素的高效更新

**DOM 和虚拟 DOM 的区别：**

DOM 是浏览器中提供的概念，用 JS 对象，表示页面上的元素，并提供操作元素的 API。

虚拟 DOM 是框架中的概念，是开发人员手动用 JS 对象来模拟 DOM 对象和嵌套关系的。

#### Diff 算法

**Tree Diff:** 新旧两个 DOM 树，逐层对比的过程。当整颗 DOM 逐层对比完毕，则所有需要被按需更新的元素，必然能被找到。

**component diff:**在进行 Tree Diff 的时候，每一层中组件级别的对比，叫做 Component Diff。

**element diff:**在进行组件对比的时候，如果两个组件类型相同，则需要进行元素级别的对比。

## 创建基本的 webpack4.x 项目

1. 终端 `npm init -y`

2. 在项目根目录创建 src 和 dist 目录

3. 在 src 目录下创建`index.htm`

4. 使用 npm/cnpm 安装 webpack，运行`npm i webpack webpack-cli -D`

   - 安装 cnpm 全局运行`npm i cnpm -g`

5. 注意 webpack4.x 提供了预定大于配置的概念；目的是为了尽量减少配置文件的体积；webpack.config.js

   - 默认约定了：
   - 打包的入口是`src→index.js`，原有的 entry 也可以使用，会覆盖
   - 打包的输出文件是`dist→main.js`
   - 4.x 中新增了`mode`选项，可选的值为：`development`和`production`

6. 配置 html-webpack-plugin 插件

   `npm i html-webpack-plugin -D`

```javascript
const path =require('path')
const HtmlWebPackPlugin =require('html-webpack-plugin')//导入 在内存中自动生成 index页面的插件

//创建一个插件的实例对象
const htmlPlugin=new HtmlWebPackPlugin({
  template:path.join(__dirname,'./src/index.html'),//源文件
  filename:'index.html'
})

//向外暴露一个打包的配置对象
//因为webpack是基于node构建的，所以webpack支持所有Node API和语法
module.exports={
	mode:'development'//development\production
  //这里不需要配置打包入口entry，因为webpack4.x中，有约定大于配置的特性。默认的打包入口为src→index.js
  plugins:[
  	htmlPlugin
  ]
}

//使用export default{} 行不行？目前不行,这是ES6中 向外导出模块的API，与之对应的是 import ** from **
//哪些特性node支持呢？chrom浏览器支持哪些，Node就支持哪些
```

## 在项目中使用 React

1. 运行`npm i react react-dom -S`安装包

   - react：专门用于创建组件和虚拟 DOM，同时组件的生命周期都在这个包中
   - react-dom：专门进行 DOM 操作。最主要的应用场景 ReactDom.render()

2. 在 index.html 页面中，创建容器：

   ```html
   <!-- 创建一个容器，将来，使用React创建的虚拟DOM元素，都会渲染到 这个指定的容器中 -->
   <div id="app"></div>
   ```

3. 导入包：

   index.js

   ```javascript
   //这两个导入的时候，接收的成员名称必须这么写React、ReactDOM
   import React from 'react'; //创建组件和虚拟DOM元素，生命周期
   import ReactDOM from 'react-dom'; //把创建好的组件和虚拟DOM放到页面上展示的
   ```

4. 创建虚拟 DOM 元素

   ```jsx
   //参数1：创建的元素的类型，字符串，表示元素的名称
   //参数2：是一个对象或null，表示 当前这个DOM元素的属性
   //参数3：子节点（包括其它虚拟DOM获取文本子节点）
   //参数n：其它子节点
   //<h1 id="myh1" title="this is a h1">这是一个H1</h1>
   const myh1 = React.createElement(
     'h1',
     { id: 'myh1', title: 'this is a h1' },
     '这是一个H1'
   );
   ```

5. 调用 render 函数渲染

   ```jsx
   //使用ReactDOM把虚拟DOM渲染到页面上
   //参数1：要渲染的那个虚拟DOM元素
   //参数2：指定容器，注意：这里放一个DOM元素，而不是选择器
   ReactDOM.render(myh1, document.getElementById('app'));
   ```

   如果要写更多更复杂的 DOM 嵌套，上面的方法就略显繁琐

   众所周知 HTML 是最优秀的标记语言

   so 渲染 页面上的 DOM 结构，最好的方式，就是写 HTML 代码

   注意：_在 JS 文件中，默认不能写 这种 类似于 HTML 的标记；否则会打包失败；_

   下面继续有关 JSX 详细内容 ↓

## JSX 语法

`const mydiv=<div id="mydiv" title="div aaa">这是一个div元素</div>`

什么是 JSX 语法：就是符合 xml 规范的 js 语法；（语法格式相对来说，要比 HTML 严谨很多）

1. **如何启用 jsx 语法？**

   - 安装`babel`插件

     - 运行`npm i babel-core babel-loader babel-plugin-transform-runtime -D`
     - 运行`npm i babel-preset-env babel-preset-stage-0 -D`

   - 安装能够识别转换 jsx 语法的包`babel-preset-react`

     - 运行`npm i babel-preset-react -D`

   - 添加`.babelrc`配置文件

     ```json
     {
       "presets": ["env", "stage-0", "react"],
       "plugins": ["transform-runtime"]
     }
     ```

   - 配置 webpack.config.js，添加 babel-loader 配置项

   - ```javascript
     module.exports={
     	...
       //所有第三方 模块的配置规则
       module:{
         reles:[//第三方匹配规则
           {
             text:/\.js|jsx$/,
             use:'babel-loader',
             exclude:/node_modules///千万别忘记添加exclude，排除项
           }
         ]
       }
     }
     ```

2. **JSX 语法的本质：**并不是直接把 JSX 渲染到页面上，而是内部先转换成了 createElement 形式，再渲染的。

3. **在 JSX 中混合写入 js 表达式：**在 JSX 语法中，要把 js 代码写到{}中

   - 渲染数字

   - 渲染字符串

   - 渲染布尔值

   - 为属性绑定值

   - 渲染 JSX 元素

   - 渲染 JSX 元素数组

   - 将普通字符数组转为 JSX 数组并渲染到页面上【两种方案】

     ```jsx
     let arr = [1, 2, 3, 4, 5];
     ReactDOM.render(
       <div>
         {arr.map((item) => (
           <h3>{item}</h3>
         ))}
       </div>,
       document.getElementById('app')
     );
     ```

4. **在 JSX 中写注释：**推荐使用`/* 这是注释 */`

5. **为 JSX 中的元素添加 class 类名：**需要使用`className`来替代`class`；htmlFor 替换 label 的 for 属性

6. 在 JSX 创建 DOM 的时候，所有的节点，必须有唯一的根元素进行包裹

7. 在 JSX 语法中，标签必须 成对出现，如果是单标签，则必须自闭和

> 当编译引擎，在编辑 JSX 代码的时候，如果遇到了`<`那么就把它当做 HTML 代码去编译，如果遇到了`{}`就把花括号内部的代码当做普通 js 代码去编译

## React 中创建组件

#### 第一种-创建组件的方式

> **使用构造函数来创建组件**，如果要接收外接传递的数据，需要在构造函数的参数列表中使用`props`来接收；必须要向外 return 一个合法的 JSX 创建的虚拟 DOM

- 创建组件：

  ```jsx
  function Hello() {
    //return null
    return <div>Hello 组件</div>;
  }
  ```

- 为组件传递数据：

  ```jsx
  //使用组件并为组件传递props数据
  <Hello name={name}></Hello>;

  //在构造函数中，使用props形参，接收外界传递过来的数据
  function Hello(props) {
    //不论是Vue还是React，组件中的props永远都是只读的。
    return <div>Hello组件---{props.name}</div>;
  }
  ```

1. 父组件向子组件传递数据

2. 使用{...obj}属性扩散传递数据 `<div {...data}></div>`

3. 将组件封装到单独的文件中

4. 注意：组件的首字母名称必须是大写开头

5. 如何省略.jsx 后缀名：

   ```javascript
   module.exports={
     ...
     //打开webpack.config.js，并在导出的配置对象中，新增 如下节点：
     resolve:{
       extensions:['.js','.jsx','.json']，//表示，这几个文件的后缀名，可以省略不写
       alias:{
         '@':path.join(_dirname,'./src')//这样，@就表示 项目根目录中 src的这一层路径
       }
     }
   }

   ```

6. 在导入组件的时候，配置和使用`@`路径符号

#### 第二种-创建组件的方式

> 使用 class 关键字来创建组件
>
> ES6 中 class 关键字，是实现面向对象

#### 了解 ES6 中 class 关键字的使用

1. class 中`constructor`的基本使用
2. 实例属性和实例方法
3. 静态属性和静态方法 静态方法前加 static
4. 使用`extends`关键字实现继承
   - 如果一个类，通过 extends 关键字继承了父类，那么，在子类的 constructor 构造函数中，必须优先调用一个 super()

#### 基于 class 关键字创建组件

1. 最基本的组件结构

   ```jsx
   //如果要使用class定义组件，必须 让自己的组件，继承自React.Component
   class 组件名称 extends React.Component{

     //构造器
     contructor(){
       //由于该组件，集成了React.Component这个父类，所以，自定义的构造函数中，必须调用super()
       super()//只有调用了super()以后，才能使用this关键字
       this.state={
         msg:'example'
       }//这个this.state={}就相当于Vue中的data(){ return{} }
     }

     //在组件内部，必须有 render 函数，作用：渲染当前左键对应的 虚拟DOM结构
   	rednder(){
       // render 函数中，必须返回合法的JSX虚拟DOM结构
       //在class关键字创建的组件中，如果想使用外界传递过来的props参数，不需要接收，直接通过this.props.***访问即可
       //注意 不论是class还是普通function创建的组件，它们的props都是只读的

       this.state.msg="修改state"//在class创建的组件中，this.state上的数据，都是可读可写的！

   		return <div>
         这是class创建的组件
         这是传递过来的props参数：{this.props.***}
         这是state：{this.state.msg}
         {/* 注意：在class组件内部，this表示当前组件的实例对象 */}
       </div>
   	}

   }
   ```

## 两种创建组件方式的对比

> 注意：使用 class 关键字创建的组件，有自己的私有数据(this.state)和生命周期函数；
>
> 注意：使用 function 创建的组件，只有 props，没有自己的私有数据和生命周期函数；

1. 用**构造函数**创建出来的组件：叫做”无状态组件“ 【无状态组件今后用的不多】

2. 用**class 关键字**创建出来的组件：叫做”有状态组件“ 【今后用的最多】

3. 什么情况下使用有状态组件？什么情况下使用无状态组件？

   - 如果一个组件需要有自己的私有数据，则推荐使用：class 创建的有状态组件；
   - 如果一个组件不需要私有数据，则推荐使用：无状态组件；
   - React 官方说：无状态组件，由于没有自己的 state 和生命周期函数，所以运行效率会比有状态组件稍微高一些；

> 有状态组件和无状态组件之间的**本质区别**就是：有无 state 属性、和有无生命周期函数

4. 组件中的`props`和`state/data`之间的区别

   - props 中的数据都是外界传递过来的；
   - state/data 中的数据，都是组件私有的；(通过 Ajax 获取回来的的数据，一般都是私有数据)；
   - props 中的数据都是只读的；不能重新赋值；
   - state/data 中的数据，都是可读可写的；

## 渲染评论列表

#### 通过 for 循环生成多个组件

## 设置样式

1. 使用普通的`style`样式

   ```jsx
   <h1 style={{ color: 'red', fontWeight: 200 }}></h1>
   ```

2. 启用 css-modules

   1. 修改`webpack.config.js`这个配置文件，为`css-loader`添加参数：

      ```javascript
      //可以在 css-loader 之后，通过 ？ 追加参数
      //其中，有个固定的参数，叫做 modules，表示为普通的css样式表，启用模块化
      {
        test:/\.css$/,use:['style-loader','css-loader?modules'],//打包处理css样式表的第三方loader
      }
      ```

   2. 在需要的组件中，`import`导入样式表，并接收模块化的 CSS 样式对象：

      ```jsx
      import cssObj from '../css/style.css';
      ```

   3. 在需要的 HTML 标签上，使用`className`指定模块化的样式：

      ```jsx
      <h1 className={cssObj.title}></h1>
      ```

3. 使用`localIdentName`自定义生成的类名格式，可选的参数有：

   - [path]表示样式表`相对于项目根目录`所在路径
   - [name]表示 样式表文件名称
   - [local]表示样式的类名定义名称
   - [hash:length]表示 32 位的 hash 值
   - 例子：`{ test:/\.css$/,use:['style-loader','css-loader?modules&localIdentName=[path][name]-[local]-[hash:5]']}`

4. 使用`:local()`和`:global`

   - `:local()`包裹的类名，是被模块化的类名，只能通过 className={cssObj.类名}来使用

     同时，`:local`默认可以不写，这样，默认在样式表中定义的类名，都是被模块化的类名；

   - `:global()`包裹的类名，是全局生效的，不会被 `css-modules` 控制，定义的类名是什么，就是使用定义的类名 `className="类名"`

5. 注意：只有 `.title`这样的类样式选择器，才会被模块化控制，类似于 `body`这样的标签选择器，不会被模块化控制；

### 在项目中启用模块化并同时使用 bootstrap

1. 把自己的样式表，定义为 `.scss`文件
2. 第三方的样式表，还是已 `.css`结尾
3. 我们只需要为自己的.scss 文件，启用模块化即可
4. 运行 `npm i sass-loader node-sass -D`安装能够解析 `scss`文件的 loader
5.

## React 中绑定事件的注意点

1. 事件的名称都是 React 提供的，因此名称的首字母必须大写 `onClick`、`onMouseOver`

2. 为事件提供的处理函数，必须是如下格式

   ```jsx
   onClick={function}
   ```

3. 用的最多的事件绑定形式为：

   ```jsx
   <button onClick={() => this.show('传参')}>按钮</button>;

   //事件的处理函数，需要定义为一个剪头函数，然后复制给函数名称
   show = (arg1) => {
     console.log('show方法' + arg1);
   };
   ```

4. 在 React 中，如果想要修改 state 中的数据，推荐使用 `this.setState({})`

## 绑定文本框与 state 中的值（单向数据流）

1. 在 Vue 中，默认提供了 `v-model`指令，可以很方便的实现 `数据的双向绑定`
2. 但是，在 React 中，默认只是 `单向数据流`，也就是 只能吧 state 上的数据绑定到页面，无法把页面中数据的变化，自动同步回 state；如果需要把页面上数据的变化，保存到 state ，则需要程序员手动监听 `onChange`事件，拿到最新的数据，手动调用 `this.setState({})`更改回去

## 使用 ref 获取 DOM 元素引用

和 Vue 中差不多，vue 为页面上的元素提供了 `ref`属性，如果想要获取 元素引用，则需要使用 `this.$refs引用名称`

在 React 中，也有 `ref`，如果要获取元素的引用 `this.refs.引用名称`

## 组件的生命周期

- 生命周期的概念：每个组件的实例，从 创建、到运行、直到销毁，在这个过程中，会触发一系列事件，这些事件就叫做组件的生命周期函数；

- React 组件生命周期分为三部分：

  - **组件创建阶段：**特点：一辈子只执行一次

    > componentWillMount:
    >
    > render:
    >
    > componentDidMount:

  - **组件运行阶段：**按需，根据 props 属性或 state 状态的改变，有选择行的执行 0 到多次

    > componentWillRecelveProps:
    >
    > shouldComponentUpdate:
    >
    > componentWillUpdate:
    >
    > Render:
    >
    > componentDidUpdate:

  - **组件销毁阶段：**一辈子只执行一次

    > componentWillUnmount:

  ### defaultProps

  > 在组件创建之前，辉县初始化默认的 props 属性，这是全局调用一次，严格来说，这不是组件的生命周期的一部分。在组件被创建并加载的时候，首先调用 constructor 构造器中的 this.state={}，来初始化组件的状态
