/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "controller": () => (/* binding */ controller)
/* harmony export */ });
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ "./src/view.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index */ "./src/index.js");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./model */ "./src/model.js");



var controller = function () {
  var moveCounter = 0;

  var _randomMoveGen = function _randomMoveGen(player) {
    var randomMove = 1 + "".concat(Math.ceil(Math.random() * 10)) + "".concat(Math.ceil(Math.random() * 10));

    if (player.board.illegalMoves.indexOf(randomMove) === -1) {
      return randomMove;
    } else {
      return _randomMoveGen(player);
    }

    ;
  };

  var makeMove = function makeMove(cell, players) {
    if (players[1].board.illegalMoves.indexOf(cell) === -1) {
      players[1].board.receiveAttack(cell, players[1]);
      players[0].board.receiveAttack(_randomMoveGen(players[0]), players[0]);
      moveCounter += 1;
      checkWinner(players);
    }

    ;
  };

  var checkWinner = function checkWinner(players) {
    if (players[0].board.shipsSunk().length === 10) {
      players[1].isWinner = true;
      _view__WEBPACK_IMPORTED_MODULE_0__.view.displayStartNew("Stupid computer wins!");
    } else if (players[1].board.shipsSunk().length === 10) {
      players[0].isWinner = true;
      _view__WEBPACK_IMPORTED_MODULE_0__.view.displayStartNew("You win!");
    }

    ;
  };

  var startNew = function startNew() {
    (0,_index__WEBPACK_IMPORTED_MODULE_1__.initPopup)();
  };

  var startRandom = function startRandom() {
    var players = _model__WEBPACK_IMPORTED_MODULE_2__.model.initPlayers();
    players[0].board.randomLocations();
    players[1].board.randomLocations();
    _view__WEBPACK_IMPORTED_MODULE_0__.view.removePlaceShipPopup();
    _view__WEBPACK_IMPORTED_MODULE_0__.view.displayBoards(players);
    _view__WEBPACK_IMPORTED_MODULE_0__.view.displayShips(players[0].getFleet());
  };

  return {
    moveCounter: moveCounter,
    makeMove: makeMove,
    checkWinner: checkWinner,
    startNew: startNew,
    startRandom: startRandom
  };
}();

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "initPopup": () => (/* binding */ initPopup)
/* harmony export */ });
/* harmony import */ var _src_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/style.css */ "./src/style.css");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ "./src/view.js");


function initPopup() {
  _view__WEBPACK_IMPORTED_MODULE_1__.view.placeShipsPopup();
}
;
initPopup();

/***/ }),

/***/ "./src/model.js":
/*!**********************!*\
  !*** ./src/model.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "model": () => (/* binding */ model)
/* harmony export */ });
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view */ "./src/view.js");
function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }


var model = function () {
  var shipFactory = function shipFactory(length) {
    var shipLength = length;
    var direction = Math.ceil(Math.random() * 2);
    var startLocation;
    var locations = [];
    var surLocations = [];
    var forbLocations = [];
    var hits = [];
    var isSunk = false;

    var setCoord = function setCoord(cells) {
      if (cells) {
        [], _readOnlyError("locations");

        for (var i = 0; i < shipLength; i++) {
          locations.push("".concat(cells[i]));
        }

        ;
      }

      ;
    };

    var gettingHit = function gettingHit(location) {
      hits[location] = 'hit';
    };

    var gettingSunk = function gettingSunk(ship) {
      if (ship.hits.indexOf('') === -1) {
        ship.isSunk = true;
        _view__WEBPACK_IMPORTED_MODULE_0__.view.displaySurLocations(ship.surLocations);
      }

      ;
      return ship.isSunk;
    };

    return {
      setCoord: setCoord,
      locations: locations,
      hits: hits,
      isSunk: isSunk,
      gettingSunk: gettingSunk,
      direction: direction,
      gettingHit: gettingHit,
      shipLength: shipLength,
      surLocations: surLocations,
      forbLocations: forbLocations,
      startLocation: startLocation
    };
  };

  var boardFactory = function boardFactory(id) {
    var boardId = id;
    var boardSize = 10;
    var ships = [shipFactory(4), shipFactory(3), shipFactory(3), shipFactory(2), shipFactory(2), shipFactory(2), shipFactory(1), shipFactory(1), shipFactory(1), shipFactory(1)];

    var shipsSunk = function shipsSunk() {
      var shipsSunk = [];

      for (var i = 0; i < ships.length; i++) {
        if (ships[i].isSunk === true) {
          shipsSunk.push(ships[i]);
        }

        ;
      }

      ;
      return shipsSunk;
    };

    var illegalMoves = [];

    var randomLocations = function randomLocations() {
      var shipLocations;
      var surLocations;
      var forbLocations;

      for (var i = 0; i < ships.length; i++) {
        if (ships[i].startLocation === undefined) {
          do {
            var shipSpot = generateLocations(ships[i]);
            shipLocations = shipSpot[0];
            surLocations = shipSpot[1];
            forbLocations = shipLocations.concat(surLocations);
          } while (checkCollision(shipLocations));

          ships[i].locations = shipLocations;
          ships[i].surLocations = surLocations;
          ships[i].forbLocations = forbLocations;
        } else {
          customLocations();
        }

        for (var j = 0; j < ships[i].shipLength; j++) {
          ships[i].hits.push('');
        }
      }

      ;
    };

    var generateLocations = function generateLocations(ship) {
      var col;
      var row;
      var newLocations = [];
      var surLocations = [];

      if (ship.direction === 1) {
        row = Math.ceil(Math.random() * boardSize);
        col = Math.ceil(Math.random() * (boardSize - (ship.shipLength + 1)));
      } else {
        row = Math.ceil(Math.random() * (boardSize - (ship.shipLength + 1)));
        col = Math.ceil(Math.random() * boardSize);
      }

      ;

      for (var i = 0; i < ship.shipLength; i++) {
        if (ship.direction === 1) {
          newLocations.push(boardId + "".concat(row) + (col + i));
        } else {
          newLocations.push(boardId + "".concat(row + i) + "".concat(col));
        }

        ;
      }

      ;

      if (ship.direction === 1) {
        for (var _i = 0; _i < ship.shipLength; _i++) {
          surLocations.push(boardId + "".concat(row + 1) + (col + _i));
          surLocations.push(boardId + "".concat(row - 1) + (col + _i));
        }

        ;
        surLocations.push(boardId + "".concat(row - 1) + (col - 1));
        surLocations.push(boardId + "".concat(row) + (col - 1));
        surLocations.push(boardId + "".concat(row + 1) + (col - 1));
        surLocations.push(boardId + "".concat(row - 1) + (col + ship.shipLength));
        surLocations.push(boardId + "".concat(row) + (col + ship.shipLength));
        surLocations.push(boardId + "".concat(row + 1) + (col + ship.shipLength));
      } else {
        for (var _i2 = 0; _i2 < ship.shipLength; _i2++) {
          surLocations.push(boardId + "".concat(row + _i2) + (col + 1));
          surLocations.push(boardId + "".concat(row + _i2) + (col - 1));
        }

        ;
        surLocations.push(boardId + "".concat(row - 1) + (col - 1));
        surLocations.push(boardId + "".concat(row - 1) + col);
        surLocations.push(boardId + "".concat(row - 1) + (col + 1));
        surLocations.push(boardId + "".concat(row + ship.shipLength) + (col - 1));
        surLocations.push(boardId + "".concat(row + ship.shipLength) + col);
        surLocations.push(boardId + "".concat(row + ship.shipLength) + (col + 1));
      }

      ;
      return [newLocations, surLocations];
    };

    var checkCollision = function checkCollision(locations) {
      for (var i = 0; i < ships.length; i++) {
        for (var j = 0; j < locations.length; j++) {
          if (ships[i].forbLocations.indexOf(locations[j]) >= 0) {
            return true;
          }

          ;
        }

        ;
        console.log("no collisions on ship ".concat(ships[i]));
      }

      ;
      return false;
    };

    var customLocations = function customLocations() {// code goes here if needed
    };

    var receiveAttack = function receiveAttack(cell, player) {
      player.board.illegalMoves.push(cell);
      console.log(player.board.illegalMoves);

      for (var i = 0; i < ships.length; i++) {
        if (ships[i].locations.indexOf(cell) >= 0) {
          _view__WEBPACK_IMPORTED_MODULE_0__.view.displayHit(cell);
          ships[i].gettingHit(ships[i].locations.indexOf(cell));
          ships[i].gettingSunk(ships[i]);

          if (ships[i].gettingSunk(ships[i])) {
            player.board.illegalMoves = player.board.illegalMoves.concat(ships[i].surLocations);
          }

          ;
          break;
        } else if (ships[i].locations.indexOf(cell) === -1) {
          _view__WEBPACK_IMPORTED_MODULE_0__.view.displayMiss(cell);
        }

        ;
      }

      ;
    };

    return {
      ships: ships,
      illegalMoves: illegalMoves,
      receiveAttack: receiveAttack,
      shipsSunk: shipsSunk,
      randomLocations: randomLocations
    };
  };

  var player = function player(id) {
    var playerId = id;
    var board = boardFactory(playerId);

    var getFleet = function getFleet() {
      var fleetCoords = [];

      for (var i = 0; i < board.ships.length; i++) {
        for (var j = 0; j < board.ships[i].locations.length; j++) {
          fleetCoords.push(board.ships[i].locations[j]);
        }

        ;
      }

      ;
      return fleetCoords;
    };

    var isWinner = false;
    return {
      playerId: playerId,
      board: board,
      getFleet: getFleet,
      isWinner: isWinner
    };
  };

  function initPlayers() {
    var player1 = player(1);
    var player2 = player(2);
    return [player1, player2];
  }

  ;
  return {
    initPlayers: initPlayers
  };
}();

/***/ }),

/***/ "./src/view.js":
/*!*********************!*\
  !*** ./src/view.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "view": () => (/* binding */ view)
/* harmony export */ });
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./controller */ "./src/controller.js");

