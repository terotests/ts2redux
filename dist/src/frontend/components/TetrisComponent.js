"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var container = require("../models/reducers/TetrisModel");
var TetrisModel_1 = require("../models/TetrisModel");
// this component can be re-used
var TetrisC = /** @class */ (function (_super) {
    __extends(TetrisC, _super);
    function TetrisC() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.keyFunction = function (event) {
            if (_this.props.gameOn) {
                if (event.keyCode == 37) {
                    _this.props.left();
                }
                if (event.keyCode == 38) {
                    _this.props.rotate();
                }
                if (event.keyCode == 39) {
                    _this.props.right();
                }
                if (event.keyCode == 40) {
                    _this.props.step();
                }
            }
            event.preventDefault();
        };
        return _this;
    }
    TetrisC.prototype.componentDidMount = function () {
        var _this = this;
        this.interval = setInterval(function () {
            if (_this.props.gameOn)
                _this.props.tick();
        }, 100);
        document.addEventListener("keydown", this.keyFunction, false);
    };
    TetrisC.prototype.componentWillUnmount = function () {
        clearInterval(this.interval);
        document.removeEventListener("keydown", this.keyFunction, false);
    };
    TetrisC.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { style: { margin: 20,
                fontFamily: 'Arial', fontSize: '10px', color: '#333333',
                padding: 20, backgroundColor: 'white', borderRadius: '5px', display: 'inline-block' } },
            !this.props.gameOn ?
                React.createElement("div", null,
                    React.createElement("button", { onClick: this.props.start }, "Start Game"))
                : '',
            React.createElement("div", null,
                "Points:",
                this.props.points,
                " ",
                this.props.gameEnded ? 'Game Over' : ''),
            React.createElement("div", { style: { width: this.props.cols * 20, height: this.props.rows * 20, position: 'relative', backgroundColor: '#222222' } }, this.props.cells.map(function (row, y) { return React.createElement("div", { style: { width: _this.props.cols * 20, height: 21 }, key: 'row_' + y }, row.map(function (cell, x) {
                var hasActive = false;
                var active = _this.props.activePiece;
                var color = cell.color;
                active.cells.forEach(function (arow, ay) {
                    arow.forEach(function (acell, ax) {
                        if (((active.x + ax) == x) && ((active.y + ay) == y)) {
                            if (acell.color !== TetrisModel_1.Colors.EMPTY)
                                color = acell.color;
                        }
                    });
                });
                return React.createElement("div", { key: 'cell' + y + '_' + x, style: { backgroundColor: color,
                        boxShadow: color !== TetrisModel_1.Colors.EMPTY ? 'inset 0 0 3px rgba(0,0,0,0.6)' : '',
                        position: 'absolute', left: x * 20, top: 20 * y, width: 20, height: 20 } });
            })); }))));
    };
    return TetrisC;
}(React.PureComponent));
exports.TetrisC = TetrisC;
// This is the specialized version of the component
exports.TetrisComponent = container.StateConnector(TetrisC);
//# sourceMappingURL=TetrisComponent.js.map