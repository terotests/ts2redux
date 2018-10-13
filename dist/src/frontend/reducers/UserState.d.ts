export interface ContainerPropsMethods {
    login?: (loginInfo: {
        username: string;
        password: string;
    }) => any;
}
export interface IUserState {
    logged: boolean;
    username: string;
    firstName: string;
    lastName: string;
}
export interface ContainerPropsState extends IUserState {
}
export interface Props extends IUserState, ContainerPropsMethods {
}
export declare const StateConnector: any;
/**
 * @generated true
 */
export declare class RUserState {
    private _state?;
    private _dispatch?;
    private _getState?;
    constructor(state?: IUserState, dispatch?: (action: any) => void, getState?: () => IUserState);
    logged: boolean;
    username: string;
    firstName: string;
    lastName: string;
    login(loginInfo: {
        username: string;
        password: string;
    }): Promise<void>;
    static login(loginInfo: {
        username: string;
        password: string;
    }): (dispatcher: any, getState: any) => void;
}
export declare const UserStateEnums: {
    UserState_logged: string;
    UserState_username: string;
    UserState_firstName: string;
    UserState_lastName: string;
};
export declare const UserStateReducer: (state: IUserState, action: any) => IUserState;