var view = function () {
  var displayBoards = function displayBoards(players) {
    for (var i = 1; i < 3; i++) {
      var board = document.getElementById('p' + i + 'b');

      while (board.firstChild) {
        board.firstChild.remove();
      }

      ;

      for (var j = 1; j < 11; j++) {
        var _loop = function _loop(k) {
          var cell = document.createElement('div');
          cell.setAttribute('id', i + "".concat(j) + k);
          cell.setAttribute('class', 'cell');

          if (i === 2 && players !== undefined) {
            cell.addEventListener('click', function () {
              _controller__WEBPACK_IMPORTED_MODULE_0__.controller.makeMove(cell.id, players);
            });
          }

          ;
          board.appendChild(cell);
        };

        for (var k = 1; k < 11; k++) {
          _loop(k);
        }

        ;
      }

      ;
    }

    ;
  };

  var displayHit = function displayHit(cellID) {
    var cell = document.getElementById(cellID);
    cell.classList.remove('ship');
    cell.classList.remove('miss');
    cell.classList.add('hit');
  };

  var displayMiss = function displayMiss(cellID) {
    var cell = document.getElementById(cellID);
    cell.classList.remove('ship');
    cell.classList.add('miss');
  };

  var displayShips = function displayShips(ships) {
    for (var i = 0; i < ships.length; i++) {
      if (ships[i] !== "") {
        var cell = document.getElementById("".concat(ships[i]));
        cell.classList.add('ship');
      }

      ;
    }

    ;
  };

  var displaySurLocations = function displaySurLocations(cells) {
    var _loop2 = function _loop2(i) {
      var cell = document.getElementById(cells[i]);

      if (cell !== undefined && cell !== null) {
        cell.classList.add('sur');
        cell.classList.add('scale');
        setTimeout(function () {
          cell.classList.remove('scale');
        }, 150);
      }

      ;
    };

    for (var i = 0; i < cells.length; i++) {
      _loop2(i);
    }

    ;
  };

  var displayStartNew = function displayStartNew(phraze) {
    var startNewPopup = document.createElement('div');
    startNewPopup.classList.add('startNew');
    startNewPopup.innerHTML = "\n            <p> ".concat(phraze, " </p>\n            <button id=\"playAgain\"> Play again </button> ");
    var cutrain = document.createElement('div');
    cutrain.classList.add('curtain');
    var main = document.getElementById('main');
    var p2b = document.getElementById('p2b');
    p2b.appendChild(cutrain);
    main.appendChild(startNewPopup);
    var playAgain = document.getElementById('playAgain');
    playAgain.addEventListener('click', function () {
      p2b.removeChild(cutrain);
      main.removeChild(startNewPopup);
      _controller__WEBPACK_IMPORTED_MODULE_0__.controller.startNew();
    });
  };

  var placeShipsPopup = function placeShipsPopup() {
    displayBoards();
    var placeShipsPopup = document.getElementById('placeShips');
    placeShipsPopup.style.display = 'flex';
    var board = document.getElementById('board');

    _renderBoard(board);

    var ok = document.getElementById('ok');
    ok.addEventListener('click', function () {
      console.log('hi there!');
    });
    var random = document.getElementById('random');
    random.addEventListener('click', function () {
      _controller__WEBPACK_IMPORTED_MODULE_0__.controller.startRandom();
    });
    var rotate = document.getElementById('ok');
    rotate.addEventListener('click', function () {
      console.log('hi there!');
    });
  };

  var _renderBoard = function _renderBoard(board) {
    var initBoard = board;

    while (initBoard.firstChild) {
      initBoard.firstChild.remove();
    }

    ;

    var _loop3 = function _loop3(j) {
      var _loop4 = function _loop4(k) {
        var cell = document.createElement('div');
        cell.setAttribute('id', "".concat(j).concat(k));
        cell.setAttribute('class', 'container');
        cell.addEventListener('mouseover', function () {
          _placeShips(cell, j, k);
        }); // cell.addEventListener('mouseover', () => {
        //     cell.classList.add('shipspot');
        //     if (cell.nextElementSibling && cell.nextElementSibling.id === (`${j}` + (k + 1))) {
        //         console.log(cell.nextElementSibling.id)
        //         cell.nextElementSibling.classList.add('shipspot');
        //     }
        // })
        // cell.addEventListener('mouseleave', () => {
        //     cell.classList.remove('shipspot');
        //     if (cell.nextElementSibling && cell.nextElementSibling.id === (`${j}` + (k + 1))) {
        //        cell.nextElementSibling.classList.remove('shipspot');
        //     }
        // })
        // cell.addEventListener('click', () => {
        //     if (cell.nextElementSibling && cell.nextElementSibling.id === (`${j}` + (k + 1))) {
        //         cell.classList.add('ship');
        //         cell.nextElementSibling.classList.add('ship');
        //     }
        // })
        // cell.addEventListener('mouseover', () => {
        //     const nextPart = document.getElementById(`${j + 1}${k}`);
        //     cell.classList.add('shipspot');
        //     if (nextPart.id !== `11${k}`) {
        //         nextPart.classList.add('shipspot');
        //     }
        // })
        // cell.addEventListener('mouseleave', () => {
        //     const nextPart = document.getElementById(`${j + 1}${k}`);
        //     cell.classList.remove('shipspot');
        //     nextPart.classList.remove('shipspot');
        // })
        // cell.addEventListener('click', () => {
        //     const nextPart = document.getElementById(`${j + 1}${k}`);
        //     if (nextPart.id !== `11${k}`) {
        //         cell.classList.add('ship');
        //         nextPart.classList.add('ship');
        //     }
        // })

        initBoard.appendChild(cell);
      };

      for (var k = 1; k < 11; k++) {
        _loop4(k);
      }

      ;
    };

    for (var j = 1; j < 11; j++) {
      _loop3(j);
    }

    ;
  };

  var _placeShips = function _placeShips(cell, row, col) {
    var forbidHor = ['11', '21', '31', '41', '51', '61', '71', '81', '91', '101'];
    var forbidVert = [];

    _placeCarrier(cell, forbidHor, forbidVert, row, col);
  };

  var _placeCarrier = function _placeCarrier(cell, forbidHor, forbidVert, row, col) {
    var placed = false; // const part2 = cell.nextElementSibling;

    var part1 = cell;
    var part2 = document.getElementById("".concat(row).concat(col + 1));
    var part3 = document.getElementById("".concat(row).concat(col + 2));
    var part4 = document.getElementById("".concat(row).concat(col + 3));
    var carrier = [part1, part2, part3, part4];
    carrier.forEach(function (part) {
      if (part !== null && part.id !== "".concat(row, 11) && part.id !== "".concat(row, 12) && part.id !== "".concat(row, 13)) {
        part.classList.add('shipspot');
      }

      part1.addEventListener('mouseleave', function () {
        part1.classList.remove('shipspot');

        if (part4 !== null || part4 !== null && part3 !== null || part4 !== null && part3 !== null && part2 !== null) {
          part2.classList.remove('shipspot');
          part3.classList.remove('shipspot');
          part4.classList.remove('shipspot');
        }
      });
    }); // part1.classList.add('shipspot');
    // if (part2 !== null || part3 !==null || part4!==null) {
    //     part2.classList.add('shipspot');
    //     part3.classList.add('shipspot');
    //     part4.classList.add('shipspot'); 
    // }
  };

  var removePlaceShipPopup = function removePlaceShipPopup() {
    var placeShipsPopup = document.getElementById('placeShips');
    placeShipsPopup.style.display = 'none';
  };

  return {
    removePlaceShipPopup: removePlaceShipPopup,
    displayBoards: displayBoards,
    displayHit: displayHit,
    displayShips: displayShips,
    displayMiss: displayMiss,
    displaySurLocations: displaySurLocations,
    displayStartNew: displayStartNew,
    placeShipsPopup: placeShipsPopup
  };
}();

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../src/images/icons8-fire-48.png */ "./src/images/icons8-fire-48.png"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../src/images/close.png */ "./src/images/close.png"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n    margin: 0;\n    border: none;\n    padding: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    height: 100vh;\n    width: 100vw;\n}\n\n.main {\n    display: flex;\n    justify-content: space-around;\n    height: min(70vh);\n    align-items: center;\n}\n\n.p1b,\n.p2b, \n.board {\n    height: 500px;\n    width: 500px;\n    border: 1px solid black;\n    background-color: white;\n    display: grid;\n    grid-template-columns: repeat(10, minmax(50px, 1fr));\n    grid-template-rows: repeat(10, minmax(50px, 1fr));\n\n}\n\n.p1b div,\n.p2b div {\n    /* display: flex;\n    justify-content: center;\n    align-items: center; */\n    border: 1px solid black;\n}\n\n.curtain {\n    position: absolute;\n    height: 500px;\n    width: 500px;\n}\n\nfooter,\nheader {\n    display: flex;\n    background-color: rgb(122, 151, 248);\n    height: min(15vh);\n    font-size: 7vh;\n    justify-content: center;\n    align-items: center;\n}\n\nfooter{\n    font-size: large;\n}\n\n.hit {\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n    background-color: rgb(245, 169, 169);\n    background-size: 100%;\n}\n\n.ship, .shipGroup>div {\n    background-color: blue;\n}\n\n.miss {\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n    background-repeat: no-repeat;\n    background-size: 70%;\n    background-position: center;\n}\n\n.sur{\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n    background-repeat: no-repeat;\n    background-size: 70%;\n    background-position: center;\n}\n\n.scale{\n    background-size: 100%;\n}\n\n.startNew{\n    display: flex;\n    flex-direction: column;\n    height: 150px;\n    width: 200px;\n    background-color: rgb(122, 151, 248);\n    position: absolute;\n    top: 25%;\n    left: 44%;\n    border: 1px solid rgb(0, 0, 0);\n    justify-content: space-around;\n    align-items: center;\n}\n\n.startNew p{\n    font-size: 24px;\n    text-align: center;\n}\n\nbutton {\n    height: 50px;\n    width: 100px;\n    border: 1px solid rgb(0, 0, 0);\n    font-size: 15px;\n}\n\n.placeShips{\n    display: none;\n    flex-direction: column;\n    height: 600px;\n    width: 900px;\n    background-color: rgb(122, 151, 248);\n    position: absolute;\n    border: 2px solid rgb(0, 0, 0);\n    justify-content: space-around;\n    align-items: center;\n}\n\n.placeShips #board>div{\n    border: 1px solid rgb(0, 0, 0);\n}\n\n.boardwrap{\n    display: flex;\n    width: 800px;\n    justify-content: space-between;\n}\n\n.ships{\n    display: flex;\n    flex-direction: column;\n    height: 500px;\n    width: 300px;\n    background-color: white;\n    margin-left: 30px;\n    align-items: flex-end;\n    background-color: rgb(122, 151, 248);\n}\n\n.ships button{\n    margin-top: 20px;\n}\n\n.ships p{\n    font-size: 25px;\n}\n\nbutton:hover {\n    background-color: rgb(17, 0, 255);\n    color: white;\n}\n\n.shipGroup{\n    display: flex;\n    justify-content: space-between;\n    position: relative;\n    width: 95%;\n    align-items: center;\n    margin-top: 20px;\n}\n\n#carrier{\n    grid-template-columns: repeat(4, min(50px));\n}\n\n#battlecruiser{\n    grid-template-columns: repeat(3, min(50px));\n}\n\n#destroyer{\n    grid-template-columns: repeat(2, min(50px));\n}\n\n#gunship{\n    grid-template-columns: repeat(1, min(50px));\n}\n\n#carrier, #battlecruiser, #destroyer, #gunship {\n    display: grid;\n    background-color: white; \n    grid-template-rows: max(48px);\n}\n\n.part{\n    border: 1px solid black;\n    background-color: rgb(17, 0, 255);\n}\n\n.noBorder{\n    border: none;\n}\n\n.shipspot{\n    background-color: blueviolet;\n}", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,SAAS;IACT,YAAY;IACZ,UAAU;IACV,sBAAsB;AAC1B;;AAEA;IACI,aAAa;IACb,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,6BAA6B;IAC7B,iBAAiB;IACjB,mBAAmB;AACvB;;AAEA;;;IAGI,aAAa;IACb,YAAY;IACZ,uBAAuB;IACvB,uBAAuB;IACvB,aAAa;IACb,oDAAoD;IACpD,iDAAiD;;AAErD;;AAEA;;IAEI;;0BAEsB;IACtB,uBAAuB;AAC3B;;AAEA;IACI,kBAAkB;IAClB,aAAa;IACb,YAAY;AAChB;;AAEA;;IAEI,aAAa;IACb,oCAAoC;IACpC,iBAAiB;IACjB,cAAc;IACd,uBAAuB;IACvB,mBAAmB;AACvB;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,yDAAuD;IACvD,oCAAoC;IACpC,qBAAqB;AACzB;;AAEA;IACI,sBAAsB;AAC1B;;AAEA;IACI,yDAA8C;IAC9C,4BAA4B;IAC5B,oBAAoB;IACpB,2BAA2B;AAC/B;;AAEA;IACI,yDAA8C;IAC9C,4BAA4B;IAC5B,oBAAoB;IACpB,2BAA2B;AAC/B;;AAEA;IACI,qBAAqB;AACzB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,aAAa;IACb,YAAY;IACZ,oCAAoC;IACpC,kBAAkB;IAClB,QAAQ;IACR,SAAS;IACT,8BAA8B;IAC9B,6BAA6B;IAC7B,mBAAmB;AACvB;;AAEA;IACI,eAAe;IACf,kBAAkB;AACtB;;AAEA;IACI,YAAY;IACZ,YAAY;IACZ,8BAA8B;IAC9B,eAAe;AACnB;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,aAAa;IACb,YAAY;IACZ,oCAAoC;IACpC,kBAAkB;IAClB,8BAA8B;IAC9B,6BAA6B;IAC7B,mBAAmB;AACvB;;AAEA;IACI,8BAA8B;AAClC;;AAEA;IACI,aAAa;IACb,YAAY;IACZ,8BAA8B;AAClC;;AAEA;IACI,aAAa;IACb,sBAAsB;IACtB,aAAa;IACb,YAAY;IACZ,uBAAuB;IACvB,iBAAiB;IACjB,qBAAqB;IACrB,oCAAoC;AACxC;;AAEA;IACI,gBAAgB;AACpB;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,iCAAiC;IACjC,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,8BAA8B;IAC9B,kBAAkB;IAClB,UAAU;IACV,mBAAmB;IACnB,gBAAgB;AACpB;;AAEA;IACI,2CAA2C;AAC/C;;AAEA;IACI,2CAA2C;AAC/C;;AAEA;IACI,2CAA2C;AAC/C;;AAEA;IACI,2CAA2C;AAC/C;;AAEA;IACI,aAAa;IACb,uBAAuB;IACvB,6BAA6B;AACjC;;AAEA;IACI,uBAAuB;IACvB,iCAAiC;AACrC;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,4BAA4B;AAChC","sourcesContent":["* {\n    margin: 0;\n    border: none;\n    padding: 0;\n    box-sizing: border-box;\n}\n\nbody {\n    height: 100vh;\n    width: 100vw;\n}\n\n.main {\n    display: flex;\n    justify-content: space-around;\n    height: min(70vh);\n    align-items: center;\n}\n\n.p1b,\n.p2b, \n.board {\n    height: 500px;\n    width: 500px;\n    border: 1px solid black;\n    background-color: white;\n    display: grid;\n    grid-template-columns: repeat(10, minmax(50px, 1fr));\n    grid-template-rows: repeat(10, minmax(50px, 1fr));\n\n}\n\n.p1b div,\n.p2b div {\n    /* display: flex;\n    justify-content: center;\n    align-items: center; */\n    border: 1px solid black;\n}\n\n.curtain {\n    position: absolute;\n    height: 500px;\n    width: 500px;\n}\n\nfooter,\nheader {\n    display: flex;\n    background-color: rgb(122, 151, 248);\n    height: min(15vh);\n    font-size: 7vh;\n    justify-content: center;\n    align-items: center;\n}\n\nfooter{\n    font-size: large;\n}\n\n.hit {\n    background-image: url(../src/images/icons8-fire-48.png);\n    background-color: rgb(245, 169, 169);\n    background-size: 100%;\n}\n\n.ship, .shipGroup>div {\n    background-color: blue;\n}\n\n.miss {\n    background-image: url(../src/images/close.png);\n    background-repeat: no-repeat;\n    background-size: 70%;\n    background-position: center;\n}\n\n.sur{\n    background-image: url(../src/images/close.png);\n    background-repeat: no-repeat;\n    background-size: 70%;\n    background-position: center;\n}\n\n.scale{\n    background-size: 100%;\n}\n\n.startNew{\n    display: flex;\n    flex-direction: column;\n    height: 150px;\n    width: 200px;\n    background-color: rgb(122, 151, 248);\n    position: absolute;\n    top: 25%;\n    left: 44%;\n    border: 1px solid rgb(0, 0, 0);\n    justify-content: space-around;\n    align-items: center;\n}\n\n.startNew p{\n    font-size: 24px;\n    text-align: center;\n}\n\nbutton {\n    height: 50px;\n    width: 100px;\n    border: 1px solid rgb(0, 0, 0);\n    font-size: 15px;\n}\n\n.placeShips{\n    display: none;\n    flex-direction: column;\n    height: 600px;\n    width: 900px;\n    background-color: rgb(122, 151, 248);\n    position: absolute;\n    border: 2px solid rgb(0, 0, 0);\n    justify-content: space-around;\n    align-items: center;\n}\n\n.placeShips #board>div{\n    border: 1px solid rgb(0, 0, 0);\n}\n\n.boardwrap{\n    display: flex;\n    width: 800px;\n    justify-content: space-between;\n}\n\n.ships{\n    display: flex;\n    flex-direction: column;\n    height: 500px;\n    width: 300px;\n    background-color: white;\n    margin-left: 30px;\n    align-items: flex-end;\n    background-color: rgb(122, 151, 248);\n}\n\n.ships button{\n    margin-top: 20px;\n}\n\n.ships p{\n    font-size: 25px;\n}\n\nbutton:hover {\n    background-color: rgb(17, 0, 255);\n    color: white;\n}\n\n.shipGroup{\n    display: flex;\n    justify-content: space-between;\n    position: relative;\n    width: 95%;\n    align-items: center;\n    margin-top: 20px;\n}\n\n#carrier{\n    grid-template-columns: repeat(4, min(50px));\n}\n\n#battlecruiser{\n    grid-template-columns: repeat(3, min(50px));\n}\n\n#destroyer{\n    grid-template-columns: repeat(2, min(50px));\n}\n\n#gunship{\n    grid-template-columns: repeat(1, min(50px));\n}\n\n#carrier, #battlecruiser, #destroyer, #gunship {\n    display: grid;\n    background-color: white; \n    grid-template-rows: max(48px);\n}\n\n.part{\n    border: 1px solid black;\n    background-color: rgb(17, 0, 255);\n}\n\n.noBorder{\n    border: none;\n}\n\n.shipspot{\n    background-color: blueviolet;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }

  if (!url) {
    return url;
  }

  url = String(url.__esModule ? url.default : url); // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }

  if (options.hash) {
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/images/close.png":
/*!******************************!*\
  !*** ./src/images/close.png ***!
  \******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "3f1efb87491214c146da.png";

/***/ }),

