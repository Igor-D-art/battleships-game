import '../src/style.css';

import { model } from "./model";
import { view } from "./view";
import { controller } from "./controller";

function init() {

    view.displayBoards();
    view.displayShips(model.player1.board.getFleet());
    console.log(model.player1);

};

init();


