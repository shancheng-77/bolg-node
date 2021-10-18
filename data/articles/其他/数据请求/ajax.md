###   一.Ajax基础

##### 	1.创建Ajax对象	

```javascript
var xhr = new XMLHttpRequest();
```

##### 	2.告诉Ajax请求地址以及请求方式

```javascript
xhr.open('get',"http://.....");
```

##### 	3.发送请求

```javascript
xhr.send();
```

##### 	4.获取服务器端给与客户端的响应数据

```javascript
xhr.onload = function() {
	console.log(xhr.responseText)
}
```

##### 	5.json字符串与json对象相互转换

```javascript
//json字符串转换成json对象
var resposeText = JSON.parse(xhr.responseText);
//json对象转为json字符串
var jsonText= JSON.stringify({name:'zhangsan'})
```

##### 6.post请求参数的格式

- application/x-www-from-urlencoded

  ```
  name=zhangsan&age=20&sex=男
  ```

  ```javascript
  //在html种
  //固定写法
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  //在路由种
  var bodyParse = require('body-parser');
  app.use(bodyParse.urlencoded({extended:true}));
  ```

- application/json

  ```
  name:'zhangsan',age:'20',sex:'男'
  ```

  ```javascript
  //在html种
  //固定写法
  xhr.setRequestHeader('Content-Type','application/json');
  //在路由种
  var bodyParse = require('body-parser');
  app.use(bodyParse.json());
  ```

##### 7.获取服务器端的响应（了解）

- ###### 	Ajax状态码

  ​	在创建ajax对象，配置ajax对象，发送请求，以及接受完服务器端响应数据，这个过程中的每一个步骤都会对应一个数值，这个数值就是ajax状态码

  - 0：请求初始化（还没有调用open）\
  - 1：请求已经建立，但是还没有发送（还没有调用send）
  - 2：请求已经发送
  - 3：请求正在处理种，通常响应中已经有部分数据可以使用了
  - 4：响应已经完成，可以使用并使用服务器的相应了

  ```javascript
  //获取ajax状态码
  xhr.readyState
  ```

-  onreadystatechange 事件

  用来监听ajax状态码的改变

```
//示例
xhr.onreadystatechange = function() {
	//输出当前的状态码
	console.log(xhr.readyState);
	//对ajax状态码进行判断，如果状态码的值是4，就代表已经接受完数据
	if ( xhr.readyState == 4) {
		console.log(xhr.responseText);
	}
}
```

- ###### 两种获取服务器端响应方式的区别

  | 区别描述               | onload事件 | onreadystatechange事件 |
  | ---------------------- | ---------- | ---------------------- |
  | 是否兼容IE低版本       | 不兼容     | 兼容                   |
  | 是否需要判断Ajax状态码 | 不需要     | 需要                   |
  | 被调用次数             | 一次       | 多次                   |

##### 8.Ajax错误处理

- 网络畅通，服务器端能收到请求，服务器端返回的结果不是预期结果。
  - 可以判断服务器返回的状态码，分别进行处理，使用xhr。status获取http状态码
- 网络畅通，服务器端没有接受到请求，返回404状态码
  - 检查请求地址是否错误
- 网络畅通，服务器端能接受到请求，服务器端返回500状态码
  - 服务器端错误，找后端程序员进行沟通
- 网络中断，请求无法发送到服务器端
  - 会触发xhr对象下面的onerror事件，在onerror事件处理函数中对错误进行处理。

##### 9.低版本IE浏览器的缓存问题

- 问题：在低版本的IE浏览器中，Ajax有严重的缓存问题，即在请求地址不发生变化的情况下，只有第一次请求会真正发送到服务器端，后续的请求都会从浏览器的缓存中获取结果，即使服务器的数据更新了，客户端依旧拿到的是缓存中的旧数据
- 解决方案：在请求地址的后面添加参数，保证每一次请求的请求参数的值不相同

```
xhr.open('get','http://www.example.com?t='+Math.random());
```

### 二.模板引擎

##### 1.使用步骤

- 下载art-template模板引擎库文件并在html页面中因入库文件

  ```javascript
  <script src='./js/template-web.js'><script>
  ```

- 准备art-template模板

  ```javascript
  <script id="tpl" type="text/html">
  	<div class="box"><div>
  <script>
  ```

- 告诉模板引擎将和哪一个模板和那个数据进行拼接

  ```javascript
  var html = template{'tpl',{username:'zhangsan',age:'20'}};
  ```

