---
title: JDK 选型安装与配置
date: 2022-01-20
categories:
  - 后端
tags:
  - Java
meta:
  - name: description
    content: jdk选型安装与配置
  - name: keywords
    content: jdk,java jdk,jdk安装,jdk配置,java,开发工具包,后端,后端开发
---

### 一、JAVA 抽象层

**1.JVM（JAVA 虚拟机）**

JVM 有很多组件，最开始用户的代码是通过 BAD CODE 写成，然后被 CLASS LOADER 加载，加载完之后就是 JVM 可以识别的内部数据结构。

BAD CODE 可以被执行，也定义了一些数据的类型。

下面是 JAVA 的一些执行引擎。这些引擎通过 ATM 接口和最底下的操作系统进行交互。

![图片31.png](https://ucc.alicdn.com/pic/developer-ecology/f6dd4bc94ea2486889d158ee407ca685.png)

**2.JRE（JAVA 的执行环境）**

JRE 和 JVM 几乎是一体的，但是 JRE 在组织上包括一些基础的类库，比如 java.net 可以保护网络，java.io 可以保护文件，j.u.c 可以帮助构建并发的应用程序，这也是 JAVA 流行的重要原因。

![图片32.png](https://ucc.alicdn.com/pic/developer-ecology/5ad97df88fbc49cb8347ed5bd89e6fdc.png)

**3.** **JDK（开发工具包）**

各种语言都有相应的开发工具包，JDK 就是 JAVA 的开发工具包，里面包含了开发工具。

如果需要开发 JAVA 程序，则需要开发包里面拥有 JAVA 的编译器。

![图片33.png](https://ucc.alicdn.com/pic/developer-ecology/cd6f57f52d63490c8cf625a74d42ea77.png)

###

### 二、历史上的众多 JAVA 实现

历史上有众多 JDK，JAVA 定义了语言规范，使得业界百花齐放，只要遵循这个规范，那就是一个 JAVA 虚拟机。

历史上出现过许多 JAVA 实现，比如 1996 年，SUN 公司提供了 Classic VM，不久后，SUN 公司在 1997 年推出了 Exact VM，特点是效率更高。

之后在 1999 年，SUN 公司收购了 Hotspot 虚拟机，是当时世界上最好的虚拟机，在 1999 年，取代了 Sun 的 Classic VM 虚拟机，成为了默认的 JAVA 虚拟机。之后又出现了 JRockit 和 IBM J9 。但是最终，Hotspot 称为 JAVA 默认的虚拟机。

![图片34.png](https://ucc.alicdn.com/pic/developer-ecology/16c569e98c3246f28e81464955db6ac7.png)

###

### 三、“正统” Open JDK

Hotspot 是 OpenJDK 里面默认的 JAVA 虚拟机实现。OpenJDK 是由 JCP 这个组织去规划它的路线，进而实现它。

在 OpenJDK 基础上加上 Oracle 特性就是可以在 Oracle 官网上下载下来的 Oracle JDK。

然后第三方厂商也会基于 OpenJDK 去构建自己的构造，比如自己的发行版，例如亚马逊的 Corretto，Azul 的 Zulu，阿里巴巴也提供了 JAVA 发行版，在 OpenJDK 的基础上加上阿里巴巴云原生特性，形成了阿里巴巴的 Dragonwell。

![图片35.png](https://ucc.alicdn.com/pic/developer-ecology/c7a4c4f6b4524f9ba26d273949723a0e.png)

### 四、Oracle JDK 生命周期

使用 Oraacle 需要注意很多事情。Oracle JDK 有一个生命周期的限制。

在 Oracle JDK 8 月 212 这个版本开始，它的授权形式从 Oracle Binary Code License 变成了 Oracle Technology Network License。

简单来说，在生长环境使用 Oracle JDK 是要被收费的。下图描绘了 JDK 的生命周期形式。

![图片36.png](https://ucc.alicdn.com/pic/developer-ecology/24f936f2a798421b89c200dc6c6c6f53.png)

红色长条表示 Oracle JDK 的生命周期支持，看蓝色长条表示 Open JDK 的生命周期支持。

对于普通用户来说，需要选择 Open JDK 的发行版，而不是去使用商业版的 Oracle JDK。

### 五、AdoptOpenJDK:JDK 发行的事实标准

目前，整个业界标准是 AdoptOpenJDK 去主导 Open JDK 的发行，因为 Oracle 不做这个发行，自然需要一个第三方组织去发行 Open JDK。

其中成员有 Amazon Corretto、IBM OpenJ9、SAP Machine、Alibaba Dragonwell。

AdoptOpenJDK 影响是非常大的，比如在 Spring 的官网上下载 JDK 的话，它会首先推荐去下载一个 AdoptOpenJDK。

下图是官网上长期的一个测试。

![图片37.png](https://ucc.alicdn.com/pic/developer-ecology/f12b19e5742d477aaca9f4d61c6da1e3.png)

###

### 六、JDK 的质量保证

深挖一下测试是如何进行的，从源码构建出 JDK 的 Release image,它就是平时使用的 JAVA 命令。然后 image 需要通过 JTreg 测试，通过 TCK 的认证，只有经过完整测试之后，才是一个完整的 AdoptOpenJDK 的发行版。

###

### 七、JDK 选型小结

1.优先选择 OpenJDK

2.Oracle 不再免费提供最新的 OpenJDK

3.AdoptOpenJDK 下的 Dragonwell 是一个好的替代品

### 八、Java 运行环境的配置

**1.下载 OpenJDK 发行版**

![图片38.png](https://ucc.alicdn.com/pic/developer-ecology/bf94c3682b86471085586b341c47e8bb.png)

**2.解压安装**

![图片39.png](https://ucc.alicdn.com/pic/developer-ecology/99b9c6cfaf85447fb88f1365e66ed7b6.png)

**3.配置环境**

![图片40.png](https://ucc.alicdn.com/pic/developer-ecology/a154c8147bbe43ac9687dd8b84eeeff7.png)

**4.HelloWorld**

![图片41.png](https://ucc.alicdn.com/pic/developer-ecology/cb972a56dcb9449bb70bf2bcf7cd6d8f.png)
