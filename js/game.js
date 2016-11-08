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
    },
    newTile: function(val) {
        /*
        create one tile
        1.class tile is base css sheet
        2.class tile+num is num css sheet
        3.attr index is tile sort
        4.attr val is num
        */
        var tile = document.createElement("div");
        this.setTileVal(tile, val);
        return tile;
    },
    setTileVal(tile, val) {
        tile.className = 'tile tile' + val;
        tile.setAttribute('val', val);
        tile.innerHTML = val > 0 ? val : '';

    }
}
var game;
$('#startGame').click(function() {
    $("#startGame").hide();
    game = game || new Game2048($('#game-grid'));
    game.init();
});
