# This
---

当以函数调用模式调用sayName时，this代表window；当用apply模式调用sayName，并给它传入的第一个参数为person时，this被绑定到person对象上。如果不给apply传入任何参数，则this代表window。
自此，函数调用的4种模式就都介绍完了，this的绑定规律也就是以上几种，万变不离其宗。为了简单明了的介绍4种模式，以上的例子都比较简单，那么下面就跟我一起做一个稍复杂的练习，检验下自己是否真正掌握了this绑定对象的方法吧！
## apply
``` js
var name = "window";
var person = {
    name: "person"
};
function sayName() {
    console.log(this.name);
}
sayName();    //window
sayName.apply(person);   //person
sayName.apply();    //window
```

## Other
``` js
var name = "window";
function showName() {
    console.log(this.name);
}
var person1 = {
    name: "person1",
    sayName: showName
}
var person2 = {
    name: "person2",
    sayName: function() {
        var fun = person1.sayName;
        fun();
    }
}
person1.sayName();    //person1
person2.sayName();    //window
```
