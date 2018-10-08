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
// simple function to manipulate the data...
function loadMembers(input) {
    return __assign({}, input, { membersList: [{ name: 'User 1' }, { name: 'User 2' }] });
}
exports.MemberAreaComponent = function (props) {
    return (React.createElement("div", null,
        props.members.map(function (m) {
            return React.createElement("div", null, m.name);
        }),
        React.createElement("br", null),
        React.createElement("input", { type: "submit", value: "load", className: "btn btn-default", onClick: function () { return props.loadMembers(); } })));
};
//# sourceMappingURL=memberArea.js.map