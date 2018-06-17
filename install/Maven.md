# Maven

## 安装


## 修改镜像地址
修改maven配置文件settings.xml (当然也可以在用户home目录.m2下面添加一个settings.xml文件)  
在 `$M2_HOME/conf/settings.xml` 中加入
``` xml
<mirror>
        <id>nexus-aliyun</id>
        <mirrorOf>central</mirrorOf>
        <name>Nexus aliyun</name>
        <url>http://maven.aliyun.com/nexus/content/groups/public</url>
</mirror>
```
