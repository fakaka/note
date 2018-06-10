  # HTML5 实现手机拍照上传调用摄像头
  ---
  
    
  
  页面样式：
  上传图片有原生的方法
    
      <input type="file" accept="image/*">                                               
  如果只想要拍照上传，不希望用户选择图片上传，可以通过添加capture属性，该属性值有camcorder/microphone/camera...，此处选择camera。PS：该属性存在浏览器兼容性问题，不是所有的浏览器都支持。
  
      <input type="file" accept="image/*" capture="camera" >
  因为原生file样式不满足要求，需要进行相应的处理，此时使用定位，在input上面放置我们想要的页面效果。然后当点击上面的元素，就可以触发我们的input进行图片上传。此时的问题是：当点击input上面的元素，需要事件穿透，即相当于点击input。则借助于css3新属性pointer-events。
  //使用cursor进行事件穿透，来阻止元素成为鼠标事件的目标
  
      button {
           cursor:pointer;
           pointer-events:none;
      }
  ----此时图片上传的样式已经处理好了----
  
  代码片段：
  ``` html
  <div class = "wrapper">
       <input type = "file" accept= "image/*" capture= "camera" id= "img" />
       <button >上传照片 </button >
  </div >
  ```
  图片压缩处理：
  因为要做的是手机拍照上传，现在的手机拍照片都很大，比如小米4S，大小在3M以上，如果原图上传，太消耗用户流量，于是要解决图片压缩的问题。
    通过change事件，监听图片上传，通过readerAsDataURL获取上传的图片。
  ``` js
  document.getElementById( 'img').addEventListener( 'change', function () {
       var reader = new FileReader();
       reader.onload = function (e) {
            //调用图片压缩方法：compress();
       };
       reader.readAsDataURL(this.files[0]);
       console.log(this.files[0]);
       var fileSize = Math.round( this.files[0].size/1024/1024) ; //以M为单位
       //this.files[0] 该信息包含：图片的大小，以byte计算 获取size的方法如下：this.files[0].size;
  }, false)
  ```
    对上传的图片进行压缩，需要借助于canvas API，调用其中的canvas.toDataURL(type, encoderOptions); 将图片按照一定的压缩比进行压缩，得到base64编码。重点来了：压缩策略：先设置图片的最大宽度 or 最大高度，一般设置其中一个就可以了，因为所有的手机宽高比差别不是很大。然后设置图片的最大size，allowMaxSize，根据图片的实际大小和最大允许大小，设置相应的压缩比率。
  
  //最终实现思路：
  1、设置压缩后的最大宽度 or 高度；
  2、设置压缩比例，根据图片的不同size大小，设置不同的压缩比。
  ``` js
  function compress(res,fileSize) { //res代表上传的图片，fileSize大小图片的大小
      var img = new Image(),
          maxW = 640; //设置最大宽度
  
      img.onload = function () {
          var cvs = document.createElement( 'canvas'),
              ctx = cvs.getContext( '2d');
  
          if(img.width > maxW) {
              img.height *= maxW / img.width;
              img.width = maxW;
          }
  
          cvs.width = img.width;
          cvs.height = img.height;
  
          ctx.clearRect(0, 0, cvs.width, cvs.height);
          ctx.drawImage(img, 0, 0, img.width, img.height);
  
          var compressRate = getCompressRate(1,fileSize);
  
          var dataUrl = cvs.toDataURL( 'image/jpeg', compressRate);
  
          document.body.appendChild(cvs);
          console.log(dataUrl);
      }
  
      img.src = res;
  }
  
  function getCompressRate(allowMaxSize,fileSize){ //计算压缩比率，size单位为MB
        var compressRate = 1;
  
        if(fileSize/allowMaxSize > 4){
             compressRate = 0.5;
        } else if(fileSize/allowMaxSize >3){
             compressRate = 0.6;
        } else if(fileSize/allowMaxSize >2){
             compressRate = 0.7;
        } else if(fileSize > allowMaxSize){
             compressRate = 0.8;
        } else{
             compressRate = 0.9;
        }
  
        return compressRate;
  }
  ```
  图片上传给服务器：
  图片已经压缩完成了，但是压缩后的图片不是File，而是一个base64编码，于是乎两个选择：1、以String的形式将base64编码上传给服务器，服务器转存base64为img图片；2、前端将base64转为File图片类型，上传给服务器。
  方法一：压缩之后直接上传base64给后台，实现简单。
  方法二：前端自己转存base64位File图片，这个对于前端 压力比较大。
  原因：html5 canvas属于客户端API，没有权限去保存图片到硬盘，只有canvas.toDataURL()这一接口可导出画布的base64编码，以提供给服务器进行处理保存。所以如果要将base64编码转成图片需要借助于nodeJs。因为nodeJS有相关文件处理的API。
  
  ``` js
  //使用nodeJS将base64转化成图片
  var express = require('express');
  var fs = require("fs");
  var app = module.exports = express();
  
  function dataToImage(dataUrl){
      var base64Data = dataUrl.replace(/^data:image\\/\\w+;base64,/,'');
      var dataBuffer = new Buffer(base64Data,'base64');
  
      fs.writeFile('out.jpg',dataBuffer,function(err){
          if(err){
              console.log(err);
          }else{
              console.log('Success...');
          }
      });
  }
  
  dataToImage('data:image/jpeg;base64,/9...'); //图片完整base64过长，所以省略...
  
  if(!module.parent){
      app.listen(8000);
      console.log('Express started on port 8000');
  }
  ```
  Summary：如果使用nodeJS，需要单独部署nodeJS代码到服务器，整个逻辑会比较麻烦。综合比较两种方法，推荐使用第一种方法，直接传base64给服务器，后台处理相应的转化。
  
