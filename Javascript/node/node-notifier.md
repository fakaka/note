# node-notifier
---

## 安装
    npm install --save node-notifier
## 使用

``` js
const notifier = require('node-notifier')
// String 
notifier.notify('Message')
  
// Object 
notifier.notify({
    'title': 'My notification',
    'message': 'Hello, there!'
})
```