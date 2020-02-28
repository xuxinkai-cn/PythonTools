# div+box-shadow图片绘制转换器（Python实现、JavaScript实现）

## 原理介绍

```
box-shadow: 15px 10px 0px rgb(255,255,255);
```
15px代表x轴值，10px代表Y轴,0px代表模糊值，最后一个是颜色。

![坐标轴](http://conv2019.aiquit.cn/uploads/20200228135734.png)

图片是由一个个像素点组成，在html5中，将容器宽高固定，然后设置**border-radius:50%;**就可以将容器变成一个圆点，很多圆点就可以绘制成图形。

因此可以采用Python的图片处理库将图片的每一个像素点的颜色值读取，然后与x，y值拼接成box-shadow的属性。

## 使用的软件

- Python 3.6
- pillow图片处理库
- CSS3/html5

## 使用
首先将python脚本下载到本地，然后修改脚本中的图片路径，会自动生成html文件。

```
#修改图片地址
image_file = Image.open(open('a.jpg','rb'))
#调整图片大小
image_file=image_file.resize((int(image_file.size[0]*0.5), int(image_file.size[1]*0.5)))
tmp = open('a.html','w',encoding='utf-8')
tmp.write(get_html(transform(image_file)))
tmp.close()
```

效果预览：

[点击查看效果](http://conv2019.aiquit.cn/a.html)

[线上体验地址](http://conv2019.aiquit.cn/uploads/index/index.html)

** 浏览器计算需要时间，耐心等待即可 **

![哆啦A梦](http://conv2019.aiquit.cn/uploads/20200228135025.png)

[我的博客](https://aiquit.cn/blog)