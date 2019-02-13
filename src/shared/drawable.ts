import { Color } from "./color";

export interface IDrawable {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    width:number;
    height:number;

    draw(target: IDrawable, x:number, y:number, scale_options?:IDrawScaleOptions, from_options?: IDrawSourceOptions): void;
    fill(color: Color, options?: object): void;
}

export interface IDrawScaleOptions{
    scalewidth: number;
    scaleheight: number;
}

export interface IDrawSourceOptions{
    x: number;
    y: number;
    clipwidth?: number;
    clipheight?: number;
}