/*********************************************************************************
 *                                                                                *
 *   Redux Reducers and React Context API Provider/Consumer for state UserState   *
 *   Generated by ts2redux from Source file ../UserState.ts                       *
 *                                                                                *
 *********************************************************************************/

class UserState {
  logged = false;
  username: string = "anonymous";
  firstName: string;
  lastName: string;
  lastLogin: number;
  async login(loginInfo: { username: string; password: string }) {
    console.log("Login called with ", loginInfo);
  }
  async logout() {}
  fakeLogin() {
    this.username = "Fake Login";
  }
}

import * as immer from "immer";
import { connect } from "react-redux";
import { IState } from "./index";
import * as React from "react";

export interface IContainerPropsMethods {
  login: (
    loginInfo: {
      username: string;
      password: string;
    }
  ) => any;
  logout: () => any;
  fakeLogin: () => any;
}
export interface IUserState {
  logged: boolean;
  username: string;
  firstName: string;
  lastName: string;
  lastLogin: number;
}

export type IContainerPropsState = IUserState;
export interface IProps extends IContainerPropsState, IContainerPropsMethods {}

function pick<T, K extends keyof T>(o: T, ...props: K[]) {
  return props.reduce((a, e) => ({ ...a, [e]: o[e] }), {}) as Pick<T, K>;
}
export function mapStateToPropsWithKeys<K extends keyof IUserState>(
  state: IState,
  keys: K[]
): Pick<IContainerPropsState, K> {
  return pick(state.UserState, ...keys);
}

export const mapStateToProps = (state: IState): IContainerPropsState => {
  return {
    logged: state.UserState.logged,
    username: state.UserState.username,
    firstName: state.UserState.firstName,
    lastName: state.UserState.lastName,
    lastLogin: state.UserState.lastLogin
  };
};

function mapDispatchToPropsWithKeys<K extends keyof IContainerPropsMethods>(
  dispatch: any,
  keys: K[]
): Pick<IContainerPropsMethods, K> {
  return pick(mapDispatchToProps(dispatch), ...keys);
}

export const mapDispatchToProps = (dispatch: any): IContainerPropsMethods => {
  return {
    login: (loginInfo: { username: string; password: string }) => {
      return dispatch(RUserState.login(loginInfo));
    },
    logout: () => {
      return dispatch(RUserState.logout());
    },
    fakeLogin: () => {
      return dispatch(RUserState.fakeLogin());
    }
  };
};

export function ConnectKeys<
  K extends keyof IUserState,
  J extends keyof IContainerPropsMethods
>(keys: K[], methods: J[]) {
  return connect(
    (state: IState) => mapStateToPropsWithKeys(state, keys),
    (dispatch: any) => mapDispatchToPropsWithKeys(dispatch, methods)
  );
}

export const StateConnector = connect(
  mapStateToProps,
  mapDispatchToProps
);

const initUserState = () => {
  const o = new UserState();
  return {
    logged: o.logged,
    username: o.username,
    firstName: o.firstName,
    lastName: o.lastName,
    lastLogin: o.lastLogin
  };
};
const initWithMethodsUserState = () => {
  const o = new UserState();
  return {
    logged: o.logged,
    username: o.username,
    firstName: o.firstName,
    lastName: o.lastName,
    lastLogin: o.lastLogin,
    login: o.login,
    logout: o.logout,
    fakeLogin: o.fakeLogin
  };
};

/**
 * @generated true
 */
export class RUserState {
  private _state?: IUserState;
  private _dispatch?: (action: any) => void;
  private _getState?: () => any;
  constructor(
    state?: IUserState,
    dispatch?: (action: any) => void,
    getState?: () => any
  ) {
    this._state = state;
    this._dispatch = dispatch;
    this._getState = getState;
  }
  get logged(): boolean {
    if (this._getState) {
      return this._getState().UserState.logged;
    } else {
      if (this._state) {
        return this._state.logged;
      }
    }
    throw "Invalid State in UserState_logged";
  }
  set logged(value: boolean) {
    if (this._state && typeof value !== "undefined") {
      this._state.logged = value;
    } else {
      // dispatch change for item logged
      if (this._dispatch) {
        this._dispatch({
          type: UserStateEnums.UserState_logged,
          payload: value
        });
      }
    }
  }
  get username(): string {
    if (this._getState) {
      return this._getState().UserState.username;
    } else {
      if (this._state) {
        return this._state.username;
      }
    }
    throw "Invalid State in UserState_username";
  }
  set username(value: string) {
    if (this._state && typeof value !== "undefined") {
      this._state.username = value;
    } else {
      // dispatch change for item username
      if (this._dispatch) {
        this._dispatch({
          type: UserStateEnums.UserState_username,
          payload: value
        });
      }
    }
  }
  get firstName(): string {
    if (this._getState) {
      return this._getState().UserState.firstName;
    } else {
      if (this._state) {
        return this._state.firstName;
      }
    }
    throw "Invalid State in UserState_firstName";
  }
  set firstName(value: string) {
    if (this._state && typeof value !== "undefined") {
      this._state.firstName = value;
    } else {
      // dispatch change for item firstName
      if (this._dispatch) {
        this._dispatch({
          type: UserStateEnums.UserState_firstName,
          payload: value
        });
      }
    }
  }
  get lastName(): string {
    if (this._getState) {
      return this._getState().UserState.lastName;
    } else {
      if (this._state) {
        return this._state.lastName;
      }
    }
    throw "Invalid State in UserState_lastName";
  }
  set lastName(value: string) {
    if (this._state && typeof value !== "undefined") {
      this._state.lastName = value;
    } else {
      // dispatch change for item lastName
      if (this._dispatch) {
        this._dispatch({
          type: UserStateEnums.UserState_lastName,
          payload: value
        });
      }
    }
  }
  get lastLogin(): number {
    if (this._getState) {
      return this._getState().UserState.lastLogin;
    } else {
      if (this._state) {
        return this._state.lastLogin;
      }
    }
    throw "Invalid State in UserState_lastLogin";
  }
  set lastLogin(value: number) {
    if (this._state && typeof value !== "undefined") {
      this._state.lastLogin = value;
    } else {
      // dispatch change for item lastLogin
      if (this._dispatch) {
        this._dispatch({
          type: UserStateEnums.UserState_lastLogin,
          payload: value
        });
      }
    }
  }

