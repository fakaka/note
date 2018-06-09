# JVM

## Trace跟踪参数

    -verbose:gc
    -XX:+printGC
    可以打印GC的简要信息

```
[GC 4790K->374K(15872K), 0.0001606 secs]
[GC 4790K->374K(15872K), 0.0001474 secs]
[GC 4790K->374K(15872K), 0.0001563 secs]
[GC 4790K->374K(15872K), 0.0001682 secs]
```

    -XX:+PrintGCDetails
    打印GC详细信息
    -XX:+PrintGCTimeStamps
    打印CG发生的时间戳
```
[GC[DefNew: 4416K->0K(4928K), 0.0001897 secs] 4790K->374K(15872K), 0.0002232 secs] [Times: user=0.00 sys=0.00, real=0.00 secs] 
```

    -XX:+PrintGCDetails的输出
```
Heap 
   def new generation   total 13824K, used 11223K [0x27e80000, 0x28d80000, 0x28d80000)
  eden space 12288K,  91% used [0x27e80000, 0x28975f20, 0x28a80000)
  from space 1536K,   0% used [0x28a80000, 0x28a80000, 0x28c00000)
  to   space 1536K,   0% used [0x28c00000, 0x28c00000, 0x28d80000)
 tenured generation   total 5120K, used 0K [0x28d80000, 0x29280000, 0x34680000)
   the space 5120K,   0% used [0x28d80000, 0x28d80000, 0x28d80200, 0x29280000)
 compacting perm gen  total 12288K, used 142K [0x34680000, 0x35280000, 0x38680000)
   the space 12288K,   1% used [0x34680000, 0x346a3a90, 0x346a3c00, 0x35280000)
    ro space 10240K,  44% used [0x38680000, 0x38af73f0, 0x38af7400, 0x39080000)
    rw space 12288K,  52% used [0x39080000, 0x396cdd28, 0x396cde00, 0x39c80000)
```

    -Xloggc:log/gc.log
指定GC log的位置，以文件输出帮助开发人员分析问题



    -XX:+HeapDumpOnOutOfMemoryError
OOM时导出堆到文件
    -XX:+HeapDumpPath
导出OOM的路径
``` 
-Xmx20m -Xms5m -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=d:/a.dump

Vector v=new Vector();
for(int i=0;i<25;i++)
    v.add(new byte[1*1024*1024]);
```

``` java
public class TestStackDeep {
	private static int count=0;
	public static void recursion(long a,long b,long c){
		long e=1,f=2,g=3,h=4,i=5,k=6,q=7,x=8,y=9,z=10;
		count++;
		recursion(a,b,c);
	}
	public static void main(String args[]){
		try{
			recursion(0L,0L,0L);
		}catch(Throwable e){
			System.out.println("deep of calling = "+count);
			e.printStackTrace();
		}
	}
}
```
递归调用
```
-Xss128K
deep of calling = 701
java.lang.StackOverflowError

-Xss256K
deep of calling = 1817
java.lang.StackOverflowError
```


## GC参数

### 串行收集器
- 最古老，最稳定
- 效率高可能会产生较长的停顿
- XX:+UseSerialGC
    - 新生代、老年代使用串行回收
    - 新生代复制算法
    - 老年代标记-压缩

### 并行收集器

ParNew

- -XX:+UseParNewGC
    - 新生代并行
    - 老年代串行
- Serial收集器新生代的并行版本
- 复制算法
- 多线程，需要多核支持
- -XX:ParallelGCThreads 限制线程数量

Parallel收集器

- 类似ParNew
- 新生代复制算法
- 老年代 标记-压缩
- 更加关注吞吐量
- -XX:+UseParallelGC 
    - 使用Parallel收集器+ 老年代串行
- -XX:+UseParallelOldGC
    -  使用Parallel收集器+ 并行老年代
- -XX:MaxGCPauseMills
    - 最大停顿时间，单位毫秒
    - GC尽力保证回收时间不超过设定值
- -XX:GCTimeRatio
    - 0-100的取值范围
    - 垃圾收集时间占总时间的比
    - 默认99，即最大允许1%时间做GC
