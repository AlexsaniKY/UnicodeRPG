import { Color } from "./shared/color";
import {Dictionary} from "typescript-collections";

// sprites are defined as objects with:
// name,
// chars: [{ch , color, offsetX, offsetY}, ]
// where each char is a unicode string (generally a single character)
// that is assigned a color, and a set of offsets where:
// positive x => right
// positive y => down

export interface TextSpritePart{
	ch: string,
	color: Color | string,
	offsetX: number,
	offsetY: number
}

export class TextSprite{
	name: string;
	background: Color | string;
	chars: TextSpritePart[];
}



export let tiles: TextSprite[] = [
	{
		name: "Grass",
		background: "aquamarine",
		chars: [{
			ch: String.fromCodePoint(0x22ce),
			color: "green",
			offsetX: .05,
			offsetY: -.6
		},
		{
			ch: "v",
			color: "green",
			offsetX: 0.08,
			offsetY: -.45
		}
		]
	},

	{
		name: "Tree",
		background: "#94a893",
		chars: [{
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
		chars: [{
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
		chars: [{
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

export let TileSpriteDict = new Dictionary<string, TextSprite>();
for(let spr of tiles){
	TileSpriteDict.setValue(spr.name, spr);
}