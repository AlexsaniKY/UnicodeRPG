import {Globals} from "../globals";
import { Color } from "../shared/color";
import { Tileset } from "../tile/tileset";


let maxfps = 60;
let frame_length = 1000./ maxfps;
let last_frame_stamp = 0;
let frame_delta = frame_length;
let _tileset: Tileset;

export function setTileset(tileset: Tileset){
    _tileset = tileset;
}

export function gameLoop(timestamp) {
    frame_delta = timestamp - last_frame_stamp;
    // if (timestamp < frame_delta) {
    //     //console.log(last_frame_stamp + frame_length - timestamp);
    //     requestAnimationFrame(gameLoop);
    //     return;
    // }
    last_frame_stamp = timestamp;

    Globals.screen.clear();
    Globals.screen.fill(new Color(255,0,0));
    _tileset.draw(Globals.screen, 0,0);
    Globals.screen.fillRect(new Color(0,0,0), 32, 48, 16, 16);

    requestAnimationFrame(gameLoop);
}