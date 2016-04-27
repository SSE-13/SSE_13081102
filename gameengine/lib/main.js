function createMapEditor() {
    var world = new editor.WorldMap();
    var rows = mapData.length;
    var cols = mapData[0].length;
    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols; col++) {
            var tile = new editor.Tile();
            tile.sourceNum = textureData[row][col];
            tile.source = texture[tile.sourceNum]; //按json为地图网格赋素材
            tile.setWalkable(mapData[row][col]); //为tile的walkable属性赋值，已无法决定素材
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
    console.log(textureData.length);
    return world;
}
function TXEditor() {
    var sucaiCount = texture.length; //素材总数
    var TXcols = 4;
    var TXrows = sucaiCount / TXcols; //5;
    //var unWalkableTXCount = 14;//不可走的素材个数
    var count = 0; //已添加的素材个数
    for (var row = 0; row < TXrows; row++) {
        if (count < sucaiCount) {
            for (var col = 0; col < TXcols; col++) {
                if (count < sucaiCount) {
                    var tile = new editor.Tile();
                    var num = 4 * row + col;
                    tile.sourceNum = num;
                    tile.source = texture[tile.sourceNum];
                    if (num != 12 && num != 13) {
                        tile.walkable = true;
                    }
                    else {
                        tile.walkable = false;
                    }
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
                    count++;
                }
                else {
                    break;
                }
            }
        }
        else {
            break;
        }
    }
}
function onTileClick(tile) {
    var ctc = new Cmd.CommandTileClick(panel.xt, panel.yt, panel.button, panel.TXsource, panel.TXwalkable, panel.TXnum, panel.sucaibutton);
    ctc.getPara(panel.xt.text, panel.yt.text, panel.button.background.color, panel.button.text, panel.TXsource[0], panel.TXwalkable[0], panel.TXnum[0], panel.sucaibutton.text, panel.sucaibutton.background.color);
    invoke.setCommand(ctc);
    panel.yt.text = tile.ytext;
    panel.xt.text = tile.xtext; //显示坐标
    panel.button.background.color = tile.walkable ? "#0000FF" : "#FF0000";
    panel.button.text = tile.walkable ? "是" : "否"; //设置是否可走按钮变化
    if (tile.walkable != panel.TXwalkable[0]) {
        panel.TXsource[0] = tile.source;
        panel.TXwalkable[0] = tile.walkable;
        panel.TXnum[0] = tile.sourceNum;
        panel.sucaibutton.text = tile.source.substring(3, tile.source.length - 4);
    } //当前地图网格所用素材与用户所选素材可走性不一致时，所选素材相关信息需变化
    if (tile.source == panel.TXsource[0]) {
        panel.sucaibutton.background.color = "#0000FF";
    }
    else {
        panel.sucaibutton.background.color = "#FF0000";
    }
}
function onTXClick(tile) {
    var x = parseInt(panel.xt.text) - 1;
    var y = parseInt(panel.yt.text) - 1;
    if (x >= 0 && y >= 0) {
        var mapTile;
        mapTile = mapEditor.children[y * mapData[0].length + x]; //获取当前地图网格
        if (tile.walkable == mapTile.walkable) {
            var ctxc = new Cmd.CommandTXClick(panel.TXsource, panel.TXwalkable, panel.TXnum, panel.sucaibutton);
            ctxc.getPara(panel.TXsource[0], panel.TXwalkable[0], panel.TXnum[0], panel.sucaibutton.text, panel.sucaibutton.background.color);
            invoke.setCommand(ctxc);
            panel.TXsource[0] = tile.source;
            panel.TXwalkable[0] = tile.walkable;
            panel.TXnum[0] = tile.sourceNum;
            if (tile.source == mapTile.source) {
                panel.sucaibutton.background.color = "#0000FF";
            }
            else {
                panel.sucaibutton.background.color = "#FF0000";
            }
            panel.sucaibutton.text = tile.source.substring(3, tile.source.length - 4);
        }
        else {
            alert("当前素材不可选"); //可走性不一致时该素材网格不可选
        }
    }
    else {
        alert("未选可编辑地图区域"); //若用户未选中地图网格
    }
}
var texture = ["TX-box1.1.png", "TX-box1.2.png", "TX-box1.3.png",
    "TX-box1.4.png", "TX-box2.1.png", "TX-box2.2.png", "TX-box2.3.png",
    "TX-box2.4.png", "TX-box3.1.png", "TX-box3.2.png", "TX-box3.3.png",
    "TX-box3.4.png", "TX-wall.png", "TX-water.png",
    "TX-ground.png", "TX-key.png", "TX-birdge.png"];
var storage = data.Storage.getInstance();
storage.readFile();
var mapData = storage.mapData;
var textureData = storage.textureData;
var renderCore = new render.RenderCore();
var eventCore = events.EventCore.getInstance();
eventCore.init();
var mapEditor = createMapEditor();
var stage = new render.DisplayObjectContainer();
stage.addChild(mapEditor);
var invoke = new Cmd.Invoker();
invoke.init();
var panel = new editor.ControlPanel(mapData, mapEditor);
panel.x = 500;
var TextureEditor = new TXEditor();
stage.addChild(panel);
renderCore.start(stage, texture, ["save.png", "backout.png"]);
