import { State } from './index';
import * as React from 'react';
export interface ContainerPropsMethods {
    login?: (loginInfo: {
        username: string;
        password: string;
    }) => any;
    logout?: () => any;
    fakeLogin?: () => any;
}
export interface IUserState {
    logged: boolean;
    username: string;
    firstName: string;
    lastName: string;
    lastLogin: number;
}
export interface ContainerPropsState extends IUserState {
}
export interface Props extends ContainerPropsState, ContainerPropsMethods {
}
export declare const mapStateToProps: (state: State) => ContainerPropsState;
export declare const mapDispatchToProps: (dispatch: any) => ContainerPropsMethods;
export declare const StateConnector: any;
/**
 * @generated true
 */
export declare class RUserState {
    private _state?;
    private _dispatch?;
    private _getState?;
    constructor(state?: IUserState, dispatch?: (action: any) => void, getState?: () => any);
    logged: boolean;
    username: string;
    firstName: string;
    lastName: string;
    lastLogin: number;
    login(loginInfo: {
        username: string;
        password: string;
    }): Promise<void>;
    static login(loginInfo: {
        username: string;
        password: string;
    }): (dispatcher: any, getState: any) => void;
    logout(): Promise<void>;
    static logout(): (dispatcher: any, getState: any) => void;
    fakeLogin(): void;
    static fakeLogin(): (dispatcher: any, getState: any) => void;
}
export declare const UserStateEnums: {
    UserState_logged: string;
    UserState_username: string;
    UserState_firstName: string;
    UserState_lastName: string;
    UserState_lastLogin: string;
    UserState_fakeLogin: string;
};
export declare const UserStateReducer: (state: IUserState, action: any) => IUserState;
/***************************
* React Context API test   *
***************************/
export declare const UserStateContext: React.Context<Props>;
export declare class UserStateStore extends React.Component {
    state: IUserState;
    __devTools: any;
    constructor(props: any);
    componentWillUnmount(): void;
    login(loginInfo: {
        username: string;
        password: string;
    }): Promise<void>;
    logout(): Promise<void>;
    fakeLogin(): void;
    render(): JSX.Element;
}
/*************************************
* HOC for connecting to properties   *
*************************************/
