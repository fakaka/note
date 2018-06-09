# Quartz

> Quartz

- [Quartz](#quartz)
    - [安装](#%E5%AE%89%E8%A3%85)
        - [maven](#maven)
    - [代码示例](#%E4%BB%A3%E7%A0%81%E7%A4%BA%E4%BE%8B)
        - [TODO](#todo)
    - [配置文件](#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6)
    - [常用的两种Trigger](#%E5%B8%B8%E7%94%A8%E7%9A%84%E4%B8%A4%E7%A7%8Dtrigger)
    - [example_quartz.properties](#examplequartzproperties)
    - [JobDataMap](#jobdatamap)
    - [SimpleTrigger](#simpletrigger)
    - [CronTrigger](#crontrigger)
        - [cron example](#cron-example)


##  安装
### maven 
``` xml
<dependency>
    <groupId>org.quartz-scheduler</groupId>
    <artifactId>quartz</artifactId>
    <version>2.2.1</version>
</dependency>
<dependency>
    <groupId>org.quartz-scheduler</groupId>
    <artifactId>quartz-jobs</artifactId>
    <version>2.2.1</version>
</dependency>  
```


##  代码示例
### TODO


##  配置文件
``` bash
#=============================================================== 
#Configure Main Scheduler Properties 
#===============================================================    
org.quartz.scheduler.instanceName = QuartzScheduler    
org.quartz.scheduler.instanceId = AUTO 

#=============================================================== 
#Configure ThreadPool 
#===============================================================    
org.quartz.threadPool.threadCount =   5    
org.quartz.threadPool.threadPriority = 5    
org.quartz.threadPool.class = org.quartz.simpl.SimpleThreadPool 

#=============================================================== 
#Configure JobStore 
#===============================================================    
org.quartz.jobStore.class = org.quartz.simpl.RAMJobStore 

#=============================================================== 
#Configure Plugins 
#===============================================================    
org.quartz.plugin.jobInitializer.class =    
org.quartz.plugins.xml.JobInitializationPlugin    
   
org.quartz.plugin.jobInitializer.overWriteExistingJobs = true   
org.quartz.plugin.jobInitializer.failOnFileNotFound = true   
org.quartz.plugin.jobInitializer.validating=false  
```

## 常用的两种Trigger
- SimpleTrigger 总是每隔若干秒触发，而同夏令时没有关系。
- CronTrigger 总是在给定的时间出发然后计算它下次触发的时间。如果在给定的日期内没有该时间，则触发器将会被忽略，如果在给定的日期内该时间发生了两次，它只触发一次。因为是在第一次触发发生后计算当天下次触发的时间。

## example_quartz.properties

example_quartz.properties
``` properties
# 调度器属性 ===================================================
org.quartz.scheduler.instanceName: DefaultQuartzScheduler
org.quartz.scheduler.rmi.export: false
org.quartz.scheduler.rmi.proxy: false
org.quartz.scheduler.wrapJobExecutionInUserTransaction: false

# 线程池属性

org.quartz.threadPool.class: org.quartz.simpl.SimpleThreadPool
# 线程数
org.quartz.threadPool.threadCount: 10
org.quartz.threadPool.threadPriority: 5
org.quartz.threadPool.threadsInheritContextClassLoaderOfInitializingThread: true

org.quartz.jobStore.misfireThreshold: 60000

org.quartz.jobStore.class: org.quartz.simpl.RAMJobStore

```
- org.quartz.scheduler.instanceName – 它叫做"DefaultQuartzScheduler"
- org.quartz.scheduler.instanceId - 假如你想 Quartz 帮你生成这个值的话，可以设置为 AUTO。如果 Quartz 框架是运行在非集群环境中，那么自动产生的值将会是 NON_CLUSTERED。假如是在集群环境下使用 Quartz，这个值将会是主机名加上当前的日期和时间。大多情况下，设置为 AUTO 即可。
- org.quartz.scheduler.rmi.export – 这个scheduler是本地的, 这意味着它不能通过RMI(Remote Method Invocation)进行访问。
- org.quartz.threadPool.threadCount –在线程池中有 10 个线程，这意味着最多有 10
个线程可以并发运行。
- org.quartz.jobStore.class – 所有的Quartz数据,例如Job和Trigger的细节信息被存储在内存（而不是数据库）中。
 
log4j.properties
``` properties
# Create stdout appender    
log4j.rootLogger=error, stdout 

# Configure the stdout appender to go to the Console    
log4j.appender.stdout=org.apache.log4j.ConsoleAppender 

# Configure stdout appender to use the PatternLayout    
log4j.appender.stdout.layout=org.apache.log4j.PatternLayout 

# Pattern output the caller's filename and line #    
log4j.appender.stdout.layout.ConversionPattern=%5p [%t] (%F:%L) - %m%n 

# Print messages of level INFO or above for examples    
log4j.logger.org.cavaness.quartzbook=INFO   
```


## JobDataMap

    jobDetail.getJobDataMap().put("jobSays", "Hello World!");
    jobDetail.getJobDataMap().put("myFloatValue", 3.141f);
    jobDetail.getJobDataMap().put("myStateData", new ArrayList());

``` java
public class DumbJob implements Job {
    public DumbJob() {
    }
    public void execute(JobExecutionContext context) throws JobExecutionException {
        String instName = context.getJobDetail().getName();
        // The method getName() is undefined for the type JobDetail
        String instGroup = context.getJobDetail().getGroup();
        JobDataMap dataMap = context.getJobDetail().getJobDataMap();
        String jobSays = dataMap.getString("jobSays");
        float myFloatValue = dataMap.getFloat("myFloatValue");
        ArrayList state = (ArrayList)dataMap.get("myStateData");
        state.add(new Date());
        System.err.println("Instance " + instName + " of DumbJob says: " +jobSays);
    }
}
```

## SimpleTrigger
SimpleTriggerd的构造函数
``` java
public SimpleTrigger(String name, String group, Date startTime, Date endTime, int repeatCount, long repeatInterval)
```


## CronTrigger

cron表达式 `* * * * * * *`
1. Seconds 秒
2. Minutes 分钟
3. Hours 小时
4. Day-of-Month 月中的天
5. Month 月
6. Day-of-Week 周中的天
7. Year (optional field) 年（可选的域）

- 所有的域中的值都有特定的合法范围，这些值的合法范围相当明显，例如：秒和分域的合法值为 0 到 59，小时的合法范围是 0 到 23，Day-of-Month 中值得合法凡范围是 0到 31，但是需要注意不同的月份中的天数不同。月份的合法值是 0 到 11。或者用字符串JAN,FEB MAR, APR, MAY, JUN, JUL, AUG, SEP, OCT, NOV 及 DEC 来表示。Days-of-Week可以用1到7来表示（1=星期日）或者用字符串SUN, MON, TUE, WED,THU, FRI 和 SAT 来表示.
- '/'字符用来表示值的增量，例如, 如果分钟域中放入'0/15'，它表示“每隔 15 分钟，从 0 开始”，如果在份中域中使用'3/20'，则表示“小时中每隔 20 分钟，从第 3 分钟开始”或者另外相同的形式就是'3,23,43'。
- '?'字符可以用在 day-of-month 及 day-of-week 域中，它用来表示“没有指定值”。这对于需要指定一个或者两个域的值而不需要对其他域进行设置来说相当有用。看下面例子（以及 CronTrigger JavaDOC）会更清楚。
- 'L'字符可以在 day-of-month 及 day-of-week 中使用，这个字符是"last"的简写但是在两个域中的意义不同。例如，在 day-of-month 域中的"L"表示这个月的最后一天即，一月的 31 日，非闰年的二月的 28 日。如果它用在 day-of-week 中，则表示"7"者"SAT"。但是如果在 day-of-week 域中，这个字符跟在别的值后面，则表示"当月的后的周 XXX"。例如："6L" 或者 "FRIL"都表示本月的最后一个周五。当使用'L'选项时最重要的是不要指定列表或者值范围，否则会导致混乱。
- 'W' 字符用来指定距离给定日最接近的周几（在 day-of-week 域中指定）。例如：如果你为 day-of-month 域指定为"15W",则表示“距离月中 15 号最近的周几”。'#'表示表示月中的第几个周几。例如：day-of-week 域中的"6#3" 或者 "FRI#3"表示“月中第三个周五”。

### cron example

    "0 0 12 ? * WED" --> “每周三的中午 12：00”

    "0/20 * * * * ?" --> job 1 will run every 20 seconds

    "15 0/2 * * * ?" --> job 2 will run every other minute (at 15 seconds past the minute)

    "0 0/2 8-17 * * ?" --> job 3 will run every other minute but only between 8am and 5pm

    "0 0/3 17-23 * * ?" --> job 4 will run every three minutes but only between 5pm and 11pm

    "0 0 10am 1,15 * ?" --> job 5 will run at 10am on the 1st and 15th days of the month

    "0,30 * * ? * MON-FRI" --> job 6 will run every 30 seconds but only on Weekdays (Monday through Friday)

    "0,30 * * ? * SAT,SUN" --> job 7 will run every 30 seconds but only on Weekends (Saturday and Sunday)

