function createMapEditor() {
    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;
    for (var col = 0; col < rows; col++) {
        for (var row = 0; row < cols; row++) {
            var tile = new editor.Tile();
            tile.setWalkable(mapData[row][col]);
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT;
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            tile.xposition = tile.x / editor.GRID_PIXEL_WIDTH + 1;
            tile.yposition = tile.y / editor.GRID_PIXEL_HEIGHT + 1;
            tile.xtext = tile.xposition.toString();
            tile.ytext = tile.yposition.toString();
            world.addChild(tile);
            eventCore.register(tile, events.displayObjectRectHitTest, onTileClick);
        }
    }
    return world;
}
var bt = new render.TextField;
bt.x = 100;
bt.y = 60;
// bt.height = 30;
// bt.width = 60;
// bt.onClick = () =>{
//     console.log("ss");
// }
var xt = new render.TextField;
var yt = new render.TextField;
function onTileClick(tile) {
    console.log(tile);
    // console.log(tile.xtext);
    var walkable = mapData[tile.ownedRow][tile.ownedCol];
    if (walkable == 1) {
        //   walkable = 0;
        bt.text = "是";
    }
    else {
        // walkable = 1;
        bt.text = "否";
    }
    mapData[tile.ownedRow][tile.ownedCol] = walkable;
    tile.setWalkable(walkable);
    tile.walkable = mapData[tile.ownedRow][tile.ownedCol];
    yt.text = tile.xtext;
    xt.text = tile.ytext;
}
var storage = data.Storage.getInstance();
storage.readFile();
var mapData = storage.mapData;
var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();
var mapEditor = createMapEditor();
var stage = new render.DisplayObjectContainer();
stage.addChild(mapEditor);
var panel = new editor.ControlPanel();
panel.x = 500;
panel.addChild(xt);
panel.addChild(yt);
panel.addChild(bt);
xt.x = 60;
xt.y = 0;
yt.x = 60;
yt.y = 30;
stage.addChild(panel);
renderCore.start(stage);
