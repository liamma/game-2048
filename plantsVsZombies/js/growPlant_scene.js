function init() {
    // 取消主面板右键显示菜单行为
    $('#mainPanel')[0].oncontextmenu = function() {
        return false;
    }
}

$('#cardList').click(function() {
    var mainPanel = $('#mainPanel');
    createShooter(mainPanel);
    cardTurnGray(mainPanel);
});

function createShooter(mainPanel) {
    var shooter = document.createElement('img');
    shooter.src = 'images/Peashooter.gif';
    // 之前以id来取元素，但是会发生错误，以创建元素来取
    // shooter.id = 'shooter';
    shooter.style.position = 'absolute';
    shooter.style.zIndex = 999;
    shooter.style.left = '0px';
    shooter.style.top = '0px';
    mainPanel[0].appendChild(shooter);
    // 创建阴影shooter
    var shooter_transp = document.createElement('img');
    shooter_transp.src = 'images/Peashooter.gif';
    // shooter_transp.id = 'shooter_transp';
    shooter_transp.style.position = 'absolute';
    shooter_transp.style.zIndex = 998;
    shooter_transp.style.left = '0px';
    shooter_transp.style.top = '0px';
    shooter_transp.style.opacity = 0.8;
    shooter_transp.style.filter = 'alpha(opacity=80)';
    shooter_transp.style.display = 'none';
    mainPanel[0].appendChild(shooter_transp);
    plantMove(shooter, shooter_transp);
}

function cardTurnGray(mainPanel) {
    $('#img2').css('visibility', 'hidden');
}

function plantMove(shooter, shooter_transp) {
    $(document).bind('mousemove', function(event) {
        // 这里要判断shooter 是否为null，否则删除shooter元素后，再移动鼠标会报错
        if (shooter) {
            $(shooter).css('left', event.clientX - shooter.offsetWidth / 2 + 'px');
            $(shooter).css('top', event.clientY - shooter.offsetHeight / 2 + 'px');
        }
        // 不在草地
        if (event.clientY < $('#grass')[0].offsetTop || event.clientY > ($('#grass')[0].offsetTop + $('#grass')[0].offsetHeight)) {
            // 注意，这里需要解除绑定后，然后重新绑定，不然同一个元素会发生问题
            $(shooter).unbind('click').bind('click', function() {
                outGrassScene(shooter, shooter_transp);
            });
            // 绑定右键行为
            $(shooter).unbind('contextmenu').bind('contextmenu', function() {
                outGrassScene(shooter, shooter_transp);
            });
        } else {
            $(shooter_transp).css('display', 'block');
            $(shooter_transp).css('top', $('#grass')[0].offsetTop + $('#grass')[0].offsetHeight / 2 - shooter_transp.offsetHeight / 2 - 15 + 'px');

            var oneBlockGrassWidth = $('#grass')[0].offsetWidth / 9;
            if (event.clientX < $('#grass')[0].offsetLeft + oneBlockGrassWidth)
                $(shooter_transp).css('left', $('#grass')[0].offsetLeft + oneBlockGrassWidth / 2 - shooter_transp.offsetWidth / 2 + 'px');
            if (event.clientX > $('#grass')[0].offsetLeft + 8 * oneBlockGrassWidth)
                $(shooter_transp).css('left', $('#grass')[0].offsetLeft + 8.3 * oneBlockGrassWidth - shooter_transp.offsetWidth / 2 + 'px');
            else {
                for (var i = 1; i < 8; i++) {
                    if (event.clientX > $('#grass')[0].offsetLeft + i * oneBlockGrassWidth && event.clientX < $('#grass')[0].offsetLeft + (i + 1) * oneBlockGrassWidth)
                        $(shooter_transp).css('left', $('#grass')[0].offsetLeft + oneBlockGrassWidth * (i + 1) - oneBlockGrassWidth / 2 - shooter_transp.offsetWidth / 2 + 'px');
                }
            }
            // 这里同样，处理在草地上点击左右键分别处理场景
            $(shooter).unbind('click').bind('click', function() {
                inGrassScene(shooter, shooter_transp);
            });
            $(shooter).unbind('contextmenu').bind('contextmenu', function() {
                inGrassScene(shooter, shooter_transp);
            });
        }
    });
}

/* 不在草地上场景逻辑*/
function outGrassScene(shooter, shooter_transp) {
    // 最好手动取消一下事件
    $(document).unbind('mousemove');
    $(shooter).remove();
    $(shooter_transp).remove();
    $('#img2').css('visibility', 'visible');
}

/*在草地上场景逻辑*/
function inGrassScene(shooter, shooter_transp) {
    $(shooter).css('left', shooter_transp.offsetLeft + 'px');
    $(shooter).css('top', shooter_transp.offsetTop + 'px');
    // 这里需要主动取消mousemove事件，不然图片还会跟随植物移动
    $(document).unbind('mousemove');
    $(shooter_transp).remove();
    $('#img2').css('visibility', 'visible');
}

init();
