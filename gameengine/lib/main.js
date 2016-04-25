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
function TXEditor() {
    var sucaiCount = panel.texture.length;
    var TXcols = 4;
    var TXrows = 5;
    for (var row = 0; row < TXrows; row++) {
        for (var col = 0; col < TXcols; col++) {
            var tile = new editor.Tile();
            tile.source = panel.texture[4 * row + col];
            tile.x = col * editor.GRID_PIXEL_WIDTH;
            tile.y = row * editor.GRID_PIXEL_HEIGHT + 150;
            tile.ownedCol = col;
            tile.ownedRow = row;
            tile.width = editor.GRID_PIXEL_WIDTH;
            tile.height = editor.GRID_PIXEL_HEIGHT;
            tile.xposition = tile.x / editor.GRID_PIXEL_WIDTH + 1;
            tile.yposition = tile.y / editor.GRID_PIXEL_HEIGHT + 1;
            tile.xtext = tile.xposition.toString();
            tile.ytext = tile.yposition.toString();
            panel.addChild(tile);
            eventCore.register(tile, events.displayObjectRectHitTest, onTXClick);
        }
    }
}
function onTileClick(tile) {
    console.log(tile);
    var walkable = mapData[tile.ownedRow][tile.ownedCol];
    panel.yt.text = tile.xtext;
    panel.xt.text = tile.ytext;
    panel.button.background.color = walkable ? "#0000FF" : "#FF0000";
    panel.button.text = walkable ? "是" : "否";
    if (tile.source == panel.TXsource) {
        panel.sucaibutton.background.color = "#0000FF";
    }
    else {
        panel.sucaibutton.background.color = "#FF0000";
    }
}
function onTXClick(tile) {
    panel.TXsource = tile.source;
    var x = parseInt(panel.xt.text) - 1;
    var y = parseInt(panel.yt.text) - 1;
    var mapTile = new editor.Tile();
    mapTile = mapEditor.children[y * mapData[0].length + x];
    if (tile.source == mapTile.source) {
        panel.sucaibutton.background.color = "#0000FF";
    }
    else {
        panel.sucaibutton.background.color = "#FF0000";
    }
    panel.sucaibutton.text = tile.source.substring(3, tile.source.length - 4);
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
var panel = new editor.ControlPanel(mapData, mapEditor);
panel.x = 500;
var TextureEditor = new TXEditor();
stage.addChild(panel);
renderCore.start(stage, ["TX-birdge.png", "TX-box1.1.png", "TX-box1.2.png", "TX-box1.3.png", "TX-box1.4.png", "TX-box2.1.png", "TX-box2.2.png", "TX-box2.3.png", "TX-box2.4.png", "TX-box3.1.png", "TX-box3.2.png", "TX-box3.3.png", "TX-box3.4.png", "TX-grass.png", "TX-ground.png", "TX-key.png", "TX-role.png", "TX-stone.png", "TX-wall.png", "TX-water.png"]);
