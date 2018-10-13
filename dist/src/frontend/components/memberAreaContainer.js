"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var ng_1 = require("../ng");
var mapStateToProps = function (state) {
    return {
        taskState: state.TestModelReducer.shopState,
        members: state.TestModelReducer.items
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        loadMembers: function () {
            return dispatch(ng_1.RTestModel.createItem('Jeee!!!'));
        },
        fillSomeFriends: function () {
            return dispatch(ng_1.RTestModel.fillSomeFriends());
        },
        createItem: function (name) {
            return dispatch(ng_1.RTestModel.createItem(name));
        },
        ChangeLastItem: function () {
            return dispatch(ng_1.RTestModel.ChangeLastItem());
        },
        addToCartRandom: function () {
            return dispatch(ng_1.RTestModel.addToCartRandom());
        },
        addCart: function () {
            return dispatch(ng_1.RTestModel.addCart());
        }
    };
};
exports.StateConnector = react_redux_1.connect(mapStateToProps, mapDispatchToProps);
//# sourceMappingURL=memberAreaContainer.js.map