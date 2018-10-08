import * as express from 'express'
import fs from 'fs'

const app = express()
/** 
 * Freeform test of the API comes here
 * 
 * @swagger /src/swagger/sample.json
 * @title The title of the Doc
 * @service myserviceid
 * @endpoint /sometest/v1/
 * @version 1.0.1  
 */

export class MyService {  
  constructor( private req:express.Request, private res: express.Response) {}

  private getUserName() {

  }
  
  ping(message:string) : string {
    return `you sent ${message}`
  } 
  /**
   * @alias hello
   */
  async sayHello(name:string) : Promise<string> {
    if(name==='foo') throw { errorCode:404, message:'User not found'}
    return `Hello ${name}!!!`
  }   

  getDevices() : Device[] {
    return [{id:1, name:'iPhone'}]
  }   

  /**
   * @method post
   */
  upload() : number {
    // output results to some file...
    // this.req.pipe( )    
    this.req.pipe( fs.createWriteStream(__dirname + '/uploadedFile.bin') )
    return 0
  }     
}


/**
 * @model true
 */
export class Device {
  id: number
  name: string
  description?: string // optional
}