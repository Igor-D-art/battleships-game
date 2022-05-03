import '../src/style.css';

import { model } from "./model";
import { view } from "./view";
import { controller } from "./controller";



(function init() {

    const player1 = model.player(1);
    const player2 = model.player(2);

    const players = [player1, player2];

    player1.board.ships[0].locations = ['111', '112', '113', '114'];
    player2.board.ships[0].locations = ['211', '212', '213', '214'];

    view.displayBoards(players);
    view.displayShips(player1.getFleet());

    console.log(player1.board.ships[0].locations)
    console.log(player2.board.ships[0].locations)
    
    console.log(player1);
    console.log(player2);

    return { player1, player2 }
    
})();


