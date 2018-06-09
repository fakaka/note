# MongoDB

## 安装
### windows

最好用管理员打开

    .\mongod.exe --install --serviceName MongoDB --serviceDisplayName MongoDB --logpath D:\Dev\Data\MongoDB\log\db.log --dbpath D:\Dev\Data\MongoDB\db --directoryperdb

--install：安装MongoDB服务  
--serviceName：安装Windows服务时使用的服务名  
--serviceDisplayName：在Windows服务管理器中显示的服务名  
--logpath：MongoDB日志输出文件名称。虽说该参数直译是“日志路径”，其实要指定的是一个具体的完整文件名。这里我使用的是C盘根目录下的MongoDB.Log文件。该文件不用事先创建，直接指定就是了。  
--dbpath：指定MongoDB数据存放的路径。这个就是最关键的参数了，不仅该目录要存在，并且最好不要以“\”结尾。  
--directoryperdb：这个参数很好理解，让MongoDB按照数据库的不同，针对每一个数据库都建立一个目录，所谓的“目录每数据库”  


### Linux（CentOS6）
~~yum安装~~

#### 一、关闭SElinux、配置防火墙  
1\. vi /etc/selinux/config
#SELINUX=enforcing #注释掉
#SELINUXTYPE=targeted #注释掉
SELINUX=disabled #增加
:wq!  #保存退出
setenforce 0 #使配置立即生效

2\. vi /etc/sysconfig/iptables  #编辑
#允许27017端口通过防火墙
-A RH-Firewall-1-INPUT -m state --state NEW -m tcp -p tcp --dport 27017 -j ACCEPT  
:wq! #保存退出
/etc/init.d/iptables restart #重启防火墙使配置生效

二、安装MongoDB
1\\. 下载
在[官网](https://www.mongodb.org/downloads)上下载最新版
MongoDB下载地址：例如 
<https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-2.7.0.tgz> 

2\\.  解压

    > tar zxvf mongodb-linux-x86_64-2.7.0.tgz
    
3\\. 移动解压文件夹到MongoDB安装目录

    > mv mongodb-linux-x86_64-2.7.0 /usr/local/mongodb
    
4\\. 创建MongoDB数据库数据和日志存放路径

    > mkdir -p /data/mongodb/mongodb_data/
    > mkdir -p /data/mongodb/mongodb_log/
    
5\\. 启动MongoDB服务

    > /usr/local/mongodb/bin/mongod --port 27017 --fork --dbpath=/data/mongodb/mongodb_data/ --logpath=/data/mongodb/mongodb_log/mongodb.log --logappend

    about to fork child process, waiting until server is ready for connections.
    forked process: 1998
    child process started successfully, parent exiting
    
也可以采用配置文件的方式

    > vi mongodb.conf
    
    dbpath = /data/test/db #数据文件存放目录
    logpath = /data/test/logs/mongodb.log #日志文件存放目录
    port = 27017  #端口
    fork = true  #以守护程序的方式启用，即在后台运行
    nohttpinterface = true
    
配置文件启动

    > ./mongod --config mongodb.conf

6\\. 查看MongoDB是否启动
    
    > netstat -ntpl    

7\\. 进入MongoDB数据库控制台
    
    > cd /usr/local/mongodb/bin/
    > ./mongo  

## 简单的操作
### update 

    var mj = db.person.find({name:"mj"})
    db.person.update({name:"mj"},mj,true,true)
第一个是查询条件 第二个是更新的对象 第三个是upsert 。。。 第四个是是否更新多个结果
