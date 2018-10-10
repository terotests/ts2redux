"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionEnums_1 = require("../common/actionEnums");
var state_1 = require("../../state");
var state_2 = require("../../state");
var state_3 = require("../../state");
var state_4 = require("../../state");
var state_5 = require("../../state");
exports.ShopCartModelReducer = function (state, action) {
    if (state === void 0) { state = state_1.initializeShopCart(); }
    switch (action.type) {
        case actionEnums_1.actionsEnums.ACTION_SHOPCARTMODEL_UPDATEITEMS:
            return state_2.updateItems(state, action.payload);
        case actionEnums_1.actionsEnums.ACTION_SHOPCARTMODEL_ADDITEM:
            return state_3.AddItem(state, action.payload);
    }
    return state;
};
exports.UserInfoModelReducer = function (state, action) {
    if (state === void 0) { state = state_4.initUserModel(); }
    switch (action.type) {
        case actionEnums_1.actionsEnums.ACTION_USERINFOMODEL_SETUSER:
            return state_5.setUser(state, action.payload);
    }
    return state;
};
//# sourceMappingURL=reducers.js.map