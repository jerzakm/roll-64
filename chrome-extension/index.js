const url = 'chrome-extension://ldbedgmemefaimdbkajbbcmhgicibajh/';


const canvas = document.getElementById('roll-64-avatar');
const pixelBarFill = (val,max,pixelMax) => { return (val/max)*pixelMax };

const renderer = new PIXI.Renderer({
    view: canvas,
    width: 500,
    height: 250,
    resolution: window.devicePixelRatio,
    autoDensity:true,
    transparent: true,
    antialias: true
});
const stage = new PIXI.Container();
stage.scale.set(0.8);

const loader = PIXI.Loader.shared;
const sprites = {};

let gameRules = {
    maxFood: 100,
    maxWater: 100,
    xpTable: {
        _1: 0,
        _2: 300,
        _3: 900,
        _4: 2700,
        _5: 6500,
        _6: 14000,
        _7: 23000,
        _8: 34000,
        _9: 48000,
        _10: 64000,
        _11: 85000,
        _12: 100000,
        _13: 120000,
        _14: 140000,
        _15: 165000,
        _16: 195000,
        _17: 225000,
        _18: 265000,
        _19: 305000,
        _20: 335000
    }
};

let avatarSettings = {
    uuid: '',
    size: 170,
    x: 15,
    y: 15
}

let playerState = {
    uuid: '',
    avatar: '',
    level: 3,
    food: 67,
    water: 80,
    xp: 100
};

let barState = {
    level: 3,
    food: 0,
    water: 0,
    xp: 0
};

let clickIncrement = 2;

loader.add('avatarFrame', url+'assets/player_ring_frame.png');
loader.add('avatarBg', url+'assets/player_ring_bg.png');
loader.add('resourceBar', url+'assets/bar_bg.png');
loader.add('food', url+'assets/food.png');
loader.add('water', url+'assets/water.png');
loader.add('xp', url+'assets/xp.png');
loader.add('inventory', url+'assets/inventory.png');
loader.add('settings', url+'assets/settings.png');
loader.add('avatar', url+'assets/default_avatar.png');

loader.load((loader, resources) => {
    sprites.avatarFrame = new PIXI.Sprite(resources.avatarFrame.texture);
    sprites.avatarBg = new PIXI.Sprite(resources.avatarBg.texture);
    sprites.foodBar = new PIXI.Sprite(resources.resourceBar.texture);
    sprites.waterBar = new PIXI.Sprite(resources.resourceBar.texture);
    sprites.xpBar = new PIXI.Sprite(resources.resourceBar.texture);
    sprites.food = new PIXI.Sprite(resources.food.texture);
    sprites.water = new PIXI.Sprite(resources.water.texture);
    sprites.xp = new PIXI.Sprite(resources.xp.texture);
    sprites.inventory = new PIXI.Sprite(resources.inventory.texture);
    sprites.settings = new PIXI.Sprite(resources.settings.texture);
    sprites.avatar = new PIXI.Sprite(resources.avatar.texture);
});

loader.onComplete.add(() =>  layoutRender());

function layoutRender() {
    const statusBarMax = 186;
    renderState();

    function renderState() {
        const avatarRingBg = new LayoutItem()
            .setSprite(sprites.avatarBg)
            .setSize(220)
            .setPosition(1,5)
            .render(stage);

        const avatarMask = new PIXI.Graphics()
            .beginFill(0xDD0099)
            .drawCircle(110, 115, 105)
            .endFill();


        const avatar = new LayoutItem()
            .setSprite(sprites.avatar)
            .setSize(avatarSettings.size)
            .setPosition(avatarSettings.x, avatarSettings.y)
            .setMask(avatarMask)
            .render(stage);


        const avatarRing = new LayoutItem()
            .setSprite(sprites.avatarFrame)
            .setSize(220)
            .setPosition(1,5)
            .render(stage);

        const foodBar = new LayoutItem()
            .setSprite(sprites.foodBar)
            .setPosition(184,30)
            .scaleTo('y',50)
            .render(stage);

        const food = new LayoutItem()
            .setSprite(sprites.food)
            .setPosition(180,25)
            .scaleTo('y',55)
            .render(stage);

        const waterBar = new LayoutItem()
            .setSprite(sprites.waterBar)
            .setPosition(200,85)
            .scaleTo('y',50)
            .render(stage);

        const water = new LayoutItem()
            .setSprite(sprites.water)
            .setPosition(197,81)
            .scaleTo('y',55)
            .render(stage);

        const xpBar = new LayoutItem()
            .setSprite(sprites.xpBar)
            .setPosition(190,140)
            .scaleTo('y',50)
            .render(stage);
        const xp = new LayoutItem()
            .setSprite(sprites.xp)
            .setPosition(187,137)
            .scaleTo('y',55)
            .render(stage);

        const Settings = new LayoutItem()
            .setSprite(sprites.settings)
            .setPosition(5,5)
            .scaleTo('y',32)
            .setAlpha(0.5)
            .setAlphaInteractive(0.5,1)
            .render(stage);

        let statusBars = new PIXI.Container();
        statusBars.position.set(236, 38)
        stage.addChild(statusBars);

        let foodStatusBar = new PIXI.Graphics();
            foodStatusBar.beginFill(0xFF3300);
            foodStatusBar.drawRect(0, 0, pixelBarFill(barState.food, gameRules.maxFood, statusBarMax), 31);
            foodStatusBar.endFill();
            statusBars.addChild(foodStatusBar);

        let textStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 14,
            fill: '#FFF'
        });
        let basicText = new PIXI.Text(barState.xp+' / '+gameRules.xpTable['_'+barState.level]+' xp',textStyle);
            basicText.x = 300;
            basicText.y = 155;
            basicText.alpha = 0.55;
            stage.addChild(basicText);

        let waterStatusBar = new PIXI.Graphics();
            waterStatusBar.beginFill(0x3333FF);
            waterStatusBar.drawRect(15, 55, pixelBarFill(barState.water, gameRules.maxWater, statusBarMax), 31);
            waterStatusBar.endFill();
            statusBars.addChild(waterStatusBar);


        let xpStatusBar = new PIXI.Graphics();
            xpStatusBar.beginFill(0xDDAA00);
            xpStatusBar.drawRect(5, 110, pixelBarFill(barState.xp, gameRules.xpTable['_'+barState.level], statusBarMax), 31);
            xpStatusBar.endFill();
            statusBars.addChild(xpStatusBar);
    }

    const ticker = new PIXI.Ticker();
    ticker.add(animate);
    ticker.start();

    function animate() {
        if(barState.xp!=playerState.xp) {
            barState.xp += calcBarIncrement(barState.xp, playerState.xp);
            renderState();
        }
        if(barState.food!=playerState.food) {
            barState.food += calcBarIncrement(barState.food, playerState.food);
            renderState();
        }
        if(barState.water!=playerState.water) {
            barState.water += calcBarIncrement(barState.water, playerState.water);
            renderState();
        }
        renderer.render(stage);
    }

    function calcBarIncrement(from, to) {
        let increment = (from-to)/120;
        if(from>to){
            increment = -Math.ceil(increment);
        }
        if(from<to){
            increment = -Math.floor(increment);
        }
        return increment;
    }
}