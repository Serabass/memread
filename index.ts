import {User32} from "./decorators/ffi/example";

let x = User32.MessageBoxAsync(0, "Program Manager", "Program Manager", 0);

/*
import Game from './entities/game';

let game = Game.instance;
let player = game.player;

setInterval(() => {
    console.log(player.ped.health);
}, 1000);

*/
