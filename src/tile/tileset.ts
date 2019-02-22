import { IDrawable } from "../shared/drawable";
import { Color } from "../shared/color";
import { Sprite } from "../sprite";

import{TileSpriteDict, TextSprite} from "../textsprite";
import { Tile, OffsetTile } from "./tile";

export class Tileset extends Sprite{
    tileWidth:number;
    tileHeight:number;
    tileKeys:string[];
    constructor(num_tiles:number, tilewidth:number, tileheight:number, tilekeys?:string[]){
        super(tilewidth * num_tiles, tileheight);
        this.tileWidth = tilewidth;
        this.tileHeight = tileheight;
        if(tilekeys) this.tileKeys = tilekeys;
    }

    prepareTiles(tile: Tile = new Tile(this.tileWidth, this.tileHeight)){
        if(this.tileKeys){
            let name:string;
            let sprite: TextSprite;

            for(let i=0; i<this.tileKeys.length; i++){
                name = this.tileKeys[i];
                sprite = TileSpriteDict.getValue(name);
                tile.drawTextSprite(sprite);

                tile.drawNoOffset(this, i*this.tileWidth, 0);
            }
        }
    }

    static fromKeys(tilekeys: string[], tilewidth:number, tileheight:number): Tileset{
        let newtileset = new Tileset(tilekeys.length, tilewidth, tileheight);
        newtileset.tileKeys = tilekeys;
        return newtileset;
    }

    drawTile(target:IDrawable, index:number, x, y){
        this.draw(
            target, 
            x, 
            y, 
            {
                scalewidth: this.tileWidth, 
                scaleheight: this.height
            },{
                x: index*this.tileWidth,
                y: 0,
                clipwidth: this.tileWidth,
                clipheight: this.tileHeight
            })
    }
}