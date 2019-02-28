export class IndexMap {
    width: number;
    height: number;
    grid: Uint8Array[];
    constructor(width: number, height: number, default_index?: number) {
        this.width = width;
        this.height = height;
        this.grid = [];
        if (!(width + height))
            for (let y = 0; y < height; y++) {
                this.grid.push(new Uint8Array(width));
                if (default_index !== undefined) this.fill(default_index);
            }
    }

    at(x, y): number { return this.grid[y][x] }

    fill(val: number) {
        for (let i of this.grid) i.fill(val);
    }

    static fromArrayArray(arr: number[][]): IndexMap {
        var returnMap: IndexMap = new IndexMap(0, 0);
        let width = arr[0].length;
        let height = arr.length;

        for (let y = 0; y < height; y++) {
            returnMap.grid.push(new Uint8Array(arr[y]));
        }

        returnMap.width = width;
        returnMap.height = height;
        return returnMap;
    }

}