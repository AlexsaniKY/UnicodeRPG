import {tiles} from './tiles';
import {gameInit} from './lifecycle/game-init';
import {gameLoop, setContext, setTilesetCanvas} from './lifecycle/game-loop';

console.log(tiles);

window.addEventListener("keydown", (event) => {
		//console.log("" + event.key + " " + event.keyIdentifier + " " + event.keyCode);
		//event.key will respect shift, the keycode shows code from capital letter
		let player = document.getElementById("character");
		let x = parseFloat(player.style.left);
		let y = parseFloat(player.style.top);
		console.log(event.keyCode);
		let dx=0,dy=0;
		switch(event.keyCode){
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
		
		player.style.left = dx*0.8 + x + "em";
		player.style.top  = dy*1.2 + y + "em";
		
	}, true);
	
	

	
	
	let tileset = {
		0: "Grass",
		1: "Tree",
		2: "Dirt",
		3: "Water"
	};
	
	tileset = ["Grass", "Tree", "Dirt", "Water"];
	
	let map = [
		[1,1,1,1,1,1],
		[1,0,0,2,3,1],
		[1,0,2,2,3,1],
		[1,0,2,0,3,1],
		[1,1,2,1,3,1]
	];
	
	
	let canvas  = document.getElementById("canvas_element");
	let context = canvas.getContext("2d");
	let width = canvas.offsetWidth;
	let height = canvas.offsetHeight;
	
	let tile_canvas = document.createElement("canvas");
	tile_canvas.style.width = "32";
	tile_canvas.style.height = "48";
	let tile_context = tile_canvas.getContext("2d");
	
	let tileset_canvas = document.getElementById("tileset_element");
	tileset_canvas.width = 32*tileset.length;
	tileset_canvas.height = 48;
	let tileset_context = tileset_canvas.getContext("2d");
	
	

	

	
gameInit(tiles, tile_context, tileset, tileset_context);

setContext(context, width, height);
setTilesetCanvas(tileset_canvas);
gameLoop(0);