"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var container = require("../models/reducers/IncModel");
// this component can be re-used
exports.AbstractInc = function (props) {
    return (React.createElement("div", null,
        React.createElement("div", null, props.cnt),
        React.createElement("button", { onClick: props.increment }, "+"),
        React.createElement("button", { onClick: props.decrement }, "-")));
};
// This is the specialized version of the component
exports.ReduxInc = container.StateConnector(exports.AbstractInc);
//# sourceMappingURL=ReduxInc.js.map