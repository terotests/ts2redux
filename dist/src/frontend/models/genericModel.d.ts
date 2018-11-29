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
    list: SomeList<Summable>;
    refreshSum(): void;
    addItems<T extends Summable>(items: T[]): void;
    inc(): void;
}
