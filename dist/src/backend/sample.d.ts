import * as express from 'express';
/**
 * Freeform test of the API comes here
 *
 * @swagger /src/swagger/sample.json
 * @title The title of the Doc
 * @service myserviceid
 * @endpoint /sometest/v1/
 * @version 1.0.1
 */
export declare class MyService {
    private req;
    private res;
    constructor(req: express.Request, res: express.Response);
    private getUserName;
    ping(message: string): string;
    /**
     * @alias hello
     */
    sayHello(name: string): Promise<string>;
    getDevices(): Device[];
    /**
     * @method post
     */
    upload(): number;
}
/**
 * @model true
 */
export declare class Device {
    id: number;
    name: string;
    description?: string;
}
