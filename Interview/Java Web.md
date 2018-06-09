## Java Web
---

## Tomcat


## JSP
### jsp有哪些内置对象? 作用分别是什么?
答:JSP 共有以下 9 种基本内置组件（可与 ASP 的 6 种内部组件相对应）：
request 用户端请求，此请求会包含来自 GET/POST 请求的参数
response 网页传回用户端的回应
pageContext 网页的属性是在这里管理
session 与请求有关的会话期
application servlet 正在执行的内容
out 用来传送回应的输出
config servlet 的构架部件
page JSP 网页本身
exception 针对错误网页，未捕捉的例外

### jsp有哪些动作? 作用分别是什么?
答:JSP 共有以下 6 种基本动作
jsp:include：在页面被请求的时候引入一个文件。
jsp:useBean：寻找或者实例化一个 JavaBean。
jsp:setProperty：设置 JavaBean 的属性。
jsp:getProperty：输出某个 JavaBean 的属性。
jsp:forward：把请求转到一个新的页面。
jsp:plugin：根据浏览器类型为 Java 插件生成 OBJECT 或 EMBED 标记
### 两种跳转方式分别是什么? 有什么区别?
<jsp:include page="included.jsp" flush="true">
<jsp:forward page= "nextpage.jsp"/>
前者页面不会转向 include 所指的页面，只是显示该页的结果，主页面还是原
来的页面。执行完后还会回来，相当于函数调用。并且可以带参数.后者完全转
向新页面，不会再回来。相当于 go to 语句。

### forward 和 和 redirect  的区别
forward
是服务器请求资源，服务器直接访问目标地址的 URL，把那个
URL 的响应内容读取过来，然后把这些内容再发给浏览器，浏览器根本不知道服
务器发送的内容是从哪儿来的，所以它的地址栏中还是原来的地址。
redirect
就是服务端根据逻辑,发送一个状态码,告诉浏览器重新去请求那个
地址，一般来说浏览器会用刚才请求的所有参数重新请求，所以
session,request 参数都可以获取

### JSP的生命周期





## Servlet

### Servlet的生命周期
Servlet 生命周期可被定义为从创建直到毁灭的整个过程。以下是 Servlet 遵循的过程：
1. Servlet 通过调用 init () 方法进行初始化。
2. Servlet 调用 service() 方法来处理客户端的请求。
3. Servlet 通过调用 destroy() 方法终止（结束）。
4. 最后，Servlet 是由 JVM 的垃圾回收器进行垃圾回收的。

**init() 方法**
init 方法被设计成只调用一次。它在第一次创建 Servlet 时被调用，在后续每次用户请求时不再调用。因此，它是用于一次性初始化，就像 Applet 的 init 方法一样。
Servlet 创建于用户第一次调用对应于该 Servlet 的 URL 时，但是您也可以指定 Servlet 在服务器第一次启动时被加载。
当用户调用一个 Servlet 时，就会创建一个 Servlet 实例，每一个用户请求都会产生一个新的线程，适当的时候移交给 doGet 或 doPost 方法。init() 方法简单地创建或加载一些数据，这些数据将被用于 Servlet 的整个生命周期。
init 方法的定义如下：
public void init() throws ServletException {
  // 初始化代码...
}
**service() 方法**
service() 方法是执行实际任务的主要方法。Servlet 容器（即 Web 服务器）调用 service() 方法来处理来自客户端（浏览器）的请求，并把格式化的响应写回给客户端。
每次服务器接收到一个 Servlet 请求时，服务器会产生一个新的线程并调用服务。service() 方法检查 HTTP 请求类型（GET、POST、PUT、DELETE 等），并在适当的时候调用 doGet、doPost、doPut，doDelete 等方法。
下面是该方法的特征：
public void service(ServletRequest request, 
                    ServletResponse response) 
      throws ServletException, IOException{
}
service() 方法由容器调用，service 方法在适当的时候调用 doGet、doPost、doPut、doDelete 等方法。所以，您不用对 service() 方法做任何动作，您只需要根据来自客户端的请求类型来重写 doGet() 或 doPost() 即可。
doGet() 和 doPost() 方法是每次服务请求中最常用的方法。下面是这两种方法的特征。
**doGet() 方法**
GET 请求来自于一个 URL 的正常请求，或者来自于一个未指定 METHOD 的 HTML 表单，它由 doGet() 方法处理。
public void doGet(HttpServletRequest request,
                  HttpServletResponse response)
    throws ServletException, IOException {
    // Servlet 代码
}
**doPost() 方法**
POST 请求来自于一个特别指定了 METHOD 为 POST 的 HTML 表单，它由 doPost() 方法处理。
public void doPost(HttpServletRequest request,
                    HttpServletResponse response)
    throws ServletException, IOException {
    // Servlet 代码
}
**destroy() 方法**
destroy() 方法只会被调用一次，在 Servlet 生命周期结束时被调用。destroy() 方法可以让您的 Servlet 关闭数据库连接、停止后台线程、把 Cookie 列表或点击计数器写入到磁盘，并执行其他类似的清理活动。
在调用 destroy() 方法之后，servlet 对象被标记为垃圾回收。destroy 方法定义如下所示：

    public void destroy() {}


