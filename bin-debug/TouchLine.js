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
var TouchLine = (function (_super) {
    __extends(TouchLine, _super);
    function TouchLine(col, row, stype) {
        var _this = _super.call(this) || this;
        _this.stype = 0;
        _this.endcol = _this.startcol = col;
        _this.endrow = _this.startrow = row;
        _this.startX = Game.spriteBaseX + Game.spriteW * col + Game.spriteW / 2;
        _this.startY = Game.spriteBaseY + Game.spriteH * row + Game.spriteH / 2;
        _this.stype = stype;
        _this.drawLine();
        return _this;
    }
    TouchLine.prototype.drawLine = function () {
        this.graphics.lineStyle(20, Game.stypeColor[this.stype]);
        this.graphics.moveTo(this.startX, this.startY);
        this.graphics.lineTo(this.startX, this.startY);
    };
    TouchLine.prototype.moveTo = function (endX, endY) {
        this.graphics.clear();
        this.graphics.lineStyle(30, Game.stypeColor[this.stype]);
        this.graphics.moveTo(this.startX, this.startY);
        this.graphics.lineTo(endX, endY);
        // console.log("/////////");
        // console.log(this.startX, this.startY);
        // console.log(endX, endY);
        // this.graphics.endFill();      
    };
    TouchLine.prototype.moveToGrid = function (col, row) {
        this.endcol = col;
        this.endrow = row;
        this.moveTo(Game.spriteBaseX + Game.spriteW * col + Game.spriteW / 2, Game.spriteBaseY + Game.spriteW * row + Game.spriteW / 2);
    };
    return TouchLine;
}(egret.Shape));
__reflect(TouchLine.prototype, "TouchLine");
//# sourceMappingURL=TouchLine.js.map