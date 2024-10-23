---
title: 'React Hooks API 介绍与使用'
description: 'React Hooks API 介绍与使用'
author: 'huyikai'
tags: ['react', 'frontend']
---

## 1. useState

定义变量，使其具备类组件的 `state`，让函数式组件拥有更新视图的能力。

**基本使用：**

```typescript
const [state, setState] = useState(initData)
```

**Params：**

- initData：默认初始值，有两种情况：函数和非函数，如果是函数，则函数的返回值作为初始值。

**Result：**

- state：数据源，用于渲染`UI 层`的数据源；
- setState：改变数据源的函数，可以理解为类组件的 `this.setState`。

**基本用法：** 主要介绍两种`setState`的使用方法。

```typescript
import { useState } from "react";
import { Button } from "antd";

const Index: React.FC<any> = () => {
  const [count, setCount] = useState<number>(0);

  return (
    <>
      <div>数字：{count}</div>
      <Button type="primary" onClick={() => setCount(count + 1)}>
        第一种方式+1
      </Button>
      <Button
        type="primary"
        style={{ marginLeft: 10 }}
        onClick={() => setCount((v) => v + 1)}
      >
        第二种方式+1
      </Button>
    </>
  );
};

export default Index;
```

**注意：** `useState` 有点类似于 `PureComponent`，它会进行一个比较浅的比较，这就导致了一个问题，如果是对象直接传入的时候，并不会实时更新，这点一定要切记。

## 2. useEffect

副作用，这个钩子成功弥补了函数式组件没有生命周期的缺陷，是我们最常用的钩子之一。

**基本使用：**

```typescript
useEffect(()=>{ 
    return destory
}, deps)
```

**Params：**

- callback：useEffect 的第一个入参，最终返回 `destory`，它会在下一次 callback 执行之前调用，其作用是清除上次的 callback 产生的副作用；
- deps：依赖项，可选参数，是一个数组，可以有多个依赖项，通过依赖去改变，执行上一次的 callback 返回的 destory 和新的 effect 第一个参数 callback。

**模拟挂载和卸载阶段** **：**

事实上，destory 会用在组件卸载阶段上，把它当作组件卸载时执行的方法就 ok，通常用于监听 `addEventListener` 和 `removeEventListener` 上，如：

```typescript
import { useState, useEffect } from "react";
import { Button } from "antd";

const Child = () => {
  useEffect(() => {
    console.log("挂载");

    return () => {
      console.log("卸载");
    };
  }, []);

  return <div>大家好，我是小杜杜，一起学习hooks吧！</div>;
};

const Index: React.FC<any> = () => {
  const [flag, setFlag] = useState(false);

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setFlag((v) => !v);
        }}
      >
        {flag ? "卸载" : "挂载"}
      </Button>
      {flag && <Child />}
    </>
  );
};

export default Index;

```

`dep`的个数决定`callback`什么时候执行，如：

```typescript
import { useState, useEffect } from "react";
import { Button } from "antd";

const Index: React.FC<any> = () => {
  const [number, setNumber] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("count改变才会执行");
  }, [count]);

  return (
    <>
      <div>
        number: {number} count: {count}
      </div>
      <Button type="primary" onClick={() => setNumber((v) => v + 1)}>
        number + 1
      </Button>
      <Button
        type="primary"
        style={{ marginLeft: 10 }}
        onClick={() => setCount((v) => v + 1)}
      >
        count + 1
      </Button>
    </>
  );
};

export default Index;
```

**无限执行：**

当 useEffect 的第二个参数 deps 不存在时，会无限执行。更加准确地说，只要数据源发生变化（不限于自身中），该函数都会执行，所以请不要这么做，否则会出现不可控的现象。

## 3. useContext

上下文，类似于 `Context`，其本意就是设置全局共享数据，使所有组件可跨层级实现共享。

useContext 的参数一般是由 `createContext` 创建，或者是父级上下文 `context`传递的，通过 `CountContext.Provider` 包裹的组件，才能通过 `useContext` 获取对应的值。我们可以简单理解为 `useContext` 代替 `context.Consumer` 来获取 `Provider` 中保存的 `value` 值。

**基本使用：**

```typescript
const contextValue = useContext(context)
```

**Params：**

- context：一般而言保存的是 context 对象。

**Result：**

- contextValue：返回的数据，也就是`context`对象内保存的`value`值。

