"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var actionEnums_1 = require("../common/actionEnums");
var state_1 = require("../../state");
var state_2 = require("../../state");
exports.ShopCartModelReducer = function (state /* TODO: default state here*/, action) {
    switch (action.type) {
        case actionEnums_1.actionsEnums.ACTION_SHOPCARTMODEL_UPDATEITEMS:
            return state_1.updateItems(state, action.payload);
        case actionEnums_1.actionsEnums.ACTION_SHOPCARTMODEL_ADDITEM:
            return state_2.AddItem(state, action.payload);
    }
    return state;
};
//# sourceMappingURL=reducers.js.map