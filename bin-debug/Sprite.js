var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var Sprite = (function (_super) {
    __extends(Sprite, _super);
    function Sprite(col, row, stype) {
        var _this = _super.call(this) || this;
        _this.stype = 0;
        _this.selected = false;
        _this.init(col, row, stype);
        return _this;
    }
    Sprite.prototype.init = function (col, row, stype) {
        this.x = Game.spriteBaseX + Game.spriteW * col + Game.spriteW / 2;
        this.y = Game.spriteBaseY + Game.spriteH * row + Game.spriteH / 2;
        this.stype = stype;
        console.log(this.x, this.y);
        this.drawSprite();
    };
    Sprite.prototype.drawSprite = function () {
        this.graphics.beginFill(Game.stypeColor[this.stype]);
        this.graphics.drawCircle(0, 0, Game.spriteR);
        this.graphics.endFill();
    };
    Sprite.prototype.moveTo = function (targetCol, targetRow) {
        //计算目标行列所在的x、y：
        var targetX = Game.spriteBaseX + targetCol * Game.spriteW + Game.spriteW / 2;
        var targetY = Game.spriteBaseY + targetRow * Game.spriteH + Game.spriteH / 2;
        egret.Tween.get(this).to({ x: targetX, y: targetY }, 300, egret.Ease.sineIn);
        // console.log(`move to ${targetCol}  ${targetRow} ${targetX}  ${targetX}`);
    };
    /**
     * 爆炸消失
     */
    Sprite.prototype.bomb = function () {
        this.graphics.clear();
        this.graphics.endFill();
    };
    return Sprite;
}(egret.Shape));
__reflect(Sprite.prototype, "Sprite");
//# sourceMappingURL=Sprite.js.map