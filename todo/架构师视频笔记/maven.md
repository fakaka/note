# Maven



## 记录
- pom.xml的overlay标签  
- `<localRepository>F:\doc\maven\repository</localRepository>`
- 依赖级别相同时，依赖先声明的包。也可以用`<exclusions>`排除包,已确定使用那一个
- 


## Maven私服 nexus 的搭建
1. [下载地址](https://www.sonatype.com/download-oss-sonatype)

2. `\bin\jsw` 下的文件夹
3. install-nexus.bat安装为windows服务（也可以直接console启动，方便测试），访问http://localhost:8081/nexus/ 
4. 登录 默认的用户名是 admin 密码是 admin123

## maven的生命周期
Maven有三套相互独立的生命周期，分别是clean、default和site。每个生命周期包含一些阶段（phase），阶段是有顺序的，后面的阶段依赖于前面的阶段。

### 1、clean生命周期：清理项目，包含三个phase。

1. pre-clean：执行清理前需要完成的工作
2. clean：清理上一次构建生成的文件
3. post-clean：执行清理后需要完成的工作

### 2、default生命周期：构建项目，重要的phase如下。

1. validate：验证工程是否正确，所有需要的资源是否可用。 
2. compile：编译项目的源代码。    
3. test：使用合适的单元测试框架来测试已编译的源代码。这些测试不需要已打包和布署。  
4. Package：把已编译的代码打包成可发布的格式，比如jar。  
5. integration-test：如有需要，将包处理和发布到一个能够进行集成测试的环境。  
6. verify：运行所有检查，验证包是否有效且达到质量标准。  
7. install：把包安装到maven本地仓库，可以被其他工程作为依赖来使用。  
8. Deploy：在集成或者发布环境下执行，将最终版本的包拷贝到远程的repository，使得其他的开发者或者工程可以共享。

### 3、site生命周期：建立和发布项目站点，phase如下

1. pre-site：生成项目站点之前需要完成的工作
2. site：生成项目站点文档
3. post-site：生成项目站点之后需要完成的工作
4. site-deploy：将项目站点发布到服务器

### **2、default生命周期：构建项目，另一个版本**
validate  
initialize  
generate-sources  
process-sources  
generate-resources  
process-resources    ：复制和处理资源文件到target目录，准备打包；  
compile    ：编译项目的源代码；  
process-classes  
generate-test-sources  
process-test-sources  
generate-test-resources    
process-test-resources
test-compile    ：编译测试源代码；  
process-test-classes  
test    ：运行测试代码；  
prepare-package  
package    ：打包成jar或者war或者其他格式的分发包；  
pre-integration-test  
integration-test  
post-integration-test  
verify  
install    ：将打好的包安装到本地仓库，供其他项目使用；  
deploy    ：将打好的包安装到远程仓库，供其他项目使用；  


## Maven的插件

官方的 [文档地址](http://maven.apache.org/plugins/index.html)

指定build时JDK的版本
``` xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>2.3.2</version>
    <configuration>
        <source>1.8</source>
        <target>1.8</target>
        <encoding>UTF-8</encoding>
    </configuration>
</plugin>
```






























