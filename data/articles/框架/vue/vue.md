### 1.vue指令

​	本质就是自定义属性，vue指令都以v-开头

- #### 	v-clock 

  - 防止页面加载时出现闪烁问题

    ```javascript
     <style type="text/css">
      /* 
        1、通过属性选择器 选择到 带有属性 v-cloak的标签  让他隐藏
     */
      [v-cloak]{
        /* 元素隐藏    */
        display: none;
      }
      </style>
    <body>
      <div id="app">
        <!-- 2、 让带有插值 语法的   添加 v-cloak 属性 
             在 数据渲染完场之后，v-cloak 属性会被自动去除，
             v-cloak一旦移除也就是没有这个属性了  属性选择器就选择不到该标签
    		 也就是对应的标签会变为可见
        -->
        <div  v-cloak  >{{msg}}</div>
      </div>
      <script type="text/javascript" src="js/vue.js"></script>
      <script type="text/javascript">
        var vm = new Vue({
          //  el   指定元素 id 是 app 的元素  
          el: '#app',
          //  data  里面存储的是数据
          data: {
            msg: 'Hello Vue'
          }
        });
    </script>
    </body>
    </html>
    ```

- #### v-text

  - 用于将数据填充到标签中，不存在闪动问题，不识别html标签

  ```javascript
  <div id="app">
      <!--  
  		注意:在指令中不要写插值语法  直接写对应的变量名称 
          在 v-text 中 赋值的时候不要在写 插值语法
  		一般属性中不加 {{}}  直接写 对应 的数据名 
  	-->
      <p v-text="msg"></p>
      <p>
          <!-- Vue  中只有在标签的 内容中 才用插值语法 -->
          {{msg}}
      </p>
  </div>
  
  <script>
      new Vue({
          el: '#app',
          data: {
              msg: 'Hello Vue.js'
          }
      });
  
  </script>
  ```

- #### v-html

  - 用法和v-text相似，可识别html标签，但是 存在安全问题，只在新人的内容上使用，永远不再用户提交的内容上使用

  ```javascript
  <div id="app">
  　　<p v-html="html"></p> <!-- 输出：html标签在渲染的时候被解析 -->
      
      <p>{{message}}</p> <!-- 输出：<span>通过双括号绑定</span> -->
      
  　　<p v-text="text"></p> <!-- 输出：<span>html标签在渲染的时候被源码输出</span> -->
  </div>
  <script>
  　　let app = new Vue({
  　　el: "#app",
  　　data: {
  　　　　message: "<span>通过双括号绑定</span>",
  　　　　html: "<span>html标签在渲染的时候被解析</span>",
  　　　　text: "<span>html标签在渲染的时候被源码输出</span>",
  　　}
   });
  </script>
  ```

- #### v-pre

  - 跳过编译过程直接显示原始信息
  - 一些静态的内容不需要编译加这个指令可以加快渲染

  ```javascript
      <span v-pre>{{ this will not be compiled }}</span>    
  	<!--  显示的是{{ this will not be compiled }}  -->
  	<span v-pre>{{msg}}</span>  
       <!--   即使data里面定义了msg这里仍然是显示的{{msg}}  -->
  <script>
      new Vue({
          el: '#app',
          data: {
              msg: 'Hello Vue.js'
          }
      });
  
  </script>
  ```

- #### v-once

  - 执行一次的插值，当数据改变时，插值处的内容不会继续更新

  ```javascript
    <!-- 即使data里面定义了msg 后期我们修改了 仍然显示的是第一次data里面存储的数据即 Hello Vue.js  -->
       <span v-once>{{ msg}}</span>    
  <script>
      new Vue({
          el: '#app',
          data: {
              msg: 'Hello Vue.js'
          }
      });
  </script>
  ```

- #### v-model 

  - 双向数据绑定，在数据发生变化时，视图也发生变化，当视图发生变化时，数据也会发生改变
  - v-model限制在 `<input>、<select>、<textarea>、components`中使用

  ```javascript
   <div id="app">
        <div>{{msg}}</div>
        <div>
            当输入框中内容改变的时候，  页面上的msg  会自动更新
          <input type="text" v-model='msg'>
        </div>
    </div>
  ```

- #### v-on

  - 用来绑定事件
  - 形式为； v-on:click 缩写为： @click;

  ```javascript
  <button @click='add'>点击</button>
  <script>
      const vm =new Vue({
              el :'#app',
              data : {
          		num : 0
              },
              //存储事件对象
              methods: {
                  add : function (){
                      this.num++;
                  },
              }
          });
  </script>
  ```

  

### 2.事件修饰符

- 在事件处理程序中调用 `event.preventDefault()` 或 `event.stopPropagation()` 是非常常见的需求。

- Vue 不推荐我们操作DOM    为了解决这个问题，Vue.js 为 `v-on` 提供了**事件修饰符**

- 修饰符是由点开头的指令后缀来表示的

  ```javascript
  <!-- 阻止单击事件继续传播 -->
  <a v-on:click.stop="doThis"></a>
  
  <!-- 提交事件不再重载页面 -->
  <form v-on:submit.prevent="onSubmit"></form>
  
  <!-- 修饰符可以串联   即阻止冒泡也阻止默认事件 -->
  <a v-on:click.stop.prevent="doThat"></a>
  
  <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
  <!-- 即事件不是从内部元素触发的 -->
  <div v-on:click.self="doThat">...</div>
  
  使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 v-on:click.prevent.self 会阻止所有的点击，而 v-on:click.self.prevent 只会阻止对元素自身的点击。
  ```

### 3.案件修饰符

- 在做项目中有时会用到键盘事件，在监听键盘事件时，我们经常需要检查详细的按键。Vue 允许为 `v-on` 在监听键盘事件时添加按键修饰符

  ```html
  <!-- 只有在 `keyCode` 是 13 时调用 `vm.submit()` -->
  <input v-on:keyup.13="submit">
  
  <!-- -当点击enter 时调用 `vm.submit()` -->
  <input v-on:keyup.enter="submit">
  
  <!--当点击enter或者space时  时调用 `vm.alertMe()`   -->
  <input type="text" v-on:keyup.enter.space="alertMe" >
  
  常用的按键修饰符
  .enter =>    enter键
  .tab => tab键
  .delete (捕获“删除”和“退格”按键) =>  删除键
  .esc => 取消键
  .space =>  空格键
  .up =>  上
  .down =>  下
  .left =>  左
  .right =>  右
  
  <script>
  	var vm = new Vue({
          el:"#app",
          methods: {
                submit:function(){},
                alertMe:function(){},
          }
      })
  
  </script>
  ```

  

### 4.自定义按键修饰符

- 在Vue中可以通过`config.keyCodes`自定义按键修饰符别名

  ```html
  <div id="app">
      预先定义了keycode 116（即F5）的别名为f5，因此在文字输入框中按下F5，会触发prompt方法
      <input type="text" v-on:keydown.f5="prompt()">
  </div>
  
  <script>
  	
      Vue.config.keyCodes.f5 = 116;
  
      let app = new Vue({
          el: '#app',
          methods: {
              prompt: function() {
                  alert('我是 F5！');
              }
          }
      });
  </script>
  ```

  