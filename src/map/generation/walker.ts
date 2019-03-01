import {randInt, randBool, wrap} from "../../shared/numbers";

interface IPositional{
    x:number;
    y:number;
}

class Direction implements IPositional{
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

let Directions: Direction[] = [
    new Direction( 1, 0), //right
    new Direction( 1, 1), //up right
    new Direction( 0, 1), //up
    new Direction(-1, 1), //up left
    new Direction(-1, 0), //left
    new Direction(-1,-1), //down left
    new Direction( 0,-1), //down
    new Direction( 1,-1), //down right
];

export let FourWayDir: DIR[] = [
    DIR.RIGHT,
    DIR.UP,
    DIR.LEFT,
    DIR.DOWN
]

export let EightWayDir: DIR[] = [
    DIR.RIGHT,
    DIR.UP_RIGHT,
    DIR.UP,
    DIR.UP_LEFT,
    DIR.LEFT,
    DIR.DOWN_LEFT,
    DIR.DOWN,
    DIR.DOWN_RIGHT
]


export class Walker implements IPositional{
    x:number;
    y:number;
    directions: DIR[];
    currentDirection: number = 0;
    
    constructor(x:number, y:number, directions:DIR[] = FourWayDir){
        this.x = x;
        this.y = y;
        this.directions = directions;
    }

    step(direction: Direction){
        direction.apply(this);
    }

    randomStep(){
        this.currentDirection = this.directions[
            randInt(0, this.directions.length)
        ]
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
        this.step(Directions[this.directions[this.currentDirection]]);
    }
}