# Redis


## 主从复制
在redis.conf中配置slaveof 以6380端口为例

    port 6389
    # slaveof <masterip> <masterport>
    slaveof localhost 6379
    
安全性，可以设置密码

    # If the master is password protected (using the "requirepass" configuration
    # directive below) it is possible to tell the slave to authenticate before
    # starting the replication synchronization process, otherwise the master will
    # refuse the slave request.
    #
    # masterauth <master-password>
    
    
## redis INCR 自动增长
浏览量计数器

    > set visit:1 100
    > incr visit:1
    > get visit:1 //101

incrby
    
    > incrby visit:1 2

## set 社交圈子(未完成)
建立

    > sadd circle.mj.family mj
    > sadd circle.mj.play lyt
    
查看圈子人员

    > smember sadd circle.mj.family
    > 1) mj
    
求交集

    > sinter circle.mj.family circle.mj.play
    
求并集


## keys 使用的通配符
\\* 表示全部
? 站位符
[ab] 有a或者b


## 数据持久化
### 快照（snapshot）
```
################################ SNAPSHOTTING  ################################
#
# Save the DB on disk:
#
#   save <seconds> <changes>
#
#   Will save the DB if both the given number of seconds and the given
#   number of write operations against the DB occurred.
#
#   In the example below the behaviour will be to save:
#   after 900 sec (15 min) if at least 1 key changed
#   after 300 sec (5 min) if at least 10 keys changed
#   after 60 sec if at least 10000 keys changed
#
#   Note: you can disable saving completely by commenting out all "save" lines.
#
#   It is also possible to remove all the previously configured save
#   points by adding a save directive with a single empty string argument
#   like in the following example:
#
#   save ""

save 900 1
save 300 10
save 60 10000
```

立即保存

    > save

后台保存

    > bgsave
    

是否压缩文件

    # Compress string objects using LZF when dump .rdb databases?
    # For default that's set to 'yes' as it's almost always a win.
    # If you want to save some CPU in the saving child set it to 'no' but
    # the dataset will likely be bigger if you have compressible values or keys.
    rdbcompression yes


### AOF 
    ############################## APPEND ONLY MODE ###############################

    # By default Redis asynchronously dumps the dataset on disk. This mode is
    # good enough in many applications, but an issue with the Redis process or
    # a power outage may result into a few minutes of writes lost (depending on
    # the configured save points).
    #
    # The Append Only File is an alternative persistence mode that provides
    # much better durability. For instance using the default data fsync policy
    # (see later in the config file) Redis can lose just one second of writes in a
    # dramatic event like a server power outage, or a single write if something
    # wrong with the Redis process itself happens, but the operating system is
    # still running correctly.
    #
    # AOF and RDB persistence can be enabled at the same time without problems.
    # If the AOF is enabled on startup Redis will load the AOF, that is the file
    # with the better durability guarantees.
    #
    # Please check http://redis.io/topics/persistence for more information.

    appendonly yes

## 过期时间
设置过期时间 EXPIRE

    EXPIRE key second
    EXPIRE abc 10

获取过期时间 ttl

-1 表示永不过期
-2 表示已经过期

    ttl key
    
## set的集合操作
差集 SDIFF

    > sadd s1 0 1 2 3 4
    (integer) 5
    > sadd s2 0 1 2 a b
    (integer) 5
    > s s1
    1) "0"
    2) "1"
    3) "2"
    4) "3"
    5) "4"
    > SDIFF s1 s2
    1) "3"
    2) "4"

交集 SINTER

    > SINTER s1 s2
    1) "0"
    2) "2"
    3) "1"

并集 SUNION

    > SUNION s1 s2
    1) "a"
    2) "2"
    3) "0"
    4) "3"
    5) "1"
    6) "b"
    7) "4"

## 发布/订阅
订阅

    > SUBSCRIBE c1 c2
    Reading messages... (press Ctrl-C to quit)
    1) "subscribe"
    2) "c1"
    3) (integer) 1
    1) "subscribe"
    2) "c2"
    3) (integer) 2

发布

    > PUBLISH c1 111
    (integer) 1

    1) "message"
    2) "c1"
    3) "111"

可以使用通配符 * 订阅

## 事务

    watch key
    
## 数据库
一共16个db  
使用 `select` 切换数据库

    > select 0

`Dbsize` 查看数据库数量

## Redis使用场景之OAuth
### TODO

## 位图统计活跃用户

### 需求
一亿用户的一周登录排行

### 解决方案
用位图给每个用户分配一位

### 

``` 
> setbit mon 1_0000_0000 0 // 星期一一亿全部设置为0
> setbit mon 5 1 // 5号用户设置为1
> setbit tues 1_0000_0000 0 // 星期一一亿全部设置为0
> setbit tues 3 1 // 3号用户设置为1

> bit and mon tues

```
