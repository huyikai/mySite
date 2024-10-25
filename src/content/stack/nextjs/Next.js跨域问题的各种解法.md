---
title: 'Next.js 跨域问题的各种解法'
description: 'Next.js 跨域问题的各种解法'
author: 'huyikai'
tags: ['nextjs', 'react', 'frontend']
---

## 调用跨域接口

### 使用服务端组件

第一种解决方案是改为使用服务端组件。

跨域错误是浏览器的行为，改为服务端组件，本质是改成 Node 后端调用，自然不会出现跨域问题。

修改 `app/page.js`，代码如下：

```tsx
export default async function Home() {
  const response = await fetch('https://www.juejin.cn');
  const html = await response.text();

  return <div>{html}</div>;
}
```

### 使用后端接口转发

如果不能改为使用服务端组件，我们也可以使用 Next.js 自定义一个接口，前端改为调用此接口。

新建 `app/api/juejin/route.js`，代码如下：

```ts
export async function GET() {
  const res = await fetch('https://www.juejin.cn');
  const data = await res.text();

  return Response.json({ data });
}
```

这样我们就实现了一个 `http://localhost:3000/api/juejin` 的 GET 接口。

修改 `app/page.js`，依然是使用客户端组件，改为调用此接口。代码如下：

```tsx
'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [html, setHTML] = useState([]);

  useEffect(() => {
    const fetchArticleList = async () => {
      const response = await fetch('http://localhost:3000/api/juejin');
      const data = await response.json();
      setHTML(data.data);
    };

    fetchArticleList();
  }, []);

  return <div>{html}</div>;
}
```

**使用服务端组件的时候，因为改为后端调用，所以浏览器中并不会查看到该请求。而使用这种方法，本质还是在浏览器端发送请求，所以可以在浏览器中查看到请求。**

### 使用 rewrites 配置项

Next.js 其实提供了 rewrites 配置项用于重写请求。这算是解决跨域问题常用的一种方式。

重写会将传入的请求路径映射到其他目标路径。你可以把它理解为代理，并且它会屏蔽目标路径，使得用户看起来并没有改变其在网站上的位置。

修改 `next.config.mjs`，代码如下：

```ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/juejin',
        destination: 'https://juejin.cn'
      }
    ];
  }
};

export default nextConfig;
```

通过配置 `next.config.js` 中的 `rewrites` 配置项，当请求 `/api/juejin` 的时候，代理请求 `https://juejin.cn`。

修改 `app/page.js`，代码如下：

```tsx
'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [html, setHTML] = useState([]);

  useEffect(() => {
    const fetchArticleList = async () => {
      const response = await fetch('http://localhost:3000/api/juejin');
      const data = await response.text();
      setHTML(data);
    };

    fetchArticleList();
  }, []);

  return <div>{html}</div>;
}
```

### 使用中间件

不止 `next.config.js` 可以配置重写，你也可以在中间件中实现重写。

根目录新建 `middleware.js`，代码如下：

```ts
import { NextResponse } from 'next/server';

export function middleware(request) {
  if (request.nextUrl.pathname.startsWith('/api/juejin')) {
    return NextResponse.rewrite(new URL('https://juejin.cn'));
  }
}

export const config = {
  matcher: '/api/:path*'
};
```

修改 `app/page.js`，代码如下：

```tsx
'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [html, setHTML] = useState([]);

  useEffect(() => {
    const fetchArticleList = async () => {
      const response = await fetch('http://localhost:3000/api/juejin');
      const data = await response.text();
      setHTML(data);
    };

    fetchArticleList();
  }, []);

  return <div>{html}</div>;
}
```

## 实现跨域接口

实现的关键在于添加 Access-Control-Allow-Origin 响应头

### 路由处理程序

如果只有一个或者少量接口需要实现跨域，那可以直接写在对应的路由处理程序中。

新建 `app/api/blog/route.js`，代码如下：

```ts
import { NextResponse } from 'next/server';

export async function GET() {
  const data = { success: true, data: { name: 'yayu' } };
  return NextResponse.json(data);
}
```

这样我们就实现了一个接口，它的地址是 `http://localhost:3000/api/blog`。

很明显会出现 CORS 错误。

修改 `app/api/blog/route.js`，代码如下：

```ts
import { NextResponse } from 'next/server';

export async function GET() {
  const data = { success: true, data: { name: 'yayu' } };
  return NextResponse.json(data, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
```

此时接口就已经设置了 CORS 支持了跨域请求。

### 中间件设置

如果是多个接口，则可以在中间件或者 `next.config.js` 中配置。

我们先说使用中间件，这算是解决跨域问题最常用的解决方法。

将 `app/api/blog/route.js` 代码修改回之前有跨域问题的代码：

```ts
import { NextResponse } from 'next/server';

export async function GET() {
  const data = { success: true, data: { name: 'yayu' } };
  return NextResponse.json(data);
}
```

修改 `middleware.js`，代码如下：

```ts
import { NextResponse } from 'next/server';

const allowedOrigins = ['https://juejin.cn'];

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

export function middleware(request) {
  // 检查请求的 origin 属性
  const origin = request.headers.get('origin') ?? '';
  const isAllowedOrigin = allowedOrigins.includes(origin);

  // 处理预检 OPTIONS 请求
  const isPreflight = request.method === 'OPTIONS';

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // 处理普通请求
  const response = NextResponse.next();

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }

  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

export const config = {
  matcher: '/api/:path*'
};
```

中间件为传入的请求提供了全局控制机制。我们在 middleware 中为 `/api/xxx`统一进行了 CORS 的判断和处理

注：注意我们代码中的 Access-Control-Allow-Headers，如果我们携带了其他请求头，因为请求头不匹配，也会导致 CORS 错误。

### 使用 headers 配置项

除了在 middleware 中设置，还可以借助 next.config.js 的 headers 配置项。

修改 `next.config.mjs`，代码如下：

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization'
          }
        ]
      }
    ];
  }
};

export default nextConfig;
```

这算是一种简单的实现方式。如果你需要更高的灵活度，则还是采用中间件的形式。此时也能够正常请求

### Vercel 配置项

```json
{
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Credentials", "value": "true" },
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET,OPTIONS,PATCH,DELETE,POST,PUT"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
        }
      ]
    }
  ]
}
```
