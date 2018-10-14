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
var memberArea_1 = require("./components/memberArea");
var todoList_1 = require("./components/todoList");
var combinedState_1 = require("./components/combinedState");
var store = redux_1.createStore(reducers_1.reducers, redux_1.compose(redux_1.applyMiddleware(redux_thunk_1.default), window['devToolsExtension'] ? window['devToolsExtension']() : function (f) { return f; }));
// const history = syncHistoryWithStore(hashHistory, store);
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement("div", null,
        React.createElement("div", null,
            React.createElement("b", null, "This is the JSX area")),
        React.createElement(memberArea_1.MemberArea, null),
        React.createElement(combinedState_1.CombinedStates, null),
        React.createElement(todoList_1.TodoList, null))), document.getElementById('root'));
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