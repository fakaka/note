# Solr


## 安装

[solr 6.6.0下载地址](http://www.apache.org/dyn/closer.lua/lucene/solr/6.6.0)
Windows下载 .zip
Linux下载 .tgz

### 快速预览

1. 把server/start.jar拷贝到example里面
2. 启动服务  

        PS D:\Dev\solr-6.6.0\bin> .\solr.cmd start
        Waiting up to 30 to see Solr running on port 8983
        Started Solr server on port 8983. Happy searching!
3. 打开 http://localhost:8983/solr/#/ 观看效果
4. 关闭服务 `.\solr.cmd stop -p 8983 ` 或者 `.\solr.cmd stop -all `

## 配置 

Windows 和 Linux类似
1. 解压。。。
2. 把solr-{version}/dist/solr-{version}.war包部署到tomcat下，可以改名为solr.war
3. 启动tomcat自动解压，或者自己解压。
4. 把solr-{version}/example/lib/ext 目录下所有的jar包复制到solr工程中。
    即solr/tomcat/webapps/solr/WEB-INF/lib/
5. 创建solrhome。Solrhome是存放solr服务器所有配置文件的目录。
[root@bogon example]# pwd
/root/solr-4.10.3/example
[root@bogon example]# cp -r solr /usr/local/solr/solrhome
[root@bogon example]# 
第七步：告诉solr服务器solrhome的位置。
