"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
exports.MemberAreaComponent = function (props) {
    return (React.createElement("div", null,
        React.createElement("input", { type: "submit", value: "load", className: "btn btn-default", onClick: function () { return props.loadMembers(); } }),
        React.createElement("div", null,
            React.createElement("div", null, props.taskState),
            props.members.map(function (m) {
                return React.createElement("div", { key: m.id }, m.name);
            }))));
};
//# sourceMappingURL=memberArea.js.map