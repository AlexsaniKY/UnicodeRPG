import { IDrawable, IDrawScaleOptions, IDrawSourceOptions } from "./shared/drawable";
import { Color } from "./shared/color";

export class Sprite implements IDrawable{
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    width: number;
    height: number;

    constructor(width:number, height:number){
        this.width = width;
        this.height = height;
        this.canvas = document.createElement("canvas");
            this.canvas.width = width;
            this.canvas.height = height;
        this.context = this.canvas.getContext("2d");
    }

    draw(target: IDrawable, x:number, y:number, scale_options?:IDrawScaleOptions, from_options?: IDrawSourceOptions): void{
        if(from_options){
                target.context.drawImage(
                    this.canvas,
                    from_options.x,
                    from_options.y,
                    from_options.clipwidth || this.width,
                    from_options.clipheight || this.height,
                    x, 
                    y,
                    scale_options.scalewidth || this.width,
                    scale_options.scaleheight || this.height
                );
                return;
            }else if(scale_options){
                target.context.drawImage(
                    this.canvas,
                    x,
                    y,
                    scale_options.scalewidth,
                    scale_options.scaleheight
                );
                return;
            }
        target.context.drawImage(this.canvas, x, y);
    }


    fill(color: Color, options?: object){
        this.context.fillStyle = color.toString();
        this.context.fillRect(0,0,this.width, this.height);
    }

    fillRect(color: Color, x, y, width, height){
        this.context.fillStyle = color.toString();
        this.context.fillRect(x, y, width, height);
    }

    clear(x:number = 0, y:number = 0, width:number = 0, height:number = 0){
        this.context.clearRect(x, y, width, height);
    }

}