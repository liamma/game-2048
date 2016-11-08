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
            tile.setAttribute('index', i);
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
    move: function() {

    }
}
var game;
$('#startGame').click(function() {
    $("#startGame").hide();
    game = game || new Game2048($('#game-grid'));
    game.init();
});

$(document).keydown(function(event) {
    alert(event.keyCode);
});
