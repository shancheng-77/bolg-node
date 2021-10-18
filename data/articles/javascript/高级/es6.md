#### 1.ES6简介

#### 2.let和const命令

##### 2.1 let命令

- let用来声明变量，用法和var类似，但是声明的变量只在其所在的代码块内有效。
- let不存在变量提升，所以要在使用之前生命变量
- 暂时性死区：在块级作用域内使用let，则它所声明的变量就绑定这个区域不再收到外部的影响，如果在该区域内使在let变量声明前使用该变量就会导致报错。
- let不允许在相同作用域内重复声明同一个变量。

##### 2.2 块级作用域

- ES6中引入了块级作用域，明确允许在块级作用域中声明函数，且在块级作用域之外不能引用该函数。
- 以上规则只对ES6浏览器有效，其他的环境不一定遵守，所以在实际开发中我们应该避免此类现象。

##### 2.3 const命令

- const声明一个只读的变量，一旦声明，常量的值就不能改变。

- 以上规则意味着const一旦声明变量，就必须初始化，不能留到以后再赋值。

- const的作用域与let命令相同，只在声明所在的块级作用域内有效

- const声明的变量不提升，同时页存在暂时性死区，只能再声明的位置后使用

- const声明的变量也不可以重复声明。

- const实际上保证的是变量指向的内存地址所保存的数据不得改动，所以当声明的为一个对象或者是数组时，可以通过某些方法添加一些属性，但是不能直接更改该对象。

  ```javascript
  const foo = {};
  
  // 为 foo 添加一个属性，可以成功
  foo.prop = 123;
  foo.prop // 123
  
  // 将 foo 指向另一个对象，就会报错
  foo = {}; // TypeError: "foo" is read-only
  ```

##### 2.4 顶层对象的属性

- 浏览器环境中顶层对象指的是window对象，再ES5中，顶层对象的属性与全局变量是等价的。eg：

  ```javascript
  window.a = 1 
  a //1 
  a = 2
  window.a //2
  ```

- 在ES6中，为了保持兼容性，var命令和function命令声明的全局变量依旧是顶层对象的属性，同时也规定 let const class 命令声明的全局变量不属于顶层对象的属性。

#### 3.变量的解构赋值

##### 1.数组的结构赋值

- ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构。

  ```javascript
  let [a,b,c] = [1,2,3];
  ```

- 解构赋值允许指定默认值

  ```javascript
  let [x, y = 'b'] = ['a']; // x='a', y='b'
  let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
  ```

- 注意，ES6内部使用严格相等运算符（===），判断一个位置是否有值，所以只有当一个数组成员严格等于 `undefined`，默认值才会生效。

  ```javascript
  let [x = 1] = [undefined];
  x // 1
  
  let [x = 1] = [null];
  x // null
  ```

##### 2.对象的解构赋值

- 解构不仅可以用于数组，还可以用作对象

  ```javascript
  let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
  foo // "aaa"
  bar // "bbb"
  ```

- 对象的解构跟数组有一个重要的不同，数组元素是按照次序排列的，而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。如果结构失败，变量的值等于undefined

  ```javascript
  let {baz} = {foo:'aaa',bar:'bbb'};
  baz //undefined
  ```

- 如果变量名与属性名不一致，必须写成下面这样。可以说明，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量，真正被赋值的是后者而不是前者。

  ```javascript
  let {foo:baz} = {foo:'aaa',bar:'bbb'};
  baz // aaa
  ```

- 对象的解构也可以指定默认值

  ```javascript
  var {x = 3} = {};
  x // 3;
  var {x,y = 5} = {x:1};
  x // 1
  y // 5
  ```

##### 3.字符串的解构赋值

- 字符串也可以解构赋值，在解构的过程中，字符串被转换成了一个类似数组的对象。

  ```javascript
  const [a,b] = "he";
  a // h
  b // e
  ```

- 类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值

  ```javascript
  let {length: len} = 'hello';
  len // 5
  ```

##### 4.数值和布尔值的解构赋值

- 解构赋值时，等号右边如果是数值和布尔值，则会先转为对象。

  ```javascript
  let {toString: s} = 123;
  s === Number.prototype.toString // true
  
  let {toString: s} = true;
  s === Boolean.prototype.toString // true
  ```

- 解构赋值的规则是，只有等号右边不是对象或者数组，就先将其转化为对象，由于 `undefined` 和 `null`无法转为对象，所以对他们进行解构赋值就会报错。

  ```javascript
  let { prop: x } = undefined; // TypeError
  let { prop: y } = null; // TypeError
  ```

##### 5.函数参数的解构赋值

- 函数的参数也可以使用解构赋值

  ```javascript
  function add([x, y]){
    return x + y;
  }
  
  add([1, 2]); // 3
  ```

##### 6.圆括号问题

- 解构赋值虽然方便，但是解析起来并不容易，对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到等号才能知道。 
  ES6中规定，只要有可能导致解构歧义的地方就不允许使用圆括号，但是这条规则不是很容易辨别，因此只要有可能，就不要在模式中放置圆括号

- 不能使用圆括号的情况：

  - 变量声明语句：

    ```javascript
    // 全部报错
    let [(a)] = [1];
    
    let {x: (c)} = {};
    let ({x: c}) = {};
    let {(x: c)} = {};
    let {(x): c} = {};
    
    let { o: ({ p: p }) } = { o: { p: 2 } };
    ```

  - 函数参数

    ```javascript
    // 报错
    function f([(z)]) { return z; }
    // 报错
    function f([z,(x)]) { return x; }
    ```

  - 赋值语句的模式

    ```javascript
    // 全部报错
    ({ p: a }) = { p: 42 };
    ([a]) = [5];
    // 报错
    [({ p: a }), { x: c }] = [{}, {}];
    ```

