
  # js 知识点
  ---
  
  ## 迭代方法
  
  ## 缩小方法
  
  ## Date
  `Date.now()`
  在不支持`Date.now()`的浏览器可以使用`+new Date()`
  
  ## 创建方法
  
  ## 继承
  
  ## HTML5 Contact API
  // 执行一个通讯录搜索。获取“name”和“emails”属性。
  // 同时初始化过滤列表到包含“yujie”的联系人记录
  ``` js
  navigator.contacts.find(['name', 'emails'], success, error, {filter: 'yujie'});
  
  function success(contacts) { // 获取联系人对象后进行处理
      for(var i in contacts) { // 遍历所有的联系人
          alert(contacts[i].name); // 弹出联系人的姓名
      }
  }
   
  function error(err) { // 获取数据错误时进行处理
      alert(err.code); // 弹出错误号
  }
  ```
  
  ## H5拖动
