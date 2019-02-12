import { Drawable } from "../shared/drawable";
import { Color } from "../shared/color";

export class Tileset implements Drawable{
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    draw(target: Drawable, options?: object){}
    fill(color:Color, options?: object):void{}
}