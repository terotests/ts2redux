import * as redux from 'redux';
import { TestModelReducer, ITestModel } from './TestModel';
import { UserStateReducer, IUserState } from './UserState';
export interface State {
  TestModel: ITestModel
  UserState: IUserState
}
export const reducers = redux.combineReducers<State>({
  TestModel: TestModelReducer,
  UserState: UserStateReducer,
})
