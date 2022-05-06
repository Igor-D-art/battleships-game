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
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./model */ "./src/model.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view */ "./src/view.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "./src/index.js");



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
    console.table(players[1].board.illegalMoves);

    if (players[1].board.illegalMoves.indexOf(cell) === -1) {
      players[1].board.receiveAttack(cell);
      players[0].board.receiveAttack(_randomMoveGen(players[0]));
      moveCounter += 1;
      checkWinner(players);
    }

    ;
  };

  var checkWinner = function checkWinner(players) {
    if (players[0].board.shipsSunk().length === 10) {
      players[1].isWinner = true;
      alert("Player ".concat(players[1].playerId, " is the winner!"));
    } else if (players[1].board.shipsSunk().length === 10) {
      players[0].isWinner = true;
      alert("Player ".concat(players[0].playerId, " is the winner!"));
      startNew();
    }

    ;
  };

  var startNew = function startNew() {
    (0,_index__WEBPACK_IMPORTED_MODULE_2__.init)();
  };

  return {
    moveCounter: moveCounter,
    makeMove: makeMove,
    checkWinner: checkWinner
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
/* harmony export */   "init": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _src_style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/style.css */ "./src/style.css");
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ "./src/model.js");
/* harmony import */ var _view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view */ "./src/view.js");



function init() {
  var player1 = _model__WEBPACK_IMPORTED_MODULE_1__.model.player(1);
  var player2 = _model__WEBPACK_IMPORTED_MODULE_1__.model.player(2);
  var players = [player1, player2];
  player1.board.randomLocations();
  player2.board.randomLocations();
  _view__WEBPACK_IMPORTED_MODULE_2__.view.displayBoards(players);
  _view__WEBPACK_IMPORTED_MODULE_2__.view.displayShips(player1.getFleet());
}
;
init();

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
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controller */ "./src/controller.js");
function _readOnlyError(name) { throw new TypeError("\"" + name + "\" is read-only"); }



