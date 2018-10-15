"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var todoContainer = require("../models/reducers/TodoList");
var userContainer = require("../models/reducers/UserState");
// this component can be re-used
exports.AbstractCombinedStates = function (props) {
    return (React.createElement("div", null,
        React.createElement("div", null, "Combined States Component"),
        React.createElement("div", null,
            React.createElement("div", null,
                "User Name Now: ",
                props.username),
            React.createElement("div", null,
                "Items length Now: ",
                props.items.length),
            React.createElement("button", { onClick: function () { props.getItems(); } }, "Try Loading"),
            React.createElement("button", { onClick: function () { props.clearTodoList(); } }, "Clear List"),
            React.createElement("button", { onClick: function () { props.fakeLogin(); } }, "Test Login"))));
};
exports.StateConnector = react_redux_1.connect(function (state) { return (__assign({}, todoContainer.mapStateToProps(state), userContainer.mapStateToProps(state))); }, function (dispatch) { return (__assign({}, todoContainer.mapDispatchToProps(dispatch), userContainer.mapDispatchToProps(dispatch))); });
// This is the specialized version of the component
exports.CombinedStates = exports.StateConnector(exports.AbstractCombinedStates);
//# sourceMappingURL=combinedState.js.map