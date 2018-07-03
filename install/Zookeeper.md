# Zookeeper

## 单节点部署
1. 用 root 用户登录到Zookeeper集群，下载 zookeeper 包至 `$HOME` 目录下并解压：

2. 修改 `~/zookeeper-3.4.5/conf/zoo.cfg` 配置文件
``` conf
tickTime=2000
# The number of ticks that the initial
# synchronization phase can take
initLimit=10
# The number of ticks that can pass between
# sending a request and getting an acknowledgement
syncLimit=5
# the directory where the snapshot is stored.
# do not use /tmp for storage, /tmp here is just
# example sakes.
dataDir=/home/zookeeper-3.4.5/data
dataLogDir=/home/zookeeper-3.4.5/logs
# the port at which the clients will connect
clientPort=2181
```

3. 启动zookeeper  
``` sh
cd ~/zookeeper-3.4.5/bin  
./zkServer.sh start
```
4. 测试启动成功。  
执行下面命令测试下zookeeper有没安装成功,安装成功则弹出如下图界面，假设安装在192.168.11.189，如下：
``` sh
cd  ~/zookeeper-3.4.5/bin
./zkCli.sh -server 192.168.11.189:2181
```

## 多节点部署
多节点部署与单节点部署差异主要在于3点，假设3台PC服务器的 Zookeeper 集群环境的IP地址为：192.168.11.190、192.168.11.191、192.168.11.192，以及存放数据的数据目录为红色的路径，`dataDir=/home/zookeeper/zookeeper-3.4.5/data`，具体配置如下：
1. zoo.cfg 配置，需要增加 server 信息：
```
server.1=192.168.11.190:2888:3888
server.2=192.168.11.191:2888:3888
server.3=192.168.11.192:2888:3888
```

2. 在集群每台数据目录 /home/zookeeper/zookeeper-3.4.5/data 下，增加 myid 文件，添加内容具体如下：
192.168.11.190 主机 myid 文件内容为1
192.168.11.191 主机 myid 文件内容为2
192.168.11.192 主机 myid 文件内容为3

3. 在集群每台主机中均需运行zkServer.sh start命令启动服务
