"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PureList = /** @class */ (function (_super) {
    __extends(PureList, _super);
    function PureList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PureList.prototype.render = function () {
        return React.createElement("table", null,
            React.createElement("tbody", null, this.props.items.map(function (m) {
                return React.createElement("tr", { key: m.id },
                    React.createElement("td", null, m.id),
                    React.createElement("td", null, m.title),
                    React.createElement("td", null, m.completed ? 'Completed' : 'In Progress'));
            })));
    };
    return PureList;
}(React.PureComponent));
exports.PureList = PureList;
//# sourceMappingURL=PureList.js.map