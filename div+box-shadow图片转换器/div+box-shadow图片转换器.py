# -*- coding: utf-8 -*-
#author : PM 小凯哥<1695025997@qq.com>
from PIL import Image

def transform(image_file):
    # 转换图片的模式为RGB
    image_file = image_file.convert("RGB")
    # 获得文字图片的每个像素点
    img_datas = image_file.load()
    prototype = ""
    #size属性表示图片的分辨率，'0'为横向大小，'1'为纵向
    for h in range(0,image_file.size[1]):  
        for w in range(0,image_file.size[0]):
            img_color_data = img_datas[w,h]
            # print(img_color_data) #(255, 192, 165)
            prototype += "{x}px {y}px rgb{color},".format(x=w,y=h,color=img_color_data)
    return prototype[:-1]+";"

def get_html(new_pro):
    html1 = '''
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>小凯哥博客-https://aiquit.cn</title>
        <style>
            .container{
                position: relative;
                width: 8px;
                height: 8px;
                border-radius: 50%;
                background-color:black;
                box-shadow:'''
    html2 = '''
    }
        </style>
    </head>
    <body>
        <div class="container">
        </div>
    </body>
    </html>
    '''
    return html1+new_pro+html2


image_file = Image.open(open('a.jpg','rb'))
#调整图片大小
image_file=image_file.resize((int(image_file.size[0]*0.5), int(image_file.size[1]*0.5)))
tmp = open('a.html','w',encoding='utf-8')
tmp.write(get_html(transform(image_file)))
tmp.close()