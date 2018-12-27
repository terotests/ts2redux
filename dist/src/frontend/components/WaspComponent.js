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
var container = require("../models/reducers/WaspModel");
// this component can be re-used
var WaspC = /** @class */ (function (_super) {
    __extends(WaspC, _super);
    function WaspC() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WaspC.prototype.componentDidMount = function () {
        var _this = this;
        this.interval = setInterval(function () {
            _this.props.step();
        }, 20);
    };
    WaspC.prototype.componentWillUnmount = function () {
        clearInterval(this.interval);
    };
    WaspC.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", null, "Wasps using Redux"),
            React.createElement("button", { onClick: function (_) {
                    _this.props.addWasp({ x: 50 + Math.random() * 150, y: 50 + Math.random() * 150 });
                } }, "+ Wasp"),
            React.createElement("div", null,
                React.createElement("svg", { width: 300, height: 300 }, Object.keys(this.props.wasps).map(function (key) {
                    var wasp = _this.props.wasps[parseInt(key)];
                    return React.createElement("circle", { cx: wasp.x, cy: wasp.y, key: key, r: 10, fill: "red" });
                })))));
    };
    return WaspC;
}(React.PureComponent));
exports.WaspC = WaspC;
// This is the specialized version of the component
exports.WaspComponent = container.StateConnector(WaspC);
//# sourceMappingURL=WaspComponent.js.map