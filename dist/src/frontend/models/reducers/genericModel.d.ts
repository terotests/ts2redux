/************************************************************************************
 *                                                                                   *
 *   Redux Reducers and React Context API Provider/Consumer for state GenericModel   *
 *   Generated by ts2redux from Source file ../genericModel.ts                       *
 *                                                                                   *
 ************************************************************************************/
import { IState } from "./index";
import * as React from "react";
export interface Summable {
    value: () => number;
}
export declare class SomeList<T extends Summable> {
    items: T[];
    forItems(fn: (item: T) => void): void;
    addItems(items: T[]): void;
}
/**
 * @redux true
 */
export declare class GenericModel {
    sum: number;
    isLoading: {
        [key: string]: boolean;
    };
    list: SomeList<Summable>;
    refreshSum(): void;
    addItems<T extends Summable>(items: T[]): void;
    inc(): void;
    testLoading(): Promise<void>;
}
export interface IContainerPropsMethods {
    refreshSum: () => any;
    addItems: <T extends Summable>(items: T[]) => any;
    inc: () => any;
    testLoading: () => any;
}
export interface IGenericModel {
    sum: number;
    isLoading: {
        [key: string]: boolean;
    };
    list: SomeList<Summable>;
}
export declare type IContainerPropsState = IGenericModel;
export interface IProps extends IContainerPropsState, IContainerPropsMethods {
}
export declare function mapStateToPropsWithKeys<K extends keyof IContainerPropsState>(state: IState, keys: K[]): Pick<IContainerPropsState, K>;
export declare const mapStateToProps: (state: IState) => IGenericModel;
export declare const mapDispatchToProps: (dispatch: any) => IContainerPropsMethods;
export declare function ConnectKeys<K extends keyof IGenericModel, J extends keyof IContainerPropsMethods>(keys: K[], methods: J[]): any;
export declare const StateConnector: any;
/**
 * @generated true
 */
export declare class RGenericModel {
    private _state?;
    private _dispatch?;
    private _getState?;
    constructor(state?: IGenericModel, dispatch?: (action: any) => void, getState?: () => any);
    sum: number;
    isLoading: {
        [key: string]: boolean;
    };
    list: SomeList<Summable>;
    refreshSum(): void;
    static refreshSum(): (dispatcher: any, getState: any) => void;
    addItems<T extends Summable>(items: T[]): void;
    static addItems<T extends Summable>(items: T[]): (dispatcher: any, getState: any) => void;
    inc(): void;
    static inc(): (dispatcher: any, getState: any) => void;
    testLoading(): Promise<void>;
    static testLoading(): (dispatcher: any, getState: any) => void;
}
export declare const GenericModelEnums: {
    GenericModel_sum: string;
    GenericModel_isLoading: string;
    GenericModel_list: string;
    GenericModel_refreshSum: string;
    GenericModel_addItems: string;
    GenericModel_inc: string;
};
export declare const GenericModelReducer: (state: IGenericModel, action: any) => IGenericModel;
/********************************
 * React Context API component   *
 ********************************/
export declare const GenericModelContext: React.Context<IProps>;
export declare const GenericModelConsumer: React.ComponentType<React.ConsumerProps<IProps>>;
export declare class GenericModelProvider extends React.Component {
    state: IGenericModel;
    lastSetState: IGenericModel;
    private __devTools;
    constructor(props: any);
    componentWillUnmount(): void;
    setStateSync(state: IGenericModel): void;
    refreshSum(): void;
    addItems<T extends Summable>(items: T[]): void;
    inc(): void;
    testLoading(): Promise<void>;
    render(): JSX.Element;
}
