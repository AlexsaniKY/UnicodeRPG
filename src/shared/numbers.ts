export function randInt(min:number, max:number): number {
    return Math.floor(Math.random() * (max - min)) + min;
}

export function randFloat(min:number, max:number): number {
    return Math.random() * (max - min) + min;
}

export function randBool(): boolean {
    return !!Math.round(Math.random());
}

export function wrap(value: number, mod: number) {
    return ((value % mod) + mod) % mod;
}

export function clamp(value:number, min:number, max:number) {
    return Math.min(Math.max(value, min), max);
  };

export class Dither{
    gen: IterableIterator<number>;
    constructor(){
        this.gen = ditherGen();
        this.gen.next();
    }
    
    next(val: number){
        return this.gen.next(val).value;
    }
}

function* ditherGen(){
    let error:number = 0;
    let value:number = 0;
    let int_val:number = 0;
    while(true){
      value = yield int_val;
      int_val = Math.floor(value + error);
      error += value - int_val;
      //console.log("error", error);
    }
}