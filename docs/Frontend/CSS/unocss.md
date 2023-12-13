# UnoCSS

[HomePage](https://unocss.dev)

## 简介

UnoCSS 是即时原子 CSS 引擎，旨在灵活和可扩展。不拘一格是它的核心，所有 CSS 实用程序都是通过预设提供的。

举个简单的例子，我们可以通过在本地配置文件中提供规则来定义自定义CSS实用程序。

```typescript
// uno.config.ts
import { defineConfig } from 'unocss'

export default defineConfig({
  rules: [
    ['m-1', { margin: '1px' }]
  ],
})
```

这将向您的项目中添加一个新的css实用程序 `m-1`。因为UnoCSS是按需的，所以在您的代码库中使用它之前，它不会做任何事情。假设我们有这样一个组件：

```vue
<div class="m-1">Hello</div>
```

`m-1` 将被检测到，并将生成以下css：

```css
.m-1 { margin: 1px; }
```

为了使其更加灵活，您可以通过将规则上的第一个参数 (我们称之为matcher) 更改为RegExp，并将主体更改为函数来使规则动态，例如:

```typescript
// uno.config.ts
export default defineConfig({
  rules: [
-    ['m-1', { margin: '1px' }]
+    [/^m-([\.\d]+)$/, ([_, num]) => ({ margin: `${num}px` })],
  ],
})
```

通过这样做，现在您可以拥有任意的保证金实用程序，如m-1、m-100或m-52.43。同样，UnoCSS只在您使用它们时生成它们。

```vue
<div class="m-1">Hello</div>
<div class="m-7.5">World</div>
```

```css
.m-1 { margin: 1px; }
.m-7.5 { margin: 7.5px; }
```



## 安装使用

::: code-group

  ```bash [pnpm]
pnpm add -D unocss
  ```
  ```bash [yarn]
yarn add -D unocss
  ```
  ```bash [npm]
npm install -D unocss
  ```
:::

### 安装插件:

```typescript
// vite.config.ts
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
  ],
})
```

### 创建 `uno.config.ts` 文件:

```typescript
// uno.config.ts
import { defineConfig } from 'unocss'

export default defineConfig({
  // ...UnoCSS options
})
```

### 将 `virtual:uno.css` 添加到项目主入口:

```typescript
// main.ts
import 'virtual:uno.css'
```

## UnoCSS 与其他 CSS 框架有何不同

### Windi CSS [](https://unocss.dev/guide/why#windi-css)

UnoCSS是由 Windi CSS 的一名团队成员发起的，我们在 Windi CSS 中所做的工作给了我们很多灵感。虽然 Windi CSS不再被积极维护（截至2023年3月），但你可能会认为 UnoCSS 是 Windi CSS 的“精神继承者”。

UnoCSS 继承了 Windi 的按需自然、归因模式、快捷方式、变体组、编译模式等等。除此之外，UnoCSS 的构建考虑到了最大的可扩展性和性能，使我们能够引入新功能，如纯CSS图标、无价值归因、标记、网络字体等。

最重要的是，UnoCSS被提取为一个原子 CSS 引擎，所有功能都可以选择加入，并可以轻松创建自己的约定、自己的设计系统和自己的预设，以及您想要的功能组合。

### Tailwind CSS [](https://unocss.dev/guide/why#tailwind-css)

Windi CSS 和 UnoCSS 都从 Tailwind CSS 中获得了很多灵感。由于 UnoCSS 是建立在基础上的，我们能够很好地概述原子 CSS 是如何使用现有技术设计的，并将其抽象为优雅而强大的API。由于设计目标截然不同，与 Tailwind CSS 相比，这并不是一个苹果对苹果的比较。但我们将尝试列出一些不同之处：

Tailwind CSS 是一个 PostCSS 插件，而 UnoCSS 是一个同构引擎，具有一系列与构建工具（包括 PostCSS 插件）的一流集成。这意味着 UnoCSS 可以更灵活地在不同的地方使用（例如，CDN Runtime，它可以动态生成CSS），并与构建工具进行深度集成，以提供更好的 HMR、性能和开发人员体验（例如，Inspector）。

抛开技术上的权衡不谈，UnoCSS 也被设计为完全可扩展和可定制，而 Tailwind CSS 则更具主见。在 Tailwind CSS 之上构建一个自定义的设计系统（或设计令牌）可能很困难，而且你不能真正脱离 Tailwind CSS 的约定。使用 UnoCSS，您可以在完全控制的情况下构建几乎任何您想要的东西。例如，我们在一个预设中实现了整个 Tailwind CSS 兼容实用程序，并且有很多很棒的社区预设和其他有趣的哲学。