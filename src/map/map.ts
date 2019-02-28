import { IndexMap } from "./index-map";

export class Map {
    width:number;
    height:number;
    grid: IndexMap;
    constructor( width:number, height:number, default_index?: number) {
        this.width = width;
        this.height = height;
        this.grid = new IndexMap(width, height, default_index);
    }
    static fromIndices(indexArrArr: number[][]): Map{
        return {
            width: indexArrArr[0].length,
            height: indexArrArr.length,
            grid: IndexMap.fromArrayArray(indexArrArr)
        };
    }
}