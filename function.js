// 选项卡函数
//  a 获取到移入的元素
//  b 获取到移入之后显示的元素
let xuan = function (a, b) {
    for (let i = 0; i < a.length; i++) {
        a[i].onmouseover = function () {
            for (let j = 0; j < b.length; j++) {
                b[j].style.display = "none";
            }
            b[i].style.display = "block";
        }
        a[i].onmouseout = function () {
            b[i].style.display = "none";
        }
    }
}

// 遮罩函数
// a 获取到要移入的元素
// b 获取到移入a元素上显示的遮罩元素
let zhe = function (a, b) {
    a.onmouseover = function () {
        b.style.display = "block";
    }
    a.onmouseout = function () {
        b.style.display = "none";
    }
}

// 层级轮播图函数
// imgs 获取到所有图的元素
// bots 获取到所有点的元素
// at 轮播点选中状态的类名
// max 要轮播的图的数量
// con 获取到移入之后停止自动轮播的元素
// time 轮播图切换一次的时间
let Zlunbo = function (imgs, bots, at, max, con, time) {
    imgs[0].style.zIndex = "2";
    bots[0].classList.add("at");
    for (let i = 0; i < bots.length; i++) {
        bots[i].onmouseover = function () {
            for (let j = 0; j < bots.length; j++) {
                imgs[j].style.zIndex = "1";
                bots[j].classList.remove("at");
            }
            imgs[i].style.zIndex = "2";
            bots[i].classList.add("at");
            num = i;
        }
    }
    let t = setInterval(move, 3000);
    let num = 0;

    function move() {
        num++;
        if (num == max) {
            num = 0;
        }
        for (let i = 0; i < bots.length; i++) {
            imgs[i].style.zIndex = "1";
            bots[i].classList.remove("at");
        }
        imgs[num].style.zIndex = "2";
        bots[num].classList.add("at");
    }

    con.onmouseover = function () {
        clearInterval(t);
    }
    con.onmouseout = function () {
        t = setInterval(move, time);
    }
}
// 透明度轮播图函数
// imgs 获取到所有图的元素
// bots 获取到所有点的元素
// at 轮播点选中状态的类名
// max 要轮播的图的数量
// con 获取到移入之后停止自动轮播的元素
// time 轮播图切换一次的时间
let Olunbo = function (imgs, bots, at, max, con, time) {
    imgs[0].style.opacity = "1";
    bots[0].classList.add("at");
    for (let i = 0; i < bots.length; i++) {
        bots[i].onmouseover = function () {
            for (let j = 0; j < bots.length; j++) {
                imgs[j].style.opacity = "0";
                bots[j].classList.remove("at");
            }
            imgs[i].style.opacity = "1";
            bots[i].classList.add("at");
            num = i;
        }
    }
    let t = setInterval(move, 3000);
    let num = 0;

    function move() {
        num++;
        if (num == max) {
            num = 0;
        }
        for (let i = 0; i < bots.length; i++) {
            imgs[i].style.opacity = "0";
            bots[i].classList.remove("at");
        }
        imgs[num].style.opacity = "1";
        bots[num].classList.add("at");
    }

    con.onmouseover = function () {
        clearInterval(t);
    }
    con.onmouseout = function () {
        t = setInterval(move, time);
    }
}

// 轮播点单击时
// lis 获取到所有点的元素
// btn 轮播点选中状态的类名
let Onbot = function (lis, btn) {
    // 1.遍历获取到的元素列表
    for (let i = 0; i < lis.length; i++) {
        lis[i].onclick = function () {
            // 2.当点击时每一个li进行的操作
            for (let j = 0; j < lis.length; j++) {
                lis[j].classList.remove("btn");
            }
            // 3.点击的li进行的操作
            lis[i].classList.add("btn");
        }
    }
}

// 双下标轮播函数/左右轮播函数
// imgs：获取到所有图片的元素
// bots：获取到所有店的元素
// con：获取到移入之后停止自动轮播的元素
// left：获取到左箭头的元素
// right：获取到右箭头的元素
// widths：轮播图的宽度，整数
// at 轮播点选中状态的类名
// time 轮播图切换一次的时间
function banner_LR(imgs, bots, con, left, right, widths, at, time = "2000") {
    imgs[0].style.left = "0";
    bots[0].classList.add("at");
    let now = 0;
    let next = 0;
    // 开关：控制快速点击时图片会快速轮播的现象
    // 默认是打开，左右箭头可以点击
    let flag = true;
    let t = setInterval(move, time);

    function move() {
        next++;
        if (next == imgs.length) {
            next = 0;
        }
        imgs[next].style.left = widths + "px";
        animate(imgs[now], {left: -widths});
        animate(imgs[next], {left: 0}, function () {
            flag = true;
        });
        bots[now].classList.remove("at");
        bots[next].classList.add("at");
        now = next;
    }

    con.onmouseover = function () {
        clearInterval(t);
    }
    con.onmouseout = function () {
        t = setInterval(move, time);
    }

    function movel() {
        next--;
        if (next < 0) {
            next = imgs.length - 1;
        }
        imgs[next].style.left = -widths + "px";
        animate(imgs[now], {left: widths});
        animate(imgs[next], {left: 0}, function () {
            flag = true;
        });
        bots[now].classList.remove("at");
        bots[next].classList.add("at");
        now = next;
    }

    left.onclick = function () {
        // 判断开关是否开启
        // 开关开启，则！flag=false，不执行return,执行flag=false和movel，move执行完flag=true

        if (!flag) {
            return;
        }
        flag = false;
        movel();
    }
    right.onclick = function () {
        // 判断开关是否开启
        // 开关开启，则！flag=false，不执行return,执行flag=false和movel，move执行完flag=true
        if (!flag) {
            return;
        }
        flag = false;
        move();
    }

    for (let i = 0; i < bots.length; i++) {
        bots[i].onmouseover = function () {
            if (i == now) {
                return;
            }
            else if (i > now) {
                imgs[i].style.left = widths + "px";
                animate(imgs[now], {left: -widths});
                animate(imgs[i], {left: 0}, function () {
                    flag = true;
                });
                bots[now].classList.remove("at");
                bots[i].classList.add("at");
                now = next = i;
            }
            else{
                imgs[i].style.left = -widths + "px";
                animate(imgs[now], {left: widths});
                animate(imgs[i], {left: 0});
                bots[now].classList.remove("at");
                bots[i].classList.add("at");
                now = next = i;
            }
        }
    }

    window.onblur = function () {
        clearInterval(t);
    }
    window.onfocus = function () {
        t = setInterval(move, time);
    }
}





