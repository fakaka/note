# Collection - HashMap - 原理


## JDK8



## 常见问题

### java 中 fail-fast 和 fail-safe的区别

fail-fast  
机制在遍历一个集合时，当集合结构被修改，会抛出Concurrent Modification Exception。

fail-safe  
任何对集合结构的修改都会在一个复制的集合上进行修改，因此不会抛出ConcurrentModificationException

fail-safe 机制有两个问题

1. 需要复制集合，产生大量的无效对象，开销大
2. 无法保证读取的数据是目前原始数据结构中的数据。
