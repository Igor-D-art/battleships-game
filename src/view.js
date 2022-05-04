import { controller } from "./controller";
import { model } from "./model";
import { index } from "./index";

export const view = (() => {

    const displayBoards = (players) => {
        for (let i = 1; i < 3; i++){
            const board = document.getElementById('p' + i + 'b');
            while (board.firstChild) {
                board.firstChild.remove()
            };
            for (let j = 1; j < 11; j++) {
                for (let k = 1; k < 11; k++) {
                    const cell = document.createElement('div');
                    cell.setAttribute('id', i + `${j}` + k);
                    cell.setAttribute('class', 'cell');
                    
                    if (i === 2) {
                        cell.addEventListener('click', () => {
                            controller.makeMove(cell.id, players);
                       });
                    };

                    board.appendChild(cell);
                };
            };
        };
    };
    
    const displayHit = (cellID) => {
        const cell = document.getElementById(cellID);
        console.log(cell);
        cell.classList.remove('ship');
        cell.classList.add('hit');
    };

    const displayMiss = (cellID) => {
        console.log('Im in view, cellID = ' + cellID);
        const cell = document.getElementById(cellID);
        console.log(cell);
        cell.classList.remove('ship');
        cell.classList.add('miss');
    };

    const displayShips = (ships) => {
        for (let i = 0; i < ships.length; i++) {
                if (ships[i] !== "") {
                const cell = document.getElementById(`${ships[i]}`);
                cell.classList.add('ship');
            };
        };
    };

    return {displayBoards, displayHit, displayShips, displayMiss}
})()