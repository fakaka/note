# Closure
---

## 从外部读取局部变量 

出于种种原因，我们有时候需要得到函数内的局部变量。
但是，前面已经说过了，正常情况下，这是办不到的，只有通过变通方法才能实现。 
那就是在函数的内部，再定义一个函数。 

``` js
function f1(){
    n=999
    return function f2(){
        alert(n);
    }
}

var result=f1()

result() // 999
```
