# Log4j(待整理)

日志是应用软件中不可缺少的部分，Apache的开源项目log4j是一个功能强大的日志组件,提供方便的日志记录。在apache网站：jakarta.apache.org/log4j 可以免费下载到Log4j最新版本的软件包。

一、入门实例

1.新建一个JAva工程，导入包log4j-1.2.17.jar，整个工程最终目录如下



2、src同级创建并设置log4j.properties

### 设置###
>log4j.rootLogger = debug,stdout,D,E

### 输出信息到控制抬 ###
>log4j.appender.stdout = org.apache.log4j.ConsoleAppender
>log4j.appender.stdout.Target = System.out
>log4j.appender.stdout.layout = org.apache.log4j.PatternLayout
>log4j.appender.stdout.layout.ConversionPattern = [%-5p] %d{yyyy-MM-dd HH:mm:ss,SSS} method:%l%n%m%n

### 输出DEBUG 级别以上的日志到=E://logs/error.log ###
log4j.appender.D = org.apache.log4j.DailyRollingFileAppender
log4j.appender.D.File = E://logs/log.log
log4j.appender.D.Append = true
log4j.appender.D.Threshold = DEBUG 
log4j.appender.D.layout = org.apache.log4j.PatternLayout
log4j.appender.D.layout.ConversionPattern = %-d{yyyy-MM-dd HH:mm:ss}  [ %t:%r ] - [ %p ]  %m%n

### 输出ERROR 级别以上的日志到=E://logs/error.log ###
log4j.appender.E = org.apache.log4j.DailyRollingFileAppender
log4j.appender.E.File =E://logs/error.log 
log4j.appender.E.Append = true
log4j.appender.E.Threshold = ERROR 
log4j.appender.E.layout = org.apache.log4j.PatternLayout
log4j.appender.E.layout.ConversionPattern = %-d{yyyy-MM-dd HH:mm:ss}  [ %t:%r ] - [ %p ]  %m%n
3、设置日志内容

package com.mucfc;
import org.apache.log4j.Logger;
/**
*@author linbingwen
*@2015年5月18日9:14:21
*/
public class Test {
private static Logger logger = Logger.getLogger(Test.class);  