- 可以使用圆括号的情况

  - 赋值语句的费莫氏部分，可以使用圆括号

    ```javascript
    [(b)] = [3]; // 正确
    ({ p: (d) } = {}); // 正确
    [(parseInt.prop)] = [3]; // 正确
    /*
    上面三行语句都可以正确执行，因为首先它们都是赋值语句，而不是声明语句；其次它们的圆括号都不属于模式的一部分。第一行语句中，模式是取数组的第一个成员，跟圆括号无关；第二行语句中，模式是p，而不是d；第三行语句与第一行语句的性质一致。
    */
    ```

##### 7.用途

- 交换变量的值

  ```javascript
  let x = 1;
  let y = 2;
  
  [x, y] = [y, x];
  ```

- 从函数返回多个值

  ```javascript
  //函数只能返回一个值，如果要返回多个值，只能将它们放在数组或对象里返回，有了解构赋值，去除这些值就非常方便。
  
  //返回一个数组
  function example() {
    return [1, 2, 3];
  }
  let [a, b, c] = example();
  
  // 返回一个对象
  
  function example() {
    return {
      foo: 1,
      bar: 2
    };
  }
  let { foo, bar } = example();
  ```

- 函数参数的定

  ```javascript
  //解构赋值可以方便的将一组参数与变量名对应起来。
  // 参数是一组有次序的值
  function f([x, y, z]) { ... }
  f([1, 2, 3]);
  
  // 参数是一组无次序的值
  function f({x, y, z}) { ... }
  f({z: 3, y: 2, x: 1});
  ```

- 提取JSON数据

  ```javascript
  let jsonData = {
    id: 42,
    status: "OK",
    data: [867, 5309]
  };
  
  let { id, status, data: number } = jsonData;
  
  console.log(id, status, number);
  // 42, "OK", [867, 5309]
  ```

- 函数参数的默认值

  ```javascript
  jQuery.ajax = function (url, {
    async = true,
    beforeSend = function () {},
    cache = true,
    complete = function () {},
    crossDomain = false,
    global = true,
    // ... more config
  } = {}) {
    // ... do stuff
  };
  ```

- 遍历MAP结构

  ```javascript
  const map = new Map();
  map.set('first', 'hello');
  map.set('second', 'world');
  
  for (let [key, value] of map) {
    console.log(key + " is " + value);
  }
  // first is hello
  // second is world
  ```

- 输入模块的指定方法

  ```javascript
  // 加载模块时，往往需要指定输入哪些方法，结构赋值使得输入语句非常清晰
  const { SourceMapConsumer, SourceNode } = require("source-map");
  ```

#### 4.字符串的新增方法

- `String.fromCodeOpint()` ：ES6提供了该方法，可以识别大于 `0xFFFF`的字符

  ```javascript
  String.fromCodePoint(0x20BB7)
  // "𠮷"
  // 如果该方法中国含有多个参数，那么他们被合并成一个字符串返回
  String.fromCodePoint(0x78, 0x1f680, 0x79) === 'x\uD83D\uDE80y'
  // true
  ```

- `codePointAt（）`:javascript内部，字符以UTF-16的格式存储，每个字符固定为2个字节，对于哪些需要4个字节存储的字符，js会认为他们是两个字符。
  ES6提供了 `codePointAt（）`方法，能后正确处理4个字节存储的字符，返回一个字符的码点

  ```javascript
  let s = '𠮷a';
  
  s.codePointAt(0) // 134071
  s.codePointAt(1) // 57271
  s.codePointAt(2) // 97
  
  //该方法返回的是一个码点的十进制值，如果想要十六进制的值，可以使用toString（）方法转换一下
  s.codePointAt(0).toString(16) // '20bb7'
  ```

- 示例方法： `includes()` `startswith()` `endsWith()`:  传统的js只有 `indexOf`方法可以用来确定一个字符串是否包含在另一个字符串中，ES6又提供了如下的方法：

  - includes() : 返回布尔值，表示是否找到了参数字符串。
  - startsWith(): 返回布尔值，表示参数字符串是否在原字符串的头部
  - endsWith(): 返回布尔值，表示参数字符串是否在原字符串的尾部

  ```javascript
  let s = 'hello world';
  
  s.startsWith('hello') // true
  s.endsWith('!') // true
  s.includes('0') // true
  
  // 当具有第二个参数的时候，表示开始搜索的位置
  s.startsWith('world', 6) // true
  s.endsWith('Hello', 5) // true
  s.includes('Hello', 6) // false
  //使用第二个参数n时，endsWith的行为与其他两个方法有所不同。它针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束。
  ```

- `repeat()` ：该方法返回一个新字符串，表示将原字符串重复n次

  ```javascript
  'x'.repeat(3) // 'xxx'
  
  //如果参数是小数，则向下取整
  'na'.repeat(2.9) // ‘nana’
  
  // 如果参数是负数或者Infinity。则会报错
  'na'.repeat(-1) // RangeError
  ```

