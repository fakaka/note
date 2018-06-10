
  # Java数据结构
  ---
  
  相必大家应该熟悉使用java.util包里面的各种数据结构，常用的数据结构有线性表、链表、哈希表等，在我们进行java开发时，JDK已经给我们提供了一系列的相应类来实现基本的数据结构。
      常用集合类的继承结构如下：  
  Collection
  ├List
  │├LinkedList
  │├ArrayList
  │└Vector
  │　└Stack
  └Set
  Map
  ├Hashtable
  ├HashMap
  └WeakHashMap
  Collection是最近本的集合接口，一个Collection代表一组Object（Elements）。java的SDK不提供直接继承Collection的类，而是继承Collection的子接口如：List、Set。
   这里Collection、List、Set和Map都是接口（Interface），不是具体的实现类。根据上图可以直到List实现类有ArrayList和LiskedList和Vector。 
   Collection元素如何遍历？不论Collection的实际类型是什么，它都支持一个iterator()的方法，返回一个迭代子，是该迭代子可以逐一访问Collection中每一个元素。代码如下：
  Iterator it = c.iterator();//获取一个迭代子
  	while(it.hasNext()){
  	    Object obj = it.next();//获取下一个元素
  	    System.out.println(obj);
      }
  由Collection接口派生的两个接口是List和Set。
  主要方法:
  
  List接口
  List是有序的Collection，使用此接口能够精确的控制每个元素插入的位置。用户能够使用索引（元素在List中的位置，类似于数组下标）来访问List中的元素，这类似于Java的数组。
  和下面要提到的Set不同，List允许有相同的元素。
  除了具有Collection接口必备的iterator()方法外，List还提供一个listIterator()方法，返回一个ListIterator接口，和标准的Iterator接口相比，ListIterator多了一些add()之类的方法，允许添加，删除，设定元素，还能向前或向后遍历。
  实现List接口的常用类有LinkedList，ArrayList，Vector和Stack。
  主要方法:
  void add(int index,Object element)在指定位置上添加一个对象
  boolean addAll(int index,Collection c)将集合c的元素添加到指定的位置
  Object get(int index)返回List中指定位置的元素
  int indexOf(Object o)返回第一个出现元素o的位置.
  Object removeint(int index)删除指定位置的元素
  Object set(int index,Object element)用元素element取代位置index上的元素,返回被取代的元素
  LinkedList类
  LinkedList实现了List接口，允许null元素。此外LinkedList提供额外的get，remove，insert方法在LinkedList的首部或尾部。这些操作使LinkedList可被用作堆栈（stack），队列（queue）或双向队列（deque）。
  注意LinkedList没有同步方法。如果多个线程同时访问一个List，则必须自己实现访问同步。一种解决方法是在创建List时构造一个同步的List：
   List list = Collections.synchronizedList(new LinkedList(...)); 
  ArrayList类
  ArrayList实现了可变大小的数组。它允许所有元素，包括null。ArrayList没有同步。
  size，isEmpty，get，set方法运行时间为常数。但是add方法开销为分摊的常数，添加n个元素需要O(n)的时间。其他的方法运行时间为线性。
  每个ArrayList实例都有一个容量（Capacity），即用于存储元素的数组的大小。这个容量可随着不断添加新元素而自动增加，但是增长算法并没有定义。当需要插入大量元素时，在插入前可以调用ensureCapacity方法来增加ArrayList的容量以提高插入效率。
  和LinkedList一样，ArrayList也是非同步的（unsynchronized）。
  主要方法:
  Boolean add(Object o)将指定元素添加到列表的末尾
  Boolean add(int index,Object element)在列表中指定位置加入指定元素
  Boolean addAll(Collection c)将指定集合添加到列表末尾
  Boolean addAll(int index,Collection c)在列表中指定位置加入指定集合
  Boolean clear()删除列表中所有元素
  Boolean clone()返回该列表实例的一个拷贝
  Boolean contains(Object o)判断列表中是否包含元素
  Boolean ensureCapacity(int m)增加列表的容量,如果必须,该列表能够容纳m个元素
  Object get(int index)返回列表中指定位置的元素
  Int indexOf(Object elem)在列表中查找指定元素的下标
  Int size()返回当前列表的元素个数
  Vector类
  Vector非常类似ArrayList，但是Vector是同步的。由Vector创建的Iterator，虽然和ArrayList创建的Iterator是同一接口，但是，因为Vector是同步的，当一个Iterator被创建而且正在被使用，另一个线程改变了Vector的状态（例如，添加或删除了一些元素），这时调用Iterator的方法时将抛出ConcurrentModificationException，因此必须捕获该异常。
  Stack 类
  Stack继承自Vector，实现一个后进先出的堆栈。Stack提供5个额外的方法使得Vector得以被当作堆栈使用。基本的push和pop方法，还有peek方法得到栈顶的元素，empty方法测试堆栈是否为空，search方法检测一个元素在堆栈中的位置。Stack刚创建后是空栈。
  Set接口
  Set是一种不包含重复的元素的Collection，即任意的两个元素e1和e2都有e1.equals(e2)=false，Set最多有一个null元素。
  很明显，Set的构造函数有一个约束条件，传入的Collection参数不能包含重复的元素。
  请注意：必须小心操作可变对象（Mutable Object）。如果一个Set中的可变元素改变了自身状态导致Object.equals(Object)=true将导致一些问题。
  Map接口
  请注意，Map没有继承Collection接口，Map提供key到value的映射。一个Map中不能包含相同的key，每个key只能映射一个value。Map接口提供3种集合的视图，Map的内容可以被当作一组key集合，一组value集合，或者一组key-value映射。
  主要方法:
  boolean equals(Object o)比较对象
  boolean remove(Object o)删除一个对象
  put(Object key,Object value)添加key和value
  Hashtable类
  Hashtable继承Map接口，实现一个key-value映射的哈希表。任何非空（non-null）的对象都可作为key或者value。
  添加数据使用put(key, value)，取出数据使用get(key)，这两个基本操作的时间开销为常数。
  Hashtable通过initial capacity和load factor两个参数调整性能。通常缺省的load factor 0.75较好地实现了时间和空间的均衡。增大load factor可以节省空间但相应的查找时间将增大，这会影响像get和put这样的操作。
  使用Hashtable的简单示例如下，将1，2，3放到Hashtable中，他们的key分别是”one”，”two”，”three”：
                          Hashtable numbers = new Hashtable();  
  			numbers.put(“one”, new Integer(1));  
  			numbers.put(“two”, new Integer(2));  
  			numbers.put(“three”, new Integer(3)); 
  要取出一个数，比如2，用相应的key：
                  Integer n = (Integer)numbers.get(“two”);  
  		System.out.println(“two = ” + n);
  
  由于作为key的对象将通过计算其散列函数来确定与之对应的value的位置，因此任何作为key的对象都必须实现hashCode和equals方法。hashCode和equals方法继承自根类Object，如果你用自定义的类当作key的话，要相当小心，按照散列函数的定义，如果两个对象相同，即obj1.equals(obj2)=true，则它们的hashCode必须相同，但如果两个对象不同，则它们的hashCode不一定不同，如果两个不同对象的hashCode相同，这种现象称为冲突，冲突会导致操作哈希表的时间开销增大，所以尽量定义好的hashCode()方法，能加快哈希表的操作。
  如果相同的对象有不同的hashCode，对哈希表的操作会出现意想不到的结果（期待的get方法返回null），要避免这种问题，只需要牢记一条：要同时复写equals方法和hashCode方法，而不要只写其中一个。
  Hashtable是同步的。
  HashMap类
  HashMap和Hashtable类似，不同之处在于HashMap是非同步的，并且允许null，即null value和null key。，但是将HashMap视为Collection时（values()方法可返回Collection），其迭代子操作时间开销和HashMap的容量成比例。因此，如果迭代操作的性能相当重要的话，不要将HashMap的初始化容量设得过高，或者load factor过低。
  WeakHashMap类
  WeakHashMap是一种改进的HashMap，它对key实行“弱引用”，如果一个key不再被外部所引用，那么该key可以被GC回收。
  
  Collections和Arrays
  java集合中里面有两个类为Collecitons和Arrays,这是JCF（ Java Collections Framework ）里面功能强大的工具。提供的算法如下：
      binarySearch：折半查找。
      sort：排序，只是一种类似快速排序的方法，效率仍然是O（n*log n），但是一种稳定的排序方法。
     revese：线性表进行逆序操作。
     rotate：以摸个元素为轴心将线性表“旋转”。
     swap：交换一个线性表中的2个元素位置。
     Collections还有一个重要功能就是“封装器”（Wrapper），它提供了一些方法可以把一个集合转换成一个特殊的集合，如下：  
      unmodifiableXXX：转换成只读集合，这里XXX代表六种基本集合接口：Collection、List、Map、Set、SortedMap和SortedSet。如果你对只读集合进行插入删除操作，将会抛出UnsupportedOperationException异常。   
      synchronizedXXX：转换成同步集合。   
      singleton：创建一个仅有一个元素的集合，这里singleton生成的是单元素Set，   
      singletonList和singletonMap分别生成单元素的List和Map。   
  
            空集：由Collections的静态属性EMPTY_SET、EMPTY_LIST和EMPTY_MAP表示。
  总结
  1、ArrayList: 元素单个，效率高，多用于查询  
  2、Vector: 元素单个，线程安全，多用于查询  
  3、LinkedList:元素单个，多用于插入和删除 
  4、HashMap: 元素成对，元素可为空 
  5、HashTable: 元素成对，线程安全，元素不可为空 
  如果涉及到堆栈，队列等操作，应该考虑用List，对于需要快速插入，删除元素，应该使用LinkedList，如果需要快速随机访问元素，应该使用ArrayList。
  如果程序在单线程环境中，或者访问仅仅在一个线程中进行，考虑非同步的类，其效率较高，如果多个线程可能同时操作一个类，应该使用同步的类。
  要特别注意对哈希表的操作，作为key的对象要正确复写equals和hashCode方法。