    /** 
    * @param args 
    */  
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
4、输出结果

（1）首先是控制台的信息



（2）再来看输出的文件



内容如下，发现已按照要求输出到对应的文档中去了。





二、Log4j基本使用方法

Log4j由三个重要的组件构成：日志信息的优先级，日志信息的输出目的地，日志信息的输出格式。日志信息的优先级从高到低有ERROR、WARN、 INFO、DEBUG，分别用来指定这条日志信息的重要程度；日志信息的输出目的地指定了日志将打印到控制台还是文件中；而输出格式则控制了日志信息的显 示内容。

2.1、定义配置文件

其实您也可以完全不使用配置文件，而是在代码中配置Log4j环境。但是，使用配置文件将使您的应用程序更加灵活。Log4j支持两种配置文件格式，一种是XML格式的文件，一种是Java特性文件（键=值）。下面我们介绍使用Java特性文件做为配置文件的方法：
1.配置根Logger，其语法为：

log4j.rootLogger = [ level ] , appenderName, appenderName, …
其中，level 是日志记录的优先级，分为OFF、FATAL、ERROR、WARN、INFO、DEBUG、ALL或者您定义的级别。Log4j建议只使用四个级别，优 先级从高到低分别是ERROR、WARN、INFO、DEBUG。通过在这里定义的级别，您可以控制到应用程序中相应级别的日志信息的开关。比如在这里定 义了INFO级别，则应用程序中所有DEBUG级别的日志信息将不被打印出来。 appenderName就是指B日志信息输出到哪个地方。您可以同时指定多个输出目的地。

2.配置日志信息输出目的地Appender，其语法为：

log4j.appender.appenderName = fully.qualified.name.of.appender.class  
log4j.appender.appenderName.option1 = value1  
…  
log4j.appender.appenderName.option = valueN
其中，Log4j提供的appender有以下几种：

org.apache.log4j.ConsoleAppender（控制台），  
org.apache.log4j.FileAppender（文件），  
org.apache.log4j.DailyRollingFileAppender（每天产生一个日志文件），  
org.apache.log4j.RollingFileAppender（文件大小到达指定尺寸的时候产生一个新的文件），  
org.apache.log4j.WriterAppender（将日志信息以流格式发送到任意指定的地方）
3.配置日志信息的格式（布局），其语法为：

log4j.appender.appenderName.layout = fully.qualified.name.of.layout.class  
log4j.appender.appenderName.layout.option1 = value1  
…  
log4j.appender.appenderName.layout.option = valueN
其中，Log4j提供的layout有以e几种：

org.apache.log4j.HTMLLayout（以HTML表格形式布局），  
org.apache.log4j.PatternLayout（可以灵活地指定布局模式），  
org.apache.log4j.SimpleLayout（包含日志信息的级别和信息字符串），  
org.apache.log4j.TTCCLayout（包含日志产生的时间、线程、类别等等信息）
Log4J采用类似C语言中的printf函数的打印格式格式化日志信息，打印参数如下： %m 输出代码中指定的消息

%p 输出优先级，即DEBUG，INFO，WARN，ERROR，FATAL  
%r 输出自应用启动到输出该log信息耗费的毫秒数  
%c 输出所属的类目，通常就是所在类的全名  
%t 输出产生该日志事件的线程名  
%n 输出一个回车换行符，Windows平台为“rn”，Unix平台为“n”  
%d 输出日志时间点的日期或时间，默认格式为ISO8601，也可以在其后指定格式，比如：%d{yyy MMM dd HH:mm:ss,SSS}，输出类似：2002年10月18日 22：10：28，921  
%l 输出日志事件的发生位置，包括类目名、发生的线程，以及在代码中的行数。举例：Testlog4.main(TestLog4.java:10)
2.2、在代码中使用Log4j

1.得到记录器

使用Log4j，第一步就是获取日志记录器，这个记录器将负责控制日志信息。其语法为：

public static Logger getLogger( String name)

通过指定的名字获得记录器，如果必要的话，则为这个名字创建一个新的记录器。Name一般取本类的名字，比如：

static Logger logger = Logger.getLogger ( ServerWithLog4j.class.getName () )

2.读取配置文件

当获得了日志记录器之后，第二步将配置Log4j环境，其语法为：

BasicConfigurator.configure ()： 自动快速地使用缺省Log4j环境。  
PropertyConfigurator.configure ( String configFilename) ：读取使用Java的特性文件编写的配置文件。  
DOMConfigurator.configure ( String filename ) ：读取XML形式的配置文件。
3.插入记录信息（格式化日志信息）

当上两个必要步骤执行完毕，您就可以轻松地使用不同优先级别的日志记录语句插入到您想记录日志的任何地方，其语法如下：

Logger.debug ( Object message ) ;  
Logger.info ( Object message ) ;  
Logger.warn ( Object message ) ;  
Logger.error ( Object message ) ;
2.3、日志级别

每个Logger都被了一个日志级别（log level），用来控制日志信息的输出。日志级别从高到低分为：
A：off 最高等级，用于关闭所有日志记录。
B：fatal 指出每个严重的错误事件将会导致应用程序的退出。
C：error 指出虽然发生错误事件，但仍然不影响系统的继续运行。
D：warm 表明会出现潜在的错误情形。
E：info 一般和在粗粒度级别上，强调应用程序的运行全程。
F：debug 一般用于细粒度级别上，对调试应用程序非常有帮助。
G：all 最低等级，用于打开所有日志记录。

上面这些级别是定义在org.apache.log4j.Level类中。Log4j只建议使用4个级别，优先级从高到低分别是error,warn,info和debug。通过使用日志级别，可以控制应用程序中相应级别日志信息的输出。例如，如果使用b了info级别，则应用程序中所有低于info级别的日志信息(如debug)将不会被打印出来。

三、Web项目中使用Log4j实例

上面代码描述了Log4j的简单应用，其实使用Log4j也就是这样简单方便。当然除了上面的配置方法，还有其它，比如做一个J2EE应用，在J2EE应用使用Log4j，必须先在启动服务时加载Log4j的配置文件进行初始化，可以在web.xml中进行。

1、web应用的log4j使用基本上都采用：新建一个servlet，这个servlet在init函数中为log4j执行配置。一般就是读入配置文件。所以需要在web.xml中为这个servlet配置，同时设定load-on-startup为1。

2、这个servlet配置log4j就是读出配置文件，然后调用configure函数。这里有两个问题：一、需要知道文件在哪里；二、需要正确的文件类型

3、配置文件位置在web.xml中配置一个param即可，路径一般是相对于web的root目录

4、文件类型一般有两种，一个是Java的property文件，另一种是xml文件

配置文件的大致内容：log4j可以指定输出的log级别的最低等级，以及log的输出配置格式，每个log可以指定多个输出方式

（1）创建Web工程，整个工程最后目录如下



（2）web.xml配置如下：

<?xml version="1.0" encoding="UTF-8"?>  
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
    xmlns="http://java.sun.com/xml/ns/javaee"  
    xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"  
    id="WebApp_ID" version="3.0">  
    <display-name>LogLearning</display-name>  