- 将拼接好的html字符串添加到页面中

  ```javascript
  document.getTltmentById('container').inerHTML = html
  ```

- 通过模板语法告诉模板引擎，数据和html字符串如何拼接

  ```
  <script id="tpl" type="text/html">
  	<div class="box">{{username},{age}}<div>
  <script>
  ```


### 三.FormData概述

##### 1.FormData对象的作用

- 模拟html表单，相当于将html表单映射成表单对象，自动将表单对象中的数据拼接成请求参数的格式
- 异步上传二进制文件

##### 2.FromData对象的使用

- 准备form表单

  ```javascript
  <form id="form">
      <input type="text" name="username">
      <input type="password" name="password">
      <input type="button" id="btn" value="提交">
  </form>
  ```

- 将html表单转化为formData对象

  ```
  var form = document.getElementById('from');
  var formData = new FormData(from); 
  ```

- 提交表单对象

  ```
  xht.send(fromData);
  ```

- 注意事项
  - Formdata 对象不能用于 get 请求，因为对象需要被传递到 send 方法中，而 get 请求方式的请求参数只能放在请求地址的后面。
  - 服务器端 bodyParser 模块不能解析 formData 对象表单数据，我们需要使用 formidable 模块进行解析。

##### 3.FromData对象的实例方法

- 获取表单对象中属性的值

  ```javascript
  formData.get('key');
  ```

- 设置表单对象中属性的值

  ```javascript
  formData.set('key',value)
  ```

- 删除表单对象中属性的值

  ```javascript
  formData,delete('key');
  ```

- 向表单对象中追加属性值

  ```javascript
  fromData.append('key','value');
  //set 方法与 append 方法的区别是，在属性名已存在的情况下，set 会覆盖已有键名的值，append会保留两个值。
  ```


##### 4.FromData二进制上传文件

```javascript
<input type='file' id='file'/>
    //展示文件上传进度框
    <div>
    	<div id='bar'>
    	</div>
    </div>
```

- 客户端

  ```javascript
  var file = document.getElementById('file')
  //当用户选择文件时
  file.onchange = function() {
      //创建空表单对象
      var fromData = new FromData();
      //将用户选择的数据追加到表单对象中
      fromData.append('atteName',this.files[0]);
      //配置ajax对象，请求方式必须为post
      xhr.open('post','www.example.com');
      xhr.send(fromData);
      //上传进度展示
      //在文件上传过程中会持续触发onprogress事件
      xhr.upload.onprogress = function(ev) {
          //当前文件上传过大小/文件总大小 再将结果转换为百分数
          //将结果复制给进度条的宽度属性
          bar.style.width = (ev.loaded/ev.total)*100+'%';
      }
  }
  ```

- 服务器端

  ```javascript
  var express = require('express');
  var router = express.Router();
  var path = require('path')
  var formidable = require('formidable')
  const fs = require('fs')
  router.post('/',function (req,res) {
      //解析formData对象
      const from = new formidable.IncomingForm();
      //设置路径
      const  file = 'E:\\webstrom\\ajax\\public\\upload'
      from.uploadDir =file;
      //保持后缀名
      from.keepExtensions = true;
      //文件上传函数
      //fields中存储除文件外的参数信息
      //files中存储与文件相关的信息
      /*
      	size : 文件大小
      	path : 文件存储路径
      	name : 上传的文件名称
      	type : 文件类型
      	mtime: 文件上传时间
      */
      from.parse(req,(err,fields,files) => {
          // 修改路径名称
   		 fs.rename(files.attrName.path,file+'\\'+files.attrName.name,function () {
              files.attrName.path = file+'\\'+files.attrName.name;
              //发送上传图片的路径
              res.send(files.attrName.path)
          })
  
      })
  })
  console.log('服务器运行成功')
  module.exports = router;
  ```

##### 5 文件上传文件实时预览

- ```javascript
   xhr.onload = function () {
       var result = JSON.parse(xhr.responseText);
       var img = document.createElement('img');
       img.src = result.src;
       img.onload = function () {
           document.body.appendChild(this);
       }
   }
    
  ```

### 四 .同源政策

##### 1.Ajax请求限制

​	Ajax 只能向自己的服务器发送请求。比如现在有一个A网站、有一个B网站，A网站中的 HTML 文件只能向A网站服务器中发送 Ajax 请求，B网站中的 HTML 文件只能向 B 网站中发送 Ajax 请求，但是 A 网站是不能向 B 网站发送 Ajax请求的，同理，B 网站也不能向 A 网站发送 Ajax请求。

##### 2.什么是同源

