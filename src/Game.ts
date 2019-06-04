class Game {
    public static rowamount = 8;
    public static colamount = 6;
    public static spriteTypeAmount = 5;
    public static stypeColor = [0x0000aa, 0x9a62df, 0x28cd89, 0xed616e, 0xeac20a];

    public static paddingLeftRight = 20;
    public static paddingTop = 100;
    public static paddingBottom = 40;

    public static spriteBaseX = 20;
    public static spriteBaseY = 20;
    public static spriteW: number = 120;
    public static spriteH: number = 120;
    public static spriteR: number = 55;

    public static random(min, max) {
        return parseInt(Math.random() * (max - min + 1) + min);
    }

    public static uniq(array) {
        var result = [];
        var length = array.length;
        var i;
        for (i = 0; i < length; i++) {
            if (result.indexOf(array[i]) < 0) {
                result.push(array[i]);
            }
        }
        return result;
    }
    public static init(scene) {
        Game.spriteH = Game.spriteW = (scene.stage.stageWidth - Game.spriteBaseX * 2) / Game.colamount;
        Game.spriteR = Game.spriteH / 2 * 0.7;
        Game.spriteBaseX = Game.paddingLeftRight;
        Game.spriteBaseY = scene.stage.stageHeight - Game.paddingBottom - Game.rowamount * Game.spriteH;
    }

    public static printArray(arr) {
        console.log(JSON.stringify(arr));
    }
}