**基本用法：** 子组件 Child 和孙组件 Son，共享父组件 Index 的数据 count

```typescript
import { useState, createContext, useContext } from "react";
import { Button } from "antd";

const CountContext = createContext(-1);

const Child = () => {
  const count = useContext(CountContext);

  return (
    <div style={{ marginTop: 10 }}>
      子组件获取到的count: {count}
      <Son />
    </div>
  );
};

const Son = () => {
  const count = useContext(CountContext);

  return <div style={{ marginTop: 10 }}>孙组件获取到的count: {count}</div>;
};

const Index: React.FC<any> = () => {
  let [count, setCount] = useState(0);

  return (
    <>
      <div>父组件中的count：{count}</div>
      <Button type="primary" onClick={() => setCount((v) => v + 1)}>
        点击+1
      </Button>
      <CountContext.Provider value={count}>
        <Child />
      </CountContext.Provider>
    </>
  );
};

export default Index;
```



## 4. useReducer

功能类似于 `redux`，与 redux 最大的不同点在于它是单个组件的状态管理，组件通讯还是要通过 props。简单地说，useReducer 相当于是 useState 的升级版，用来处理复杂的 state 变化。

 **基本使用：**

```typescript
const [state, dispatch] = useReducer(
    (state, action) => {}, 
    initialArg,
    init
);
```

**Params：**

- reducer：函数，可以理解为 redux 中的 reducer，最终返回的值就是新的数据源 state；
- initialArg：初始默认值；
- init：惰性初始化，可选值。

**Result：**

- state：更新之后的数据源；
- dispatch：用于派发更新的`dispatchAction`，可以认为是`useState`中的`setState`。

> 问：什么是惰性初始化？
>
> 答：惰性初始化是一种延迟创建对象的手段，直到被需要的第一时间才去创建，这样做可以将用于计算 state 的逻辑提取到 reducer 外部，这也为将来对重置 state 的 action 做处理提供了便利。换句话说，如果有 `init`，就会取代 `initialArg`。

**基本用法：**

```typescript
import { useReducer } from "react";
import { Button } from "antd";

const Index: React.FC<any> = () => {
  const [count, dispatch] = useReducer((state: number, action: any) => {
    switch (action?.type) {
      case "add":
        return state + action?.payload;
      case "sub":
        return state - action?.payload;
      default:
        return state;
    }
  }, 0);

  return (
    <>
      <div>count：{count}</div>
      <Button
        type="primary"
        onClick={() => dispatch({ type: "add", payload: 1 })}
      >
        加1
      </Button>
      <Button
        type="primary"
        style={{ marginLeft: 10 }}
        onClick={() => dispatch({ type: "sub", payload: 1 })}
      >
        减1
      </Button>
    </>
  );
};

export default Index;
```

**特别注意：** 在 reducer 中，如果返回的 state 和之前的 state 值相同，那么组件将不会更新。

比如这个组件是子组件，并不是组件本身，然后我们对上面的例子稍加更改，看看这段代码，可以看到，当 count 无变化时，子组件并不会更新

```typescript
const Index: React.FC<any> = () => {
  console.log("父组件发生更新");
  ...
  return (
    <>
        ...
      <Button
        type="primary"
        style={{ marginLeft: 10 }}
        onClick={() => dispatch({ type: "no", payload: 1 })}
      >
        无关按钮
      </Button>
      <Child count={count} />
    </>
  )
};

const Child: React.FC<any> = ({ count }) => {
  console.log("子组件发生更新");
  return <div>在子组件的count：{count}</div>;
};
```

## 5. useMemo

**场景：** 在每一次的状态更新中，都会让组件重新绘制，而重新绘制必然会带来不必要的性能开销，为了防止没有意义的性能开销，React Hooks 提供了 useMemo 函数。

理念与 `memo` 相同，都是判断是否满足当前的限定条件来决定是否执行`callback` 函数。它之所以能带来提升，是因为在依赖不变的情况下，会返回相同的引用，避免子组件进行无意义的重复渲染。

**基本使用：**

```typescript
const cacheData = useMemo(fn, deps)
```

**Params：**

- fn：函数，函数的返回值会作为缓存值；
- deps：依赖项，数组，会通过数组里的值来判断是否进行 fn 的调用，如果发生了改变，则会得到新的缓存值。

**Result：**

- cacheData：更新之后的数据源，即 fn 函数的返回值，如果 deps 中的依赖值发生改变，将重新执行 fn，否则取上一次的缓存值。

