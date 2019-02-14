import { Color } from "../shared/color";
import { Sprite } from "../sprite";
import { TextSprite } from "../textsprite";

export class Tile extends Sprite {

    constructor(x: number, y: number) {
        super(x, y);
    }

    drawTextSprite(sprite: TextSprite) {
        this.context.font = "36px sans-serif";
        this.context.textAlign = "center";
        //TODO: CONVERT TO UNIVERSAL COLOR USAGE
        this.context.fillStyle = <string>sprite.background;
        //TODO: CONVERT TO USING FILL METHOD
        this.context.fillRect(0, 0, this.width, this.height);
        for(let c of sprite.chars){
            this.context.fillStyle = <string> c.color;
            this.context.fillText(c.ch, this.width/2 + ((.2 * c.offsetX) * 32), this.height + 2 + (25 * c.offsetY))
        }
    }

}