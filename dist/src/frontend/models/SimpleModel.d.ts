export declare class itemStorage {
    items: any[];
}
/**
 * @redux true
 */
export declare class SimpleModel extends itemStorage {
    getItems(): Promise<void>;
    readonly myItems: any[];
}
