"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var ng_1 = require("../ng");
var memberArea_1 = require("./memberArea");
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
        }
    };
};
exports.MembersAreaContainer = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(memberArea_1.MemberAreaComponent);
//# sourceMappingURL=memberAreaContainer.js.map