import { controller } from "./controller";

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
        cell.classList.remove('ship');
        cell.classList.remove('miss');
        cell.classList.add('hit');
    };

    const displayMiss = (cellID) => {
        const cell = document.getElementById(cellID);
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

    const displaySurLocations = (cells) => {
        for (let i = 0; i < cells.length; i++){
            const cell = document.getElementById(cells[i]);
            if (cell !== undefined && cell !== null) {
                cell.classList.add('sur');
                cell.classList.add('scale');
                setTimeout(()=>{cell.classList.remove('scale')}, 150);
            };
        };
    };

    const displayStartNew = (phraze) => {
        const startNewPopup = document.createElement('div');
        startNewPopup.classList.add('startNew');
        startNewPopup.innerHTML = `
            <p> ${phraze} </p>
            <button id="playAgain"> Play again </button> `;
        const cutrain = document.createElement('div');
        cutrain.classList.add('curtain')
        const main = document.getElementById('main');
        main.appendChild(cutrain);
        main.appendChild(startNewPopup);
        const playAgain = document.getElementById('playAgain');
        playAgain.addEventListener('click', () => {
            main.removeChild(cutrain);
            main.removeChild(startNewPopup);
            controller.startNew();
        });
    };

    return {displayBoards, displayHit, displayShips, displayMiss, displaySurLocations, displayStartNew}
})()