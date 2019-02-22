import { Color } from "../shared/color";
import { Sprite } from "../sprite";
import { TextSprite } from "../textsprite";
import { IDrawable, IDrawScaleOptions, IDrawSourceOptions } from "../shared/drawable";

export class Tile extends Sprite {

    constructor(x: number, y: number) {
        super(x, y);
    }

    fillBase(){
        this.context.fillRect(0, 0, this.width, this.height);
    }

    drawTextSprite(sprite: TextSprite) {
        this.context.font = `${this.width}px sans-serif`;
        this.context.textAlign = "center";
        
        //this.context.fillStyle = "rgba(0,0,0,0)";
        this.context.clearRect(0,0,this.width, this.height);

        //TODO: CONVERT TO UNIVERSAL COLOR USAGE
        this.context.fillStyle = <string>sprite.background;
        //TODO: CONVERT TO USING FILL METHOD
        //this.context.fillRect(0, this.height/3, this.width, this.height);
        this.fillBase();
        for(let c of sprite.chars){
            this.context.fillStyle = <string> c.color;
            this.context.fillText(c.ch, this.width/2 + ((.2 * c.offsetX) * this.width), this.height + 2 + ((this.height/2) * c.offsetY))
        }
    }

    drawNoOffset(target: IDrawable, x:number, y:number, scale_options?:IDrawScaleOptions, from_options?:IDrawSourceOptions){
        super.draw(target, x, y, scale_options, from_options);
    }
}

export class OffsetTile extends Tile{
    originOffsetX:number = 0;
    originOffsetY:number = 0;

    constructor(x: number, y:number, offsetX: number, offsetY:number){
        super(x,y);
        this.originOffsetX = offsetX;
        this.originOffsetY = offsetY;
    }

    fillBase(){
        this.context.fillRect(this.originOffsetX, this.originOffsetY, this.width, this.height);
    }

    draw(target: IDrawable, x:number, y:number, scale_options?:IDrawScaleOptions, from_options?:IDrawSourceOptions){
        super.draw(target, x - this.originOffsetX, y - this.originOffsetY, scale_options, from_options);
    }
}