- 示例方法： `padStart()` `padEnd()`  

  ES2017引入了字符串补全长度的功能，如果某个字符串不够指定长度，会在头部或者尾部补全。

  ```javascript
  // 总共接受两个参数，第一个参数是字符串补全生效的最大长度，第二个长度是用来补全的字符串，如果圣洛第二个参数，默认使用空格补全长度
  'x'.padStart(5, 'ab') // 'ababx'
  'x'.padStart(4, 'ab') // 'abax'
  
  'x'.padEnd(5, 'ab') // 'xabab'
  'x'.padEnd(4, 'ab') // 'xaba'
  
  // 如果原字符串的长度等于或大于最大程度，则补全字符串不生效，返回原字符串
  'xxx'.padStart(2, 'ab') // 'xxx'
  'xxx'.padEnd(2, 'ab') // 'xxx'
  
  // 如果用来不全的字符串和源字符串的和超过了最大长度，则会截去超出位数的补全字符串
  'abc'.padStart(10, '0123456789') // '0123456abc'
  ```

- 示例方法：`teimStart()` `trimEnd()` : Es2019对字符串新增了这两个方法，分别消除字符串首部的空格和末尾的空格，并返回新的字符串

- 示例方法： `replaceAll()` : 共接受两个参数，将字符串中所有的一个参数替换为第二个参数，同时返回一个新的字符串，不会更改原字符串（ES2021）

  ```javascript
  'aabbcc'.replaceAll('b', '_')
  // 'aa__cc'
  ```

#### 5.函数的扩展

##### 1.函数参数的默认值

- 在ES6之前，不能直接为函数的参数指定默认值，只能采用其他的方法：

  ```javascript
  function log(x, y) {
    y = y || 'World';
    console.log(x, y);
  }
  
  log('Hello') // Hello World
  log('Hello', 'China') // Hello China
  log('Hello', '') // Hello World
  ```

- 在ES6中，可以直接为函数的参数设置默认值，即直接写在参数定义的后面

  ```javascript
  function log(x, y = 'World') {
    console.log(x, y);
  }
  
  log('Hello') // Hello World
  log('Hello', 'China') // Hello China
  log('Hello', '') // Hello
  ```

- 参数变量是默认声明的，所以不能使用let或者const再次声明

- 参数默认值不是传值的，而是每次都重新计算默认表达式的值。

  ```javascript
  let x = 99;
  function foo(p = x + 1) {
    console.log(p);
  }
  
  // 在每次调用foo函数的时候都会重新计算x+1，而不是默认p等于100
  foo() // 100
  
  x = 100;
  foo() // 101
  ```

##### 2.函数的length属性

- 指定了默认值之后，函数的length属性将返回没有指定默认值的参数的个数

  ```javascript
  (function (a) {}).length // 1
  (function (a = 5) {}).length // 0
  (function (a, b, c = 5) {}).length // 2
  ```

- 如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参乎上

  ```javascript
  (function (a = 0, b, c) {}).length // 0
  (function (a, b = 1, c) {}).length // 1
  ```

##### 3.rest参数

- ES6引入rest参数（形式为 `...变量名`），用于获取函数的多余参数。这样就不需要使用 `arguments`对象了。rest参数搭配的变量是一个数组，该变量将多余的参数放入数组中。

  ```javascript
  function add(...values) {
    let sum = 0;
  
    for (var val of values) {
      sum += val;
    }
  
    return sum;
  }
  
  add(2, 5, 3) // 10
  ```

- rest参数后不能再有其他参数（即只能是最后一个参数），否则会报错

- 函数的length属性，不包含rest参数

##### 4.name属性

- 函数的name属性，返回该函数的函数名
- 在ES5中，如果将一个匿名函数赋值给一个变量，name属性将会返回空字符串，而ES6的name属性将会返回事级的函数名

##### 5.箭头函数

- ES6允许使用（=>) 定义函数
- 箭头函数使用注意点：
  - 函数体内的`this`滴哦瞎忙活，就是定义时所在的对象，而不是使用时所在的对象
  - 不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误
  - 不可以使用 `arguments`对象，该对象在函数体内不存在。如果要用，可以用rest函数替代
  - 不可以使用 `yield` 命令，因此箭头函数不能用作 GEnerator函数

#### 6.数组的扩展

##### 1.扩展运算符

- 扩展运算符时三个点(`...`),好比rest参数的逆运算，将一个数组转为用逗号分割的参数序列。

  ```javascript
  console.log(...[1, 2, 3])
  // 1 2 3
  ```

- 由于扩展运算符可以展开数组，所以不需要再用 `apply`方法将数组转为函数的参数了。

  ```javascript
  // ES5 的写法
  function f(x, y, z) {
    // ...
  }
  var args = [0, 1, 2];
  f.apply(null, args);
  
  // ES6的写法
  function f(x, y, z) {
    // ...
  }
  let args = [0, 1, 2];
  f(...args);
  ```

##### 2.Array.from()

- 该方法用于将两类对象转化为真正的数组：类似数组的对象和可遍历的对象（包括ES6新增的数据结构Set和Map）

##### 3.Array.of()

- 该方法用于将一组值转化为数组

  ```javascript
  Array.of(3, 11, 8) // [3,11,8]
  Array.of(3) // [3]
  Array.of(3).length // 1
  ```

##### 4.数组实例的 copyWithin()

- 该方法在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组，也就是说使用这个方法会修改当前数组。
- 接受三个参数：
  - target（必需）：从该位置开始替换数据。如果为负值，表示倒数。
  - start（可选）：从该位置开始读取数据，默认为 0。如果为负值，表示从末尾开始计算。
  - end（可选）：到该位置前停止读取数据，默认等于数组长度。如果为负值，表示从末尾开始计算。

#### 7.对象的扩展

##### 1.属性的简洁表示

