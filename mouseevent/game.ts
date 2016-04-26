var humanContainer = new render.DisplayObjectContainer();//容器
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
head.source = "head.png";//图片源
trunk.source = "trunk.png";
left_leg.source = "left_leg.png";
right_leg.source = "right_leg.png";
left_arm.source = "left_arm.png";
right_arm.source = "right_arm.png";

humanContainer.addChild(human);//添加子节点
human.addChild(head)
human.addChild(left_leg)
human.addChild(right_leg)
human.addChild(left_arm)
human.addChild(right_arm)
human.addChild(trunk)

var renderCore = new render.RenderCore();
renderCore.start(humanContainer, ["head.png"]);
renderCore.start(humanContainer, ["trunk.png"]);
renderCore.start(humanContainer, ["left_arm.png"]);
renderCore.start(humanContainer, ["right_arm.png"]);
renderCore.start(humanContainer, ["left_leg.png"]);
renderCore.start(humanContainer, ["right_leg.png"]);


class HumanBody extends Body {


    vx: number = 5;
    r = Math.PI;
    orientation = 1;

    onTicker(duringTime: number) {

        this.x = this.x + this.vx * duringTime;//向前移动
        this.rotation = this.rotation + this.r * duringTime;//滚动

    }
}

var ticker = new Ticker();
var body = new HumanBody(humanContainer);
body.vx = 5;
body.y = 200;
ticker.start([body]);


var eventCore = new events.EventCore();//event.ts
eventCore.init();

var HeadClicked = false;
var LegClicked = false;


var headHitTest = (localPoint: math.Point, displayObject: render.DisplayObject) => {
    //alert (`点击位置为${localPoint.x},${localPoint.y}`);

    if (localPoint.x > 0 && localPoint.x <= displayObject.width && localPoint.y > 0 && localPoint.y <= displayObject.height) {
        console.log('头');
        HeadClicked = true;
    }
    return HeadClicked;
}

var left_legHitTest = (localPoint: math.Point, displayObject: render.DisplayObject) => {
    // alert (`点击位置为${localPoint.x},${localPoint.y}`);  
    // console.log(localPoint);
    if (localPoint.x > 0 && localPoint.x <= displayObject.width && localPoint.y > 0 && localPoint.y < displayObject.height) {
        LegClicked = true;
    }
    return LegClicked;

}
var right_legHitTest = (localPoint: math.Point, displayObject: render.DisplayObject) => {

    if (localPoint.x > 0 && localPoint.x <= displayObject.width && localPoint.y > 0 && localPoint.y < displayObject.height) {
        LegClicked = true;
    }
    return LegClicked;
}

var headOnClick = () => {
    //alert("clicked!!");
    //修改 HumanBody 的速度，使其反向移动
    console.log(body.orientation);
    if (HeadClicked) {
        if (body.vx == 0) {
            body.vx = 5 * body.orientation;
            body.r = Math.PI * body.orientation;
            HeadClicked = false;
        } else {
            body.vx *= -1;
            body.r *= -1;
            body.orientation *= -1;
            console.log('normal' + body.orientation);
            HeadClicked = false;
        }
    }


}
var LegOnClick = () => {

    if (LegClicked) {
        body.vx = 0;
        body.r = 0;
        body.rotation = 0;
        LegClicked = false;
    }

}

eventCore.register(head, headHitTest, headOnClick);
eventCore.register(left_leg, left_legHitTest, LegOnClick);
eventCore.register(right_leg, right_legHitTest, LegOnClick);






