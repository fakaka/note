# ES6语法
---

## 默认参数

ES5

``` js
function(msg){
    msg = msg | 123;
}
```

ES6

``` js
function(msg = '123'){
    
}
```

## 字符串模版

使用\\`包含

``` js
var name = 'mj'
var msg = `hello ${name}`
```

## let 和 const
let 局部作用域
const 常量

## 解构赋值
[]

``` js
let a=1,b=2
[a,b]=[b,a]
console.log(a,b)
// 
```

## 字符串编码
``` js
console.log('\\u0061')
console.log('\\u20bb7')
console.log('\\u{20bb7}')
// a
// ₻7
// 𠮷
```

## String的新方法

    "6444".includes("4")
    str.padStart(targetLength [, padString])
    
    '1'.padStart(8,'0')
    // 00000001

## Proxy和Reflect
``` js
new Proxy(obj,{
    set(target,key){
    }
})
```

``` js
Reflect.get(obj,'name')
```

## Decorators(未完成)


``` js
let TypeName = function(target, name, decorators){
    decorators.name=''
    return decorators
}

class Person{
    
    @TypeName
    name(){
    }
}

```

