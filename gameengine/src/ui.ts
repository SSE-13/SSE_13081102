module ui {

    var eventCore: events.EventCore = events.EventCore.getInstance();

    export class Button extends render.DisplayObjectContainer {

        public onClick: Function;
        public get text(): string {
            return this._text;
        }

        public set text(value: string) {
            this._text = value;
            this.label.text = value;
        }

        public get width(): number {
            return this._width;
        }

        public set width(value: number) {
            this._width = value;
            this.background.width = value;
        }

        public get height(): number {
            return this._height;
        }

        public set height(value: number) {
            this._height = value;
            this.background.height = value;
        }


        public background: render.Rect;
        public label: render.TextField;
        public _text: string = " ";

        constructor() {

            super();
            this.background = new render.Rect();
            this.background.width = this.width;
            this.background.height = this.height;
            this.label = new render.TextField();
            this.label.width = this.width;
            this.label.height = this.height;
            this.label.x = -20;
            this.label.y = 0;
            this.label.textAlign = "center";
            this.label.text = this.text;
            this.addChild(this.background);
            this.addChild(this.label);
            eventCore.register(this, events.displayObjectRectHitTest, () => {
                if (this.onClick()) { 
                    this.onClick();                                 
                } 
            });
        }
    }
}