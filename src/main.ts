import { tiles } from './textsprite';
import { gameInit } from './lifecycle/game-init';
import { gameLoop, setContext, setTilesetCanvas } from './lifecycle/game-loop';
import { Map } from './map/map';
import {MapCanvas} from './map/map-canvas';
import { Tile } from './tile/tile';
import { Tileset } from './tile/tileset';



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


let __tileset = ["Grass", "Tree", "Dirt", "Water"];

let map = [
	[1, 1, 1, 1, 1, 1],
	[1, 0, 0, 2, 3, 1],
	[1, 0, 2, 2, 3, 1],
	[1, 0, 2, 0, 3, 1],
	[1, 1, 2, 1, 3, 1]
];

let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("canvas_element");
let context = canvas.getContext("2d");
let width = canvas.offsetWidth;
let height = canvas.offsetHeight;

let tile = new Tile(32, 48);

let tileset: Tileset = new Tileset(__tileset.length, 32, 48);


gameInit(tiles, tile, __tileset, tileset);

let newmap = new MapCanvas(
	Map.fromIndices(map),
	tileset
	);
console.log(newmap);


setContext(context, width, height);
setTilesetCanvas(tileset.canvas);

document.getElementById("new-grid-div").appendChild(newmap.canvas);
document.getElementById("new-grid-div").appendChild(tileset.canvas);
document.getElementById("new-grid-div").appendChild(tile.canvas);

gameLoop(0);