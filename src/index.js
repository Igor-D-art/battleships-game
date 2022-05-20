import '../src/style.css';
import { view } from "./view";
import { model } from './model';


export function initPopup() {
    const players = model.initPlayers();
    console.log(players[0].board.ships);
    console.log(players[1].board.ships);
    view.placeShipsPopup(players);
  
};


initPopup();

