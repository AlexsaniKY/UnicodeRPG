import {randInt, randBool, wrap} from "../../shared/numbers";

export interface IPositional{
    x:number;
    y:number;
}

export class Direction implements IPositional{
    x:number;
    y:number;
    constructor(x:number, y:number){
        this.x = x;
        this.y = y;
    }
    apply(to: IPositional){to.x += this.x; to.y += this.y;}
}

export const enum DIR{
    RIGHT,
    UP_RIGHT,
    UP,
    UP_LEFT,
    LEFT,
    DOWN_LEFT,
    DOWN,
    DOWN_RIGHT
}

export let Directions: Direction[] = [
    new Direction( 1, 0), //right
    new Direction( 1, 1), //up right
    new Direction( 0, 1), //up
    new Direction(-1, 1), //up left
    new Direction(-1, 0), //left
    new Direction(-1,-1), //down left
    new Direction( 0,-1), //down
    new Direction( 1,-1), //down right
];

export let FourWayDir: DIR[][] = [
    [DIR.RIGHT],
    [DIR.UP],
    [DIR.LEFT],
    [DIR.DOWN]
];

export let EightWayDir: DIR[][] = [
    [DIR.RIGHT],
    [DIR.UP_RIGHT],
    [DIR.UP],
    [DIR.UP_LEFT],
    [DIR.LEFT],
    [DIR.DOWN_LEFT],
    [DIR.DOWN],
    [DIR.DOWN_RIGHT]
];

export let SixteenWayDir: DIR[][] = [
    [DIR.RIGHT, DIR.RIGHT],

    [DIR.UP_RIGHT,  DIR.RIGHT],
    //[DIR.RIGHT, DIR.UP_RIGHT], 

    [DIR.UP_RIGHT, DIR.UP_RIGHT],

    [DIR.UP, DIR.UP_RIGHT],
    //[DIR.UP_RIGHT, DIR.UP],

    [DIR.UP, DIR.UP],

    [DIR.UP_LEFT, DIR.UP],
    //[DIR.UP, DIR.UP_LEFT], 

    [DIR.UP_LEFT, DIR.UP_LEFT],

    [DIR.LEFT, DIR.UP_LEFT],
    //[DIR.UP_LEFT, DIR.LEFT], 

    [DIR.LEFT, DIR.LEFT],

    [DIR.DOWN_LEFT, DIR.LEFT],
    //[DIR.LEFT, DIR.DOWN_LEFT], 

    [DIR.DOWN_LEFT, DIR.DOWN_LEFT],

    [DIR.DOWN, DIR.DOWN_LEFT],
    //[DIR.DOWN_LEFT, DIR.DOWN], 

    [DIR.DOWN, DIR.DOWN],

    [DIR.DOWN_RIGHT, DIR.DOWN],
    // [DIR.DOWN, DIR.DOWN_RIGHT],

    [DIR.DOWN_RIGHT, DIR.DOWN_RIGHT],

    [DIR.RIGHT, DIR.DOWN_RIGHT],
    // [DIR.DOWN_RIGHT, DIR.RIGHT],

]

export class Trail implements IPositional{
    x:number;
    y:number;
    constructor(x:number, y:number){
        this.x = x;
        this.y = y;
    }
}

export class Walker implements IPositional{
    x:number;
    y:number;
    directions: DIR[][];
    currentDirection: number = 0;
    
    constructor(x:number, y:number, directions:DIR[][] = FourWayDir){
        this.x = x;
        this.y = y;
        this.directions = directions;
    }

    step(direction: Direction){
        direction.apply(this);
    }

    steps(dir_index: number){
        for(let step of this.directions[dir_index])
            this.step(Directions[step]);
        return this.directions[dir_index];
    }

    randomStep(){
        this.currentDirection =
            randInt(0, this.directions.length);
        
        this.step(
            Directions[
                this.currentDirection
            ]);
    }

    randomWander(chanceToChangeDirection:number){
        if(Math.random() < chanceToChangeDirection){
            this.currentDirection += randBool()? 1: -1;
            this.currentDirection = wrap(this.currentDirection, this.directions.length);
        }
        for(let step of this.directions[this.currentDirection])
            this.step(Directions[step]);
        return this.directions[this.currentDirection];
    }

    turn(increment: number){
        this.currentDirection = wrap(this.currentDirection + increment, this.directions.length);
    }

    randomSteer(angle_steps: number){
        return this.steer(randInt(-angle_steps, angle_steps+1));
    }

    steer(turn: number){
        this.currentDirection = wrap( this.currentDirection + turn, this.directions.length)
        return this.steps(this.currentDirection);
    }

    continue(){
        return this.steps(this.currentDirection);
    }
}

