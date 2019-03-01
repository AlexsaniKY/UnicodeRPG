import {Map} from "./map"
import { Tileset } from "../tile/tileset";
import { Sprite } from "../sprite";

export class MapCanvas extends Sprite{
    map: Map;
    tileset: Tileset;
    constructor(map: Map, tileset: Tileset) {
        super(tileset.tileWidth * map.width, tileset.tileHeight * map.height);
        this.map = map;
        this.tileset = tileset;

        // let tile_w = tileset.tileWidth; 
        // let tile_h = tileset.tileHeight;// * (2/3);//TODO fix this hardcode
        for (let row = 0; row < map.height; row++) {
            for (let col = 0; col < map.width; col++) {
                this.drawTile(tileset, col, row);
                //tileset.drawTile(this, map.grid.at(col, row), tile_w * col, tile_h * row)
            }
        }
    }

    redraw(){
        for (let row = 0; row < this.map.height; row++) {
            for (let col = 0; col < this.map.width; col++) {
                this.drawTile(this.tileset, col, row);
                //tileset.drawTile(this, map.grid.at(col, row), tile_w * col, tile_h * row)
            }
        }
    }

    drawTile(tileset: Tileset, x:number, y:number){
        tileset.drawTile(this, this.map.grid.at(x, y), tileset.tileWidth * x, tileset.tileHeight * y);
    }

}