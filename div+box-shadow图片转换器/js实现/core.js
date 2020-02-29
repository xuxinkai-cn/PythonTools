// 封装函数库
function getImgColor(img) {

    /**
     * @ param 传入的图片 
     * @ this.progress 解析图片的进度 实时
     * @ this.canvas canvas元素
     * @ this.cvs context对象
     */

    this.canvas = document.createElement("canvas")
    this.canvas.width = img.width
    this.canvas.height = img.height
    this.cvs = this.canvas.getContext("2d")
    this.cvs.drawImage(img, 0, 0)
}
getImgColor.prototype.getColorXY = function(x, y) {

    /**
     * @param x Number x坐标起点
     * @param y Number y坐标起点
     * @return color  #16进制颜色
     */

    let obj = this.cvs.getImageData(x, y, 1, 1)
    
    // console.log(obj.data.toString())
    let arr = obj.data.toString().split(",")

    let first = parseInt(arr[0]).toString(16)
    first = first.length === 2 ? first : first + first

    let second = parseInt(arr[1]).toString(16)
    second = second.length === 2 ? second : second + second

    let third = parseInt(arr[2]).toString(16)
    third = third.length === 2 ? third : third + third

    let color = '#' + first + second + third
    return color
}


getImgColor.prototype.getColors = function() {

    /**
     * 避免图片过大，阻塞卡死
     * 每加载一行像素，延迟20毫秒加载下一行
     * return Promise 
     * promise resolve 返回颜色数组
     * promise reject none
     */

    return (new Promise((resolve, reject) => {

        let arr = []
        let getY = (i) => {
            for(let j = 0; j < this.canvas.height; j++) {
                let color = this.getColorXY(i, j)
                let pro = `${i}px ${j}px ${color}`
                // console.log(pro)
                arr.push(pro)
            }
        };

        let getX = (i) => {
            if (i < this.canvas.width) {
                getY(i)
                this.progress = (i / this.canvas.width * 100).toFixed(2) + '%'
                // console.log(this.progress)
                setTimeout(() => {
                    getX(++i)
                }, 20)
            } else {
                this.progress = '100%'
                console.log( this.progress )
                resolve(arr.sort(function(a, b) {
                    return a.index < b.index ? 1 : (a.index > b.index ? -1 : 0)
                }))
            }
        };

        getX(0)

    }))
}

// 实例代码
let input = document.querySelector("#file")

input.addEventListener("change", (event) => {
    /**
     * 上传图片之后
     * 替换图片
     * 执行方法
     */
    let img = document.querySelector("#img")
    let file = event.target.files[0]
    let fr = new FileReader()

    fr.onload = (e) => {
        let n_img = new Image()
        n_img.src = e.target.result
        n_img.onload = (e) => {
            n_img.id = 'img'
            n_img.width = n_img.width
            n_img.height = n_img.height
            document.body.replaceChild(n_img, img)
            getImg()
        }
    }

    fr.readAsDataURL(file)
})

function getImg() {
    /**
     * 获取图片，实例化图片
     * 执行方法
     * 解析完成，获得数组，操作回调函数
     * 
     */
    let img = document.querySelector("#img")
    let a = new getImgColor(img)

    a.getColors().then((arr) => {
        pro =  arr.join(",")
        console.log(pro)
        console.log("等待浏览器渲染")
        document.getElementsByClassName('container')[0].style.cssText= `box-shadow: ${pro};`
        document.getElementsByClassName('imgs')[0].style.cssText= 'width: 50px;'
    })
}