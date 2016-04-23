

function createMap() {
  //  var world = new editor.WorldMap();
  //  var rows = mapData.length;
  //  var cols = mapData[0].length;
    
    var tile = new game.WorldMap(mapData);
    var rows = mapData.length;
    var cols = mapData[0].length;
    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var _tile = new game.Tile();
   //         tile.setWalkable(mapData[row][col]);
            _tile.x = col * game.GRID_PIXEL_WIDTH;
            _tile.y = row * game.GRID_PIXEL_HEIGHT
            _tile.ownedCol = col;
            _tile.ownedRow = row;
            _tile.width = editor.GRID_PIXEL_WIDTH;
            _tile.height = editor.GRID_PIXEL_HEIGHT;
            tile.addChild(_tile);
            
            eventCore.register(_tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    
    return tile;

}



function onTileClick(tile: game.Tile) {
    body.run(map.grid,tile.ownedRow,tile.ownedCol);
    console.log(tile);
}

var storage = data.Storage.getInstance();
storage.createXMLHttpRequest();
var mapData = storage.mapData;


var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();


var map = createMap();

var boyShape = new game.BoyShape();
var body = new game.BoyBody(boyShape);

var ticker = new Ticker();
ticker.start([body]);
ticker.onTicker(); 

var stage = new render.DisplayObjectContainer();
stage.addChild(map);
var panel = new editor.ControlPanel();
panel.x = 300;
stage.addChild(panel);

renderCore.start(stage);
