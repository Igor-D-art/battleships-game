import { view } from "./view";
import { controller } from "./controller";

export const model = (() => {

    const shipFactory = (length) => {
        const shipLength = length;
        const direction = Math.floor(Math.random() * 2);
        let locations = [];
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

        // const gettingHit = (cell) => {
        //     // console.log(cell);
        //     // console.log(locations);
        //     // console.log(locations.indexOf(cell));
        //     console.log(locations);
        //     if (locations.indexOf(cell)>-1) {
        //         hits[locations.indexOf(cell)] = 'hit';
        //         console.log(hits);
        //         view.displayHit(cell);
        //         gettingSunk();
        //     } else {
        //         view.displayMiss(cell);
        //     }
        // };

        const gettingSunk = () => {
            if (hits.indexOf('') === -1) {
                isSunk = true;
            };
        };

        return { setCoord ,locations, hits, isSunk, gettingSunk, direction};
    };

    const boardFactory = () => {
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
        
        const illegalMoves = [];

        // const randomLocations = () => {
        //     let shipLocations; 
        //     for (let i = 0; i < ships.length; i++){
        //         do { shipLocations = generateLocations(ships[i]) }
        //         while (checkCollision(shipLocations));
        //         ships[i].locations = shipLocations;
        //     };
        // };

        // const generateLocations = (ship) => {
        //     let col;
        //     let row;
        //     let shipLocations = [];
        //     if (ship.direction === 1) {
        //         row = Math.floor(Math.random() * boardSize);
        //         col = Math.floor(Math.random() * (boardSize - (ship.shipLength + 1)));
        //     } else {
        //         row = Math.floor(Math.random() * (boardSize - (ship.shipLength + 1)));
        //         col = Math.floor(Math.random() * boardSize);
        //     }
        //     for (let i = 0; i < ship.shipLength; i++){
        //         if (ship.direction === 1) {
        //         shipLocations.push()
        //     } else {
        //         row = Math.floor(Math.random() * (boardSize - (ship.shipLength + 1)));
        //         col = Math.floor(Math.random() * boardSize);
        //     }
        //     }

        // }

        const getFleet = () => {
            const fleetCoords = [];
            for (let i = 0; i < ships.length; i++) {
                for (let j = 0; j < ships[i].locations.length; j++) {
                    fleetCoords.push(ships[i].locations[j])
                };
            };
            return fleetCoords;
        };

        const receiveAttack = (cell) => {
            console.log('im here')
            for (let i = 0; i < ships.length; i++) {
            //     ships[i].gettingHit(cell);
            if (ships[i].locations.indexOf(cell)>-1) {
                ships[i].hits[ships[i].locations.indexOf(cell)] = 'hit';
                console.log(ships[i].hits);
                view.displayHit(cell);
                ships[i].gettingSunk();
             } else {
                view.displayMiss(cell);
            }   
        };
            illegalMoves.push(cell);
            console.log(player1.board.illegalMoves);
            console.log(player2.board.illegalMoves);
            console.log(ships);
        };

        return{ships, illegalMoves, receiveAttack, getFleet}
    };

    const player = (id) => {
        const playerId = id;
        const board = boardFactory();
        return{playerId, board}
    };


    const player1 = player(1);
    const player2 = player(2);

    player1.board.ships[0].locations = ['111', '112', '113', '114'];
    player2.board.ships[0].locations = ['211', '212', '213', '214'];

    player1.board.receiveAttack('112');
    player1.board.receiveAttack('113');
    player1.board.receiveAttack('114');
    player2.board.receiveAttack('212');
  
    console.log(player1.board.ships[0].locations)
    console.log(player2.board.ships[0].locations)

    return { player1, player2 };
    
    // return { player };

})()