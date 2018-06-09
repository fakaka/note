# javassm大众点评


## 1. 编写tag文件  
page.tag
``` jsp
<%@ tag language="java" pageEncoding="UTF-8" %>
<%@ attribute type="org.imooc.bean.Page" name="page" required="true" %>
<%@ attribute type="String" name="jsMethodName" required="true" %>

<script type="text/javascript">
	function transCurrentPage(currentPage) {
		var rule = /^[0-9]*[1-9][0-9]*$/;
		if(!rule.test(currentPage)) {
			currentPage = 1;
		}
		eval("${jsMethodName}(currentPage)");
	}
</script>

<div class="page fix">
	<a href="javascript:transCurrentPage('1');" class="first">首页</a>
	<a href="javascript:transCurrentPage('${page.currentPage - 1}');" class="pre">上一页</a>
	当前第<span>${page.currentPage}/${page.totalPage}</span>页
	<a href="javascript:transCurrentPage('${page.currentPage + 1}');" class="next">下一页</a>
	<a href="javascript:transCurrentPage('${page.totalPage}');" class="last">末页</a>
	跳至 &nbsp;<input id="currentPageText" value="1" class="allInput w28" type="text"/>&nbsp;页 &nbsp;
	<a href="javascript:transCurrentPage($('#currentPageText').val());" class="go">GO</a>
</div>
```

## 2. 引用自定义的tag

``` xml
<!-- tagdir是tag文件所在的文件夹 -->
<%@ taglib prefix="t" tagdir="/WEB-INF/tags"%>


<!-- 分页 -->
<!-- t 是前缀 page 就是文件名  -->
<t:page jsMethodName="search" page="${searchParam.page}"></t:page>

```

## restful时
使用其他提交方式时(PUT)

web.xml
``` xml
<context-param>
    <param-name>contextConfigLocation</param-name>
    <param-value>classpath:spring/root-context.xml</param-value>
</context-param>

<filter>
    <filter-name>MultipartFilter</filter-name>
    <filter-class>org.springframework.web.multipart.support.MultipartFilter</filter-class>
    <init-param>
        <param-name>multipartResolverBeanName</param-name>
        <param-value>multipartResolver</param-value>
    </init-param>
</filter>
```

root-context.xml
``` xml
<!-- 配置文件上传解析器 -->
<bean id="multipartResolver" class="org.springframework.web.multipart.commons.CommonsMultipartResolver"> 
    <!-- 指定所上传文件的总大小不能超过20M。注意maxUploadSize属性的限制不是针对单个文件，而是所有文件的容量之和 --> 
    <property name="maxUploadSize" value="20000000"/>
    <property name="defaultEncoding" value="utf-8"></property>
</bean>


```

## SpringMVC的数据绑定

![SpringMVC的数据绑定.jpg](F:/doc/note/SpringMVC的数据绑定.jpg)
SpringMVC的数据绑定.jpg

## logback

logback.properties
``` properties
log.base=D:/logs/
log.level=DEBUG
log.appender.ref=stdout
```

logback.xml
``` xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration>
<configuration>
	<property resource="properties/logback.properties" />
	<!--控制台输出 -->
	<appender name="stdout" class="ch.qos.logback.core.ConsoleAppender">
		<encoder>
			<pattern>%date{yyyy-MM-dd HH:mm:ss.SSS} %-5level[%thread]%logger{56}.%method\(\):%L -%msg%n</pattern>
		</encoder>
	</appender>
	<!--文件输出 -->
	<appender name="logfile" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <Encoding>UTF-8</Encoding>
        <File>${log.base}comment.log</File>
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <FileNamePattern>${log.base}comment.%d{yyyy-MM-dd}.log.zip</FileNamePattern>
        </rollingPolicy>
        <encoder>
            <pattern>%date|%msg%n</pattern>
        </encoder>
    </appender>

    <root>
        <level value="${log.level}" />
        <appender-ref ref="${log.appender.ref}" />
    </root>
</configuration>
```

## 定时任务

	需求吧  
	可以设置定时周期
	优先级
	开启关闭定时任务
	cron表达式


### SpringTask

`cron="* * * * * ?"`  
分别对应 秒 分 时 天 月 星期 [年]  
\* 表示任意

applicationContext-task.xml
``` xml
<!-- 扫描task包 -->
<context:component-scan base-package="org.imooc.task"/>

<!-- 启用定时任务 -->
<task:scheduled-tasks>
	<task:scheduled ref="BusinessTask" method="synNumber" cron="10 */5 * * * ?"/>
	<task:scheduled ref="BusinessTask" method="synStar" cron="0 */5 * * * ?"/>
</task:scheduled-tasks>
```


## 判断请求是否是ajax

`request.getHeader("x-requested-with") != null`是ajax请求















