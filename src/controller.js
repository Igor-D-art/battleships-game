import { view } from "./view";
import { initPopup } from "./index";
import { model } from "./model";

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
            view.displayStartNew(`Stupid computer wins!`);
        } else if (players[1].board.shipsSunk().length === 10) {
            players[0].isWinner = true; 
            view.displayStartNew(`You win!`);
        };
    };

    const startNew = () => {
        initPopup();
    };

    const startRandom = () => {
        const players = model.initPlayers();
        players[0].board.randomLocations();
        players[1].board.randomLocations();
        view.removePlaceShipPopup();
        view.displayBoards(players);
        view.displayShips(players[0].getFleet());
        
    };

    return { moveCounter, makeMove, checkWinner, startNew, startRandom};

})();
