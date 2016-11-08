$("#startGame").click(function() {
    $("#startGame").hide();
});

// create game Constructor
function Game2048(container) {
    this.container = container;
    // create 4*4 array
    this.tiles = new Array(16);
}
Game2048.prototype = {
    init: function() {
        // craete 16 tile
        for (var i = 0, i < this.tiles.length, i++) {

        }
    },
    newTile: function(val) {
        //create a one tile,need set
        //1. html
        //2. val
        //3. class
        var tile = document.createElement("div");

    }
}
