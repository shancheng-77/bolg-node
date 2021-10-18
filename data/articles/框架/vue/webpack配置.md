### 1.安装配置webpack

- 本次配置的版号如下：

  ```json
  "webpack": "^5.4.0",
  "webpack-cli": "^4.2.0"
  "webpack-dev-server": "^3.11.0"
  ```

- 安装webpack

  ```
  npm install webpack webpack0cli -D
  ```

- 安装webpack-dev-server （该工具提供了一个简单的网络服务器，并具有试试重新加载的功能）

  ```
  npm install --save-dev webpack-dev-server
  ```

- 创建文件webpack.config.js，添加如下配置

  ```
  module.exports = {
  		//可以设置为development(开发模式)，production(发布模式)
  		model:"development",
  		//修改配置文件，告知dev服务器，从什么位置查找文件：
  		//若不配置此文件，则显示该项目的所有文件
  		devServer: {
          "contentBase" : './dist',
      },
  }
  ```

- 使用命令初始化package.json

  ```
  npm init -y;
  ```

- 在package.json中添加dev sever运行脚本

  ```
   "scripts": {
   	//此处配置与官方文件不同，open后跟你使用的浏览器
      "start": "webpack serve --open Chrome.exe",
      "dev" : "webpack",
    },
  ```

- 创建src文件存储入口文件

- 使用命令开始webpack，运行后会创建dist文件夹存储打包后的文件

  ```
  npm run dev
  ```

- 使用命令运行start开启webpack serve工具

  ```
  npm start
  ```

- 命令结束后会自动打开chrome浏览器并打开8080端口实时监听数据

- 使用Ctrl+c可以停止该工具

### 2.webpack基本使用

##### 	1.配置 html-webpack-plugin生成预览界面

-  运行如下命令，安装生成预览页面的插件

  ```
  npm install html-webpack-plugin -D
  ```

- 修改webpack.config.js 文件头部区域，添加如下配置信息

  ```javascript
  //导入生成预览页面的插件，得到一个构造函数
  const HtmlWebpackPlugin = require('html-webpack=plugin')
  //创建实例对象
  const htmlPlugin = new HtmlWebpackPlugin({
      //指定要用到的模板对象
      template : 'src',
      //指定生成的文件名称，该文件存在于内存中，在目录中不显示
      filename: 'index.html'
  })
  ```

- 修改webpack.config.js文件中向外暴露的配置对象，新增如下配置节点

  ```javascript
  module.export = {
      //该数组时webpack打包期间会用到一些插件列表
      plugins ;[htmlPlugin]
  }
  ```

  