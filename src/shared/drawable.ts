import { Color } from "./color";

export interface Drawable {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    draw(target: Drawable, options?: object): void;
    fill(color: Color, options?: object): void;
}