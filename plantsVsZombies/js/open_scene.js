function init() {
    // 背景平移
    moveBackGround();
}

function moveBackGround() {
    var $backGround = $('#backGround'),
        moveX = 0,
        timer;
    timer = setInterval(function() {
        moveX = moveX - 20;
        $backGround.css("background-position", moveX + "px 0px");
        if (moveX <= -500) {
            clearInterval(timer);
            // 创建僵尸
            createZombies();
            // 草坪平铺
            grassTiled();
        }
    }, 30);
}

function createZombies() {
    for (var zombieNum = 0; zombieNum < 5; zombieNum++) {
        var zombie = document.createElement("div");
        zombie.style.position = 'absolute';
        zombie.style.left = Math.random() * ($('#zombies')[0].offsetWidth - 166) + 'px';
        zombie.style.top = Math.random() * ($('#zombies')[0].offsetHeight - 144) + 'px';
        zombie.zIndex = 1;
        zombie.innerHTML = '<img src="images/interface/plantshadow32.png" style="position:absolute;left:72px;top:122px">' +
            '<img src="images/Zombies/Zombie/1.gif" style="position:absolute;left:10px;top:0px">';
        $('#zombies')[0].appendChild(zombie);
    }
}

function grassTiled() {
    // 2秒时间返回原来位置
    setTimeout(function() {
        $('#zombies').css('left', '1065px');
        $('#backGround').css('background-position', '-115px 0px');

        // 草坪平铺逻辑
        var grass = document.createElement('div');
        grass.style.position = 'absolute';
        grass.style.height = '117px';
        grass.style.width = '70px';
        grass.style.top = '280px';
        grass.style.left = '132px';
        grass.style.zIndex = 1;
        grass.style.background = 'url(images/interface/sod1row.png) no-repeat 0px 0px';
        $('#mainPanel')[0].appendChild(grass);

        var grassRoll = document.createElement('img');
        grassRoll.src = 'images/interface/sodRoll.png';
        grassRoll.style.position = 'absolute';
        grassRoll.style.height = '141px';
        grassRoll.style.width = '68px';
        grassRoll.style.top = '250px';
        grassRoll.style.left = '132px';
        grassRoll.style.zIndex = 1;
        $('#mainPanel')[0].appendChild(grassRoll);

        var grassCap = document.createElement('img');
        grassCap.src = 'images/interface/sodRollCap.png';
        grassCap.style.position = 'absolute';
        grassCap.style.height = '71px';
        grassCap.style.width = '73px';
        grassCap.style.top = '345px';
        grassCap.style.left = '132px';
        grassCap.style.zIndex = 1;
        $('#mainPanel')[0].appendChild(grassCap);

        var grassRollWeight = 20,
            tempL = 1,
            grassTimer;
        grassTimer = setInterval(function() {
            grass.style.width = grass.offsetWidth + grassRollWeight + 'px';
            grassRoll.style.left = grassRoll.offsetLeft + grassRollWeight + tempL + 'px';
            grassCap.style.left = grassCap.offsetLeft + grassRollWeight + tempL + 'px';

            grassRoll.style.width = grassRoll.offsetWidth - tempL + 'px';
            grassCap.style.width = grassCap.offsetWidth - tempL + 'px';
            grassCap.style.height = grassCap.offsetHeight - tempL + 'px';
            grassCap.style.top = grassCap.offsetTop + tempL + 'px';

            if (grass.offsetWidth >= 755) {
                clearInterval(grassTimer);
                $('#mainPanel')[0].removeChild(grassRoll);
                $('#mainPanel')[0].removeChild(grassCap);
            }
        }, 30);
    }, 2000);
}

init();
