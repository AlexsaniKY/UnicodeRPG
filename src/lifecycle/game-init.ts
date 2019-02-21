import { Tileset } from "../tile/tileset";
import { Globals } from "../globals"
import { ViewScreen } from "../screen";

export function gameInit(tileset: Tileset) {
    tileset.prepareTiles();

    Globals.screen = new ViewScreen(320, 240);
}