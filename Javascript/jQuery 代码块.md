# jQuery 代码块

## 1. 禁止右键点击
``` js
$(document).ready(function(){
    $(document).bind("contextmenu",function(e){
        return false;
    });
});
```

## 2. 获得鼠标指针XY值
``` js
$(document).ready(function() {
    $().mousemove(function(e){
        //display the x and y axis values inside the div with the id XY
        $('#XY').html("X Axis : " + e.pageX + " | Y Axis " + e.pageY);
    });
});

// how to use
<div id="XY"></div>
```

## 3. 返回顶部按钮
``` js
// Back to top
$('a.top').click(function () {
    $(document.body).animate({scrollTop: 0}, 800);
    return false;
});
<!-- Create an anchor tag -->
<a href="#">Back to top</a>
```

## 4. 使元素居屏幕中间位置
``` js
$(document).ready(function() {
    jQuery.fn.center = function () {
        this.css("position","absolute");
        this.css("top", ( $(window).height() - this.height() ) / 2+$(window).scrollTop() + "px");
        this.css("left", ( $(window).width() - this.width() ) / 2+$(window).scrollLeft() + "px");
        return this;
    }
    $("#id").center();
});
```
## 5. append()和appendTo()