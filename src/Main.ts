//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends eui.UILayer {

    private lines = [];
    private curline: TouchLine;
    private startcol;
    private startrow;
    private starttype;

    private map: Map;

    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        let sky = this.createBitmapByName("bg_jpg");
        this.addChild(sky);
        let stageW = this.stage.stageWidth;
        let stageH = this.stage.stageHeight;
        sky.width = stageW;
        sky.height = stageH;

        let topMask = new egret.Shape();
        topMask.graphics.beginFill(0x000000, 0.5);
        topMask.graphics.drawRect(0, 0, stageW, 172);
        topMask.graphics.endFill();
        topMask.y = 33;
        this.addChild(topMask);

        let icon: egret.Bitmap = this.createBitmapByName("egret_icon_png");
        this.addChild(icon);
        icon.x = 26;
        icon.y = 33;

        let line = new egret.Shape();
        line.graphics.lineStyle(2, 0xffffff);
        line.graphics.moveTo(0, 0);
        line.graphics.lineTo(0, 117);
        line.graphics.endFill();
        line.x = 172;
        line.y = 61;
        this.addChild(line);


        let colorLabel = new egret.TextField();
        colorLabel.textColor = 0xffffff;
        colorLabel.width = stageW - 172;
        colorLabel.textAlign = "center";
        colorLabel.text = "2019.6.3 - 2019.6.4 by yangshuai";
        colorLabel.size = 24;
        colorLabel.x = 172;
        colorLabel.y = 80;
        this.addChild(colorLabel);


        Game.init(this);
        let map = new Map();
        map.initMap(this);
        this.map = map;

        this.bindEvent();
    }

    bindEvent() {
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchbeginHandler, this);
    }
    touchbeginHandler(evt: egret.TouchEvent) {

        this.startcol = Math.floor((evt.stageX - Game.spriteBaseX) / Game.spriteW);
        this.startrow = Math.floor((evt.stageY - Game.spriteBaseY) / Game.spriteH);
        // console.log(Game.spriteBaseX, Game.spriteW);
        // console.log(Game.spriteBaseY, Game.spriteH);
        // console.log(startcol, startrow);
        // console.log("/////////////");
        if (this.startcol < 0 || this.startrow < 0 || this.startcol > Game.colamount - 1 || this.startrow > Game.rowamount - 1) {
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchmoveHandler, this);
            return;
        }

        //注册一个事件
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchmoveHandler, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.touchupHandler, this);

        this.starttype = this.map.matrix[this.startrow][this.startcol];
        this.addTouchLine(this.startcol, this.startrow, this.starttype);

    }

    touchmoveHandler(evt: egret.TouchEvent) {
        var movecol = Math.floor((evt.stageX - Game.spriteBaseX) / Game.spriteW);
        var moverow = Math.floor((evt.stageY - Game.spriteBaseY) / Game.spriteH);
        var movetype = this.map.matrix[moverow][movecol];

        var x = evt.stageX - Game.spriteBaseX - movecol * Game.spriteW - Game.spriteW / 2;
        var y = evt.stageY - Game.spriteBaseY - moverow * Game.spriteH - Game.spriteH / 2;
        var xx = Math.pow(x, 2);
        var yy = Math.pow(y, 2);
        var rr = Math.pow(Game.spriteR, 2);
        // console.log(`x ${x} y ${y} xx ${xx} yy ${yy} rr ${rr}`);
        if (xx + yy > rr) {
            return;
        }

        // console.log(`命中1:  ${this.startcol}  ${this.startrow}  ${movecol}  ${moverow} movetype ${movetype}  starttype ${this.starttype}  ${this.map.sprites[moverow][movecol].selected}`);
        if (movetype == this.starttype && !this.map.sprites[moverow][movecol].selected) {
            if (
                (this.startrow == moverow && Math.abs(this.startcol - movecol) == 1)
                || (this.startcol == movecol && Math.abs(this.startrow - moverow) == 1)
                || (Math.abs(this.startcol - movecol) == 1 && Math.abs(this.startrow - moverow) == 1)
            ) {
                this.curline.moveToGrid(movecol, moverow);
                this.addTouchLine(movecol, moverow, this.starttype);
                this.startcol = movecol;
                this.startrow = moverow;
            }
        }

        this.curline.moveTo(evt.stageX, evt.stageY);
    }

    touchupHandler() {
        console.log(`初始 ${this.map.matrix}`);
        Game.printArray(this.map.matrix);
        //重置touchlines
        for (var i = 0; i < this.lines.length; i++) {
            let _line = this.lines[i];
            this.removeChild(_line);

            this.map.sprites[_line.startrow][_line.startcol].selected = false;
            console.log(`重置touchlines ${_line.startcol}  ${_line.startrow}`);
        }

        if (this.lines.length > 1) {
            this.map.bomb(this.lines);
            this.map.drop();
            this.map.supplement();
        }
        this.lines = [];
        this.curline = null;
        console.log(`标记 ${this.map.matrix}`);


        //删除事件
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchmoveHandler, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchupHandler, this);
    }

    /**
     * 添加line
     */
    addTouchLine(startcol, startrow, type) {
        let line = new TouchLine(startcol, startrow, type);
        this.addChild(line);
        this.lines.push(line);
        this.curline = line;

        this.map.sprites[startrow][startcol].selected = true;

        let effect = new Effect(startcol, startrow, type);
        this.addChild(effect);

        console.log(`addTouchLine ${startcol}  ${startrow} ${type}`);
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 点击按钮
     * Click the button
     */
    private onButtonClick(e: egret.TouchEvent) {
        let panel = new eui.Panel();
        panel.title = "Title";
        panel.horizontalCenter = 0;
        panel.verticalCenter = 0;
        this.addChild(panel);
    }
}
