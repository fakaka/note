# Timer
---
svn地址: <https://120.25.92.185/svn/java/TimerDemo>

## TimerTask
具体的定时任务类 它的`run()`方法是定时任务的具体实现
``` java
@Override
public void run() {
    if (count > 3) {
        System.out.println("取消");
        this.cancel();
    }
    Calendar calendar = Calendar.getInstance();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    System.out.println(sdf.format(calendar.getTime()) + "  " + name);
    count++;
}
```

## 简单的例子
延迟两秒后每秒输出一次时间
``` java
// 先实例化timer
Timer timer = new Timer();
// 第一个参数为定时任务 
// 第二个参数为延迟
// 第三个参数为间隔
timer.schedule(new TimerTask() {
    @Override
    public void run() {
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println(sdf.format(calendar.getTime()));
    }
}, 2000, 1000);
```
## TimerTask的常用方法
`void java.util.Timer.cancel()`
取消当前的定时任务

`long java.util.TimerTask.scheduledExecutionTime()`
获取下一次定时任务的执行时间

## Timer的常用方法
`void java.util.Timer.cancel()`
取消当前Timer的定时任务
``` java
Timer timer = new Timer();
// MyTimerTask 继承了 TimerTask
MyTimerTask myTimerTask = new MyTimerTask("mj");
MyTimerTask myTimerTask2 = new MyTimerTask("lyt");
timer.scheduleAtFixedRate(myTimerTask, 2000, 5000);
timer.scheduleAtFixedRate(myTimerTask2, 2000, 5000);
// 取消了timer下所有的任务
timer.cancel();
```

`purge()`
获取下一次定时任务的执行时间

    purge()    
    
    
## Timer的缺陷
1. 并发支持不好
    TimerTask会等上一次执行完再去执行下一个定时任务
    
2. 抛出异常时Timer会停止所有的任务

3. 不支持 如每周三，每天之类的定时任务

## schedule() 和 scheduleAtFixedRate()区别
schedule
“fixed-delay”；如果第一次执行时间被delay了，随后的执行时间按照**上一次实际执行完成的时间点**进行计算

scheduleAtFixedRate
“fixed-rate”；如果第一次执行时间被delay了，随后的执行时间按照**上一次开始的时间点** 进行计算，并且为了”catch up”会多次执行任务,TimerTask中的执行体需要考虑同步 
