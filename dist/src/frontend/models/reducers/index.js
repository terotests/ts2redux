"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**********************************************************
*                                                         *
*     Combined Reducers for main application              *
*     Generated by ts2redux at 2018-10-20T14:02:55.191Z   *
*                                                         *
**********************************************************/
var redux = require("redux");
var IncModel_1 = require("./IncModel");
var SimpleModel_1 = require("./SimpleModel");
var TestModel_1 = require("./TestModel");
var TodoList_1 = require("./TodoList");
var UserState_1 = require("./UserState");
exports.reducers = redux.combineReducers({
    IncModel: IncModel_1.IncModelReducer,
    SimpleModel: SimpleModel_1.SimpleModelReducer,
    TestModel: TestModel_1.TestModelReducer,
    TodoList: TodoList_1.TodoListReducer,
    UserState: UserState_1.UserStateReducer,
});
//# sourceMappingURL=index.js.map