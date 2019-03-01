import { tiles } from './textsprite';
import { gameInit } from './lifecycle/game-init';
import { gameLoop, setTileset } from './lifecycle/game-loop';
import { Map } from './map/map';
import {MapCanvas} from './map/map-canvas';
import { Tile, OverlapTile } from './tile/tile';
import { Tileset } from './tile/tileset';
import { Globals } from './globals';
import { Walker, EightWayDir, FourWayDir } from './map/generation/walker';
import { wrap, randInt } from './shared/numbers';
import { IndexMap } from './map/index-map';



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

//https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}


let tilekeys = ["Grass", "Tree", "Dirt", "Water"];

// let map = [
// 	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
// 	[1, 1, 2, 2, 1, 1, 0, 2, 1, 1],
// 	[1, 0, 0, 2, 0, 0, 0, 2, 3, 1],
// 	[1, 0, 2, 2, 0, 0, 3, 2, 2, 1],
// 	[1, 0, 2, 0, 0, 0, 0, 2, 3, 1],
// 	[1, 1, 2, 0, 0, 1, 0, 2, 3, 1],
// 	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// ];

let map = [];
for(let j=0; j < 200; j++){
	let row = [];
	for(let i=0; i < 200; i++)
		row.push(1);
	map.push(row);
}


let scale = 4/32;

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

document.getElementById("new-grid-div").appendChild(newmap.canvas);


let walker_steps = randInt(500, 3000);
let walker_stray = Math.pow(Math.random(), .2);
let walk = new Walker(Math.floor(map[0].length/2), Math.floor(map.length/2), FourWayDir);
async function walking(){
	for(let i = 0; i<walker_steps; i++){
		//console.log(walk.x, ",", walk.y);
		walk.randomWander(walker_stray);
		walk.x = wrap(walk.x, newmap.map.grid.width);
		walk.y = wrap(walk.y, newmap.map.grid.height);
		newmap.map.grid.set(walk.x, walk.y, 2);
		newmap.drawTile(tileset, walk.x, walk.y);
		if(!(i%6))await sleep(1);
	}
	newmap.map.grid.dilate(2, 1);
	newmap.map.grid.dilate(1, 1);
	newmap.redraw();
} walking();

let dilate_test = new IndexMap(5,5);
dilate_test.set(2,2, 1);
console.log(dilate_test.dilate(1, 3));
console.log(dilate_test);

setTileset(tileset);

// document.getElementById("new-grid-div").appendChild(newmap.canvas);
document.getElementById("new-grid-div").appendChild(tileset.canvas);
//document.getElementById("new-grid-div").appendChild(tile.canvas);
document.getElementById("new-grid-div").appendChild(Globals.screen.canvas);


gameLoop(0);