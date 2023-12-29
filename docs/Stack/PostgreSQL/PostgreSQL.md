# PostgreSQL

PostgreSQL 是一种开源的关系型数据库管理系统，通常用于存储和管理大量结构化数据。它支持复杂的查询和具有高度可扩展性。

## 常用命令

### 连接到 PostgreSQL 数据库

```shell
psql -h localhost -U username -d database
```

### 创建新的数据库

```shell
createdb database_name
```

### 删除一个数据库

```shell
dropdb database_name
```

### 创建新的数据库用户

```shell
createuser -U username -s -P new_username
```

### 删除一个数据库用户

```shell
dropuser username
```

### 查看所有数据库的列表

```shell
\l
```

### 切换到特定的数据库

```shell
\c database_name
```

### 显示数据库中的所有表

```shell
\d
```

### 查看特定表的结构

```shell
\d table_name
```

### 执行 SQL 查询语句

```shell
SELECT * FROM table_name;
```

### 导入 SQL 脚本文件

```shell
\i path_to_sql_file
```

### 退出 PostgreSQL

```shell
\q
```
