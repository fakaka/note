# Console
---

## 占位符
console上述的集中度支持printf的占位符格式，支持的占位符有：
字符（%s）、整数（%d或%i）、浮点数（%f）和对象（%o）

    console.log("%d年%d月%d日",2011,3,26)
    // 2011年3月26日

## 信息分组
    console.group("第一组信息")
    console.log("第一组第一条:我的博客(http://www.ido321.com)")
    console.log("第一组第二条:CSDN(http://blog.csdn.net/u011043843)")
    console.groupEnd()
    console.group("第二组信息")
    console.log("第二组第一条")
    console.log("第二组第二条:欢迎你加入")
    console.groupEnd()

    效果：
    
    第一组信息
        第一组第一条:我的博客(http://www.ido321.com)
        第一组第二条:CSDN(http://blog.csdn.net/u011043843)
    第二组信息
        第二组第一条
        第二组第二条:欢迎你加入

## 查看对象的信息

`console.dir()`
可以显示一个对象所有的属性和方法。

    var info = {
        name:"mj",
        QQ:69228217,
        message:"你好"
    }
    console.dir(info)

## 显示某个节点的内容

`console.dirxml()`
用来显示网页的某个节点（node）所包含的html/xml代码。

    var info = document.getElementById('info')
    console.dirxml(info)

## 判断变量是否是真
`console.assert()`
用来判断一个表达式或变量是否为真。如果结果为否，则在控制台输出一条相应信息，并且抛出一个异常。

    var result = 1
    console.assert( result )
    var year = 2014
    console.assert(year == 2018 )
    
1是非0值，是真；而第二个判断是假，在控制台显示错误信息

## 追踪函数的调用轨迹。
`console.trace()`
用来追踪函数的调用轨迹。

    /*函数是如何被调用的，在其中加入console.trace()方法就可以了*/  　　
    function add(a,b){
        console.trace()
        return a+b
    }
    var x = add3(1,1)
    function add3(a,b){return add2(a,b)}
    function add2(a,b){return add1(a,b)}
    function add1(a,b){return add(a,b)}
    
控制台输出信息：

    add	@	VM319:3
    add1	@	VM319:9
    add2	@	VM319:8
    add3	@	VM319:7
    (anonymous function)	@	VM319:6
    InjectedScript._evaluateOn	@	VM291:904
    InjectedScript._evaluateAndWrap	@	VM291:837
    InjectedScript.evaluate	@	VM291:693

八、计时功能

console.time()和console.timeEnd()，用来显示代码的运行时间。

    console.time("控制台计时器一")
    for(var i=0;i<1000;i++){
        for(var j=0;j<1000;j++){
        }
    }
    console.timeEnd("控制台计时器一")
    
    // 运行时间是38.84ms


## console.profile()的性能分析

性能分析（Profiler）就是分析程序各个部分的运行时间，找出瓶颈所在，使用的方法是console.profile()。

    function All(){
        alert(11)
        for(var i=0;i<10;i++){
            funcA(1000)
        }
        funcB(10000)
    }
    function funcA(count){
        for(var i=0;i<count;i++){}
    }
    function funcB(count){
        for(var i=0;i<count;i++){}
    }
    console.profile('性能分析器')
    All()
    console.profileEnd()
输出在开发者工具的profile可以看到