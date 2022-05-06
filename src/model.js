import { view } from "./view";
import { controller } from "./controller";

export const model = (() => {

    const shipFactory = (length) => {
        const shipLength = length;
        const direction = Math.ceil(Math.random() * 2);
        const locations = [];
        const surLocations = [];
        const forbLocations = [];
        const hits = [];
        let isSunk = false;

        const setCoord = (cells) => {
            if (cells) {
                locations = [];
                for (let i = 0; i < shipLength; i++) {
                    locations.push(`${cells[i]}`);
                }; 
            };
        };

        const gettingHit = (location) => {
            hits[location] = 'hit';
        }

        const gettingSunk = (ship) => {
            if (ship.hits.indexOf('') === -1) {
                ship.isSunk = true;
                view.displaySurLocations(ship.surLocations);
            };
            return ship.isSunk;
        };

        return { setCoord ,locations, hits, isSunk, gettingSunk, direction, gettingHit, shipLength, surLocations, forbLocations};
    };

    const boardFactory = (id) => {

        const boardId = id;

        const boardSize = 10;

        const ships = [shipFactory(4),
                        shipFactory(3),
                        shipFactory(3),
                        shipFactory(2),
                        shipFactory(2),
                        shipFactory(2),
                        shipFactory(1),
                        shipFactory(1),
                        shipFactory(1),
                        shipFactory(1)];
        
        const shipsSunk = () => {
            const shipsSunk = [];
            for (let i = 0; i < ships.length; i++){
                if (ships[i].isSunk === true) {
                    shipsSunk.push(ships[i]);
                };
            };
            return shipsSunk;
        };

        let illegalMoves = [];

        const randomLocations = () => {
            let shipLocations;
            let surLocations;
            let forbLocations;
            for (let i = 0; i < ships.length; i++){
                do {
                    const shipSpot = generateLocations(ships[i]);
                    shipLocations = shipSpot[0];
                    surLocations = shipSpot[1];
                    forbLocations = shipLocations.concat(surLocations);
                } while (checkCollision(shipLocations));
                ships[i].locations = shipLocations;
                ships[i].surLocations = surLocations;
                ships[i].forbLocations = forbLocations;

                for (let j = 0; j < ships[i].shipLength; j++){
                  ships[i].hits.push('');
                }
            };
        };

        const generateLocations = (ship) => {
            let col;
            let row;

            const newLocations = [];
            const surLocations = [];
            if (ship.direction === 1) {
                row = Math.ceil(Math.random() * boardSize);
                col = Math.ceil(Math.random() * (boardSize - (ship.shipLength + 1)));
            } else {
                row = Math.ceil(Math.random() * (boardSize - (ship.shipLength + 1)));
                col = Math.ceil(Math.random() * boardSize);
            };

            for (let i = 0; i < ship.shipLength; i++) {
                if (ship.direction === 1) {
                    newLocations.push(boardId + `${row}` + (col + i))
                } else {
                    newLocations.push(boardId + `${(row + i)}` + `${col}`)
                };
            };

            if (ship.direction === 1) {
                for (let i = 0; i < ship.shipLength; i++){
                    surLocations.push(boardId + `${row + 1}` + (col + i));
                    surLocations.push(boardId + `${row - 1}` + (col + i));
                };
                
                surLocations.push(boardId + `${row - 1}` + (col - 1));
                surLocations.push(boardId + `${row}` + (col - 1));
                surLocations.push(boardId + `${row + 1}` + (col - 1));

                surLocations.push(boardId + `${row - 1}` + (col + ship.shipLength));
                surLocations.push(boardId + `${row}` + (col + ship.shipLength));
                surLocations.push(boardId + `${row + 1}` + (col + ship.shipLength));
            } else {
                for (let i = 0; i < ship.shipLength; i++){
                    surLocations.push(boardId + `${row + i}` + (col + 1));
                    surLocations.push(boardId + `${row + i}` + (col - 1));
                };
                
                surLocations.push(boardId + `${row - 1}` + (col - 1));
                surLocations.push(boardId + `${row - 1}` + (col));
                surLocations.push(boardId + `${row - 1}` + (col + 1));

                surLocations.push(boardId + `${row + ship.shipLength}` + (col -1));
                surLocations.push(boardId + `${row + ship.shipLength}` + (col));
                surLocations.push(boardId + `${row + ship.shipLength}` + (col + 1));
            };
            return [newLocations, surLocations];
        };

        const checkCollision = (locations) => {
            for (let i = 0; i < ships.length; i++){
                for (let j = 0; j < locations.length; j++){
                    if (ships[i].forbLocations.indexOf(locations[j]) >= 0) {
                        return true;
                    };
                };
                console.log(`no collisions on ship ${ships[i]}`)
            };
            return false;
        };

        const receiveAttack = (cell) => {
            illegalMoves.push(cell);
            console.log(illegalMoves)
            for (let i = 0; i < ships.length; i++) {
                if (ships[i].locations.indexOf(cell) >= 0) {
                    view.displayHit(cell);
                    ships[i].gettingHit(ships[i].locations.indexOf(cell));
                    ships[i].gettingSunk(ships[i]);
                    // if (ships[i].gettingSunk(ships[i])) {
                    //     console.log(illegalMoves);
                    //     illegalMoves = illegalMoves.concat(ships[i].surLocations)
                    //     console.log(illegalMoves);
                    //     console.log(ships[i].surLocations);
                    //     console.log(illegalMoves);
                    // };
                    break;
                } else if (ships[i].locations.indexOf(cell) === -1) {
                    // console.log('Im in receiveAttack MISS block. Giving to view cell = ' + cell)
                    view.displayMiss(cell);
                };
            }; 
            
        };
        return{ships, illegalMoves, receiveAttack, shipsSunk, randomLocations}
    };

    const player = (id) => {
        const playerId = id;
        const board = boardFactory(playerId);
        const getFleet = () => {
            const fleetCoords = [];
            for (let i = 0; i < board.ships.length; i++) {
                for (let j = 0; j < board.ships[i].locations.length; j++) {
                    fleetCoords.push(board.ships[i].locations[j])
                };
            };
            return fleetCoords;
        };
        const isWinner = false;
        return{playerId, board, getFleet, isWinner}
    };
    
    return { player };

})()