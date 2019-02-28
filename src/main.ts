import { tiles } from './textsprite';
import { gameInit } from './lifecycle/game-init';
import { gameLoop, setTileset } from './lifecycle/game-loop';
import { Map } from './map/map';
import {MapCanvas} from './map/map-canvas';
import { Tile, OverlapTile } from './tile/tile';
import { Tileset } from './tile/tileset';
import { Globals } from './globals';



window.addEventListener("keydown", (event) => {
	//console.log("" + event.key + " " + event.keyIdentifier + " " + event.keyCode);
	//event.key will respect shift, the keycode shows code from capital letter
	let player = document.getElementById("character");
	let x = parseFloat(player.style.left);
	let y = parseFloat(player.style.top);
	console.log(event.keyCode);
	let dx = 0, dy = 0;
	switch (event.keyCode) {
		case 68://D
			dx += .5;
			break;
		case 83://S
			dy += .5;
			break;
		case 65://A
			dx -= .5;
			break;
		case 87://W
			dy -= .5;
			break;
	}

	player.style.left = dx * 0.8 + x + "em";
	player.style.top = dy * 1.2 + y + "em";

}, true);


let tilekeys = ["Grass", "Tree", "Dirt", "Water"];

let map = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 1, 2, 2, 1, 1, 0, 2, 1, 1],
	[1, 0, 0, 2, 0, 0, 0, 2, 3, 1],
	[1, 0, 2, 2, 0, 0, 3, 2, 2, 1],
	[1, 0, 2, 0, 0, 0, 0, 2, 3, 1],
	[1, 1, 2, 0, 0, 1, 0, 2, 3, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

// let map = [];
// for(let j=0; j < 100; j++){
// 	let row = [];
// 	for(let i=0; i < 100; i++)
// 		row.push((i+j)%__tileset.length);
// 	map.push(row);
// }

let scale = .25;

let tilewidth = 32 * scale;
let tileheight = 48 * scale;

//let tile = new OffsetTile(tilewidth, tileheight, );

let tileset: Tileset = new Tileset(tilekeys.length, new OverlapTile(tilewidth, tileheight, 0, tileheight* (1/3)),tilekeys);// .fromKeys(__tileset, tilewidth, tileheight);

gameInit(tileset);

let newmap = new MapCanvas(
	Map.fromIndices(map),
	//new Map(100, 100),
	tileset
	);
console.log(newmap);

setTileset(tileset);

document.getElementById("new-grid-div").appendChild(newmap.canvas);
document.getElementById("new-grid-div").appendChild(tileset.canvas);
//document.getElementById("new-grid-div").appendChild(tile.canvas);
document.getElementById("new-grid-div").appendChild(Globals.screen.canvas);


gameLoop(0);