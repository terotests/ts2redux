import * as redux from 'redux';
import { ITestModel } from './TestModel';
import { IUserState } from './UserState';
export interface State {
    TestModel: ITestModel;
    UserState: IUserState;
}
export declare const reducers: redux.Reducer<State, redux.AnyAction>;
