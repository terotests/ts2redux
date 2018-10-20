"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**********************************************************
*                                                         *
*     Combined Reducers for main application              *
*     Generated by ts2redux at 2018-10-20T09:58:11.962Z   *
*                                                         *
**********************************************************/
var redux = require("redux");
var TestModel_1 = require("./TestModel");
var TodoList_1 = require("./TodoList");
var UserState_1 = require("./UserState");
exports.reducers = redux.combineReducers({
    TestModel: TestModel_1.TestModelReducer,
    TodoList: TodoList_1.TodoListReducer,
    UserState: UserState_1.UserStateReducer,
});
//# sourceMappingURL=index.js.map