var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var humanContainer = new render.DisplayObjectContainer(); //容器
humanContainer.x = 60;
var human = new render.DisplayObjectContainer();
human.x = -50;
human.y = -65;
var head = new render.Bitmap();
head.x = 10;
head.y = -60;
head.width = 78;
head.height = 75;
var trunk = new render.Bitmap();
trunk.x = 18;
trunk.y = 15;
var left_leg = new render.Bitmap();
var right_leg = new render.Bitmap();
var left_arm = new render.Bitmap();
var right_arm = new render.Bitmap();
left_leg.x = 3;
left_leg.y = 70;
left_leg.width = 35;
left_leg.height = 61;
right_leg.x = 40;
right_leg.y = 69;
right_leg.width = 31;
right_leg.height = 58;
left_arm.x = -38;
left_arm.y = 25;
right_arm.x = 55;
right_arm.y = 25;
head.source = "head.png"; //图片源
trunk.source = "trunk.png";
left_leg.source = "left_leg.png";
right_leg.source = "right_leg.png";
left_arm.source = "left_arm.png";
right_arm.source = "right_arm.png";
humanContainer.addChild(human); //添加子节点
human.addChild(head);
human.addChild(left_leg);
human.addChild(right_leg);
human.addChild(left_arm);
human.addChild(right_arm);
human.addChild(trunk);
var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png"]);
renderCore.start(humanContainer, ["trunk.png"]);
renderCore.start(humanContainer, ["left_arm.png"]);
renderCore.start(humanContainer, ["right_arm.png"]);
renderCore.start(humanContainer, ["left_leg.png"]);
renderCore.start(humanContainer, ["right_leg.png"]);
var HumanBody = (function (_super) {
    __extends(HumanBody, _super);
    function HumanBody() {
        _super.apply(this, arguments);
        this.vx = 5;
        this.r = Math.PI;
        this.orientation = 1;
    }
    HumanBody.prototype.onTicker = function (duringTime) {
        this.x = this.x + this.vx * duringTime; //向前移动
        this.rotation = this.rotation + this.r * duringTime; //滚动
    };
    return HumanBody;
}(Body));
var ticker = new Ticker();
var body = new HumanBody(humanContainer);
body.vx = 5;
body.y = 200;
ticker.start([body]);
var eventCore = new events.EventCore(); //event.ts
eventCore.init();
var HeadClicked = false;
var LegClicked = false;
var headHitTest = function (localPoint, displayObject) {
    //alert (`点击位置为${localPoint.x},${localPoint.y}`);
    if (localPoint.x > 0 && localPoint.x <= displayObject.width && localPoint.y > 0 && localPoint.y <= displayObject.height) {
        console.log('头');
        HeadClicked = true;
    }
    return HeadClicked;
};
var left_legHitTest = function (localPoint, displayObject) {
    // alert (`点击位置为${localPoint.x},${localPoint.y}`);  
    // console.log(localPoint);
    if (localPoint.x > 0 && localPoint.x <= displayObject.width && localPoint.y > 0 && localPoint.y < displayObject.height) {
        LegClicked = true;
    }
    return LegClicked;
};
var right_legHitTest = function (localPoint, displayObject) {
    if (localPoint.x > 0 && localPoint.x <= displayObject.width && localPoint.y > 0 && localPoint.y < displayObject.height) {
        LegClicked = true;
    }
    return LegClicked;
};
var headOnClick = function () {
    //alert("clicked!!");
    //修改 HumanBody 的速度，使其反向移动
    console.log(body.orientation);
    if (HeadClicked) {
        if (body.vx == 0) {
            body.vx = 5 * body.orientation;
            body.r = Math.PI * body.orientation;
            HeadClicked = false;
        }
        else {
            body.vx *= -1;
            body.r *= -1;
            body.orientation *= -1;
            console.log('normal' + body.orientation);
            HeadClicked = false;
        }
    }
};
var LegOnClick = function () {
    if (LegClicked) {
        body.vx = 0;
        body.r = 0;
        body.rotation = 0;
        LegClicked = false;
    }
};
eventCore.register(head, headHitTest, headOnClick);
eventCore.register(left_leg, left_legHitTest, LegOnClick);
eventCore.register(right_leg, right_legHitTest, LegOnClick);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2FtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxJQUFJLGNBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLENBQUEsSUFBSTtBQUM3RCxjQUFjLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUN0QixJQUFJLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0FBQ2hELEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7QUFDZCxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0FBQ2QsSUFBSSxJQUFJLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDL0IsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDWixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0FBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDakIsSUFBSSxLQUFLLEdBQUcsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDaEMsS0FBSyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDYixLQUFLLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUNiLElBQUksUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ25DLElBQUksU0FBUyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3BDLElBQUksUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ25DLElBQUksU0FBUyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3BDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2YsUUFBUSxDQUFD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