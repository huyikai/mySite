---
title: Husky
date: 2023-02-27
categories:
  - 前端
tags:
  - 前端
  - eslint
meta:
  - name: description
    content: Husky
  - name: keywords
    content: Husky,git hooks
---

# Husky

## Install

```
npm install husky -D
```

## Usage

Edit `package.json > prepare` script and run it once:

```
npm pkg set scripts.prepare="husky install"
npm run prepare
```

Add a hook:

```
npx husky add .husky/pre-commit "npm test"
git add .husky/pre-commit
```

Make a commit:

```
git commit -m "Keep calm and commit"
# `npm test` will run every time you commit
```

## Documentation

https://typicode.github.io/husky