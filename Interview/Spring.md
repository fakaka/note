# Spring
---

## SpringMVC
流程 
1、用户发送请求至前端控制器DispatcherServlet 
2、DispatcherServlet收到请求调用HandlerMapping处理器映射器。 
3、处理器映射器找到具体的处理器，生成处理器对象及处理器拦截器(如果有则生成)一并返回给DispatcherServlet。 
4、DispatcherServlet调用HandlerAdapter处理器适配器 
5、HandlerAdapter经过适配调用具体的处理器(Controller，也叫后端控制器)。 
6、Controller执行完成返回ModelAndView 
7、HandlerAdapter将controller执行结果ModelAndView返回给DispatcherServlet 
8、DispatcherServlet将ModelAndView传给ViewReslover视图解析器 
9、ViewReslover解析后返回具体View 
10、DispatcherServlet根据View进行渲染视图（即将模型数据填充至视图中）。 
11、DispatcherServlet响应用户



## AOP
面向切面编程基础
通常，系统由很多组件组成，每个组件负责一部分功能，然而，这些组件也经常带有一些除了核心功能之外的附带功能 。系统服务如日志、事务管理和安全经常融入到一些其他功能模块中。这些系统服务通常叫做交叉业务，这是因为它们总是分布在系统的很多组件中。通过将这些业务分布在多个组件中，给我们的代码引入了双重复杂性。    (1) 实现系统级业务的代码在多个组件中复制。这意味着如果你要改变这些业务逻辑，你就必须到各个模块去修改。就算把这些业务抽象成一个独立模块，其它模块只是调用它的一个方法，但是这个方法调用也还是分布在很多地方。    (2) 组件会因为那些与自己核心业务无关的代码变得杂乱。一个向地址录中添加条目的方法应该只关心如何添加地址，而不是关心它是不是安全或支持事务的。此时，我们该怎么办呢？这正是AOP用得着的地方。AOP帮助我们将这些服务模块化，并把它们声明式地应用在需要它们的地方，使得这些组件更加专注于自身业务，完全不知道其它涉及到的系统服务。    这里的概念切面，就是我们要实现的交叉功能，是应用系统模块化的一个方面或领域。切面的最常见例子就是日志记录。日志记录在系统中到处需要用到，利用继承来重用日志模块是不合适的，这样，就可以创建一个日志记录切面，并且使用AOP在系统中应用。下图展示了切面应用方式 ：
  
