"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var container = require("../models/reducers/TodoList");
var PureList_1 = require("./PureList");
// this component can be re-used
exports.AbstractTodoList = function (props) {
    return (React.createElement("div", null,
        React.createElement("h2", null, "TodoList Component, with memoization"),
        React.createElement("div", null,
            "Title: ",
            props.listTitle),
        React.createElement("button", { onClick: function () { return props.getItems(); } }, "Load"),
        React.createElement("button", { onClick: function () { return props.toggleSortOrder(); } }, "Toggle Order"),
        React.createElement("button", { onClick: function () { return props.prevPage(); } }, "Prev"),
        React.createElement("button", { onClick: function () { return props.nextPage(); } }, "Next"),
        React.createElement("button", { onClick: function () { return props.addLotOfItems(10000); } }, "Add 10000 items"),
        React.createElement("button", { onClick: function () { return props.setTitle("Jee" + Date.now()); } }, "Set Title of List"),
        React.createElement("div", null,
            React.createElement("div", null, props.state),
            React.createElement("div", null, props.state === "ERROR" ? new String(props.stateError) : ""),
            React.createElement(PureList_1.PureList, { items: props.listToDisplay }))));
};
// This is the specialized version of the component
exports.TodoList = container.StateConnector(exports.AbstractTodoList);
//# sourceMappingURL=todoList.js.map