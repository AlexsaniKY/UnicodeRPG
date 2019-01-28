import {tiles} from './tiles';

var something = 1;
console.log(something);

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
	
	
	// sprites are defined as objects with:
	// name,
	// chars: [{ch , color, offsetX, offsetY}, ]
	// where each char is a unicode string (generally a single character)
	// that is assigned a color, and a set of offsets where:
	// positive x => right
	// positive y => down
	let sprites = [
		{
			name: "Grass",
			background:"aquamarine",
			chars:[{
					ch: String.fromCodePoint(0x22ce),
					color: "green",
					offsetX: .05,
					offsetY: -.6
					},
					{
					ch: "v",
					color: "green",
					offsetX:0.08,
					offsetY:-.45
					}
				]
		},
		
		{
			name: "Tree",
			background: "#94a893",
			chars:[{
					ch: "i",
					color: "brown",
					offsetX: 0,
					offsetY: -.3
					},
					{
					ch: String.fromCodePoint(0x13dc),
					color: "green",
					offsetX: -.2,
					offsetY: -.8
					}
				]
		},
		
		{
			name: "Dirt",
			background: "antiquewhite",
			chars:[{
					ch: String.fromCodePoint(0x289e),
					color: "sandybrown",
					offsetX: .0,
					offsetY: -.8
					}
				]
		},
		
		{
			name: "Water",
			background: "#94a8d4",
			chars:[{
				ch: String.fromCodePoint(0x2248),
				color: "blue",
				offsetX: 0,
				offsetY: -.3
				},
				{
				ch: String.fromCodePoint(0x2248),
				color: "blue",
				offsetX: 0,
				offsetY: -.8
				}
			]
		}
		
	];
	
	
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
	
	//let image;
	function gameInit(){
		tile_context.fillStyle = "#00F";
		tile_context.fillRect(0,0,32,48);
		
		let len = tileset.length;
		for(let i = 0;i<len; i++){
			tileset_context.fillStyle = "#" + (i * (4096/len)).toString(16).padStart(2, '0');
			console.log((i * (4096/len)).toString(16).padStart(3, '0'));
			console.log(i*32);
			tileset_context.fillRect(i*32,0,32,48);
		}
		
		let spr;
		let i = 0;
		let p = document.createElement("p");
		tileset_context.font = "36px sans-serif";
		tileset_context.textAlign = "center";
		for(t of tileset){
			//if (i == 1 )return;
			for(s of sprites){
				if(t == s.name){
					spr = s;
				}
			}
			tileset_context.fillStyle = spr.background;
			tileset_context.fillRect(i*32,0,32,48);
			for(c of spr.chars){
				tileset_context.fillStyle = c.color;
				tileset_context.fillText(c.ch, 16 + ((.2*c.offsetX + i)*32) ,50 + (25*c.offsetY));
			}
			i++;
		}
		

	}
	
	let maxfps = 60;
	let frame_length = 1000./ maxfps;
	let last_frame_stamp = 0;
	let frame_delta = frame_length;
	
	function gameLoop(timestamp){
		frame_delta = last_frame_stamp + frame_length;
		if(timestamp < frame_delta){
			//console.log(last_frame_stamp + frame_length - timestamp);
			requestAnimationFrame(gameLoop);
			return;
		}
		last_frame_stamp = timestamp;
		
		context.fillStyle = "#F00";
		context.fillRect(0,0,width,height);
		context.drawImage(tileset_canvas, 0,0);
		context.fillStyle = "#000";
		context.fillRect(32,48,16,16);
		
		requestAnimationFrame(gameLoop);
	}
	
gameInit();
gameLoop(0);