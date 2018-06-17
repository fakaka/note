# Nginx


## 安装
官网

## 启动服务器

### Windows

    > nginx.exe 
    
或者（推荐 可以后台）
    
    > start nginx 

### Linux

    

## 其他命令
* 关闭

        > nginx.exe -s stop
    
* 关闭

        > nginx.exe -s quit    


## 基于域名的虚拟主机
修改 host 文件实现域名访问

192.168.125.100 www.example.com
192.168.125.100 hehe.example.com

修改nginx的配置

``` 
# www.example.com
server {
listen       80;
server_name  www.example.com;

#charset koi8-r;

#access_log  logs/host.access.log  main;

location / {
    root   html-www;
    index  index.html index.htm;
}
    
}

# hehe.example.com
server {
listen       80;
server_name  hehe.example.com;

#charset koi8-r;

#access_log  logs/host.access.log  main;

location / {
    root   html-hehe;
    index  index.html index.htm;
}
}

```

## 反向代理

1. 配置 tomcat 的端口号分别为 8080 和 8081
2. 修改hosts文件

    8080.example.com	访问运行8080端口的tomcat
    8081.example.com	访问运行8081端口的tomcat

3. 配置nginx
```
upstream tomcatserver1 {
server 192.168.25.141:8080;
}

upstream tomcatserver2 {
server 192.168.25.141:8081;
}

server {
listen       80;
server_name  8080.example.com;

#charset koi8-r;

#access_log  logs/host.access.log  main;

location / {
    proxy_pass   http://tomcatserver1;
    index  index.html index.htm;
}
}

server {
listen       80;
server_name  8081.example.com;

#charset koi8-r;

#access_log  logs/host.access.log  main;

location / {
    proxy_pass   http://tomcatserver2;
    index  index.html index.htm;
}
}
```

## 负载均衡
### 基本的负载均衡配置
```
upstream tomcatserver1 {
server 192.168.25.141:8080;
# 更改了这里 轮询访问两个服务器
server 192.168.25.141:8081;
}

upstream tomcatserver2 {
server 192.168.25.141:8081;
}

server {
listen       80;
server_name  8080.example.com;

#charset koi8-r;

#access_log  logs/host.access.log  main;

location / {
    proxy_pass   http://tomcatserver1;
    index  index.html index.htm;
}
}

server {
listen       80;
server_name  8081.example.com;

#charset koi8-r;

#access_log  logs/host.access.log  main;

location / {
    proxy_pass   http://tomcatserver2;
    index  index.html index.htm;
}
}
```

### 配置负载均衡的权重
如果8080的服务器较好，可以增加权重。权重默认是1。
```
upstream tomcatserver1 {
server 192.168.25.141:8080 weight=2;
server 192.168.25.141:8081 weight=1;
}

# 其他参考基本配置
.
.
.
```
### 定义负载均衡设备的IP及设备状态 
```
upstream myServer {   
server 127.0.0.1:9090 down; 
server 127.0.0.1:8080 weight=2; 
server 127.0.0.1:6060; 
server 127.0.0.1:7070 backup; 
}
```
- down 表示单前的server暂时不参与负载 
- weight  默认为1.weight越大，负载的权重就越大
- max_fails 允许请求失败的次数,默认为 1。当超过最大次数时，返回 proxy_next_upstream 模块定义的错误 
- fail_timeout max_fails 次失败后，暂停的时间
- backup 其它所有的非backup机器down或者忙的时候，请求backup机器。所以这台机器压力会最轻。


## keepalive




