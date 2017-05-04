var canvasObj = $('#myCanvas')[0],
    ctx = canvasObj.getContext('2d'),
    axleBallX = 200,
    axleBallY = 150,
    axleBallRadius = 50,
    getWaitBalls,
    level,
    levelArray,
    getRotatBall = [],
    getWaitBalls = [],
    // 提取出waitBallY，作为点击页面是移动距离
    waitBallY = axleBallY + axleBallRadius + 200,
    state;

// 定义关卡
if (parseInt(window.location.href.split("#")[1])) {
    level = parseInt(window.location.href.split("#")[1]);
} else {
    level = 1;
}

// 定义关卡信息
levelArray = [
    { "initNum": 1, "waitNum": 5, "speed": 200 },
    { "initNum": 4, "waitNum": 8, "speed": 180 },
    { "initNum": 5, "waitNum": 5, "speed": 160 },
    { "initNum": 3, "waitNum": 5, "speed": 140 },
    { "initNum": 4, "waitNum": 8, "speed": 120 },
    { "initNum": 5, "waitNum": 5, "speed": 100 },
    { "initNum": 6, "waitNum": 7, "speed": 90 }
];

/* 这样写错误，返回一个对象，不能修改对象里面的值进行变化
getRotatBall = function() {
        var rotatBalls = [],
            initNum = levelArray[level - 1].initNum,
            // 旋转角度
            angle;

        for (var i = initNum; i > 0; i--) {
            angle = 360 / initNum * i;
            rotatBalls.push({ "angle": angle });
        }
        return rotatBalls;
    }

getWaitBalls = function() {
    var waitBalls = [];
    for (var i = levelArray[level - 1].waitNum; i > 0; i--) {
        waitBalls.push({ "ballFlag": i });
    }
    return waitBalls;
}
*/

// 封装转动球
for (var i = levelArray[level - 1].initNum; i > 0; i--) {
    getRotatBall.push({ "angle": 360 / (levelArray[level - 1].initNum) * i });
}

// 封装等待球
for (var i = levelArray[level - 1].waitNum; i > 0; i--) {
    getWaitBalls.push({ "ballFlag": i, "angle": "" });
}

// 绘制轴球，里面包含关卡信息
function drawAxleBall() {
    ctx.beginPath();
    ctx.arc(axleBallX, axleBallY, axleBallRadius, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fillStyle = "black";
    ctx.fill();

    ctx.font = "60px sans-serif";
    ctx.fillStyle = "#EED5B7";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(level, axleBallX - 2, axleBallY + 3);

}

// 绘制转动球，附载在轴球上
function drawRotatingBall(deg) {
    var lineLength = 80,
        cricleAngle,
        lineEndX,
        lineEndY,
        rotatBallRadius = 10;
    getRotatBall.forEach(function(item, index) {
        // 这里save的为绘制轴球时，fillText中的内容。
        ctx.save();
        ctx.beginPath();
        ctx.globalCompositeOperation = 'destination-over';
        //增加旋转角度
        item.angle += deg;
        if (item.angle >= 360)
            item.angle = 0;
        ctx.moveTo(axleBallX, axleBallY);
        // sin = y/r, cos = x/r
        cricleAngle = 2 * Math.PI * (item.angle / 360);
        lineEndX = axleBallX + (lineLength + axleBallRadius) * Math.cos(cricleAngle);
        lineEndY = axleBallY + (lineLength + axleBallRadius) * Math.sin(cricleAngle);
        ctx.lineTo(lineEndX, lineEndY);
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(lineEndX, lineEndY, rotatBallRadius, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.fillStyle = 'black';
        ctx.fill();
        ctx.restore();
    });
}　

// 绘制等待球
function drawWaitingBall() {
    var waitBallRadius = 10,
        waitBallX = axleBallX;
    ctx.clearRect(0, 345, 800, 1000);

    getWaitBalls.forEach(function(item, index) {
        ctx.beginPath();
        ctx.arc(waitBallX, waitBallY, waitBallRadius, 0, 2 * Math.PI, false);
        ctx.closePath();

        ctx.fillStyle = "black";
        ctx.fill();

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "15px sans-serif";
        ctx.fillStyle = "#fff";
        ctx.fillText(item.ballFlag, waitBallX, waitBallY);

        waitBallY += waitBallRadius + 20;
    });
}

// 初始化信息
function init(deg) {
    ctx.clearRect(0, 0, 800, 1000);
    drawRotatingBall(deg);
    drawWaitingBall();
    drawAxleBall();
}

init(0);

// 实现球转动，clearReact刷新和改变角度实现移动效果
setInterval(function() {
    ctx.clearRect(0, 0, 800, 350);
    drawAxleBall();
    drawRotatingBall(10);
}, levelArray[level - 1].speed);


// 实现点击触发事件
$(document).click(function() {
    var removeWaitingBall,
        isFaild;

    if (getWaitBalls.length == 0) return;
    drawWaitingBall();

    //等待球顶部移除一个，并返回值
    removeWaitingBall = getWaitBalls.shift();
    //设置移除的等待球的角度
    removeWaitingBall.angle = 90;
    //成功或失败跳出循环
    isFaild = true;
    //-----------判断是否闯关成功-------------
    getRotatBall.forEach(function(item, index) {
        if (!isFaild) return;
        if (Math.abs(item.angle - removeWaitingBall.angle) / 2 < 360 * 10 / ((axleBallRadius + 80) * Math.PI)) {
            state = 0;
            isFaild = false;
        } else if (index === getRotatBall.length - 1 && getWaitBalls.length === 0) {
            isFaild = false;
            state = 1;
        }
    });
    getRotatBall.push(removeWaitingBall);
    waitBallY = axleBallY + axleBallRadius + 200;

    drawWaitingBall();
    drawRotatingBall(0);

    if (state == 0) {
        alert("闯关失败");
        window.location.href = "index.html#" + level;
    } else if (state == 1) {
        alert("闯关成功");
        level++;
        window.location.href = "index.html#" + level;
    }

});
