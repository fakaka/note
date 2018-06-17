# 去故就新 Java线程新同步机制
---

1、可重入锁ReentrantLock，相当于synchronized块，为临界区提供互斥访问机制。

(1) 相关的接口

创建一个可重入锁

Lock lock = new ReentrantLock(); 
请求锁,如果锁被当前另一个线程持有，则阻塞。

    void lock(); 
释放锁

    void unlock(); 
非阻塞型lock()

    boolean tryLock(); 

(2) 使用基本结构
```java
locker.lock(); 
try{ 
    //code here to access the cirtical section 
}finally{ 
    locker.unlock(); 
} 
```
这种结构保证在任何时刻只有一个线程能够进入临界区，如果一个线程锁住了锁对象，其他任何线程在调用lock时，都会被阻塞，直到第一个线程释放锁对象。而且无论try块是否抛出异常，都会执行finally block，解锁locker。

(3) 锁的可重入性

锁是可重入的，线程能够重复地获取它已经拥有的锁。锁对象维护一个持有计数(hold count)来追踪对lock方法的嵌套调用。线程在每次调用lock后都要调用unlock来释放锁。由于这个特性，被一个锁保护的代码可以调用另一个使用相同锁的方法。

(4) 示例代码：

import java.util.concurrent.locks.Lock; 
import java.util.concurrent.locks.ReentrantLock; 

class WorkerOne extends Thread{ 
    private Lock locker; 
    public WorkerOne (Lock locker){ 
        this.locker = locker; 
    } 
    
    public void run(){ 
        locker.lock(); 
        try{ 
System.out.println(Thread.currentThread().getName()+":step into critical section"); 
        }finally{ 
            locker.unlock();     
        } 
    } 
} 

class WorkerTwo extends Thread{ 
    private Lock locker; 
    public WorkerTwo (Lock locker){ 
        this.locker = locker; 
    } 
    
    public void sayHello(){ 
        locker.lock(); 
        try{    System.out.println(Thread.currentThread().getName()+":call sayHello()"); 
            Thread.sleep(1000); 
        } catch (InterruptedException e) { 
            e.printStackTrace(); 
        }finally{ 
            locker.unlock(); 
        } 
    } 
    
    public void run(){ 
        locker.lock();   
        try{        System.out.println(Thread.currentThread().getName()+":setp into critical section"); 
                        //测试锁的可重入性  
            sayHello(); 
        }finally{ 
            locker.unlock();     
        } 
    } 
} 

public class Test5 { 
    public static void main(String[] args) { 
        Lock locker = new ReentrantLock(); 
        WorkerOne wo= new WorkerOne(locker); 
        wo.setName("WorkerOne"); 
        WorkerTwo wt = new WorkerTwo(locker); 
        wt.setName("WorkerTwo"); 
        
        wt.start(); 
        wo.start();  
    } 
} 
输出：

WorkerTwo:setp into critical section
WorkerTwo:call sayHello()
WorkerOne:step into critical section
2、条件对象Condition,相当于wait-notify机制，提供一种线程间的等待通知机制,condition中的等待-通知方法是await(),signal(),signalAll(),也需要在互斥环境下被调用。

(1) 相关的接口

创建Condition对象,Condition对象是跟Lock关联在一起的。

Lock locker = new ReentrantLock(); 
Condition cond = locker.newCondition(); 
把此线程放到条件的等待集中。

void await(); 
解除此条件的等待集中所有线程的阻塞状态。

void signalAll(); 
在此条件的等待集中随机选择一个线程，解除其阻塞状态。

void signal(); 

(2) 使用的基本结构：

//初始时ok_to_proceed为false. 
locker.lock() 
try{ 
    while(!ok_to_proceed){ 
//进入等待此条件集中,被阻塞,它维持状态直到另一个线程调用同一个条件上的。 
//signalAll/signal方法时为止。 
        cond.await(); 
    } 
}finally{ 
cker.unlock(); 
} 

locker.lock(); 
    try{ 
    //调用将解除所有等待此条件下的线程的阻塞状态。当线程从等待集中被移走时，它们将再次成为可运行的，调度器将再次激活它们     
    //此时，它们将试图重新进入对象。一旦锁可获得，它们中的某个线程将从await调用返回，从而获得锁并从它被阻塞的地方继续执行。 
    ok_to_proceed = true; 
    cond.signalAll() or cond.signal(); 
    }finally{ 
        locker.unlock(); 
    } 
ok_to_proceed也是为了防止wait-notify出现的问题，即再wait之间，notify()已经给出通知，此时wait只会一直等待下去,这样就保证了signal()线程的通知被await()线程接收到。

(3) 测试代码：

import java.util.concurrent.locks.Condition; 
import java.util.concurrent.locks.Lock; 
import java.util.concurrent.locks.ReentrantLock; 
class GlobalV{ 
    public final static Lock locker = new ReentrantLock(); 
    public final static Condition cond = locker.newCondition(); 
    public static boolean to_proceed = false; 
} 

class Response extends Thread{ 
    public void run(){ 
        while(true){ 
            GlobalV.locker.lock(); 
            try{ 
                while(!GlobalV.to_proceed){ 
                    GlobalV.cond.await(); 
                } 
System.out.println("Response:finish a job"); 
                GlobalV.to_proceed = false; 
                
            }catch(Exception e){ 
                e.printStackTrace(); 
            }finally{ 
                GlobalV.locker.unlock(); 
            }    
        } 
    } 
} 

