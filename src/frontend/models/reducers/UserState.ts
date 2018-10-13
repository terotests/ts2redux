class UserState {

  logged:boolean = false
  username: string
  firstName: string
  lastName: string

  async login(loginInfo:{username:string, password:string}) {

  }
}

import * as immer from 'immer'
import { connect } from 'react-redux'
import { State } from './index'

export interface ContainerPropsMethods {
  login? : (loginInfo: {
  username: string;
  password: string;
  }) => any
}
export interface IUserState {
  logged: boolean
  username: string
  firstName: string
  lastName: string
}

export interface ContainerPropsState extends IUserState {}
export interface Props extends IUserState, ContainerPropsMethods {}
const mapStateToProps = (state : State) : ContainerPropsState => {
  return {
    logged: state.UserState.logged,
    username: state.UserState.username,
    firstName: state.UserState.firstName,
    lastName: state.UserState.lastName,
  }
}
const mapDispatchToProps = (dispatch) : ContainerPropsMethods => {
  return {
    login : (loginInfo: {
    username: string;
    password: string;
    }) => {
      return dispatch(RUserState.login(loginInfo))
    },
  }
}
export const StateConnector = connect( mapStateToProps, mapDispatchToProps);

const init_UserState = () => {
  const o = new UserState();
  return {
    logged: o.logged,
    username: o.username,
    firstName: o.firstName,
    lastName: o.lastName,
  }
}

/**
 * @generated true
 */
export class RUserState {
  private _state?: IUserState
  private _dispatch?: (action:any)=>void
  private _getState?: ()=>any
  constructor(state?: IUserState, dispatch?:(action:any)=>void, getState?:()=>IUserState) {
    this._state = state
    this._dispatch = dispatch
    this._getState = getState
  }
  get logged() : boolean{
    if(this._getState) {
      return this._getState().UserState.logged
    } else {
      return this._state.logged
    }
  }
  set logged(value:boolean) {
    if(this._state) {
      this._state.logged = value
    } else {
      // dispatch change for item logged
      this._dispatch({type:'UserState_logged', payload:value})
    }
  }
  get username() : string{
    if(this._getState) {
      return this._getState().UserState.username
    } else {
      return this._state.username
    }
  }
  set username(value:string) {
    if(this._state) {
      this._state.username = value
    } else {
      // dispatch change for item username
      this._dispatch({type:'UserState_username', payload:value})
    }
  }
  get firstName() : string{
    if(this._getState) {
      return this._getState().UserState.firstName
    } else {
      return this._state.firstName
    }
  }
  set firstName(value:string) {
    if(this._state) {
      this._state.firstName = value
    } else {
      // dispatch change for item firstName
      this._dispatch({type:'UserState_firstName', payload:value})
    }
  }
  get lastName() : string{
    if(this._getState) {
      return this._getState().UserState.lastName
    } else {
      return this._state.lastName
    }
  }
  set lastName(value:string) {
    if(this._state) {
      this._state.lastName = value
    } else {
      // dispatch change for item lastName
      this._dispatch({type:'UserState_lastName', payload:value})
    }
  }
  
  // is task
  async login(loginInfo: {
      username: string;
      password: string;
  }) {
  }
  
  static login(loginInfo: {
  username: string;
  password: string;
  }){
    return (dispatcher, getState) => {
      (new RUserState(null, dispatcher, getState)).login(loginInfo)
    }
  }
}

export const UserStateEnums = {
  UserState_logged : 'UserState_logged',
  UserState_username : 'UserState_username',
  UserState_firstName : 'UserState_firstName',
  UserState_lastName : 'UserState_lastName',
}

export const UserStateReducer = (state:IUserState = init_UserState(), action) => {
  return immer.produce(state, draft => {
    switch (action.type) {
      case UserStateEnums.UserState_logged: 
        (new RUserState(draft)).logged = action.payload
        break;
      case UserStateEnums.UserState_username: 
        (new RUserState(draft)).username = action.payload
        break;
      case UserStateEnums.UserState_firstName: 
        (new RUserState(draft)).firstName = action.payload
        break;
      case UserStateEnums.UserState_lastName: 
        (new RUserState(draft)).lastName = action.payload
        break;
    }
  })
}
