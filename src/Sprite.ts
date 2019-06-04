class Sprite extends egret.Shape {

    public stype = 0;
    public selected = false;
    public constructor(col, row, stype) {
        super();
        this.init(col, row, stype);
    }
    public init(col, row, stype){
        this.x = Game.spriteBaseX + Game.spriteW * col + Game.spriteW / 2;
        this.y = Game.spriteBaseY + Game.spriteH * row + Game.spriteH / 2;
        this.stype = stype;
        console.log(this.x, this.y)
        this.drawSprite();
    }
    private drawSprite() {
        this.graphics.beginFill(Game.stypeColor[this.stype]);
        this.graphics.drawCircle(0, 0, Game.spriteR);
        this.graphics.endFill();
    }

    public moveTo(targetCol, targetRow) {
        //计算目标行列所在的x、y：
        var targetX = Game.spriteBaseX + targetCol * Game.spriteW + Game.spriteW / 2;
        var targetY = Game.spriteBaseY + targetRow * Game.spriteH + Game.spriteH / 2;

        egret.Tween.get(this).to({ x: targetX, y: targetY }, 300, egret.Ease.sineIn);
        // console.log(`move to ${targetCol}  ${targetRow} ${targetX}  ${targetX}`);
    }

    /**
     * 爆炸消失
     */
    public bomb(){
        this.graphics.clear();
        this.graphics.endFill();
    }
}