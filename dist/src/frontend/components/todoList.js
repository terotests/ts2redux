"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var container = require("../models/reducers/TodoList");
// this component can be re-used
exports.AbstractTodoList = function (props) {
    return (React.createElement("div", null,
        React.createElement("h2", null, "TodoList Component, with memoization"),
        React.createElement("button", { onClick: function () { return props.getItems(); } }, "Load"),
        React.createElement("button", { onClick: function () { return props.sortById(); } }, "Sort by Id"),
        React.createElement("button", { onClick: function () { return props.sortByTitle(); } }, "Sort by Title"),
        React.createElement("button", { onClick: function () { return props.sortByCompletion(); } }, "Sort by Completion"),
        React.createElement("button", { onClick: function () { return props.toggleSortOrder(); } }, "Toggle Order"),
        React.createElement("button", { onClick: function () { return props.prevPage(); } }, "Prev"),
        React.createElement("button", { onClick: function () { return props.nextPage(); } }, "Next"),
        React.createElement("div", null,
            React.createElement("div", null, props.state),
            React.createElement("div", null, props.state === 'ERROR' ? (new String(props.stateError)) : ''),
            React.createElement("table", null,
                React.createElement("tbody", null, props.listToDisplay.map(function (m) {
                    return React.createElement("tr", { key: m.id },
                        React.createElement("td", null, m.id),
                        React.createElement("td", null, m.title),
                        React.createElement("td", null, m.completed ? 'Completed' : 'In Progress'));
                }))))));
};
// This is the specialized version of the component
exports.TodoList = container.StateConnector(exports.AbstractTodoList);
//# sourceMappingURL=todoList.js.map