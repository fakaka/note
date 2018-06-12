# Collection - HashMap - 多线程不安全

> HashMap 多线程死循环 循环链表的问题

## 参考资料
http://www.sohu.com/a/204365538_478315

## 死循环原因

### Hash 表数据结构
　　HashMap 的数据结构：HashMap 通常会用一个指针数组（假设为 table[] ）来做分散所有的 key，当一个 key 被加入时，会通过 Hash 算法通过 key 算出这个数组的下标 i，然后就把这个 <key, value> 插到 table[i] 中，如果有两个不同的 key 被算在了同一个 i ，那么就叫冲突，又叫碰撞，这样会在 table[i] 上形成一个链表。  
　　我们知道，如果 table[] 的尺寸很小，比如只有2个，如果要放进10个 keys 的话，那么碰撞非常频繁，于是一个O(1)的查找算法，就变成了链表遍历，性能变成了O(n)，这是Hash表的缺陷。  
　　所以，Hash表的尺寸和容量非常的重要。一般来说，Hash表这个容器当有数据要插入时，都会检查容量有没有超过设定的 thredhold，如果超过，需要增大 Hash 表的尺寸，这样一来，整个 Hash 表里的元素都需要被重算一遍。这叫 rehash ，这个成本相当的大。


### Java 的 HashMap 的源代码。

1. put() 操作把一个 <Key,Value> 加到 Hash 表中：
``` java
public V put(K key, V value) {
    ......
    // 算Hash值
    int hash = hash(key.hashCode());
    int i = indexFor(hash, table.length);
    // 如果该key已被插入，则替换掉旧的value （链接操作）
    for (Entry<K,V> e = table[i]; e != null; e = e.next) {
        Object k;
        if (e.hash == hash && ((k = e.key) == key || key.equals(k))) {
            V oldValue = e.value;
            e.value = value;
            e.recordAccess(this);
            return oldValue;
        }
    }
    modCount++;
    // 该key不存在，需要增加一个结点
    addEntry(hash, key, value, i);
    return null;
}
```
2. 检查容量是否超标
``` java
void addEntry(int hash, K key, V value, int bucketIndex) {
    Entry<K,V> e = table[bucketIndex];
    table[bucketIndex] = new Entry<K,V>(hash, key, value, e);
    //查看当前的size是否超过了我们设定的阈值threshold，如果超过，需要resize
    if (size++ >= threshold)
        resize(2 * table.length);
}
``` 
3. 新建一个更大尺寸的hash表，然后把数据从老的Hash表中迁移到新的Hash表中。
``` java
void resize(int newCapacity) {
    Entry[] oldTable = table;
    int oldCapacity = oldTable.length;
    ......
    //创建一个新的Hash Table
    Entry[] newTable = new Entry[newCapacity];
    //将Old Hash Table上的数据迁移到New Hash Table上
    transfer(newTable);
    table = newTable;
    threshold = (int)(newCapacity * loadFactor);
} 
```
4. 迁移的源代码，注意高亮处：
``` java
void transfer(Entry[] newTable) {
    Entry[] src = table;
    int newCapacity = newTable.length;
    // 下面这段代码的意思是：
    // 从OldTable里摘一个元素出来，然后放到NewTable中
    for (int j = 0; j < src.length; j++) {
        Entry<K,V> e = src[j];
        if (e != null) {
            src[j] = null;
            do {
                Entry<K,V> next = e.next; // 
                int i = indexFor(e.hash, newCapacity);
                e.next = newTable[i];
                newTable[i] = e;
                e = next;
            } while (e != null);
        }
    }
} 
```

### 正常的ReHash的过程

假设 hash 算法就是简单的用 key mod 一下表的大小（也就是数组的长度）。  
最上面的是old hash 表，其中的Hash表的size=2, 所以key = 3, 7, 5，在mod 2以后都冲突在table[1]这里了。  
接下来的三个步骤是Hash表 resize成4，然后所有的 <key,value> 重新rehash的过程  
![](../../images/正常的ReHash的过程.png)

并发下的Rehash

1. 假设我们有两个线程。我用红色和浅蓝色标注了一下。

我们再回头看一下我们的 transfer代码中的这个细节：
``` java
do { 
    Entry<K,V> next = e.next; // <--假设线程一执行到这里就被调度挂起了 
    int i = indexFor(e.hash, newCapacity); 
    e.next = newTable[i]; 
    newTable[i] = e; 
    e = next; 
} while (e != null); 
```
而我们的线程二执行完成了。于是我们有下面的这个样子。  

<!-- ![](../images/并发下的Rehash-1.png) -->


注意，因为 Thread1 的 e 指向了key(3)，而next指向了key(7)，其在线程二 rehash 后，指向了线程二重组后的链表。我们可以看到链表的顺序被反转后。

2. 线程一被调度回来执行。

先是执行 newTalbe[i] = e;  
然后是e = next，导致了e指向了key(7)，  
而下一次循环的next = e.next导致了next指向了key(3)

<!-- ![](../images/并发下的Rehash-2.png) -->

3. 一切安好。

线程一接着工作。把key(7)摘下来，放到newTable[i]的第一个，然后把e和next往下移。

<!-- ![](../images/并发下的Rehash-3.png) -->


4. 环形链接出现。

e.next = newTable[i] 导致  key(3).next 指向了 key(7)

注意：此时的key(7).next 已经指向了key(3)， 环形链表就这样出现了。
<!-- ![](../images/并发下的Rehash-4.png) -->


## JDK8
jdk1.8 resize 时用了两个链表，没有这个问题了。
