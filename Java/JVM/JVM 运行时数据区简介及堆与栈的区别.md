
  # JVM 运行时数据区简介及堆与栈的区别
  ---
  
  理解JVM运行时的数据区是Java编程中的进阶部分。我们在开发中都遇到过一个很头疼的问题就是OutOfMemoryError（内存溢出错误），但是如果我们了解JVM的内部实现和其运行时的数据区的工作机制，那么前面的问题就会迎刃而解。在这片文章中，我们将简单了解JVM中有哪些运行时数据区以及这些数据区的工作机制。
  
  1、JVM运行时数据区分类
  
  程序计数器 (Program Counter (PC) Register)
  
  JVM栈 (Java Virtual Machine Stacks)
  
  堆内存 (Heap Memory)
  
  方法区 (Method Area)
  
  运行时常量池 (Run-time Constant Pool)
  
  本地方法栈 (Native Method Stacks)
  
  2、看图说话
  ![http://static.oschina.net/uploads/img/201508/02032719_Az0s.png](1.png)
  
  3、按线程持有划分
  
  查看上面的图，可以得知以上六个数据区可以分为线程私有还是共享，总体分为如下两种。
  
  3.1 单个线程私有(Managed Per-Thread) 
  
  属于这一种的数据区包含 程序计数器， JVM栈还有本地方法栈。 每个线程都私有这三个数据区，这些数据区在其所属的线程创建时初始化，并随着所属线程结束被销毁。
  
  3.1.1 程序计数器
  
  在通用的计算机体系中，程序计数器用来记录当前正在执行的指令，在JVM中也是如此。程序计数器是线程私有，所以当一个新的线程创建时，程序计数器也会创建。由于Java是支持多线程，Java中的程序计数器用来记录当前线程中正在执行的指令。如果当前正在执行的方法是本地方法，那么此刻程序计数器的值为undefined。注意这个区域是唯一一个不抛出OutOfMemoryError的运行时数据区。
  
  3.1.2 JVM栈
  
  在介绍JVM栈之前，简单介绍一个概念，栈帧
  
  栈帧：一个栈帧随着一个方法的调用开始而创建，这个方法调用完成而销毁。栈帧内存放者方法中的局部变量，操作数栈等数据。
  
  JVM栈只对栈帧进行存储，压栈和出栈操作。栈内存的大小可以有两种设置，固定值和根据线程需要动态增长。在JVM栈这个数据区可能会发生抛出两种错误。
  
  StackOverflowError 出现在栈内存设置成固定值的时候，当程序执行需要的栈内存超过设定的固定值会抛出这个错误。
  
  OutOfMemoryError 出现在栈内存设置成动态增长的时候，当JVM尝试申请的内存大小超过了其可用内存时会抛出这个错误。
  
  3.1.3 本地方法栈
  
  一个支持native方法调用的JVM实现，需要有这样一个数据区，就是本地方法栈，Java官方对于本地方法的定义为methods written in a language other than the Java programming language，就是使用非Java语言实现的方法，但是通常我们指的一般为C或者C++，因此这个栈也有着C栈这一称号。一个不支持本地方法执行的JVM没有必要实现这个数据区域。本地方法栈基本和JVM栈一样，其大小也是可以设置为固定值或者动态增加，因此也会对应抛出StackOverflowError和OutOfMemoryError错误。
  
  3.2 多个线程共享 
  
  属于这一种的数据区包含 堆内存，方法区和运行时常量池。这些数据区可以被每一个线程访问，他们随着JVM启动而初始化，同时伴随JVM关闭而销毁。
  
  3.2.1 堆数据区
  
  堆数据区是用来存放对象和数组（特殊的对象）。堆内存由多个线程共享。堆内存随着JVM启动而创建。众所周知，Java中有一个很好的特性就是自动垃圾回收。垃圾回收就操作这个数据区来回收对象进而释放内存。如果堆内存剩余的内存不足以满足于对象创建，JVM会抛出OutOfMemoryError错误。
  
  3.2.2 方法区
  
  在JVM规范中，方法区被视为堆内存的一个逻辑部分。这一点可能由于具体的JVM实现而不同，甚至在方法区不实现垃圾回收处理也是可以的。方法区和堆内存一样被多个线程访问，方法区中存放类的信息，比如类加载器引用，属性，方法代码和构造方法和常量等。当方法区的可用内存无法满足内存分配需求时，JVM会抛出OutOfMemoryError错误。
  
  3.2.3 运行时常量池
  
  运行时常量池创建在方法区，当一个类或者一个接口被创建的时候，JVM会创建一个运行时常量池。一个运行时常量池实际上是一个类或者接口的class文件中常量池表（constant_pool table）的运行时展示形式。一个运行时常量池包含了多种类型的常量，从诸如运行时可以确定的数值型字面量到运行时才能决定的方法和属性引用。当运行时常量池无法满足于内存分配需求时，JVM会抛出OutOfMemoryError错误。
  
  http://static.oschina.net/uploads/img/201508/02033356_QHTW.png
  
  
  4、Java 堆和栈的区别
  
  当一个人开始学习Java或者其他编程语言的时候，会接触到堆和栈，由于一开始没有明确清晰的说明解释，很多人会产生很多疑问，什么是堆，什么是栈，堆和栈有什么区别？更糟糕的是，Java中存在栈这样一个后进先出（Last In First Out）的顺序的数据结构，这就是java.util.Stack。这种情况下，不免让很多人更加费解前面的问题。事实上，堆和栈都是内存中的一部分，有着不同的作用，而且一个程序需要在这片区域上分配内存。众所周知，所有的Java程序都运行在JVM虚拟机内部，我们这里介绍的自然是JVM（虚拟）内存中的堆和栈。
  
  4.1 各司其职
  
  最主要的区别就是栈内存用来存储局部变量和方法调用。
  
  而堆内存用来存储Java中的对象。无论是成员变量，局部变量，还是类变量，它们指向的对象都存储在堆内存中。
  
  4.2 独有还是共享
  
  栈内存归属于单个线程，每个线程都会有一个栈内存，其存储的变量只能在其所属线程中可见，即栈内存可以理解成线程的私有内存。
  
  而堆内存中的对象对所有线程可见。堆内存中的对象可以被所有线程访问。
  
  4.3 异常错误
  
  如果栈内存没有可用的空间存储方法调用和局部变量，JVM会抛出java.lang.StackOverFlowError。
  
  而如果是堆内存没有可用的空间存储生成的对象，JVM会抛出java.lang.OutOfMemoryError。
  
  4.4 空间大小
  
  栈的内存要远远小于堆内存，如果你使用递归的话，那么你的栈很快就会充满。如果递归没有及时跳出，很可能发生StackOverFlowError问题。
  
  你可以通过-Xss选项设置栈内存的大小。-Xms选项可以设置堆的开始时的大小，-Xmx选项可以设置堆的最大值。
  
  这就是Java中堆和栈的区别。理解好这个问题的话，可以对你解决开发中的问题，分析堆内存和栈内存使用，甚至性能调优都有帮助。
  
  4.5 查看默认值(Updated)
  
  查看堆的默认值，使用下面的代码，其中InitialHeapSize为最开始的堆的大小，MaxHeapSize为堆的最大值。
  
      13:17 $ java -XX:+PrintFlagsFinal -version | grep HeapSize
          uintx ErgoHeapSizeLimit                         = 0                                   {product}
          uintx HeapSizePerGCThread                       = 87241520                            {product}
          uintx InitialHeapSize                          := 134217728                           {product}
          uintx LargePageHeapSizeThreshold                = 134217728                           {product}
          uintx MaxHeapSize                              := 2147483648                          {product}
      java version "1.8.0_25"
      Java(TM) SE Runtime Environment (build 1.8.0_25-b17)
      Java HotSpot(TM) 64-Bit Server VM (build 25.25-b02, mixed mode)
  查看栈的默认值,其中ThreadStackSize为栈内存的大小。
  
      13:21 $ java -XX:+PrintFlagsFinal -version | grep ThreadStackSize
           intx CompilerThreadStackSize                   = 0                                   {pd product}
           intx ThreadStackSize                           = 1024                                {pd product}
           intx VMThreadStackSize                         = 1024                                {pd product}
      java version "1.8.0_25"
      Java(TM) SE Runtime Environment (build 1.8.0_25-b17)
      Java HotSpot(TM) 64-Bit Server VM (build 25.25-b02, mixed mode)