    <servlet>  
        <servlet-name>Log4JTestServlet</servlet-name>  
        <servlet-class>com.mucfc.Log4JTestServlet</servlet-class>  
    </servlet>  

    <!--用来启动 log4jConfigLocation的servlet -->  
    <servlet>  
        <servlet-name>Log4JInitServlet</servlet-name>  
        <servlet-class>com.mucfc.Log4JInitServlet</servlet-class>  
        <init-param>  
            <param-name>log4j-properties-location</param-name>  
            <param-value>/WEB-INF/classes/log4j.properties</param-value>  
        </init-param>  
        <load-on-startup>1</load-on-startup>  
    </servlet>  

    <servlet-mapping>  
        <servlet-name>Log4JTestServlet</servlet-name>  
        <url-pattern>/test</url-pattern>  
    </servlet-mapping>  

</web-app>
（3）配置文件log4j.properties

### set log levels ###  
log4j.rootLogger = debug,stdout,D,E  

log4j.appender.stdout = org.apache.log4j.ConsoleAppender  
log4j.appender.stdout.Target = System.out  
log4j.appender.stdout.layout = org.apache.log4j.PatternLayout  
log4j.appender.stdout.layout.ConversionPattern = [%-5p] %d{yyyy-MM-dd HH:mm:ss,SSS} method:%l%n%m%n  

log4j.appender.D = org.apache.log4j.DailyRollingFileAppender  
log4j.appender.D.File = F://logs/log.log  
log4j.appender.D.Append = true  
log4j.appender.D.Threshold = DEBUG   
log4j.appender.D.layout = org.apache.log4j.PatternLayout  
log4j.appender.D.layout.ConversionPattern = %-d{yyyy-MM-dd HH:mm:ss}  [ %t:%r ] - [ %p ]  %m%n  

log4j.appender.E = org.apache.log4j.DailyRollingFileAppender  
log4j.appender.E.File =F://logs/error.log   
log4j.appender.E.Append = true  
log4j.appender.E.Threshold = ERROR   
log4j.appender.E.layout = org.apache.log4j.PatternLayout  
log4j.appender.E.layout.ConversionPattern = %-d{yyyy-MM-dd HH:mm:ss}  [ %t:%r ] - [ %p ]  %m%n
（4）web容器一来就初始化的servlet

Log4JInitServlet.java

package com.mucfc;  

import java.io.File;  
import java.io.IOException;  

import javax.servlet.ServletConfig;  
import javax.servlet.ServletContext;  
import javax.servlet.ServletException;  
import javax.servlet.annotation.WebServlet;  
import javax.servlet.http.HttpServlet;  
import javax.servlet.http.HttpServletRequest;  
import javax.servlet.http.HttpServletResponse;  

import org.apache.log4j.BasicConfigurator;  
import org.apache.log4j.PropertyConfigurator;  

/** 
* Servlet implementation class Log4JInitServlet 
*/  
@WebServlet("/Log4JInitServlet")  
public class Log4JInitServlet extends HttpServlet {  
    private static final long serialVersionUID = 1L;  

    /** 
    * @see HttpServlet#HttpServlet() 
    */  
    public Log4JInitServlet() {  
        super();  
        // TODO Auto-generated constructor stub  
    }  