**问题源泉：**

```typescript
import { useState } from "react";
import { Button } from "antd";

const usePow = (list: number[]) => {
  return list.map((item: number) => {
    console.log("我是usePow");
    return Math.pow(item, 2);
  });
};

const Index: React.FC<any> = () => {
  let [flag, setFlag] = useState(true);

  const data = usePow([1, 2, 3]);

  return (
    <>
      <div>数字集合：{JSON.stringify(data)}</div>
      <Button type="primary" onClick={() => setFlag((v) => !v)}>
        状态切换{JSON.stringify(flag)}
      </Button>
    </>
  );
};

export default Index;
```

以上代码，按钮切换的 flag 应该与 usePow 的数据毫无关系，但当我们切换按钮的时候，usePow 中会打印`我是usePow`，这样就会产生开销，所以有了 `useMemo`。

```typescript
const usePow = (list: number[]) => {
  return useMemo(
    () =>
      list.map((item: number) => {
        console.log(1);
        return Math.pow(item, 2);
      }),
    []
  );
};
```



## 6. useCallback

与 useMemo 极其类似，甚至可以说一模一样，唯一不同的点在于，useMemo 返回的是值，而 useCallback 返回的是函数。

**基本使用：**

```ts
const resfn = useCallback(fn, deps)
```

**Params：**

- fn：函数，函数的返回值会作为缓存值；
- deps：依赖项，数组，会通过数组里的值来判断是否进行 fn 的调用，如果依赖项发生改变，则会得到新的缓存值。

**Result：**

- resfn：更新之后的数据源，即 fn 函数，如果 deps 中的依赖值发生改变，将重新执行 fn，否则取上一次的函数。

**基础用法：**

```
import { useState, useCallback, memo } from "react";
import { Button } from "antd";

const Index: React.FC<any> = () => {
  let [count, setCount] = useState(0);
  let [flag, setFlag] = useState(true);

  const add = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <>
      <TestButton onClick={() => setCount((v) => v + 1)}>普通点击</TestButton>
      <TestButton onClick={add}>useCallback点击</TestButton>
      <div>数字：{count}</div>
      <Button type="primary" onClick={() => setFlag((v) => !v)}>
        切换{JSON.stringify(flag)}
      </Button>
    </>
  );
};

const TestButton = memo(({ children, onClick = () => {} }: any) => {
  console.log(children);
  return (
    <Button
      type="primary"
      onClick={onClick}
      style={children === "useCallback点击" ? { marginLeft: 10 } : undefined}
    >
      {children}
    </Button>
  );
});

export default Index;
```

简要说明下，`TestButton` 里是个按钮，分别存放着有无 useCallback 包裹的函数，在父组件 Index 中有一个 flag 变量，这个变量同样与 count 无关，那么，我们切换按钮的时候，可以看到，我们切换 flag 的时候，没有经过 useCallback 的函数会再次执行，而包裹的函数并没有执行（点击“普通点击”按钮的时候，useCallbak 的依赖项 count 发生了改变，所以会打印出 useCallback 点击）。

## 7. useRef

用于获取当前元素的所有属性，除此之外，还有一个高级用法：缓存数据（`自定义Hooks` 相关）。

**基本使用：**

```ts
const ref = useRef(initialValue);
```

**Params：**

- initialValue：初始值，默认值。

**Result：**

- ref：返回的一个 current 对象，这个 current 属性就是 ref 对象需要获取的内容。

**基本用法：**

```ts
import { useState, useRef } from "react";

const Index: React.FC<any> = () => {
  const scrollRef = useRef<any>(null);
  const [clientHeight, setClientHeight] = useState<number>(0);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [scrollHeight, setScrollHeight] = useState<number>(0);

  const onScroll = () => {
    if (scrollRef?.current) {
      let clientHeight = scrollRef?.current.clientHeight; //可视区域高度
      let scrollTop = scrollRef?.current.scrollTop; //滚动条滚动高度
      let scrollHeight = scrollRef?.current.scrollHeight; //滚动内容高度
      setClientHeight(clientHeight);
      setScrollTop(scrollTop);
      setScrollHeight(scrollHeight);
    }
  };

  return (
    <>
      <div>
        <p>可视区域高度：{clientHeight}</p>
        <p>滚动条滚动高度：{scrollTop}</p>
        <p>滚动内容高度：{scrollHeight}</p>
      </div>
      <div
        style={{ height: 200, border: "1px solid #000", overflowY: "auto" }}
        ref={scrollRef}
        onScroll={onScroll}
      >
        <div style={{ height: 2000 }}></div>
      </div>
    </>
  );
};

export default Index;
```

