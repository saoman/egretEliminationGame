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
var Effect = (function (_super) {
    __extends(Effect, _super);
    function Effect(col, row, stype) {
        var _this = _super.call(this) || this;
        _this.stype = 0;
        _this.init(col, row, stype);
        return _this;
    }
    Effect.prototype.init = function (col, row, stype) {
        this.x = Game.spriteBaseX + Game.spriteW * col + Game.spriteW / 2;
        this.y = Game.spriteBaseY + Game.spriteH * row + Game.spriteH / 2;
        this.stype = stype;
        this.drawEffect();
    };
    Effect.prototype.drawEffect = function () {
        var lifetime = 1500;
        this.graphics.beginFill(Game.stypeColor[this.stype]);
        this.graphics.drawCircle(0, 0, Game.spriteR);
        this.graphics.endFill();
        egret.Tween.get(this).to({ scaleX: 2, scaleY: 2, alpha: 0 }, lifetime, egret.Ease.bounceOut);
        var timer = new egret.Timer(lifetime + 100, 0);
        timer.addEventListener(egret.TimerEvent.TIMER, this.removeFromParent, this);
    };
    Effect.prototype.removeFromParent = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return Effect;
}(egret.Shape));
__reflect(Effect.prototype, "Effect");
//# sourceMappingURL=Effect.js.map