#### 1.基本用法

- Fetch()的功能与XMLHttpRequest基本相同，但是有三个主要的差异：
  - Fetch()使用Promise，不适用回调函数，因此大大简化了写法，写起来更加简洁
  - fetch()采用模块化设计，API 分散在多个对象上（Response 对象、Request 对象、Headers 对象），更合理一些；相比之下，XMLHttpRequest 的 API 设计并不是很好，输入、输出、状态都在同一个接口管理，容易写出非常混乱的代码。
  - `fetch()`通过数据流（Stream 对象）处理数据，可以分块读取，有利于提高网站性能表现，减少内存占用，对于请求大文件或者网速慢的场景相当有用。XMLHTTPRequest 对象不支持数据流，所有的数据必须放在缓存里，不支持分块读取，必须等待全部拿到后，再一次性吐出来。



#### 2.Reponse对象：处理Http回应

##### 2.1Response对象的同步属性

- fetch()请求成功后，得到的是一个  Response对象，它对应服务器的HTTP回应

  ```javascript
  const response = await fetch(url)
  ```

- Response包含的数据通过Stream接口异步读取，但是它还包含一些同步属性，对应HTTP回应的标头信息（Headers），可以立即读取

- 标头信息有一下属性：

  - `Response.ok`:该属性返回一个布尔值，表示请求是否成功， `true`对应HTTP请求的状态码200到299. `false`对应其他状态码
  - `Response.status`:该属性返回一个数组，表示HTTP回应的状态码（例如200，表示成功）
  - `Reponse.statuseText`：该属性返回一个字符串，表示HTTP回应的状态信息（例如请求成功以后，服务器返回OK）
  - `Reponse.url`:盖属性返回请求的URL，如果URL存在跳转，该属性返回的是最终URL
  - `Reponse.type`:该属性返回请求的类型，可能值如下：
    - `basic`：普通请求，即同源请求。
    - `cors`：跨域请求。
    - `error`：网络错误，主要用于 Service Worker。
    - `opaque`：如果`fetch()`请求的`type`属性设为`no-cors`，就会返回这个值，详见请求部分。表示发出的是简单的跨域请求，类似`<form>`表单的那种跨域请求。
    - `opaqueredirect`：如果`fetch()`请求的`redirect`属性设为`manual`，就会返回这个值，详见请求部分。
  - `Response.redirected`:返回一个布尔属性，表示是否发生过跳转

##### 2.2 判断是否请求成功

- fetch()发出请求后，只有网络错误或者无法链接时才会报错，其他情况都不会报错，而是认为时请求成功

- 所以判断请求是否成功有两种方法

  - 一种是判断 `Response.status`属性，得到HTTP回应的真是状态码

    ```javascript
    
    async function fetchText() {
      let response = await fetch('/readme.txt');
      if (response.status >= 200 && response.status < 300) {
        return await response.text();
      } else {
        throw new Error(response.statusText);
      }
    }
    ```

  - 另一种是判断 `response.ok`是否为真

    ```javascript
    if (response.ok) {
      // 请求成功
    } else {
      // 请求失败
    }
    ```

##### 2.3 Reaponse.headers属性

- Response对象还有一个 `REsponse.headers`属性，这项一个Headers对象，对应HTTP回应的所有标头

  ```javascript
  // 可以通过以下方式进行遍历
  
  const response = await fetch(url);
  
  for (let [key, value] of response.headers) { 
    console.log(`${key} : ${value}`);  
  }
  
  // 或者
  for (let [key, value] of response.headers.entries()) { 
    console.log(`${key} : ${value}`);  
  }
  ```

- Headers对象提供了以下方法，用来操作标头

  ```javascript
  Headers.get()：根据指定的键名，返回键值。
  Headers.has()： 返回一个布尔值，表示是否包含某个标头。
  Headers.set()：将指定的键名设置为新的键值，如果该键名不存在则会添加。
  Headers.append()：添加标头。
  Headers.delete()：删除标头。
  Headers.keys()：返回一个遍历器，可以依次遍历所有键名。
  Headers.values()：返回一个遍历器，可以依次遍历所有键值。
  Headers.entries()：返回一个遍历器，可以依次遍历所有键值对（[key, value]）。
  Headers.forEach()：依次遍历标头，每个标头都会执行一次参数函数。
  ```

##### 2.4 读取内容的方法

- `response.text()`：得到文本字符串。
- `response.json()`：得到 JSON 对象。
- `response.blob()`：得到二进制 Blob 对象。
- `response.formData()`：得到 FormData 表单对象。
- `response.arrayBuffer()`：得到二进制 ArrayBuffer 对象

```javascript
// 使用 response.bolb() 读取图片并显示
const response = await fetch('flower.jpg');
const myBlob = await response.blob();
const objectURL = URL.createObjectURL(myBlob);

const myImage = document.querySelector('img');
myImage.src = objectURL;
```

##### 2.5 Response.clone()

- Stream对象只能读取一次，读取完就消失了，所以只能使用一种方法去读取，否则就会报错

  ```javascript
  let text =  await response.text();
  let json =  await response.json();  // 报错
  ```

- Response 对象提供`Response.clone()`方法，创建`Response`对象的副本，实现多次读取

  ```javascript
  const response1 = await fetch('flowers.jpg');
  const response2 = response1.clone();
  
  const myBlob1 = await response1.blob();
  const myBlob2 = await response2.blob();
  
  image1.src = URL.createObjectURL(myBlob1);
  image2.src = URL.createObjectURL(myBlob2);
  ```

