"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var WaspModel_1 = require("../models/reducers/WaspModel");
var Interval = /** @class */ (function (_super) {
    __extends(Interval, _super);
    function Interval() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Interval.prototype.componentDidMount = function () {
        var _this = this;
        this.interval = setInterval(function () {
            _this.props.fn();
        }, this.props.time);
    };
    Interval.prototype.componentWillUnmount = function () {
        clearInterval(this.interval);
    };
    Interval.prototype.render = function () {
        return React.createElement("span", null);
    };
    return Interval;
}(React.PureComponent));
exports.Interval = Interval;
// this component can be re-used
var WaspContextComponent = /** @class */ (function (_super) {
    __extends(WaspContextComponent, _super);
    function WaspContextComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WaspContextComponent.prototype.render = function () {
        return (React.createElement(WaspModel_1.WaspModelConsumer, null, function (state) { return React.createElement("div", null,
            React.createElement("div", null, "Wasps using React Context API"),
            React.createElement(Interval, { fn: state.step, time: 20 }),
            React.createElement("button", { onClick: function (_) {
                    state.addWasp({ x: 50 + Math.random() * 150, y: 50 + Math.random() * 150 });
                } }, "+ Wasp"),
            React.createElement("div", null,
                React.createElement("svg", { width: 300, height: 300 }, Object.keys(state.wasps).map(function (key) {
                    var wasp = state.wasps[parseInt(key)];
                    return React.createElement("circle", { onClick: function (_) {
                            state.setColor({ waspId: parseInt(key), colorValue: 'green' });
                        }, cx: wasp.x, cy: wasp.y, key: key, r: 10, fill: wasp.color });
                })))); }));
    };
    return WaspContextComponent;
}(React.PureComponent));
exports.WaspContextComponent = WaspContextComponent;
//# sourceMappingURL=WaspContextComponent.js.map