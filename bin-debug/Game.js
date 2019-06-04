var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Game = (function () {
    function Game() {
    }
    Game.random = function (min, max) {
        return parseInt(Math.random() * (max - min + 1) + min);
    };
    Game.uniq = function (array) {
        var result = [];
        var length = array.length;
        var i;
        for (i = 0; i < length; i++) {
            if (result.indexOf(array[i]) < 0) {
                result.push(array[i]);
            }
        }
        return result;
    };
    Game.init = function (scene) {
        Game.spriteH = Game.spriteW = (scene.stage.stageWidth - Game.spriteBaseX * 2) / Game.colamount;
        Game.spriteR = Game.spriteH / 2 * 0.7;
        Game.spriteBaseX = Game.paddingLeftRight;
        Game.spriteBaseY = scene.stage.stageHeight - Game.paddingBottom - Game.rowamount * Game.spriteH;
    };
    Game.printArray = function (arr) {
        console.log(JSON.stringify(arr));
    };
    Game.rowamount = 8;
    Game.colamount = 6;
    Game.spriteTypeAmount = 5;
    Game.stypeColor = [0x0000aa, 0x9a62df, 0x28cd89, 0xed616e, 0xeac20a];
    Game.paddingLeftRight = 20;
    Game.paddingTop = 100;
    Game.paddingBottom = 40;
    Game.spriteBaseX = 20;
    Game.spriteBaseY = 20;
    Game.spriteW = 120;
    Game.spriteH = 120;
    Game.spriteR = 55;
    return Game;
}());
__reflect(Game.prototype, "Game");
//# sourceMappingURL=Game.js.map