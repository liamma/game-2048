function init() {
    var autoPickUp = false;
    setInterval(function() {
        createSun(autoPickUp);
    }, 3000);
}

function createSun(autoPickUp) {
    var sun = document.createElement('img');
    sun.src = 'images/interface/Sun.gif';
    sun.style.position = 'absolute';
    sun.style.cursor = 'pointer';
    sun.style.zIndex = 25;
    sun.style.opacity = 0.8;
    sun.style.filter = 'alpha(opacity=80)';
    sun.style.height = '78px';
    sun.style.width = '78px';
    sun.style.left = Math.random() * ($('#mainPanel')[0].offsetWidth - 78) + 'px';
    // 设置高度，使阳关缓慢掉落
    var currentHeight = Math.random() * ($('#mainPanel')[0].offsetHeight - sun.offsetHeight),
        drapTimer,
        tempN = 1;
    drapTimer = setInterval(function() {
        sun.style.top = sun.offsetTop + tempN + 'px';
        if (sun.offsetTop >= currentHeight) {
            clearInterval(drapTimer);
            drapTimer = null;
            setTimeout(function() {
                if (autoPickUp) sun.onclick();
                else sun.remove();
            }, 3000);
        }
    }, 20);
    $('#mainPanel')[0].appendChild(sun);
    // 点击阳光触发事件
    clickSun(sun, drapTimer);
}

function clickSun(sun, drapTimer) {
    sun.onclick = function(event) {
        /* Act on the event */
        if (drapTimer != null) clearInterval(drapTimer);
        var lineA = sun.offsetLeft - 80 + sun.offsetWidth / 2,
            lineB = sun.offsetTop - 20 + sun.offsetHeight / 2,
            lineC = Math.sqrt(lineA * lineA + lineB * lineB),
            speedX = lineA / lineC,
            speedY = lineB / lineC,
            speed = 20,
            clickSunTimer;

        clickSunTimer = setInterval(function() {
            sun.style.left = sun.offsetLeft - speedX * speed + 'px';
            sun.style.top = sun.offsetTop - speedY * speed + 'px';
            if (sun.offsetLeft <= 80 || sun.offsetTop <= -20) {
                clearInterval(clickSunTimer);
                sun.style.left = '80px';
                sun.style.top = '-20px';
                // 阳光到达记分牌后消失
                sunDisappearedFromScoreboard(sun);
            }
        }, 30);
    };
}

function sunDisappearedFromScoreboard(sun) {
    setTimeout(function() {
        sun.remove();
        var currentNum = Number($('#scoreNum').html());
        currentNum += 25;
        $('#scoreNum').html(currentNum);
    }, 500);
}

init();
