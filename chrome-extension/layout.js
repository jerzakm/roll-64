class LayoutItem {
    constructor() {
    }

    setSprite(sprite) {
        this.img = sprite;
        this.img.anchor.x = 0;
        this.img.anchor.y = 0;
        return this;
    }

    setSize(width,height){
        if(typeof(height)=='undefined'){
            height=width;
        }
        this.img.width = width;
        this.img.height = height;
        return this;
    }

    setPosition(x,y){
        this.img.x = x;
        this.img.y = y;
        return this;
    }

    setMask(mask) {
        this.img.mask = mask;
        return this;
    }

    scaleTo(dim, value){
        if(dim=='x') {
            this.setSize(value, this.img.height*(value/this.img.width));
        } else if(dim=='y') {
            let calcY = this.img.width*(value/this.img.height);
            this.setSize(this.img.width*(value/this.img.height), value);
        } else {
            console.log('LayoutItem: ScaleTo dim must be x or y');
        }

        return this;
    }

    setAlpha(alpha){
        this.img.alpha = alpha;
        return this;
    }

    setInteractive(interactive){
        this.img.interactive = interactive;
        return this;
    }

    setAlphaInteractive(alphaFrom, alphaTo) {
        this.img.alpha = alphaFrom;
        this.img.interactive = true;
        this.img.mouseover = function() {
            this.alpha = alphaTo;
          }
        this.img.mouseout = function() {
            this.alpha = alphaFrom;
        }
        return this;
    }

    render(stage) {
        stage.addChild(this.img);
        return this;
    }
}