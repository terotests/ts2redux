

/**
 * @model true 
 */
export class SomeKeyWord {
  name = ''
}

/**
 * @model true
 */
export class ErrorNotFound {
  statusCode = 404
  message?: string
}


/**
 * @model true
 */
export class ErrorForbidden {
  statusCode = 403
  message?: string
}


/**
 * @model true 
 */
export class SomeReturnValue {
  myValue = 100
  response = ''
  someList : string[]
  keys : SomeKeyWord[]
}


/**
 * @model true 
 */
export class CreateDevice {
  name: string
  description: string
}

/**
 * @model true 
 */
export class CreateUser {
  name: string
  address: string
  age:number
}

/**
 * @model true 
 */
export interface TestUser {
  name:string
  isHidden?:boolean
}

/**
 * @model true
 */
export class Device {
  id: number
  name: string
}