class Request extends Thread{ 
    public void run(){ 
        while(true){ 
            GlobalV.locker.lock();   
            try{ 
                GlobalV.to_proceed = true; 
                GlobalV.cond.signalAll(); 
                System.out.println("Request:send a job to Response");    
            }finally{ 
                GlobalV.locker.unlock(); 
            } 
            try { 
                Thread.sleep(2000); 
            } catch (InterruptedException e) { 
                e.printStackTrace(); 
            } 
        } 
    } 
} 

public class Test6 { 
    public static void main(String[] args) { 
        Request req = new Request(); 
        Response res = new Response(); 
        req.start(); 
        res.start(); 
    } 
} 
输出：

Request:send a job to Response
Response:finish a job
Request:send a job to Response
Response:finish a job
Request:send a job to Response
Response:finish a job
Request:send a job to Response
Response:finish a job


3、读写锁ReentrantReadWriteLock,适用于"读多写少"的多线程应用场景，"读-写"互斥，"写-写"互斥，而读-读可以共享同读锁，即一个线程获取读锁，其它线程可直接进入读，不会被阻塞。

(1) 相关接口

创建读写锁对象

ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock(); 
获取读锁

Lock readLock = rwLock.readLock(); 
获取写锁

Lock writeLock = rwLock.writeLock(); 
(2).读写锁使用基本结构

//对所有的读操作添加读锁 
readLock.lock(); 
try{ 
//code to read 
}finally{ 
readLock.unlock(); 
}  
//对所有的写操作添加写锁 
writeLock.lock();  
    try{  
//code to write  
    }finally{  
    writeLock.unlock();  
    }  
(3) 测试代码：

import java.util.concurrent.locks.Lock; 
import java.util.concurrent.locks.ReentrantReadWriteLock; 
class Reader extends Thread { 
    private Lock readLock = null; 
    public Reader(Lock readLock) { 
        this.readLock = readLock; 
    } 

    public void run() { 
        while (true) { 
            readLock.lock(); 
            try { 
System.out.println(Thread.currentThread().getName() 
                        + ":read action for 1 seconds-"+ReadWriteLock.testVal); 
            } finally { 
                readLock.unlock(); 
            } 
            try { 
                Thread.sleep(1000); 
            } catch (InterruptedException e) { 
                e.printStackTrace(); 
            } 
        } 
    } 
} 

class Writer extends Thread { 
    private Lock writeLock = null; 
    public Writer(Lock writeLock) { 
        this.writeLock = writeLock; 
    } 
    public void run() { 
        while (true) { 
            writeLock.lock(); 
            try { 
System.out.println(Thread.currentThread().getName() 
                        + ":write action for 2 seconds"); 
if(ReadWriteLock.testVal.equals("1111")) 
                    ReadWriteLock.testVal = "2222"; 
                else 
                    ReadWriteLock.testVal = "1111"; 
            } finally { 
                writeLock.unlock(); 
            } 
            try { 
                Thread.sleep(2000); 
            } catch (InterruptedException e) { 
                e.printStackTrace(); 
            } 
        } 
    } 
} 

public class ReadWriteLock { 
    public static String  testVal = "Initiation"; 
    public static void main(String[] args) { 
        ReentrantReadWriteLock lock = new ReentrantReadWriteLock(); 
        Lock readLock = lock.readLock(); 
        Lock writeLock = lock.writeLock(); 
        Reader reader1 = new Reader(readLock); 
        reader1.setName("reader1"); 
        Reader reader2 = new Reader(readLock); 
        reader2.setName("reader2"); 
        Reader reader3 = new Reader(readLock); 
        reader3.setName("reader3"); 
        Reader reader4 = new Reader(readLock); 
        reader4.setName("reader4"); 
        Writer writer = new Writer(writeLock); 
        writer.setName("writer1"); 
        reader1.start(); 
        reader2.start(); 
        reader3.start(); 
        reader4.start(); 
        writer.start(); 
    } 
} 
输出：

reader1:read action for 1 seconds-Initiation
reader3:read action for 1 seconds-Initiation
writer1:write action for 2 seconds
reader2:read action for 1 seconds-1111
reader4:read action for 1 seconds-1111
reader3:read action for 1 seconds-1111
reader1:read action for 1 seconds-1111
reader4:read action for 1 seconds-1111
reader2:read action for 1 seconds-1111
writer1:write action for 2 seconds
reader4:read action for 1 seconds-2222
reader1:read action for 1 seconds-2222
reader3:read action for 1 seconds-2222
reader2:read action for 1 seconds-2222
4、总结

Lock接口替代synchronized

Lock接口可以比sychronized提供更广泛的锁定操作，可以提供多把不同的锁，且锁之间互不干涉。

Lock接口提供lock()与unlock()方法，使用明确调用来完成同步的，OO思想好于前者。

Lock可以自由操控同步范围(scope)。

Lock接口支持nested lock(嵌套锁定)，并提供了丰富的api。

Lock接口提供了tryLock()方法，支持尝试取得某个object lock。

