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
                    if (players !== undefined) {
                        cell.setAttribute('id', i + `${j}` + k);
                        cell.setAttribute('class', 'cell');
                        if (i === 2) {
                            cell.addEventListener('click', () => {
                            controller.makeMove(cell.id, players);
                        });
                        }
                    }
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

    const _displayForbLocations = (cells) => {
        for (let i = 0; i < cells.length; i++) {
            const cell = document.getElementById(cells[i]);
            if (cell !== undefined && cell !== null && cell.classList.value.indexOf('ship')<0) {
                cell.classList.add('forbidden');
            };
        };
    }

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

    const board = document.getElementById('board');

    const placeShipsPopup = (players) => {
        console.log(players[0].board.ships);
        console.log(players[1].board.ships);
        displayBoards();
        _clearShipPlacer();
        _renderBoard(board);
        _fleetSetuper();
        const placeShipsPopup = document.getElementById('placeShips');
        placeShipsPopup.style.display = 'flex';
        

        const ok = document.getElementById('ok');
        ok.addEventListener('click', () => {  
            if (shipPlacer.coords.length === 10) {
                // console.log(shipPlacer.coords)
                const coords = controller.parseCoords(shipPlacer.coords);
                controller.passCoords(coords, players);
                controller.startPlaced(players);
            }
        });

        const reset = document.getElementById('reset');
        reset.addEventListener('click', () => {
            _clearShipPlacer();
            _renderBoard(board);
            _fleetSetuper();
        });

        const random = document.getElementById('random');
        random.addEventListener('click', () => {
            controller.startRandom(players);
        });

        const rotate = document.getElementById('rotate');
        rotate.addEventListener('click', () => {
            if (shipPlacer.vertical) {
                shipPlacer.vertical = false;
                console.log(shipPlacer.vertical);
                _renderBoard(board);
                _fleetSetuper();
            } else {
                shipPlacer.vertical = true;
                console.log(shipPlacer.vertical);
                _renderBoard(board);
                _fleetSetuper();
            }
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
                cell.setAttribute('id', `${j}${k}`);
                cell.setAttribute('class', 'container');
                initBoard.appendChild(cell);

                for (let i = 0; i < shipPlacer.coords.length; i++) {
                    if (shipPlacer.coords[i].indexOf(cell.id) >= 0) {
                        cell.classList.add('ship');
                    }
                };
                
            };
        };
        _displayForbLocations(shipPlacer.surLocations)
    };

    const _fleetSetuper = () => {
        const ok = document.getElementById('ok');
        for (let j = 1; j < 11; j++) {
            for (let k = 1; k < 11; k++) {
                const cell = document.getElementById(`${j}${k}`);

                if (shipPlacer.carrierCounter < 1) {
                    _placeCarrier(cell, j, k);
                } else if (shipPlacer.cruiserCounter<2) {
                    _placeCruiser(cell, j, k);
                } else if (shipPlacer.destroyerCounter<3) {
                    _placeDestroyer(cell, j, k);
                } else if (shipPlacer.gunboatCounter < 4) {
                    _placeGunboat(cell, j, k)
                } else {
                    ok.disabled = false;
                    return;
                };
        
            };
        };
    };

    const _surLocations = (rowNum, columnNum, ship) => {
        const row = rowNum; 
        const col = columnNum;
        
        if (!shipPlacer.vertical) {
                for (let i = 0; i < ship.length; i++) {
                    shipPlacer.surLocations.push(`${row + 1}` + (col + i));
                    shipPlacer.surLocations.push(`${row - 1}` + (col + i));
                };
                
                shipPlacer.surLocations.push(`${row - 1}` + (col - 1));
                shipPlacer.surLocations.push(`${row}` + (col - 1));
            
                if ((col - 1) !== 0) {
                    shipPlacer.surLocations.push(`${row + 1}` + (col - 1));  
                }
                
                shipPlacer.surLocations.push(`${row - 1}` + (col + ship.length));
                shipPlacer.surLocations.push(`${row}` + (col + ship.length));
                shipPlacer.surLocations.push(`${row + 1}` + (col + ship.length));
            } else {
                for (let i = 0; i < ship.length; i++) {
                    shipPlacer.surLocations.push(`${row + i}` + (col + 1));
                    shipPlacer.surLocations.push(`${row + i}` + (col - 1));
                };
                   
                shipPlacer.surLocations.push(`${row - 1}` + (col - 1));
                shipPlacer.surLocations.push(`${row - 1}` + (col));
                shipPlacer.surLocations.push(`${row - 1}` + (col + 1));

                if ((col - 1) !== 0) {
                    shipPlacer.surLocations.push(`${row + ship.length}` + (col - 1));  
                }
                
                shipPlacer.surLocations.push(`${row + ship.length}` + (col));
                shipPlacer.surLocations.push(`${row + ship.length}` + (col + 1));
        };
    };

    const shipPlacer = {
        coords: [],
        vertical: false,
        carrierCounter: 0,
        cruiserCounter: 0,
        destroyerCounter: 0,
        gunboatCounter: 0,
        surLocations: [],
    }

    const _clearShipPlacer = () => {
        shipPlacer.coords = [];
        shipPlacer.vertical = false;
        shipPlacer.carrierCounter = 0;
        shipPlacer.cruiserCounter = 0;
        shipPlacer.destroyerCounter = 0;
        shipPlacer.gunboatCounter = 0;
        shipPlacer.surLocations = [];
    }

    const _placeCarrier = (cell, j, k) => {
        console.log(shipPlacer);
        console.log(shipPlacer.vertical);
        let part1, part2, part3, part4;
        part1 = cell;
      
        if (shipPlacer.vertical === false) {
            // console.log(shipPlacer.vertical);
            if (k < 8) {
                part1.addEventListener('mouseover', () => {
                    part2 = part1.nextElementSibling;
                    part3 = part2.nextElementSibling;
                    part4 = part3.nextElementSibling;
                    const carrier = [part1, part2, part3, part4];

                    carrier.forEach(part => {
                        part.classList.add('shipspot');
                    })
                })
                
                part1.addEventListener('mouseleave', () => {
                    const part2 = part1.nextElementSibling;
                    const part3 = part2.nextElementSibling;
                    const part4 = part3.nextElementSibling;
                    const carrier = [part1, part2, part3, part4];

                    carrier.forEach(part => {
                        part.classList.remove('shipspot');
                    })
                })

                part1.addEventListener('click', () => {
                    const part2 = part1.nextElementSibling;
                    const part3 = part2.nextElementSibling;
                    const part4 = part3.nextElementSibling;
                    const carrier = [part1, part2, part3, part4];

                    carrier.forEach(part => {
                        part.classList.add('ship');
                    })
                    const carrierCoords = [`${part1.id}`, `${part2.id}`, `${part3.id}`, `${part4.id}`];
                    shipPlacer.coords.push(carrierCoords);
                    shipPlacer.carrierCounter += 1;
                    for (let i = 0; i < carrier.length; i++){
                        shipPlacer.surLocations.push(carrier[i].id);
                    }
                    _surLocations(j, k, carrier);
                    _renderBoard(board);
                    _fleetSetuper();
                    return;
                    
                })
            }
        } else if (shipPlacer.vertical === true) {
            if (j < 8) {
                part1.addEventListener('mouseover', () => {
                    const part2 = document.getElementById(`${j + 1}${k}`);
                    const part3 = document.getElementById(`${j + 2}${k}`);
                    const part4 = document.getElementById(`${j + 3}${k}`);
                    const carrier = [part1, part2, part3, part4];

                    carrier.forEach(part => {
                        part.classList.add('shipspot');
                    })
                })
            
                part1.addEventListener('mouseleave', () => {
                    const part2 = document.getElementById(`${j + 1}${k}`);
                    const part3 = document.getElementById(`${j + 2}${k}`);
                    const part4 = document.getElementById(`${j + 3}${k}`);
                    const carrier = [part1, part2, part3, part4];

                    carrier.forEach(part => {
                        part.classList.remove('shipspot');
                    })
                })

                part1.addEventListener('click', () => {
                    const part2 = document.getElementById(`${j + 1}${k}`);
                    const part3 = document.getElementById(`${j + 2}${k}`);
                    const part4 = document.getElementById(`${j + 3}${k}`);
                    const carrier = [part1, part2, part3, part4];

                    carrier.forEach(part => {
                        part.classList.add('ship');
                    })

                    shipPlacer.coords.push([`${part1.id}`, `${part2.id}`, `${part3.id}`, `${part4.id}`]);
                    shipPlacer.carrierCounter += 1;

                    for (let i = 0; i < carrier.length; i++){
                        shipPlacer.surLocations.push(carrier[i].id);
                    }
                    _surLocations(j, k, carrier);
                    _renderBoard(board);
                    _fleetSetuper();
                    return;
                })
            }
        }
    };

    const _placeCruiser = (cell, j, k) => {
        let part1, part2, part3;
        part1 = cell;
        if (shipPlacer.vertical === false) {
            if (k < 9) {
                part1.addEventListener('mouseover', () => {
                    part2 = part1.nextElementSibling;
                    part3 = part2.nextElementSibling;
                    const carrier = [part1, part2, part3];

                    carrier.forEach(part => {
                        part.classList.add('shipspot');
                    })
                })
                
                part1.addEventListener('mouseleave', () => {
                    const part2 = part1.nextElementSibling;
                    const part3 = part2.nextElementSibling;
                    const carrier = [part1, part2, part3];

                    carrier.forEach(part => {
                        part.classList.remove('shipspot');
                    })
                })

                part1.addEventListener('click', () => {
                    const part2 = part1.nextElementSibling;
                    const part3 = part2.nextElementSibling;
                    const carrier = [part1, part2, part3];

                    const match1 = shipPlacer.surLocations.indexOf(part1.id);
                    const match2 = shipPlacer.surLocations.indexOf(part2.id);
                    const match3 = shipPlacer.surLocations.indexOf(part3.id);

                    if (match1>=0 || match2>=0 || match3>=0) {
                        _renderBoard(board);
                        _fleetSetuper();
                    } else {
                        carrier.forEach(part => {
                        part.classList.add('ships');
                        })
                        
                        shipPlacer.coords.push([`${part1.id}`, `${part2.id}`, `${part3.id}`]);
                        shipPlacer.cruiserCounter += 1;
                        for (let i = 0; i < carrier.length; i++){
                            shipPlacer.surLocations.push(carrier[i].id);
                        }
                        _surLocations(j, k, carrier);
                        _renderBoard(board);
                        _fleetSetuper();
                        return;
                    }           
                })
            }
        } else if (shipPlacer.vertical === true) {
            if (j < 9) {
                part1.addEventListener('mouseover', () => {
                    const part2 = document.getElementById(`${j + 1}${k}`);
                    const part3 = document.getElementById(`${j + 2}${k}`);
                    const carrier = [part1, part2, part3];

                    carrier.forEach(part => {
                        part.classList.add('shipspot');
                    })
                })
            
                part1.addEventListener('mouseleave', () => {
                    const part2 = document.getElementById(`${j + 1}${k}`);
                    const part3 = document.getElementById(`${j + 2}${k}`);
                    const carrier = [part1, part2, part3];

                    carrier.forEach(part => {
                        part.classList.remove('shipspot');
                    })
                })

                part1.addEventListener('click', () => {
                    const part2 = document.getElementById(`${j + 1}${k}`);
                    const part3 = document.getElementById(`${j + 2}${k}`);
                    const carrier = [part1, part2, part3];

                    const match1 = shipPlacer.surLocations.indexOf(part1.id);
                    const match2 = shipPlacer.surLocations.indexOf(part2.id);
                    const match3 = shipPlacer.surLocations.indexOf(part3.id);

                    
                    if (match1>=0 || match2>=0 || match3>=0) {
                        console.log('im here')
                        _renderBoard(board);
                        _fleetSetuper();
                    } else {
                        carrier.forEach(part => {
                        part.classList.add('ships');
                        })
                        
                        shipPlacer.coords.push([`${part1.id}`, `${part2.id}`, `${part3.id}`]);
                        shipPlacer.cruiserCounter += 1;
                        for (let i = 0; i < carrier.length; i++){
                            shipPlacer.surLocations.push(carrier[i].id);
                        }
                        _surLocations(j, k, carrier);
                        _renderBoard(board);
                        _fleetSetuper();
                        return;
                    } 
                })
            }
        }
    }

     const _placeDestroyer = (cell, j, k) => {
       let part1, part2;
        part1 = cell;
        if (shipPlacer.vertical === false) {
            if (k < 10) {
                part1.addEventListener('mouseover', () => {
                    part2 = part1.nextElementSibling;
                    const carrier = [part1, part2];

                    carrier.forEach(part => {
                        part.classList.add('shipspot');
                    })
                })
                
                part1.addEventListener('mouseleave', () => {
                    const part2 = part1.nextElementSibling;
                    const carrier = [part1, part2];

                    carrier.forEach(part => {
                        part.classList.remove('shipspot');
                    })
                })

                part1.addEventListener('click', () => {
                    const part2 = part1.nextElementSibling;
                    const carrier = [part1, part2];

                    const match1 = shipPlacer.surLocations.indexOf(part1.id);
                    const match2 = shipPlacer.surLocations.indexOf(part2.id);

                    if (match1>=0 || match2>=0) {
                        console.log('im here')
                        _renderBoard(board);
                        _fleetSetuper();
                    } else {
                        carrier.forEach(part => {
                        part.classList.add('ships');
                        })
                        
                        shipPlacer.coords.push([`${part1.id}`, `${part2.id}`]);
                        shipPlacer.destroyerCounter += 1;
                        for (let i = 0; i < carrier.length; i++){
                            shipPlacer.surLocations.push(carrier[i].id);
                        }
                        _surLocations(j, k, carrier);
                        _renderBoard(board);
                        _fleetSetuper();
                        return;
                    }
                })
            }
        } else if (shipPlacer.vertical === true) {
            if (j < 10) {
                part1.addEventListener('mouseover', () => {
                    const part2 = document.getElementById(`${j + 1}${k}`);
                    const carrier = [part1, part2];

                    carrier.forEach(part => {
                        part.classList.add('shipspot');
                    })
                })
            
                part1.addEventListener('mouseleave', () => {
                    const part2 = document.getElementById(`${j + 1}${k}`);
                    const carrier = [part1, part2];

                    carrier.forEach(part => {
                        part.classList.remove('shipspot');
                    })
                })

                part1.addEventListener('click', () => {
                    const part2 = document.getElementById(`${j + 1}${k}`);
                    const carrier = [part1, part2];

                    const match1 = shipPlacer.surLocations.indexOf(part1.id);
                    const match2 = shipPlacer.surLocations.indexOf(part2.id);

                    if (match1>=0 || match2>=0) {
                        _renderBoard(board);
                        _fleetSetuper();
                    } else {
                        carrier.forEach(part => {
                        part.classList.add('ships');
                        })
                        
                        shipPlacer.coords.push([`${part1.id}`, `${part2.id}`]);
                        shipPlacer.destroyerCounter += 1;
                        for (let i = 0; i < carrier.length; i++){
                            shipPlacer.surLocations.push(carrier[i].id);
                        }
                        _surLocations(j, k, carrier);
                        _renderBoard(board);
                        _fleetSetuper();
                        return;
                    }   
                })
            }
        }
    }
    

    const _placeGunboat = (cell, j, k) => {
        const part1 = cell;
        const match1 = shipPlacer.surLocations.indexOf(part1.id);
    
        part1.addEventListener('mouseover', () => {
            part1.classList.add('shipspot');
        })
        
        part1.addEventListener('mouseleave', () => {
            part1.classList.remove('shipspot');
        })

        part1.addEventListener('click', () => {
            const carrier = [cell];

            if (match1 >= 0) {
                _renderBoard(board);
                _fleetSetuper();
            } else {
                part1.classList.add('ships');
                shipPlacer.coords.push([`${part1.id}`]);
                shipPlacer.gunboatCounter += 1;
            
                for (let i = 0; i < carrier.length; i++){
                    shipPlacer.surLocations.push(carrier[i].id);
                }
                _surLocations(j, k, carrier);
                _renderBoard(board);
                _fleetSetuper();
                return; 
            }
            
        })
    }

    const removePlaceShipPopup = () => {
        const placeShipsPopup = document.getElementById('placeShips');
        placeShipsPopup.style.display = 'none';
    };


    return {removePlaceShipPopup, displayBoards, displayHit, displayShips, displayMiss, displaySurLocations, displayStartNew, placeShipsPopup}
})()



        