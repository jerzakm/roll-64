import LayoutItem from "/layout.js";

const canvas = document.getElementById('mycanvas');
const renderer = new PIXI.Renderer({
    view: canvas,
    width: 900,
    height: 500,
    resolution: window.devicePixelRatio,
    autoDensity:true,
    transparent: true,
    antialias: true
});
const stage = new PIXI.Container();
stage.scale.set(1);

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
    size: 190,
    x: 15,
    y: 15
}

let playerState = {
    uuid: '',
    avatar: '',
    level: 3,
    food: 0,
    water: 0,
    xp: 0
};

let clickIncrement = 2;

const controls = [
    ['left','x',-clickIncrement],
    ['right','x',clickIncrement],
    ['up','y',-clickIncrement],
    ['down','y',clickIncrement],
    ['scale_up','size',clickIncrement],
    ['scale_down','size',-clickIncrement],
];

for (let c of controls) {
    document.getElementById(c[0]).addEventListener("click", function(){
        avatarSettings[c[1]]+=c[2];
        layoutRender();
    });
}

loader.add('avatarFrame', 'assets/player_ring_frame.png');
loader.add('avatarBg', 'assets/player_ring_bg.png');
loader.add('resourceBar', 'assets/bar_bg.png');
loader.add('food', 'assets/food.png');
loader.add('water', 'assets/water.png');
loader.add('xp', 'assets/xp.png');
loader.add('inventory', 'assets/inventory.png');
loader.add('avatar', 'test.png');

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
    sprites.avatar = new PIXI.Sprite(resources.avatar.texture);
});

loader.onComplete.add(() =>  layoutRender());

function layoutRender() {

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

    let statusBars = new PIXI.Container();
    statusBars.position.set(236, 38)
    stage.addChild(statusBars);

    //Create the front red rectangle
    let foodStatusBar = new PIXI.Graphics();
        foodStatusBar.beginFill(0xFF3300);
        foodStatusBar.drawRect(0, 0, 186, 31);
        foodStatusBar.endFill();
        statusBars.addChild(foodStatusBar);

    let waterStatusBar = new PIXI.Graphics();
        waterStatusBar.beginFill(0x3333FF);
        waterStatusBar.drawRect(15, 55, 186, 31);
        waterStatusBar.endFill();
        statusBars.addChild(waterStatusBar);

    let xpStatusBar = new PIXI.Graphics();


    const ticker = new PIXI.Ticker();
    ticker.add(animate);
    ticker.start();

    let x = 0;
    let reverse = false;
    function animate() {
        xpStatusBar.clear();
        if(!reverse){
            x+=0.025;
            if(x>=186) {
                reverse = true;
            }
        } else {
            x-=0.025;
            if(x<=0) {
                reverse = false;
            }
        }
        xpStatusBar.beginFill(0xDDAA00);
        xpStatusBar.drawRect(5, 110, x, 31);
        xpStatusBar.endFill();
        statusBars.addChild(xpStatusBar);

        renderer.render(stage);
    }
}