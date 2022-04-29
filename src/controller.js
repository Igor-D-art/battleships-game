import { model } from "./model";
import { view } from "./view";
import { index } from "./index";

export const controller = (() => {
    
    function addListeners(cell) {
        cell.addEventListener('click', () => {
            model.player2.board.receiveAttack(cell.id);
        });
    };

    return { addListeners };

})();
