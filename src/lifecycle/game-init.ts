import { Tile } from "../tile/tile";
import { Color } from "../shared/color";
import { TextSprite } from "../textsprite";
import { Tileset } from "../tile/tileset";

export function gameInit(tiles:TextSprite[], tile: Tile, __tileset: string[], tileset: Tileset) {
    tile.fill( new Color(0,0,30) );

    let spr;
    let i = 0;

    for (let t of __tileset) {
        for (let s of tiles) {
            if (t == s.name) {
                spr = s;
            }
        }
        tile.drawTextSprite(spr);
        tile.draw(tileset, i*tile.width, 0);

        i++;
    }
}