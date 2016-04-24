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
var re = new render.Rect;
re.x = 100;
re.y = 60;
re.height = 30;
re.width = 60;
var xt = new render.TextField;
var yt = new render.TextField;
function onTileClick(tile) {
    var _this = this;
    console.log(tile);
    var button = new ui.Button();
    button.width = 60;
    button.height = 30;
    button.x = 100;
    button.y = 60;
    button.onClick = function () {
        if (button.text == "否") {
            button.text = "是";
            _this.walkable = 0;
            button.background.color = "#0000FF";
        }
        else {
            button.text = "否";
            _this.walkable = 1;
            button.background.color = "#FF0000";
        }
    };
    var walkable = mapData[tile.ownedRow][tile.ownedCol];
    if (walkable == 1) {
        button.text = "是";
        button.background.color = "#0000FF";
    }
    else {
        button.text = "否";
        button.background.color = "#FF0000";
    }
    panel.addChild(button);
    yt.text = tile.xtext;
    xt.text = tile.ytext;
    mapData[tile.ownedRow][tile.ownedCol] = walkable;
    tile.walkable = mapData[tile.ownedRow][tile.ownedCol];
    tile.setWalkable(walkable);
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
panel.addChild(re);
xt.x = 60;
xt.y = 0;
yt.x = 60;
yt.y = 30;
stage.addChild(panel);
renderCore.start(stage);
