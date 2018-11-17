"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Colors;
(function (Colors) {
    Colors["EMPTY"] = "";
})(Colors = exports.Colors || (exports.Colors = {}));
exports.doesCollide = function (pieceX, pieceY, cells, pieceCells, width, height) {
    var collides = false;
    pieceCells.forEach(function (row, y) {
        row.forEach(function (cell, x) {
            if (cell.color === Colors.EMPTY)
                return;
            if (pieceY + y >= height) {
                collides = true;
                return;
            }
            if (((pieceX + x) < 0) || ((pieceX + x) >= width)) {
                collides = true;
                return;
            }
            if (cell.color !== Colors.EMPTY) {
                if (pieceY + y < 0)
                    return;
                if (cells[pieceY + y][pieceX + x].color !== Colors.EMPTY) {
                    collides = true;
                }
            }
        });
    });
    return collides;
};
exports.rotateCells = function (cells) {
    var res = new Array(cells.length);
    for (var j = 0; j < cells.length; j++) {
        res[j] = new Array(cells[j].length);
    }
    for (var j = 0; j < cells.length; j++) {
        var row = cells[j];
        for (var i = 0; i < row.length; i++) {
            res[i][j] = { color: Colors.EMPTY };
        }
    }
    for (var j = 0; j < cells.length; j++) {
        var row = cells[j];
        for (var i = 0; i < row.length; i++) {
            res[i][cells.length - j - 1] = row[i];
        }
    }
    return res;
};
exports.createNewPiece = function (usingColor) {
    var items = [
        {
            x: 0,
            y: -2,
            width: 2,
            height: 2,
            cells: [
                [{ color: usingColor }, { color: usingColor }],
                [{ color: usingColor }, { color: usingColor }]
            ]
        },
        {
            x: 0,
            y: -2,
            width: 3,
            height: 3,
            cells: [
                [
                    { color: Colors.EMPTY },
                    { color: Colors.EMPTY },
                    { color: Colors.EMPTY }
                ],
                [{ color: usingColor }, { color: usingColor }, { color: usingColor }],
                [
                    { color: Colors.EMPTY },
                    { color: usingColor },
                    { color: Colors.EMPTY }
                ]
            ]
        },
        {
            x: 0,
            y: -2,
            width: 3,
            height: 3,
            cells: [
                [
                    { color: Colors.EMPTY },
                    { color: Colors.EMPTY },
                    { color: Colors.EMPTY }
                ],
                [{ color: usingColor }, { color: usingColor }, { color: usingColor }],
                [
                    { color: Colors.EMPTY },
                    { color: Colors.EMPTY },
                    { color: usingColor }
                ]
            ]
        },
        {
            x: 0,
            y: -2,
            width: 3,
            height: 3,
            cells: [
                [
                    { color: Colors.EMPTY },
                    { color: Colors.EMPTY },
                    { color: Colors.EMPTY }
                ],
                [{ color: usingColor }, { color: usingColor }, { color: usingColor }],
                [
                    { color: usingColor },
                    { color: Colors.EMPTY },
                    { color: Colors.EMPTY }
                ]
            ]
        },
        {
            x: 0,
            y: -2,
            width: 4,
            height: 4,
            cells: [
                [
                    { color: Colors.EMPTY },
                    { color: usingColor },
                    { color: Colors.EMPTY },
                    { color: Colors.EMPTY },
                ],
                [{ color: Colors.EMPTY }, { color: usingColor }, { color: Colors.EMPTY }, { color: Colors.EMPTY }],
                [{ color: Colors.EMPTY }, { color: usingColor }, { color: Colors.EMPTY }, { color: Colors.EMPTY }],
                [{ color: Colors.EMPTY }, { color: usingColor }, { color: Colors.EMPTY }, { color: Colors.EMPTY }],
            ]
        }
    ];
    return items[Math.floor(Math.random() * items.length)];
};
/**
 * @redux true
 */
