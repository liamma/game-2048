function init() {

    var newZombie = new Zombie();
    newZombie.walk();
    var newPlant = new Plant();
    newPlant.putPlant(500);
    newPlant.shoot(newZombie);
}
// create Plant
function Plant() {
    this.blood = 4;
    this.getPlantsDiv = $('#plants');
    this.getZombieDiv = $('#zombies');
    // get create plant
    this.getPlant = this.init();

}

Plant.prototype.init = function() {
    var createPlant = document.createElement('div');
    $(createPlant).html('<img src="images/interface/plantshadow32.png" style="left:-12px;top:49px;"><img src="images/plant/Peashooter.gif">');
    return createPlant;
}

Plant.prototype.putPlant = function(left, top) {
    $(this.getPlant).css('left', (left || 500) + 'px');
    $(this.getPlant).css('top', (top || 294) + 'px');
    this.getPlantsDiv[0].appendChild(this.getPlant);
}

Plant.prototype.createBullet = function() {
    var bullet = document.createElement('img');
    $(bullet).attr('src', 'images/plant/PB00.gif');
    $(bullet).css('position', 'absolute');
    $(bullet).css('left', this.getPlant.offsetLeft + 30 + 'px');
    $(bullet).css('top', this.getPlant.offsetTop - 3 + 'px');
    // 这里注意，不仅需要放在zombie容器中，还有zIndex的层叠的数目，层叠数越大，图片越靠前
    $(bullet).css('zIndex', 9998);
    this.getZombieDiv[0].appendChild(bullet);
    return bullet;
}

Plant.prototype.shoot = function(zombie) {
    // 处理作用域问题
    var that = this;
    that.shooterTimer = setInterval(function() {
        var bullet = that.createBullet();
        bullet.timer = setInterval(function() {
            $(bullet).css('left', bullet.offsetLeft + 11 + 'px');
            if (bullet.offsetLeft >= zombie.getZombie.offsetLeft + 45) {
                clearInterval(bullet.timer);
                bullet.timer = null;
                bullet.src = 'images/plant/PeaBulletHit.gif';
                setTimeout(function() {
                    $(bullet).remove();
                }, 300);
                zombie.blood--;
            }
            if ((zombie.getZombie.offsetLeft + 10) <= (that.getPlant.offsetLeft + that.getPlant.offsetWidth) && zombie.blood >= 0 && that.blood >= 0) {
                that.blood--;
                // 对于僵尸而言
                if (zombie.blood > 2) zombie.eatPlant();
                else if (zombie.blood == 2) {
                    zombie.lostHead();
                    zombie.eatPlantNoHead();
                } else if (zombie.blood == 1) zombie.down();
                else if (zombie.blood == 0) {
                    debugger
                    that.stopShoot();
                    zombie.die();
                }
                // 对于植物而言
                if (that.blood == 0) {
                    that.stopShoot();
                    that.die();
                    if (zombie.blood == 2) zombie.walkNoHead();
                    if (zombie.blood > 2) zombie.walk();
                    return;
                }
            } else {
                if (zombie.blood == 2) {
                    zombie.lostHead();
                    zombie.walkNoHead();
                } else if (zombie.blood == 1) {
                    zombie.down();
                } else if (zombie.blood == 0) {
                    that.stopShoot();
                    zombie.die();
                }

            }
        }, 20);
    }, 2000);
}

Plant.prototype.stopShoot = function() {
    clearInterval(this.shooterTimer);
    this.shooterTimer = null;
}

Plant.prototype.die = function() {
    this.stopShoot();
    $(this.getPlant).remove();
}

// create zombie
function Zombie() {
    // 注意，getZombieDiv 需要写在前面，不然在init中得不到
    this.blood = 5;
    this.getZombieDiv = $('#zombies');
    this.getZombie = this.init();
}

Zombie.prototype.init = function() {
    var createZombie = document.createElement('div');
    $(createZombie).css('left', '650px');
    $(createZombie).html('<img src= "images/interface/plantshadow32.png" style="position:absolute;left:72px;top:122px"> <img src="images/Zombies/Zombie/Zombie.gif">');
    this.getZombieDiv[0].appendChild(createZombie);
    return createZombie;
}

Zombie.prototype.walk = function() {
    $('img', $(this.getZombie))[1].src = 'images/Zombies/Zombie/Zombie.gif';
    // 注意，在setInterval中，作用域会改变
    var that = this;
    that.walkTimer = setInterval(function() {
        $(that.getZombie).css('left', that.getZombie.offsetLeft - 1 + 'px');
    }, 60);
}
Zombie.prototype.walkNoHead = function() {
    // get replace zombie picture
    // 通过jquery作用域，获取到第二张图片
    $('img', $(this.getZombie))[1].src = 'images/Zombies/Zombie/ZombieLostHead.gif';
    var that = this;
    that.walkTimer = setInterval(function() {
        $(that.getZombie).css('left', that.getZombie.offsetLeft - 1 + 'px');
    }, 60);
}

Zombie.prototype.lostHead = function() {
    var lostHead = document.createElement('img');
    // 注意设置属性和css的区别
    $(lostHead).attr('src', 'images/Zombies/Zombie/ZombieHead.gif');
    $(lostHead).css('position', 'absolute');
    $(lostHead).css('zIndex', 889);
    $(lostHead).css('left', this.getZombie.offsetLeft + 'px');
    $(lostHead).css('top', this.getZombie.offsetTop + 'px');
    this.getZombieDiv[0].appendChild(lostHead);
    setTimeout(function() {
        $(lostHead).remove();
    }, 1500);
}

Zombie.prototype.stopWalk = function() {
    clearInterval(this.walkTimer);
    this.walkTimer = null;
}

Zombie.prototype.eatPlant = function() {
    this.stopWalk();
    $('img', $(this.getZombie))[1].src = 'images/Zombies/Zombie/ZombieAttack.gif';
}

Zombie.prototype.eatPlantNoHead = function() {
    this.stopWalk();
    $('img', $(this.getZombie))[1].src = 'images/Zombies/Zombie/ZombieLostHeadAttack.gif';
}

Zombie.prototype.down = function() {
    this.stopWalk();
    $('img', $(this.getZombie))[1].src = 'images/Zombies/Zombie/ZombieDie.gif';
}

Zombie.prototype.die = function() {
    this.stopWalk();
    $(this.getZombie).remove();
}

init();