  async login(loginInfo: { username: string; password: string }) {
    console.log("Login called with ", loginInfo);
  }

  public static login(loginInfo: { username: string; password: string }) {
    return (dispatcher: any, getState: any) => {
      new RUserState(undefined, dispatcher, getState).login(loginInfo);
    };
  }
  async logout() {}

  public static logout() {
    return (dispatcher: any, getState: any) => {
      new RUserState(undefined, dispatcher, getState).logout();
    };
  }
  fakeLogin() {
    if (this._state) {
      this.username = "Fake Login";
    } else {
      if (this._dispatch) {
        this._dispatch({ type: UserStateEnums.UserState_fakeLogin });
      }
    }
  }

  public static fakeLogin() {
    return (dispatcher: any, getState: any) => {
      new RUserState(undefined, dispatcher, getState).fakeLogin();
    };
  }
}

export const UserStateEnums = {
  UserState_logged: "UserState_logged",
  UserState_username: "UserState_username",
  UserState_firstName: "UserState_firstName",
  UserState_lastName: "UserState_lastName",
  UserState_lastLogin: "UserState_lastLogin",
  UserState_fakeLogin: "UserState_fakeLogin"
};

export const UserStateReducer = (
  state: IUserState = initUserState(),
  action: any
) => {
  return immer.produce(state, draft => {
    switch (action.type) {
      case UserStateEnums.UserState_logged:
        new RUserState(draft).logged = action.payload;
        break;
      case UserStateEnums.UserState_username:
        new RUserState(draft).username = action.payload;
        break;
      case UserStateEnums.UserState_firstName:
        new RUserState(draft).firstName = action.payload;
        break;
      case UserStateEnums.UserState_lastName:
        new RUserState(draft).lastName = action.payload;
        break;
      case UserStateEnums.UserState_lastLogin:
        new RUserState(draft).lastLogin = action.payload;
        break;
      case UserStateEnums.UserState_fakeLogin:
        new RUserState(draft).fakeLogin();
        break;
    }
  });
};
/********************************
 * React Context API component   *
 ********************************/
export const UserStateContext = React.createContext<IProps>(
  initWithMethodsUserState()
);
export const UserStateConsumer = UserStateContext.Consumer;
let instanceCnt = 1;
export class UserStateProvider extends React.Component {
  public state: IUserState = initUserState();
  public lastSetState: IUserState;
  private __devTools: any = null;
  constructor(props: any) {
    super(props);
    this.lastSetState = this.state;
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.fakeLogin = this.fakeLogin.bind(this);
    const devs = window["__REDUX_DEVTOOLS_EXTENSION__"]
      ? window["__REDUX_DEVTOOLS_EXTENSION__"]
      : null;
    if (devs) {
      this.__devTools = devs.connect({ name: "UserState" + instanceCnt++ });
      this.__devTools.init(this.state);
      this.__devTools.subscribe((msg: any) => {
        if (msg.type === "DISPATCH" && msg.state) {
          this.setState(JSON.parse(msg.state));
        }
      });
    }
  }
  public componentWillUnmount() {
    if (this.__devTools) {
      this.__devTools.unsubscribe();
    }
  }
  public setStateSync(state: IUserState) {
    this.lastSetState = state;
    this.setState(state);
  }
  async login(loginInfo: { username: string; password: string }) {
    new RUserState(
      undefined,
      (action: any) => {
        const nextState = UserStateReducer(this.lastSetState, action);
        if (this.__devTools) {
          this.__devTools.send(action.type, nextState);
        }
        this.setStateSync(nextState);
      },
      () => ({ UserState: this.lastSetState })
    ).login(loginInfo);
  }
  async logout() {
    new RUserState(
      undefined,
      (action: any) => {
        const nextState = UserStateReducer(this.lastSetState, action);
        if (this.__devTools) {
          this.__devTools.send(action.type, nextState);
        }
        this.setStateSync(nextState);
      },
      () => ({ UserState: this.lastSetState })
    ).logout();
  }
  fakeLogin() {
    const nextState = immer.produce(this.state, draft =>
      new RUserState(draft).fakeLogin()
    );
    if (this.__devTools) {
      this.__devTools.send("fakeLogin", nextState);
    }
    this.setStateSync(nextState);
  }
  public render() {
    return (
      <UserStateContext.Provider
        value={{
          ...this.state,
          login: this.login,
          logout: this.logout,
          fakeLogin: this.fakeLogin
        }}
      >
        {" "}
        {this.props.children}
      </UserStateContext.Provider>
    );
  }
}
