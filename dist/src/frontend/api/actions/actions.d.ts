export declare const action_SHOPCARTMODEL_UPDATEITEMS: (payload: any[]) => {
    type: string;
    payload: any[];
};
export declare const fetchAllDispatcher: () => (dispatch: any) => Promise<void>;
export declare const getItemsFromCategoryDispatcher: (id: number) => (dispatch: any) => Promise<void>;
export declare const action_SHOPCARTMODEL_ADDITEM: (payload: any) => {
    type: string;
    payload: any;
};
export declare const RequstAddNewItemDispatcher: (itemName: string) => (dispatch: any) => Promise<void>;
export declare const AnyFnDispatcher: (itemName: string) => (dispatch: any) => Promise<void>;
export declare const action_USERINFOMODEL_SETUSER: (payload: any) => {
    type: string;
    payload: any;
};
export declare const loginUserDispatcher: (username: string, password: string) => (dispatch: any) => Promise<void>;
