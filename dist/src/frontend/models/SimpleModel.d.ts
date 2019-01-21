/**
 * @redux true
 */
export declare class SimpleModel {
    items: any[];
    /**
     * @dispatch true
     * @param action
     */
    SimpleDispatch(action: any): Promise<void>;
    getItems(): Promise<void>;
    readonly myItems: any[];
}