## 8. useImperativeHandle

可以通过 ref 或 forwardRef 暴露给父组件的实例值，所谓的实例值是指值和函数。

实际上这个钩子非常有用，简单来讲，这个钩子可以让不同的模块关联起来，让父组件调用子组件的方法。

举个例子，在一个页面很复杂的时候，我们会将这个页面进行模块化，这样会分成很多个模块，有的时候我们需要在`最外层的组件上`控制其他组件的方法，希望最外层的点击事件同时执行`子组件的事件`，这时就需要 useImperativeHandle 的帮助（在不用`redux`等状态管理的情况下）。

**基本使用：**

```ts
useImperativeHandle(ref, createHandle, deps)
```

**Params：**

- ref：接受 useRef 或 forwardRef 传递过来的 ref；
- createHandle：处理函数，返回值作为暴露给父组件的 ref 对象；
- deps：依赖项，依赖项如果更改，会形成新的 ref 对象。

**父组件是函数式组件：**

```ts
import { useState, useRef, useImperativeHandle } from "react";
import { Button } from "antd";

const Child = ({cRef}:any) => {

  const [count, setCount] = useState(0)

  useImperativeHandle(cRef, () => ({
    add
  }))

  const add = () => {
    setCount((v) => v + 1)
  }

  return <div>
    <p>点击次数：{count}</p>
    <Button onClick={() => add()}> 子组件的按钮，点击+1</Button>
  </div>
}

const Index: React.FC<any> = () => {
  const ref = useRef<any>(null)

  return (
    <>
      <div>大家好，我是小杜杜，一起学习hooks吧！</div>
      <div></div>
      <Button
        type="primary"
        onClick={() =>  ref.current.add()}
      >
        父组件上的按钮，点击+1
      </Button>
      <Child cRef={ref} />
    </>
  );
};

export default Index;
```

## 9. useLayoutEffect

与 useEffect 基本一致，不同点在于它是同步执行的。简要说明：

- 执行顺序：useLayoutEffect 是在 DOM 更新之后，浏览器绘制之前的操作，这样可以更加方便地修改 DOM，获取 DOM 信息，这样浏览器只会绘制一次，所以 useLayoutEffect 的执行顺序在 useEffect 之前；
- useLayoutEffect 相当于有一层防抖效果；
- useLayoutEffect 的 callback 中会阻塞浏览器绘制。

**基本使用：**

```ts
useLayoutEffect(callback,deps)
```

**防抖效果：**

```ts
import { useState, useEffect, useLayoutEffect } from "react";

const Index: React.FC<any> = () => {
  let [count, setCount] = useState(0);
  let [count1, setCount1] = useState(0);

  useEffect(() => {
    if(count === 0){
      setCount(10 + Math.random() * 100)
    }
  }, [count])

  useLayoutEffect(() => {
    if(count1 === 0){
      setCount1(10 + Math.random() * 100)
    }
  }, [count1])

  return (
    <>
      <div>大家好，我是小杜杜，一起玩转Hooks吧！</div>
      <div>useEffect的count:{count}</div>
      <div>useLayoutEffect的count:{count1}</div>
    </>
  );
};

export default Index;
```

在这个例子中，我们分别设置 count 和 count1 两个变量，初始值都为 0，然后分别通过 useEffect 和 useLayout 控制，通过随机值来变更两个变量的值。也就是说，count 和 count1 连续变更了两次。

从效果上来看，count 要比 count1 更加抖动（效果可能感觉不到，建议自己试试，刷新的快点就能看到效果）。

这是因为两者的执行顺序，简要分析下：

- useEffect 执行顺序：setCount 设置 => 在 DOM 上渲染 => useEffect 回调 => setCount 设置 => 在 DOM 上渲染。
- useLayoutEffect 执行顺序：setCount 设置 => useLayoutEffect 回调 => setCount 设置 => 在 DOM 上渲染。

可以看出，useEffect 实际进行了两次渲染，这样就可能导致浏览器再次回流和重绘，增加了性能上的损耗，从而会有闪烁突兀的感觉。

