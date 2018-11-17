"use strict";
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
var store = redux_1.createStore(reducers_1.reducers, redux_1.compose(redux_1.applyMiddleware(redux_thunk_1.default), window['devToolsExtension'] ? window['devToolsExtension']() : function (f) { return f; }));
var listValue = new todo.TodoList();
var Ctx = React.createContext(listValue);
// const history = syncHistoryWithStore(hashHistory, store);
var UserInfo = function (props) { return React.createElement(UserState_1.UserStateContext.Consumer, null, function (state) {
    return React.createElement("div", null,
        "USER: ",
        state.username,
        React.createElement("button", { onClick: state.fakeLogin }, "Fake Login"));
}); };
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement(Ctx.Provider, { value: listValue },
        React.createElement(TetrisComponent_1.TetrisComponent, null),
        React.createElement(UserState_1.UserStateProvider, null,
            React.createElement(UIHelperModel_1.UIHelperModelProvider, null,
                React.createElement(UIHelperModel_1.UIHelperModelConsumer, null, function (state) { return React.createElement("div", null,
                    React.createElement("button", { onClick: state.toggle }, "Show / Hide Wasps"),
                    state.showWasps ?
                        React.createElement("div", null,
                            React.createElement(WaspComponent_1.WaspComponent, null),
                            React.createElement(WaspModel_1.WaspModelProvider, null,
                                React.createElement(WaspContextComponent_1.WaspContextComponent, null)))
                        : ''); })),
            React.createElement(IncModel_1.IncModelProvider, null,
                React.createElement(IncModel_1.IncModelConsumer, null, function (state) { return React.createElement("div", null,
                    React.createElement("div", null, state.cnt),
                    React.createElement("button", { onClick: state.increment }, "+"),
                    React.createElement("button", { onClick: state.decrement }, "-")); })),
            React.createElement(ReduxInc_1.ReduxInc, null),
            React.createElement("div", null,
                React.createElement(memberArea_1.MemberArea, null),
                React.createElement(combinedState_1.CombinedStates, null),
                React.createElement(todoList_1.TodoList, null)),
            React.createElement("div", null,
                React.createElement("h4", null, "Context API test"),
                React.createElement(UserState_1.UserStateContext.Consumer, null, function (state) {
                    return React.createElement("div", null,
                        "USER: ",
                        state.username,
                        React.createElement("button", { onClick: state.fakeLogin }, "Fake Login"));
                }),
                React.createElement(TodoList_1.TodoListProvider, null,
                    React.createElement(TodoList_1.TodoListContext.Consumer, null, function (todolist) {
                        return React.createElement("div", null,
                            React.createElement("div", null,
                                "Items loaded ",
                                todolist.items.length),
                            React.createElement("button", { onClick: function () { return todolist.getItems(); } }, "Load"),
                            React.createElement("button", { onClick: function () { return todolist.reverse(); } }, "Revert"),
                            React.createElement("ul", null, todolist.items.map(function (item) { return React.createElement("li", { key: item.id }, item.title); })));
                    })),
                React.createElement(TodoList_1.TodoListProvider, null,
                    React.createElement(TodoList_1.TodoListConsumer, null, function (todolist) {
                        return React.createElement("div", null,
                            React.createElement("div", null, todolist.state),
                            React.createElement("button", { onClick: function () { return todolist.getItems(); } }, "Load"),
                            React.createElement("button", { onClick: todolist.reverse }, "Revert List"),
                            React.createElement("button", { onClick: function () { return todolist.clearTodoList(); } }, "Clear"),
                            React.createElement("button", { onClick: function () { return todolist.toggleSortOrder(); } }, "Toggle"),
                            React.createElement("button", { onClick: function () { return todolist.nextPage(); } }, "Next"),
                            React.createElement("button", { onClick: function () { return todolist.prevPage(); } }, "Prev"),
                            React.createElement("ul", null, todolist.items.map(function (item) { return React.createElement("li", { key: item.id },
                                item.id,
                                " ",
                                item.title,
                                " ",
                                React.createElement(UserState_1.UserStateProvider, null,
                                    React.createElement(UserInfo, null))); })));
                    })))))), document.getElementById('root'));
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