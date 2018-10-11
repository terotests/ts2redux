export interface ShopCartItem {
    name: string;
}
export interface ITestModel {
    items: ShopCartItem[];
    cnt: number;
}
export declare const TestModelEnums: {
    TestModel_items: string;
    TestModel_cnt: string;
    TestModel_add: string;
    TestModel_inc: string;
};
export declare const TestModelReducer: (state: ITestModel, action: any) => ITestModel;
