---
title: vue3+typescript使用
date: 2022-06-12
categories:
  - 前端
tags:
  - vue
meta:
  - name: description
    content: vue3+typescript使用
  - name: keywords
    content: vue,vue3,typescript
---
# vue3+typescript使用

## 环境搭建

```sh
npm init vue@latest
```

```sh
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add Cypress for both Unit and End-to-End testing? … No / Yes
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes

Scaffolding project in ./<your-project-name>...
Done.
```

```sh
cd <your-project-name>
npm install
npm run dev
```

## ref()

`ref()`接受一个内部值，返回一个响应式的、可更改的 `ref` 对象，此对象只有一个指向其内部值的 `property .value`。

### 类型定义

```ts
function ref<T>(value: T): Ref<UnwrapRef<T>>
interface Ref<T> {
  value: T
}
```

### 为 ref() 标注类型

`ref()` 标注类型有三种方式：

1. 通过泛型参数的形式来给 `ref()`增加类型

```ts
import { ref } from 'vue'

const initCode = ref<string | number>('200')
```

1. 如果是遇到复杂点的类型，可以自定义 `interface` 然后泛型参数的形式传入

```ts
import { ref } from 'vue'

interface User {
  name: string
  age: string | number
}

const user = ref<User>({
  name:'前端开发爱好者',
  age: 20
})
```

1. 通过使用 `Ref` 这个类型为 `ref` 内的值指定一个更复杂的类型

```ts
import { ref } from 'vue'
import type { Ref } from 'vue'

const initCode: Ref<string | number> = ref('200')
```

### 三种方式推荐

比较推荐使用`前两种`方式，前两种方式其实都是以`泛型`的形式来标注类型的

第三种方式需要额外的引入：

```ts
import type { Ref } from 'vue'
```

所以不是很推荐(本着能少写一行是一行原则)

## reactive()

`reactive()` 返回一个对象的响应式代理。

### 类型定义

```ts
function reactive<T extends object>(target: T): UnwrapNestedRefs<T>
```

### 为 reactive() 标注类型

`reactive()`标注类型有两种方式：

1. 直接给声明的变量添加类型

```ts
import { reactive } from 'vue'

interface User {
  name: string
  age: string | number
}

const user:User = reactive({
  name:"前端开发爱好者",
  age:'20'
})
```

1. 通过泛型参数的形式来给 `reactive()`增加类型

```ts
import { reactive } from 'vue'

interface User {
  name: string
  age: string | number
}

const user = reactive<User>({
  name:"前端开发爱好者",
  age:'20'
})
```

### 两种方式推荐

`不推荐`使用 `reactive()` 的泛型参数,因为处理了深层次 ref 解包的返回值与泛型参数的类型不同。`推荐直接给声明的变量添加类型`。

## computed ()

接受一个 `getter` 函数，返回一个只读的响应式 `ref` 对象，即 `getter` 函数的返回值。它也可以接受一个带有 `get` 和 `set` 函数的对象来创建一个可写的 `ref` 对象。

### 类型定义

```ts
// 只读
function computed<T>(
  getter: () => T,
  debuggerOptions?: DebuggerOptions
): Readonly<Ref<Readonly<T>>>

// 可写的
function computed<T>(
  options: {
    get: () => T
    set: (value: T) => void
  },
  debuggerOptions?: DebuggerOptions
): Ref<T>
```

### 为 computed() 标注类型

`computed()`标注类型有两种方式：

1. 从其计算函数的返回值上推导出类型

```ts
import { ref, computed } from 'vue'

const count = ref<number>(0)

// 推导得到的类型：ComputedRef<string>
const user = computed(() => count.value + '前端开发爱好者')
```

1. 通过泛型参数显式指定 `computed()` 类型

```ts
const user = computed<string>(() => {
  // 若返回值不是 string 类型则会报错
  return '前端开发爱好者'
})
```

### 两种方式推荐

自动推导类型虽然简单快捷，但是还是希望`手动`的去`指定`其类型，这样更加利于代码的可维护性，所以这里推荐大家使用通过泛型参数显式指定 `computed()` 类型

## defineProps()

为了在声明 `props` 选项时获得完整的类型推断支持，我们可以使用 `defineProps` API，它将自动地在 `script setup` 中使用

### 为 defineProps() 标注类型

1. 从它的参数中推导类型:

```ts
const props = defineProps({
  name: { type: String, required: true },
  age: Number
})
```

1. 通过泛型参数来定义 `props` 的类型

```ts
const props = defineProps<{
  name: string
  age?: number
}>()
```

当然了,我们也可以吧以上的泛型参数定义成一个单独的 `interface`

```ts
interface Props {
  name: string
  age?: number
}

const props = defineProps<Props>()
```

