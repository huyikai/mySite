---
title: pinia
date: 2022-04-03
categories:
  - 前端
tags:
  - vue
  - pinia
meta:
  - name: pinia-vue状态管理工具
    content: pinia——vue官方推荐的状态管理工具
  - name: keywords
    content: pinia,vuex,状态管理,vue状态管理,vue,vuex4
---
# pinia

## Pinia 优势

Pinia 是一个 vue 官方推荐的状态管理工具

1. Vue2 和 Vue3 都能支持
2. 抛弃传统的 `Mutation` ，只有 `state, getter` 和 `action` ，简化状态管理库
3. 不需要嵌套模块，符合 Vue3 的 Composition api，让代码扁平化
4. TypeScript 支持
5. 代码简介，很好的代码自动分割

## Pinia 基本使用

**初始化项目：** `npm init vite@latest`

**安装 Pinia:** `npm i pinia`

### 挂载 Pinia

```typescript
// src/main.ts
import { createAPP } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.mount('#app');
```

### 创建 Store

```typescript
// src/store/index. ts
import { defineStore } from 'pinia';
export const mainStore = defineStore('main', {
  state: () => {
    return {
      msg: 'Hello world!'
    };
  },
  getters: {},
  actions: {}
});
```

### 使用 Store

```vue
// src/components/HelloWorld.vue
<template>
  <h2>{{ store.msg }}</h2>
</template>
<script setup lang="ts">
import { mainStore } from '../store/index';
const store = mainStore();
</script>
```

## 解构 store

当 store 中的多个参数需要被使用到的时候，为了更简洁的使用这些变量，我们通常采用结构的方式一次性获取所有的变量名

### ES 传统方式解构(能获取到值，但是不具有响应性)

```vue
<template>
  <div>
    <h2>ES 传统方式解构 store，count 不会响应式更新</h2>
    <h3>Count is:{{ count }}</h3>
  </div>
</template>
<script setup lang="ts">
import { mainStore } from '../store/index';
import { storeToRefs } from 'pinia';
const store = mainStore();
const { count } = store;
</script>
```

### Pinia 解构方法：storeToRefs

```vue
<template>
  <div>
    <h2>pinia中使用 storeToRefs解构</h2>
    <h3>Count is:{{ count }}</h3>
  </div>
</template>
<script setup lang="ts">
import { mainStore } from '../store/index';
import { storeToRefs } from 'pinia';
const store = mainStore();
const { count } = storeToRefs(store);
</script>
```

## Pinia 修改数据状态

### 简单数据修改

简单数据直接通过在方法中操作 `store.属性名` 来修改

```vue
<template>
  <div>
    <button @click="addOne">+1</button>
  </div>
</template>
<script setup lang="ts">
import { mainStore } from '../store/index';
const store = mainStore();
const addOne = () => {
  store.count++;
};
</script>
```

### 多条数据修改

通过基础数据修改方式去修改多条数据也是可行的，但是在 `pinia` 官网中，已经明确表示`$patch` 的方式是经过优化的，会加快修改速度，对性能有很大好处，所以在进行多条数据修改的时候，更推荐使用 `$patch`

`$patch` 方法可以接受两个类型的参数，函数 和 对象

- **$patch + 对象**
- **$patch + 函数：** 通过函数方式去使用的时候，函数接受一个 state 的参数，state 就是 store 仓库中的 state

```vue
<template>
  <div>
    <button @click="onObj">修改状态（$patch + 对象）</button>
    <button @click="onFunc">修改状态（$patch + 函数）</button>
  </div>
</template>
<script setup lang="ts">
import { mainStore } from '../store/index';
const store = mainStore();

//$spatch + 对象
const onObj = () => {
  store.$pathc({
    count: store.count + 2,
    msg: store.msg === 'Hello world' ? 'hello' : 'world'
  });
};
//$spatch + 函数
const onFunc = () => {
  store.$pathc((state) => {
    state.count = state.count + 2;
    state.msg = store.msg === 'Hello world' ? 'hello' : 'world';
  });
};
</script>
```

### 通过 action 修改

- Store.actions 中添加 `changeState` 方法

  ```typescript
  // src/store/index.ts
  import { definStore } from 'pinia';

  export const mainStore = defineStore('main', {
    state: () => {
      return {
        msg: 'Hello world',
        count: 0
      };
    },
    getters: {},
    actions: {
      changeState() {
        this.count++;
        this.msg = this.mgs === 'Hello world' ? 'hello' : 'world';
      }
    }
  });
  ```

- 组件方法调用 `store.action方法名`

  ```vue
  <template>
    <div>
      <button @click="actionClick">修改多个状态（action）</button>
    </div>
  </template>
  <script setup lang="ts">
  import { mainStore } from '../store/index';
  const store = mainStore();

  //通过 action 修改多个状态
  const actionClick = () => {
    store.changeState();
  };
  </script>
  ```

## Pinia 中的 Getters

Pinia 中的 getter 和 Vue 中的计算属性几乎一样，在获取 State 值之前做一些逻辑处理

1. getter 中的值有缓存特性，如果值没有改变，多次使用也只会调用一次

   - 添加 getter 方法

     ```typescript
     // src/store/index.ts
     import { definStore } from 'pinia';

     export const mainStore = defineStore('main', {
       state: () => {
         return {
           msg: 'Hello world',
           count: 0
         };
       },
       getters: {
         getCountBuff(state) {
           console.log('getter 被调用');
           return state.count * state.count;
         }
       }
     });
     ```

2. getter 中不仅可以传递 `state` 直接改变数据状态，还可以使用 `this` 来改变数据

   ```typescript
   // src/store/index.ts
   import { definStore } from 'pinia';

   export const mainStore = defineStore('main', {
     state: () => {
       return {
         msg: 'Hello world',
         count: 0
       };
     },
     getters: {
       getMsgWithThis(): string {
         return `${this.msg}___${this.msg}`;
       }
     }
   });
   ```

## store 之间的相互调用

在 Pinia 中，可以在一个 `store` 中 `import` 另外一个 `store` ，然后通过调用引入 store 方法的形式，获取引入 `store` 的状态

- 新建 store

  ```typescript
  // src/store/test.ts
  import { defineStore } from 'pinia';
  export const testStore = defineStore('test', {
    state: () => {
      return {
        list: [1, 2, 3, 4, 5]
      };
    }
  });
  ```

- 在原 store 中引入 allanStore，并获取 `moveList`

  ```typescript
  // src/store/index.ts
  import { defineStore } from 'pinia'
  import { testStore } from './test'

  export const mainStore = defineStore('main',{
    state: ()=>{
      return {
        msg:'Hello world'
      }
    },
    getters:{
      getTestStore:string[]{
        return testStore.list
      }
    }
  })
  ```

## 总结

Pinia 即 vuex4，已经在 vue 官网上赫然在列。可以更好的兼容 Vue2，Vue3 以及 TypeScript。在 Vuex 的基础上去掉了 Mutation，只保留了 state, getter 和 action。Pinia 拥有更简洁的语法， 扁平化的代码编排，符合 Vue3 的 Composition api。