- 这两个参数是矛盾的。因为停顿时间和吞吐量不可能同时调优

### CMS收集器

CMS收集器
- Concurrent Mark Sweep 并发标记清除
- 标记-清除算法
- 与标记-压缩相比
- 并发阶段会降低吞吐量
- 老年代收集器（新生代使用ParNew）
- -XX:+UseConcMarkSweepGC
- 
CMS运行过程比较复杂，着重实现了标记的过程，可分为

- 初始标记
    - 根可以直接关联到的对象
    - 速度快
- 并发标记（和用户线程一起）
    - 主要标记过程，标记全部对象
- 重新标记
    - 由于并发标记时，用户线程依然运行，因此在正式清理前，再做修正
- 并发清除（和用户线程一起）
    - 基于标记结果，直接清理对象

特点

- 尽可能降低停顿
- 会影响系统整体吞吐量和性能
    - 比如，在用户线程运行过程中，分一半CPU去做GC，系统性能在GC阶段，反应速度就下降一半
- 清理不彻底
    - 因为在清理阶段，用户线程还在运行，会产生新的垃圾，无法清理
- 因为和用户线程一起运行，不能在空间快满时再清理
    - -XX:CMSInitiatingOccupancyFraction设置触发GC的阈值
    - 如果不幸内存预留空间不够，就会引起concurrent mode failure

参数
- -XX:+ UseCMSCompactAtFullCollection Full GC后，进行一次整理
    - 整理过程是独占的，会引起停顿时间变长
- -XX:+ CMSFullGCsBeforeCompaction 
    - 设置进行几次Full GC后，进行一次碎片整理
- -XX:ParallelCMSThreads
    - 设定CMS的线程数量


### GC参数整理

- -XX:+UseSerialGC：在新生代和老年代使用串行收集器
- -XX:SurvivorRatio：设置eden区大小和survivior区大小的比例
- -XX:NewRatio:新生代和老年代的比
- -XX:+UseParNewGC：在新生代使用并行收集器
- -XX:+UseParallelGC ：新生代使用并行回收收集器
- -XX:+UseParallelOldGC：老年代使用并行回收收集器
- -XX:ParallelGCThreads：设置用于垃圾回收的线程数
- -XX:+UseConcMarkSweepGC：新生代使用并行收集器，老年代使用CMS+串行收集器
- -XX:ParallelCMSThreads：设定CMS的线程数量
- -XX:CMSInitiatingOccupancyFraction：设置CMS收集器在老年代空间被使用多少后触发
- -XX:+UseCMSCompactAtFullCollection：设置CMS收集器在完成垃圾收集后是否要进行一次内存碎片的整理
- -XX:CMSFullGCsBeforeCompaction：设定进行多少次CMS垃圾回收后，进行一次内存压缩
- -XX:+CMSClassUnloadingEnabled：允许对类元数据进行回收
- -XX:CMSInitiatingPermOccupancyFraction：当永久区占用率达到这一百分比时，启动CMS回收
- -XX:UseCMSInitiatingOccupancyOnly：表示只在到达阀值的时候，才进行CMS回收


## Java自带的工具

jps
- 列出java进程，类似于ps命令
- 参数-q可以指定jps只输出进程ID ，不输出类的短名称
- 参数-m可以用于输出传递给Java进程（主函数）的参数
- 参数-l可以用于输出主函数的完整路径
- 参数-v可以显示传递给JVM的参数


jinfo
- 可以用来查看正在运行的Java应用程序的扩展参数，甚至支持在运行时，修改部分参数
- -flag \<name\>：打印指定JVM的参数值
- -flag [+|-]\<name\>：设置指定JVM参数的布尔值
- -flag \<name\>=\<value\>：设置指定JVM参数的值

jmap	
- 生成Java应用程序的堆快照和对象的统计信息
- jmap -histo 2972 >c:\s.txt

jstack
- 打印线程dump
- -l 打印锁信息
- -m 打印java和native的帧信息
- -F 强制dump，当jstack没有响应时使用

JConsole
- 图形化监控工具
- 可以查看Java应用程序的运行概况，监控堆信息、永久区使用情况、类加载情况等









