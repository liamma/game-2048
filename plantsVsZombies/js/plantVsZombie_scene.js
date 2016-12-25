function init() {
    var newPlant = new Plant();
    newPlant.putPlant();

    var newZombie = new Zombie();
    newZombie.walk();
}
// create Plant
function Plant() {
    this.blood = 4;
    // get create plant
    this.getPlant = this.init();
    this.getPlantsDiv = $('#plants');
}

Plant.prototype.init = function() {
    var createPlant = document.createElement('div');
    $(createPlant).html('<img src="images/interface/plantshadow32.png" style="left:-12px;top:49px;"><img src="images/plant/Peashooter.gif">');
    return createPlant;
}

Plant.prototype.putPlant = function(left, top) {
    $(this.createPlant).css('left', (left || 500) + 'px');
    $(this.createPlant).css('top', (top || 294) + 'px');
    this.getPlantsDiv[0].appendChild(this.getPlant);
}

Plant.prototype.createBullet = function() {
    var bullet = document.createElement('img');
    $(bullet).css('src', 'images/plant/PB00.gif');
    $(bullet).css('position', 'absolute');
    $(bullet).css('left', this.getPlant.offsetLeft + 30 + 'px');
    $(bullet).css('top', this.getPlant.offsetTop - 3 + 'px');
    $(bullet).css('zIndex', 998);
    this.getPlantsDiv[0].appendChild(bullet);
    return bullet;
}

Plant.prototype.shoot = function() {
    setInterval(function() {
        var bullet = this.createBullet();
        this.shooterTimer = setInterval(function() {
            $(bullet).css('left', bullet.offsetLeft + 11 + 'px');
        }, 80);
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
    this.blood = 10;
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
    // 注意，在setInterval中，作用域会改变
    var that = this;
    setInterval(function() {
        $(that.getZombie).css('left', that.getZombie.offsetLeft - 1 + 'px');
    }, 30);
}
init();
