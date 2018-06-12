# Log - logback

> SLF4J 和 Logback

## Logback的结构

LogBack被分为3个组件，logback-core, logback-classic 和 logback-access.  
其中 logback-core 提供了 LogBack 的核心功能，是另外两个组件的基础。  
logback-classic 则实现了 Slf4j 的API，所以当想配合 Slf4j 使用时，需要将 logback-classic 加入classpath。  
logback-access 是为了集成 Servlet 环境而准备的，可提供 HTTP-access 的日志接口。


## 简单使用 logback

### appliacation.properties
这是最简便的方法，默认级别是info，要改级别的话还要在 `appliacation.properties` 里增加一行 
``` bash
logging.level.org.springframework.web=INFO
```

### 配置 logback-spring.xml

在 `src/main/resources` 下面创建 `logback.xml`（根据不同环境来定义不同的日志输出，那么取名为 `logback-spring.xml` 即可，官方优先推荐使用-spring.*的配置方式）文件。

logback-spring.xml 文件：
``` xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <include resource="org/springframework/boot/logging/logback/base.xml" />
    <logger name="org.springframework.web" level="INFO"/>
 
 </configuration>
```

### 在代码中调用：
``` java
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

private Logger logger =  LoggerFactory.getLogger(this.getClass());

{
    logger.info("hello world");
}
```

## logback 配置详解

logback.xml
``` xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <include resource="org/springframework/boot/logging/logback/base.xml"/>
    <logger name="org.springframework.web" level="DEBUG"/>
</configuration>
```

上面的文件定义了一个捕获 `org.springframework.web` 的日志，日志级别是 DEBUG，上面引用的 base.xml 文件内容为：
``` xml
<?xml version="1.0" encoding="UTF-8"?>

<!--
Base logback configuration provided for compatibility with Spring Boot 1.1
-->

<included>
    <include resource="org/springframework/boot/logging/logback/defaults.xml" />
    <property name="LOG_FILE" value="${LOG_FILE:-${LOG_PATH:-${LOG_TEMP:-${java.io.tmpdir:-/tmp}}/}spring.log}"/>
    <include resource="org/springframework/boot/logging/logback/console-appender.xml" />
    <include resource="org/springframework/boot/logging/logback/file-appender.xml" />
    <root level="INFO">
        <appender-ref ref="CONSOLE" />
        <appender-ref ref="FILE" />
    </root>
</included>
```

## 两种常用的Appender

### ConsoleAppender
``` xml
<appender name="consoleAppender" class="ch.qos.logback.core.ConsoleAppender">
    <encoder>
        <Pattern>.%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg %n</Pattern>
    </encoder>
    <filter class="ch.qos.logback.classic.filter.ThresholdFilter">
        <level>TRACE</level>
    </filter>
</appender> 
```
参数
```
%d{HH:mm:ss.SSS} -- 日志输出时间  
%thread          -- 输出日志的进程名字，这在Web应用以及异步任务处理中很有用  
%-5level         -- 日志级别，并且使用5个字符靠左对齐  
%logger{36}      -- 日志输出者的名字  
%msg             -- 日志消息  
%n               -- 平台的换行符  
```
在这种格式下一条日志的输出结果如下：

    10:12:51.012 [threadName] DEBUG o.c.d.r.util.LoggingResponseFilter

### RollingFileAppender

另一种常见的日志输出到文件，随着应用的运行时间越来越长，日志也会增长的越来越多，将他们输出到同一个文件并非一个好办法。RollingFileAppender用于切分文件日志：
``` xml
<appender name="dailyRollingFileAppender" class="ch.qos.logback.core.rolling.RollingFileAppender">
    <File>/data/log/app.log</File>
    <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
        <!-- daily rollover -->
        <FileNamePattern>rest-daily.%d{yyyy-MM-dd}.log</FileNamePattern>
        <!-- keep 30 days' worth of history -->
        <maxHistory>30</maxHistory>         
    </rollingPolicy>
    <encoder>
        <Pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{35} - %msg %n</Pattern>
    </encoder>
</appender>
```
rollingPolicy 定义了上例中 rest-demo.%d{yyyy-MM-dd}.log 日志的切分方式  
把每一天的日志归档到一个文件中，30表示只保留最近30天的日志，以防止日志填满整个磁盘空间。  
可以使用 %d{yyyy-MM-dd_HH-mm} 来定义精确到分的日志切分方式。


## 多环境日志输出

logback-spring.xml 
``` xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <include resource="org/springframework/boot/logging/logback/base.xml" />
    <logger name="org.springframework.web" level="INFO"/>
    <logger name="org.springboot.sample" level="TRACE" />
   
    <!-- 测试环境+开发环境. 多个使用逗号隔开. -->
     <springProfile name="test,dev">
        <logger name="org.springframework.web" level="INFO"/>
        <logger name="org.springboot.sample" level="INFO" />
        <logger name="com.mj" level="info" />
    </springProfile>
 
   
    <!-- 生产环境. -->
    <springProfile name="prod">
        <logger name="org.springframework.web" level="ERROR"/>
        <logger name="org.springboot.sample" level="ERROR" />
        <logger name="com.mj" level="ERROR" />
    </springProfile>
   
</configuration>
```

可以启动服务的时候指定 profile （如不指定使用默认），如指定prod 的方式为：  

    java -jar xxx.jar --spring.profiles.active=prod
