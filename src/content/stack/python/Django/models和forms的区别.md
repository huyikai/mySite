---
title: 'models和forms的区别'
pubDate: 2024-07-16
description: 'Django'
author: 'huyikai'
tags: ['Django']
---

在 Django 中，`models`和`forms`都涉及到数据的保存，但它们的职责和使用场景有所不同。以下是它们的区别和使用建议：

### 1. `models`

`models`主要用于定义数据库表的结构和行为。它们负责与数据库进行交互，包括数据的创建、读取、更新和删除（CRUD 操作）。

**职责：**

- 定义数据库表的字段和关系。
- 提供与数据库交互的方法，如`save()`、`delete()`等。
- 包含业务逻辑和数据验证。

**示例：**

```python
from django.db import models

class Company(models.Model):
    company_cd = models.CharField(max_length=10, unique=True)
    company_name = models.CharField(max_length=100)
    create_time = models.DateTimeField(auto_now_add=True)
    update_time = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # 自定义保存逻辑
        self.update_time = timezone.now()
        super().save(*args, **kwargs)
```

### 2. `forms`

`forms`主要用于处理用户输入的数据。它们负责验证和清理数据，并将数据保存到模型中。

**职责：**

- 定义表单字段和验证规则。
- 处理用户提交的数据，进行验证和清理。
- 提供将表单数据保存到模型的方法，如`save()`。

**示例：**

```python
from django import forms
from .models import Company

class CompanyForm(forms.ModelForm):
    class Meta:
        model = Company
        fields = ['company_cd', 'company_name']

    def save(self, commit=True):
        # 自定义保存逻辑
        company = super().save(commit=False)
        if commit:
            company.save()
        return company
```

### 区别和使用建议

1. **职责分离**：

   - `models`负责定义数据结构和业务逻辑。
   - `forms`负责处理用户输入和数据验证。

2. **使用场景**：

   - 当你需要定义数据库表的结构和行为时，使用`models`。
   - 当你需要处理用户输入的数据并进行验证时，使用`forms`。

3. **保存逻辑**：
   - 如果保存逻辑涉及到数据库表的字段和关系，应该放在`models`中。
   - 如果保存逻辑涉及到用户输入的数据处理和验证，应该放在`forms`中。

### 示例：结合使用`models`和`forms`

假设你有一个`Company`模型和一个对应的表单`CompanyForm`，你可以在视图中结合使用它们：

```python
from django.shortcuts import render, redirect
from .models import Company
from .forms import CompanyForm

def create_company(request):
    if request.method == 'POST':
        form = CompanyForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('company_list')
    else:
        form = CompanyForm()
    return render(request, 'create_company.html', {'form': form})
```

在这个示例中，`CompanyForm`处理用户输入的数据并进行验证，而`Company`模型定义了数据的结构和保存逻辑。通过这种方式，你可以清晰地分离数据处理和业务逻辑，保持代码的整洁和可维护性。
