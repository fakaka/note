# Zookeeper + Dubbo 环境搭建(本地)
---

## 


## dubbo项目
dubboDemo有三个子模块
* myService
* myProvider
* myConsumer

dubboDemo工程中的pom.xml文件如下：

``` xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.lyt48.dubbodemo</groupId>
    <artifactId>dubboDemo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <packaging>pom</packaging>
    <modules>
    <module>myService</module>
    <module>myProvider</module>
    <module>myConsumer</module>
    </modules>
</project>
```
添加依赖
``` xml
<properties>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <spring.framework.version>4.3.6.RELEASE</spring.framework.version>
</properties>
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-core</artifactId>
        <version>${spring.framework.version}</version>
    </dependency>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>${spring.framework.version}</version>
    </dependency>
    <dependency>
        <groupId>com.alibaba</groupId>
        <artifactId>dubbo</artifactId>
        <version>2.5.3</version>
        <exclusions>
            <exclusion>
                <groupId>org.springframework</groupId>
                <artifactId>spring</artifactId>
            </exclusion>
        </exclusions>
    </dependency>
    <dependency>
        <groupId>org.javassist</groupId>
        <artifactId>javassist</artifactId>
        <version>3.18.1-GA</version>
    </dependency>
    <!-- https://mvnrepository.com/artifact/io.netty/netty -->
    <dependency>
        <groupId>io.netty</groupId>
        <artifactId>netty</artifactId>
        <version>3.10.6.Final</version>
    </dependency>
    <!-- ZK-client -->
    <dependency>
        <groupId>com.github.sgroschupf</groupId>
        <artifactId>zkclient</artifactId>
        <version>0.1</version>
    </dependency>
</dependencies>
```
## Service模块
主要用于定义接口

创建一个接口（GreetingService），包含一个hello接口，如：
``` java
package com.lyt48.dubbodemo.service;

public interface GreetingService {
String hello(String name);
}
```

## Provider模块
1. 添加对Service模块的依赖
``` xml
<dependency>
    <groupId>com.lyt48</groupId>
    <artifactId>myService</artifactId>
    <version>0.0.1-SNAPSHOT</version>
</dependency>
```
2. 实现接口

编写GreetingService的实现类GreetingServiceImpl, 并实现hello方法~
GreetingServiceImpl.java
``` java
package com.lyt48.dubbodemo.service.impl;

import java.util.Date;
import com.lyt48.dubbodemo.service.GreetingService;

public class GreetingServiceImpl implements GreetingService {
public String hello(String name) {
    System.out.println("Greeting Service is calling : " + new Date());
    return "Hello, " + name;
}
}
```

3. spring配置
applicationContext.xml
``` xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:p="http://www.springframework.org/schema/p"
xmlns:context="http://www.springframework.org/schema/context"
xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context 
        http://www.springframework.org/schema/context/spring-context.xsd
        ">
<!--服务层配置 -->
<import resource="classpath:spring-provider.xml" />
</beans>
```
spring-provider.xml
``` xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dubbo="http://code.alibabatech.com/schema/dubbo"
xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://code.alibabatech.com/schema/dubbo
    http://code.alibabatech.com/schema/dubbo/dubbo.xsd">

<description>Dubbo Demo Service</description>
<!-- 提供方应用信息，用于计算依赖关系 -->
<dubbo:application name="dubbo-demo-provider" />

<!-- 使用zookeeper注册中心暴露服务地址 -->
<dubbo:registry protocol="zookeeper" address="127.0.0.1:2181"
    client="zkclient" />

<!-- dubbo缓存 -->
<dubbo:protocol id="dubbo" name="dubbo" port="20880"
    threadpool="cached" threads="100" />

<!-- Greeting服务 -->
<bean id="greetingService" class="com.lyt48.dubbodemo.service.impl.GreetingServiceImpl" />

<dubbo:service protocol="dubbo"
    interface="com.lyt48.dubbodemo.service.GreetingService" ref="greetingService" />
</beans>
```
4. 编写启动类

