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

init();
