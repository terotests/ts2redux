import * as redux from 'redux';
import { ITestModel } from './TestModel';
import { ITodoList } from './TodoList';
import { IUserState } from './UserState';
export interface State {
    TestModel: ITestModel;
    TodoList: ITodoList;
    UserState: IUserState;
}
export declare const reducers: redux.Reducer<State, redux.AnyAction>;
