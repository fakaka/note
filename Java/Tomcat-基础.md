# Tomcat 


## Tomcat目录：

    tomcat/
    　　|---bin：     存放启动和关闭tomcat脚本
    　　|---conf：    存放不同的配置文件（server.xml和web.xml）
    　　|---doc：     存放Tomcat文档
    　　|---lib：     存放Tomcat运行需要的库文件（JARS）
    　　|---logs：    存放Tomcat执行时的LOG文件
    　　|---src：     存放Tomcat的源代码
    　　|---webapps： Tomcat的主要Web发布目录（包括应用程序示例）
    　　|---work：    存放jsp编译后产生的class文件


## Tomcat配置文件

    server.xml: 
    Tomcat 的主配置文件，包含 Service, Connector, Engine, Realm, Valve, Hosts主组件的相关配置信息；

    web.xml：
    遵循 Servlet 规范标准的配置文件，用于配置 servlet，并为所有的Web应用程序提供包括MIME映射等默认配置信息；

    tomcat-user.xml：
    Realm 认证时用到的相关角色、用户和密码等信息；Tomcat 自带的 manager 默认情况下会用到此文件；在 Tomcat 中添加/删除用户，为用户指定角色等将通过编辑此文件实现；

    catalina.policy：
    Java 相关的安全策略配置文件，在系统资源级别上提供访问控制的能力；

    catalina.properties：
    Tomcat 内部 package 的定义及访问相关控制，也包括对通过类装载器装载的内容的控制；Tomcat在启动时会事先读取此文件的相关设置；

    logging.properties: 
    Tomcat6 通过自己内部实现的 JAVA 日志记录器来记录操作相关的日志，此文件即为日志记录器相关的配置信息，可以用来定义日志记录的组件级别以及日志文件的存在位置等；

    context.xml：
    所有 host 的默认配置信息；
