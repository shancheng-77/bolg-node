## 原型链

- javascript是基于原型的

- javascript只有一个结构：对象（数组和函数都属于对象）,每个示例对象(`object`)都有一个私有属性(`_proto_`) 指向它的构造函数的原型对象（`prototype`）。该原型对象也有自己的一个原型对象（`_proto_`)，层层向上知道一个对象的原型对象为null，根据定义，`null`没有原型，并作为这个原型链的最后一个环节

- 几乎所有的JavaScript的对象都是位于原型链顶端的 `object`的实例

- 继承属性：
  
  - javascript对象是动态的属性“包”。
  
  - javascript对象有一个指向一个原型对象的链，当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象原型的原型，依次向上层层搜索，直到找到一个名字匹配的属性或到达原型链的末尾。
  
  - 倘若一个对象自身和原型都具有某属性，那么通过`object.attribute`访问到的是其自身的属性，这种情况被称为属性遮蔽

- 继承方法：
 
  - javascript并没有其他基于类语言所定义的方方法，任何函数都可以添加到对象上作为对象的属性。函数的继承和其他的属性继承没有差别，包括属性遮蔽
 
  - 当继承的函数被调用时，this指向的是当前继承的对象，而不是继承的函数所在的原型对象。

- 遍历对象的属性时，原型链上的每个可枚举属性都会被枚举出来，要检查对象是否具有自己定义的属性，而不是圆形脸上的某个属性，必须使用多有对象从 `Object.prototype`继承的 `hashOwnProperty`方法。

## TCP链接

- 三次握手

  - 所谓三次握手，是指建立一个TCP链接的时候，需要客户端和服务器总共发送三个包。

  - 三次握手的目的是链接服务器指定窗口，建立TCP链接，并同步链接对方的序列号和确认号，交换TCP窗口大小信息

    - 第一次握手（SYN = 1， seq = x）

      客户端发送一个TCP的SYN标志位1的包，指明客户端打算链接的服务器的端口，以及初始序号 X，保存在包头的序列号字段里 ，发送完毕后，客户端进入 `SYN_SEND`状态

    - 第二次握手（SYN = 1,ACK =Y,ACKnum=x+1）

      服务器发挥确认包（ACK）影大，即SYN标志位和ACK标志位均为1.服务器端选择自己的ISN序列号，放到Seq域里，同时确认序号设置为客户的ISN加1，即x+1，发送完毕后，服务器进入 `SYN_RCVD`状态

    - 第三次握手（ACK=1，ACKnum=y+1)

      客户端再次发送确认包（ACK），SYN标志位为0，ACK标志位为1，并且把服务器发来的ACK序列字段+1，放在确认字段中发送给对方，并且在数据段放写ISN的+1.发送完毕后，客户端进入 `ESTABLISHED` 状态，当服务器端接收到这个包时，也进入 `ESTABLISHED` 状态，TCP 握手结束。

    

  - TCP 的连接的拆除需要发送四个包，因此称为四次挥手(Four-way handshake)，也叫做改进的三次握手。客户端或服务器均可主动发起挥手动作，在 socket 编程中，任何一方执行 `close()` 操作即可产生挥手操作。
    - 第一次挥手(FIN=1，seq=x)
  
      假设客户端想要关闭连接，客户端发送一个 FIN 标志位置为1的包，表示自己已经没有数据可以发送了，但是仍然可以接受数据。
  
      发送完毕后，客户端进入 `FIN_WAIT_1` 状态。
    
    - 第二次挥手(ACK=1，ACKnum=x+1)
    
      服务器端确认客户端的 FIN 包，发送一个确认包，表明自己接受到了客户端关闭连接的请求，但还没有准备好关闭连接。
    
      发送完毕后，服务器端进入 `CLOSE_WAIT` 状态，客户端接收到这个确认包之后，进入 `FIN_WAIT_2` 状态，等待服务器端关闭连接。
    
    - 第三次挥手(FIN=1，seq=y)服务器端准备好关闭连接时，向客户端发送结束连接请求，FIN 置为1。
    
      发送完毕后，服务器端进入 `LAST_ACK` 状态，等待来自客户端的最后一个ACK。
    
    - 第四次挥手(ACK=1，ACKnum=y+1)
    
      客户端接收到来自服务器端的关闭请求，发送一个确认包，并进入 `TIME_WAIT`状态，等待可能出现的要求重传的 ACK 包。
    
      服务器端接收到这个确认包之后，关闭连接，进入 `CLOSED` 状态。
    
      客户端等待了某个固定时间（两个最大段生命周期，2MSL，2 Maximum Segment Lifetime）之后，没有收到服务器端的 ACK ，认为服务器端已经正常关闭连接，于是自己也关闭连接，进入 `CLOSED` 状态。
  

​	
