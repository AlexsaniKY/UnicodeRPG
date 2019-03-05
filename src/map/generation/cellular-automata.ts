import { IndexMap } from "../index-map";


export class CellularAutomata {
    map: IndexMap;
    constructor(imap: IndexMap) {
        this.map = imap;
    }

    seed(percent_alive: number) {
        this.map.fillRandom(.5);
    }
    
    //has too much manual control of the indexmap?
    simulateStep() {
        let newmap = new IndexMap(this.map.width, this.map.height);
        let alive_neighbors = 0;
        let birth_limit = 4;
        let death_limit = 4;
        for (let y = 1; y < this.map.height - 1; y++)
            for (let x = 1; x < this.map.width - 1; x++) {
                alive_neighbors = 0;
                for (let k_x = -1; k_x <= 1; k_x++)
                    for(let k_y = -1; k_y <= 1; k_y++)
                        alive_neighbors += this.map.grid[y + k_y][x + k_x];
                newmap.set(x,y, this.map.grid[y][x]? 
                    alive_neighbors < death_limit? 0:1
                    :alive_neighbors > birth_limit? 1:0);
            }
        this.map.grid = newmap.grid;
    }
}