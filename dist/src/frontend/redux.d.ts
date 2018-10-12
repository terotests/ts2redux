import * as redux from 'redux';
import { ITestModel } from './ng';
export interface State {
    TestModelReducer: ITestModel;
}
export declare const reducers: redux.Reducer<State, redux.AnyAction>;