编写一个启动类Main
Main.java
``` java
package com.lyt48.dubbodemo.main;

import java.io.IOException;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class Main {
public static void main(String[] args) throws IOException {
    ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(
            "applicationContext.xml");
    context.start();
        // System.in.read()的作用是控制台输入任何字符退出~ 
        // 因为本文示例provider不是web工程，这个操作只是保持provider的服务一直开着
    System.in.read();
}
}
```

## Consumer模块
1. 添加对Service模块的依赖
```
<dependency>
    <groupId>com.lyt48</groupId>
    <artifactId>myService</artifactId>
    <version>0.0.1-SNAPSHOT</version>
</dependency>
```
2. 配置spring

spring-consume.xml
``` xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:dubbo="http://code.alibabatech.com/schema/dubbo"
xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd
    http://code.alibabatech.com/schema/dubbo
    http://code.alibabatech.com/schema/dubbo/dubbo.xsd">

<description>Dubbo Demo Service</description>
<!-- 提供方应用信息，用于计算依赖关系 -->
<dubbo:application name="dubbo-demo-consumer" />

<!-- 使用zookeeper注册中心暴露服务地址 -->
<dubbo:registry protocol="zookeeper" address="127.0.0.1:2181"
    client="zkclient" />

<!-- dubbo缓存 -->
<dubbo:protocol id="dubbo" name="dubbo" port="20880"
    threadpool="cached" threads="100" />

<!-- 生成远程服务代理，可以和本地bean一样使用demoService -->
<dubbo:reference id="greetingService"
    interface="com.lyt48.dubbodemo.service.GreetingService" />
</beans>
```

applicationContext.xml
``` xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:p="http://www.springframework.org/schema/p"
xmlns:context="http://www.springframework.org/schema/context"
xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans.xsd
        http://www.springframework.org/schema/context 
        http://www.springframework.org/schema/context/spring-context.xsd">
<!--服务层配置 -->
<import resource="classpath:spring-consumer.xml" />
</beans>
```

3. 编写测试类

在consumer模块下,创建一个调用interface接口的方法
``` java
package com.lyt48.dubbodemo.main;

import java.io.IOException;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import com.lyt48.dubbodemo.service.GreetingService;

public class Main {
public static void main(String[] args) throws IOException {
    ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
    context.start();
    GreetingService greetingService = (GreetingService) context.getBean("greetingService");
    String greetMessage = greetingService.hello("mj");
    System.out.println("Consumer ==> " + greetMessage);
    context.destroy();
}
}
```

## ZooKeeper
### 下载
[ZooKeeper下载地址](http://www.apache.org/dyn/closer.cgi/zookeeper/)

### 配置
conf/zoo_sample.conf
复制conf 目录下的 zoo_sample.conf 文件，改为zoo.conf

### 启动
进入Zookeeper安装路径下的bin目录
* window系统中，启动`zkServer.cmd`
* Linux中，启动`zkServer.sh`

## 项目的运行
1\\. 先启动Zookeeper
`zkServer.cmd`

2\\. 启动provider
运行dubbo-demo-provider模块中的Main类~
3\\. 启动consumer
运行dubbo-demo-provider模块中的Main类~

## 一些问题
###　log4j
运行之后，出现如下问题：

    log4j:WARN No appenders could be found for logger (org.springframework.core.env.StandardEnvironment).
    log4j:WARN Please initialize the log4j system properly.

在resources下配置一个log4j.properties文件即可
log4j.properties
``` properties
# Rules reminder:
# DEBUG < INFO < WARN < ERROR < FATAL

# Global logging configuration
log4j.rootLogger=INFO,stdout

## Console output...
log4j.appender.stdout=org.apache.log4j.ConsoleAppender
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern=[%-5p][%d{yyyy-MM-dd HH:mm:ss,SSS}] %l - %m%n
```
