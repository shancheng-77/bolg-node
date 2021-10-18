1.`document.write()` 在HTML文档完全加载后使用**会删除所有已有的HTML**

2.javascript运算符优先级https://www.w3school.com.cn/js/js_arithmetic.asp

3.**Null**：在js中，Null的数据类型是对象

```javascript
var person = null // 值是null，但是类型仍然是对象
```

 **Undefined**：清除对象后，值和数据类型都是undefined

```javascript
//undefined与null的值相等，但是类型不相等
typeof undefined              // undefined
typeof null                   // object
null === undefined            // false
null == undefined             // true
```

4.**原始数据**：原始数据是一种没有额外属性和方法单一简单数据值，

​	`typeof`可以返回一下原始类型之一：string 、number 、boolean、undefined

  **复杂数据**：`typeof`运算符可返回一下两种类型之一：function、object

- 该运算符会把对象、数组或null返回object，不会把函数返回object			

