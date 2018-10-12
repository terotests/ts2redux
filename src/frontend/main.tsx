import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
// import { Router, Route, IndexRoute, hashHistory } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux'
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {reducers} from './redux'
import {MembersAreaContainer} from './components/memberAreaContainer';


let store = createStore(
  reducers,
  compose(
    applyMiddleware(reduxThunk),
    window['devToolsExtension'] ? window['devToolsExtension']() : f => f
  )  
);

// const history = syncHistoryWithStore(hashHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <div><b>This is the JSX area</b></div>
      <MembersAreaContainer/>
    </div>
  </Provider>,
  document.getElementById('root')
);
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