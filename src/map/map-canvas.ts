import {Map} from "./map"
import { Tileset } from "../tile/tileset";
import { Sprite } from "../sprite";

export class MapCanvas extends Sprite{
    map: Map;
    tileset: Tileset;
    constructor(map: Map, tileset: Tileset) {
        super(tileset.tilewidth * map.width, tileset.tileheight * map.height);
        this.map = map;
        this.tileset = tileset;

        let tile_w = tileset.tilewidth; 
        let tile_h = tileset.tileheight;
        for (let row = 0; row < map.height; row++) {
            for (let col = 0; col < map.width; col++) {
                tileset.drawTile(this, map.grid[row][col], tile_w * col, tile_h * row)
            }
        }
    }

}