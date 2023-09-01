1. 连接到 PostgreSQL 数据库

   ```shell
   psql -U username -d database_name
   ```

2. 创建新的数据库

   ```shell
   createdb database_name
   ```

3. 删除一个数据库

   ```shell
   dropdb database_name
   ```

4. 创建新的数据库用户

   ```shell
   createuser -U username -s -P new_username
   ```

5. 删除一个数据库用户

   ```shell
   dropuser username
   ```

6. 查看所有数据库的列表

   ```shell
   \l
   ```

7. 切换到特定的数据库

   ```shell
   \c database_name
   ```

8. 显示数据库中的所有表

   ```shell
   \d
   ```

9. 查看特定表的结构

   ```shell
   \d table_name
   ```

10. 执行 SQL 查询语句

    ```shell
    SELECT * FROM table_name;
    ```

11. 导入 SQL 脚本文件

    ```shell
    \i path_to_sql_file
    ```

12. 退出 PostgreSQL

    ```shell
    \q
    ```

    