> 以上的两种方式虽然都可以很方便的`标注类型`, 但是失去了对 `props` 定义默认值的能力

目前官方也给出了解决方案,但是目前这个方案还处于实验性,并且需要`显式地选择开启`。

```ts
// vite.config.js
export default {
  plugins: [
    vue({
      reactivityTransform: true
    })
  ]
}
```

通过对 `defineProps()` 的响应性解构来添加默认值:

```ts
<script setup lang="ts">
interface Props {
  name: string
  age?: number
}

const { name = '前端开发爱好者', age = 100 } = defineProps<Props>()
</script>
```

## defineEmits()

为了在声明 `emits` 选项时获得完整的类型推断支持，我们可以使用 `defineEmits` API，它将自动地在 `script setup` 中使用

### 为 defineEmits() 标注类型

`defineEmits()` 标注类型直接推荐`泛型`形式

```ts
import type { GlobalTheme } from 'naive-ui'

const emit = defineEmits<{
  (e: 'setThemeColor', val: GlobalTheme): void
}>()
```

虽然官方还推荐了`运行时`自动推导的一种形式,但是本人不是很推荐

## defineExpose()

`defineExpose()` 编译器宏来显式指定在 `script setup` 组件中要暴露出去的 `property`,使得父组件通过`模板ref`的方式获取到当前组件的实例

### 为 defineExpose() 标注类型

`defineExpose()` 类型推导直接使用参数类型自动推到即可

```ts
<script setup>
import { ref } from 'vue'

const name = ref<string>('前端开发爱好者')

defineExpose({
  name
})
```

## provide()

`provide()`供给一个值，可以被后代组件注入

### 类型定义

```ts
function provide<T>(key: InjectionKey<T> | string, value: T): void
```

### 为 provide() 标注类型

为 `provide()` 标注类型, Vue 提供了一个 `InjectionKey` 接口，它是一个继承自 `Symbol` 的泛型类型，可以用来在提供者和消费者之间同步注入值的类型

```ts
import type { InjectionKey } from 'vue'

// 建议声明 key (name) 放到公共的文件中
// 这样就可以在 inject 的时候直接导入使用
const name = Symbol() as InjectionKey<string>

provide(name, '前端开发爱好者') // 若提供的是非字符串值会导致错误
```

以上方式是通过定义 key 的类型来标注类型的,还有一种方式直接 `key` 采用`字符串`的形式添加

```ts
provide('name', '前端开发爱好者')
```

## inject()

`inject()`注入一个由祖先组件或整个应用供给的值

### 类型定义

```ts
// 没有默认值
function inject<T>(key: InjectionKey<T> | string): T | undefined

// 带有默认值
function inject<T>(key: InjectionKey<T> | string, defaultValue: T): T

// 使用工厂函数
function inject<T>(
  key: InjectionKey<T> | string,
  defaultValue: () => T,
  treatDefaultAsFactory: true
): T
```

### 为 inject() 标注类型

`provide()` 的 `key` 的类型是声明式提供的话(provide()类型标注的第一种形式)

`inject()` 可以直接导入声明的 `key` 来获取父级组件提供的值

```ts
// 由外部导入
const name = Symbol() as InjectionKey<string>

const injectName = inject(name)
```

如果 `provide()` 的 `key` 直接使用的`字符串`形式添加的, 需要通过泛型参数声明

```ts
const injectName = inject<string>('name')
```

## 模板 ref

模板 `ref` 需要通过一个显式指定的`泛型参数`和一个`初始值 null` 来创建：

```ts
<img ref="el" class="logo" :src="Logo" alt="" />

const el = ref<HTMLImageElement | null>(null)
```

## 组件 ref

有时，你可能需要为一个子组件添加一个模板 ref，以便调用它公开的方法

```html
<!-- Child.vue -->
<script setup lang="ts">
const handleLog = () => console.log('前端开发爱好者')

defineExpose({
  open
})
</script>
```

为了获取 `MyModal` 的类型，我们首先需要通过 `typeof` 得到其类型，再使用 `TypeScript` 内置的 `InstanceType` 工具类型来获取其实例类型：

```html
<!-- parent.vue -->
<script setup lang="ts">
import Child from './Child.vue'

// 为子组件 ref 声明类型
const child = ref<InstanceType<typeof Child> | null>(null)

// 调用子组件中的方法
const getChildHandleLog = () => {
  child.value?.handleLog()
}
</script>
```

## 事件处理器

原生的 DOM 事件标注类型

```html
<template>
  <input type="text" @change="handleChange" />
</template>

<script setup lang="ts">
function handleChange(event: Event) {
  console.log((event.target as HTMLInputElement).value)
}
</script>
```