export declare type TaskState = "UNDEFINED" | "RUNNING" | "LOADED" | "ERROR";
export interface fetchResult {
    data: any;
    state: TaskState;
    stateError: any;
}
export declare type LoadableType = {
    [key: string]: fetchResult;
};
export interface loadable {
    initState(name: string): any;
    setLoadState(opts: {
        name: string;
        state: TaskState;
    }): any;
    setData(opts: {
        name: string;
        data: any;
    }): any;
    setError(opts: {
        name: string;
        err: any;
    }): any;
    loadables: LoadableType;
}
export declare class loadables {
    loadables: LoadableType;
    initState(name: string): void;
    setLoadState(opts: {
        name: string;
        state: TaskState;
    }): void;
    setData(opts: {
        name: string;
        data: any;
    }): void;
    setError(opts: {
        name: string;
        err: any;
    }): void;
    protected loadItems<T extends loadable>(state: T, key: string, loader: () => Promise<any>, ready?: (data: any) => void): Promise<void>;
}
