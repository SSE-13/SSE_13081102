

function createMap(pMapData) {
    //  var world = new editor.WorldMap();
    //  var rows = mapData.length;
    //  var cols = mapData[0].length;   
    var tile = new game.WorldMap(pMapData);
    var rows = pMapData.length;
    var cols = pMapData[0].length;
    for (var col = 0; col < cols; col++) {
        for (var row = 0; row < rows; row++) {
            var _tile;
             if(tile.grid.getWalkable(col,row))
            {
                  _tile = new game.Tile("road.jpg");

            }else{
                 _tile = new game.Tile("block.jpg");
            }       
            _tile.x = col * game.GRID_PIXEL_WIDTH;
            _tile.y = row * game.GRID_PIXEL_HEIGHT
            _tile.ownedCol = col;
            _tile.ownedRow = row;
            _tile.width = game.GRID_PIXEL_WIDTH;
            _tile.height = game.GRID_PIXEL_HEIGHT;
            tile.addChild(_tile);

            eventCore.register(_tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    return tile;
}

function onTileClick(tile: game.Tile) {
        console.log(tile);
    body.run(map.grid, tile.ownedRow, tile.ownedCol);

}


var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();


var boyShape = new game.BoyShape();
var body = new game.BoyBehaviour(boyShape);

//var ticker = new Ticker();

var ticker = new Ticker();

var stage = new render.DisplayObjectContainer();

var map:game.WorldMap;

var storage = data.Storage.getInstance();
var onLoadMapDataSuccess = () => {
    
    map = createMap(storage.mapData);
    stage.addChild(map);
    stage.addChild(boyShape);
    ticker.start([body]);
    ticker.onTicker();
    renderCore.start(stage,["block.jpg","head.png","road.jpg"]);


};
storage.createXMLHttpRequest(onLoadMapDataSuccess);


