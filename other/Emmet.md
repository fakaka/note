
  # Emmet
  ---
  
  ## HTML
  `html:5` 或者 `doc`
  
  ``` html
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <title>Document</title>
  </head>
  <body>
      
  </body>
  </html>
  ```
  
  a
  
      <a href=""></a>
  
  a:link
  
      <a href="http://"></a>
  
  
  link:css
  
  <link rel="stylesheet" href="style.css" />
  
  link:favicon
  
      <link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />
      
  meta:utf
  
      <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
      
  meta:vp
  
      <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />
      
  form:get
  
      <form action="" method="get"></form>
      
  form:post
  
      <form action="" method="post"></form>
  inp
  
      <input type="text" name="" id="" />
  
  类似
  input:$type
  
      <input type="$type" name="" id="" />
  
  ri:art, ri:a
  ``` html
  <picture>
      <source media="(min-width: )" srcset="" />
      <img src="" alt="" />
  </picture>
  ```
  ri:type, ri:t
  ``` html
  <picture>
      <source srcset="" type="image/" />
      <img src="" alt="" />
  </picture>
  ```
  
  pic+
  ``` html
  <picture>
      <source srcset="" />
      <img src="" alt="" />
  </picture>
  ```
  
  cc:ie6
  ```
  <!--[if lte IE 6]>
      ${child}
  <![endif]-->
  ```
  cc:ie
  ```
  <!--[if IE]>
      ${child}
  <![endif]-->
  ```
  cc:noie
  ```
  <!--[if !IE]><!-->
      ${child}
  <!--<![endif]-->
  ```
  
  ## CSS
  ### pos
      pos
      position:relative;
      pos:s
      position:static;
      pos:a
      position:absolute;
      pos:r
      position:relative;
      pos:f
      position:fixed;
  
  ### float
      fl
      float:left;
      fl:n
      float:none;
      fl:l
      float:left;
      fl:r
      float:right;
  
  ### display
      d
      display:block;
      d:n
      display:none;
      d:b
      display:block;
      d:f
      display:flex;
      d:i
      display:inline;
      d:ib
      display:inline-block;
      d:li
      display:list-item;
  
  ### visibility
      v
      visibility:hidden;
      v:v
      visibility:visible;
      v:h
      visibility:hidden;
      v:c
      visibility:collapse;
      
  ### overflow
      ov
      overflow:hidden;
      ov:v
      overflow:visible;
      ov:h
      overflow:hidden;
      ov:s
      overflow:scroll;
  
  ### margin&padding
      m
      margin:;
      m:a
      margin:auto;
      mt
      margin-top:;
      mt:a
      margin-top:auto;
      mr
      margin-right:;
      mr:a
      margin-right:auto;
      mb
      margin-bottom:;
      mb:a
      margin-bottom:auto;
      ml
      margin-left:;
      ml:a
      margin-left:auto;
      p
      padding:;
      pt
      padding-top:;
      pr
      padding-right:;
      pb
      padding-bottom:;
      pl
      padding-left:;
  
  ### font-family
      ff
      font-family:;
      ff:s
      font-family:serif;
      ff:ss
      font-family:sans-serif;
      ff:c
      font-family:cursive;
      ff:f
      font-family:fantasy;
      ff:m
      font-family:monospace;
      ff:a
      font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
      ff:t
      font-family: "Times New Roman", Times, Baskerville, Georgia, serif;
      ff:v
      font-family: Verdana, Geneva, sans-serif;
  
  ### Background
      bg
      background:#000;
      bg+
      background:#fff url() 0 0 no-repeat;
      bgc:t
      background-color:transparent;
  
  ### Color
      c
      color:#000;
      c:r
      color:rgb(0, 0, 0);
      c:ra
      color:rgba(0, 0, 0, .5);
      op
      opacity:;
  
  ### Border
      bd
      border:;
      bd+
      border:1px solid #000;
      bdi
      border-image:url();
  
  ### Lists
  list:n
  list-style-type:none;
  
  ### Others
  @kf
  ``` css
  @-webkit-keyframes identifier {
      from {  }
      to {  }
  }
  @-o-keyframes identifier {
      from {  }
      to {  }
  }
  @-moz-keyframes identifier {
      from {  }
      to {  }
  }
  @keyframes identifier {
      from {  }
      to {  }
  }
  ```
  
  ## Syntax
  Child: >
  nav>ul>li
  ``` html
  <nav>
      <ul>
          <li></li>
      </ul>
  </nav>
  ```
  
  Sibling: +
  div+p+bq
  ``` html
  <div></div>
  <p></p>
  <blockquote></blockquote>
  ```
  
  Climb-up: ^
  div+div>p>span+em^bq
  ``` html
  <div></div>
  <div>
      <p><span></span><em></em></p>
      <blockquote></blockquote>
  </div>
  ```
  
  Grouping: ()
  div>(header>ul>li*2>a)+footer>p
  ``` html
  <div>
      <header>
          <ul>
              <li><a href=""></a></li>
              <li><a href=""></a></li>
          </ul>
      </header>
      <footer>
          <p></p>
      </footer>
  </div>
  ```
  
  (div>dl>(dt+dd)*3)+footer>p
  ``` html
  <div>
      <dl>
          <dt></dt>
          <dd></dd>
          <dt></dt>
          <dd></dd>
          <dt></dt>
          <dd></dd>
      </dl>
  </div>
  <footer>
      <p></p>
  </footer>
  ```
  
  Multiplication: *
  ul>li*5
  ``` html
  <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
  </ul>
  ```
  
  Item numbering: $
  ul>li.item$*5
  ``` html
  <ul>
      <li class="item1"></li>
      <li class="item2"></li>
      <li class="item3"></li>
      <li class="item4"></li>
      <li class="item5"></li>
  </ul>
  ```
  
  h$[title=item$]{Header $}*3
  ```
  <h1 title="item1">Header 1</h1>
  <h2 title="item2">Header 2</h2>
  <h3 title="item3">Header 3</h3>
  ```
  
  ul>li.item$$$*5
  ``` html
  <ul>
      <li class="item001"></li>
      <li class="item002"></li>
      <li class="item003"></li>
      <li class="item004"></li>
      <li class="item005"></li>
  </ul>
  ```
  
  ul>li.item$@-*5
  ``` html
  <ul>
      <li class="item5"></li>
      <li class="item4"></li>
      <li class="item3"></li>
      <li class="item2"></li>
      <li class="item1"></li>
  </ul>
  ```
  
  ul>li.item$@3*5
  ``` html
  <ul>
      <li class="item3"></li>
      <li class="item4"></li>
      <li class="item5"></li>
      <li class="item6"></li>
      <li class="item7"></li>
  </ul>
  ```
  
  p[title="Hello world"]
  `<p title="Hello world"></p>`
  
  Text: {}
  a{Click me}
  `<a href="">Click me</a>`
  
  table>.row>.col
  ``` html
  <table>
      <tr class="row">
          <td class="col"></td>
      </tr>
  </table>
  ```
