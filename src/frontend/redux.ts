import * as redux from 'redux';
// TestModelReducer
// import { userProfileReducer, UserProfileState } from './userProfile';
import { TestModelReducer, ITestModel } from './ng';

export interface State {
  TestModelReducer : ITestModel
};

export const reducers = redux.combineReducers<State>({
  TestModelReducer
});


// export const n = reducers;