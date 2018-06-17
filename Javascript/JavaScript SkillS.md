# JavaScript SkillS
---

## 2. Closures

A closure in JavaScript is an inner function that has access to its outer function's scope, even after the outer function has returned control. A closure makes the variables of the inner function private. A simple example of a closure is shown below:
``` js
var count = (function () {
                var _counter = 0;
                return function () {
                    return _counter += 1;
                }
            })();
count();
count();
count();
// the counter is 3
```
The variable count is assigned an outer function. The outer function runs only once, which sets the counter to zero and returns an inner function. The _counter variable can be accessed only by the inner function, which makes it behave like a private variable.

3. Prototypes

Every JavaScript function has a prototype property that is used to attach properties and methods. This property is not enumerable. It allows the developer to attach methods or member functions to its objects. JavaScript supports inheritance only through the prototype property. In case of an inherited object, the prototype property points to the object’s parent. A common approach to attach methods to a function is to use prototypes as shown below:

    function Rectangle(x, y) {
                this._length = x;
                this._breadth = y;
    }

    Rectangle.prototype.getDimensions = function () {
                return { length : this._length, breadth : this._breadth };
    };

    Rectangle.prototype.setDimensions = function (len, bred) {
                this._length = len;
                this._breadth = bred;
    };

4. Private properties, using closures

JavaScript lets you define private properties by using the underscore prefix as shown in the above example. However, this does not prevent a user from directly accessing or modifying a property that is supposed to be private.

Defining private properties using closures will help you solve this problem. The member functions that need access to private properties should be defined on the object itself. You can make private properties using closures as shown below:

    function Rectangle(_length, _breadth) {
        this.getDimensions = function () {
        return { length : _length, breadth : _breadth };
        };

        this.setDimension = function (len,bred) {
        _length = len;
        _breadth = bred
        };
    }

5. The Module pattern

The Module pattern is the most frequently used design pattern in JavaScript for achieving loosely coupled, well-structured code. It allows you to create public and private access levels. One way to achieve a Module pattern is shown below:

    var Direction = (function() {
        var _direction = 'forward'

        var changeDirection = function(d) {
                _direction = d;
        }

        return {
                setDirection: function(d) {
                changeDirection(d);
                console.log(_direction);
                }
        };
    })();

    Direction.setDirection('backward');   // Outputs: 'backward'
    console.log(Direction._direction);

The Revealing Module pattern is similar to the Module pattern wherein the variables and methods that need to be exposed are returned in an object literal. The above example can be written using the Revealing Module pattern as follows:

    var Direction = (function() {
        var _direction = 'forward';
        var _privateChangeDirection = function(d) {
                _direction = d;
        }
        return {
                setDirection: _privateChangeDirection
        };
    })();

## 7. Currying
例子1:
``` js
    var myFirstCurry = function(word) {
        return function(user) {
            return [word , ", " , user].join("")
        }
    }

    var HelloUser = myFirstCurry("Hello")
    HelloUser("Rahul") // Output: "Hello, Rahul"
    myFirstCurry("Hey, wassup!")("Rahul") // Output: "Hey, wassup!, Rahul"
```

例子2:
官员要弄7个老婆，碍于国策（一夫一妻）以及年老弟衰，表面上就1个老婆，实际上剩下的6个暗地里消化
``` js
var currying = function(fn) {
    // fn 指官员消化老婆的手段
    var args = [].slice.call(arguments, 1);
    // args 指的是那个合法老婆
    return function() {
        // 已经有的老婆和新搞定的老婆们合成一体，方便控制
        var newArgs = args.concat([].slice.call(arguments));
        // 这些老婆们用 fn 这个手段消化利用，完成韦小宝前辈的壮举并返回
        return fn.apply(null, newArgs);
    };
};

// 下为官员如何搞定7个老婆的测试
// 获得合法老婆
var getWife = currying(function() {
    var allWife = [].slice.call(arguments);
    // allwife 就是所有的老婆的，包括暗渡陈仓进来的老婆
    console.log(allWife.join(";"));
}, "合法老婆");

// 获得其他6个老婆
getWife("大老婆","小老婆","俏老婆","刁蛮老婆","乖老婆","送上门老婆");

// 换一批老婆
getWife("超越韦小宝的老婆");
```

## 8. The apply, call, and bind methods

The bind method allows you to pass arguments to a function without invoking it. A new function is returned with arguments bounded preceding any further arguments. Here is an example:

    var user = {
        greet: "Hello!",
        greetUser: function(userName) {
        console.log(this.greet + " " + userName);
        }
    };

    var greetHola = user.greetUser.bind({greet: "Hola"});
    var greetBonjour = user.greetUser.bind({greet: "Bonjour"});

    greetHola("Rahul") // Output: "Hola Rahul"
    greetBonjour("Rahul") // Output: "Bonjour Rahul"

## 10. Method overloading

Method overloading allows multiple methods to have the same name but different arguments. The compiler or interpreter determines which function to call based on the number of arguments passed. Method overloading is not directly supported in JavaScript. But you can achieve something very much like it as shown below:

    function overloadMethod(object, name, fn){
        if(!object._overload){
            object._overload = {};
        }

        if(!object._overload[name]){
            object._overload[name] = {};
        }

        if(!object._overload[name][fn.length]){
            object._overload[name][fn.length] = fn;
        }

        object[name] = function() {
            if(this._overload[name][arguments.length])
                return this._overload[name][arguments.length].apply(this, arguments);
        };
    }

    function Students(){
        overloadMethod(this, "find", function(){
                // Find a student by name
        });

        overloadMethod(this, "find", function(first, last){
                // Find a student by first and last name
        });
    }

    var students = new Students();
    students.find(); // Finds all
    students.find("Rahul"); // Finds students by name
    students.find("Rahul", "Mhatre"); // Finds users by first and last name
