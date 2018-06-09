# Spring Boot实战

## 第一章 入门
### 1.2 安装 Spring Boot CLI
手工安装Spring Boot CLI
安装Spring Boot CLI最直接的方法大约是下载、解压，随后将它的bin目录添加到系统路径里。
你可以从以下两个地址下载分发包：  
<http://repo.spring.io/release/org/springframework/boot/spring-boot-cli/1.3.0.RELEASE/spring-boot-cli-1.3.0.RELEASE-bin.zip>  
<http://repo.spring.io/release/org/springframework/boot/spring-boot-cli/1.3.0.RELEASE/spring-boot-cli-1.3.0.RELEASE-bin.tar.gz>  
下载完成之后，把它解压到文件系统的任意目录里。在解压后的目录里，你会找到一个bin
目录，其中包含了一个spring.bat脚本（用于Windows环境）和一个spring脚本（用于Unix环境）。
把这个bin目录添加到系统路径里，然后就能使用Spring Boot CLI了。

`spring --version` 看看效果

## Spring Boot开发者工具

在Maven POM里添加 `<dependency>` 是这样的：
``` xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
</dependency>
```
可以设置 spring.devtools.restart.exclude 属性来覆盖默认的重启排除目录