    /** 
    * @see Servlet#init(ServletConfig) 
    */  
    public void init(ServletConfig config) throws ServletException {  
        System.out.println("Log4JInitServlet 正在初始化 log4j日志设置信息");  
        String log4jLocation = config.getInitParameter("log4j-properties-location");  

        ServletContext sc = config.getServletContext();  

        if (log4jLocation == null) {  
            System.err.println("*** 没有 log4j-properties-location 初始化的文件, 所以使用 BasicConfigurator初始化");  
            BasicConfigurator.configure();  
        } else {  
            String webAppPath = sc.getRealPath("/");  
            String log4jProp = webAppPath + log4jLocation;  
            File yoMamaYesThisSaysYoMama = new File(log4jProp);  
            if (yoMamaYesThisSaysYoMama.exists()) {  
                System.out.println("使用: " + log4jProp+"初始化日志设置信息");  
                PropertyConfigurator.configure(log4jProp);  
            } else {  
                System.err.println("*** " + log4jProp + " 文件没有找到， 所以使用 BasicConfigurator初始化");  
                BasicConfigurator.configure();  
            }  
        }  
        super.init(config);  
    }  

    /** 
    * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response) 
    */  
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
        // TODO Auto-generated method stub  
    }  

    /** 
    * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response) 
    */  
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
        // TODO Auto-generated method stub  
    }  

}
调用日志Log4JTestServlet,java

package com.mucfc;  

import java.io.IOException;  

import javax.servlet.ServletConfig;  
import javax.servlet.ServletException;  
import javax.servlet.annotation.WebServlet;  
import javax.servlet.http.HttpServlet;  
import javax.servlet.http.HttpServletRequest;  
import javax.servlet.http.HttpServletResponse;  

import org.apache.log4j.Logger;  

/** 
* Servlet implementation class Log4JTestServlet 
*/  
@WebServlet("/Log4JTestServlet")  
public class Log4JTestServlet extends HttpServlet {  
    private static final long serialVersionUID = 1L;  
    private static Logger logger = Logger.getLogger(Log4JTestServlet.class);    

    /** 
    * @see HttpServlet#HttpServlet() 
    */  
    public Log4JTestServlet() {  
        super();  
        // TODO Auto-generated constructor stub  
    }  

    /** 
    * @see Servlet#init(ServletConfig) 
    */  
    public void init(ServletConfig config) throws ServletException {  
        // TODO Auto-generated method stub  
    }  

    /** 
    * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response) 
    */  
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
        // 记录debug级别的信息    
        logger.debug("This is debug message.");    
        // 记录info级别的信息    
        logger.info("This is info message.");    
        // 记录error级别的信息    
        logger.error("This is error message.");    
    }  

    /** 
    * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response) 
    */  
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {  
        doGet(request,response);  
    }  

}
接下来就是运行了，来看看结果：



输出结果：







四、Spring中使用Log4j

这里要实现web项目中利用Spring来使用Log4j



（1）接上面的工程，然后再导入Spring的包

（2）web.xml增加

<!-- 设置根目录 -->  
    <context-param>    
        <param-name>webAppRootKey</param-name>    
        <param-value>webapp.root</param-value>    
    </context-param>    

    <context-param>  
    <param-name>log4jConfigLocation</param-name>  
    <param-value>/WEB-INF/classes/log4j.properties</param-value>  
</context-param>  
<!-- 3000表示 开一条watchdog线程每60秒扫描一下配置文件的变化;这样便于日志存放位置的改变 -->  
<context-param>    
        <param-name>log4jRefreshInterval</param-name>    
        <param-value>3000</param-value>    
    </context-param>   
<listener>  
    <listener-class>org.springframework.web.util.Log4jConfigListener</listener-class>  
</listener>
整个内容如下：

<?xml version="1.0" encoding="UTF-8"?>  
<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  
    xmlns="http://java.sun.com/xml/ns/javaee"  
    xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"  
    id="WebApp_ID" version="3.0">  
    <display-name>LogLearning</display-name>  

    <servlet>  
        <servlet-name>Log4JTestServlet</servlet-name>  
        <servlet-class>com.mucfc.Log4JTestServlet</servlet-class>  
    </servlet>  

    <!--用来启动 log4jConfigLocation的servlet -->  
