/**
 * @model true
 */
export declare class SomeKeyWord {
    name: string;
}
/**
 * @model true
 */
export declare class ErrorNotFound {
    statusCode: number;
    message?: string;
}
/**
 * @model true
 */
export declare class ErrorForbidden {
    statusCode: number;
    message?: string;
}
/**
 * @model true
 */
export declare class SomeReturnValue {
    myValue: number;
    response: string;
    someList: string[];
    keys: SomeKeyWord[];
}
/**
 * @model true
 */
export declare class CreateDevice {
    name: string;
    description: string;
}
/**
 * @model true
 */
export declare class CreateUser {
    name: string;
    address: string;
    age: number;
}
/**
 * @model true
 */
export interface TestUser {
    name: string;
    isHidden?: boolean;
}
/**
 * @model true
 */
export declare class Device {
    id: number;
    name: string;
}