- ES6允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。

  ```javascript
  const foo = 'bar';
  const baz = {foo};
  baz // {foo: "bar"}
  
  // 等同于
  const baz = {foo: foo};
  
  // 一个例子
  let birth = '2000/01/01';
  
  const Person = {
  
    name: '张三',
  
    //等同于birth: birth
    birth,
  
    // 等同于hello: function ()...
    hello() { console.log('我的名字是', this.name); }
  
  };
  ```

##### 2.属性名表达式

- javascript定义对象的属性有两种方法：

  - 一种是直接使用标识符作为属性名
  - 另一种是用表达式作为属性名

  ```javascript
  // 方法一
  obj.foo = true;
  
  // 方法二
  obj['a' + 'bc'] = 123;
  ```

- 在ES5中，如果使用字面量方式定义对象（即使用大括号），只能使用方法一，而ES6中则两种方法都可以使用

  ```javascript
  // ES5
  var obj = {
    foo: true,
    abc: 123
  };
  
  //ES6
  let propKey = 'foo';
  
  let obj = {
    [propKey]: true,
    ['a' + 'bc']: 123
  };
  ```

- 属性名表达式与简洁表示法不能同时使用，会产生报错

  ```javascript
  // 报错
  const foo = 'bar';
  const bar = 'abc';
  // 会产生 ‘index.html:13 Uncaught SyntaxError: Unexpected token '}'’的错误
  const baz = { [foo] };
  
  // 正确
  const foo = 'bar';
  const baz = { [foo]: 'abc'};
  ```

- 如果属性表达式是一个对象，默认情况下会自动将对象转化为字符串[object Object]

  ```javascript
  const keyA = {a: 1};
  const keyB = {b: 2};
  
  const myObject = {
    [keyA]: 'valueA',
    [keyB]: 'valueB'
  };
  
  myObject // Object {[object Object]: "valueB"}
  ```

##### 3.属性的遍历

- `for...in` ：循环遍历对象自身和继承的可枚举属性（不含symbol属性）

- `Objct.keys(obj)`：返回一个数组，包括对象自身的（不含继承的）所有可枚举属性（不含Symbol）的键名

- `Object.getOwnPropertyNames(obj)`:返回一个数组，包含对象自身的所有属性（不含Symbol属性，但是包含不可枚举属性）的键名。

- `Object.getOwnPropertySymbols(obj)`:返回一个数组，包含自身对象的所有symbol属性的键名

- `Reflect.ownKeys(obj)`:返回一个数组，包含对象自身的（不含继承的）所有键名，不管键名是Symbol或字符串，也不管是否可枚举

- 以上的五种方法遍历对象的键名，都遵守同样的属性遍历的次序规则。

  - 首先遍历所有数值键，按照数值升序排列
  - 其次遍历所有的字符串键值，按照加入时间升序排列
  - 最后遍历所有Symbol键，按照加入时间升序排列

  ```javascript
  //Reflect.ownKeys方法返回一个数组，包含了参数对象的所有属性。这个数组的属性次序是这样的，首先是数值属性2和10，其次是字符串属性b和a，最后是 Symbol 属性。
  Reflect.ownKeys({ [Symbol()]:0, b:0, 10:0, 2:0, a:0 })
  // ['2', '10', 'b', 'a', Symbol()]
  ```

##### 4.super关键字

- this关键字总是指向函数所在的当前对象，ES6中又新增了另一个类似的关键字super，指向当前对象的原型对象

  ```javascript
  const proto = {
    foo: 'hello'
  };
  
  const obj = {
    foo: 'world',
    find() {
      return super.foo;
    }
  };
  
  Object.setPrototypeOf(obj, proto);
  obj.find() // "hello"
  ```

- super表示原型对象时，只能用在对象的方法中，用在其他地方都会报错。

  ```javascript
  // 报错
  const obj = {
    foo: super.foo
  }
  
  // 报错
  const obj = {
    foo: () => super.foo
  }
  
  // 报错
  const obj = {
    foo: function () {
      return super.foo
    }
  }
  
  /*
  上面三种super的用法都会报错，因为对于 JavaScript 引擎来说，这里的super都没有用在对象的方法之中。第一种写法是super用在属性里面，第二种和第三种写法是super用在一个函数里面，然后赋值给foo属性。目前，只有对象方法的简写法可以让 JavaScript 引擎确认，定义的是对象的方法。
  */
  ```

- 在JavaScript引擎内部，`super.foo`等同于`Object.getPrototypeOf(this).foo`（属性）或`Object.getPrototypeOf(this).foo.call(this)`（方法）。

##### 5.对象的拓展运算符

- 结构赋值：对象的解构赋值用于从一个对象取值，相当于将目标对象自身的所有可遍历的（enumerable）、但尚未被读取的属性，分配到指定的对象上面。所有的键和他们的值，都会拷贝到新对象上面

  ```javascript
  let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
  x // 1
  y // 2
  z // { a: 3, b: 4 }
  ```

  - 由于结构赋值要求等号右边是一个等号，所以如果等号右边是 `undefined`、`null`，就会报错，因为它们无法转化为对象
  - 解构赋值必须是最后一个参数，否则会报错。
  - 解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数）、那么结构赋值拷贝的是这个值的引用，而不是这个值的副本。

- 扩展运算符（`...`) ：用于去除参数对象的所有可遍历属性，拷贝到当前的对象中

  ```javascript
  let z = { a: 3, b: 4 };
  let n = { ...z };
  n // { a: 3, b: 4 }
  
  // 数组是特殊的对象，所以对象的扩展运算符也可以用于数组
  let foo = { ...['a', 'b', 'c'] };
  foo
  // {0: "a", 1: "b", 2: "c"}
  
  // 如果扩展运算符后面是一个空对象，则没有任何效果
  {...{}, a: 1}
  // { a: 1 }
  
  // 如果扩展运算符后面不是对象，则会自动将其转为对象
  // 等同于 {...Object(1)}
  {...1} // {}
  ```