var model = function () {
  var shipFactory = function shipFactory(length) {
    var shipLength = length;
    var direction = Math.ceil(Math.random() * 2);
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
      forbLocations: forbLocations
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
        do {
          var shipSpot = generateLocations(ships[i]);
          shipLocations = shipSpot[0];
          surLocations = shipSpot[1];
          forbLocations = shipLocations.concat(surLocations);
        } while (checkCollision(shipLocations));

        ships[i].locations = shipLocations;
        ships[i].surLocations = surLocations;
        ships[i].forbLocations = forbLocations;

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

    var receiveAttack = function receiveAttack(cell) {
      illegalMoves.push(cell);
      console.log(illegalMoves);

      for (var i = 0; i < ships.length; i++) {
        if (ships[i].locations.indexOf(cell) >= 0) {
          _view__WEBPACK_IMPORTED_MODULE_0__.view.displayHit(cell);
          ships[i].gettingHit(ships[i].locations.indexOf(cell));
          ships[i].gettingSunk(ships[i]); // if (ships[i].gettingSunk(ships[i])) {
          //     console.log(illegalMoves);
          //     illegalMoves = illegalMoves.concat(ships[i].surLocations)
          //     console.log(illegalMoves);
          //     console.log(ships[i].surLocations);
          //     console.log(illegalMoves);
          // };

          break;
        } else if (ships[i].locations.indexOf(cell) === -1) {
          // console.log('Im in receiveAttack MISS block. Giving to view cell = ' + cell)
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

  return {
    player: player
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
/* harmony import */ var _model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./model */ "./src/model.js");
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ "./src/index.js");



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

          if (i === 2) {
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
    for (var i = 0; i < cells.length; i++) {
      var cell = document.getElementById(cells[i]);

      if (cell !== undefined && cell !== null) {
        cell.classList.add('sur');
      }

      ;
    }

    ;
  };

  return {
    displayBoards: displayBoards,
    displayHit: displayHit,
    displayShips: displayShips,
    displayMiss: displayMiss,
    displaySurLocations: displaySurLocations
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n    margin: 0;\n    border: none;\n    padding: 0;\n}\n\nbody {\n    height: 100vh;\n    width: 100vw;\n}\n\n.message {\n    height: 10vh;\n}\n\n.main {\n    display: flex;\n    justify-content: space-around;\n    position: relative;\n    height: 70vh;\n}\n\n.p1b,\n.p2b {\n    height: 500px;\n    width: 500px;\n    border: 1px solid black;\n    display: grid;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(10, 1fr);\n}\n\n.p1b div,\n.p2b div {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border: 1px solid blue;\n}\n\nfooter,\nheader {\n    background-color: aqua;\n    height: 10vh;\n}\n\n.hit {\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n    background-color: rgb(245, 169, 169);\n    background-size: 100%;\n}\n\n.ship {\n    background-color: blue;\n}\n\n.miss {\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n    background-size: 100%;\n}\n\n.sur{\n    /* background-color: green; */\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n    background-size: 100%;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,SAAS;IACT,YAAY;IACZ,UAAU;AACd;;AAEA;IACI,aAAa;IACb,YAAY;AAChB;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,6BAA6B;IAC7B,kBAAkB;IAClB,YAAY;AAChB;;AAEA;;IAEI,aAAa;IACb,YAAY;IACZ,uBAAuB;IACvB,aAAa;IACb,sCAAsC;IACtC,mCAAmC;AACvC;;AAEA;;IAEI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,sBAAsB;AAC1B;;AAEA;;IAEI,sBAAsB;IACtB,YAAY;AAChB;;AAEA;IACI,yDAAuD;IACvD,oCAAoC;IACpC,qBAAqB;AACzB;;AAEA;IACI,sBAAsB;AAC1B;;AAEA;IACI,yDAA8C;IAC9C,qBAAqB;AACzB;;AAEA;IACI,6BAA6B;IAC7B,yDAA8C;IAC9C,qBAAqB;AACzB","sourcesContent":["* {\n    margin: 0;\n    border: none;\n    padding: 0;\n}\n\nbody {\n    height: 100vh;\n    width: 100vw;\n}\n\n.message {\n    height: 10vh;\n}\n\n.main {\n    display: flex;\n    justify-content: space-around;\n    position: relative;\n    height: 70vh;\n}\n\n.p1b,\n.p2b {\n    height: 500px;\n    width: 500px;\n    border: 1px solid black;\n    display: grid;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(10, 1fr);\n}\n\n.p1b div,\n.p2b div {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border: 1px solid blue;\n}\n\nfooter,\nheader {\n    background-color: aqua;\n    height: 10vh;\n}\n\n.hit {\n    background-image: url(../src/images/icons8-fire-48.png);\n    background-color: rgb(245, 169, 169);\n    background-size: 100%;\n}\n\n.ship {\n    background-color: blue;\n}\n\n.miss {\n    background-image: url(../src/images/close.png);\n    background-size: 100%;\n}\n\n.sur{\n    /* background-color: green; */\n    background-image: url(../src/images/close.png);\n    background-size: 100%;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOzs7OztXQ2ZBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7V0FFQTs7Ozs7VUVyQkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vc3JjL2NvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vc3JjL21vZGVsLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9zcmMvdmlldy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vc3JjL3N0eWxlLmNzcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL3NyYy9zdHlsZS5jc3M/NzE2MyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9hZnRlci1zdGFydHVwIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG1vZGVsIH0gZnJvbSBcIi4vbW9kZWxcIjtcbmltcG9ydCB7IHZpZXcgfSBmcm9tIFwiLi92aWV3XCI7XG5pbXBvcnQgeyBpbml0IH0gZnJvbSBcIi4vaW5kZXhcIjtcblxuZXhwb3J0IGNvbnN0IGNvbnRyb2xsZXIgPSAoKCkgPT4ge1xuXG4gICAgbGV0IG1vdmVDb3VudGVyID0gMDtcbiAgICBcbiAgICBjb25zdCBfcmFuZG9tTW92ZUdlbiA9IChwbGF5ZXIpID0+IHtcbiAgICAgICAgY29uc3QgcmFuZG9tTW92ZSA9IDEgKyBgJHtNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqICgxMCkpfWAgKyBgJHtNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqICgxMCkpfWA7XG4gICAgICAgIGlmIChwbGF5ZXIuYm9hcmQuaWxsZWdhbE1vdmVzLmluZGV4T2YocmFuZG9tTW92ZSkgPT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gcmFuZG9tTW92ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gX3JhbmRvbU1vdmVHZW4ocGxheWVyKTtcbiAgICAgICAgfTsgIFxuICAgIH07XG5cbiAgICBjb25zdCBtYWtlTW92ZSA9IChjZWxsLCBwbGF5ZXJzKSA9PiB7XG4gICAgICAgIGNvbnNvbGUudGFibGUocGxheWVyc1sxXS5ib2FyZC5pbGxlZ2FsTW92ZXMpXG4gICAgICAgIGlmIChwbGF5ZXJzWzFdLmJvYXJkLmlsbGVnYWxNb3Zlcy5pbmRleE9mKGNlbGwpID09PSAtMSkge1xuICAgICAgICAgICAgcGxheWVyc1sxXS5ib2FyZC5yZWNlaXZlQXR0YWNrKGNlbGwpO1xuICAgICAgICAgICAgcGxheWVyc1swXS5ib2FyZC5yZWNlaXZlQXR0YWNrKF9yYW5kb21Nb3ZlR2VuKHBsYXllcnNbMF0pKTtcbiAgICAgICAgICAgIG1vdmVDb3VudGVyICs9IDE7XG4gICAgICAgICAgICBjaGVja1dpbm5lcihwbGF5ZXJzKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29uc3QgY2hlY2tXaW5uZXIgPSAocGxheWVycykgPT4ge1xuICAgICAgICBcbiAgICAgICAgaWYgKHBsYXllcnNbMF0uYm9hcmQuc2hpcHNTdW5rKCkubGVuZ3RoID09PSAxMCkge1xuICAgICAgICAgICAgcGxheWVyc1sxXS5pc1dpbm5lciA9IHRydWU7IFxuICAgICAgICAgICAgYWxlcnQoYFBsYXllciAke3BsYXllcnNbMV0ucGxheWVySWR9IGlzIHRoZSB3aW5uZXIhYCk7XG4gICAgICAgIH0gZWxzZSBpZiAocGxheWVyc1sxXS5ib2FyZC5zaGlwc1N1bmsoKS5sZW5ndGggPT09IDEwKSB7XG4gICAgICAgICAgICBwbGF5ZXJzWzBdLmlzV2lubmVyID0gdHJ1ZTsgXG4gICAgICAgICAgICBhbGVydChgUGxheWVyICR7cGxheWVyc1swXS5wbGF5ZXJJZH0gaXMgdGhlIHdpbm5lciFgKTtcbiAgICAgICAgICAgIHN0YXJ0TmV3KCk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIGNvbnN0IHN0YXJ0TmV3ID0gKCkgPT4ge1xuICAgICAgICBpbml0KCk7XG4gICAgfTtcblxuICAgIHJldHVybiB7IG1vdmVDb3VudGVyLCBtYWtlTW92ZSwgY2hlY2tXaW5uZXJ9O1xuXG59KSgpO1xuIiwiaW1wb3J0ICcuLi9zcmMvc3R5bGUuY3NzJztcblxuaW1wb3J0IHsgbW9kZWwgfSBmcm9tIFwiLi9tb2RlbFwiO1xuaW1wb3J0IHsgdmlldyB9IGZyb20gXCIuL3ZpZXdcIjtcbiAgICBcbmV4cG9ydCBmdW5jdGlvbiBpbml0KCkge1xuXG4gICAgbGV0IHBsYXllcjEgPSBtb2RlbC5wbGF5ZXIoMSk7XG4gICAgbGV0IHBsYXllcjIgPSBtb2RlbC5wbGF5ZXIoMik7XG5cbiAgICBjb25zdCBwbGF5ZXJzID0gW3BsYXllcjEsIHBsYXllcjJdO1xuXG4gICAgcGxheWVyMS5ib2FyZC5yYW5kb21Mb2NhdGlvbnMoKTtcbiAgICBwbGF5ZXIyLmJvYXJkLnJhbmRvbUxvY2F0aW9ucygpO1xuXG4gICAgdmlldy5kaXNwbGF5Qm9hcmRzKHBsYXllcnMpO1xuICAgIHZpZXcuZGlzcGxheVNoaXBzKHBsYXllcjEuZ2V0RmxlZXQoKSk7XG4gICAgXG59O1xuXG5pbml0KCk7XG5cblxuXG5cblxuXG5cbiIsImltcG9ydCB7IHZpZXcgfSBmcm9tIFwiLi92aWV3XCI7XG5pbXBvcnQgeyBjb250cm9sbGVyIH0gZnJvbSBcIi4vY29udHJvbGxlclwiO1xuXG5leHBvcnQgY29uc3QgbW9kZWwgPSAoKCkgPT4ge1xuXG4gICAgY29uc3Qgc2hpcEZhY3RvcnkgPSAobGVuZ3RoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNoaXBMZW5ndGggPSBsZW5ndGg7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogMik7XG4gICAgICAgIGNvbnN0IGxvY2F0aW9ucyA9IFtdO1xuICAgICAgICBjb25zdCBzdXJMb2NhdGlvbnMgPSBbXTtcbiAgICAgICAgY29uc3QgZm9yYkxvY2F0aW9ucyA9IFtdO1xuICAgICAgICBjb25zdCBoaXRzID0gW107XG4gICAgICAgIGxldCBpc1N1bmsgPSBmYWxzZTtcblxuICAgICAgICBjb25zdCBzZXRDb29yZCA9IChjZWxscykgPT4ge1xuICAgICAgICAgICAgaWYgKGNlbGxzKSB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb25zID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb25zLnB1c2goYCR7Y2VsbHNbaV19YCk7XG4gICAgICAgICAgICAgICAgfTsgXG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGdldHRpbmdIaXQgPSAobG9jYXRpb24pID0+IHtcbiAgICAgICAgICAgIGhpdHNbbG9jYXRpb25dID0gJ2hpdCc7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBnZXR0aW5nU3VuayA9IChzaGlwKSA9PiB7XG4gICAgICAgICAgICBpZiAoc2hpcC5oaXRzLmluZGV4T2YoJycpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHNoaXAuaXNTdW5rID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2aWV3LmRpc3BsYXlTdXJMb2NhdGlvbnMoc2hpcC5zdXJMb2NhdGlvbnMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBzaGlwLmlzU3VuaztcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4geyBzZXRDb29yZCAsbG9jYXRpb25zLCBoaXRzLCBpc1N1bmssIGdldHRpbmdTdW5rLCBkaXJlY3Rpb24sIGdldHRpbmdIaXQsIHNoaXBMZW5ndGgsIHN1ckxvY2F0aW9ucywgZm9yYkxvY2F0aW9uc307XG4gICAgfTtcblxuICAgIGNvbnN0IGJvYXJkRmFjdG9yeSA9IChpZCkgPT4ge1xuXG4gICAgICAgIGNvbnN0IGJvYXJkSWQgPSBpZDtcblxuICAgICAgICBjb25zdCBib2FyZFNpemUgPSAxMDtcblxuICAgICAgICBjb25zdCBzaGlwcyA9IFtzaGlwRmFjdG9yeSg0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBGYWN0b3J5KDMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcEZhY3RvcnkoMyksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwRmFjdG9yeSgyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBGYWN0b3J5KDIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcEZhY3RvcnkoMiksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwRmFjdG9yeSgxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBGYWN0b3J5KDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcEZhY3RvcnkoMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwRmFjdG9yeSgxKV07XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzaGlwc1N1bmsgPSAoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzaGlwc1N1bmsgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgIGlmIChzaGlwc1tpXS5pc1N1bmsgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hpcHNTdW5rLnB1c2goc2hpcHNbaV0pO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIHNoaXBzU3VuaztcbiAgICAgICAgfTtcblxuICAgICAgICBsZXQgaWxsZWdhbE1vdmVzID0gW107XG5cbiAgICAgICAgY29uc3QgcmFuZG9tTG9jYXRpb25zID0gKCkgPT4ge1xuICAgICAgICAgICAgbGV0IHNoaXBMb2NhdGlvbnM7XG4gICAgICAgICAgICBsZXQgc3VyTG9jYXRpb25zO1xuICAgICAgICAgICAgbGV0IGZvcmJMb2NhdGlvbnM7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNoaXBTcG90ID0gZ2VuZXJhdGVMb2NhdGlvbnMoc2hpcHNbaV0pO1xuICAgICAgICAgICAgICAgICAgICBzaGlwTG9jYXRpb25zID0gc2hpcFNwb3RbMF07XG4gICAgICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucyA9IHNoaXBTcG90WzFdO1xuICAgICAgICAgICAgICAgICAgICBmb3JiTG9jYXRpb25zID0gc2hpcExvY2F0aW9ucy5jb25jYXQoc3VyTG9jYXRpb25zKTtcbiAgICAgICAgICAgICAgICB9IHdoaWxlIChjaGVja0NvbGxpc2lvbihzaGlwTG9jYXRpb25zKSk7XG4gICAgICAgICAgICAgICAgc2hpcHNbaV0ubG9jYXRpb25zID0gc2hpcExvY2F0aW9ucztcbiAgICAgICAgICAgICAgICBzaGlwc1tpXS5zdXJMb2NhdGlvbnMgPSBzdXJMb2NhdGlvbnM7XG4gICAgICAgICAgICAgICAgc2hpcHNbaV0uZm9yYkxvY2F0aW9ucyA9IGZvcmJMb2NhdGlvbnM7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNoaXBzW2ldLnNoaXBMZW5ndGg7IGorKyl7XG4gICAgICAgICAgICAgICAgICBzaGlwc1tpXS5oaXRzLnB1c2goJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgZ2VuZXJhdGVMb2NhdGlvbnMgPSAoc2hpcCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbDtcbiAgICAgICAgICAgIGxldCByb3c7XG5cbiAgICAgICAgICAgIGNvbnN0IG5ld0xvY2F0aW9ucyA9IFtdO1xuICAgICAgICAgICAgY29uc3Qgc3VyTG9jYXRpb25zID0gW107XG4gICAgICAgICAgICBpZiAoc2hpcC5kaXJlY3Rpb24gPT09IDEpIHtcbiAgICAgICAgICAgICAgICByb3cgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIGJvYXJkU2l6ZSk7XG4gICAgICAgICAgICAgICAgY29sID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAoYm9hcmRTaXplIC0gKHNoaXAuc2hpcExlbmd0aCArIDEpKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJvdyA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogKGJvYXJkU2l6ZSAtIChzaGlwLnNoaXBMZW5ndGggKyAxKSkpO1xuICAgICAgICAgICAgICAgIGNvbCA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogYm9hcmRTaXplKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5zaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc2hpcC5kaXJlY3Rpb24gPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3TG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3Jvd31gICsgKGNvbCArIGkpKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0xvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHsocm93ICsgaSl9YCArIGAke2NvbH1gKVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoc2hpcC5kaXJlY3Rpb24gPT09IDEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAuc2hpcExlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyArIDF9YCArIChjb2wgKyBpKSk7XG4gICAgICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3cgLSAxfWAgKyAoY29sICsgaSkpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyAtIDF9YCArIChjb2wgLSAxKSk7XG4gICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3Jvd31gICsgKGNvbCAtIDEpKTtcbiAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93ICsgMX1gICsgKGNvbCAtIDEpKTtcblxuICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3cgLSAxfWAgKyAoY29sICsgc2hpcC5zaGlwTGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3Jvd31gICsgKGNvbCArIHNoaXAuc2hpcExlbmd0aCkpO1xuICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3cgKyAxfWAgKyAoY29sICsgc2hpcC5zaGlwTGVuZ3RoKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5zaGlwTGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93ICsgaX1gICsgKGNvbCArIDEpKTtcbiAgICAgICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyArIGl9YCArIChjb2wgLSAxKSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93IC0gMX1gICsgKGNvbCAtIDEpKTtcbiAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93IC0gMX1gICsgKGNvbCkpO1xuICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3cgLSAxfWAgKyAoY29sICsgMSkpO1xuXG4gICAgICAgICAgICAgICAgc3VyTG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAke3JvdyArIHNoaXAuc2hpcExlbmd0aH1gICsgKGNvbCAtMSkpO1xuICAgICAgICAgICAgICAgIHN1ckxvY2F0aW9ucy5wdXNoKGJvYXJkSWQgKyBgJHtyb3cgKyBzaGlwLnNoaXBMZW5ndGh9YCArIChjb2wpKTtcbiAgICAgICAgICAgICAgICBzdXJMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93ICsgc2hpcC5zaGlwTGVuZ3RofWAgKyAoY29sICsgMSkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBbbmV3TG9jYXRpb25zLCBzdXJMb2NhdGlvbnNdO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGNoZWNrQ29sbGlzaW9uID0gKGxvY2F0aW9ucykgPT4ge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBsb2NhdGlvbnMubGVuZ3RoOyBqKyspe1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2hpcHNbaV0uZm9yYkxvY2F0aW9ucy5pbmRleE9mKGxvY2F0aW9uc1tqXSkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhgbm8gY29sbGlzaW9ucyBvbiBzaGlwICR7c2hpcHNbaV19YClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChjZWxsKSA9PiB7XG4gICAgICAgICAgICBpbGxlZ2FsTW92ZXMucHVzaChjZWxsKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGlsbGVnYWxNb3ZlcylcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc2hpcHNbaV0ubG9jYXRpb25zLmluZGV4T2YoY2VsbCkgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICB2aWV3LmRpc3BsYXlIaXQoY2VsbCk7XG4gICAgICAgICAgICAgICAgICAgIHNoaXBzW2ldLmdldHRpbmdIaXQoc2hpcHNbaV0ubG9jYXRpb25zLmluZGV4T2YoY2VsbCkpO1xuICAgICAgICAgICAgICAgICAgICBzaGlwc1tpXS5nZXR0aW5nU3VuayhzaGlwc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIChzaGlwc1tpXS5nZXR0aW5nU3VuayhzaGlwc1tpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGlsbGVnYWxNb3Zlcyk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpbGxlZ2FsTW92ZXMgPSBpbGxlZ2FsTW92ZXMuY29uY2F0KHNoaXBzW2ldLnN1ckxvY2F0aW9ucylcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUubG9nKGlsbGVnYWxNb3Zlcyk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmxvZyhzaGlwc1tpXS5zdXJMb2NhdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgY29uc29sZS5sb2coaWxsZWdhbE1vdmVzKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gfTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzaGlwc1tpXS5sb2NhdGlvbnMuaW5kZXhPZihjZWxsKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ0ltIGluIHJlY2VpdmVBdHRhY2sgTUlTUyBibG9jay4gR2l2aW5nIHRvIHZpZXcgY2VsbCA9ICcgKyBjZWxsKVxuICAgICAgICAgICAgICAgICAgICB2aWV3LmRpc3BsYXlNaXNzKGNlbGwpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9OyBcbiAgICAgICAgICAgIFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm57c2hpcHMsIGlsbGVnYWxNb3ZlcywgcmVjZWl2ZUF0dGFjaywgc2hpcHNTdW5rLCByYW5kb21Mb2NhdGlvbnN9XG4gICAgfTtcblxuICAgIGNvbnN0IHBsYXllciA9IChpZCkgPT4ge1xuICAgICAgICBjb25zdCBwbGF5ZXJJZCA9IGlkO1xuICAgICAgICBjb25zdCBib2FyZCA9IGJvYXJkRmFjdG9yeShwbGF5ZXJJZCk7XG4gICAgICAgIGNvbnN0IGdldEZsZWV0ID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxlZXRDb29yZHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQuc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGJvYXJkLnNoaXBzW2ldLmxvY2F0aW9ucy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBmbGVldENvb3Jkcy5wdXNoKGJvYXJkLnNoaXBzW2ldLmxvY2F0aW9uc1tqXSlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBmbGVldENvb3JkcztcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgaXNXaW5uZXIgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJue3BsYXllcklkLCBib2FyZCwgZ2V0RmxlZXQsIGlzV2lubmVyfVxuICAgIH07XG4gICAgXG4gICAgcmV0dXJuIHsgcGxheWVyIH07XG5cbn0pKCkiLCJpbXBvcnQgeyBjb250cm9sbGVyIH0gZnJvbSBcIi4vY29udHJvbGxlclwiO1xuaW1wb3J0IHsgbW9kZWwgfSBmcm9tIFwiLi9tb2RlbFwiO1xuaW1wb3J0IHsgaW5kZXggfSBmcm9tIFwiLi9pbmRleFwiO1xuXG5leHBvcnQgY29uc3QgdmlldyA9ICgoKSA9PiB7XG5cbiAgICBjb25zdCBkaXNwbGF5Qm9hcmRzID0gKHBsYXllcnMpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCAzOyBpKyspe1xuICAgICAgICAgICAgY29uc3QgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncCcgKyBpICsgJ2InKTtcbiAgICAgICAgICAgIHdoaWxlIChib2FyZC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgYm9hcmQuZmlyc3RDaGlsZC5yZW1vdmUoKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAxOyBqIDwgMTE7IGorKykge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGsgPSAxOyBrIDwgMTE7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdpZCcsIGkgKyBgJHtqfWAgKyBrKTtcbiAgICAgICAgICAgICAgICAgICAgY2VsbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2NlbGwnKTtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZXIubWFrZU1vdmUoY2VsbC5pZCwgcGxheWVycyk7XG4gICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIGJvYXJkLmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH07XG4gICAgXG4gICAgY29uc3QgZGlzcGxheUhpdCA9IChjZWxsSUQpID0+IHtcbiAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNlbGxJRCk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LnJlbW92ZSgnc2hpcCcpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ21pc3MnKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICB9O1xuXG4gICAgY29uc3QgZGlzcGxheU1pc3MgPSAoY2VsbElEKSA9PiB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjZWxsSUQpO1xuICAgICAgICBjZWxsLmNsYXNzTGlzdC5yZW1vdmUoJ3NoaXAnKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdtaXNzJyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGRpc3BsYXlTaGlwcyA9IChzaGlwcykgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNoaXBzW2ldICE9PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGAke3NoaXBzW2ldfWApO1xuICAgICAgICAgICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnc2hpcCcpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29uc3QgZGlzcGxheVN1ckxvY2F0aW9ucyA9IChjZWxscykgPT4ge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNlbGxzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjZWxsc1tpXSk7XG4gICAgICAgICAgICBpZiAoY2VsbCAhPT0gdW5kZWZpbmVkICYmIGNlbGwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3N1cicpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtkaXNwbGF5Qm9hcmRzLCBkaXNwbGF5SGl0LCBkaXNwbGF5U2hpcHMsIGRpc3BsYXlNaXNzLCBkaXNwbGF5U3VyTG9jYXRpb25zfVxufSkoKSIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9nZXRVcmwuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyA9IG5ldyBVUkwoXCIuLi9zcmMvaW1hZ2VzL2ljb25zOC1maXJlLTQ4LnBuZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4uL3NyYy9pbWFnZXMvY2xvc2UucG5nXCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgcGFkZGluZzogMDtcXG59XFxuXFxuYm9keSB7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHdpZHRoOiAxMDB2dztcXG59XFxuXFxuLm1lc3NhZ2Uge1xcbiAgICBoZWlnaHQ6IDEwdmg7XFxufVxcblxcbi5tYWluIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgaGVpZ2h0OiA3MHZoO1xcbn1cXG5cXG4ucDFiLFxcbi5wMmIge1xcbiAgICBoZWlnaHQ6IDUwMHB4O1xcbiAgICB3aWR0aDogNTAwcHg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxufVxcblxcbi5wMWIgZGl2LFxcbi5wMmIgZGl2IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsdWU7XFxufVxcblxcbmZvb3RlcixcXG5oZWFkZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhcXVhO1xcbiAgICBoZWlnaHQ6IDEwdmg7XFxufVxcblxcbi5oaXQge1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fICsgXCIpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ1LCAxNjksIDE2OSk7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJTtcXG59XFxuXFxuLnNoaXAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xcbn1cXG5cXG4ubWlzcyB7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gKyBcIik7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJTtcXG59XFxuXFxuLnN1cntcXG4gICAgLyogYmFja2dyb3VuZC1jb2xvcjogZ3JlZW47ICovXFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gKyBcIik7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJTtcXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtJQUNJLFNBQVM7SUFDVCxZQUFZO0lBQ1osVUFBVTtBQUNkOztBQUVBO0lBQ0ksYUFBYTtJQUNiLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSxZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksYUFBYTtJQUNiLDZCQUE2QjtJQUM3QixrQkFBa0I7SUFDbEIsWUFBWTtBQUNoQjs7QUFFQTs7SUFFSSxhQUFhO0lBQ2IsWUFBWTtJQUNaLHVCQUF1QjtJQUN2QixhQUFhO0lBQ2Isc0NBQXNDO0lBQ3RDLG1DQUFtQztBQUN2Qzs7QUFFQTs7SUFFSSxhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLG1CQUFtQjtJQUNuQixzQkFBc0I7QUFDMUI7O0FBRUE7O0lBRUksc0JBQXNCO0lBQ3RCLFlBQVk7QUFDaEI7O0FBRUE7SUFDSSx5REFBdUQ7SUFDdkQsb0NBQW9DO0lBQ3BDLHFCQUFxQjtBQUN6Qjs7QUFFQTtJQUNJLHNCQUFzQjtBQUMxQjs7QUFFQTtJQUNJLHlEQUE4QztJQUM5QyxxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSw2QkFBNkI7SUFDN0IseURBQThDO0lBQzlDLHFCQUFxQjtBQUN6QlwiLFwic291cmNlc0NvbnRlbnRcIjpbXCIqIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIHBhZGRpbmc6IDA7XFxufVxcblxcbmJvZHkge1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB3aWR0aDogMTAwdnc7XFxufVxcblxcbi5tZXNzYWdlIHtcXG4gICAgaGVpZ2h0OiAxMHZoO1xcbn1cXG5cXG4ubWFpbiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGhlaWdodDogNzB2aDtcXG59XFxuXFxuLnAxYixcXG4ucDJiIHtcXG4gICAgaGVpZ2h0OiA1MDBweDtcXG4gICAgd2lkdGg6IDUwMHB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4ucDFiIGRpdixcXG4ucDJiIGRpdiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibHVlO1xcbn1cXG5cXG5mb290ZXIsXFxuaGVhZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYXF1YTtcXG4gICAgaGVpZ2h0OiAxMHZoO1xcbn1cXG5cXG4uaGl0IHtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4uL3NyYy9pbWFnZXMvaWNvbnM4LWZpcmUtNDgucG5nKTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0NSwgMTY5LCAxNjkpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XFxufVxcblxcbi5zaGlwIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtcXG59XFxuXFxuLm1pc3Mge1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi4vc3JjL2ltYWdlcy9jbG9zZS5wbmcpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XFxufVxcblxcbi5zdXJ7XFxuICAgIC8qIGJhY2tncm91bmQtY29sb3I6IGdyZWVuOyAqL1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi4vc3JjL2ltYWdlcy9jbG9zZS5wbmcpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG5cbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBsYXllciAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBpZiAodHlwZW9mIGl0ZW1bNV0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzVdID0gbGF5ZXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGlzdC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHVybCwgb3B0aW9ucykge1xuICBpZiAoIW9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0ge307XG4gIH1cblxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cblxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7IC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cblxuICBpZiAob3B0aW9ucy5oYXNoKSB7XG4gICAgdXJsICs9IG9wdGlvbnMuaGFzaDtcbiAgfSAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG5cblxuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cblxuICByZXR1cm4gdXJsO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIm1haW5cIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vc3JjL2luZGV4LmpzXCIpO1xuIiwiIl0sIm5hbWVzIjpbIm1vZGVsIiwidmlldyIsImluaXQiLCJjb250cm9sbGVyIiwibW92ZUNvdW50ZXIiLCJfcmFuZG9tTW92ZUdlbiIsInBsYXllciIsInJhbmRvbU1vdmUiLCJNYXRoIiwiY2VpbCIsInJhbmRvbSIsImJvYXJkIiwiaWxsZWdhbE1vdmVzIiwiaW5kZXhPZiIsIm1ha2VNb3ZlIiwiY2VsbCIsInBsYXllcnMiLCJjb25zb2xlIiwidGFibGUiLCJyZWNlaXZlQXR0YWNrIiwiY2hlY2tXaW5uZXIiLCJzaGlwc1N1bmsiLCJsZW5ndGgiLCJpc1dpbm5lciIsImFsZXJ0IiwicGxheWVySWQiLCJzdGFydE5ldyIsInBsYXllcjEiLCJwbGF5ZXIyIiwicmFuZG9tTG9jYXRpb25zIiwiZGlzcGxheUJvYXJkcyIsImRpc3BsYXlTaGlwcyIsImdldEZsZWV0Iiwic2hpcEZhY3RvcnkiLCJzaGlwTGVuZ3RoIiwiZGlyZWN0aW9uIiwibG9jYXRpb25zIiwic3VyTG9jYXRpb25zIiwiZm9yYkxvY2F0aW9ucyIsImhpdHMiLCJpc1N1bmsiLCJzZXRDb29yZCIsImNlbGxzIiwiaSIsInB1c2giLCJnZXR0aW5nSGl0IiwibG9jYXRpb24iLCJnZXR0aW5nU3VuayIsInNoaXAiLCJkaXNwbGF5U3VyTG9jYXRpb25zIiwiYm9hcmRGYWN0b3J5IiwiaWQiLCJib2FyZElkIiwiYm9hcmRTaXplIiwic2hpcHMiLCJzaGlwTG9jYXRpb25zIiwic2hpcFNwb3QiLCJnZW5lcmF0ZUxvY2F0aW9ucyIsImNvbmNhdCIsImNoZWNrQ29sbGlzaW9uIiwiaiIsImNvbCIsInJvdyIsIm5ld0xvY2F0aW9ucyIsImxvZyIsImRpc3BsYXlIaXQiLCJkaXNwbGF5TWlzcyIsImZsZWV0Q29vcmRzIiwiaW5kZXgiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZmlyc3RDaGlsZCIsInJlbW92ZSIsImsiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFwcGVuZENoaWxkIiwiY2VsbElEIiwiY2xhc3NMaXN0IiwiYWRkIiwidW5kZWZpbmVkIl0sInNvdXJjZVJvb3QiOiIifQ==