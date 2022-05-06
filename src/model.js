import { view } from "./view";
import { controller } from "./controller";

export const model = (() => {

    const shipFactory = (length) => {
        const shipLength = length;
        const direction = Math.ceil(Math.random() * 2);
        const locations = [];
        const hits = [];
        let isSunk = false;

        // (() => {
        //     for (let i = 0; i < shipLength; i++){
        //         hits.push('');
        //     }
        // })();

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
            };
        };

        return { setCoord ,locations, hits, isSunk, gettingSunk, direction, gettingHit, shipLength};
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

        const illegalMoves = [];

        const randomLocations = () => {
            let shipLocations;
            for (let i = 0; i < ships.length; i++){
                do { shipLocations = generateLocations(ships[i]) }
                while (checkCollision(shipLocations));
                ships[i].locations = shipLocations;

                for (let j = 0; j < ships[i].shipLength; j++){
                  ships[i].hits.push('');
                }
            };
        };

        const generateLocations = (ship) => {
            let col;
            let row;
            let startLocation;
            let newLocations = [];
            if (ship.direction === 1) {
                row = Math.ceil(Math.random() * boardSize);
                col = Math.ceil(Math.random() * (boardSize - (ship.shipLength + 1)));
            } else {
                row = Math.ceil(Math.random() * (boardSize - (ship.shipLength + 1)));
                col = Math.ceil(Math.random() * boardSize);
            };
            startLocation = boardId + `${row}` + col;
            newLocations.push(startLocation);

            for (let i = 1; i < ship.shipLength; i++) {
                if (ship.direction === 1) {
                    newLocations.push(boardId + `${row}` + (col + i))
                } else {
                    newLocations.push(boardId + `${(row + i)}` + `${col}`)
                };
            };

            return newLocations;
        };

        const checkCollision = (locations) => {
            for (let i = 0; i < ships.length; i++){
                for (let j = 0; j < locations.length; j++){
                    if (ships[i].locations.indexOf(locations[j]) >= 0) {
                        return true;
                    };
                };
                console.log(`no collisions on ship ${ships[i]}`)
            };
            return false;
        };

        const receiveAttack = (cell) => {
            console.log('im in receive attack start. Cell = ' + cell);
            for (let i = 0; i < ships.length; i++) {
                console.log(ships[i].locations)
                if (ships[i].locations.indexOf(cell) > -1) {
                        view.displayHit(cell);
                        ships[i].gettingHit(ships[i].locations.indexOf(cell));
                        ships[i].gettingSunk(ships[i]);
                        break;
                    } else {
                        console.log('Im in receiveAttack miss block. Giving to view cell = ' + cell)
                        view.displayMiss(cell);
                        break;
                    };
            }; 

            illegalMoves.push(cell);
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