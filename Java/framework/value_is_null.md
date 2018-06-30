# @Value取值为NULL的解决方案

在 Spring MVC 架构中，如果希望在程序中直接使用 properties 中定义的配置值，通常使用一下方式来获取：

``` java
@value("${tag}")
private String tagValue;
```
但是取值时，有时这个tagvalue为NULL，可能原因有：

1. 使用static或final修饰了tagValue，如下：
``` java
private static String tagValue;  //错误
private final String tagValue;    //错误
```
2. 类没有加上@Component(或者@service等)
``` java
@Component   //遗漏
class TestValue{
    @Value("${tag}")
    private String tagValue;
}
```

3. 类被new新建了实例，而没有使用@Autowired
``` java
@Component   
class TestValue{
    @Value("${tag}")
    private String tagValue;
}

class Test{
    ...
    TestValue testValue = new TestValue()
}
```
这个testValue中肯定是取不到值的，必须使用@Autowired：
``` java
class Test{
    @AutoWired
    TestValue testValue
}
```