​	如果两个页面拥有相同的协议、域名和端口，那么这两个页面就属于同一个源，其中只要有一个不相同，就是不同源。http://www.example.com/dir/page.html

​	如：

​			http://www.example.com/dir2/other.html：同源
​			http://example.com/dir/other.html：不同源（域名不同）
​			http://v2.www.example.com/dir/other.html：不同源（域名不同）
​			http://www.example.com:81/dir/other.html：不同源（端口不同）
​			https://www.example.com/dir/page.html：不同源（协议不同）

##### 3.同源政策的目的

- 同源政策是为了保证用户信息的安全，防止恶意的网站窃取数据。最初的同源政策是指 A 网站在客户端设置的 Cookie，B网站是不能访问的。
- 同源政策是为了保证用户信息的安全，防止恶意的网站窃取数据。最初的同源政策是指 A 网站在客户端设置的 Cookie，B网站是不能访问的。

##### 4.使用JSONP解决同源限制问题

​	jsonp 是 json with padding 的缩写，它不属于 Ajax 请求，但它可以模拟 Ajax 请求

- 将不同源的服务器请求地址写在script标签的src属性中

  ```javascript
  <script src="www.example.com"></script>
  ```

- 服务器端相应数据必须是一个函数的调用，真正要发送给客户端的数据需要作为函数调用的参数

  ```javascript
   const data = 'fn({name: "张三", age: "20"})';
   res.send(data);
  ```

- 在客户端全局作用域下定义函数fn

  ```javascript
  function fn (data) {
  	////
  }
  ```

- 在fn函数内部对服务器端返回的数据进行处理

  ```javascript
  function fn (data) {
  	console.log(data)
  }
  ```


##### 5.CORS跨域资源共享

​	CORS：全称为 Cross-origin resource sharing，即跨域资源共享，它允许浏览器向跨域服务器发送 Ajax 请求，克服了 Ajax 只能同源使用的限制。

- 服务器端：

  ```javascript
   app.use((req, res, next) => {
       //设置那个网站可以访问
       res.header('Access-Control-Allow-Origin', '*');
       //设置访问方式
       res.header('Access-Control-Allow-Methods', 'GET, POST');
       next();
   })
  
  ```

##### 6.服务器端解决方案

​	同源政策是浏览器给予Ajax技术的限制，服务器端是不存在同源政策限制。

- withCredentiads属性
  - 在使用Ajax技术发送跨域请求时，默认情况下不会在请求中携带cookie信息。
  - withCredentials：指定在涉及到跨域请求时，是否携带cookie信息，默认值为false
  - Access-Control-Allow-Credentials：true 允许客户端发送请求时携带cookie

### 五.Jquery中的Ajax

- ##### $.ajax()方法概述

  ```javascript
   $.ajax({
       type: 'get',
       url: 'http://www.example.com',
       data: { name: 'zhangsan', age: '20' },
       contentType: 'application/x-www-form-urlencoded',
       beforeSend: function () { 
           return false
       },
       success: function (response) {},
       error: function (xhr) {}
  });
  
  ```

- ##### 发送jsonp请求

  ```javascript
  $.ajax({
      url: 'http://www.example.com',
      // 指定当前发送jsonp请求
      dataType: 'jsonp',
      // 修改callback参数名称
      jsonp: 'cb',
      // 指定函数名称
      jsonCallback: 'fnName',
      success: function (response) {} 
  })
  //serialize方法
  //自动将表单的数据拼接成字符串类型的参数
  var params = $('#form').serialize();
  // name=zhangsan&age=30
  
  ```

- ##### $.get()、$.post()方法概述

  ```javascript
  //发送get请求
  $.get('http://www.example.com', {name: 'zhangsan', age: 30}, function (response) {}) 
  //发送post请求
  $.post('http://www.example.com', {name: 'lisi', age: 22}, function (response) {})
  
  ```

  

- 11:21 [对方](javascript:void(0);): UI = f(data)
- 17:12:09 [对方](javascript:void(0);): vue data function or object
- 17:13:31 [对方](javascript:void(0);): slot
- 17:17:21 [对方](javascript:void(0);): baseUrl
- 17:17:41 [对方](javascript:void(0);): vue.config.js
- 17:29:16 [对方](javascript:void(0);): document.querySelector()
- 17:30:10 [对方](javascript:void(0);): caniuse.com
- 17:39:52 [对方](javascript:void(0);): 平衡二叉树
- 17:40:13 [对方](javascript:void(0);): 二叉搜索树 (Binary search tree)