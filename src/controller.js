import { model } from "./model";
import { view } from "./view";
import { players } from "./index";

export const controller = (() => {

    let moveCounter = 0;
    
    const _randomMoveGen = (player) => {
        const randomMove = 1 + `${Math.ceil(Math.random() * (10))}` + `${Math.ceil(Math.random() * (10))}`;
        console.log(randomMove);
        if (player.board.illegalMoves.indexOf(randomMove) === -1) {
            console.log(randomMove);
            return randomMove;
        } else {
          return _randomMoveGen(player);
        };  
    };

    const makeMove = (cell, players) => {
        if (players[1].board.illegalMoves.indexOf(cell) === -1) {
            players[1].board.receiveAttack(cell);
            players[0].board.receiveAttack(_randomMoveGen(players[0]));
            moveCounter += 1;
        };
    };

    return { moveCounter, makeMove};

})();