#### 8.Symbol

##### 1.概述

- ES5的对象属性名都是字符串，这容易造成属性名的冲突。所以在ES6中引入新的原始数据类型 `Symbol`,表示独一无二的值

- `Symbol`通过 `Symbol`函数生成。所以对象的属性名现在可以有两种类型，一种是原来就就有的字符串，另一种就是新增的Symbol类型。

  ```javascript
  let s = Symbol();
  
  typeof s
  // "symbol"
  ```

- Symbol函数前不能使用new命令，否则会报错，因为生成的Symbol是一个原始类型的值而不是对象，所以它也不能添加属性，基本上是一种类似于字符串的数据类型

- Symbol 可以接受一个字符串作为参数

  ```javascript
  let s1 = Symbol('foo');
  let s2 = Symbol('bar');
  
  s1 // Symbol(foo)
  s2 // Symbol(bar)
  
  s1.toString() // "Symbol(foo)"
  s2.toString() // "Symbol(bar)"
  ```

- 如果 Symbol函数的参数是一个对象，就会调用该对象的 `toString`方法，将其转化为字符串，然后在生成 symbol值

  ```javascript
  const obj = {
    toString() {
      return 'abc';
    }
  };
  const sym = Symbol(obj);
  sym // Symbol(abc)
  
  //若对象没有toString()方法
  const obj = {}
  const sym = Symbol(obj)
  console.log(sym); //Symbol([object Object])
  ```

- 由于`Symbol`的参数只是表示对当前Symbol值的描述，因此相同参数的 `Symbol`函数的返回值是不相等的。

- `Symbol`值不能与其他类型的值进行运算，否则会报错

- `Symbol`可以使用 `toString()`转为字符串或者直接转为布尔值，但是不能转为数值

##### 2.Symbol.prototype.description 

- 创建 `Symbol`的时候，可以添加一个描述

  ```javascript
  // sym的描输就是字符串 foo
  const sym = Symbol('foo');
  ```

- ES2019提供了一个示例属性 `description`，直接返回Symbol的描述

  ```javascript
  const sym = Symbol('foo');
  
  sym.description // "foo"
  ```

##### 3.作为属性名的 Symbol

- 每一个Symbol的值都是不相等的，这意味着Symbol值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。

  ```javascript
  let mySymbol = Symbol();
  
  // 第一种写法
  let a = {};
  a[mySymbol] = 'Hello!';
  
  // 第二种写法
  let a = {
    [mySymbol]: 'Hello!'
  };
  
  // 第三种写法
  let a = {};
  Object.defineProperty(a, mySymbol, { value: 'Hello!' });
  
  // 以上写法都得到同样结果
  a[mySymbol] // "Hello!"
  ```

- Symbol 值作为对象属性名时，不能用点运算符，因为直接使用点运算符就相当于使用该字符串名，所以Symbol值必须放在方括号里

  ```javascript
  const mySymbol = Symbol();
  const a = {};
  
  a.mySymbol = 'Hello!';
  a[mySymbol] // undefined
  a['mySymbol'] // "Hello!"
  ```

##### 5.属性名的遍历

- Symbol 作为属性名，遍历对象的时候，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回。但是，它也不是私有属性，有一个`Object.getOwnPropertySymbols()`方法，可以获取指定对象的所有 Symbol 属性名。该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

  ```javascript
  const obj = {};
  let a = Symbol('a');
  let b = Symbol('b');
  
  obj[a] = 'Hello';
  obj[b] = 'World';
  
  const objectSymbols = Object.getOwnPropertySymbols(obj);
  
  objectSymbols
  // [Symbol(a), Symbol(b)]
  ```

##### 6.Sysmbol.for(); Symbol.keyFor()

- Symbol.for() 方法可以让我们重新使用同一个Symbol值。

  ```javascript
  let s1 = Symbol.for('foo');
  let s2 = Symbol.for('foo');
  
  s1 === s2 // true
  ```

- Symbol.keyFor()方法返回一个已登记的Symbol类型值的key

  ```javascript
  let s1 = Symbol.for("foo");
  Symbol.keyFor(s1) // "foo"
  
  let s2 = Symbol("foo");
  Symbol.keyFor(s2) // undefined
  ```


#### 9.Set和Map数据结构

##### 1.Set 

- **基本用法：**类似与数组，但是成员的值都是唯一的，没有重复的值。Set本身是一个构造函数，用来生成Set数据机构

  ```javascript
  const s = new Set();
  
  [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
  
  for (let i of s) {
    console.log(i);
  }
  // 2 3 5 4
  ```

  - Set函数可以接受一个数组（或者具有iterable接口的其他数据结构）作为参数，用来初始化
  - 向Set中加入值的时候，不会发生类型转换。Set内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，类似于“===”。另外，两个对象总是不相等的，所以向Set中添加两个元素相同的对象时，被视为两个值。

