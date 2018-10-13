"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var container = require("../models/reducers/TestModel");
// this component can be re-used
exports.AbstractMemberArea = function (props) {
    return (React.createElement("div", null,
        React.createElement("div", null, "Member Area Component"),
        React.createElement("input", { type: "submit", value: "load", className: "btn btn-default", onClick: function () { return props.addOneFriend('Teppo'); } }),
        React.createElement("input", { type: "submit", value: "Fill Friends", className: "btn btn-default", onClick: function () { return props.fillSomeFriends(); } }),
        React.createElement("input", { type: "submit", value: "John Smith", className: "btn btn-default", onClick: function () { return props.createItem('John Smith'); } }),
        React.createElement("input", { type: "submit", value: "Change the last", className: "btn btn-default", onClick: function () { return props.ChangeLastItem(); } }),
        React.createElement("input", { type: "submit", value: "Remove First", className: "btn btn-default", onClick: function () { return props.removeFirst(); } }),
        React.createElement("input", { type: "submit", value: "Sort", className: "btn btn-default", onClick: function () { return props.sort(); } }),
        React.createElement("input", { type: "submit", value: "+ Cart Sync", className: "btn btn-default", onClick: function () { return props.addCartSync(); } }),
        React.createElement("input", { type: "submit", value: "+ Cart", className: "btn btn-default", onClick: function () { return props.addCart(); } }),
        React.createElement("input", { type: "submit", value: "+ Cart Item", className: "btn btn-default", onClick: function () { return props.addToCartRandom(); } }),
        React.createElement("input", { type: "submit", value: "user message", className: "btn btn-default", onClick: function () { return props.setUserMessage('Hello WOrld!!!!'); } }),
        React.createElement("div", null,
            React.createElement("div", null, props.userMessage),
            React.createElement("div", null, props.shopState),
            props.items.map(function (m) {
                return React.createElement("div", { key: m.id }, m.name);
            }),
            React.createElement("h1", null, "Shopping Carts"),
            Object.keys(props.carts).map(function (cartId) {
                var cart = props.carts[cartId];
                return React.createElement("div", { key: cartId },
                    React.createElement("h4", null, cartId),
                    React.createElement("button", { onClick: function () {
                            props.addToCart({ cartId: cartId, item: { id: (new Date()).getTime(), name: "Some New Item" } });
                        } }, "+ item"),
                    React.createElement("ul", null, cart.items.map(function (item) { return React.createElement("li", { key: item.id }, item.name); })));
            }))));
};
// This is the specialized version of the component
exports.MemberArea = container.StateConnector(exports.AbstractMemberArea);
//# sourceMappingURL=memberArea.js.map