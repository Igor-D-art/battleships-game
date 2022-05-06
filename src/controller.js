import { model } from "./model";
import { view } from "./view";
import { init } from "./index";

export const controller = (() => {

    let moveCounter = 0;
    
    const _randomMoveGen = (player) => {
        const randomMove = 1 + `${Math.ceil(Math.random() * (10))}` + `${Math.ceil(Math.random() * (10))}`;
        if (player.board.illegalMoves.indexOf(randomMove) === -1) {
            return randomMove;
        } else {
          return _randomMoveGen(player);
        };  
    };

    const makeMove = (cell, players) => {
        console.table(players[1].board.illegalMoves)
        if (players[1].board.illegalMoves.indexOf(cell) === -1) {
            players[1].board.receiveAttack(cell, players[1]);
            players[0].board.receiveAttack(_randomMoveGen(players[0]), players[0]);
            moveCounter += 1;
            checkWinner(players);
        };
    };

    const checkWinner = (players) => {
        
        if (players[0].board.shipsSunk().length === 10) {
            players[1].isWinner = true; 
            alert(`Player ${players[1].playerId} is the winner!`);
        } else if (players[1].board.shipsSunk().length === 10) {
            players[0].isWinner = true; 
            alert(`Player ${players[0].playerId} is the winner!`);
            startNew();
        };
    };

    const startNew = () => {
        init();
    };

    return { moveCounter, makeMove, checkWinner};

})();
