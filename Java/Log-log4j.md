# Log - Log4j


## 一、入门实例

### 创建并设置log4j.properties

设置级别
``` bash
log4j.rootLogger = debug,stdout,D,E
```
输出信息到控制抬
``` bash
log4j.appender.stdout = org.apache.log4j.ConsoleAppender
log4j.appender.stdout.Target = System.out
log4j.appender.stdout.layout = org.apache.log4j.PatternLayout
log4j.appender.stdout.layout.ConversionPattern = [%-5p] %d{yyyy-MM-dd HH:mm:ss,SSS} method:%l%n%m%n
```

输出 DEBUG 级别以上的日志到 E:/logs/debug.log
``` bash
log4j.appender.D = org.apache.log4j.DailyRollingFileAppender
log4j.appender.D.File = E:/logs/debug.log
log4j.appender.D.Append = true
log4j.appender.D.Threshold = DEBUG 
log4j.appender.D.layout = org.apache.log4j.PatternLayout
log4j.appender.D.layout.ConversionPattern = %-d{yyyy-MM-dd HH:mm:ss}  [ %t:%r ] - [ %p ]  %m%n
```


输出 ERROR 级别以上的日志到 E:/logs/error.log
``` bash
log4j.appender.E = org.apache.log4j.DailyRollingFileAppender
log4j.appender.E.File = E:/logs/error.log 
log4j.appender.E.Append = true
log4j.appender.E.Threshold = ERROR 
log4j.appender.E.layout = org.apache.log4j.PatternLayout
log4j.appender.E.layout.ConversionPattern = %-d{yyyy-MM-dd HH:mm:ss}  [ %t:%r ] - [ %p ]  %m%n
```

### 3、设置日志内容
``` java
import org.apache.log4j.Logger;

public class Test {

    private static Logger logger = Logger.getLogger(Test.class);  

    public static void main(String[] args) {  
        // System.out.println("This is println message.");

        // 记录debug级别的信息  
        logger.debug("This is debug message.");  
        // 记录info级别的信息  
        logger.info("This is info message.");  
        // 记录error级别的信息  
        logger.error("This is error message.");  
    }  

}
```

## 二、Log4j基本使用方法

### 日志信息的优先级从高到低 
FATAL > ERROR > WARN > INFO > DEBUG  

Log4j提供的 appender 有以下几种：

- org.apache.log4j.ConsoleAppender（控制台），  
- org.apache.log4j.FileAppender（文件），  
- org.apache.log4j.DailyRollingFileAppender（每天产生一个日志文件），  
- org.apache.log4j.RollingFileAppender（文件大小到达指定尺寸的时候产生一个新的文件），  
- org.apache.log4j.WriterAppender（将日志信息以流格式发送到任意指定的地方）

其中，Log4j提供的layout有以e几种：

- org.apache.log4j.HTMLLayout（以HTML表格形式布局），  
- org.apache.log4j.PatternLayout（可以灵活地指定布局模式），  
- org.apache.log4j.SimpleLayout（包含日志信息的级别和信息字符串），  
- org.apache.log4j.TTCCLayout（包含日志产生的时间、线程、类别等等信息）

Log4J采用类似C语言中的printf函数的打印格式格式化日志信息，打印参数如下： %m 输出代码中指定的消息

- %p 输出优先级，即DEBUG，INFO，WARN，ERROR，FATAL  
- %r 输出自应用启动到输出该log信息耗费的毫秒数  
- %c 输出所属的类目，通常就是所在类的全名  
- %t 输出产生该日志事件的线程名  
- %n 输出一个回车换行符，Windows平台为“rn”，Unix平台为“n”  
- %d 输出日志时间点的日期或时间，默认格式为ISO8601，也可以在其后指定格式，比如：%d{yyy MMM dd HH:mm:ss,SSS}，输出类似：2002年10月18日 22：10：28，921  
- %l 输出日志事件的发生位置，包括类目名、发生的线程，以及在代码中的行数。举例：Testlog4.main(TestLog4.java:10)
