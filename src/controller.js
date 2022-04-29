import { model } from "./model";
import { view } from "./view";
import { index } from "./index";

export const controller = (() => {
    
    function addListeners(cell) {
        cell.addEventListener('click', () => {
            console.log(cell.id);
            model.player2.board.receiveAttack(cell.id);
        });
    };

    // console.log(index.player2);
    // console.log(index.player1)

    return { addListeners };

})();
