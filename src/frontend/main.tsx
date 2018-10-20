import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
// import { Router, Route, IndexRoute, hashHistory } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux'
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { reducers } from './models/reducers/'
import { TodoListContext, TodoListStore } from './models/reducers/TodoList'
import { UserStateContext, UserStateStore } from './models/reducers/UserState'
import { MemberArea } from './components/memberArea';
import { TodoList } from './components/todoList';
import { CombinedStates } from './components/combinedState';
import * as todo from './models/TodoList'

let store = createStore(
  reducers,
  compose(
    applyMiddleware(reduxThunk),
    window['devToolsExtension'] ? window['devToolsExtension']() : f => f
  )  
);

const listValue = new todo.TodoList()
const Ctx = React.createContext( listValue )
// const history = syncHistoryWithStore(hashHistory, store);

const UserInfo = (props) => <UserStateContext.Consumer>{
  (state) => {
    return <div>
      USER: {state.username}<button onClick={state.fakeLogin}>Fake Login</button>
    </div>
  }
}</UserStateContext.Consumer>

ReactDOM.render(
  <Provider store={store}>
    
    <Ctx.Provider value={listValue}>
      <UserStateStore>
      <div>
        <div><b>This is the JSX area</b></div>
        <MemberArea/>
        <CombinedStates/>
        <TodoList/>
      </div>
      <div> 
        <h4>Context API test</h4>
        
          <UserStateContext.Consumer>{
            (state) => {
              return <div>
                USER: {state.username}<button onClick={state.fakeLogin}>Fake Login</button>
              </div>
            }
          }</UserStateContext.Consumer>
        
        <TodoListStore>
          <TodoListContext.Consumer>{
            (todolist) => {
              return <div>
                  <div>Items loaded {todolist.items.length}</div>
                  <button onClick={() => todolist.getItems()}>Load</button>
                  <button onClick={() => todolist.reverse()}>Revert</button>
                  <ul>{
                    todolist.items.slice(0,6).map( item => <li key={item.id}>{item.title}</li>)
                  }</ul>
                </div>
            }
          }</TodoListContext.Consumer>          
        </TodoListStore>

        <TodoListStore>
          <TodoListContext.Consumer>{
            (todolist) => {
              return <div>
                  <div>{todolist.state}</div>
                  <button onClick={() => todolist.getItems()}>Load</button>
                  <button onClick={() => todolist.reverse()}>Revert</button>
                  <button onClick={() => todolist.clearTodoList()}>Clear</button>
                  <ul>{
                    todolist.items.slice(0,10).map( item => <li key={item.id}>{item.title} <UserStateStore><UserInfo/></UserStateStore></li>) 
                  }</ul>
                </div>
            }
          }</TodoListContext.Consumer>          
        </TodoListStore>

      </div>
      </UserStateStore>
    </Ctx.Provider>
    
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