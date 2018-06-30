# PM2
---


    
## 安装

    npm install -g pm2
## 运行

    pm2 start app.js
    
查看运行状态
我们可以通过简单的命令查看应用的运行状态：

    pm2 list
    
追踪资源运行情况

    pm2 monit
    
查看应用详细部署状态

如果我们想要查看一个应用详细的运行状态，比如ANodeBlog的状态，可以运行：

    pm2 describe 3
“3”是指App Id。    
    
查看日志

    pm2 logs

重启应用

    pm2 restart appId
    
停止应用

    pm2 stop app.js

在项目中运行

    pm2 web
浏览器访问 <http://localhost:9615> 你会有惊喜！

## 配置文件

新建conf.json并添加如下内容
```json
{
"apps": [
    {
    "name": "ANodeBlog",
    "script": "bin/www",
    "watch": "../",
    "log_date_format": "YYYY-MM-DD HH:mm Z"
    }
]
}
```
然后可以通过

    pm2 start conf.json

## 总结

常用命令总结如下：

    安装pm2
    npm install -g pm2
    启动应用
    pm2 start app.js
    列出所有应用
    pm2 list
    查看资源消耗
    pm2 monit
    查看某一个应用状态
    pm2 describe [app id]
    查看所有日志
    pm2 logs
    重启应用
    pm2 restart [app id]
    停止应用
    pm2 stop [app id]
    开启api访问
    pm2 web    
