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

loader.add('avatarFrame', 'assets/player_ring_frame.png');
loader.add('avatarBg', 'assets/player_ring_bg.png');
loader.add('resourceBar', 'assets/bar_bg.png');
loader.add('food', 'assets/food.png');
loader.add('water', 'assets/water.png');
loader.add('xp', 'assets/xp.png');
loader.add('inventory', 'assets/inventory.png');

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
});

loader.onComplete.add(() =>  layoutSetup());

function layoutSetup() {
    const avatarRingBg = new LayoutItem()
    .setSprite(sprites.avatarBg)
    .setSize(220)
    .setPosition(1,5)
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


    /*let xpStatusBar = new PIXI.Graphics();
        xpStatusBar.beginFill(0xDDAA00);
        xpStatusBar.drawRect(5, 110, 186, 31);
        xpStatusBar.endFill();
        statusBars.addChild(xpStatusBar);*/
    let xpStatusBar = new PIXI.Graphics();


    const ticker = new PIXI.Ticker();
    ticker.add(animate);
    ticker.start();

    let x = 0;
    let reverse = false;
    function animate() {
        xpStatusBar.clear();
        if(!reverse){
            x+=0.25;
            if(x>=186) {
                reverse = true;
            }
        } else {
            x-=0.25;
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