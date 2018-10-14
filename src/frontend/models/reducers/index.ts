import * as redux from 'redux';
import { TestModelReducer, ITestModel } from './TestModel';
import { TodoListReducer, ITodoList } from './TodoList';
import { UserStateReducer, IUserState } from './UserState';
export interface State {
  TestModel: ITestModel
  TodoList: ITodoList
  UserState: IUserState
}
export const reducers = redux.combineReducers<State>({
  TestModel: TestModelReducer,
  TodoList: TodoListReducer,
  UserState: UserStateReducer,
})
