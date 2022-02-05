## 2048-game-vue

使用vue构建的2048网页小游戏，可调大小，选择不同文字。PC端使用上下左右键操作，移动端滑动操作。
demo: https://iwannacode.space/2048.html

![preview](/screenshot/image1.png)

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

### 打包
运行以下命令将得到dist目录
```bash
$ yarn build #需要安装yarn，或npm build
```
