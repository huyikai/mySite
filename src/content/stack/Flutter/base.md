---
title: 'flutter'
description: 'flutter开发相关内容'
author: 'huyikai'
tags: ['flutter']
---

## 快捷键

在 VSCode 中开发 Flutter 时，如果你想要快速修复或者是应用建议（类似 IntelliJ 或 Android Studio 中的 Alt+Enter），你可以使用以下快捷键：

**Windows/Linux**: Ctrl+. (Control 加点)

**macOS**: Cmd+. (Command 加点)

## analyze

添加very_good_analysis依赖

```sh
dart pub add --dev very_good_analysis
```

替换analysis_options.yaml文件

```yaml
include: package:very_good_analysis/analysis_options.yaml
linter:
  rules:
    always_use_package_imports: false
    prefer_relative_imports: true
    always_put_required_named_parameters_first: false
    flutter_style_todos: false
    public_member_api_docs: false
    sort_pub_dependencies: false
analyzer:
  language:
    strict-casts: true
    strict-inference: true
    strict-raw-types: true
  exclude:
    - lib/generated/**
    - _flutter/**
    - "**/*.g.dart"
    - "**/*.freezed.dart"
  errors:
    invalid_annotation_target: ignore
```

分析代码

```sh
flutter analyze
```

