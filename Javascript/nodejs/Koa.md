
  # Koa
  
  ## HelloWorld
  
  HelloKoa.js
  ```(js)
  var Koa = require("Koa")
  var app = Koa()
  
  app.use(function* () {
      this.body = "Hello Koa"
  })
  
  app.listen(3000, () => {
      console.log("Listen port : 3000 ")
  })
  ```
  
  ## koa中间件
  
  ```
  var Koa = require("Koa");
  
  var app = Koa();
  
  
  // x-response-time
  app.use(function *(next){
    var start = new Date();
    yield next;
    var ms = new Date() - start;
    this.set('X-Response-Time', ms + 'ms');
  });
  
  // logger
  app.use(function *(next){
    var start = new Date();
    yield next;
    var ms = new Date() - start;
    console.log('%s %s - %s', this.method, this.url, ms);
  });
  
  app.use(function *(){
     this.body = "Hello Koa";
  });
  
  app.listen(3000);
  
  console.log("Listen port : 3000 ");
  ```