> 问：既然 useEffect 会执行两次渲染，导致回流和重绘，相比之下， useLayoutEffect 的效果要更好，那么为什么都用 useEffect 而不用 useLayoutEffect 呢？
>
> 答：根本原因还是同步和异步，虽然 useLayoutEffect 只会渲染一次，但切记，它是同步，类比于 Class 组件中，它更像 componentDidMount，因为它们都是同步执行。既然是同步，就有可能阻塞浏览器的渲染，而 useEffect 是异步的，并不会阻塞渲染。
>
> 其次，给用户的感觉不同，对比两者的执行顺序，useLayoutEffect 要经过本身的回调才设置到 DOM 上，也就是说， useEffect 呈现的速度要快于 useLayoutEffect，让用户有更快的感知。
>
> 最后，即使 useEffect 要渲染两次，但从效果上来看，变换的时间非常短，这样情况下，也无所谓，除非闪烁、突兀的感觉非常明显，才会去考虑使用 useLayoutEffect 去解决。

## 10. useDebugValue

**useDebugValue：** 可用于在 React 开发者工具中显示自定义 Hook 的标签。这个 Hooks 目的就是检查自定义 Hooks。

**注意：** 这个标签并不推荐向每个 hook 都添加 debug 值。当它作为共享库的一部分时才最有价值。（也就是自定义 Hooks 被复用的值）。因为在一些情况下，格式化值可能是一项开销很大的操作，除非你需要检查 Hook，否则没有必要这么做。

**基本使用：**

```ts
useDebugValue(value, (status) => {})
```

**Params：**

- value：判断的值；
- callback：可选，这个函数只有在 Hook 被检查时才会调用，它接受 debug 值作为参数，并且会返回一个格式化的显示值。

**基本用法：**

```ts
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // ...

  // 在开发者工具中的这个 Hook 旁边显示标签  
  // e.g. "FriendStatus: Online"  useDebugValue(isOnline ? 'Online' : 'Offline');
  return isOnline;
}
```

## useSyncExternalStore

会通过强制的同步状态更新，使得外部 `store` 可以支持并发读取。

**注意：** 这个 Hooks 并不是在日常开发中使用的，而是给第三方库 `redux`、`mobx` 使用的，因为在 React v18 中，主推的 Concurrent（并发）模式可能会出现状态不一致的问题（比如在 `react-redux 7.2.6` 的版本），所以官方给出 useSyncExternalStore 来解决此类问题。

简单地说，useSyncExternalStore 能够让 React 组件在 Concurrent 模式下安全、有效地读取外接数据源，在组件渲染过程中能够检测到变化，并且在数据源发生变化的时候，能够调度更新。

当读取到外部状态的变化，会触发强制更新，以此来保证结果的一致性。

**基本使用：**

```ts
const state = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
)
```

**Params：**

- subscribe：订阅函数，用于注册一个回调函数，当存储值发生更改时被调用。 此外，useSyncExternalStore 会通过带有记忆性的 getSnapshot 来判断数据是否发生变化，如果发生变化，那么会强制更新数据；
- getSnapshot：返回当前存储值的函数。必须返回缓存的值。如果 getSnapshot 连续多次调用，则必须返回相同的确切值，除非中间有存储值更新；
- getServerSnapshot：返回服务端（`hydration` 模式下）渲染期间使用的存储值的函数。

**Result：**

- state：数据源，用于渲染 `UI 层`的数据源。

**基本用法：**

当我们点击按钮后，会触发 store.subscribe（订阅函数），执行 getSnapshot 后得到新的 count，此时 count 发生变化，就会触发更新。

```ts
import { useSyncExternalStore } from "react";
import { Button } from "antd";
import { combineReducers, createStore } from "redux";

const reducer = (state: number = 1, action: any) => {
  switch (action.type) {
    case "ADD":
      return state + 1;
    case "DEL":
      return state - 1;
    default:
      return state;
  }
};

/* 注册reducer,并创建store */
const rootReducer = combineReducers({ count: reducer });
const store = createStore(rootReducer, { count: 1 });

const Index: React.FC<any> = () => {
  //订阅
  const state = useSyncExternalStore(
    store.subscribe,
    () => store.getState().count
  );

  return (
    <>
      <div>大家好，我是小杜杜，一起玩转Hooks吧！</div>
      <div>数据源： {state}</div>
      <Button type="primary" onClick={() => store.dispatch({ type: "ADD" })}>
        加1
      </Button>
      <Button
        style={{ marginLeft: 8 }}
        onClick={() => store.dispatch({ type: "DEL" })}
      >
        减1
      </Button>
    </>
  );
};

export default Index;
```

