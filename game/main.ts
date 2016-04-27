

function createMap(pMapData, pmapTexture) {
    //  var world = new editor.WorldMap();
    //  var rows = mapData.length;
    //  var cols = mapData[0].length;   
    var map = new game.WorldMap(pMapData);
    var rows = pMapData.length;
    var cols = pMapData[0].length;
    for (var col = 0; col < cols; col++) {
        for (var row = 0; row < rows; row++) {
            var _tile;
                  switch (pmapTexture[row][col]) {
                      case 0:
                          _tile = new game.Tile("TX-box1.1.png");
                          break;
                      case 1:
                          _tile = new game.Tile("TX-box1.2.png");
                          break;
                      case 2:
                          _tile = new game.Tile("TX-box1.3.png");
                          break;
                      case 3:
                          _tile = new game.Tile("TX-box1.4.png");
                          break;
                      case 4:
                          _tile = new game.Tile("TX-box2.1.png");
                          break;
                      case 5:
                          _tile = new game.Tile("TX-box2.2.png");
                          break;
                      case 6:
                          _tile = new game.Tile("TX-box2.3.png");
                          break;
                      case 7:
                          _tile = new game.Tile("TX-box2.4.png");
                          break;
                      case 8:
                          _tile = new game.Tile("TX-box3.1.png");
                          break;
                      case 9:
                          _tile = new game.Tile("TX-box3.2.png");
                          break;
                      case 10:
                          _tile = new game.Tile("TX-box3.3.png");
                          break;
                      case 11:
                          _tile = new game.Tile("TX-box3.4.png");
                          break;
                      case 12:
                          _tile = new game.Tile("TX-wall.png");
                          break;
                      case 13:
                          _tile = new game.Tile("TX-water.png");
                          break;
                      case 14:
                          _tile = new game.Tile("TX-ground.png");
                          break;
                      case 15:
                          _tile = new game.Tile("TX-key.png");
                          _tile.isKey = true;
                          break;
                      case 16:
                          _tile = new game.Tile("TX-birdge.png");
                          break;                    
                      default:
                          break;
                  }

            // if (pMapData[row][col] == 9) {
            //     _tile = new game.Tile("TX-key.png");
            //     _tile.isKey = true;
            //     console.log("key");
            // } else if (map.grid.getWalkable(col, row)) {
            //     _tile = new game.Tile("TX-ground.png");
            // } else {
            //     _tile = new game.Tile("TX-wall.png");         
            // }

            _tile.x = col * game.GRID_PIXEL_WIDTH;
            _tile.y = row * game.GRID_PIXEL_HEIGHT
            _tile.ownedCol = col;
            _tile.ownedRow = row;
            _tile.width = game.GRID_PIXEL_WIDTH;
            _tile.height = game.GRID_PIXEL_HEIGHT;
            map.addChild(_tile);

            eventCore.register(_tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    return map;
}

function onTileClick(_tile: game.Tile) {
    console.log(_tile);
   // if (body.canClick) {
        body.run(map.grid, _tile.ownedRow, _tile.ownedCol);
   // }
}


var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();


var boyShape = new game.BoyShape();

//boyShape.x=40;
//boyShape.y=40;//= =！ 不管用
var body = new game.BoyBehaviour(boyShape);
body.x=body.y=40;
var ticker = new Ticker();
var stage = new render.DisplayObjectContainer();
var map: game.WorldMap;

var storage = data.Storage.getInstance();
var onLoadMapDataSuccess = () => {

    map = createMap(storage._mapData, storage._mapTexture);
    stage.addChild(map);
    body.map = map;
    stage.addChild(boyShape);
    ticker.start([body]);
    ticker.onTicker();
    //renderCore.start只能用一次
    renderCore.start(stage, ["TX-box.png", "TX-box1.1.png", "TX-box1.2.png", "TX-box1.3.png", "TX-box1.4.png", "TX-box2.1.png", "TX-box2.2.png", "TX-box2.3.png", "TX-box2.4.png",
        "TX-box3.1.png", "TX-box3.2.png", "TX-box3.3.png", "TX-box3.4.png", "TX-wall.png",
        "TX-water.png", "TX-grass.png", "TX-ground.png", "TX-key.png", "TX-role.png", "TX-stone.png", "TX-birdge.png"]);
       
}

storage.createXMLHttpRequest(onLoadMapDataSuccess);