/***/ "./src/images/icons8-fire-48.png":
/*!***************************************!*\
  !*** ./src/images/icons8-fire-48.png ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "790566af980138ba22cf.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2ZBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7Ozs7VUVyQkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vc3JjL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vc3JjL21vZGVsLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9zcmMvdmlldy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHZpZXcgfSBmcm9tIFwiLi92aWV3XCI7XG5pbXBvcnQgeyBpbml0UG9wdXAgfSBmcm9tIFwiLi9pbmRleFwiO1xuaW1wb3J0IHsgbW9kZWwgfSBmcm9tIFwiLi9tb2RlbFwiO1xuXG5leHBvcnQgY29uc3QgY29udHJvbGxlciA9ICgoKSA9PiB7XG5cbiAgICBsZXQgbW92ZUNvdW50ZXIgPSAwO1xuICAgIFxuICAgIGNvbnN0IF9yYW5kb21Nb3ZlR2VuID0gKHBsYXllcikgPT4ge1xuICAgICAgICBjb25zdCByYW5kb21Nb3ZlID0gMSArIGAke01hdGguY2VpbChNYXRoLnJhbmRvbSgpICogKDEwKSl9YCArIGAke01hdGguY2VpbChNYXRoLnJhbmRvbSgpICogKDEwKSl9YDtcbiAgICAgICAgaWYgKHBsYXllci5ib2FyZC5pbGxlZ2FsTW92ZXMuaW5kZXhPZihyYW5kb21Nb3ZlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiByYW5kb21Nb3ZlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBfcmFuZG9tTW92ZUdlbihwbGF5ZXIpO1xuICAgICAgICB9OyAgXG4gICAgfTtcblxuICAgIGNvbnN0IG1ha2VNb3ZlID0gKGNlbGwsIHBsYXllcnMpID0+IHtcbiAgICAgICAgaWYgKHBsYXllcnNbMV0uYm9hcmQuaWxsZWdhbE1vdmVzLmluZGV4T2YoY2VsbCkgPT09IC0xKSB7XG4gICAgICAgICAgICBwbGF5ZXJzWzFdLmJvYXJkLnJlY2VpdmVBdHRhY2soY2VsbCwgcGxheWVyc1sxXSk7XG4gICAgICAgICAgICBwbGF5ZXJzWzBdLmJvYXJkLnJlY2VpdmVBdHRhY2soX3JhbmRvbU1vdmVHZW4ocGxheWVyc1swXSksIHBsYXllcnNbMF0pO1xuICAgICAgICAgICAgbW92ZUNvdW50ZXIgKz0gMTtcbiAgICAgICAgICAgIGNoZWNrV2lubmVyKHBsYXllcnMpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBjb25zdCBjaGVja1dpbm5lciA9IChwbGF5ZXJzKSA9PiB7XG4gICAgICAgIGlmIChwbGF5ZXJzWzBdLmJvYXJkLnNoaXBzU3VuaygpLmxlbmd0aCA9PT0gMTApIHtcbiAgICAgICAgICAgIHBsYXllcnNbMV0uaXNXaW5uZXIgPSB0cnVlOyBcbiAgICAgICAgICAgIHZpZXcuZGlzcGxheVN0YXJ0TmV3KGBTdHVwaWQgY29tcHV0ZXIgd2lucyFgKTtcbiAgICAgICAgfSBlbHNlIGlmIChwbGF5ZXJzWzFdLmJvYXJkLnNoaXBzU3VuaygpLmxlbmd0aCA9PT0gMTApIHtcbiAgICAgICAgICAgIHBsYXllcnNbMF0uaXNXaW5uZXIgPSB0cnVlOyBcbiAgICAgICAgICAgIHZpZXcuZGlzcGxheVN0YXJ0TmV3KGBZb3Ugd2luIWApO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBjb25zdCBzdGFydE5ldyA9ICgpID0+IHtcbiAgICAgICAgaW5pdFBvcHVwKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHN0YXJ0UmFuZG9tID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBwbGF5ZXJzID0gbW9kZWwuaW5pdFBsYXllcnMoKTtcbiAgICAgICAgcGxheWVyc1swXS5ib2FyZC5yYW5kb21Mb2NhdGlvbnMoKTtcbiAgICAgICAgcGxheWVyc1sxXS5ib2FyZC5yYW5kb21Mb2NhdGlvbnMoKTtcbiAgICAgICAgdmlldy5yZW1vdmVQbGFjZVNoaXBQb3B1cCgpO1xuICAgICAgICB2aWV3LmRpc3BsYXlCb2FyZHMocGxheWVycyk7XG4gICAgICAgIHZpZXcuZGlzcGxheVNoaXBzKHBsYXllcnNbMF0uZ2V0RmxlZXQoKSk7XG4gICAgICAgIFxuICAgIH07XG5cbiAgICByZXR1cm4geyBtb3ZlQ291bnRlciwgbWFrZU1vdmUsIGNoZWNrV2lubmVyLCBzdGFydE5ldywgc3RhcnRSYW5kb219O1xuXG59KSgpO1xuIiwiaW1wb3J0ICcuLi9zcmMvc3R5bGUuY3NzJztcbmltcG9ydCB7IHZpZXcgfSBmcm9tIFwiLi92aWV3XCI7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRQb3B1cCgpIHtcbiAgICB2aWV3LnBsYWNlU2hpcHNQb3B1cCgpO1xufTtcblxuXG5pbml0UG9wdXAoKTtcblxuXG5cblxuXG5cblxuIiwiaW1wb3J0IHsgdmlldyB9IGZyb20gXCIuL3ZpZXdcIjtcblxuZXhwb3J0IGNvbnN0IG1vZGVsID0gKCgpID0+IHtcblxuICAgIGNvbnN0IHNoaXBGYWN0b3J5ID0gKGxlbmd0aCkgPT4ge1xuICAgICAgICBjb25zdCBzaGlwTGVuZ3RoID0gbGVuZ3RoO1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIDIpO1xuICAgICAgICBsZXQgc3RhcnRMb2NhdGlvbjsgXG4gICAgICAgIGNvbnN0IGxvY2F0aW9ucyA9IFtdO1xuICAgICAgICBjb25zdCBzdXJMb2NhdGlvbnMgPSBbXTtcbiAgICAgICAgY29uc3QgZm9yYkxvY2F0aW9ucyA9IFtdO1xuICAgICAgICBjb25zdCBoaXRzID0gW107XG4gICAgICAgIGxldCBpc1N1bmsgPSBmYWxzZTtcblxuICAgICAgICBjb25zdCBzZXRDb29yZCA9IChjZWxscykgPT4ge1xuICAgICAgICAgICAgaWYgKGNlbGxzKSB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb25zID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb25zLnB1c2goYCR7Y2VsbHNbaV19YCk7XG4gICAgICAgICAgICAgICAgfTsgXG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGdldHRpbmdIaXQgPSAobG9jYXRpb24pID0+IHtcbiAgICAgICAgICAgIGhpdHNbbG9jYXRpb25dID0gJ2hpdCc7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBnZXR0aW5nU3VuayA9IChzaGlwKSA9PiB7XG4gICAgICAgICAgICBpZiAoc2hpcC5oaXRzLmluZGV4T2YoJycpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHNoaXAuaXNTdW5rID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2aWV3LmRpc3BsYXlTdXJMb2NhdGlvbnMoc2hpcC5zdXJMb2NhdGlvbnMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBzaGlwLmlzU3VuaztcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4geyBzZXRDb29yZCAsbG9jYXRpb25zLCBoaXRzLCBpc1N1bmssIGdldHRpbmdTdW5rLCBkaXJlY3Rpb24sIGdldHRpbmdIaXQsIHNoaXBMZW5ndGgsIHN1ckxvY2F0aW9ucywgZm9yYkxvY2F0aW9ucywgc3RhcnRMb2NhdGlvbn07XG4gICAgfTtcblxuICAgIGNvbnN0IGJvYXJkRmFjdG9yeSA9IChpZCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGJvYXJkSWQgPSBpZDtcblxuICAgICAgICBjb25zdCBib2FyZFNpemUgPSAxMDtcblxuICAgICAgICBjb25zdCBzaGlwcyA9IFtzaGlwRmFjdG9yeSg0KSxcbiAgICAgICAgc2hpcEZhY3RvcnkoMyksXG4gICAgICAgIHNoaXBGYWN0b3J5KDMpLFxuICAgICAgICBzaGlwRmFjdG9yeSgyKSxcbiAgICAgICAgc2hpcEZhY3RvcnkoMiksXG4gICAgICAgIHNoaXBGYWN0b3J5KDIpLFxuICAgICAgICBzaGlwRmFjdG9yeSgxKSxcbiAgICAgICAgc2hpcEZhY3RvcnkoMSksXG4gICAgICAgIHNoaXBGYWN0b3J5KDEpLFxuICAgICAgICBzaGlwRmFjdG9yeSgxKV07XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzaGlwc1N1bmsgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaGlwc1N1bmsgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc2hpcHNbaV0uaXNTdW5rID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBzU3Vuay5wdXNoKHNoaXBzW2ldKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBzaGlwc1N1bms7XG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IGlsbGVnYWxNb3ZlcyA9IFtdO1xuXG4gICAgICAgIGNvbnN0IHJhbmRvbUxvY2F0aW9ucyA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzaGlwTG9jYXRpb25zO1xuICAgICAgICAgICAgbGV0IHN1ckxvY2F0aW9ucztcbiAgICAgICAgICAgIGxldCBmb3JiTG9jYXRpb25zO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChzaGlwc1tpXS5zdGFydExvY2F0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZG8ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2hpcFNwb3QgPSBnZW5lcmF0ZUxvY2F0aW9ucyhzaGlwc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwTG9jYXRpb25zID0gc2hpcFNwb3RbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMgPSBzaGlwU3BvdFsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcmJMb2NhdGlvbnMgPSBzaGlwTG9jYXRpb25zLmNvbmNhdChzdXJMb2NhdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9IHdoaWxlIChjaGVja0NvbGxpc2lvbihzaGlwTG9jYXRpb25zKSk7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBzW2ldLmxvY2F0aW9ucyA9IHNoaXBMb2NhdGlvbnM7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBzW2ldLnN1ckxvY2F0aW9ucyA9IHN1ckxvY2F0aW9ucztcbiAgICAgICAgICAgICAgICAgICAgc2hpcHNbaV0uZm9yYkxvY2F0aW9ucyA9IGZvcmJMb2NhdGlvbnM7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tTG9jYXRpb25zKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgc2hpcHNbaV0uc2hpcExlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBzW2ldLmhpdHMucHVzaCgnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBnZW5lcmF0ZUxvY2F0aW9ucyA9IChzaGlwKSA9PiB7XG5cbiAgICAgICAgICAgIGxldCBjb2w7XG4gICAgICAgICAgICBsZXQgcm93O1xuXG4gICAgICAgICAgICBjb25zdCBuZXdMb2NhdGlvbnMgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHN1ckxvY2F0aW9ucyA9IFtdO1xuICAgICAgICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcm93ID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiBib2FyZFNpemUpO1xuICAgICAgICAgICAgICAgIGNvbCA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogKGJvYXJkU2l6ZSAtIChzaGlwLnNoaXBMZW5ndGggKyAxKSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByb3cgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIChib2FyZFNpemUgLSAoc2hpcC5zaGlwTGVuZ3RoICsgMSkpKTtcbiAgICAgICAgICAgICAgICBjb2wgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIGJvYXJkU2l6ZSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuc2hpcExlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0xvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3d9YCArIChjb2wgKyBpKSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuZXdMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7KHJvdyArIGkpfWAgKyBgJHtjb2x9YClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYgKHNoaXAuZGlyZWN0aW9uID09PSAxKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93ICsgMX1gICsgKGNvbCArIGkpKTtcbiAgICAgICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyAtIDF9YCArIChjb2wgKyBpKSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93IC0gMX1gICsgKGNvbCAtIDEpKTtcbiAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93fWAgKyAoY29sIC0gMSkpO1xuICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3cgKyAxfWAgKyAoY29sIC0gMSkpO1xuXG4gICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyAtIDF9YCArIChjb2wgKyBzaGlwLnNoaXBMZW5ndGgpKTtcbiAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93fWAgKyAoY29sICsgc2hpcC5zaGlwTGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyArIDF9YCArIChjb2wgKyBzaGlwLnNoaXBMZW5ndGgpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLnNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93ICsgaX1gICsgKGNvbCArIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyArIGl9YCArIChjb2wgLSAxKSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93IC0gMX1gICsgKGNvbCAtIDEpKTtcbiAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93IC0gMX1gICsgKGNvbCkpO1xuICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3cgLSAxfWAgKyAoY29sICsgMSkpO1xuXG4gICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyArIHNoaXAuc2hpcExlbmd0aH1gICsgKGNvbCAtIDEpKTtcbiAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93ICsgc2hpcC5zaGlwTGVuZ3RofWAgKyAoY29sKSk7XG4gICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyArIHNoaXAuc2hpcExlbmd0aH1gICsgKGNvbCArIDEpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gW25ld0xvY2F0aW9ucywgc3VyTG9jYXRpb25zXTtcblxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGNoZWNrQ29sbGlzaW9uID0gKGxvY2F0aW9ucykgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgbG9jYXRpb25zLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGlwc1tpXS5mb3JiTG9jYXRpb25zLmluZGV4T2YobG9jYXRpb25zW2pdKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGBubyBjb2xsaXNpb25zIG9uIHNoaXAgJHtzaGlwc1tpXX1gKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBjdXN0b21Mb2NhdGlvbnMgPSAoKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIGNvZGUgZ29lcyBoZXJlIGlmIG5lZWRlZFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY2VsbCwgcGxheWVyKSA9PiB7XG4gICAgICAgICAgICBwbGF5ZXIuYm9hcmQuaWxsZWdhbE1vdmVzLnB1c2goY2VsbCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhwbGF5ZXIuYm9hcmQuaWxsZWdhbE1vdmVzKTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc2hpcHNbaV0ubG9jYXRpb25zLmluZGV4T2YoY2VsbCkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICB2aWV3LmRpc3BsYXlIaXQoY2VsbCk7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBzW2ldLmdldHRpbmdIaXQoc2hpcHNbaV0ubG9jYXRpb25zLmluZGV4T2YoY2VsbCkpO1xuICAgICAgICAgICAgICAgICAgICBzaGlwc1tpXS5nZXR0aW5nU3VuayhzaGlwc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGlwc1tpXS5nZXR0aW5nU3VuayhzaGlwc1tpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllci5ib2FyZC5pbGxlZ2FsTW92ZXMgPSBwbGF5ZXIuYm9hcmQuaWxsZWdhbE1vdmVzLmNvbmNhdChzaGlwc1tpXS5zdXJMb2NhdGlvbnMpXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2hpcHNbaV0ubG9jYXRpb25zLmluZGV4T2YoY2VsbCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXcuZGlzcGxheU1pc3MoY2VsbCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07IFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm57c2hpcHMsIGlsbGVnYWxNb3ZlcywgcmVjZWl2ZUF0dGFjaywgc2hpcHNTdW5rLCByYW5kb21Mb2NhdGlvbnN9XG4gICAgfTtcblxuICAgIGNvbnN0IHBsYXllciA9IChpZCkgPT4ge1xuICAgICAgICBjb25zdCBwbGF5ZXJJZCA9IGlkO1xuICAgICAgICBjb25zdCBib2FyZCA9IGJvYXJkRmFjdG9yeShwbGF5ZXJJZCk7XG4gICAgICAgIGNvbnN0IGdldEZsZWV0ID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxlZXRDb29yZHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQuc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGJvYXJkLnNoaXBzW2ldLmxvY2F0aW9ucy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBmbGVldENvb3Jkcy5wdXNoKGJvYXJkLnNoaXBzW2ldLmxvY2F0aW9uc1tqXSlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBmbGVldENvb3JkcztcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgaXNXaW5uZXIgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJue3BsYXllcklkLCBib2FyZCwgZ2V0RmxlZXQsIGlzV2lubmVyfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpbml0UGxheWVycygpIHtcbiAgICBcbiAgICBsZXQgcGxheWVyMSA9IHBsYXllcigxKTtcbiAgICBsZXQgcGxheWVyMiA9IHBsYXllcigyKTtcblxuICAgIHJldHVybiBbcGxheWVyMSwgcGxheWVyMl07XG4gICAgXG59O1xuICAgIFxuICAgIHJldHVybiB7IGluaXRQbGF5ZXJzIH07XG5cbn0pKCkiLCJpbXBvcnQgeyBjb250cm9sbGVyIH0gZnJvbSBcIi4vY29udHJvbGxlclwiO1xuXG5leHBvcnQgY29uc3QgdmlldyA9ICgoKSA9PiB7XG5cbiAgICBjb25zdCBkaXNwbGF5Qm9hcmRzID0gKHBsYXllcnMpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3AnICsgaSArICdiJyk7XG4gICAgICAgICAgICB3aGlsZSAoYm9hcmQuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICAgIGJvYXJkLmZpcnN0Q2hpbGQucmVtb3ZlKClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IDExOyBqKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDExOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgnaWQnLCBpICsgYCR7an1gICsgayk7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjZWxsJyk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMiAmJiBwbGF5ZXJzIT09dW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIubWFrZU1vdmUoY2VsbC5pZCwgcGxheWVycyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgYm9hcmQuYXBwZW5kQ2hpbGQoY2VsbCk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBcbiAgICBjb25zdCBkaXNwbGF5SGl0ID0gKGNlbGxJRCkgPT4ge1xuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY2VsbElEKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJyk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnbWlzcycpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ2hpdCcpO1xuICAgIH07XG5cbiAgICBjb25zdCBkaXNwbGF5TWlzcyA9IChjZWxsSUQpID0+IHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNlbGxJRCk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZGlzcGxheVNoaXBzID0gKHNoaXBzKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChzaGlwc1tpXSAhPT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtzaGlwc1tpXX1gKTtcbiAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGNvbnN0IGRpc3BsYXlTdXJMb2NhdGlvbnMgPSAoY2VsbHMpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjZWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNlbGxzW2ldKTtcbiAgICAgICAgICAgIGlmIChjZWxsICE9PSB1bmRlZmluZWQgJiYgY2VsbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnc3VyJyk7XG4gICAgICAgICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdzY2FsZScpO1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ3NjYWxlJykgfSwgMTUwKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGNvbnN0IGRpc3BsYXlTdGFydE5ldyA9IChwaHJhemUpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhcnROZXdQb3B1cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBzdGFydE5ld1BvcHVwLmNsYXNzTGlzdC5hZGQoJ3N0YXJ0TmV3Jyk7XG4gICAgICAgIHN0YXJ0TmV3UG9wdXAuaW5uZXJIVE1MID0gYFxuICAgICAgICAgICAgPHA+ICR7cGhyYXplfSA8L3A+XG4gICAgICAgICAgICA8YnV0dG9uIGlkPVwicGxheUFnYWluXCI+IFBsYXkgYWdhaW4gPC9idXR0b24+IGA7XG4gICAgICAgIGNvbnN0IGN1dHJhaW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY3V0cmFpbi5jbGFzc0xpc3QuYWRkKCdjdXJ0YWluJyk7XG4gICAgICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbicpO1xuICAgICAgICBjb25zdCBwMmIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncDJiJyk7XG4gICAgICAgIHAyYi5hcHBlbmRDaGlsZChjdXRyYWluKTtcbiAgICAgICAgbWFpbi5hcHBlbmRDaGlsZChzdGFydE5ld1BvcHVwKTtcbiAgICAgICAgY29uc3QgcGxheUFnYWluID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXlBZ2FpbicpO1xuICAgICAgICBwbGF5QWdhaW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICBwMmIucmVtb3ZlQ2hpbGQoY3V0cmFpbik7XG4gICAgICAgICAgICBtYWluLnJlbW92ZUNoaWxkKHN0YXJ0TmV3UG9wdXApO1xuICAgICAgICAgICAgY29udHJvbGxlci5zdGFydE5ldygpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3QgcGxhY2VTaGlwc1BvcHVwID0gKCkgPT4ge1xuICAgICAgICBkaXNwbGF5Qm9hcmRzKCk7XG4gICAgICAgIGNvbnN0IHBsYWNlU2hpcHNQb3B1cCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFjZVNoaXBzJyk7XG4gICAgICAgIHBsYWNlU2hpcHNQb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgICBjb25zdCBib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2FyZCcpO1xuICAgICAgICBfcmVuZGVyQm9hcmQoYm9hcmQpO1xuXG4gICAgICAgIGNvbnN0IG9rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29rJyk7XG4gICAgICAgIG9rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2hpIHRoZXJlIScpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHJhbmRvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYW5kb20nKTtcbiAgICAgICAgcmFuZG9tLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29udHJvbGxlci5zdGFydFJhbmRvbSgpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCByb3RhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb2snKTtcbiAgICAgICAgcm90YXRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2hpIHRoZXJlIScpXG4gICAgICAgIH0pO1xuXG4gICAgICAgIFxuICAgIH07XG5cbiAgICBjb25zdCBfcmVuZGVyQm9hcmQgPSAoYm9hcmQpID0+IHtcbiAgICAgICAgY29uc3QgaW5pdEJvYXJkID0gYm9hcmQ7XG4gICAgICAgIHdoaWxlIChpbml0Qm9hcmQuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgaW5pdEJvYXJkLmZpcnN0Q2hpbGQucmVtb3ZlKClcbiAgICAgICAgfTtcblxuICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IDExOyBqKyspIHtcbiAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgMTE7IGsrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgnaWQnLCBgJHtqfSR7a31gKTtcbiAgICAgICAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnY29udGFpbmVyJyk7XG5cbiAgICAgICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgX3BsYWNlU2hpcHMoY2VsbCwgaiwgayk7XG4gICAgICAgICAgICAgICAgfSlcblxuXG4gICAgICAgICAgICAgICAgLy8gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnc2hpcHNwb3QnKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYgKGNlbGwubmV4dEVsZW1lbnRTaWJsaW5nICYmIGNlbGwubmV4dEVsZW1lbnRTaWJsaW5nLmlkID09PSAoYCR7an1gICsgKGsgKyAxKSkpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNvbnNvbGUubG9nKGNlbGwubmV4dEVsZW1lbnRTaWJsaW5nLmlkKVxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgY2VsbC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmFkZCgnc2hpcHNwb3QnKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgIC8vIH0pXG5cbiAgICAgICAgICAgICAgICAvLyBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcHNwb3QnKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYgKGNlbGwubmV4dEVsZW1lbnRTaWJsaW5nICYmIGNlbGwubmV4dEVsZW1lbnRTaWJsaW5nLmlkID09PSAoYCR7an1gICsgKGsgKyAxKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gICAgICAgIGNlbGwubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXBzcG90Jyk7XG4gICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAvLyB9KVxuXG4gICAgICAgICAgICAgICAgLy8gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gICAgIGlmIChjZWxsLm5leHRFbGVtZW50U2libGluZyAmJiBjZWxsLm5leHRFbGVtZW50U2libGluZy5pZCA9PT0gKGAke2p9YCArIChrICsgMSkpKSB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNlbGwubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgIC8vIH0pXG5cbiAgICAgICAgICAgICAgICAvLyBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHtcbiAgICAgICAgICAgICAgICAvLyAgICAgY29uc3QgbmV4dFBhcnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtqICsgMX0ke2t9YCk7XG4gICAgICAgICAgICAgICAgLy8gICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnc2hpcHNwb3QnKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYgKG5leHRQYXJ0LmlkICE9PSBgMTEke2t9YCkge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgbmV4dFBhcnQuY2xhc3NMaXN0LmFkZCgnc2hpcHNwb3QnKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyB9KVxuXG4gICAgICAgICAgICAgICAgLy8gY2VsbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vICAgICBjb25zdCBuZXh0UGFydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2ogKyAxfSR7a31gKTtcbiAgICAgICAgICAgICAgICAvLyAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwc3BvdCcpO1xuICAgICAgICAgICAgICAgIC8vICAgICBuZXh0UGFydC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwc3BvdCcpO1xuICAgICAgICAgICAgICAgIC8vIH0pXG5cbiAgICAgICAgICAgICAgICAvLyBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgIC8vICAgICBjb25zdCBuZXh0UGFydCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke2ogKyAxfSR7a31gKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gICAgIGlmIChuZXh0UGFydC5pZCAhPT0gYDExJHtrfWApIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgbmV4dFBhcnQuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgLy8gfSlcblxuICAgICAgICAgICAgICAgIGluaXRCb2FyZC5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGNvbnN0IF9wbGFjZVNoaXBzID0gKGNlbGwsIHJvdywgY29sKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcmJpZEhvciA9IFsnMTEnLCAnMjEnLCAnMzEnLCAnNDEnLCAnNTEnLCAnNjEnLCAnNzEnLCAnODEnLCAnOTEnLCAnMTAxJ107IFxuXG4gICAgICAgIGNvbnN0IGZvcmJpZFZlcnQgPSBbXTtcblxuICAgICAgICBfcGxhY2VDYXJyaWVyKGNlbGwsIGZvcmJpZEhvciwgZm9yYmlkVmVydCwgcm93LCBjb2wpO1xuXG4gICAgfTtcblxuICAgIGNvbnN0IF9wbGFjZUNhcnJpZXIgPSAoY2VsbCwgZm9yYmlkSG9yLCBmb3JiaWRWZXJ0LCByb3csIGNvbCkgPT4ge1xuXG4gICAgICAgIGxldCBwbGFjZWQgPSBmYWxzZTtcblxuICAgICAgICAvLyBjb25zdCBwYXJ0MiA9IGNlbGwubmV4dEVsZW1lbnRTaWJsaW5nO1xuXG4gICAgICAgIGNvbnN0IHBhcnQxID0gY2VsbDtcbiAgICAgICAgY29uc3QgcGFydDIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtyb3d9JHtjb2wgKyAxfWApO1xuICAgICAgICBjb25zdCBwYXJ0MyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3Jvd30ke2NvbCArIDJ9YCk7XG4gICAgICAgIGNvbnN0IHBhcnQ0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoYCR7cm93fSR7Y29sICsgM31gKTtcblxuICAgICAgICBjb25zdCBjYXJyaWVyID0gW3BhcnQxLCBwYXJ0MiwgcGFydDMsIHBhcnQ0XTtcblxuICAgICAgICBjYXJyaWVyLmZvckVhY2gocGFydCA9PiB7XG4gICAgICAgICAgICBpZiAocGFydCAhPT0gbnVsbCAmJiBwYXJ0LmlkICE9PSBgJHtyb3d9JHsxMX1gICYmIHBhcnQuaWQgIT09IGAke3Jvd30kezEyfWAgJiYgcGFydC5pZCAhPT0gYCR7cm93fSR7MTN9YCkge1xuICAgICAgICAgICAgICAgIHBhcnQuY2xhc3NMaXN0LmFkZCgnc2hpcHNwb3QnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICBcblxuICAgICAgICAgICAgcGFydDEuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICBwYXJ0MS5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwc3BvdCcpO1xuICAgICAgICAgICAgICAgIGlmIChwYXJ0NCAhPT0gbnVsbCB8fCAocGFydDQhPT1udWxsICYmIHBhcnQzIT09bnVsbCkgfHwgKHBhcnQ0IT09bnVsbCAmJiBwYXJ0MyE9PW51bGwgJiYgcGFydDIhPT0gbnVsbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGFydDIuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcHNwb3QnKTtcbiAgICAgICAgICAgICAgICAgICAgcGFydDMuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcHNwb3QnKTtcbiAgICAgICAgICAgICAgICAgICAgcGFydDQuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcHNwb3QnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KVxuXG5cbiAgICAgICAgLy8gcGFydDEuY2xhc3NMaXN0LmFkZCgnc2hpcHNwb3QnKTtcblxuICAgICAgICAvLyBpZiAocGFydDIgIT09IG51bGwgfHwgcGFydDMgIT09bnVsbCB8fCBwYXJ0NCE9PW51bGwpIHtcbiAgICAgICAgICAgIFxuICAgICAgICAvLyAgICAgcGFydDIuY2xhc3NMaXN0LmFkZCgnc2hpcHNwb3QnKTtcbiAgICAgICAgLy8gICAgIHBhcnQzLmNsYXNzTGlzdC5hZGQoJ3NoaXBzcG90Jyk7XG4gICAgICAgIC8vICAgICBwYXJ0NC5jbGFzc0xpc3QuYWRkKCdzaGlwc3BvdCcpOyBcbiAgICAgICAgLy8gfVxuICAgICAgICBcblxuXG4gICAgICAgIFxuXG4gICAgfTtcblxuICAgIGNvbnN0IHJlbW92ZVBsYWNlU2hpcFBvcHVwID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBwbGFjZVNoaXBzUG9wdXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhY2VTaGlwcycpO1xuICAgICAgICBwbGFjZVNoaXBzUG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9O1xuXG5cbiAgICByZXR1cm4ge3JlbW92ZVBsYWNlU2hpcFBvcHVwLCBkaXNwbGF5Qm9hcmRzLCBkaXNwbGF5SGl0LCBkaXNwbGF5U2hpcHMsIGRpc3BsYXlNaXNzLCBkaXNwbGF5U3VyTG9jYXRpb25zLCBkaXNwbGF5U3RhcnROZXcsIHBsYWNlU2hpcHNQb3B1cH1cbn0pKCkiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi4vc3JjL2ltYWdlcy9pY29uczgtZmlyZS00OC5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuLi9zcmMvaW1hZ2VzL2Nsb3NlLnBuZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIHBhZGRpbmc6IDA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxufVxcblxcbmJvZHkge1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB3aWR0aDogMTAwdnc7XFxufVxcblxcbi5tYWluIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICAgIGhlaWdodDogbWluKDcwdmgpO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ucDFiLFxcbi5wMmIsIFxcbi5ib2FyZCB7XFxuICAgIGhlaWdodDogNTAwcHg7XFxuICAgIHdpZHRoOiA1MDBweDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgbWlubWF4KDUwcHgsIDFmcikpO1xcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgbWlubWF4KDUwcHgsIDFmcikpO1xcblxcbn1cXG5cXG4ucDFiIGRpdixcXG4ucDJiIGRpdiB7XFxuICAgIC8qIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyOyAqL1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG59XFxuXFxuLmN1cnRhaW4ge1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIGhlaWdodDogNTAwcHg7XFxuICAgIHdpZHRoOiA1MDBweDtcXG59XFxuXFxuZm9vdGVyLFxcbmhlYWRlciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxMjIsIDE1MSwgMjQ4KTtcXG4gICAgaGVpZ2h0OiBtaW4oMTV2aCk7XFxuICAgIGZvbnQtc2l6ZTogN3ZoO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuZm9vdGVye1xcbiAgICBmb250LXNpemU6IGxhcmdlO1xcbn1cXG5cXG4uaGl0IHtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0NSwgMTY5LCAxNjkpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XFxufVxcblxcbi5zaGlwLCAuc2hpcEdyb3VwPmRpdiB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsdWU7XFxufVxcblxcbi5taXNzIHtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyArIFwiKTtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiA3MCU7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG59XFxuXFxuLnN1cntcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyArIFwiKTtcXG4gICAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gICAgYmFja2dyb3VuZC1zaXplOiA3MCU7XFxuICAgIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG59XFxuXFxuLnNjYWxle1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XFxufVxcblxcbi5zdGFydE5ld3tcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgaGVpZ2h0OiAxNTBweDtcXG4gICAgd2lkdGg6IDIwMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTIyLCAxNTEsIDI0OCk7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAyNSU7XFxuICAgIGxlZnQ6IDQ0JTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiKDAsIDAsIDApO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnN0YXJ0TmV3IHB7XFxuICAgIGZvbnQtc2l6ZTogMjRweDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbn1cXG5cXG5idXR0b24ge1xcbiAgICBoZWlnaHQ6IDUwcHg7XFxuICAgIHdpZHRoOiAxMDBweDtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiKDAsIDAsIDApO1xcbiAgICBmb250LXNpemU6IDE1cHg7XFxufVxcblxcbi5wbGFjZVNoaXBze1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBoZWlnaHQ6IDYwMHB4O1xcbiAgICB3aWR0aDogOTAwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxMjIsIDE1MSwgMjQ4KTtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBib3JkZXI6IDJweCBzb2xpZCByZ2IoMCwgMCwgMCk7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG4ucGxhY2VTaGlwcyAjYm9hcmQ+ZGl2e1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCByZ2IoMCwgMCwgMCk7XFxufVxcblxcbi5ib2FyZHdyYXB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIHdpZHRoOiA4MDBweDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbn1cXG5cXG4uc2hpcHN7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGhlaWdodDogNTAwcHg7XFxuICAgIHdpZHRoOiAzMDBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICAgIG1hcmdpbi1sZWZ0OiAzMHB4O1xcbiAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxMjIsIDE1MSwgMjQ4KTtcXG59XFxuXFxuLnNoaXBzIGJ1dHRvbntcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXG59XFxuXFxuLnNoaXBzIHB7XFxuICAgIGZvbnQtc2l6ZTogMjVweDtcXG59XFxuXFxuYnV0dG9uOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE3LCAwLCAyNTUpO1xcbiAgICBjb2xvcjogd2hpdGU7XFxufVxcblxcbi5zaGlwR3JvdXB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICB3aWR0aDogOTUlO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBtYXJnaW4tdG9wOiAyMHB4O1xcbn1cXG5cXG4jY2FycmllcntcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgbWluKDUwcHgpKTtcXG59XFxuXFxuI2JhdHRsZWNydWlzZXJ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIG1pbig1MHB4KSk7XFxufVxcblxcbiNkZXN0cm95ZXJ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIG1pbig1MHB4KSk7XFxufVxcblxcbiNndW5zaGlwe1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxLCBtaW4oNTBweCkpO1xcbn1cXG5cXG4jY2FycmllciwgI2JhdHRsZWNydWlzZXIsICNkZXN0cm95ZXIsICNndW5zaGlwIHtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7IFxcbiAgICBncmlkLXRlbXBsYXRlLXJvd3M6IG1heCg0OHB4KTtcXG59XFxuXFxuLnBhcnR7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTcsIDAsIDI1NSk7XFxufVxcblxcbi5ub0JvcmRlcntcXG4gICAgYm9yZGVyOiBub25lO1xcbn1cXG5cXG4uc2hpcHNwb3R7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IGJsdWV2aW9sZXQ7XFxufVwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxTQUFTO0lBQ1QsWUFBWTtJQUNaLFVBQVU7SUFDVixzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGFBQWE7SUFDYiw2QkFBNkI7SUFDN0IsaUJBQWlCO0lBQ2pCLG1CQUFtQjtBQUN2Qjs7QUFFQTs7O0lBR0ksYUFBYTtJQUNiLFlBQVk7SUFDWix1QkFBdUI7SUFDdkIsdUJBQXVCO0lBQ3ZCLGFBQWE7SUFDYixvREFBb0Q7SUFDcEQsaURBQWlEOztBQUVyRDs7QUFFQTs7SUFFSTs7MEJBRXNCO0lBQ3RCLHVCQUF1QjtBQUMzQjs7QUFFQTtJQUNJLGtCQUFrQjtJQUNsQixhQUFhO0lBQ2IsWUFBWTtBQUNoQjs7QUFFQTs7SUFFSSxhQUFhO0lBQ2Isb0NBQW9DO0lBQ3BDLGlCQUFpQjtJQUNqQixjQUFjO0lBQ2QsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLHlEQUF1RDtJQUN2RCxvQ0FBb0M7SUFDcEMscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksc0JBQXNCO0FBQzFCOztBQUVBO0lBQ0kseURBQThDO0lBQzlDLDRCQUE0QjtJQUM1QixvQkFBb0I7SUFDcEIsMkJBQTJCO0FBQy9COztBQUVBO0lBQ0kseURBQThDO0lBQzlDLDRCQUE0QjtJQUM1QixvQkFBb0I7SUFDcEIsMkJBQTJCO0FBQy9COztBQUVBO0lBQ0kscUJBQXFCO0FBQ3pCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixhQUFhO0lBQ2IsWUFBWTtJQUNaLG9DQUFvQztJQUNwQyxrQkFBa0I7SUFDbEIsUUFBUTtJQUNSLFNBQVM7SUFDVCw4QkFBOEI7SUFDOUIsNkJBQTZCO0lBQzdCLG1CQUFtQjtBQUN2Qjs7QUFFQTtJQUNJLGVBQWU7SUFDZixrQkFBa0I7QUFDdEI7O0FBRUE7SUFDSSxZQUFZO0lBQ1osWUFBWTtJQUNaLDhCQUE4QjtJQUM5QixlQUFlO0FBQ25COztBQUVBO0lBQ0ksYUFBYTtJQUNiLHNCQUFzQjtJQUN0QixhQUFhO0lBQ2IsWUFBWTtJQUNaLG9DQUFvQztJQUNwQyxrQkFBa0I7SUFDbEIsOEJBQThCO0lBQzlCLDZCQUE2QjtJQUM3QixtQkFBbUI7QUFDdkI7O0FBRUE7SUFDSSw4QkFBOEI7QUFDbEM7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsWUFBWTtJQUNaLDhCQUE4QjtBQUNsQzs7QUFFQTtJQUNJLGFBQWE7SUFDYixzQkFBc0I7SUFDdEIsYUFBYTtJQUNiLFlBQVk7SUFDWix1QkFBdUI7SUFDdkIsaUJBQWlCO0lBQ2pCLHFCQUFxQjtJQUNyQixvQ0FBb0M7QUFDeEM7O0FBRUE7SUFDSSxnQkFBZ0I7QUFDcEI7O0FBRUE7SUFDSSxlQUFlO0FBQ25COztBQUVBO0lBQ0ksaUNBQWlDO0lBQ2pDLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxhQUFhO0lBQ2IsOEJBQThCO0lBQzlCLGtCQUFrQjtJQUNsQixVQUFVO0lBQ1YsbUJBQW1CO0lBQ25CLGdCQUFnQjtBQUNwQjs7QUFFQTtJQUNJLDJDQUEyQztBQUMvQzs7QUFFQTtJQUNJLDJDQUEyQztBQUMvQzs7QUFFQTtJQUNJLDJDQUEyQztBQUMvQzs7QUFFQTtJQUNJLDJDQUEyQztBQUMvQzs7QUFFQTtJQUNJLGFBQWE7SUFDYix1QkFBdUI7SUFDdkIsNkJBQTZCO0FBQ2pDOztBQUVBO0lBQ0ksdUJBQXVCO0lBQ3ZCLGlDQUFpQztBQUNyQzs7QUFFQTtJQUNJLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSw0QkFBNEI7QUFDaENcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxuICAgIG1hcmdpbjogMDtcXG4gICAgYm9yZGVyOiBub25lO1xcbiAgICBwYWRkaW5nOiAwO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5ib2R5IHtcXG4gICAgaGVpZ2h0OiAxMDB2aDtcXG4gICAgd2lkdGg6IDEwMHZ3O1xcbn1cXG5cXG4ubWFpbiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgICBoZWlnaHQ6IG1pbig3MHZoKTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnAxYixcXG4ucDJiLCBcXG4uYm9hcmQge1xcbiAgICBoZWlnaHQ6IDUwMHB4O1xcbiAgICB3aWR0aDogNTAwcHg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIG1pbm1heCg1MHB4LCAxZnIpKTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIG1pbm1heCg1MHB4LCAxZnIpKTtcXG5cXG59XFxuXFxuLnAxYiBkaXYsXFxuLnAyYiBkaXYge1xcbiAgICAvKiBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjsgKi9cXG4gICAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxufVxcblxcbi5jdXJ0YWluIHtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICBoZWlnaHQ6IDUwMHB4O1xcbiAgICB3aWR0aDogNTAwcHg7XFxufVxcblxcbmZvb3RlcixcXG5oZWFkZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTIyLCAxNTEsIDI0OCk7XFxuICAgIGhlaWdodDogbWluKDE1dmgpO1xcbiAgICBmb250LXNpemU6IDd2aDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmZvb3RlcntcXG4gICAgZm9udC1zaXplOiBsYXJnZTtcXG59XFxuXFxuLmhpdCB7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCguLi9zcmMvaW1hZ2VzL2ljb25zOC1maXJlLTQ4LnBuZyk7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigyNDUsIDE2OSwgMTY5KTtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxMDAlO1xcbn1cXG5cXG4uc2hpcCwgLnNoaXBHcm91cD5kaXYge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xcbn1cXG5cXG4ubWlzcyB7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCguLi9zcmMvaW1hZ2VzL2Nsb3NlLnBuZyk7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogNzAlO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxufVxcblxcbi5zdXJ7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCguLi9zcmMvaW1hZ2VzL2Nsb3NlLnBuZyk7XFxuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogNzAlO1xcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxufVxcblxcbi5zY2FsZXtcXG4gICAgYmFja2dyb3VuZC1zaXplOiAxMDAlO1xcbn1cXG5cXG4uc3RhcnROZXd7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGhlaWdodDogMTUwcHg7XFxuICAgIHdpZHRoOiAyMDBweDtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDEyMiwgMTUxLCAyNDgpO1xcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgIHRvcDogMjUlO1xcbiAgICBsZWZ0OiA0NCU7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYigwLCAwLCAwKTtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5zdGFydE5ldyBwe1xcbiAgICBmb250LXNpemU6IDI0cHg7XFxuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuYnV0dG9uIHtcXG4gICAgaGVpZ2h0OiA1MHB4O1xcbiAgICB3aWR0aDogMTAwcHg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYigwLCAwLCAwKTtcXG4gICAgZm9udC1zaXplOiAxNXB4O1xcbn1cXG5cXG4ucGxhY2VTaGlwc3tcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgaGVpZ2h0OiA2MDBweDtcXG4gICAgd2lkdGg6IDkwMHB4O1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTIyLCAxNTEsIDI0OCk7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgYm9yZGVyOiAycHggc29saWQgcmdiKDAsIDAsIDApO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuLnBsYWNlU2hpcHMgI2JvYXJkPmRpdntcXG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiKDAsIDAsIDApO1xcbn1cXG5cXG4uYm9hcmR3cmFwe1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICB3aWR0aDogODAwcHg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG59XFxuXFxuLnNoaXBze1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBoZWlnaHQ6IDUwMHB4O1xcbiAgICB3aWR0aDogMzAwcHg7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgICBtYXJnaW4tbGVmdDogMzBweDtcXG4gICAgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMTIyLCAxNTEsIDI0OCk7XFxufVxcblxcbi5zaGlwcyBidXR0b257XFxuICAgIG1hcmdpbi10b3A6IDIwcHg7XFxufVxcblxcbi5zaGlwcyBwe1xcbiAgICBmb250LXNpemU6IDI1cHg7XFxufVxcblxcbmJ1dHRvbjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYigxNywgMCwgMjU1KTtcXG4gICAgY29sb3I6IHdoaXRlO1xcbn1cXG5cXG4uc2hpcEdyb3Vwe1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgd2lkdGg6IDk1JTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgbWFyZ2luLXRvcDogMjBweDtcXG59XFxuXFxuI2NhcnJpZXJ7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDQsIG1pbig1MHB4KSk7XFxufVxcblxcbiNiYXR0bGVjcnVpc2Vye1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgzLCBtaW4oNTBweCkpO1xcbn1cXG5cXG4jZGVzdHJveWVye1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgyLCBtaW4oNTBweCkpO1xcbn1cXG5cXG4jZ3Vuc2hpcHtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMSwgbWluKDUwcHgpKTtcXG59XFxuXFxuI2NhcnJpZXIsICNiYXR0bGVjcnVpc2VyLCAjZGVzdHJveWVyLCAjZ3Vuc2hpcCB7XFxuICAgIGRpc3BsYXk6IGdyaWQ7XFxuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlOyBcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiBtYXgoNDhweCk7XFxufVxcblxcbi5wYXJ0e1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE3LCAwLCAyNTUpO1xcbn1cXG5cXG4ubm9Cb3JkZXJ7XFxuICAgIGJvcmRlcjogbm9uZTtcXG59XFxuXFxuLnNoaXBzcG90e1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVldmlvbGV0O1xcbn1cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107IC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblxuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGNvbnRlbnQgKz0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtKTtcblxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9OyAvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxuXG5cbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cblxuICAgIHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9rID0gMDsgX2sgPCBtb2R1bGVzLmxlbmd0aDsgX2srKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfa10pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG5cbiAgaWYgKCF1cmwpIHtcbiAgICByZXR1cm4gdXJsO1xuICB9XG5cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpOyAvLyBJZiB1cmwgaXMgYWxyZWFkeSB3cmFwcGVkIGluIHF1b3RlcywgcmVtb3ZlIHRoZW1cblxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG5cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH0gLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuXG5cbiAgaWYgKC9bXCInKCkgXFx0XFxuXXwoJTIwKS8udGVzdCh1cmwpIHx8IG9wdGlvbnMubmVlZFF1b3Rlcykge1xuICAgIHJldHVybiBcIlxcXCJcIi5jb25jYXQodXJsLnJlcGxhY2UoL1wiL2csICdcXFxcXCInKS5yZXBsYWNlKC9cXG4vZywgXCJcXFxcblwiKSwgXCJcXFwiXCIpO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG5cbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cblxuICBpZiAodHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIHZhciBiYXNlNjQgPSBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShjc3NNYXBwaW5nKSkpKTtcbiAgICB2YXIgZGF0YSA9IFwic291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsXCIuY29uY2F0KGJhc2U2NCk7XG4gICAgdmFyIHNvdXJjZU1hcHBpbmcgPSBcIi8qIyBcIi5jb25jYXQoZGF0YSwgXCIgKi9cIik7XG4gICAgdmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcbiAgICAgIHJldHVybiBcIi8qIyBzb3VyY2VVUkw9XCIuY29uY2F0KGNzc01hcHBpbmcuc291cmNlUm9vdCB8fCBcIlwiKS5jb25jYXQoc291cmNlLCBcIiAqL1wiKTtcbiAgICB9KTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChzb3VyY2VVUkxzKS5jb25jYXQoW3NvdXJjZU1hcHBpbmddKS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBzY3JpcHRVcmw7XG5pZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5nLmltcG9ydFNjcmlwdHMpIHNjcmlwdFVybCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5sb2NhdGlvbiArIFwiXCI7XG52YXIgZG9jdW1lbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcuZG9jdW1lbnQ7XG5pZiAoIXNjcmlwdFVybCAmJiBkb2N1bWVudCkge1xuXHRpZiAoZG9jdW1lbnQuY3VycmVudFNjcmlwdClcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyY1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHNjcmlwdFVybCA9IHNjcmlwdHNbc2NyaXB0cy5sZW5ndGggLSAxXS5zcmNcblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gZG9jdW1lbnQuYmFzZVVSSSB8fCBzZWxmLmxvY2F0aW9uLmhyZWY7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgYW5kIGxvYWRpbmcgY2h1bmtzXG4vLyB1bmRlZmluZWQgPSBjaHVuayBub3QgbG9hZGVkLCBudWxsID0gY2h1bmsgcHJlbG9hZGVkL3ByZWZldGNoZWRcbi8vIFtyZXNvbHZlLCByZWplY3QsIFByb21pc2VdID0gY2h1bmsgbG9hZGluZywgMCA9IGNodW5rIGxvYWRlZFxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJtYWluXCI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0XG5cbi8vIG5vIG9uIGNodW5rcyBsb2FkZWRcblxuLy8gbm8ganNvbnAgZnVuY3Rpb24iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9pbmRleC5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6WyJ2aWV3IiwiaW5pdFBvcHVwIiwibW9kZWwiLCJjb250cm9sbGVyIiwibW92ZUNvdW50ZXIiLCJfcmFuZG9tTW92ZUdlbiIsInBsYXllciIsInJhbmRvbU1vdmUiLCJNYXRoIiwiY2VpbCIsInJhbmRvbSIsImJvYXJkIiwiaWxsZWdhbE1vdmVzIiwiaW5kZXhPZiIsIm1ha2VNb3ZlIiwiY2VsbCIsInBsYXllcnMiLCJyZWNlaXZlQXR0YWNrIiwiY2hlY2tXaW5uZXIiLCJzaGlwc1N1bmsiLCJsZW5ndGgiLCJpc1dpbm5lciIsImRpc3BsYXlTdGFydE5ldyIsInN0YXJ0TmV3Iiwic3RhcnRSYW5kb20iLCJpbml0UGxheWVycyIsInJhbmRvbUxvY2F0aW9ucyIsInJlbW92ZVBsYWNlU2hpcFBvcHVwIiwiZGlzcGxheUJvYXJkcyIsImRpc3BsYXlTaGlwcyIsImdldEZsZWV0IiwicGxhY2VTaGlwc1BvcHVwIiwic2hpcEZhY3RvcnkiLCJzaGlwTGVuZ3RoIiwiZGlyZWN0aW9uIiwic3RhcnRMb2NhdGlvbiIsImxvY2F0aW9ucyIsInN1ckxvY2F0aW9ucyIsImZvcmJMb2NhdGlvbnMiLCJoaXRzIiwiaXNTdW5rIiwic2V0Q29vcmQiLCJjZWxscyIsImkiLCJwdXNoIiwiZ2V0dGluZ0hpdCIsImxvY2F0aW9uIiwiZ2V0dGluZ1N1bmsiLCJzaGlwIiwiZGlzcGxheVN1ckxvY2F0aW9ucyIsImJvYXJkRmFjdG9yeSIsImlkIiwiYm9hcmRJZCIsImJvYXJkU2l6ZSIsInNoaXBzIiwic2hpcExvY2F0aW9ucyIsInVuZGVmaW5lZCIsInNoaXBTcG90IiwiZ2VuZXJhdGVMb2NhdGlvbnMiLCJjb25jYXQiLCJjaGVja0NvbGxpc2lvbiIsImN1c3RvbUxvY2F0aW9ucyIsImoiLCJjb2wiLCJyb3ciLCJuZXdMb2NhdGlvbnMiLCJjb25zb2xlIiwibG9nIiwiZGlzcGxheUhpdCIsImRpc3BsYXlNaXNzIiwicGxheWVySWQiLCJmbGVldENvb3JkcyIsInBsYXllcjEiLCJwbGF5ZXIyIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImZpcnN0Q2hpbGQiLCJyZW1vdmUiLCJrIiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJhcHBlbmRDaGlsZCIsImNlbGxJRCIsImNsYXNzTGlzdCIsImFkZCIsInNldFRpbWVvdXQiLCJwaHJhemUiLCJzdGFydE5ld1BvcHVwIiwiaW5uZXJIVE1MIiwiY3V0cmFpbiIsIm1haW4iLCJwMmIiLCJwbGF5QWdhaW4iLCJyZW1vdmVDaGlsZCIsInN0eWxlIiwiZGlzcGxheSIsIl9yZW5kZXJCb2FyZCIsIm9rIiwicm90YXRlIiwiaW5pdEJvYXJkIiwiX3BsYWNlU2hpcHMiLCJmb3JiaWRIb3IiLCJmb3JiaWRWZXJ0IiwiX3BsYWNlQ2FycmllciIsInBsYWNlZCIsInBhcnQxIiwicGFydDIiLCJwYXJ0MyIsInBhcnQ0IiwiY2FycmllciIsImZvckVhY2giLCJwYXJ0Il0sInNvdXJjZVJvb3QiOiIifQ==