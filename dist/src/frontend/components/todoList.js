"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var container = require("../models/reducers/TodoList");
// this component can be re-used
exports.AbstractTodoList = function (props) {
    return (React.createElement("div", null,
        React.createElement("div", null, "TodoList Component"),
        React.createElement("input", { type: "submit", value: "load", className: "btn btn-default", onClick: function () { return props.getItems(); } }),
        React.createElement("div", null,
            React.createElement("table", { style: { border: '1px solid gray', padding: '5px' } },
                React.createElement("tbody", null, props.items.map(function (m) {
                    return React.createElement("tr", { key: m.id },
                        React.createElement("td", null, m.id),
                        React.createElement("td", null, m.title),
                        React.createElement("td", null, m.completed ? 'Completed' : 'In Progress'));
                }))))));
};
// This is the specialized version of the component
exports.TodoList = container.StateConnector(exports.AbstractTodoList);
//# sourceMappingURL=todoList.js.map