#### 3.fetch()的第二个参数：定制HTTP请求

- fetch()的第一个参数是URL，第二个参数是一个配置对象，定制发出HTTP请求。

- 第二个参数用来设置请求的方法、标头、数据体等

  ```javascript
  fetch(url, optionObj)
  ```

##### 3.1 发送POST请求

```javascript

const response = await fetch(url, {
  method: 'POST',
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
  },
  body: 'foo=bar&lorem=ipsum',
});

const json = await response.json();
```

##### 3.2 提交JSON数据

```javascript

const user =  { name:  'John', surname:  'Smith'  };
const response = await fetch('/article/fetch/post/user', {
  method: 'POST',
  headers: {
   'Content-Type': 'application/json;charset=utf-8'
  }, 
  body: JSON.stringify(user) 
});
```

- 标头`Content-Type`要设成`'application/json;charset=utf-8'`。因为默认发送的是纯文本，`Content-Type`的默认值是`'text/plain;charset=UTF-8'`

##### 3. 提交表单

```javascript
const form = document.querySelector('form');

const response = await fetch('/users', {
  method: 'POST',
  body: new FormData(form)
})
```

##### 4.文件上传

```javascript
const input = document.querySelector('input[type="file"]');

const data = new FormData();
data.append('file', input.files[0]);
data.append('user', 'foo');

fetch('/avatars', {
  method: 'POST',
  body: data
});
```

#### 4. fetch()配置对象的完整API

- fetch()第二个参数的完整api如下

  ```javascript
  const response = fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "text/plain;charset=UTF-8"
    },
    body: undefined,
    referrer: "about:client",
    referrerPolicy: "no-referrer-when-downgrade",
    mode: "cors", 
    credentials: "same-origin",
    cache: "default",
    redirect: "follow",
    integrity: "",
    keepalive: false,
    signal: undefined
  });
  ```

##### 4.1 cache

- 该属性指定如何处理缓存，可取值如下：
  - `default`：默认值，先在缓存里面寻找匹配的请求。
  - `no-store`：直接请求远程服务器，并且不更新缓存。
  - `reload`：直接请求远程服务器，并且更新缓存。
  - `no-cache`：将服务器资源跟本地缓存进行比较，有新的版本才使用服务器资源，否则使用缓存。
  - `force-cache`：缓存优先，只有不存在缓存的情况下，才请求远程服务器。
  - `only-if-cached`：只检查缓存，如果缓存里面不存在，将返回504错误。

##### 4.2 mode

- 该属性指定请求的模式，可能取值如下：
  - `cors`：默认值，允许跨域请求。
  - `same-origin`：只允许同源请求。
  - `no-cors`：请求方法只限于 GET、POST 和 HEAD，并且只能使用有限的几个简单标头，不能添加跨域的复杂标头，相当于提交表单所能发出的请求。

##### 4.3 credentials

- 改属性指定是否发送Cookies,可能的取值如下：

  - `same-origin`：默认值，同源请求时发送 Cookie，跨域请求时不发送。
  - `include`：不管同源请求，还是跨域请求，一律发送 Cookie。
  - `omit`：一律不发送。

- 跨域发送Cookie，需要将 `credentials`属性设置为 `include`

  ```javascript
  fetch('http://another.com', {
    credentials: "include"
  });
  ```

##### 4.4 keepalive

- 盖属性用于页面卸载时，告诉浏览器在后台保持链接，用于继续发送数据

  ```javascript
  window.onunload = function() {
    fetch('/analytics', {
      method: 'POST',
      body: "statistics",
      keepalive: true
    });
  };
  ```

##### 4.5 redirect

- 该属性指定HTTP跳转的处理方法，可能的取值如下：
  - `follow`：默认值，`fetch()`跟随 HTTP 跳转。
  - `error`：如果发生跳转，`fetch()`就报错。
  - `manual`：`fetch()`不跟随 HTTP 跳转，但是`response.url`属性会指向新的 URL，`response.redirected`属性会变为`true`，由开发者自己决定后续如何处理跳转。

##### 4.6 integrity

- 该属性指定一个哈希值，用于检查HTTP回应传回的数据是否等于这个预先设置的哈希值

  ```javascript
  // 下载文件时，检查文件的 SHA-256 哈希值是否相符，确保没有被篡改
  fetch('http://site.com/file', {
    integrity: 'sha256-abcdef'
  });
  ```

##### 4.7 referrer

- `referrer`属性用于设定`fetch()`请求的`referer`标头。
- 该属性可以为任何字符串，也可以设为空字符串

##### 4.8 referrerPolicy

- `referrerPolicy`属性用于设定`Referer`标头的规则。可能的取值如下：

  - `no-referrer-when-downgrade`：默认值，总是发送`Referer`标头，除非从 HTTPS 页面请求 HTTP 资源时不发送。
  - `no-referrer`：不发送`Referer`标头。
  - `origin`：`Referer`标头只包含域名，不包含完整的路径。
  - `origin-when-cross-origin`：同源请求`Referer`标头包含完整的路径，跨域请求只包含域名。
  - `same-origin`：跨域请求不发送`Referer`，同源请求发送。
  - `strict-origin`：`Referer`标头只包含域名，HTTPS 页面请求 HTTP 资源时不发送`Referer`标头。
  - `strict-origin-when-cross-origin`：同源请求时`Referer`标头包含完整路径，跨域请求时只包含域名，HTTPS 页面请求 HTTP 资源时不发送该标头。
  - `unsafe-url`：不管什么情况，总是发送`Referer`标头。

  