其中，通知Advice是切面的实际实现。连接点Joinpoint是应用程序执行过程中插入切面的地点，这个地点可以是方法调用，异常抛出，甚至可以是要修改的字段，切面代码在这些地方插入到你的应用流程中，添加新的行为。切入点Pointcut定义了Advice应该应用在那些连接点，通常通过指定类名和方法名，或者匹配类名和方法名式样的正则表达式来指定切入点[3]。
### 1.通知(Advice):
通知定义了切面是什么以及何时使用。描述了切面要完成的工作和何时需要执行这个工作。
2.连接点(Joinpoint):
程序能够应用通知的一个“时机”，这些“时机”就是连接点，例如方法被调用时、异常被抛出时等等。
3.切入点(Pointcut)
通知定义了切面要发生的“故事”和时间，那么切入点就定义了“故事”发生的地点，例如某个类或方法的名称，spring中允许我们方便的用正则表达式来指定
4.切面(Aspect)
通知和切入点共同组成了切面：时间、地点和要发生的“故事”
5.引入(Introduction)
引入允许我们向现有的类添加新的方法和属性(Spring提供了一个方法注入的功能）
6.目标(Target)
即被通知的对象，如果没有AOP,那么它的逻辑将要交叉别的事务逻辑，有了AOP之后它可以只关注自己要做的事（AOP让他做爱做的事）
7.代理(proxy)
应用通知的对象，详细内容参见设计模式里面的代理模式
8.织入(Weaving)
把切面应用到目标对象来创建新的代理对象的过程，织入一般发生在如下几个时机:
(1)编译时：当一个类文件被编译时进行织入，这需要特殊的编译器才可以做的到，例如AspectJ的织入编译器
(2)类加载时：使用特殊的ClassLoader在目标类被加载到程序之前增强类的字节代码
(3)运行时：切面在运行的某个时刻被织入,SpringAOP就是以这种方式织入切面的，原理应该是使用了JDK的动态代理技术


## 事务

### Spring 事务的传播属性

所谓spring事务的传播属性，就是定义在存在多个事务同时存在的时候，spring应该如何处理这些事务的行为。这些属性在TransactionDefinition中定义，具体常量的解释见下表：

常量名称	常量解释
PROPAGATION_REQUIRED	支持当前事务，如果当前没有事务，就新建一个事务。这是最常见的选择，也是 Spring 默认的事务的传播。
PROPAGATION_REQUIRES_NEW	新建事务，如果当前存在事务，把当前事务挂起。新建的事务将和被挂起的事务没有任何关系，是两个独立的事务，外层事务失败回滚之后，不能回滚内层事务执行的结果，内层事务失败抛出异常，外层事务捕获，也可以不处理回滚操作
PROPAGATION_SUPPORTS	支持当前事务，如果当前没有事务，就以非事务方式执行。
PROPAGATION_MANDATORY	支持当前事务，如果当前没有事务，就抛出异常。
PROPAGATION_NOT_SUPPORTED	以非事务方式执行操作，如果当前存在事务，就把当前事务挂起。
PROPAGATION_NEVER	以非事务方式执行，如果当前存在事务，则抛出异常。
PROPAGATION_NESTED	
如果一个活动的事务存在，则运行在一个嵌套的事务中。如果没有活动事务，则按REQUIRED属性执行。它使用了一个单独的事务，这个事务拥有多个可以回滚的保存点。内部事务的回滚不会对外部事务造成影响。它只对DataSourceTransactionManager事务管理器起效。


### 数据库隔离级别

隔离级别	隔离级别的值	导致的问题
Read-Uncommitted	0	导致脏读
Read-Committed	1	避免脏读，允许不可重复读和幻读
Repeatable-Read	2	避免脏读，不可重复读，允许幻读
Serializable	3	串行化读，事务只能一个一个执行，避免了脏读、不可重复读、幻读。执行效率慢，使用时慎重

脏读：一事务对数据进行了增删改，但未提交，另一事务可以读取到未提交的数据。如果第一个事务这时候回滚了，那么第二个事务就读到了脏数据。

不可重复读：一个事务中发生了两次读操作，第一次读操作和第二次操作之间，另外一个事务对数据进行了修改，这时候两次读取的数据是不一致的。

幻读：第一个事务对一定范围的数据进行批量修改，第二个事务在这个范围增加一条数据，这时候第一个事务就会丢失对新增数据的修改。


### 四、Spring中的隔离级别

常量	解释
ISOLATION_DEFAULT	这是个 PlatfromTransactionManager 默认的隔离级别，使用数据库默认的事务隔离级别。另外四个与 JDBC 的隔离级别相对应。
ISOLATION_READ_UNCOMMITTED	这是事务最低的隔离级别，它充许另外一个事务可以看到这个事务未提交的数据。这种隔离级别会产生脏读，不可重复读和幻像读。
ISOLATION_READ_COMMITTED	保证一个事务修改的数据提交后才能被另外一个事务读取。另外一个事务不能读取该事务未提交的数据。
ISOLATION_REPEATABLE_READ	这种事务隔离级别可以防止脏读，不可重复读。但是可能出现幻像读。
ISOLATION_SERIALIZABLE	这是花费最高代价但是最可靠的事务隔离级别。事务被处理为顺序执行。



传播行为	含义
PROPAGATION_REQUIRED	表示当前方法必须运行在事务中。如果当前事务存在，方法将会在该事务中运行。否则，会启动一个新的事务
PROPAGATION_SUPPORTS	表示当前方法不需要事务上下文，但是如果存在当前事务的话，那么该方法会在这个事务中运行
PROPAGATION_MANDATORY	表示该方法必须在事务中运行，如果当前事务不存在，则会抛出一个异常
PROPAGATION_REQUIRED_NEW	表示当前方法必须运行在它自己的事务中。一个新的事务将被启动。如果存在当前事务，在该方法执行期间，当前事务会被挂起。如果使用JTATransactionManager的话，则需要访问TransactionManager
PROPAGATION_NOT_SUPPORTED	表示该方法不应该运行在事务中。如果存在当前事务，在该方法运行期间，当前事务将被挂起。如果使用JTATransactionManager的话，则需要访问TransactionManager
PROPAGATION_NEVER	表示当前方法不应该运行在事务上下文中。如果当前正有一个事务在运行，则会抛出异常
PROPAGATION_NESTED	表示如果当前已经存在一个事务，那么该方法将会在嵌套事务中运行。嵌套的事务可以独立于当前事务进行单独地提交或回滚。如果当前事务不存在，那么其行为与PROPAGATION_REQUIRED一样。注意各厂商对这种传播行为的支持是有所差异的。可以参考资源管理器的文档来确认它们是否支持嵌套事务


### @Transactional注解

@Transactional属性 

属性	类型	描述
value	String	可选的限定描述符，指定使用的事务管理器
propagation	enum: Propagation	可选的事务传播行为设置
isolation	enum: Isolation	可选的事务隔离级别设置
readOnly	boolean	读写或只读事务，默认读写
timeout	int (in seconds granularity)	事务超时时间设置
rollbackFor	Class对象数组，必须继承自Throwable	导致事务回滚的异常类数组
rollbackForClassName	类名数组，必须继承自Throwable	导致事务回滚的异常类名字数组
noRollbackFor	Class对象数组，必须继承自Throwable	不会导致事务回滚的异常类数组
noRollbackForClassName	类名数组，必须继承自Throwable	不会导致事务回滚的异常类名字数组
