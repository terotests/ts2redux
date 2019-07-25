import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware, compose, AnyAction, Store } from "redux";
// import { Router, Route, IndexRoute, hashHistory } from 'react-router';
// import { syncHistoryWithStore } from 'react-router-redux'
import reduxThunk from "redux-thunk";
import { Provider } from "react-redux";
import { reducers, IState } from "./models/reducers/";
import {
  TodoListContext,
  TodoListProvider,
  TodoListConsumer,
  TodoListEnums
} from "./models/reducers/TodoList";

import {
  UserStateContext,
  UserStateProvider
} from "./models/reducers/UserState";

import { IncModelConsumer, IncModelProvider } from "./models/reducers/IncModel";

import { GenericRedux } from "./components/GenericComp";
import { MemberArea } from "./components/memberArea";
import { TodoList } from "./components/todoList";
import { ReduxInc } from "./components/ReduxInc";
import { CombinedStates } from "./components/combinedState";
import * as todo from "./models/TodoList";
import {
  WaspModelProvider,
  WaspModelConsumer
} from "./models/reducers/WaspModel";
import { WaspComponent } from "./components/WaspComponent";
import { TetrisComponent } from "./components/TetrisComponent";
import { WaspContextComponent } from "./components/WaspContextComponent";
import {
  UIHelperModelProvider,
  UIHelperModelConsumer
} from "./models/reducers/UIHelperModel";
import { TodoListItem } from "./models/interfaces";

let store = createStore(
  reducers,
  compose(
    applyMiddleware(reduxThunk),
    window["__REDUX_DEVTOOLS_EXTENSION__"]
      ? window["__REDUX_DEVTOOLS_EXTENSION__"]()
      : f => f
  )
);

// Testing...
export class TodoStoreController {
  private _store: Store<IState, AnyAction>;

  constructor(store: Store<IState, AnyAction>) {
    this._store = store;
  }

  set items(value: TodoListItem[]) {
    this._store.dispatch({
      type: TodoListEnums.TodoList_items,
      payload: value
    });
  }

  async getItems() {
    const items = await new Promise<TodoListItem[]>(resolve => {
      setTimeout(() => {
        resolve([
          {
            userId: 1,
            completed: true,
            title: "Generated Item 1 ",
            id: 1
          }
        ]);
      }, 1000);
    });
    this.items = items;
    return items;
  }
}

const engine = new TodoStoreController(store);

class Nro {
  val = 0;
  constructor(n: number) {
    this.val = n;
  }
  value() {
    return this.val;
  }
}

const listValue = new todo.TodoList();
const Ctx = React.createContext(listValue);
// const history = syncHistoryWithStore(hashHistory, store);

const UserInfo = props => (
  <UserStateContext.Consumer>
    {state => {
      return (
        <div>
          USER: {state.username}
          <button onClick={state.fakeLogin}>Fake Login</button>
        </div>
      );
    }}
  </UserStateContext.Consumer>
);

ReactDOM.render(
  <Provider store={store}>
    <Ctx.Provider value={listValue}>
      <button
        onClick={async () => {
          console.log("items : ", await engine.getItems());
        }}
      >
        Get Them
      </button>
      <TodoList />
      <GenericRedux />
      <TetrisComponent />
      <UserStateProvider>
        <UIHelperModelProvider>
          <UIHelperModelConsumer>
            {state => (
              <div>
                <button onClick={state.toggle}>Show / Hide Wasps</button>
                {state.showWasps ? (
                  <div>
                    <WaspComponent />
                    <WaspModelProvider>
                      <WaspContextComponent />
                    </WaspModelProvider>
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </UIHelperModelConsumer>
        </UIHelperModelProvider>

        <IncModelProvider>
          <IncModelConsumer>
            {state => (
              <div>
                <div>{state.cnt}</div>
                <button onClick={state.increment}>+</button>
                <button onClick={state.decrement}>-</button>
              </div>
            )}
          </IncModelConsumer>
        </IncModelProvider>
        <ReduxInc />
        <div>
          <MemberArea />
          <CombinedStates />
        </div>
        <div>
          <h4>Context API test</h4>

          <UserStateContext.Consumer>
            {state => {
              return (
                <div>
                  USER: {state.username}
                  <button onClick={state.fakeLogin}>Fake Login</button>
                </div>
              );
            }}
          </UserStateContext.Consumer>

          <TodoListProvider>
            <TodoListContext.Consumer>
              {todolist => {
                return (
                  <div>
                    <div>Items loaded {todolist.items.length}</div>
                    <button onClick={() => todolist.getItems()}>Load</button>
                    <button onClick={() => todolist.reverse()}>Revert</button>
                    <button
                      onClick={async () => {
                        console.log(await todolist.getShortList(false));
                        try {
                          console.log(await todolist.getShortList(true));
                        } catch (e) {
                          console.log(e);
                        }
                      }}
                    >
                      Test async function
                    </button>
                    <div>{todolist.customMessage}</div>
                    <ul>
                      {todolist.items.map(item => (
                        <li key={item.id}>{item.title}</li>
                      ))}
                    </ul>
                  </div>
                );
              }}
            </TodoListContext.Consumer>
          </TodoListProvider>

          <TodoListProvider>
            <TodoListConsumer>
              {todolist => {
                return (
                  <div>
                    <div>{todolist.state}</div>
                    <button onClick={() => todolist.getItems()}>Load</button>
                    <button onClick={todolist.reverse}>Revert List</button>
                    <button onClick={() => todolist.clearTodoList()}>
                      Clear
                    </button>
                    <button onClick={() => todolist.toggleSortOrder()}>
                      Toggle
                    </button>
                    <button onClick={() => todolist.nextPage()}>Next</button>
                    <button onClick={() => todolist.prevPage()}>Prev</button>
                    <ul>
                      {todolist.items.map(item => (
                        <li key={item.id}>
                          {item.id} {item.title}{" "}
                          <UserStateProvider>
                            <UserInfo />
                          </UserStateProvider>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              }}
            </TodoListConsumer>
          </TodoListProvider>
        </div>
      </UserStateProvider>
    </Ctx.Provider>
  </Provider>,
  document.getElementById("root")
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
