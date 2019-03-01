export class IndexMap {
    width: number;
    height: number;
    grid: Uint8Array[];
    constructor(width: number, height: number, default_index?: number) {
        this.width = width;
        this.height = height;
        this.grid = [];
        if (!!width && !!height){
            for (let y = 0; y < height; y++) {
                this.grid.push(new Uint8Array(width));
            }
            if (default_index !== undefined) this.fill(default_index);
            }
        //console.log(this.grid);
    }

    at(x: number, y: number): number {
        if (y < this.height && x < this.width)
            return this.grid[y][x]
        else return -1;
    }

    set(x: number, y: number, value: number): void {
        if (y < this.height && x < this.width)
            this.grid[y][x] = value;
    }

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

    //https://blog.ostermiller.org/dilate-and-erode
    dilate(selected_value: number, distance: number) {
        let expansion_map = new IndexMap(this.width, this.height);

        for (let y = 0; y < this.height; y++)
            for (let x = 0; x < this.width; x++) {
                if (this.grid[y][x] == selected_value)
                    expansion_map.grid[y][x] = 0;
                else {
                    expansion_map.grid[y][x] = this.width + this.height;
                    if (x > 0)
                        expansion_map.grid[y][x] = Math.min(
                            expansion_map.grid[y][x],
                            expansion_map.grid[y][x - 1] + 1
                        )
                    if (y > 0)
                        expansion_map.grid[y][x] = Math.min(
                            expansion_map.grid[y][x],
                            expansion_map.grid[y - 1][x] + 1
                        )
                }
            }
        for(let y = this.height-1; y>=0; y--)
            for(let x = this.width-1; x>=0; x--){
                if (x + 1 < this.width)
                    expansion_map.grid[y][x] = Math.min(
                        expansion_map.grid[y][x],
                        expansion_map.grid[y][x+1]+1
                    )
                if (y+1 < this.height)
                    expansion_map.grid[y][x] = Math.min(
                        expansion_map.grid[y][x],
                        expansion_map.grid[y+1][x]+1
                    )
            }
        for(let y = 0; y<this.height; y++)
            for(let x = 0; x<this.width; x++)
                if(expansion_map.grid[y][x] <= distance)
                    this.grid[y][x] = selected_value;
        //return expansion_map;
    }

}