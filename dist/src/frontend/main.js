"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var redux_1 = require("redux");
// import { Router, Route, IndexRoute, hashHistory } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux'
var redux_thunk_1 = require("redux-thunk");
var react_redux_1 = require("react-redux");
var redux_2 = require("./redux");
var memberAreaContainer_1 = require("./components/memberAreaContainer");
var store = redux_1.createStore(redux_2.reducers, redux_1.compose(redux_1.applyMiddleware(redux_thunk_1.default), window['devToolsExtension'] ? window['devToolsExtension']() : function (f) { return f; }));
// const history = syncHistoryWithStore(hashHistory, store);
ReactDOM.render(React.createElement(react_redux_1.Provider, { store: store },
    React.createElement("div", null,
        React.createElement("div", null,
            React.createElement("b", null, "This is the JSX area")),
        React.createElement(memberAreaContainer_1.MembersAreaContainer, null))), document.getElementById('root'));
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