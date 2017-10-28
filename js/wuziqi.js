let kaishi = document.querySelector(".kaishi");
let neirong = document.querySelector(".neirong");
let canvas = document.querySelector("canvas");
let AI = document.querySelector(".moshi1");
let wanjia = document.querySelector(".moshi");
let kongzhi = document.querySelector(".kongzhi")
let youximoshi = document.querySelector(".youximoshi");
let mask = document.querySelector(".mask");
let h = document.querySelector(".mask h1");
let set = document.querySelector(".set");
let isAI = false;
let flag = true;
let pos = {};
let blank = {};
let output = document.querySelector(".qipu");
let imgbox = document.querySelector(".imgbox");
let xiazai = document.querySelector(".mask a");
let flag3 = true;
let w = 40;
let huabi = canvas.getContext("2d");
let music = document.querySelector(".yinyue");
let audio = document.querySelector("audio");
let set1 = document.querySelector(".set1");
let flag2 = true;
//游戏开始点击事件
kaishi.onclick = function () {
    neirong.classList.add("show")
    kaishi.style.display = "none";
    kongzhi.style.display = "block";
    youximoshi.classList.add("moshi3");
    wanjia.classList.add("moshi2");
};
//生成棋盘函数
function qipan() {
    huabi.beginPath();
    for (let a = 1; a < 14; a++) {
        huabi.save()
        huabi.lineWidth = 1;
        huabi.moveTo(20.5, a * w + 20.5);
        huabi.lineTo(580, a * w + 20.5);
        huabi.moveTo(a * w + 20.5, 20.5);
        huabi.lineTo(a * w + 20.5, 580);
        huabi.stroke();
        huabi.restore();
        huabi.rect(20.5, 20.5, 560, 560);
        for (let i = 0; i < 15; i++) {
            for (let b = 0; b < 15; b++) {
                blank[j(i, b)] = true;
            }
        }

    }
    dian(3, 3);
    dian(7, 7);
    dian(3, 11);
    dian(11, 3);
    dian(11, 11);

    function dian(x, y) {
        huabi.save();
        huabi.beginPath();
        huabi.translate(x * w, y * w)
        huabi.arc(20.5, 20.5, 6, 0, 2 * Math.PI);
        huabi.fill();
        huabi.restore();
    }
}
qipan();
//生成棋子函数
function qizi(x, y, color) {
    huabi.save();
    huabi.beginPath();
    huabi.fillStyle = color;
    huabi.arc(x * w + 20, y * w + 20, 15, 0, 2 * Math.PI);
    huabi.fill();
    huabi.restore();
    pos[j(x, y)] = color;
    delete blank[j(x, y)];


}
//生成棋子事件
canvas.onclick = function (e) {
    let x = Math.round((e.offsetX - 20) / w);
    let y = Math.round((e.offsetY - 20) / w);
    if (pos[j(x, y)]) {
        return
    }
    if (flag) {
        qizi(x, y, "#000");
        if (guize(x, y, "#000") === 5) {
            over("黑")


        }
        if (isAI) {
            let p = getpos();
            qizi(p.x, p.y, "#fff");
            if (guize(p.x, p.y, "#fff") === 5) {
                over("白")
            }
            return;
        }

    } else {
        qizi(x, y, "#fff");
        if (guize(x, y, "#fff") === 5) {
            over("白")
        }


    }
    flag = !flag;

};
//辅助j属性
function j(x, y) {
    return x + "_" + y;
}
//游戏规则
function guize(x, y, color) {
    let row = 1;
    let col = 1;
    let row1 = 1;
    let col1 = 1;
    let i = 1;
    while (pos[j(x + i, y)] === color) {
        row++;
        i++;
    }
    i = 1;
    while (pos[j(x - i, y)] === color) {
        row++;
        i++;
    }
    i = 1;
    while (pos[j(x, y + i)] === color) {
        col++;
        i++;
    }
    i = 1;
    while (pos[j(x, y - i)] === color) {
        col++;
        i++;
    }
    i = 1;
    while (pos[j(x + i, y - i)] === color) {
        row1++;
        i++;
    }
    i = 1;

    while (pos[j(x - i, y + i)] === color) {
        row1++;
        i++;
    }
    i = 1;
    while (pos[j(x + i, y + i)] === color) {
        col1++;
        i++;
    }
    i = 1;
    while (pos[j(x - i, y - i)] === color) {
        col1++;
        i++;
    }
    return Math.max(row, row1, col, col1);
}
//玩家模式点击事件
wanjia.onclick = function () {
    isAI = false;
    clear();
    neirong.classList.add("show")
    wanjia.classList.add("moshi2");
    AI.classList.remove("moshi2");
}
//AI 模式点击事件
AI.onclick = function () {
    isAI = true;
    clear();
    neirong.classList.add("show")
    AI.classList.add("moshi2");
    wanjia.classList.remove("moshi2");
}
//AI智能设置
function getpos() {
    let max = 0;
    let pos1 = {};
    for (let i in blank) {
        let x = parseInt(i.split("_")[0]);
        let y = parseInt(i.split("_")[1]);
        let changdu = guize(x, y, "#fff");
        if (changdu > max) {
            max = changdu;
            pos1 = {x, y}
        }
    }
    let max2 = 0
    let pos2 = {};
    for (let i in blank) {
        let x = parseInt(i.split("_")[0]);
        let y = parseInt(i.split("_")[1]);
        let changdu = guize(x, y, "#000");
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
//游戏结束函数
function over(name) {
    mask.style.display = "block";
    h.innerHTML = "<h1>" + name + "棋获胜</h1>"
}
//游戏结束事件
set.onclick = function () {
    clear()
};
//恢复默认函数
function clear() {
    mask.style.display = "none";
    neirong.classList.remove("show");
    huabi.clearRect(0, 0, 640, 640)
    pos = {};
    qipan();
}
//音乐点击事件
set1.onclick = function () {
    if (flag2) {
        music.style.animationPlayState = "paused";
        audio.pause();
        set1.innerHTML = "音乐：开"
    } else {
        music.style.animationPlayState = "running";
        audio.play();
        set1.innerHTML = "音乐：关"
    }
    flag2 = !flag2;
}
//下载棋谱点击事件
output.onclick = function () {
    if (flag3) {
        imgbox.style.display = "block";
        let url = canvas.toDataURL();
        let newimg = new Image();
        newimg.src = url;
        imgbox.appendChild(newimg);
        xiazai.href = url;
        xiazai.setAttribute("download", "棋谱.png")
    }
    flag3 = false;
}
