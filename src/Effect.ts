class Effect extends egret.Shape {
    public stype = 0;
    public constructor(col, row, stype) {
        super();
        this.init(col, row, stype);
    }
    public init(col, row, stype) {
        this.x = Game.spriteBaseX + Game.spriteW * col + Game.spriteW / 2;
        this.y = Game.spriteBaseY + Game.spriteH * row + Game.spriteH / 2;
        this.stype = stype;
        this.drawEffect();
    }
    private drawEffect() {
        let lifetime = 1500;
        this.graphics.beginFill(Game.stypeColor[this.stype]);
        this.graphics.drawCircle(0, 0, Game.spriteR);
        this.graphics.endFill();
        egret.Tween.get(this).to({ scaleX: 2, scaleY: 2, alpha: 0 }, lifetime, egret.Ease.bounceOut);

        let timer = new egret.Timer(lifetime + 100, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, this.removeFromParent, this);
    }
    private removeFromParent() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    }
}