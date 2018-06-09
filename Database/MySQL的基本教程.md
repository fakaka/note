# MySQL的基本教程


## mysql程序常用命令

选定默认数据库：`use dbname;` 
显示所有数据库：`show databases;`  
显示默认数据库中所有表：`show tables;`  
放弃正在输入的命令：`\c`  
显示命令清单：`\h`  
退出mysql程序：`\q`  
查看MySQL服务器状态信息：`\s`  

## mysqladmin命令
- 完成许多系统管理任务，如创建或删除一个数据库、修改密码等  
        格式：`mysqladmin [option] admincommand`  
- 创建数据库 
	`mysqladmin –u root –p create newdb`  
- 删除数据库 
	`mysqladmin –u root –p drop newdb`
- 更改密码
	`mysqladmin –u root –p password newpassword`


## mysqldump命令

- 用于为数据库创建备份

        mysqldump [option] dbname > bak.sql
        mysqldump –u root –p tmpdb > backuptmp.sql
- 备份出来的是一个文本文件，默认为utf-8字符集，如果想使用另外一种字符集，必须使用 `--default-character-set=gbk` 选项来设置










