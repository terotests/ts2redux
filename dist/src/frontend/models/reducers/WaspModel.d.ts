/*********************************************************************************
 *                                                                                *
 *   Redux Reducers and React Context API Provider/Consumer for state WaspModel   *
 *   Generated by ts2redux from Source file ../WaspModel.ts                       *
 *                                                                                *
 *********************************************************************************/
import { IState } from "./index";
import * as React from "react";
export interface Wasp {
    id?: number;
    x: number;
    y: number;
    dx?: number;
    dy?: number;
    steps?: number;
    color?: string;
}
export interface IContainerPropsMethods {
    addWasp: (pos: {
        x: number;
        y: number;
    }) => any;
    incSpeed: (value: number) => any;
    setColor: (value: {
        waspId: number;
        colorValue: string;
    }) => any;
    step: () => any;
}
export interface IWaspModel {
    speed: number;
    lastId: number;
    wasps: {
        [id: number]: Wasp;
    };
}
export declare type IContainerPropsState = IWaspModel;
export interface IProps extends IContainerPropsState, IContainerPropsMethods {
}
export declare function mapStateToPropsWithKeys<K extends keyof IContainerPropsState>(state: IState, keys: K[]): Pick<IContainerPropsState, K>;
export declare const mapStateToProps: (state: IState) => IWaspModel;
export declare const mapDispatchToProps: (dispatch: any) => IContainerPropsMethods;
export declare function ConnectKeys<K extends keyof IWaspModel, J extends keyof IContainerPropsMethods>(keys: K[], methods: J[]): any;
export declare const StateConnector: any;
/**
 * @generated true
 */
export declare class RWaspModel {
    private _state?;
    private _dispatch?;
    private _getState?;
    constructor(state?: IWaspModel, dispatch?: (action: any) => any, getState?: () => any);
    speed: number;
    lastId: number;
    wasps: {
        [id: number]: Wasp;
    };
    addWasp(pos: {
        x: number;
        y: number;
    }): void;
    static addWasp(pos: {
        x: number;
        y: number;
    }): (dispatcher: any, getState: any) => void;
    incSpeed(value: number): void;
    static incSpeed(value: number): (dispatcher: any, getState: any) => void;
    setColor(value: {
        waspId: number;
        colorValue: string;
    }): void;
    static setColor(value: {
        waspId: number;
        colorValue: string;
    }): (dispatcher: any, getState: any) => void;
    step(): void;
    static step(): (dispatcher: any, getState: any) => void;
}
export declare const WaspModelEnums: {
    WaspModel_speed: string;
    WaspModel_lastId: string;
    WaspModel_wasps: string;
    WaspModel_addWasp: string;
    WaspModel_incSpeed: string;
    WaspModel_setColor: string;
    WaspModel_step: string;
};
export declare const WaspModelReducer: (state: IWaspModel, action: any) => IWaspModel;
/********************************
 * React Context API component   *
 ********************************/
export declare const WaspModelContext: React.Context<IProps>;
export declare const WaspModelConsumer: React.ComponentType<React.ConsumerProps<IProps>>;
export declare class WaspModelProvider extends React.Component {
    state: IWaspModel;
    lastSetState: IWaspModel;
    private __devTools;
    constructor(props: any);
    componentWillUnmount(): void;
    setStateSync(state: IWaspModel): void;
    addWasp(pos: {
        x: number;
        y: number;
    }): void;
    incSpeed(value: number): void;
    setColor(value: {
        waspId: number;
        colorValue: string;
    }): void;
    step(): void;
    render(): JSX.Element;
}
