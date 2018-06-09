# Docker 
---

## 安装
Docker for Windows [下载页面](https://store.docker.com/editions/community/docker-ce-desktop-windows)

![Enjoy](https://d1q6f0aelx0por.cloudfront.net/icons/d4win-artboard4.png)

## 运行

检查docker版本

    docker --version

运行Helloworld

    docker run hello-world
    
    
## 相关文档

[Docker for Windows](https://docs.docker.com/docker-for-windows/)
    
    
## Explore the application and run examples    
    
    docker ps
    docker version
    docker info
    
Start a Dockerized webserver with this command:

    PS C:\\Users\\jdoe> docker run -d -p 80:80 --name webserver nginx
This will download the nginx container image and start it.
    
    
## Set up tab completion in PowerShell

1. Start an “elevated” PowerShell (i.e., run it as administrator).

2. Set the script execution policy to allow downloaded scripts signed by trusted publishers to run on your computer. To do so, type this at the PowerShell prompt.

        Set-ExecutionPolicy RemoteSigned
        
3. To check that the policy is set properly, run get-executionpolicy, which should return RemoteSigned.

        Install-Module posh-docker
        
4. After installation to enable autocompletion for the current PowerShell only, type:

        Import-Module posh-docker
        
5. To make tab completion persistent across all PowerShell sessions, add the command to a          $PROFILE by typing these commands at the PowerShell prompt.
```(shell)
if (-Not (Test-Path $PROFILE)) {
    New-Item $PROFILE –Type File –Force
}
Add-Content $PROFILE "`nImport-Module posh-docker"
```       
6. This creates a $PROFILE if one does not already exist, and adds this line into the file:

        Import-Module posh-docker
        
7. To check that the file was properly created, or simply edit it manually, type this in PowerShell:

        Notepad $PROFILE

## 镜像
* 网易
[网易蜂巢镜像中心](https://c.163.com/hub#/m/home/)

* 官方
可以使用官方可视化工具 [Kitematic](https://github.com/docker/kitematic/releases)
    
## 启动容器
### 指定端口
-p
ip:hostPort:containerPort

使用`> docker port`查看端口配置

## Docker 安装SSH