## useTransition

**useTransition：** 返回一个状态值表示过渡更新任务的等待状态，以及一个启动该过渡更新任务的函数。

> 问：什么是过渡更新任务？
>
> 答：过渡任务是对比紧急更新任务所产生的。
>
> 紧急更新任务指，输入框、按钮等任务需要在视图上立即做出响应，让用户立马能够看到效果的任务。
>
> 但有时，更新任务不一定那么紧急，或者说需要去请求数据，导致新的状态不能够立马更新，需要一个 `loading...` 的状态，这类任务称为过渡任务。

我们再来举个比较常见的例子帮助理解紧急更新任务和过渡更新任务。

当我们有一个 `input` 输入框，这个输入框的值要维护一个很大列表（假设列表有 1w 条数据），比如说过滤、搜索等情况，这时有两种变化：

1. input 框内的变化；
2. 根据 input 的值，1w 条数据的变化。

input 框内的变化是实时获取的，也就是受控的，此时的行为就是紧急更新任务。而这 1w 条数据的变化，就会有过滤、重新渲染的情况，此时这种行为被称为过渡更新任务。

**基本使用：**

```ts
const [isPending, startTransition] = useTransition();
```

**Result：**

- isPending：布尔值，过渡状态的标志，为 true 时表示等待状态；
- startTransition：可以将里面的任务变成过渡更新任务。

**基本用法：**

```ts
import { useState, useTransition } from "react";
import { Input } from "antd";

const Index: React.FC<any> = () => {
  const [isPending, startTransition] = useTransition();
  const [input, setInput] = useState("");
  const [list, setList] = useState<string[]>([]);

  return (
    <>
      <div>大家好，我是小杜杜，一起玩转Hooks吧！</div>
      <Input
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          startTransition(() => {
            const res: string[] = [];
            for (let i = 0; i < 10000; i++) {
              res.push(e.target.value);
            }
            setList(res);
          });
        }}
      />
      {isPending ? (
        <div>加载中...</div>
      ) : (
        list.map((item, index) => <div key={index}>{item}</div>)
      )}
    </>
  );
};

export default Index;
```

从上述的代码可以看到，我们通过 input 去维护了 1w 条数据，通过 isPending 的状态来控制是否展示完成。

可以看出，useTransition 是为了处理大量数据而存在的，那么有些小伙伴可能会问，这种情况不应该用防抖吗？为什么还会出现 useTransition 呢？

实际上防抖的本质是 `setTimeout`，也就是减少了渲染的次数，而 useTransition 并没有减少其渲染的次数，至于具体的区别，在之后的源码篇中专门介绍，这里我们只要清楚 useTransition 的用法即可。

## useDeferredValue

可以让状态滞后派生，与 useTransition 功能类似，推迟屏幕优先级不高的部分。

在一些场景中，渲染比较消耗性能，比如输入框。输入框的内容去调取后端服务，当用户连续输入的时候会不断地调取后端服务，其实很多的片段信息是无用的，这样会浪费服务资源， React 的响应式更新和 JS 单线程的特性也会导致其他渲染任务的卡顿。而 useDeferredValue 就是用来解决这个问题的。

> 问：useDeferredValue 和 useTransition 怎么这么相似，两者有什么异同点？
>
> 答：useDeferredValue 和 useTransition 从本质上都是标记成了过渡更新任务，不同点在于 useDeferredValue 是将原值通过过渡任务得到新的值， 而 useTransition 是将紧急更新任务变为过渡任务。
>
> 也就是说，useDeferredValue 用来处理数据本身，useTransition 用来处理更新函数。

**基本使用：**

```ts
const deferredValue = useDeferredValue(value);
```

**Params：**

- value：接受一个可变的值，如`useState`所创建的值。

**Result：**

- deferredValue：返回一个延迟状态的值。

**基本用法：**

