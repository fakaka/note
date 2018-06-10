
  # Promise
  ---
  
  ## Promise.resolve
  
  比如 Promise.resolve(42); 可以认为是以下代码的语法糖。
  
      new Promise(function(resolve){
          resolve(42);
      });
  
  ## Promise.race
  使用方法和Promise.all一样，接收一个promise对象数组为参数。
  
  * Promise.all 
      在接收到的所有的对象promise都变为 FulFilled 或者 Rejected 状态之后才会继续进行后面的处理
  * Promise.race 
      只要有一个promise对象进入 FulFilled 或者 Rejected 状态的话，就会继续进行后面的处理。
  
  一个带计时器的 Promise.race 的使用例子。
  
  promise-race-timer.js
  ``` js
  // delay毫秒后执行resolve
  function timerPromisefy(delay) {
      return new Promise(function (resolve) {
          setTimeout(function () {
              resolve(delay)
          }, delay)
      })
  }
  // 任何一个promise变为resolve或reject 的话程序就停止运行
  Promise.race([
      timerPromisefy(1),
      timerPromisefy(32),
      timerPromisefy(64),
      timerPromisefy(128)
  ]).then(function (value) {
      console.log(value)    // => 1
  })
  ```
