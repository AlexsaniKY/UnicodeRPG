export class MapCanvas {
    constructor(map, tileset) {
        this._map = map;
        this._tileset = tileset;
        this._canvas = document.createElement("canvas");
        this._canvas.width = map.width * tileset.width;
        this._canvas.height = map.height * tileset.height;
        this._context = this._canvas.getContext("2d");

        let tile_w = tileset.width; 
        let tile_h = tileset.height;
        for (let row = 0; row < map.height; row++) {
            for (let col = 0; col < map.width; col++) {
                console.log(tileset[map.grid[row][col]]);
                this._context.drawImage(tileset.tiles, tile_w * col, tile_h * row);
            }
        }
    }

}