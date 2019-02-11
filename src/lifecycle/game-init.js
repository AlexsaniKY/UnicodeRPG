



export function gameInit(tiles, tile_context, tileset, tileset_context) {
    tile_context.fillStyle = "#002";
    tile_context.fillRect(0, 0, 32, 48);

    let len = tileset.length;
    for (let i = 0; i < len; i++) {
        tileset_context.fillStyle = "#" + (i * (4096 / len)).toString(16).padStart(2, '0');
        console.log((i * (4096 / len)).toString(16).padStart(3, '0'));
        console.log(i * 32);
        tileset_context.fillRect(i * 32, 0, 32, 48);
    }

    let spr;
    let i = 0;
    let p = document.createElement("p");
    tileset_context.font = "36px sans-serif";
    tileset_context.textAlign = "center";
    for (let t of tileset) {
        //if (i == 1 )return;
        for (let s of tiles) {
            if (t == s.name) {
                spr = s;
            }
        }
        tileset_context.fillStyle = spr.background;
        tileset_context.fillRect(i * 32, 0, 32, 48);
        for (let c of spr.chars) {
            tileset_context.fillStyle = c.color;
            tileset_context.fillText(c.ch, 16 + ((.2 * c.offsetX + i) * 32), 50 + (25 * c.offsetY));
        }
        i++;
    }


}