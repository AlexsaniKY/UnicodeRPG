import { Tileset } from "../tile/tileset";
import { Globals } from "../globals"
import { ViewScreen } from "../screen";
import { OffsetTile } from "../tile/tile";

let offtile;
export function gameInit(tileset: Tileset) {
    offtile = new OffsetTile(tileset.tileWidth, tileset.tileHeight, 0, tileset.tileHeight * (1/3));
    console.log(offtile);
    tileset.prepareTiles(offtile);

    Globals.screen = new ViewScreen(320, 240);
}