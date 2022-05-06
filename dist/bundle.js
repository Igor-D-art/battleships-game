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
    console.log(randomMove);

    if (player.board.illegalMoves.indexOf(randomMove) === -1) {
      console.log(randomMove);
      return randomMove;
    } else {
      return _randomMoveGen(player);
    }

    ;
  };

  var makeMove = function makeMove(cell, players) {
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

  var startNew = function startNew(players) {
    _view__WEBPACK_IMPORTED_MODULE_1__.view.displayBoards(players);
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
  console.log(player1.board.ships);
  console.log(player2.board.ships);
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
    var hits = [];
    var isSunk = false; // (() => {
    //     for (let i = 0; i < shipLength; i++){
    //         hits.push('');
    //     }
    // })();

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
      }

      ;
    };

    return {
      setCoord: setCoord,
      locations: locations,
      hits: hits,
      isSunk: isSunk,
      gettingSunk: gettingSunk,
      direction: direction,
      gettingHit: gettingHit,
      shipLength: shipLength
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

      for (var i = 0; i < ships.length; i++) {
        do {
          shipLocations = generateLocations(ships[i]);
        } while (checkCollision(shipLocations));

        ships[i].locations = shipLocations;

        for (var j = 0; j < ships[i].shipLength; j++) {
          ships[i].hits.push('');
        }
      }

      ;
    };

    var generateLocations = function generateLocations(ship) {
      var col;
      var row;
      var startLocation;
      var newLocations = [];

      if (ship.direction === 1) {
        row = Math.ceil(Math.random() * boardSize);
        col = Math.ceil(Math.random() * (boardSize - (ship.shipLength + 1)));
      } else {
        row = Math.ceil(Math.random() * (boardSize - (ship.shipLength + 1)));
        col = Math.ceil(Math.random() * boardSize);
      }

      ;
      startLocation = boardId + "".concat(row) + col;
      newLocations.push(startLocation);

      for (var i = 1; i < ship.shipLength; i++) {
        if (ship.direction === 1) {
          newLocations.push(boardId + "".concat(row) + (col + i));
        } else {
          newLocations.push(boardId + "".concat(row + i) + "".concat(col));
        }

        ;
      }

      ;
      return newLocations;
    };

    var checkCollision = function checkCollision(locations) {
      for (var i = 0; i < ships.length; i++) {
        for (var j = 0; j < locations.length; j++) {
          if (ships[i].locations.indexOf(locations[j]) >= 0) {
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
      console.log('im in receive attack start. Cell = ' + cell);

      for (var i = 0; i < ships.length; i++) {
        console.log(ships[i].locations);

        if (ships[i].locations.indexOf(cell) > -1) {
          _view__WEBPACK_IMPORTED_MODULE_0__.view.displayHit(cell);
          ships[i].gettingHit(ships[i].locations.indexOf(cell));
          ships[i].gettingSunk(ships[i]);
          break;
        } else {
          console.log('Im in receiveAttack miss block. Giving to view cell = ' + cell);
          _view__WEBPACK_IMPORTED_MODULE_0__.view.displayMiss(cell);
          break;
        }

        ;
      }

      ;
      illegalMoves.push(cell);
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
    console.log(cell);
    cell.classList.remove('ship');
    cell.classList.add('hit');
  };

  var displayMiss = function displayMiss(cellID) {
    console.log('Im in view, cellID = ' + cellID);
    var cell = document.getElementById(cellID);
    console.log(cell);
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

  return {
    displayBoards: displayBoards,
    displayHit: displayHit,
    displayShips: displayShips,
    displayMiss: displayMiss
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
___CSS_LOADER_EXPORT___.push([module.id, "* {\n    margin: 0;\n    border: none;\n    padding: 0;\n}\n\nbody {\n    height: 100vh;\n    width: 100vw;\n}\n\n.message {\n    height: 10vh;\n}\n\n.main {\n    display: flex;\n    justify-content: space-around;\n    position: relative;\n    height: 70vh;\n}\n\n.p1b,\n.p2b {\n    height: 500px;\n    width: 500px;\n    border: 1px solid black;\n    display: grid;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(10, 1fr);\n}\n\n.p1b div,\n.p2b div {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border: 1px solid blue;\n}\n\nfooter,\nheader {\n    background-color: aqua;\n    height: 10vh;\n}\n\n.hit {\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");\n    background-color: rgb(245, 169, 169);\n    background-size: 100%;\n}\n\n.ship {\n    background-color: blue;\n}\n\n.miss {\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n    background-size: 100%;\n}\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;IACI,SAAS;IACT,YAAY;IACZ,UAAU;AACd;;AAEA;IACI,aAAa;IACb,YAAY;AAChB;;AAEA;IACI,YAAY;AAChB;;AAEA;IACI,aAAa;IACb,6BAA6B;IAC7B,kBAAkB;IAClB,YAAY;AAChB;;AAEA;;IAEI,aAAa;IACb,YAAY;IACZ,uBAAuB;IACvB,aAAa;IACb,sCAAsC;IACtC,mCAAmC;AACvC;;AAEA;;IAEI,aAAa;IACb,uBAAuB;IACvB,mBAAmB;IACnB,sBAAsB;AAC1B;;AAEA;;IAEI,sBAAsB;IACtB,YAAY;AAChB;;AAEA;IACI,yDAAuD;IACvD,oCAAoC;IACpC,qBAAqB;AACzB;;AAEA;IACI,sBAAsB;AAC1B;;AAEA;IACI,yDAA8C;IAC9C,qBAAqB;AACzB","sourcesContent":["* {\n    margin: 0;\n    border: none;\n    padding: 0;\n}\n\nbody {\n    height: 100vh;\n    width: 100vw;\n}\n\n.message {\n    height: 10vh;\n}\n\n.main {\n    display: flex;\n    justify-content: space-around;\n    position: relative;\n    height: 70vh;\n}\n\n.p1b,\n.p2b {\n    height: 500px;\n    width: 500px;\n    border: 1px solid black;\n    display: grid;\n    grid-template-columns: repeat(10, 1fr);\n    grid-template-rows: repeat(10, 1fr);\n}\n\n.p1b div,\n.p2b div {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    border: 1px solid blue;\n}\n\nfooter,\nheader {\n    background-color: aqua;\n    height: 10vh;\n}\n\n.hit {\n    background-image: url(../src/images/icons8-fire-48.png);\n    background-color: rgb(245, 169, 169);\n    background-size: 100%;\n}\n\n.ship {\n    background-color: blue;\n}\n\n.miss {\n    background-image: url(../src/images/close.png);\n    background-size: 100%;\n}\n"],"sourceRoot":""}]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztVQ2ZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlDQUFpQyxXQUFXO1dBQzVDO1dBQ0E7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEdBQUc7V0FDSDtXQUNBO1dBQ0EsQ0FBQzs7Ozs7V0NQRDs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDZkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOzs7OztVRXJCQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9zcmMvY29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9zcmMvbW9kZWwuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL3NyYy92aWV3LmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9zcmMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vc3JjL3N0eWxlLmNzcz83MTYzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXBzLWdhbWUvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcy1nYW1lL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHMtZ2FtZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbW9kZWwgfSBmcm9tIFwiLi9tb2RlbFwiO1xuaW1wb3J0IHsgdmlldyB9IGZyb20gXCIuL3ZpZXdcIjtcbmltcG9ydCB7IGluaXQgfSBmcm9tIFwiLi9pbmRleFwiO1xuXG5leHBvcnQgY29uc3QgY29udHJvbGxlciA9ICgoKSA9PiB7XG5cbiAgICBsZXQgbW92ZUNvdW50ZXIgPSAwO1xuICAgIFxuICAgIGNvbnN0IF9yYW5kb21Nb3ZlR2VuID0gKHBsYXllcikgPT4ge1xuICAgICAgICBjb25zdCByYW5kb21Nb3ZlID0gMSArIGAke01hdGguY2VpbChNYXRoLnJhbmRvbSgpICogKDEwKSl9YCArIGAke01hdGguY2VpbChNYXRoLnJhbmRvbSgpICogKDEwKSl9YDtcbiAgICAgICAgY29uc29sZS5sb2cocmFuZG9tTW92ZSk7XG4gICAgICAgIGlmIChwbGF5ZXIuYm9hcmQuaWxsZWdhbE1vdmVzLmluZGV4T2YocmFuZG9tTW92ZSkgPT09IC0xKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyYW5kb21Nb3ZlKTtcbiAgICAgICAgICAgIHJldHVybiByYW5kb21Nb3ZlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBfcmFuZG9tTW92ZUdlbihwbGF5ZXIpO1xuICAgICAgICB9OyAgXG4gICAgfTtcblxuICAgIGNvbnN0IG1ha2VNb3ZlID0gKGNlbGwsIHBsYXllcnMpID0+IHtcbiAgICAgICAgaWYgKHBsYXllcnNbMV0uYm9hcmQuaWxsZWdhbE1vdmVzLmluZGV4T2YoY2VsbCkgPT09IC0xKSB7XG4gICAgICAgICAgICBwbGF5ZXJzWzFdLmJvYXJkLnJlY2VpdmVBdHRhY2soY2VsbCk7XG4gICAgICAgICAgICBwbGF5ZXJzWzBdLmJvYXJkLnJlY2VpdmVBdHRhY2soX3JhbmRvbU1vdmVHZW4ocGxheWVyc1swXSkpO1xuICAgICAgICAgICAgbW92ZUNvdW50ZXIgKz0gMTtcbiAgICAgICAgICAgIGNoZWNrV2lubmVyKHBsYXllcnMpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBjb25zdCBjaGVja1dpbm5lciA9IChwbGF5ZXJzKSA9PiB7XG4gICAgICAgIFxuICAgICAgICBpZiAocGxheWVyc1swXS5ib2FyZC5zaGlwc1N1bmsoKS5sZW5ndGggPT09IDEwKSB7XG4gICAgICAgICAgICBwbGF5ZXJzWzFdLmlzV2lubmVyID0gdHJ1ZTsgXG4gICAgICAgICAgICBhbGVydChgUGxheWVyICR7cGxheWVyc1sxXS5wbGF5ZXJJZH0gaXMgdGhlIHdpbm5lciFgKTtcbiAgICAgICAgfSBlbHNlIGlmIChwbGF5ZXJzWzFdLmJvYXJkLnNoaXBzU3VuaygpLmxlbmd0aCA9PT0gMTApIHtcbiAgICAgICAgICAgIHBsYXllcnNbMF0uaXNXaW5uZXIgPSB0cnVlOyBcbiAgICAgICAgICAgIGFsZXJ0KGBQbGF5ZXIgJHtwbGF5ZXJzWzBdLnBsYXllcklkfSBpcyB0aGUgd2lubmVyIWApO1xuICAgICAgICAgICAgc3RhcnROZXcoKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc3RhcnROZXcgPSAocGxheWVycykgPT4ge1xuICAgICAgICB2aWV3LmRpc3BsYXlCb2FyZHMocGxheWVycyk7XG4gICAgICAgIGluaXQoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHsgbW92ZUNvdW50ZXIsIG1ha2VNb3ZlLCBjaGVja1dpbm5lcn07XG5cbn0pKCk7XG4iLCJpbXBvcnQgJy4uL3NyYy9zdHlsZS5jc3MnO1xuXG5pbXBvcnQgeyBtb2RlbCB9IGZyb20gXCIuL21vZGVsXCI7XG5pbXBvcnQgeyB2aWV3IH0gZnJvbSBcIi4vdmlld1wiO1xuICAgIFxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKSB7XG5cbiAgICBsZXQgcGxheWVyMSA9IG1vZGVsLnBsYXllcigxKTtcbiAgICBsZXQgcGxheWVyMiA9IG1vZGVsLnBsYXllcigyKTtcblxuICAgIGNvbnN0IHBsYXllcnMgPSBbcGxheWVyMSwgcGxheWVyMl07XG5cbiAgICBwbGF5ZXIxLmJvYXJkLnJhbmRvbUxvY2F0aW9ucygpO1xuICAgIHBsYXllcjIuYm9hcmQucmFuZG9tTG9jYXRpb25zKCk7XG5cbiAgICB2aWV3LmRpc3BsYXlCb2FyZHMocGxheWVycyk7XG4gICAgdmlldy5kaXNwbGF5U2hpcHMocGxheWVyMS5nZXRGbGVldCgpKTtcblxuICAgIGNvbnNvbGUubG9nKHBsYXllcjEuYm9hcmQuc2hpcHMpXG4gICAgY29uc29sZS5sb2cocGxheWVyMi5ib2FyZC5zaGlwcylcbiAgICBcbn07XG5cbmluaXQoKTtcblxuXG5cblxuXG5cblxuIiwiaW1wb3J0IHsgdmlldyB9IGZyb20gXCIuL3ZpZXdcIjtcbmltcG9ydCB7IGNvbnRyb2xsZXIgfSBmcm9tIFwiLi9jb250cm9sbGVyXCI7XG5cbmV4cG9ydCBjb25zdCBtb2RlbCA9ICgoKSA9PiB7XG5cbiAgICBjb25zdCBzaGlwRmFjdG9yeSA9IChsZW5ndGgpID0+IHtcbiAgICAgICAgY29uc3Qgc2hpcExlbmd0aCA9IGxlbmd0aDtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAyKTtcbiAgICAgICAgY29uc3QgbG9jYXRpb25zID0gW107XG4gICAgICAgIGNvbnN0IGhpdHMgPSBbXTtcbiAgICAgICAgbGV0IGlzU3VuayA9IGZhbHNlO1xuXG4gICAgICAgIC8vICgoKSA9PiB7XG4gICAgICAgIC8vICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBMZW5ndGg7IGkrKyl7XG4gICAgICAgIC8vICAgICAgICAgaGl0cy5wdXNoKCcnKTtcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSkoKTtcblxuICAgICAgICBjb25zdCBzZXRDb29yZCA9IChjZWxscykgPT4ge1xuICAgICAgICAgICAgaWYgKGNlbGxzKSB7XG4gICAgICAgICAgICAgICAgbG9jYXRpb25zID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb25zLnB1c2goYCR7Y2VsbHNbaV19YCk7XG4gICAgICAgICAgICAgICAgfTsgXG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGdldHRpbmdIaXQgPSAobG9jYXRpb24pID0+IHtcbiAgICAgICAgICAgIGhpdHNbbG9jYXRpb25dID0gJ2hpdCc7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBnZXR0aW5nU3VuayA9IChzaGlwKSA9PiB7XG4gICAgICAgICAgICBpZiAoc2hpcC5oaXRzLmluZGV4T2YoJycpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHNoaXAuaXNTdW5rID0gdHJ1ZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIHsgc2V0Q29vcmQgLGxvY2F0aW9ucywgaGl0cywgaXNTdW5rLCBnZXR0aW5nU3VuaywgZGlyZWN0aW9uLCBnZXR0aW5nSGl0LCBzaGlwTGVuZ3RofTtcbiAgICB9O1xuXG4gICAgY29uc3QgYm9hcmRGYWN0b3J5ID0gKGlkKSA9PiB7XG5cbiAgICAgICAgY29uc3QgYm9hcmRJZCA9IGlkO1xuXG4gICAgICAgIGNvbnN0IGJvYXJkU2l6ZSA9IDEwO1xuXG4gICAgICAgIGNvbnN0IHNoaXBzID0gW3NoaXBGYWN0b3J5KDQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcEZhY3RvcnkoMyksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwRmFjdG9yeSgzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBGYWN0b3J5KDIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcEZhY3RvcnkoMiksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwRmFjdG9yeSgyKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBGYWN0b3J5KDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcEZhY3RvcnkoMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwRmFjdG9yeSgxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoaXBGYWN0b3J5KDEpXTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IHNoaXBzU3VuayA9ICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHNoaXBzU3VuayA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgaWYgKHNoaXBzW2ldLmlzU3VuayA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzaGlwc1N1bmsucHVzaChzaGlwc1tpXSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gc2hpcHNTdW5rO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGlsbGVnYWxNb3ZlcyA9IFtdO1xuXG4gICAgICAgIGNvbnN0IHJhbmRvbUxvY2F0aW9ucyA9ICgpID0+IHtcbiAgICAgICAgICAgIGxldCBzaGlwTG9jYXRpb25zO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgICAgZG8geyBzaGlwTG9jYXRpb25zID0gZ2VuZXJhdGVMb2NhdGlvbnMoc2hpcHNbaV0pIH1cbiAgICAgICAgICAgICAgICB3aGlsZSAoY2hlY2tDb2xsaXNpb24oc2hpcExvY2F0aW9ucykpO1xuICAgICAgICAgICAgICAgIHNoaXBzW2ldLmxvY2F0aW9ucyA9IHNoaXBMb2NhdGlvbnM7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNoaXBzW2ldLnNoaXBMZW5ndGg7IGorKyl7XG4gICAgICAgICAgICAgICAgICBzaGlwc1tpXS5oaXRzLnB1c2goJycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgZ2VuZXJhdGVMb2NhdGlvbnMgPSAoc2hpcCkgPT4ge1xuICAgICAgICAgICAgbGV0IGNvbDtcbiAgICAgICAgICAgIGxldCByb3c7XG4gICAgICAgICAgICBsZXQgc3RhcnRMb2NhdGlvbjtcbiAgICAgICAgICAgIGxldCBuZXdMb2NhdGlvbnMgPSBbXTtcbiAgICAgICAgICAgIGlmIChzaGlwLmRpcmVjdGlvbiA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHJvdyA9IE1hdGguY2VpbChNYXRoLnJhbmRvbSgpICogYm9hcmRTaXplKTtcbiAgICAgICAgICAgICAgICBjb2wgPSBNYXRoLmNlaWwoTWF0aC5yYW5kb20oKSAqIChib2FyZFNpemUgLSAoc2hpcC5zaGlwTGVuZ3RoICsgMSkpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcm93ID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiAoYm9hcmRTaXplIC0gKHNoaXAuc2hpcExlbmd0aCArIDEpKSk7XG4gICAgICAgICAgICAgICAgY29sID0gTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkgKiBib2FyZFNpemUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHN0YXJ0TG9jYXRpb24gPSBib2FyZElkICsgYCR7cm93fWAgKyBjb2w7XG4gICAgICAgICAgICBuZXdMb2NhdGlvbnMucHVzaChzdGFydExvY2F0aW9uKTtcblxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBzaGlwLnNoaXBMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChzaGlwLmRpcmVjdGlvbiA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdMb2NhdGlvbnMucHVzaChib2FyZElkICsgYCR7cm93fWAgKyAoY29sICsgaSkpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3TG9jYXRpb25zLnB1c2goYm9hcmRJZCArIGAkeyhyb3cgKyBpKX1gICsgYCR7Y29sfWApXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBuZXdMb2NhdGlvbnM7XG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgY2hlY2tDb2xsaXNpb24gPSAobG9jYXRpb25zKSA9PiB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxvY2F0aW9ucy5sZW5ndGg7IGorKyl7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGlwc1tpXS5sb2NhdGlvbnMuaW5kZXhPZihsb2NhdGlvbnNbal0pID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coYG5vIGNvbGxpc2lvbnMgb24gc2hpcCAke3NoaXBzW2ldfWApXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IHJlY2VpdmVBdHRhY2sgPSAoY2VsbCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2ltIGluIHJlY2VpdmUgYXR0YWNrIHN0YXJ0LiBDZWxsID0gJyArIGNlbGwpO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNoaXBzW2ldLmxvY2F0aW9ucylcbiAgICAgICAgICAgICAgICBpZiAoc2hpcHNbaV0ubG9jYXRpb25zLmluZGV4T2YoY2VsbCkgPiAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlldy5kaXNwbGF5SGl0KGNlbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hpcHNbaV0uZ2V0dGluZ0hpdChzaGlwc1tpXS5sb2NhdGlvbnMuaW5kZXhPZihjZWxsKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGlwc1tpXS5nZXR0aW5nU3VuayhzaGlwc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdJbSBpbiByZWNlaXZlQXR0YWNrIG1pc3MgYmxvY2suIEdpdmluZyB0byB2aWV3IGNlbGwgPSAnICsgY2VsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcuZGlzcGxheU1pc3MoY2VsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH07IFxuXG4gICAgICAgICAgICBpbGxlZ2FsTW92ZXMucHVzaChjZWxsKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm57c2hpcHMsIGlsbGVnYWxNb3ZlcywgcmVjZWl2ZUF0dGFjaywgc2hpcHNTdW5rLCByYW5kb21Mb2NhdGlvbnN9XG4gICAgfTtcblxuICAgIGNvbnN0IHBsYXllciA9IChpZCkgPT4ge1xuICAgICAgICBjb25zdCBwbGF5ZXJJZCA9IGlkO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgYm9hcmQgPSBib2FyZEZhY3RvcnkocGxheWVySWQpO1xuXG4gICAgICAgIGNvbnN0IGdldEZsZWV0ID0gKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZmxlZXRDb29yZHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYm9hcmQuc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGJvYXJkLnNoaXBzW2ldLmxvY2F0aW9ucy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICBmbGVldENvb3Jkcy5wdXNoKGJvYXJkLnNoaXBzW2ldLmxvY2F0aW9uc1tqXSlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBmbGVldENvb3JkcztcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBpc1dpbm5lciA9IGZhbHNlO1xuXG4gICAgICAgIHJldHVybntwbGF5ZXJJZCwgYm9hcmQsIGdldEZsZWV0LCBpc1dpbm5lcn1cbiAgICB9O1xuICAgIFxuICAgIHJldHVybiB7IHBsYXllciB9O1xuXG59KSgpIiwiaW1wb3J0IHsgY29udHJvbGxlciB9IGZyb20gXCIuL2NvbnRyb2xsZXJcIjtcbmltcG9ydCB7IG1vZGVsIH0gZnJvbSBcIi4vbW9kZWxcIjtcbmltcG9ydCB7IGluZGV4IH0gZnJvbSBcIi4vaW5kZXhcIjtcblxuZXhwb3J0IGNvbnN0IHZpZXcgPSAoKCkgPT4ge1xuXG4gICAgY29uc3QgZGlzcGxheUJvYXJkcyA9IChwbGF5ZXJzKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgMzsgaSsrKXtcbiAgICAgICAgICAgIGNvbnN0IGJvYXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3AnICsgaSArICdiJyk7XG4gICAgICAgICAgICB3aGlsZSAoYm9hcmQuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICAgIGJvYXJkLmZpcnN0Q2hpbGQucmVtb3ZlKClcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMTsgaiA8IDExOyBqKyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBrID0gMTsgayA8IDExOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2VsbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICBjZWxsLnNldEF0dHJpYnV0ZSgnaWQnLCBpICsgYCR7an1gICsgayk7XG4gICAgICAgICAgICAgICAgICAgIGNlbGwuc2V0QXR0cmlidXRlKCdjbGFzcycsICdjZWxsJyk7XG4gICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVyLm1ha2VNb3ZlKGNlbGwuaWQsIHBsYXllcnMpO1xuICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICBib2FyZC5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFxuICAgIGNvbnN0IGRpc3BsYXlIaXQgPSAoY2VsbElEKSA9PiB7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjZWxsSUQpO1xuICAgICAgICBjb25zb2xlLmxvZyhjZWxsKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJyk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnaGl0Jyk7XG4gICAgfTtcblxuICAgIGNvbnN0IGRpc3BsYXlNaXNzID0gKGNlbGxJRCkgPT4ge1xuICAgICAgICBjb25zb2xlLmxvZygnSW0gaW4gdmlldywgY2VsbElEID0gJyArIGNlbGxJRCk7XG4gICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjZWxsSUQpO1xuICAgICAgICBjb25zb2xlLmxvZyhjZWxsKTtcbiAgICAgICAgY2VsbC5jbGFzc0xpc3QucmVtb3ZlKCdzaGlwJyk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnbWlzcycpO1xuICAgIH07XG5cbiAgICBjb25zdCBkaXNwbGF5U2hpcHMgPSAoc2hpcHMpID0+IHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChzaGlwc1tpXSAhPT0gXCJcIikge1xuICAgICAgICAgICAgICAgIGNvbnN0IGNlbGwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtzaGlwc1tpXX1gKTtcbiAgICAgICAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ3NoaXAnKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHJldHVybiB7ZGlzcGxheUJvYXJkcywgZGlzcGxheUhpdCwgZGlzcGxheVNoaXBzLCBkaXNwbGF5TWlzc31cbn0pKCkiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi4vc3JjL2ltYWdlcy9pY29uczgtZmlyZS00OC5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuLi9zcmMvaW1hZ2VzL2Nsb3NlLnBuZ1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzBfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgXCIqIHtcXG4gICAgbWFyZ2luOiAwO1xcbiAgICBib3JkZXI6IG5vbmU7XFxuICAgIHBhZGRpbmc6IDA7XFxufVxcblxcbmJvZHkge1xcbiAgICBoZWlnaHQ6IDEwMHZoO1xcbiAgICB3aWR0aDogMTAwdnc7XFxufVxcblxcbi5tZXNzYWdlIHtcXG4gICAgaGVpZ2h0OiAxMHZoO1xcbn1cXG5cXG4ubWFpbiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIGhlaWdodDogNzB2aDtcXG59XFxuXFxuLnAxYixcXG4ucDJiIHtcXG4gICAgaGVpZ2h0OiA1MDBweDtcXG4gICAgd2lkdGg6IDUwMHB4O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gICAgZGlzcGxheTogZ3JpZDtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxuICAgIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbn1cXG5cXG4ucDFiIGRpdixcXG4ucDJiIGRpdiB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCBibHVlO1xcbn1cXG5cXG5mb290ZXIsXFxuaGVhZGVyIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYXF1YTtcXG4gICAgaGVpZ2h0OiAxMHZoO1xcbn1cXG5cXG4uaGl0IHtcXG4gICAgYmFja2dyb3VuZC1pbWFnZTogdXJsKFwiICsgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyArIFwiKTtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI0NSwgMTY5LCAxNjkpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XFxufVxcblxcbi5zaGlwIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogYmx1ZTtcXG59XFxuXFxuLm1pc3Mge1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19fICsgXCIpO1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7XFxufVxcblwiLCBcIlwiLHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIndlYnBhY2s6Ly8uL3NyYy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7SUFDSSxTQUFTO0lBQ1QsWUFBWTtJQUNaLFVBQVU7QUFDZDs7QUFFQTtJQUNJLGFBQWE7SUFDYixZQUFZO0FBQ2hCOztBQUVBO0lBQ0ksWUFBWTtBQUNoQjs7QUFFQTtJQUNJLGFBQWE7SUFDYiw2QkFBNkI7SUFDN0Isa0JBQWtCO0lBQ2xCLFlBQVk7QUFDaEI7O0FBRUE7O0lBRUksYUFBYTtJQUNiLFlBQVk7SUFDWix1QkFBdUI7SUFDdkIsYUFBYTtJQUNiLHNDQUFzQztJQUN0QyxtQ0FBbUM7QUFDdkM7O0FBRUE7O0lBRUksYUFBYTtJQUNiLHVCQUF1QjtJQUN2QixtQkFBbUI7SUFDbkIsc0JBQXNCO0FBQzFCOztBQUVBOztJQUVJLHNCQUFzQjtJQUN0QixZQUFZO0FBQ2hCOztBQUVBO0lBQ0kseURBQXVEO0lBQ3ZELG9DQUFvQztJQUNwQyxxQkFBcUI7QUFDekI7O0FBRUE7SUFDSSxzQkFBc0I7QUFDMUI7O0FBRUE7SUFDSSx5REFBOEM7SUFDOUMscUJBQXFCO0FBQ3pCXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgICBtYXJnaW46IDA7XFxuICAgIGJvcmRlcjogbm9uZTtcXG4gICAgcGFkZGluZzogMDtcXG59XFxuXFxuYm9keSB7XFxuICAgIGhlaWdodDogMTAwdmg7XFxuICAgIHdpZHRoOiAxMDB2dztcXG59XFxuXFxuLm1lc3NhZ2Uge1xcbiAgICBoZWlnaHQ6IDEwdmg7XFxufVxcblxcbi5tYWluIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgaGVpZ2h0OiA3MHZoO1xcbn1cXG5cXG4ucDFiLFxcbi5wMmIge1xcbiAgICBoZWlnaHQ6IDUwMHB4O1xcbiAgICB3aWR0aDogNTAwcHg7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsYWNrO1xcbiAgICBkaXNwbGF5OiBncmlkO1xcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxufVxcblxcbi5wMWIgZGl2LFxcbi5wMmIgZGl2IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkIGJsdWU7XFxufVxcblxcbmZvb3RlcixcXG5oZWFkZXIge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBhcXVhO1xcbiAgICBoZWlnaHQ6IDEwdmg7XFxufVxcblxcbi5oaXQge1xcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi4vc3JjL2ltYWdlcy9pY29uczgtZmlyZS00OC5wbmcpO1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoMjQ1LCAxNjksIDE2OSk7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJTtcXG59XFxuXFxuLnNoaXAge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBibHVlO1xcbn1cXG5cXG4ubWlzcyB7XFxuICAgIGJhY2tncm91bmQtaW1hZ2U6IHVybCguLi9zcmMvaW1hZ2VzL2Nsb3NlLnBuZyk7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJTtcXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNba11bMF07XG5cbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuXG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHVybCA9IFN0cmluZyh1cmwuX19lc01vZHVsZSA/IHVybC5kZWZhdWx0IDogdXJsKTsgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG5cbiAgaWYgKC9eWydcIl0uKlsnXCJdJC8udGVzdCh1cmwpKSB7XG4gICAgdXJsID0gdXJsLnNsaWNlKDEsIC0xKTtcbiAgfVxuXG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9IC8vIFNob3VsZCB1cmwgYmUgd3JhcHBlZD9cbiAgLy8gU2VlIGh0dHBzOi8vZHJhZnRzLmNzc3dnLm9yZy9jc3MtdmFsdWVzLTMvI3VybHNcblxuXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuXG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcblxuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cblxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG5cbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG5cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuXG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG5cbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG5cbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG5cbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpOyAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG5cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG5cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcyhzdHlsZUVsZW1lbnQpIHtcbiAgdmFyIG5vbmNlID0gdHlwZW9mIF9fd2VicGFja19ub25jZV9fICE9PSBcInVuZGVmaW5lZFwiID8gX193ZWJwYWNrX25vbmNlX18gOiBudWxsO1xuXG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KG9iai5zdXBwb3J0cywgXCIpIHtcIik7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cblxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwiQGxheWVyXCIuY29uY2F0KG9iai5sYXllci5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KG9iai5sYXllcikgOiBcIlwiLCBcIiB7XCIpO1xuICB9XG5cbiAgY3NzICs9IG9iai5jc3M7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cbiAgaWYgKHNvdXJjZU1hcCAmJiB0eXBlb2YgYnRvYSAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIuY29uY2F0KGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSksIFwiICovXCIpO1xuICB9IC8vIEZvciBvbGQgSUVcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgICovXG5cblxuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KSB7XG4gIC8vIGlzdGFuYnVsIGlnbm9yZSBpZlxuICBpZiAoc3R5bGVFbGVtZW50LnBhcmVudE5vZGUgPT09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9tQVBJOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHN0eWxlRWxlbWVudC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwibWFpblwiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIiXSwibmFtZXMiOlsibW9kZWwiLCJ2aWV3IiwiaW5pdCIsImNvbnRyb2xsZXIiLCJtb3ZlQ291bnRlciIsIl9yYW5kb21Nb3ZlR2VuIiwicGxheWVyIiwicmFuZG9tTW92ZSIsIk1hdGgiLCJjZWlsIiwicmFuZG9tIiwiY29uc29sZSIsImxvZyIsImJvYXJkIiwiaWxsZWdhbE1vdmVzIiwiaW5kZXhPZiIsIm1ha2VNb3ZlIiwiY2VsbCIsInBsYXllcnMiLCJyZWNlaXZlQXR0YWNrIiwiY2hlY2tXaW5uZXIiLCJzaGlwc1N1bmsiLCJsZW5ndGgiLCJpc1dpbm5lciIsImFsZXJ0IiwicGxheWVySWQiLCJzdGFydE5ldyIsImRpc3BsYXlCb2FyZHMiLCJwbGF5ZXIxIiwicGxheWVyMiIsInJhbmRvbUxvY2F0aW9ucyIsImRpc3BsYXlTaGlwcyIsImdldEZsZWV0Iiwic2hpcHMiLCJzaGlwRmFjdG9yeSIsInNoaXBMZW5ndGgiLCJkaXJlY3Rpb24iLCJsb2NhdGlvbnMiLCJoaXRzIiwiaXNTdW5rIiwic2V0Q29vcmQiLCJjZWxscyIsImkiLCJwdXNoIiwiZ2V0dGluZ0hpdCIsImxvY2F0aW9uIiwiZ2V0dGluZ1N1bmsiLCJzaGlwIiwiYm9hcmRGYWN0b3J5IiwiaWQiLCJib2FyZElkIiwiYm9hcmRTaXplIiwic2hpcExvY2F0aW9ucyIsImdlbmVyYXRlTG9jYXRpb25zIiwiY2hlY2tDb2xsaXNpb24iLCJqIiwiY29sIiwicm93Iiwic3RhcnRMb2NhdGlvbiIsIm5ld0xvY2F0aW9ucyIsImRpc3BsYXlIaXQiLCJkaXNwbGF5TWlzcyIsImZsZWV0Q29vcmRzIiwiaW5kZXgiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZmlyc3RDaGlsZCIsInJlbW92ZSIsImsiLCJjcmVhdGVFbGVtZW50Iiwic2V0QXR0cmlidXRlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFwcGVuZENoaWxkIiwiY2VsbElEIiwiY2xhc3NMaXN0IiwiYWRkIl0sInNvdXJjZVJvb3QiOiIifQ==