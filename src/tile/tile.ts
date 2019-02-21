import { Color } from "../shared/color";
import { Sprite } from "../sprite";
import { TextSprite } from "../textsprite";

export class Tile extends Sprite {

    constructor(x: number, y: number) {
        super(x, y);
    }

    drawTextSprite(sprite: TextSprite) {
        this.context.font = `${this.width}px sans-serif`;
        this.context.textAlign = "center";
        
        //this.context.fillStyle = "rgba(0,0,0,0)";
        this.context.clearRect(0,0,this.width, this.height);

        //TODO: CONVERT TO UNIVERSAL COLOR USAGE
        this.context.fillStyle = <string>sprite.background;
        //TODO: CONVERT TO USING FILL METHOD
        this.context.fillRect(0, this.height/3, this.width, this.height);
        for(let c of sprite.chars){
            this.context.fillStyle = <string> c.color;
            this.context.fillText(c.ch, this.width/2 + ((.2 * c.offsetX) * this.width), this.height + 2 + ((this.height/2) * c.offsetY))
        }
    }

}