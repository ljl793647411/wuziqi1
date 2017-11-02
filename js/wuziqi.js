class Game {
    constructor() {
        this.kaishi = document.querySelector(".kaishi");//游戏开始按钮
        this.wanjia = document.querySelector(".moshi");//玩家模式按钮
        this.AI = document.querySelector(".moshi1");//人机模式按钮
        this.set1 = document.querySelector(".set1");//音乐开关按钮
        this.set = document.querySelector(".set");//重新开始按钮
        this.output = document.querySelector(".qipu");//生成棋谱按钮
        this.xiazai = document.querySelector(".mask a");//下载棋谱按钮
        this.neirong = document.querySelector(".neirong"); //画布盒子
        this.canvas = document.querySelector(".canvass");    //画布
        this.kongzhi = document.querySelector(".kongzhi"); //控制模式盒子
        this.youximoshi = document.querySelector(".youximoshi");//游戏模式字
        this.mask = document.querySelector(".mask");//游戏结束盒子
        this.imgbox = document.querySelector(".imgbox");//生成棋谱盒子
        this.huabi = this.canvas.getContext("2d");//声明画笔属性
        this.music = document.querySelector(".yinyue");//音乐图标盒子
        this.audio = document.querySelector("audio");//音乐
        this.h = document.querySelector("h1");//获胜结果盒子
        this.flag = true;
        this.flag2 = true;//音乐开关
        this.flag3 = true;//生成棋谱开关
        this.w = 40; //每个棋盘格子宽度
        this.pos = {}; //保存对象
        this.blank = {};//保存人机对象属性
        this.isAI = false; //人机默认关
        this.anniu = document.querySelector(".mask a input")
    }

    //棋盘划线方法
    _qipan() {
        this.huabi.beginPath();
        for (let a = 1; a < 14; a++) {
            this.huabi.save()
            this.huabi.lineWidth = 1;
            this.huabi.moveTo(20.5, a * this.w + 20.5);
            this.huabi.lineTo(580, a * this.w + 20.5);
            this.huabi.moveTo(a * this.w + 20.5, 20.5);
            this.huabi.lineTo(a * this.w + 20.5, 580);
            this.huabi.stroke();
            // console.log(this.huabi)
            this.huabi.restore();
            this.huabi.rect(20.5, 20.5, 560, 560);
            for (let i = 0; i < 15; i++) {
                for (let b = 0; b < 15; b++) {
                    this.blank[this._j(i, b)] = true;
                }
            }

        }
        this._dian(3, 3);
        this._dian(7, 7);
        this._dian(3, 11);
        this._dian(11, 3);
        this._dian(11, 11);
    }

    //棋盘画五点方法
        _dian(x,y) {
            console.log(this.huabi)
            this.huabi.save();
            this.huabi.beginPath();
            this.huabi.translate(x * this.w, y * this.w)
            this.huabi.arc(20.5, 20.5, 6, 0, 2 * Math.PI);
            this.huabi.fill();
            this.huabi.restore();
        };

    //生成棋子方法
    _qizi(x, y, color) {
        this.huabi.save();
        this.huabi.beginPath();
        this.huabi.fillStyle = color;
        this.huabi.arc(x * this.w + 20, y * this.w + 20, 15, 0, 2 * Math.PI);
        this.huabi.fill();
        this.huabi.restore();
        this.pos[this._j(x, y)] = color;
        delete this.blank[this._j(x, y)];
    }

    //辅助J方法
    _j(x, y) {
        return x + "_" + y;
    };

    //游戏规则
    _guize(x, y, color) {
        let row = 1;
        let col = 1;
        let row1 = 1;
        let col1 = 1;
        let i = 1;
        while (this.pos[this._j(x + i, y)] === color) {
            row++;
            i++;
        }
        i = 1;
        while (this.pos[this._j(x - i, y)] === color) {
            row++;
            i++;
        }
        i = 1;
        while (this.pos[this._j(x, y + i)] === color) {
            col++;
            i++;
        }
        i = 1;
        while (this.pos[this._j(x, y - i)] === color) {
            col++;
            i++;
        }
        i = 1;
        while (this.pos[this._j(x + i, y - i)] === color) {
            row1++;
            i++;
        }
        i = 1;

        while (this.pos[this._j(x - i, y + i)] === color) {
            row1++;
            i++;
        }
        i = 1;
        while (this.pos[this._j(x + i, y + i)] === color) {
            col1++;
            i++;
        }
        i = 1;
        while (this.pos[this._j(x - i, y - i)] === color) {
            col1++;
            i++;
        }
        return Math.max(row, row1, col, col1);
    }

    //AI智能设置
    _getpos() {
        let max = 0;
        let pos1 = {};
        for (let i in this.blank) {
            let x = parseInt(i.split("_")[0]);
            let y = parseInt(i.split("_")[1]);
            let changdu = this._guize(x, y, "#fff");
            if (changdu > max) {
                max = changdu;
                pos1 = {x, y}
            }
        }
        let max2 = 0
        let pos2 = {};
        for (let i in this.blank) {
            let x = parseInt(i.split("_")[0]);
            let y = parseInt(i.split("_")[1]);
            let changdu = this._guize(x, y, "#000");
            if (changdu > max2) {
                max2 = changdu;
                pos2 = {x, y}
            }
        }
        if (max > max2) {
            return pos1;
        } else {
            return pos2;
        }
    }

    //游戏结束方法
    _over(name) {
        this.mask.style.display = "block";
        this.h.innerHTML = name + "棋获胜"
    }

    //恢复默认方法
    _clear() {
        this.mask.style.display = "none";
        this.neirong.classList.remove("show");
        this.huabi.clearRect(0, 0, 640, 640)
        this.pos = {};
        this._qipan();
    }

    //游戏开始方法
    start() {
        this.kaishi.addEventListener("click", function () {
            this.neirong.classList.add("show");
            this.kaishi.style.display = "none";
            this.kongzhi.style.display = "block";
            this.youximoshi.classList.add("moshi3");
            this.wanjia.classList.add("moshi2");
            this._qipan();
            // this._dian();
        }.bind(this))

    }


    //生成棋子事件
    xiaqi() {
        this.canvas.onclick = function (e) {
            let x = Math.round((e.offsetX - 20) / this.w);
            let y = Math.round((e.offsetY - 20) / this.w);
            if (this.pos[this._j(x, y)]) {
                return
            }
            if (this.flag) {
                this._qizi(x, y, "#000");
                if (this._guize(x, y, "#000") === 5) {
                    this._over("黑")
                }
                if (this.isAI) {
                    let p = this._getpos();
                    this._qizi(p.x, p.y, "#fff");
                    if (this._guize(p.x, p.y, "#fff") === 5) {
                        this._over("白")
                    }
                    return;
                }
            } else {
                this._qizi(x, y, "#fff");
                if (this._guize(x, y, "#fff") === 5) {
                    this._over("白")
                }
            }
            this.flag = !this.flag;

        }.bind(this);
    }

    //玩家模式点击事件
    wanjia1() {
        this.wanjia.addEventListener("click", function () {
            this.isAI = false;
            this._clear();
            this.neirong.classList.add("show")
            this.wanjia.classList.add("moshi2");
            this.AI.classList.remove("moshi2");
        }.bind(this))
    }

    //AI 模式点击事件
    ai() {
        this.AI.addEventListener("click", function () {
            this.isAI = true;
            this._clear();
            this.neirong.classList.add("show")
            this.AI.classList.add("moshi2");
            this.wanjia.classList.remove("moshi2");
        }.bind(this));
    }

    //重新开始点击事件
    chongxin() {
        this.set.addEventListener("click", function () {
            this._clear()
        }.bind(this));
    }


    //音乐点击事件
    music1() {
        this.set1.addEventListener("click", function () {
            if (this.flag2) {
                this.music.style.animationPlayState = "paused";
                this.audio.pause();
                this.set1.innerHTML = "音乐：开"
            } else {
                this.music.style.animationPlayState = "running";
                this.audio.play();
                this.set1.innerHTML = "音乐：关"
            }
            this.flag2 = !this.flag2;
        }.bind(this))

    }

    //下载棋谱点击事件
    xiazai1() {
        this.output.addEventListener("click", function () {
            if (this.flag3) {
                this.imgbox.style.display = "block";
                this.anniu.style.display="block";
                let url = this.canvas.toDataURL();
                let newimg = new Image();
                newimg.src = url;
                this.imgbox.appendChild(newimg);
                this.xiazai.href = url;
                this.xiazai.setAttribute("download", "棋谱.png")
            }
            this.flag3 = false;
        }.bind(this))
    }
}

let wuziqi1 = new Game();
wuziqi1.start();
wuziqi1.xiaqi();
wuziqi1.wanjia1();
wuziqi1.ai();
wuziqi1.chongxin();
wuziqi1.music1();
wuziqi1.xiazai1();