<!--     <servlet>  
        <servlet-name>Log4JInitServlet</servlet-name>  
        <servlet-class>com.mucfc.Log4JInitServlet</servlet-class>  
        <init-param>  
            <param-name>log4j-properties-location</param-name>  
            <param-value>/WEB-INF/classes/log4j.properties</param-value>  
        </init-param>  
        <load-on-startup>1</load-on-startup>  
    </servlet>-->  

    <servlet-mapping>  
        <servlet-name>Log4JTestServlet</servlet-name>  
        <url-pattern>/test</url-pattern>  
    </servlet-mapping>   

        <!-- Spring 容器加载 -->  
    <listener>  
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>  
    </listener>  
    <context-param>  
        <param-name>contextConfigLocation</param-name>  
        <param-value>classpath:applicationContext.xml</param-value>  
    </context-param>   

    <!-- 设置根目录 -->  
    <context-param>    
        <param-name>webAppRootKey</param-name>    
        <param-value>webapp.root</param-value>    
    </context-param>    

    <context-param>  
        <param-name>log4jConfigLocation</param-name>  
        <param-value>/WEB-INF/classes/log4j.properties</param-value>  
    </context-param>  
    <!-- 3000表示 开一条watchdog线程每60秒扫描一下配置文件的变化;这样便于日志存放位置的改变 -->  
    <context-param>    
        <param-name>log4jRefreshInterval</param-name>    
        <param-value>3000</param-value>    
    </context-param>   
    <listener>  
        <listener-class>org.springframework.web.util.Log4jConfigListener</listener-class>  
    </listener>   

</web-app>
这里Log4JInitServlet.java就相当于没用到了。

（2）applicationContext.xml

没有内容：

<?xml version="1.0" encoding="UTF-8"?>  
<beans xmlns="http://www.springframework.org/schema/beans"  
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:context="http://www.springframework.org/schema/context"  
    xmlns:aop="http://www.springframework.org/schema/aop"  
    xsi:schemaLocation="    

http://www.springframework.org/schema/beans


http://www.springframework.org/schema/beans/spring-beans-3.2.xsd


http://www.springframework.org/schema/aop


http://www.springframework.org/schema/aop/spring-aop-3.2.xsd


http://www.springframework.org/schema/context

            http://www.springframework.org/schema/context/spring-context-3.2.xsd">  
</beans>
（3）这样日志就跟随Spring窗口启动而启动了

程序一运行，就会自动把日志打印


# Log4j日志体系结构解读

2016-11-28    分类：JAVA开发、编程开发、首页精华1人评论     来源：Float_Luuu
分享到： 更多 4
摘要

我们在写日志的时候首先要获取logger，在每一个使用log4j的项目都有很多个地方要获取logger，这些logger是真实的被实例化的Logger对象，他们有可能被分散在无数不同的类中，日志体系结构讲的是这些logger对象是如何组织的，他们之间又有什么样的关系。

体系结构

我们举个具体的实例来看看，假设我的项目包结构如下：

<http://static.codeceo.com/images/2016/11/log4j-1.png>

项目结构

说明一下：com.flu.jdk包下面有两个类分别是LogTest1和LogTest2，然后在包com.flu包下面有一个LogTest3类，很显然，com.flu.jdk包是com.flu包的子包。假设我们在这三个类中分别通过LogManager.getLogger(xxx.class)获取三个logger实例，他们分别是logger1、logger2和logger3，我们将要讨论这三个logger的关系。

值得注意的是log4j的日志体系中，有一个特殊的日志对象叫做root（根），他是始终存在的，假设我们首先获取logger实例，log4j将构造下面这样一个图形（我不能把它叫做树）：

<http://static.codeceo.com/images/2016/11/log4j-2.jpg>

当只有logger1的时候

当我们获取logger2实例的时候，这个图将变成：

<http://static.codeceo.com/images/2016/11/log4j-3.jpg>

当加入logger2日志实例时结构图

当我们获取logger3实例的时候，这个图又变了一个样，如下：

<http://static.codeceo.com/images/2016/11/log4j-4.jpg>

当加入logger3日志实例之后

仅仅才三个日志实例，图就搞的略复杂，可想log4j应用中，将会有无数的日志实例按照这个规律组成纷繁复杂的有向图结构，虽然看起来杂乱，但是又规律。那么问题来了，这样的结构有什么用呢？下一节我们将会看到这种结构对于日志配置继承的影响。