var TetrisModel = /** @class */ (function () {
    function TetrisModel() {
        this.useColors = ["red", "blue", "green", "yellow", "brown"];
        this.lastUsedColor = 0;
        this.points = 0;
        this.rows = 20;
        this.cols = 10;
        this.cells = [];
        this.gameOn = false;
        this.gameEnded = false;
        this.ticksPerMove = 10;
        this.tickCnt = 0;
    }
    TetrisModel.prototype.tick = function () {
        this.tickCnt++;
        if (this.tickCnt >= this.ticksPerMove) {
            this.tickCnt = 0;
            this.step();
        }
    };
    TetrisModel.prototype.left = function () {
        if (!exports.doesCollide(this.activePiece.x - 1, this.activePiece.y, this.cells, this.activePiece.cells, this.cols, this.rows)) {
            this.activePiece.x--;
        }
    };
    TetrisModel.prototype.right = function () {
        if (!exports.doesCollide(this.activePiece.x + 1, this.activePiece.y, this.cells, this.activePiece.cells, this.cols, this.rows)) {
            this.activePiece.x++;
        }
    };
    TetrisModel.prototype.rotateCells = function (cells) {
        var res = new Array(cells.length);
        for (var j = 0; j < cells.length; j++) {
            res[j] = new Array(cells[j].length);
        }
        for (var j = 0; j < cells.length; j++) {
            var row = cells[j];
            for (var i = 0; i < row.length; i++) {
                res[i][j] = { color: Colors.EMPTY };
            }
        }
        for (var j = 0; j < cells.length; j++) {
            var row = cells[j];
            for (var i = 0; i < row.length; i++) {
                res[i][cells.length - j - 1] = row[i];
            }
        }
        return res;
    };
    ;
    TetrisModel.prototype.rotate = function () {
        var newOrientation = this.rotateCells(this.activePiece.cells);
        if (!exports.doesCollide(this.activePiece.x, this.activePiece.y, this.cells, newOrientation, this.cols, this.rows)) {
            this.activePiece.cells = newOrientation;
        }
    };
    TetrisModel.prototype.step = function () {
        if (this.gameOn) {
            var freezePiece = false;
            if (!freezePiece &&
                !exports.doesCollide(this.activePiece.x, this.activePiece.y + 1, this.cells, this.activePiece.cells, this.cols, this.rows)) {
                this.activePiece.y++;
            }
            else {
                if (this.activePiece.y < 0) {
                    this.gameEnded = true;
                    this.gameOn = false;
                }
                else {
                    freezePiece = true;
                }
            }
            if (freezePiece) {
                this.addPiece();
                this.dropRows();
                this.activePiece = exports.createNewPiece(this.pickNextColor());
                this.activePiece.x = Math.floor(Math.random() * 5);
            }
        }
    };
    TetrisModel.prototype.pickNextColor = function () {
        this.lastUsedColor++;
        if (this.lastUsedColor >= this.useColors.length) {
            this.lastUsedColor = 0;
        }
        return this.useColors[this.lastUsedColor];
    };
    TetrisModel.prototype.addPiece = function () {
        var _this = this;
        var piece = this.activePiece;
        piece.cells.forEach(function (row, y) {
            if (piece.y + y < 0)
                return;
            row.forEach(function (cell, x) {
                if (cell.color !== Colors.EMPTY) {
                    _this.cells[piece.y + y][piece.x + x].color = cell.color;
                }
            });
        });
    };
    TetrisModel.prototype.dropRows = function () {
        var nextRows = [];
        var emptyCnt = 0;
        for (var i = 0; i < this.cells.length; i++) {
            var row = this.cells[i];
            if (row.filter(function (cell) { return cell.color === Colors.EMPTY; }).length > 0) {
                nextRows.push(row);
            }
            else {
                emptyCnt++;
            }
        }
        if (emptyCnt > 0) {
            this.points += emptyCnt * emptyCnt * 10;
            while (emptyCnt-- > 0) {
                var newEmpty = new Array(this.cols);
                for (var col = 0; col < this.cols; col++) {
                    newEmpty[col] = { color: Colors.EMPTY };
                }
                nextRows.unshift(newEmpty);
            }
            this.cells = nextRows;
            this.ticksPerMove--;
        }
    };
    TetrisModel.prototype.resetGame = function () {
        this.cells = new Array(this.rows);
        for (var row = 0; row < this.rows; row++) {
            this.cells[row] = new Array(this.cols);
            for (var col = 0; col < this.cols; col++) {
                this.cells[row][col] = { color: Colors.EMPTY };
            }
        }
        this.activePiece = exports.createNewPiece(this.pickNextColor());
        this.ticksPerMove = 10;
        this.tickCnt = 0;
    };
    TetrisModel.prototype.start = function () {
        this.resetGame();
        this.gameOn = true;
        this.gameEnded = false;
        this.points = 0;
    };
    return TetrisModel;
}());
exports.TetrisModel = TetrisModel;
//# sourceMappingURL=TetrisModel.js.map