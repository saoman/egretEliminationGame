class TouchLine extends egret.Shape {

    private stype = 0;
    public startX;
    public startY;
    private endX;
    private endY;

    public startcol;startrow;endcol;endrow;
    public constructor(col, row, stype) {
        super();
        this.endcol = this.startcol = col;
        this.endrow = this.startrow = row;
        this.startX = Game.spriteBaseX + Game.spriteW * col + Game.spriteW / 2;
        this.startY = Game.spriteBaseY + Game.spriteH * row + Game.spriteH / 2;
        this.stype = stype;
        this.drawLine();
    }

    private drawLine() {
        this.graphics.lineStyle(20, Game.stypeColor[this.stype]);
        this.graphics.moveTo(this.startX, this.startY);
        this.graphics.lineTo(this.startX, this.startY);
    }

    public moveTo(endX, endY) {
        this.graphics.clear();
        this.graphics.lineStyle(30, Game.stypeColor[this.stype]);
        this.graphics.moveTo(this.startX, this.startY);
        this.graphics.lineTo(endX, endY);
        // console.log("/////////");
        // console.log(this.startX, this.startY);
        // console.log(endX, endY);
        // this.graphics.endFill();      
    }

    public moveToGrid(col, row) {
        this.endcol = col;
        this.endrow = row;
        this.moveTo(Game.spriteBaseX + Game.spriteW * col + Game.spriteW / 2, Game.spriteBaseY + Game.spriteW * row + Game.spriteW / 2);
    }
}