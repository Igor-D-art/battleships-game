import '../src/style.css';

import { model } from "./model";
import { view } from "./view";
    
export function init() {

    let player1 = model.player(1);
    let player2 = model.player(2);

    const players = [player1, player2];

    player1.board.randomLocations();
    player2.board.randomLocations();

    view.displayBoards(players);
    view.displayShips(player1.getFleet());
    
};

init();







