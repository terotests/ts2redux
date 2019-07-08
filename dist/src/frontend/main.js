"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var redux_1 = require("redux");
// import { Router, Route, IndexRoute, hashHistory } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux'
var redux_thunk_1 = require("redux-thunk");
var react_redux_1 = require("react-redux");
var reducers_1 = require("./models/reducers/");
var TodoList_1 = require("./models/reducers/TodoList");
var UserState_1 = require("./models/reducers/UserState");
var IncModel_1 = require("./models/reducers/IncModel");
var GenericComp_1 = require("./components/GenericComp");
var memberArea_1 = require("./components/memberArea");
var todoList_1 = require("./components/todoList");
var ReduxInc_1 = require("./components/ReduxInc");
var combinedState_1 = require("./components/combinedState");
var todo = require("./models/TodoList");
var WaspModel_1 = require("./models/reducers/WaspModel");
var WaspComponent_1 = require("./components/WaspComponent");
var TetrisComponent_1 = require("./components/TetrisComponent");
var WaspContextComponent_1 = require("./components/WaspContextComponent");
var UIHelperModel_1 = require("./models/reducers/UIHelperModel");
var store = redux_1.createStore(reducers_1.reducers, redux_1.compose(redux_1.applyMiddleware(redux_thunk_1.default), window["__REDUX_DEVTOOLS_EXTENSION__"]
    ? window["__REDUX_DEVTOOLS_EXTENSION__"]()
    : function (f) { return f; }));
// Testing...
var TodoStoreController = /** @class */ (function () {
    function TodoStoreController(store) {
        this._store = store;
    }
    Object.defineProperty(TodoStoreController.prototype, "items", {
        set: function (value) {
            this._store.dispatch({
                type: TodoList_1.TodoListEnums.TodoList_items,
                payload: value
            });
        },
        enumerable: true,
        configurable: true
    });
    TodoStoreController.prototype.getItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var items;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) {
                            setTimeout(function () {
                                resolve([
                                    {
                                        userId: 1,
                                        completed: true,
                                        title: "Generated Item 1 ",
                                        id: 1
                                    }
                                ]);
                            }, 1000);
                        })];
                    case 1:
                        items = _a.sent();
                        this.items = items;
                        return [2 /*return*/, items];
                }
            });
        });
    };
    return TodoStoreController;
}());
exports.TodoStoreController = TodoStoreController;
var engine = new TodoStoreController(store);
var Nro = /** @class */ (function () {
    function Nro(n) {
        this.val = 0;
        this.val = n;
    }
    Nro.prototype.value = function () {
        return this.val;
    };
    return Nro;
}());
var listValue = new todo.TodoList();
var Ctx = React.createContext(listValue);
// const history = syncHistoryWithStore(hashHistory, store);
var UserInfo = function (props) { return (React.createElement(UserState_1.UserStateContext.Consumer, null, function (state) {
    return (React.createElement("div", null,
        "USER: ",
        state.username,
        React.createElement("button", { onClick: state.fakeLogin }, "Fake Login")));
})); };
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(Ctx.Provider, { value: listValue },
        React.createElement("button", { onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _b = (_a = console).log;
                            _c = ["items : "];
                            return [4 /*yield*/, engine.getItems()];
                        case 1:
                            _b.apply(_a, _c.concat([_d.sent()]));
                            return [2 /*return*/];
                    }
                });
            }); } }, "Get Them"),
        React.createElement(todoList_1.TodoList, null),
        React.createElement(GenericComp_1.GenericRedux, null),
        React.createElement(TetrisComponent_1.TetrisComponent, null),
        React.createElement(UserState_1.UserStateProvider, null,
            React.createElement(UIHelperModel_1.UIHelperModelProvider, null,
                React.createElement(UIHelperModel_1.UIHelperModelConsumer, null, function (state) { return (React.createElement("div", null,
                    React.createElement("button", { onClick: state.toggle }, "Show / Hide Wasps"),
                    state.showWasps ? (React.createElement("div", null,
                        React.createElement(WaspComponent_1.WaspComponent, null),
                        React.createElement(WaspModel_1.WaspModelProvider, null,
                            React.createElement(WaspContextComponent_1.WaspContextComponent, null)))) : (""))); })),
            React.createElement(IncModel_1.IncModelProvider, null,
                React.createElement(IncModel_1.IncModelConsumer, null, function (state) { return (React.createElement("div", null,
                    React.createElement("div", null, state.cnt),
                    React.createElement("button", { onClick: state.increment }, "+"),
                    React.createElement("button", { onClick: state.decrement }, "-"))); })),
            React.createElement(ReduxInc_1.ReduxInc, null),
            React.createElement("div", null,
                React.createElement(memberArea_1.MemberArea, null),
                React.createElement(combinedState_1.CombinedStates, null)),
            React.createElement("div", null,
                React.createElement("h4", null, "Context API test"),
                React.createElement(UserState_1.UserStateContext.Consumer, null, function (state) {
                    return (React.createElement("div", null,
                        "USER: ",
                        state.username,
                        React.createElement("button", { onClick: state.fakeLogin }, "Fake Login")));
                }),
                React.createElement(TodoList_1.TodoListProvider, null,
                    React.createElement(TodoList_1.TodoListContext.Consumer, null, function (todolist) {
                        return (React.createElement("div", null,
                            React.createElement("div", null,
                                "Items loaded ",
                                todolist.items.length),
                            React.createElement("button", { onClick: function () { return todolist.getItems(); } }, "Load"),
                            React.createElement("button", { onClick: function () { return todolist.reverse(); } }, "Revert"),
                            React.createElement("ul", null, todolist.items.map(function (item) { return (React.createElement("li", { key: item.id }, item.title)); }))));
                    })),
                React.createElement(TodoList_1.TodoListProvider, null,
                    React.createElement(TodoList_1.TodoListConsumer, null, function (todolist) {
                        return (React.createElement("div", null,
                            React.createElement("div", null, todolist.state),
                            React.createElement("button", { onClick: function () { return todolist.getItems(); } }, "Load"),
                            React.createElement("button", { onClick: todolist.reverse }, "Revert List"),
                            React.createElement("button", { onClick: function () { return todolist.clearTodoList(); } }, "Clear"),
                            React.createElement("button", { onClick: function () { return todolist.toggleSortOrder(); } }, "Toggle"),
                            React.createElement("button", { onClick: function () { return todolist.nextPage(); } }, "Next"),
                            React.createElement("button", { onClick: function () { return todolist.prevPage(); } }, "Prev"),
                            React.createElement("ul", null, todolist.items.map(function (item) { return (React.createElement("li", { key: item.id },
                                item.id,
                                " ",
                                item.title,
                                " ",
                                React.createElement(UserState_1.UserStateProvider, null,
                                    React.createElement(UserInfo, null)))); }))));
                    })))))), document.getElementById("root"));
/*
      <Router history={history}>
        <Route path="/" component={App}>
          <IndexRoute component={LoginContainer}/>
          <Route path="login" component={LoginContainer}/>
          <Route path="student-list" component={StudentListContainer}/>
          <Route path="student-detail" component={StudentDetailContainer}/>
        </Route>
      </Router>
*/
//# sourceMappingURL=main.js.map