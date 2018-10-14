"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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