import { IDrawable } from "../shared/drawable";
import { Color } from "../shared/color";
import { Sprite } from "../sprite";

export class Tileset extends Sprite{
    tilewidth:number;
    tileheight:number;
    constructor(num_tiles:number, tilewidth:number, tileheight:number){
        super(tilewidth * num_tiles, tileheight);
        this.tilewidth = tilewidth;
        this.tileheight = tileheight;
    }
    drawTile(target:IDrawable, index:number, x, y){
        this.draw(
            target, 
            x, 
            y, 
            {
                scalewidth: this.tilewidth, 
                scaleheight: this.height
            },{
                x: index*this.tilewidth,
                y: 0,
                clipwidth: this.tilewidth,
                clipheight: this.tileheight
            })
    }
}