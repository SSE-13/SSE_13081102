var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var newDisplayObject = (function () {
    function newDisplayObject() {
        this.x = 0;
        this.y = 0;
    }
    newDisplayObject.prototype.draw = function (context) {
        context.save();
        context.translate(this.x, this.y);
        this.render(context);
        context.restore();
    };
    newDisplayObject.prototype.render = function (context) {
    };
    return newDisplayObject;
}());
var Map = (function (_super) {
    __extends(Map, _super);
    function Map() {
        _super.apply(this, arguments);
    }
    Map.prototype.render = function (context) {
        var water = imagePool[map_water.source];
        var title = imagePool[bitmap2.source];
        //        if (image && title) {
        context.drawImage(water, 15, 15, 370, 220);
        context.drawImage(title, 120, 35, 150, 70);
        //       }
        //        else {
        //           context.font = "20px Arial";
        //            context.fillStyle = '#000000';
        //            context.fillText('错误的URL', 0, 20);
        //        }
    };
    return Map;
}(DisplayObject));
function drawQueue(queue) {
    for (var i = 0; i < renderQueue.length; i++) {
        var displayObject = renderQueue[i];
        displayObject.draw(context);
    }
}
var imagePool = {};
function loadResource(imageList, callback) {
    var count = 0;
    imageList.forEach(function (imageUrl) {
        var image = new Image();
        image.src = imageUrl;
        image.onload = onLoadComplete;
        image.onerror = onLoadError;
        function onLoadComplete() {
            imagePool[imageUrl] = image;
            count++;
            if (count == imageList.length) {
                callback();
            }
        }
        function onLoadError() {
            alert('资源加载失败:' + imageUrl);
        }
    });
}
var canvas = document.getElementById("game");
var context = canvas.getContext("2d");
var map_water = new render.Bitmap();
map_water.source = "TX-water.png";
var map_ground = new render.Bitmap();
map_ground.source = "TX-ground.png";
var map_stone = new render.Bitmap();
map_stone.source = "TX-stone.png";
var map_wall = new render.Bitmap();
map_wall.source = "TX-wall.png";
var map_birdge = new render.Bitmap();
map_birdge.source = "TX-birdge.png";
var map_grass = new render.Bitmap();
map_grass.source = "TX-grass.png";
var map_key = new render.Bitmap();
map_key.source = "TX-key.png";
var map_role = new render.Bitmap();
map_role.source = "TX-role.png";
var map_box11 = new render.Bitmap();
map_box11.source = "TX-box1.1.png";
var map_box12 = new render.Bitmap();
map_box12.source = "TX-box1.2.png";
var map_box13 = new render.Bitmap();
map_box13.source = "TX-box1.3.png";
var map_box14 = new render.Bitmap();
map_box14.source = "TX-box1.4.png";
var map_box21 = new render.Bitmap();
map_box21.source = "TX-box2.1.png";
var map_box22 = new render.Bitmap();
map_box22.source = "TX-box2.2.png";
var map_box23 = new render.Bitmap();
map_box23.source = "TX-box2.3.png";
var map_box24 = new render.Bitmap();
map_box24.source = "TX-box2.4.png";
var map_box31 = new render.Bitmap();
map_box31.source = "TX-box3.1.png";
var map_box32 = new render.Bitmap();
map_box32.source = "TX-box3.2.png";
var map_box33 = new render.Bitmap();
map_box33.source = "TX-box3.3.png";
var map_box34 = new render.Bitmap();
map_box34.source = "TX-box3.4.png";
//渲染队列
var renderQueue = [bitmap, bitmap2];
//资源加载列表
var imageList = ['TX-ground.png', 'TX-water.png', 'TX-stone.png', 'TX-grass.png', 'TX-wall.png', 'TX-birdge.png',
    'TX-key.png', 'TX-box1.1.png', 'TX-box1.2.png', 'TX-box1.3.png', 'TX-box1.4.png', 'TX-box2.1.png', 'TX-box2.2.png',
    'TX-box2.3.png', 'TX-box2.4.png', 'TX-box3.1.png', 'TX-box3.2.png', 'TX-box3.3.png', 'TX-box3.4.png', 'TX-role.png'];
//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function () {
    drawQueue(renderQueue);
});