- Set**示例的属性和方法**

  - Set结构的实例有以下属性：

    - `Set.prototype.constructor`:构造函数，默认是Set函数
    - `Set.prototype.size`：返回`Set`实例的成员总数。

  - 操作方法：

    - `Set.prototype.add(value)`：添加某个值，返回 Set 结构本身。
    - `Set.prototype.delete(value)`：删除某个值，返回一个布尔值，表示删除是否成功。
    - `Set.prototype.has(value)`：返回一个布尔值，表示该值是否为`Set`的成员。
    - `Set.prototype.clear()`：清除所有成员，没有返回值。

  - `Array.from`方法可以将Set结构转为数组

    ```javascript
    const items = new Set([1, 2, 3, 4, 5]);
    const array = Array.from(items);
    ```

  - 遍历方法：

    - `Set.prototype.keys()`：返回键名的遍历器
    - `Set.prototype.values()`：返回键值的遍历器
    - `Set.prototype.entries()`：返回键值对的遍历器
    - `Set.prototype.forEach()`：使用回调函数遍历每个成员

    ```javascript
    let set = new Set(['red', 'green', 'blue']);
    
    for (let item of set.keys()) {
      console.log(item);
    }
    // red
    // green
    // blue
    
    for (let item of set.values()) {
      console.log(item);
    }
    // red
    // green
    // blue
    
    for (let item of set.entries()) {
      console.log(item);
    }
    // ["red", "red"]
    // ["green", "green"]
    // ["blue", "blue"]
    
    let set = new Set([1, 4, 9]);
    set.forEach((value, key) => console.log(key + ' : ' + value))
    // 1 : 1
    // 4 : 4
    // 9 : 9
    ```

    - 由于Set结构没有键名只有键值，所以keys方阿飞和values方法的行为完全一致，而entries方法返回的遍历器每次输出一个数组，两个成员完全相等

##### 2.map

- **基本用法**：

  - 类似于对象，是键值对的集合，但是“键”的范围不限于字符串，各类类型的值（包括对象）都可以当作键。
  - Object结构提供了“字符串-值”的对应，Map结构提供了“值-值”的对象，是一种更完善的hash结构实现。

  ```javascript
  const m = new Map();
  const o = {p: 'Hello World'};
  
  m.set(o, 'content')
  m.get(o) // "content"
  
  m.has(o) // true
  m.delete(o) // true
  m.has(o) // false
  ```

- Map**属性：**

  - `size()`：返回Map结构的成员总数
  - `Map.prototype.set(key,value)`:该方法设置key对应的键值为value，然后返回整个Map结构，如果key已经有值，则键值会更新，否则就新生成该键
  - `Map.prototype.get(key)` :读取key对应的键值，如果找不到则返回undefined
  - `Map.prototype.has(key)`：返回一个布尔值，表示某个键是否在当前Map对象中
  - `Map.prototype.delete(key)`:删除某个键，返回true，反之则返回false
  - `Map.prototype.clear()` ：清除所有成员，没有返回值

- **遍历方法**

  - `Map.prototype.keys()`：返回键名的遍历器。
  - `Map.prototype.values()`：返回键值的遍历器。
  - `Map.prototype.entries()`：返回所有成员的遍历器。
  - `Map.prototype.forEach()`：遍历 Map 的所有成员。

- **与其他类型相互转换：**

  - Map转数组

    ```javascript
    const myMap = new Map()
      .set(true, 7)
      .set({foo: 3}, ['abc']);
    [...myMap]
    // [ [ true, 7 ], [ { foo: 3 }, [ 'abc' ] ] ]
    
    ```

  - 数组转为Map

    ```javascript
    new Map([
      [true, 7],
      [{foo: 3}, ['abc']]
    ])
    // Map {
    //   true => 7,
    //   Object {foo: 3} => ['abc']
    // }
    ```

  - Map转为对象

    ```javascript
    // 如果Map的键都是字符串，她可以无损的转为对象，反之将键名砖混为字符串再进行转换
    function strMapToObj(strMap) {
      let obj = Object.create(null);
      for (let [k,v] of strMap) {
        obj[k] = v;
      }
      return obj;
    }
    
    const myMap = new Map()
      .set('yes', true)
      .set('no', false);
    strMapToObj(myMap)
    // { yes: true, no: false }
    ```

  - 对象转map

    ```javascript
    let obj = {"a":1, "b":2};
    let map = new Map(Object.entries(obj));
    ```

  - Map转JSON

    ```javascript
    // 如果Map的键名都是字符串，这时可以选择转为对象JSON
    function strMapToJson(strMap) {
      return JSON.stringify(strMapToObj(strMap));
    }
    
    let myMap = new Map().set('yes', true).set('no', false);
    strMapToJson(myMap)
    // '{"yes":true,"no":false}'
    
    //若MAp的键名有非字符串，这时可以选择转为数组JSON
    function mapToArrayJson(map) {
      return JSON.stringify([...map]);
    }
    
    let myMap = new Map().set(true, 7).set({foo: 3}, ['abc']);
    mapToArrayJson(myMap)
    // '[[true,7],[{"foo":3},["abc"]]]'
    ```

  - JSON转Map

    ```javascript
    function jsonToStrMap(jsonStr) {
      return objToStrMap(JSON.parse(jsonStr));
    }
    
    jsonToStrMap('{"yes": true, "no": false}')
    // Map {'yes' => true, 'no' => false}
    ```


#### 10.Proxy

##### 1.概述

- Proxy用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”，即对编程语言进行编程

- Proxy可以理解为，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须经过这层拦截，因此提供了一层机制，可以对外界的访问进行过滤和改写。

- ES6原生提供Proxy构造函数，用来生成Proxy实例，接受两个参数，第一个参数是索要代理的目标对象，第二个参数是一个配置对象，对于每一个被代理的操作，需要提供一个对应的处理函数，该函数将拦截对应的操作

  ```javascript
  var proxy = new Proxy(target,handler)
  // 示例
  var proxy = new Proxy({}, {
    get: function(target, propKey) {
      return 35;
    }
  });
  
  proxy.time // 35
  proxy.name // 35
  proxy.title // 35
  ```

