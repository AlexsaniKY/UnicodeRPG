import { IDrawable } from "../shared/drawable";
import { Color } from "../shared/color";
import { Sprite } from "../sprite";

import{TileSpriteDict, TextSprite} from "../textsprite";
import { Tile, OverlapTile } from "./tile";

export class Tileset extends Sprite{
    tileWidth:number;
    tileHeight:number;
    trueTileWidth:number;
    trueTileHeight:number;
    tileKeys:string[];
    tile:Tile;
    constructor(num_tiles:number, tile:Tile, tilekeys?:string[]){
        super(tile.trueWidth * num_tiles, tile.trueHeight);
        this.tile = tile;
        this.tileWidth = tile.baseWidth;
        this.trueTileWidth = tile.trueWidth;

        this.tileHeight = tile.baseHeight;
        this.trueTileHeight = tile.trueHeight;
        
        if(tilekeys) this.tileKeys = tilekeys;
    }

    //TODO: rely on internal tile from constructor
    prepareTiles(){//tile: Tile = new Tile(this.tileWidth, this.tileHeight)){
        if(this.tileKeys){
            let name:string;
            let sprite: TextSprite;

            for(let i=0; i<this.tileKeys.length; i++){
                name = this.tileKeys[i];
                sprite = TileSpriteDict.getValue(name);
                this.tile.drawTextSprite(sprite);

                this.tile.drawNoOffset(this, i*this.tileWidth, 0);
            }
        }
    }

    //TODO: how to handle this case with OverlayTiles?
    static fromKeys(tilekeys: string[], tilewidth:number, tileheight:number): Tileset{
        let newtileset = new Tileset(tilekeys.length, new Tile(tilewidth, tileheight));
        newtileset.tileKeys = tilekeys;
        return newtileset;
    }

    drawTile(target:IDrawable, index:number, x, y){
        this.draw(
            target, 
            x, 
            y -( "originOffsetY" in this.tile? this.tile["originOffsetY"] : 0),// - 8, 
            {
                scalewidth: this.trueTileWidth, 
                scaleheight: this.trueTileHeight
            },{
                x: index*this.trueTileWidth,
                y: 0,
                clipwidth: this.trueTileWidth,
                clipheight: this.trueTileHeight
            })
    }
}