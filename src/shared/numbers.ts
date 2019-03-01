export function randInt(min:number, max:number): number {
    return Math.floor(Math.random() * (max - min) + min);
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