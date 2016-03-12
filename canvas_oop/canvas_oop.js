var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * 基类，负责处理x,y,rotation 等属性
 */
var DisplayObject = (function () {
    function DisplayObject() {
        this.x = 0;
        this.y = 0;
        this.rotation = 0;
    }
    DisplayObject.prototype.draw = function (context) {
        context.save();
        //      context.rotate(this.rotation);
        context.translate(this.x, this.y);
        this.render(context);
        context.restore();
    };
    DisplayObject.prototype.render = function (context) {
    };
    return DisplayObject;
}());
var Bitmap = (function (_super) {
    __extends(Bitmap, _super);
    function Bitmap() {
        _super.apply(this, arguments);
    }
    Bitmap.prototype.render = function (context) {
        var image = imagePool[this.source];
        if (image) {
            context.drawImage(image, 0, 0);
        }
        else {
            context.font = "20px Arial";
            context.fillStyle = '#000000';
            context.fillText('错误的URL', 0, 20);
        }
    };
    return Bitmap;
}(DisplayObject));
var Rect = (function (_super) {
    __extends(Rect, _super);
    function Rect() {
        _super.apply(this, arguments);
        this.width = 100;
        this.height = 100;
        this.color = '#FF0000';
    }
    Rect.prototype.render = function (context) {
        context.fillStyle = this.color;
        context.fillRect(0, 0, this.width, this.height);
    };
    return Rect;
}(DisplayObject));
var TextField = (function (_super) {
    __extends(TextField, _super);
    function TextField() {
        _super.apply(this, arguments);
    }
    TextField.prototype.render = function (context) {
        context.font = "11px Arial";
        context.fillStyle = '#FFFFFF';
    };
    return TextField;
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
var bitmapbackground = new Bitmap();
bitmapbackground.source = 'background.jpg';
bitmapbackground.x = 0;
bitmapbackground.y = 0;
var bitmaptianjiao = new Bitmap();
bitmaptianjiao.source = 'tianjiao.png';
bitmaptianjiao.x = 505;
bitmaptianjiao.y = 150;
var bitmappassword = new Bitmap();
bitmappassword.source = 'password.png';
bitmappassword.x = 490;
bitmappassword.y = 560;
var bitmaplogin = new Bitmap();
bitmaplogin.source = 'login.jpg';
bitmaplogin.x = 500;
bitmaplogin.y = 720;
var bitmapexit = new Bitmap();
bitmapexit.source = 'exit.jpg';
bitmapexit.x = 640;
bitmapexit.y = 720;
//渲染队列
var renderQueue = [bitmapbackground, bitmaptianjiao, bitmappassword, bitmaplogin, bitmapexit];
//资源加载列表
var imageList = ['background.jpg', 'tianjiao.png', 'password.png', 'login.jpg', 'exit.jpg'];
//先加载资源，加载成功之后执行渲染队列
loadResource(imageList, function () {
    drawQueue(renderQueue);
});
