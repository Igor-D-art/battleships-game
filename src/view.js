import { controller } from "./controller";

export const view = (() => {

    const displayBoards = (players) => {
        for (let i = 1; i < 3; i++) {
            const board = document.getElementById('p' + i + 'b');
            while (board.firstChild) {
                board.firstChild.remove()
            };
            for (let j = 1; j < 11; j++) {
                for (let k = 1; k < 11; k++) {
                    const cell = document.createElement('div');
                    cell.setAttribute('id', i + `${j}` + k);
                    cell.setAttribute('class', 'cell');
                    
                    if (i === 2 && players!==undefined) {
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
        for (let i = 0; i < cells.length; i++) {
            const cell = document.getElementById(cells[i]);
            if (cell !== undefined && cell !== null) {
                cell.classList.add('sur');
                cell.classList.add('scale');
                setTimeout(() => { cell.classList.remove('scale') }, 150);
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
        cutrain.classList.add('curtain');
        const main = document.getElementById('main');
        const p2b = document.getElementById('p2b');
        p2b.appendChild(cutrain);
        main.appendChild(startNewPopup);
        const playAgain = document.getElementById('playAgain');
        playAgain.addEventListener('click', () => {
            p2b.removeChild(cutrain);
            main.removeChild(startNewPopup);
            controller.startNew();
        });
    };

    const placeShipsPopup = () => {
        // const p2b = document.getElementById('p2b');
        // const curtain = document.createElement('div');
        // const firstChild = p2b.firstChild;
        // curtain.classList.add('curtain');
        // p2b.insertBefore(curtain, firstChild);
        displayBoards();
        const placeShipsPopup = document.getElementById('placeShips').style.display = 'flex';
        const board = document.getElementById('board');
        _renderBoard(board);
        _dragShips();

        const ok = document.getElementById('ok');
        ok.addEventListener('click', () => {
            console.log('hi there!')
        });

        const random = document.getElementById('random');
        random.addEventListener('click', () => {
            controller.startRandom();
        });

        const rotate = document.getElementById('ok');
        rotate.addEventListener('click', () => {
            console.log('hi there!')
        });
    };

    const _renderBoard = (board) => {
        const initBoard = board;
        while (initBoard.firstChild) {
            initBoard.firstChild.remove()
        };

        for (let j = 1; j < 11; j++) {
            for (let k = 1; k < 11; k++) {
                const cell = document.createElement('div');
                cell.setAttribute('id', 1 + `${j}` + k);
                cell.setAttribute('class', 'container');
                initBoard.appendChild(cell);
            };
        };
    };

    const _dragShips = () => {
        const cruiser = document.querySelector('#carrier');
        console.log(cruiser);
        const cruiserDivs = Array(cruiser.getElementsByTagName('div'));
        console.log(cruiserDivs);

        cruiserDivs.forEach(segment => {
            // segment.addEventListener('click', () => {
            // })
        })

        


        const dragables = document.querySelectorAll('.dragable');
        console.log(dragables);
        const containers = document.querySelectorAll('.container');

        dragables.forEach(ship => {
            ship.addEventListener('dragstart', () => {
                ship.classList.add('dragging');
            });

            ship.addEventListener('dragend', () => {
                ship.classList.remove('dragging');
            })
        });

        containers.forEach(cell => {
            cell.addEventListener('dragover', (e) => {
                e.preventDefault();
                const ship = document.querySelector('.dragging');
                if (cell.id)
                    cell.appendChild(ship);
                console.log(cell.id);
            })
        });
    }

    const removePlaceShipPopup = () => {
        const placeShipsPopup = document.getElementById('placeShips').style.display = 'none';
        const p2b = document.getElementById('p2b');
        // const curtain = document.querySelector('.curtain');
        // p2b.removeChild(curtain);
    };


    return {removePlaceShipPopup, displayBoards, displayHit, displayShips, displayMiss, displaySurLocations, displayStartNew, placeShipsPopup}
})()