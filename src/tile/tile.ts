import { Drawable } from "../shared/drawable";
import { Color } from "../shared/color";

export class Tile implements Drawable{
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    width: number;
    height:number;

    constructor(x:number, y:number){
        this.canvas = document.createElement("canvas");
            this.canvas.width = x;
            this.canvas.height = y;
        this.context = this.canvas.getContext("2d");    

        this.width = x;
        this.height = y;
    }
    draw(target: Drawable, options?: object){}
    fill(color: Color, options?: object){
        this.context.fillStyle = color.toString();
        this.context.fillRect(0,0,this.width, this.height);
    }
}