配置继承

log4j日志级别定义

在往下面看之前我们先来看看log4j对日志级别的定义：

public final static int OFF_INT = Integer.MAX_VALUE;
public final static int FATAL_INT = 50000;
public final static int ERROR_INT = 40000;
public final static int WARN_INT  = 30000;
public final static int INFO_INT  = 20000;
public final static int DEBUG_INT = 10000;
//public final static int FINE_INT = DEBUG_INT;
public final static int ALL_INT = Integer.MIN_VALUE;
很显然，log4j的日志级别有下面的关系：

OFF > FATAL > ERROR > WARN > INFO > DEBUG > ALL
log4j在写日志的时候只有当当前写日志的级别大于等于当前日志实例的配置级别的时候，日志写操作才生效，比如当前日志实例的配置级别为INFO，那么log.info会写成功，而log.debug则不会写。

日志写源码剖析

我们来看看一句简单的log.info(“this is log message”)的背后，先来看看一段源代码：

public void info(Object message) {
if(repository.isDisabled(Level.INFO_INT))
    return;
if(Level.INFO.isGreaterOrEqual(this.getEffectiveLevel()))
    forcedLog(FQCN, Level.INFO, message, null);
}
public boolean isDisabled(int level) {
return thresholdInt > level;
}
首先看看当前写的日志级别是否被禁止的，默认的情况下thresholdInt为ALL，因此INFO的级别显然比ALL大，因此下面会继续看看INFO的级别是否大于等于当前日志实例生效的级别，this.getEffectiveLevel()获取的实例是什么呢？我们继续看看代码：

public Level getEffectiveLevel() {
    for(Category c = this; c != null; c=c.parent) {
    if(c.level != null)
    return c.level;
    }
    return null; // If reached will cause an NullPointerException.
}
当前日志生效的级别逻辑为首先看看当前日志实例是否有配置级别，如果没有，那么就继续找当前日志实例的parent节点，按照上一节中所表述的，如果当前日志的日志级别没有配置，当找到root的日志级别，并根据root的日志级别来断定是否继续进行日志写。这里体现了日志级别的继承关系，其实不仅仅是日志级别，日志其他相关的配置也会基于这种继承的特性，比如appender组件等。

项目应用

了解Log4j的日志体系结构以及日志级别配置的继承特性之后，我们现在应该比较清楚项目中应该如何配置了。以Log4j.xml配置文件为例子，满足基本需求我们只需要配置root这个日志实例的日志级别即可，如下：

<root>
    <level value="INFO" />
    <appender-ref ref="CONSOLE" />
</root>
上面配置了root日志实例的日志级别为INFO，如果获取按照一定规范（当前类的权限定名作为日志实例名），那么我们可以保证所有的日志实例将继承root所配置的日志级别。

配置隔离

上面的配置略粗糙，假如我们想为不同的模块给予不同的配置怎么办呢？最常见的是业务日志与中间件日志，比如我们的业务业务包名为com.dianping.biz，而我们的rpc组件的包名字为com.dianping.pigeon，则我们可以使用下面方法给予不同的模块不同的配置：

<!--业务日志配置-->
<category name="com.dianping.biz">
    <level value="INFO" />
    <appender-ref ref="CONSOLE" />
</category>

<!--pigeon组件日志配置-->
<category name="com.dianping.pigeon">
    <level value="DEBUG" />
    <appender-ref ref="CONSOLE" />
</category>
通过上面的配置，我们可以指定com.dianping.biz包下面所有类获取的logger都继承name为com.dianping.biz的日志配置，而com.dianping.pigeon包下面的所有类获取的logger都继承name为com.dianping.pigeon的日志篇日志。不过通常设计良好的中间件都定制了日志配置以确保中间件日志与业务日志隔离。

总结

昨天有个同事对log4j进行了一些分享，会上听的意犹未尽因此课下忍不住扒一扒log4j的内裤，日志作为java应用的一项重要内容，其不仅仅包括日志如何写、以什么格式写、以及日志写到哪里的问题，还包括性能、扩展性、分布式、日志实时分析等方面问题，本文在介绍log4j日志体系的基础之上稍微聊一下项目应用于配置隔离相关内容，如果读者有兴趣可以深入研究，必定收货满满。

