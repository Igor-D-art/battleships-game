import { model } from "./model";
import { view } from "./view";
import { players } from "./index";

export const controller = (() => {

    let moveCounter = 2;
    
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
            console.log('firs player shot')
            players[1].board.receiveAttack(cell);
            secPlayerShot(players[0]);
        };
    };

    const secPlayerShot = (player) => {
        console.log('second player shot')
        player.board.receiveAttack(_randomMoveGen(player));
        moveCounter += 1;
    };

    
    
    

    return { moveCounter, makeMove};

})();