![Servlet架构图](http://www.runoob.com/wp-content/uploads/2014/07/Servlet-LifeCycle.jpg "Servlet架构图")

## Mybatis
ibatis把sql语句从Java源程序中独立出来，
放在单独的XML文件中编写，给程序的维护带来了很大便利。
ibatis封装了底层JDBC API的调用细节，并能自动将结果集转换成Java Bean对象，
大大简化了Java数据库编程的重复工作。
### 使用MyBatis的mapper接口调用时有哪些要求？
①  Mapper接口方法名和mapper.xml中定义的每个sql的id相同 
②  Mapper接口方法的输入参数类型和mapper.xml中定义的每个sql 的parameterType的类型相同 
③  Mapper接口方法的输出参数类型和mapper.xml中定义的每个sql的resultType的类型相同 
④  Mapper.xml文件中的namespace即是mapper接口的类路径。


### .简单的说一下MyBatis的一级缓存和二级缓存？
Mybatis首先去缓存中查询结果集，如果没有则查询数据库，如果有则从缓存取出返回结果集就不走数据库。Mybatis内部存储缓存使用一个HashMap，key为hashCode+sqlId+Sql语句。value为从查询出来映射生成的java对象

Mybatis的二级缓存即查询缓存，它的作用域是一个mapper的namespace，即在同一个namespace中查询sql可以从缓存中获取数据。二级缓存是可以跨SqlSession的。

### 1、#{}和${}的区别是什么？
答：${}是Properties文件中的变量占位符，它可以用于标签属性值和sql内部，属于静态文本替换，比如${driver}会被静态替换为com.mysql.jdbc.Driver。#{}是sql的参数占位符，Mybatis会将sql中的#{}替换为?号，在sql执行前会使用PreparedStatement的参数设置方法，按序给sql的?号占位符设置参数值，比如ps.setInt(0, parameterValue)，#{item.name}的取值方式为使用反射从参数对象中获取item对象的name属性值，相当于param.getItem().getName()


## RMI

``` java
// 创建一个远程对象 
// public interface IHello extends Remote 
IHello rhello = new HelloImpl(); 
//本地主机上的远程对象注册表Registry的实例，并指定端口为8888，这一步必不可少（Java默认端口是1099），必不可缺的一步，缺少注册表创建，则无法绑定对象到远程注册表上 
LocateRegistry.createRegistry(8888); 
// 把远程对象注册到RMI注册服务器上，并命名为RHello 
// 绑定的URL标准格式为：rmi://host:port/name(其中协议名可以省略，下面两种写法都是正确的） 
Naming.bind("rmi://localhost:8888/RHello",rhello); 

IHello rhello =(IHello) Naming.lookup("rmi://localhost:8888/RHello"); 
System.out.println(rhello.helloWorld()); 
System.out.println(rhello.sayHelloToSomeBody("你好啊")); 
```
