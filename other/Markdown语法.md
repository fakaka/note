# Markdown 语法

- [Markdown 语法](#markdown-%E8%AF%AD%E6%B3%95)
    - [标题](#%E6%A0%87%E9%A2%98)
- [This is an H1](#this-is-an-h1)
    - [This is an H2](#this-is-an-h2)
- [H1](#h1)
    - [H2](#h2)
                    - [H6](#h6)
    - [区块引用 Blockquotes](#%E5%8C%BA%E5%9D%97%E5%BC%95%E7%94%A8-blockquotes)
    - [> ## 这是一个标题。](#%E8%BF%99%E6%98%AF%E4%B8%80%E4%B8%AA%E6%A0%87%E9%A2%98%E3%80%82)
    - [列表](#%E5%88%97%E8%A1%A8)
    - [代码区块](#%E4%BB%A3%E7%A0%81%E5%8C%BA%E5%9D%97)
    - [分隔线](#%E5%88%86%E9%9A%94%E7%BA%BF)
    - [链接](#%E9%93%BE%E6%8E%A5)
    - [行内式](#%E8%A1%8C%E5%86%85%E5%BC%8F)
    - [参考式](#%E5%8F%82%E8%80%83%E5%BC%8F)
    - [强调](#%E5%BC%BA%E8%B0%83)
    - [代码](#%E4%BB%A3%E7%A0%81)
    - [图片](#%E5%9B%BE%E7%89%87)
        - [行内式](#%E8%A1%8C%E5%86%85%E5%BC%8F)
        - [参考式](#%E5%8F%82%E8%80%83%E5%BC%8F)
    - [自动链接](#%E8%87%AA%E5%8A%A8%E9%93%BE%E6%8E%A5)
    - [表格](#%E8%A1%A8%E6%A0%BC)
    - [to-do](#to-do)
    - [高效绘制 流程图、序列图、甘特图](#%E9%AB%98%E6%95%88%E7%BB%98%E5%88%B6-%E6%B5%81%E7%A8%8B%E5%9B%BE%E3%80%81%E5%BA%8F%E5%88%97%E5%9B%BE%E3%80%81%E7%94%98%E7%89%B9%E5%9B%BE)



## 标题

This is an H1
=============

This is an H2
-------------

# H1
## H2
.
.
.
###### H6

可以选择性地「闭合」#
\\# h1 \\#

## 区块引用 Blockquotes

Markdown 标记区块引用是使用类似 email 中用 > 的引用方式
> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet,
> consectetuer adipiscing elit. Aliquam hendrerit mi posuere lectus.
> Vestibulum enim wisi, viverra nec, fringilla in, laoreet vitae, risus.
> 
> Donec sit amet nisl. Aliquam semper ipsum sit amet velit. Suspendisse
> id sem consectetuer libero luctus adipiscing.

区块引用可以嵌套
> This is the first level of quoting.
>
> > This is nested blockquote.
>
> Back to the first level.

引用的区块内也可以使用其他的 Markdown 语法，包括标题、列表、代码区块等
> ## 这是一个标题。
> 
> 1.   这是第一行列表项。
> 2.   这是第二行列表项。
> 
> 给出一些例子代码：
> 
>     return shell_exec("echo $input | $markdown_script");

## 列表

无序列表
* Red
* Green
* Blue

- Red
- Green
- Blue

有序列表
1. 吃
2. 喝
3. 玩
4. 乐

如果要在列表项目内放进引用，那 > 就需要缩进：

## 代码区块

只要简单地缩进 4 个空格或是 1 个制表符就可以

这是一个普通段落：

    这是一个代码区块。

& 、 < 和 >

    <div class="footer">
        &copy; 2004 Foo Corporation
    </div>


## 分隔线

你可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。
你也可以在星号或是减号中间插入空格。下面每种写法都可以建立分隔线：

* * *  
***  
*****
- - -
-----

## 链接

Markdown 支持两种形式的链接语法

## 行内式

链接文字都是用 [方括号] 来标记。

方块括号后面紧接着圆括号插入网址链接即可，如果你还想要加上链接的 title 文字，只要在网址后面，用双引号把 title 文字包起来

This is [an example](http://example.com/ "This is a title") inline link.

## 参考式

This is [baidu] [BaiduLink] .

在文件的任意处，你可以把这个标记的链接内容定义出来：
链接内容定义的形式为：
方括号（前面可以选择性地加上至多三个空格来缩进），里面输入链接文字
接着一个冒号
接着一个以上的空格或制表符
接着链接的网址
接着 title 内容，可以用单引号、双引号或是括弧包着

[BaiduLink]: http://www.baidu.com/  "baidu"

I get 10 times more traffic from [Google] [1] than from [Yahoo] [2] or [MSN] [3].

[1]: http://google.com/        "Google"
[2]: http://search.yahoo.com/  "Yahoo Search"
[3]: http://search.msn.com/    "MSN Search"

## 强调

*single asterisks*
_single underscores_
**double asterisks**
__double underscores__

如果你的 * 和 _ 两边都有空白的话，它们就只会被当成普通的符号。

## 代码

如果要标记一小段行内代码，你可以用反引号把它包起来（\\`），例如：
Use the `func()` function.

\\`\\`\\`


支持的语言
1c, abnf, accesslog, actionscript, ada, apache, applescript, arduino, armasm, asciidoc, aspectj, autohotkey, autoit, avrasm, awk, axapta, bash, basic, bnf, brainfuck, cal, capnproto, ceylon, clean, clojure, clojure-repl, cmake, coffeescript, coq, cos, cpp, crmsh, crystal, cs, csp, css, d, dart, delphi, diff, django, dns, dockerfile, dos, dsconfig, dts, dust, ebnf, elixir, elm, erb, erlang, erlang-repl, excel, fix, flix, fortran, fsharp, gams, gauss, gcode, gherkin, glsl, go, golo, gradle, groovy, haml, handlebars, haskell, haxe, hsp, htmlbars, http, hy, inform7, ini, irpf90, java, javascript, json, julia, kotlin, lasso, ldif, leaf, less, lisp, livecodeserver, livescript, llvm, lsl, lua, makefile, markdown, mathematica, matlab, maxima, mel, mercury, mipsasm, mizar, mojolicious, monkey, moonscript, n1ql, nginx, nimrod, nix, nsis, objectivec, ocaml, openscad, oxygene, parser3, perl, pf, php, pony, powershell, processing, profile, prolog, protobuf, puppet, purebasic, python, q, qml, r, rib, roboconf, rsl, ruby, ruleslanguage, rust, scala, scheme, scilab, scss, smali, smalltalk, sml, sqf, sql, stan, stata, step21, stylus, subunit, swift, taggerscript, tap, tcl, tex, thrift, tp, twig, typescript, vala, vbnet, vbscript, vbscript-html, verilog, vhdl, vim, x86asm, xl, xml, xquery, yaml, zephir

## 图片

### 行内式

![Alt text](/path/to/img.jpg)
![Alt text](/path/to/img.jpg "Optional title")
![Alt text](http://p2jbdn3yz.bkt.clouddn.com/girl%20%2820%29.jpg "Optional title")

`![Alt text](../aaa.jpg "Optional title")`

### 参考式

![Alt text][id]
「id」是图片参考的名称，图片参考的定义方式则和连结参考一样：

[id]: url/to/image  "Optional title attribute"

## 自动链接

Markdown 支持以比较简短的自动链接形式来处理网址和电子邮件信箱，只要是用方括号包起来， Markdown 就会自动把它转成链接。一般网址的链接文字就和链接地址一样，例如：

<http://example.com/>
Markdown 会转为：
<a href="http://example.com/">http://example.com/</a>


## 表格

\\| Tables        | Are           | Cool  |
\\| ------------- |:-------------:| -----:|
\\| col 3 is      | right-aligned | $1600 |
\\| col 2 is      | centered      |   $12 |
\\| zebra stripes | are neat      |    $1 |
这种语法生成的表格如下：

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

## to-do
- [x] 吃饭
- [x] 吃饭
    - [x] 吃饭
- [ ] 吃饭

## 高效绘制 流程图、序列图、甘特图
???
