"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var container = require("../models/reducers/genericModel");
var Nro = /** @class */ (function () {
    function Nro(n) {
        this.val = 0;
        this.val = n;
    }
    Nro.prototype.value = function () {
        return this.val;
    };
    return Nro;
}());
var OtherNro = /** @class */ (function () {
    function OtherNro(n) {
        this.val = 0;
        this.val = n;
    }
    OtherNro.prototype.value = function () {
        return this.val;
    };
    return OtherNro;
}());
// this component can be re-used
exports.AbstractGeneric = function (props) {
    return (React.createElement("div", null,
        "Redux Sum : ",
        props.sum,
        React.createElement("div", null,
            React.createElement("button", { onClick: function () {
                    props.addItems([new Nro(Math.random()), new OtherNro(2)]);
                } }, "Sum some"))));
};
// This is the specialized version of the component
exports.GenericRedux = container.StateConnector(exports.AbstractGeneric);
//# sourceMappingURL=GenericComp.js.map