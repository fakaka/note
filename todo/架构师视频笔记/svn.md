# SVN

## svn的权限
在`conf/passwd`下创建用户

    tom=123456

在`conf/auth`里设置用户组

```
#设置组
dev = tom

[/]
# 开发有读写权限
@dev = rw
# 测试只读
test = r
# 其他不能
* = 
```


























