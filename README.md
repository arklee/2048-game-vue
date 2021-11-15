## 2048-game-vue

使用vue构建的2048网页小游戏，可调大小，选择不同文字。PC端使用上下左右键操作，移动端滑动操作。  
演示：[2048 Demo](http://www.iwannacode.space).

![preview](screenshot/image1.png)

### 构建
请先自行安装node、yarn/npm
```bash
$ git clone https://github.com/arklee/2048-game-vue
$ cd 2048-game-vue
$ yarn install #需要安装yarn，或npm install
```
### 测试
分数保存在scoreData目录中，要存取最高分需要先开启测试服务器。运行以下命令，打开浏览器并访问http://localhost:8080

```bash
$ yarn serve #需要安装yarn，或npm serve
$ node server.js
```

### 打包并上传服务器
运行以下命令将得到dist目录
```bash
$ yarn build #需要安装yarn，或npm
```
在服务器新建一个目录server，初始化并安装express。随后将dist、scoreData、server.js上传至服务器，并修改server.js中的端口号。
```bash
$ mkdir server
$ cd server $
//上传 dist、scoreData、server.js
$ yarn
$ yarn add express
//修改server.js端口号
$ node server.js
```
**（需要先在服务器安装node、yarn/npm）**

