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
        const players = model.initPlayers();
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

    const parseCoords = (coords) => {
        const parsedCoords = [];
        for (let i = 0; i < coords.length; i++) {
            parsedCoords.push([]);
            for (let j = 0; j < coords[i].length; j++) {
                const shipCoords = `1${coords[i][j]}`;
                parsedCoords[i].push(shipCoords);
            }
        }
        return parsedCoords;
    };

    const passCoords = (coords) => {
        const players = model.initPlayers();
        for (let i = 0; i < coords.length; i++){
            players[0].board.ships[i].locations = coords[i];
        }
        _startPlaced(players);
        
    }

    const _startPlaced = (players) => {
        players[1].board.randomLocations();
        view.removePlaceShipPopup();
        view.displayBoards(players);
        view.displayShips(players[0].getFleet());
    }

    return { moveCounter, makeMove, checkWinner, startNew, startRandom, parseCoords, passCoords};

})();
