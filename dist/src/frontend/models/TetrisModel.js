"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Colors;
(function (Colors) {
    Colors["EMPTY"] = "";
})(Colors = exports.Colors || (exports.Colors = {}));
var pieceDeclaration = function (color, rows) {
    var cells = new Array(rows.length);
    for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        cells[i] = new Array(row.length);
        for (var c = 0; c < row.length; c++) {
            if (row.charAt(c) == ' ') {
                cells[i][c] = { color: Colors.EMPTY };
            }
            else {
                cells[i][c] = { color: color };
            }
        }
    }
    return {
        x: 0,
        y: rows.length * -1,
        width: rows.length,
        height: rows.length,
        cells: cells
    };
};
/**
 * [' O '],
*  ['OOO'],
*  [' O ']
 */
exports.createNewPiece = function (usingColor) {
    var items = [
        pieceDeclaration(usingColor, ['xx',
            'xx']),
        pieceDeclaration(usingColor, ['   ',
            'xxx',
            ' x ']),
        pieceDeclaration(usingColor, [' x ',
            ' x ',
            'xx ']),
        pieceDeclaration(usingColor, [' x ',
            ' x ',
            ' xx']),
        pieceDeclaration(usingColor, [' x  ',
            ' x  ',
            ' x  ',
            ' x  ']),
    ];
    return items[Math.floor(Math.random() * items.length)];
};
/**
 * @redux true
 */
var TetrisModel = /** @class */ (function () {
    function TetrisModel() {
        this.useColors = ["red", "blue", "green", "yellow", "brown", "orange"];
        this.lastUsedColor = Math.floor(Math.random() * this.useColors.length);
        this.points = 0;
        this.rows = 20;
        this.cols = 15;
        this.cells = [];
        this.gameOn = false;
        this.gameEnded = false;
        this.ticksPerMove = 10;
        this.tickCnt = 0;
    }
    TetrisModel.prototype.doesCollide = function (pieceX, pieceY, pieceCells) {
        var _this = this;
        var collides = false;
        var compareAgainst = pieceCells || this.activePiece.cells;
        compareAgainst.forEach(function (row, y) {
            row.forEach(function (cell, x) {
                if (cell.color === Colors.EMPTY)
                    return;
                if (pieceY + y >= _this.rows) {
                    collides = true;
                    return;
                }
                if (((pieceX + x) < 0) || ((pieceX + x) >= _this.cols)) {
                    collides = true;
                    return;
                }
                if (cell.color !== Colors.EMPTY) {
                    if (pieceY + y < 0)
                        return;
                    if (_this.cells[pieceY + y][pieceX + x].color !== Colors.EMPTY) {
                        collides = true;
                    }
                }
            });
        });
        return collides;
    };
    ;
    TetrisModel.prototype.tick = function () {
        this.tickCnt++;
        if (this.tickCnt >= this.ticksPerMove) {
            this.tickCnt = 0;
            this.step();
        }
    };
    TetrisModel.prototype.left = function () {
        if (!this.doesCollide(this.activePiece.x - 1, this.activePiece.y)) {
            this.activePiece.x--;
        }
    };
    TetrisModel.prototype.right = function () {
        if (!this.doesCollide(this.activePiece.x + 1, this.activePiece.y)) {
            this.activePiece.x++;
        }
    };
    // keyboard control for rotation, tries to rotate activePiece and if
    // it does not collide, rotation can be done
    TetrisModel.prototype.rotate = function () {
        var newOrientation = this.rotateCells(this.activePiece.cells);
        if (!this.doesCollide(this.activePiece.x, this.activePiece.y, newOrientation)) {
            this.activePiece.cells = newOrientation;
        }
    };
    // creates a new piece with rotated values
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
    TetrisModel.prototype.step = function () {
        if (this.gameOn) {
            if (!this.doesCollide(this.activePiece.x, this.activePiece.y + 1)) {
                this.activePiece.y++;
            }
            else {
                if (this.activePiece.y < 0) {
                    this.gameEnded = true;
                    this.gameOn = false;
                }
                else {
                    this.masonPiece();
                    this.dropRows();
                    this.activePiece = exports.createNewPiece(this.pickNextColor());
                    this.activePiece.x = Math.floor(Math.random() * 5);
                }
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
    // adds the piece permanently to the structure
    TetrisModel.prototype.masonPiece = function () {
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
    // drops full rows and adds points to the user
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
    TetrisModel.prototype.clearCells = function () {
        this.cells = new Array(this.rows);
        for (var row = 0; row < this.rows; row++) {
            this.cells[row] = new Array(this.cols);
            for (var col = 0; col < this.cols; col++) {
                this.cells[row][col] = { color: Colors.EMPTY };
            }
        }
    };
    TetrisModel.prototype.resetGame = function () {
        this.clearCells();
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