#### 11.Promise

##### 1.含义

- 简单来说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。
- 从语法上来说，Promise是一个对象，它可以获取异步操作的消息，Promise提供统一的API，各种异步操作都可以用同样的方法进行处理。
- Promise具有两个特点：
  - 对象的状态不受外界影响，`Promise`代表一个异步操作，有三种状态：`pending`（进行中）、`fulfilled`（已成功）和 `rejected`（已失败）。只有异步操作的结果可以决定当前是哪一种状态，其他的任何操作都无法改变这个状态，这也是 `Promise`这个名字的由来。
  - 一番状态改变，就不会再变，任何时候都可以得到这个结果， `Promise`对象的状态改变，只有两种可能：从 `pending`变为 `fulfilled`和从 `pending`变为 `rejected`。只要这两种情况发生，状态就凝固了，不会再改变了，会一直保持这个结果，这时就被称为 resolved（已定型）。如果改变已经发生了，你再对 Promise对象添加回调函数也会立即得到这个结果，这与事件（Event）完全不同，事件的特点是，如果你错过了它再去监听，是得不到结果的。
  - `Promise`也有一些缺点。首先，无法取消`Promise`，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。第三，当处于`pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

##### 2.基本用法

- ES6规定，Promise对象是一个构造函数，用来生成Promise实例

  ```javascript
  const promise = new Promise(function(resolve, reject) {
    // ... some code
  
    if (/* 异步操作成功 */){
      resolve(value);
    } else {
      reject(error);
    }
  });
  
  ```

- Promise构造函数接受一个函数作为参数，该函数的两个参数分别是 `resolve`和 `reject`。他们是两个函数，由js引擎提供，不需要自己部署

  - `resolve`函数的作用是，将 `Promise`对象的状态从“未完成”变为成功，在异步操作成功时调用，并将异步操作的结果作为参数传递出去
  - `reject`函数的作用是，将 `Promise`对象的状态从“未完成”变为“失败”，在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去

- Promise实例生成以后，可以用 `then`方法分别指定 `resolve`状态和 `rejected`状态的回调函数

  ```javascript
  promise.then(function(value) {
    // success
  }, function(error) {
    // failure
  });
  ```

  - `then`方法可以接受两个回调函数作为参数，第一个回调函数是 `Promise`对象的状态改变为 `resolve`时调用，第二个回调函数时 Promise 对象的状态变为 `rejected`时调用。这两个函数都是可选的，不一定要提供。他们都接受 Promise对象传出的值作为参数

##### 3.Promise.prototype.then()

- then方法返回的是一个全新的Promise实例（注意不是原来的那个Promise实例）。因此可以采用链式写法，即then方法后面再调用另一个then方法

  ```javascript
  getJSON("/posts.json").then(function(json) {
    return json.post;
  }).then(function(post) {
    // ...
  });
  ```

  - 采取链式的then，可以指定一组按照次序调用的回调函数，这时，前一个回调函数有可能返回的还是一个Promise对象（即有异步操作），这时后一个回调函数，就会等待该Promise第项的状态发生变化才会被调用

  ```javascript
  getJSON("/post/1.json").then(function(post) {
    return getJSON(post.commentURL);
  }).then(function (comments) {
    console.log("resolved: ", comments);
  }, function (err){
    console.log("rejected: ", err);
  });
  /*
  上面代码中，第一个then方法指定的回调函数，返回的是另一个Promise对象。这时，第二个then方法指定的回调函数，就会等待这个新的Promise对象状态发生变化。如果变为resolved，就调用第一个回调函数，如果状态变为rejected，就调用第二个回调函数。
  */
  ```

##### 4.Promise.protoytype.catch()

- `Promise.prototype.catch()`方法是`.then(null, rejection)`或`.then(undefined, rejection)`的别名，用于指定发生错误时的回调函数。

  ```javascript
  getJSON('/posts.json').then(function(posts) {
    // ...
  }).catch(function(error) {
    // 处理 getJSON 和 前一个回调函数运行时发生的错误
    console.log('发生错误！', error);
  });
  ```

##### 5.Promise.prototype.finally()

- `finally()`方法用于指定不管 Promise 对象最后状态如何，都会执行的操作。该方法是 ES2018 引入标准的。

  ```javascript
  promise
  .then(result => {···})
  .catch(error => {···})
  .finally(() => {···});
  ```

- `finally`方法的回调函数不接受任何参数，这意味着没有办法知道。前面的Promise状态，所以 `finally`方法里面的操作应该是与状态无关的，不依赖于Promise的执行结果

##### 6.Promise.all()

- 该方法用于将多个Promise实例包装成一个新的Promise实例

  ```javascript
  const p = Promise.all([p1, p2, p3]);
  ```

- `Promise.all()`方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

- `p`的状态由`p1`、`p2`、`p3`决定，分成两种情况。

  - 只有`p1`、`p2`、`p3`的状态都变成`fulfilled`，`p`的状态才会变成`fulfilled`，此时`p1`、`p2`、`p3`的返回值组成一个数组，传递给`p`的回调函数。

  - 只要`p1`、`p2`、`p3`之中有一个被`rejected`，`p`的状态就变成`rejected`，此时第一个被`reject`的实例的返回值，会传递给`p`的回调函数。

##### 7.Promise.race()

- `Promise.race()`方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。

  ```javascript
  const p = Promise.race([p1, p2, p3]);
  ```

- 只要`p1`、`p2`、`p3`之中有一个实例率先改变状态，`p`的状态就跟着改变。那个率先改变的 Promise 实例的返回值，就传递给`p`的回调函数。

##### 8.Promise.allSettled()

- `Promise.allSettled()`方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只有等到所有这些参数实例都返回结果，不管是`fulfilled`还是`rejected`，包装实例才会结束。该方法由 [ES2020](https://github.com/tc39/proposal-promise-allSettled) 引入。

  ```javascript
  const promises = [
    fetch('/api-1'),
    fetch('/api-2'),
    fetch('/api-3'),
  ];
  
  await Promise.allSettled(promises);
  removeLoadingIndicator();
  ```

- 该方法返回的新的 Promise 实例，一旦结束，状态总是`fulfilled`，不会变成`rejected`。状态变成`fulfilled`后，Promise 的监听函数接收到的参数是一个数组，每个成员对应一个传入`Promise.allSettled()`的 Promise 实例。

##### 9.Promise.any()

- ES2021 引入了[`Promise.any()`方法](https://github.com/tc39/proposal-promise-any)。该方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例返回。只要参数实例有一个变成`fulfilled`状态，包装实例就会变成`fulfilled`状态；如果所有参数实例都变成`rejected`状态，包装实例就会变成`rejected`状态。

  ```javascript
  const promises = [
    fetch('/endpoint-a').then(() => 'a'),
    fetch('/endpoint-b').then(() => 'b'),
    fetch('/endpoint-c').then(() => 'c'),
  ];
  try {
    const first = await Promise.any(promises);
    console.log(first);
  } catch (error) {
    console.log(error);
  }
  ```

- `Promise.any()`抛出的错误，不是一个一般的错误，而是一个 AggregateError 实例。它相当于一个数组，每个成员对应一个被`rejected`的操作所抛出的错误。下面是 AggregateError 的实现示例。

##### 10.Promise.resolve()

- 有时需要将现有对象转为 Promise 对象，`Promise.resolve()`方法就起到这个作用。

  ```javascript
  const jsPromise = Promise.resolve($.ajax('/whatever.json'));
  ```

##### 11.Promise.reject()

- `Promise.reject(reason)`方法也会返回一个新的 Promise 实例，该实例的状态为`rejected`。

  ```javascript
  const p = Promise.reject('出错了');
  // 等同于
  const p = new Promise((resolve, reject) => reject('出错了'))
  
  p.then(null, function (s) {
    console.log(s)
  });
  // 出错了
  ```

- `Promise.reject()`方法的参数，会原封不动地作为`reject`的理由，变成后续方法的参数。

#### 12.Iterator和for...of循环

##### 1.Iterator（遍历器的概念）

- JavaScript中目前共有四种表示集合的数据结构：数组（`Array`）、对象（`Object`）、`Map`和 `Set`。用户还可以自由组合他们，定义自己的数据结构，，比如数组的成员是`Map`，`Map`的成员是对象。

- 遍历器（Iterator）就是用来处理所有不同的数据结构的一种机制。它是一种结构，为不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator结构，就可以完成遍历操作

- Iterator共有三个作用：

  - 为各种数据结构提供一个统一的简单的访问结构
  - 使得数据结构的成员能够按照某种次序排列
  - ES6中创造了一种新的遍历命令 `for...of`循环，Iterator结构主要供其消费

- Iterator的遍历过程：

  - 创建一个指针对象，指向当前数据结构的骑士位置，也就是说，遍历器对象本质上就是一个指针对象。
  - 第二次调用指针对象的next方法，可以将指针指向数据结构的第一个成员
  - 不断调用指针对象的 next方法，知道它指向数据结构的结束位置
  - 每一次调用next方法，都会返回数据结构的当前成员的信息，具体来说就是返回一个包含 `value`和  `done`两个属性的对象，其中value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束

  ```javascript
  // 模拟next方法的一个例子
  
  var it = makeIterator(['a', 'b']);
  
  it.next() // { value: "a", done: false }
  it.next() // { value: "b", done: false }
  it.next() // { value: undefined, done: true }
  
  function makeIterator(array) {
    var nextIndex = 0;
    return {
      next: function() {
        return nextIndex < array.length ?
          {value: array[nextIndex++], done: false} :
          {value: undefined, done: true};
      }
    };
  }
  ```

##### 2.默认Iterator结构

- 一种数据结构只要部署了Iterator结构，我们就称这种结构为可遍历的

- ES6 规定，默认的 Iterator 接口部署在数据结构的`Symbol.iterator`属性，或者说，一个数据结构只要具有`Symbol.iterator`属性，就可以认为是“可遍历的”（iterable）。

- 原生具备Iterator结构的数据结构如下：

  - Array
  - Map
  - Set
  - String
  - TypedArray
  - 函数的 arguments 对象
  - NodeList 对象

  ```javascript
  // 数组的Symbol.Iterator属性
  
  let arr = ['a', 'b', 'c'];
  let iter = arr[Symbol.iterator]();
  
  iter.next() // { value: 'a', done: false }
  iter.next() // { value: 'b', done: false }
  iter.next() // { value: 'c', done: false }
  iter.next() // { value: undefined, done: true }
  ```

##### 3.for...of循环

- 一个数据结构只要部署了 `Symbol.iterator`属性，就被视为具有iterator结构，就可以用 `for...of`循环遍历他的成员，也就是说，`for...of`循环内部嗲用的是数据结构的 `Symbol.iterator`方法。
- `for...of`循环可以使用的范围包括数组、Set和Map结构、某些类似数组的对象（比如`arguments`对象、DOM NodeList 对象）、后文的 Generator 对象，以及字符串。