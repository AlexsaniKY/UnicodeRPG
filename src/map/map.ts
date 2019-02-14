export class Map {
    width:number;
    height:number;
    grid;
    constructor({ width, height, default_index = 0 }) {
        this.width = width;
        this.height = height;
        this.grid = []
        let row;
        for (let y = 0; y < height; y++) {
            row = [];
            for (let x = 0; x < width; x++) {
                row.push(default_index);
            }
            this.grid.push(row);
        }
    }
    static fromIndices(indexmap: number[][]): Map{
        return {
            width: indexmap[0].length,
            height: indexmap.length,
            grid: indexmap
        };
    }
}