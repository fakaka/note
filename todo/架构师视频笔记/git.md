# git



## git的配置文件

日志输出格式  
常用配置 

```
[user]
	name = hairpin
	email = vsmj012@163.com
```

设置别名

    git config --global alias.co checkout  
    git config --global alias.br branch  
    git config --global alias.ci commit  
    git config --global alias.st status



## 记录
### 日志
根据commit查询日志    

    $ git log commit  　　查询commit之前的记录，包含commit
    $ git log commit1 commit2 查询commit1与commit2之间的记录，包括commit1和commit2
    $ git log commit1..commit2 同上，但是不包括commit1
commit可以是提交哈希值的简写模式，也可以使用HEAD代替。HEAD代表最后一次提交，HEAD^为最后一个提交的父提交，等同于HEAD～1，HEAD～2代表倒数第二次提交  
--pretty  
按指定格式显示日志信息,可选项有：oneline,short,medium,full,fuller,email,raw以及format:`<string>`,默认为medium，可以通过修改配置文件来指定默认的
方式。

`git log --pretty=oneline`
常见的format选项：

复制代码

    选项     说明
    %H      提交对象（commit）的完整哈希字串
    %h      提交对象的简短哈希字串
    %T      树对象（tree）的完整哈希字串
    %t      树对象的简短哈希字串
    %P      父对象（parent）的完整哈希字串
    %p      父对象的简短哈希字串
    %an     作者（author）的名字
    %ae     作者的电子邮件地址
    %ad     作者修订日期（可以用 -date= 选项定制格式）
    %ar     作者修订日期，按多久以前的方式显示
    %cn     提交者(committer)的名字
    %ce     提交者的电子邮件地址
    %cd     提交日期
    %cr     提交日期，按多久以前的方式显示
    %s      提交说明


### reset
```
git reset --soft 和git reset --hard
```


















