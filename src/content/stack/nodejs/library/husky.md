---
title: 'Husky'
description: 'Husky'
author: 'huyikai'
tags: ['nodejs', 'library']
---

## Install

```shell
npm install husky -D
```

## Usage

Edit `package.json > prepare` script and run it once:

```shell
npm pkg set scripts.prepare="husky install"
npm run prepare
```

Add a hook:

```shell
npx husky add .husky/pre-commit "npm test"
git add .husky/pre-commit
```

Make a commit:

```shell
git commit -m "Keep calm and commit"
# `npm test` will run every time you commit
```

## Documentation

<https://typicode.github.io/husky>
