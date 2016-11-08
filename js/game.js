$("#startGame").click(function() {
    $("#startGame").hide();
});

// create game Constructor
// getSelectGrid is div
function Game2048(getSelectGrid) {
    this.getSelectGrid = getSelectGrid;
    // create 4*4 array
    this.tiles = new Array(16);
}
Game2048.prototype = {
    init: function() {
        // craete 16 tile
        for (var i = 0; i < this.tiles.length; i++) {
            // init is 0
            var tile = this.newTile(0);
            tile.setAttribute('id', i);
            this.getSelectGrid.append(tile);
            this.tiles[i] = tile;
        }
        this.randomTile();
        this.randomTile();
    },
    /*
        create one tile
        1.class tile is base css sheet
        2.class tile+num is num css sheet
        3.attr index is tile sort
        4.attr val is num
        */
    newTile: function(val) {
        var tile = document.createElement("div");
        this.setTileVal(tile, val);
        return tile;
    },
    setTileVal(tile, val) {
        tile.className = 'tile tile' + val;
        tile.setAttribute('val', val);
        tile.innerHTML = val > 0 ? val : '';
    },
    /*
    create a random num
    create num is 2 or 4
    */
    randomTile: function() {
        var eligibilityTiles = [];
        // Traversal and find eligibility tile
        for (var i = 0; i < this.tiles.length; i++) {
            if (this.tiles[i].getAttribute('val') == 0)
                eligibilityTiles.push(this.tiles[i]);
        }
        var randomTile = eligibilityTiles[Math.floor(Math.random() * eligibilityTiles.length)];
        this.setTileVal(randomTile, Math.random() < 0.5 ? 2 : 4);
    },
    move: function(keyNum) {
        switch (keyNum) {
            //top
            case 87:
            case 38:
                for (var i = 4; i < this.tiles.length; i++) {
                    var j = i;
                    while (j >= 4) {
                        this.merge(this.tiles[j - 4], this.tiles[j]);
                        j -= 4;
                    }
                }
                break;
                //down
            case 83:
            case 40:
                for (var i = 11; i >= 0; i--) {
                    var j = i;
                    while (j <= 11) {
                        this.merge(this.tiles[j + 4], this.tiles[j]);
                        j += 4;
                    }
                }
                break;
                //left
            case 37:
            case 65:
                for (var i = 1; i < this.tiles.length; i++) {
                    var j = i;
                    while (j % 4 != 0) {
                        this.merge(this.tiles[j - 1], this.tiles[j]);
                        j -= 1;
                    }
                }
                break;
                //right
            case 68:
            case 39:
                for (var i = 14; i >= 0; i--) {
                    var j = i;
                    while (j % 4 != 3) {
                        this.merge(this.tiles[j + 1], this.tiles[j]);
                        j += 1;
                    }
                }
                break;
        }
        this.randomTile();
    },
    merge: function(moveToTile, currentTile) {
        var moveToVal = moveToTile.getAttribute('val'),
            currentVal = currentTile.getAttribute('val');
        if (currentVal != 0) {
            if (moveToVal == 0) {
                this.setTileVal(moveToTile, currentVal);
                this.setTileVal(currentTile, 0);
            } else if (moveToVal == currentVal) {
                this.setTileVal(moveToTile, currentVal * 2);
                this.setTileVal(currentTile, 0);
            }
        }
    },
    max: function() {
        for (var i = 0; i < this.tiles.length; i++) {
            if (this.tiles[i].getAttribute('val') == 2048) {
                return true;
            }
        }
    },
    clean: function() {
        for (var i = 0; i < this.tiles.length; i++) {
            var getGameGrid = document.getElementById("game-grid");
            getGameGrid.removeChild(this.tiles[i]);
        }
        this.tiles = new Array(16);
    },
    equal: function(tile1, tile2) {
        return tile1.getAttribute('val') == tile2.getAttribute('val');
    },
    over: function() {
        for (var i = 0, len = this.tiles.length; i < len; i++) {
            if (this.tiles[i].getAttribute('val') == 0) {
                return false;
            }
            if (i % 4 != 3) {
                if (this.equal(this.tiles[i], this.tiles[i + 1])) {
                    return false;
                }
            }
            if (i < 12) {
                if (this.equal(this.tiles[i], this.tiles[i + 4])) {
                    return false;
                }
            }
        }
        return true;
    }
}
var game;
$('#startGame').click(function() {
    $("#startGame").hide();
    game = game || new Game2048($('#game-grid'));
    game.init();
});
//top 87,38 right 68,39 down 83,40 left 37,65
$(document).keydown(function(event) {
    var keyNumList = [87, 38, 68, 39, 83, 40, 37, 65];
    if (keyNumList.indexOf(event.keyCode) > -1) {
        // when num = 2048,game success
        if (game.max()) {
            game.clean();
            $("#startGame").show();
            $("#startGame").html("you win , replay?");
            return;
        }
        if (game.over()) {
            game.clean();
            $("#startGame").show();
            $("#startGame").html("game over , replay?");
            return;
        }
        game.move(event.keyCode);
    }
});
