# activemq

## 记录
P2P 和 pub/sub

## activemq
消息确认
acknowledge_mode
- Session.AUTO_ACKNOWLEDGE  
自动确认消息
- Session.CLIENT_ACKNOWLEDGE  
客户端确认才行  
`session.commit()` 会话级别的提交，把以前的消息也会提交  
`message.acknowledge()` 单个消息的提交
- Session.DUPS_OK_ACKNOWLEDGE 延迟

## JMS
- 消息的持久性
- 消息的优先级
- 消息的过期


## Zookeeper + ActiveMQ 搭建集群

### Zookeeper集群的搭建
1. 下载解压Zookeeper `tar -zxvf zookeeper-{version}.tar.gz -C /usr/local/`
2. 最好去掉版本号，方便操作`mv zookeeper-{version} zookeeper`
3. 配置环境变量 `vim /etc/profile` ,使配置立即生效`source /etc/profile`
```
    JAVA_HOME=
    ZOOKEEPER_HOME=/usr/local/
    export PATH=.:$JAVA_HOME/bin:$ZOOKEEPER_HOME/bin
```
4. 把conf下的zoo_sample.cfg 改为 zoo.cfg 并打开
5. 修改配置，3个机器都需要

``` 
# 修改data路径 没有需要新建
dataDir=/usr/local/zookeeper/data

# 修改服务器配置
# server的.后面是服务的id
server.0=192.168.1.121:2888:3888
server.1=192.168.1.122:2888:3888
server.2=192.168.1.123:2888:3888

```
6. 新建data文件夹，创建myid文件写入前面的id
7. 启动`zkServer.sh start`

8. 可以使用`zkServer.sh status`查看状态，会有一个leader节点        
 
### ActiveMQ
使用端口区别

1. 修改控制台端口  
    jetty的配置 `jetty.xml`里的 port 为8161 8162 8163
    ``` xml
    <property name="host" value="#{systemProperties['jetty.host']}" />
    <property name="port" value="#{systemProperties['jetty.port']}" />
    ```

2. 集群配置文件的修改 `conf/activemq.xml`
    - 修改broker的名称 `<broker xmlns="http://activemq.apache.org/schema/core" brokerName="localhost" dataDirectory="${activemq.data}">`

3. 修改数据库
    - 现注释旧的数据库 `conf/activemq.xml`
        ``` xml
        <persistenceAdapter>
            <!-- <kahaDB directory="${activemq.data}/kahadb"/> -->
        </persistenceAdapter>
        ```
    - 添加新的数据库 leveldb（缺少配置）

4. 修改通信端口 `conf/activemq.xml`
    ```
    <transportConnectors>
        <!-- <transportConnector name="openwire" uri="tcp://0.0.0.0:61616?maximumConnections=1000&amp;wireFormat.maxFrameSize=104857600"/> -->
        <transportConnector name="openwire" uri="tcp://0.0.0.0:51515?maximumConnections=1000&amp;wireFormat.maxFrameSize=104857600"/>
    </transportConnectors>
    ```

### 启动测试
1. 打开zk `zkSever.sh start`
2. 启动mq集群
    ``` 
    activemq-cluster/node1/bin/activemq start
    activemq-cluster/node2/bin/activemq start
    activemq-cluster/node3/bin/activemq start
    ```
3. 查看日志
    ``` 
    activemq-cluster/node1/data/activemq.log
    activemq-cluster/node2/data/activemq.log
    activemq-cluster/node3/data/activemq.log
    ```
4. 集群的brokerUrl的修改  
    - 程序代码的修改
        ``` java
        // 失败转移
        brokerUrl = "failover:(tcp://1923168.121.51511,tcp://1923168.121.51512,tcp://1923168.121.51513)";
        ```

##









