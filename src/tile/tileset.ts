import { IDrawable } from "../shared/drawable";
import { Color } from "../shared/color";
import { Sprite } from "../sprite";

export class Tileset extends Sprite{
    constructor(width:number, height:number){
        super(width, height);
    }
}