```ts
import { useState, useDeferredValue } from "react";
import { Input } from "antd";

const getList = (key: any) => {
  const arr = [];
  for (let i = 0; i < 10000; i++) {
    if (String(i).includes(key)) {
      arr.push(<li key={i}>{i}</li>);
    }
  }
  return arr;
};

const Index: React.FC<any> = () => {
  //订阅
  const [input, setInput] = useState("");
  const deferredValue = useDeferredValue(input);
  console.log("value：", input);
  console.log("deferredValue：", deferredValue);

  return (
    <>
      <div>大家好，我是小杜杜，一起玩转Hooks吧！</div>
      <Input value={input} onChange={(e: any) => setInput(e.target.value)} />
      <div>
        <ul>{deferredValue ? getList(deferredValue) : null}</ul>
      </div>
    </>
  );
};

export default Index;
```

上述的功能类似于搜索，从 1w 个数中找到输入框内的数。

> 问：什么场景下使用`useDeferredValue` 和 `useTransition` ？
>
> 答：通过上面的两个例子介绍我们知道，useDeferredValue 和 useTransition 实际上都是用来处理数据量大的数据，比如，百度输入框、散点图等，都可以使用。它们并不适用于少量数据。
>
> 但在这里更加推荐使用 useTransition，因为 useTransition 的性能要高于 useDeferredValue，除非像一些第三方的 Hooks 库，里面没有暴露出更新的函数，而是直接返回值，这种情况下才去考虑使用 useDeferredValue。
>
> 这两者可以说是一把双刃剑，在数据量大的时候使用会优化性能，而数据量低的时候反而会影响性能。

## useInsertionEffect

**useInsertionEffect：** 与 useEffect 一样，但它在所有 DOM 突变之前同步触发。

**注意：**

- useInsertionEffect 应限于 css-in-js 库作者使用。在实际的项目中优先考虑使用 useEffect 或 useLayoutEffect 来替代；
- 这个钩子是为了解决 `CSS-in-JS` 在渲染中注入样式的性能问题而出现的，所以在我们日常的开发中并不会用到这个钩子，但我们要知道如何去使用它。

**基本使用：**

```ts
useInsertionEffect(callback,deps)
```

**基本用法：**

```ts
import { useInsertionEffect } from "react";

const Index: React.FC<any> = () => {
  useInsertionEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      .css-in-js{
        color: blue;
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div>
      <div className="css-in-js">大家好，我是小杜杜，一起玩转Hooks吧！</div>
    </div>
  );
};

export default Index;
```

**执行顺序：** 在目前的版本中，React 官方共提供三种有关副作用的钩子，分别是 useEffect、useLayoutEffect 和 useInsertionEffect，我们一起来看看三者的执行顺序：

```ts
import { useEffect, useLayoutEffect, useInsertionEffect } from "react";

const Index: React.FC<any> = () => {
  useEffect(() => console.log("useEffect"), []);

  useLayoutEffect(() => console.log("useLayoutEffect"), []);

  useInsertionEffect(() => console.log("useInsertionEffect"), []);

  return <div>大家好，我是小杜杜，一起玩转Hooks吧！</div>;
};

export default Index;
```

从效果上来看，可知三者的执行的顺序为：useInsertionEffect > useLayoutEffect > useEffect。

## useId

**useId：** 是一个用于生成横跨服务端和客户端的稳定的唯一 ID ，用于解决服务端与客户端产生 ID 不一致的问题，更重要的是保证了 React v18 的 `streaming renderer （流式渲染）`中 id 的稳定性。

这里我们简单介绍一下什么是 `streaming renderer`。

在之前的 React ssr 中，hydrate（ 与 render 相同，但作用于 ReactDOMServer 渲染的容器中 ）是整个渲染的，也就是说，无论当前模块有多大，都会一次性渲染，无法局部渲染。但这样就会有一个问题，如果这个模块过于庞大，请求数据量大，耗费时间长，这种效果并不是我们想要看到的。

于是在 React v18 上诞生出了 streaming renderer （流式渲染），也就是将整个模块进行拆分，让加载快的小模块先进行渲染，大的模块挂起，再逐步加载出大模块，就可以就解决上面的问题。

此时就有可能出现：服务端和客户端注册组件的顺序不一致的问题，所以 `useId` 就是为了解决此问题而诞生的，这样就保证了 `streaming renderer` 中 ID 的稳定性。

**基本使用：**

```ts
const id = useId();
```

**Result：**

- id：生成一个服务端和客户端统一的`id`。

**基本用法：**

```ts
import { useId } from "react";

const Index: React.FC<any> = () => {
  const id = useId();

  return <div id={id}>大家好，我是小杜杜，一起玩转Hooks吧！</div>;
};

export default Index;
```