var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Map = (function () {
    function Map() {
    }
    ///初始化
    Map.prototype.initMap = function (scene) {
        this.scene = scene;
        //矩阵，先写死，后面变为随机的
        this.matrix = (function () {
            var arr = [];
            for (var i = 0; i < Game.rowamount; i++) {
                var a = [];
                for (var j = 0; j < Game.colamount; j++) {
                    a.push(Game.random(0, Game.spriteTypeAmount - 1));
                }
                arr.push(a);
            }
            arr.push([]);
            console.log(arr);
            return arr;
        })();
        //调用函数，生成精灵
        this.createSpritesByMatrix();
    };
    //根据矩阵创建精灵，创建出的也是一个二维数组。
    Map.prototype.createSpritesByMatrix = function () {
        this.sprites = []; //二维数组
        //遍历每一行
        for (var r = 0; r < Game.rowamount; r++) {
            var _temp = [];
            for (var c = 0; c < Game.colamount; c++) {
                _temp.push(new Sprite(c, r, this.matrix[r][c]));
            }
            this.sprites.push(_temp);
        }
        //渲染自己精灵矩阵中的所有精灵
        for (var r = 0; r < Game.rowamount; r++) {
            for (var c = 0; c < Game.colamount; c++) {
                //只要是精灵的实例，就能调用精灵的方法
                this.scene.addChild(this.sprites[r][c]);
            }
        }
    };
    //爆炸
    Map.prototype.bomb = function (lines) {
        for (var i = 0; i < lines.length; i++) {
            //让爆炸的元素在matrix阵上变为■
            this.matrix[lines[i].startrow][lines[i].startcol] = "■";
            this.sprites[lines[i].startrow][lines[i].startcol].bomb();
        }
    };
    Map.prototype.drop = function () {
        //【计算下落行数】
        //下落行数阵
        this.dropnumber = [[], [], [], [], [], [], [], []];
        //看看当前的matrix，依次遍历每一个元素，计算这个元素应该下落的行数。就是统计这个元素下面的■的个数。
        for (var row = Game.rowamount - 1; row >= 0; row--) {
            for (var col = 0; col < Game.colamount; col++) {
                var sum = 0;
                for (var _row = row + 1; _row < Game.rowamount; _row++) {
                    if (this.matrix[_row][col] == "■") {
                        sum++;
                    }
                }
                //写入矩阵
                this.dropnumber[row][col] = sum;
                //命令动画
                if (sum > 0 && this.matrix[row][col] != "■") {
                    console.log("drop move to " + col + "  " + row + " " + (row + sum));
                    this.sprites[row][col].moveTo(col, row + sum);
                }
                //紧凑编码矩阵
                if (sum != 0) {
                    this.matrix[row + sum][col] = this.matrix[row][col];
                    this.matrix[row][col] = "■";
                    var _sprite = this.sprites[row + sum][col];
                    this.sprites[row + sum][col] = this.sprites[row][col];
                    this.sprites[row][col] = _sprite;
                }
            }
        }
        console.log("\u6700\u7EC8 " + this.matrix);
        ;
    };
    Map.prototype.supplement = function () {
        //遍历当前的matrix，遇见一个■就new一个新的，同时命令动画
        for (var row = 0; row < Game.rowamount; row++) {
            for (var col = 0; col < Game.colamount; col++) {
                if (this.matrix[row][col] == "■") {
                    var stype = Game.random(0, Game.spriteTypeAmount - 1);
                    this.sprites[row][col].init(col, row, stype);
                    //在天上就位
                    this.sprites[row][col].y -= (Game.spriteH * 4);
                    //然后下落
                    this.sprites[row][col].moveTo(col, row);
                    //写matrix
                    this.matrix[row][col] = stype;
                }
            }
        }
    };
    return Map;
}());
__reflect(Map.prototype, "Map");
//# sourceMappingURL=Map.js.map