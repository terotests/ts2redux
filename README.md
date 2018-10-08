
# TypeScript to Swagger

Automatically create Swagger documentation and Express endpoints from TypeScript classes.
The tool supports

- Automatically inferring types from TypeScript function declarations 
- Generating callable service endpoint for Express
- Reading class, interface and method and JSDoc comments into Swagger docs
- Defining parameter and return value Models using TypeScript
- Defining types returned at specific error codes
- Grouping functions using Tags
- `Request` and `Response` as private Service object members (does not pollute interface signature)
- Rewrites only functions, not entire files
- Optional values support
- Private service methods

## How it works?

At command line you run

```
ts2swagger <directory>
```

Then the tool will

1. Locate all classes with **JSDoc** comment `@service <serviceid>` 
2. Locate all intefaces or classes with **JSDoc** comment `/** model true */`
3. It will create Swagger documentation specified with `@swagger <filename>`
4. It will locate all functions having comment `@service <serviceid>` and create express endpoint in them

It is possible to automate creation of interface with tools like nodemon etc.

## Installing

```
npm -g i ts2swagger
```

## Service class JSDoc params

- `@swagger <filename>` output Swagger (OpenAPI 2) file
- `@title <document title>` title of the service
- `@service <serviceid>` used to identify service
- `@endpoint <path>` path where service is located 
- `@version <versionnumber>` for example 1.0.0 or something

```typescript
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
  ping(message:string) : string {
    return `you sent ${message}`
  } 
  async getDevices() :Promise<Device[]> {
    return []
  }
}
```

It will compile that file into Swagger JSON file `/src/swagger/service.json` and write the
Express endpoint if it finds a file with a function which is declared using the service ID

## inteface/class flags

In the service / interface parameters are mapped to GET, POST, PUT, DELETE or PATCH methods
automatically by detecting their value and with some information from the JSDoc comments.

- `@alias <path>` the url where this method is located
- `@queryparam <name>` is the first parameter to be placed to GET query var `?varname=value`
- `@method <httpMethod>` used http method GET, POST, PUT, DELETE or PATCH
- `@tag <name>` group where this function belongs
- `@tagdescription <text>` description for the tag (multiple occurrence override each other)
- `@error <code> <model>` HTTP response code and message which is returned


```typescript
  /**
   * 
   * @alias user
   * @method delete
   * @param id set user to some value
   * @tag user
   * @tagdescription System users
   * @error 401 MyErrorClass
   * @error 404 MyErrorClass
   */
  deleteUser(id:string) : TestUser {
    return {name:'foobar'}
  }  
```

### Private methods

You can declare methods private in TypeScript and they will not be part of the 

```typescript
  private getUser() {
    return this.req.user
  }
```

## Model intefaces / class flags

If interface is returning models

- `@model true` indicate model is ment to be used with services

example

```typescript
/**
 * @model true
 */
export class Device {
  id: number
  name: string
  description?: string 
}
```

## Express bootstrap definition

```typescript
import * as express from 'express'
const app = express()
/**
 * @service myserviceid
 */
function bootstrap(app:any, server:(req,res) => MyService) {
  // The code will be generated in here
}
```

After running `ts2swagger` the function `bootstrap` will be overwritten to have contents

```typescript
function bootstrap(app:any, server:(req,res) => MyService) {
  // Service endpoint for ping
  app.get('/sometest/v1/ping/:message/', async function( req, res ) {
    try {
      res.json( await server(req, res).ping(req.params.message) );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
}
```

It is almost ready to be used as a service, but you have to start it by adding line

```typescript
bootstrap( app, ( req, res ) => new MyService(req, res) )
// and start listening to some port with express
app.listen(1337);
console.log('listening on port 1337');
```

The if you navigate to `http://localhost:1337/sometest/v1/ping/hello` you get
```
"you sent hello"
```

You will also get Swagger documentation in JSON 


## Handling Errors

Define Error model, which must have `statusCode` set to the HTTP status code value.

```typescript
/**
 * @model true
 */
export class ErrorNotFound {
  statusCode = 404
  message?: string
}
```

That class can then be thrown in the service handler

```typescript
  if(somethingwrong) throw ErrorNotFound();
```

The Inteface declaration has error defined like this

```typescript
  /**
   * @error 403 ErrorForbidden
   * @error 404 ErrorNotFound
   */
  async hello(name:string) : Promise<string> {
    if(name==='foo') throw { errorCode:404, message:'User not found'}
    return `Hello ${name}!!!`
  } 
```

## Full Generated Frontend Sample

This is example whith is bootstrap from `src/backend` sample code and includes function
named `bootstrap` which is generated from the `src/backend/sample.ts` and used as both

1. Functional backend service
2. Swagger Document served by `swagger-ui-express`

Also the public folder is served as static so you can begin developing the client app based on
the service.

**NOTE**: only the function `bootstrap` in the example will be overwritten by `ts2swagger`,
you can manually edit other parts of the code as a programmer.

```typescript
import * as express from 'express'
import {MyService} from './sample';

const app = express()

const bodyParser = require('body-parser')
app.use( bodyParser.json() ); 
app.use( express.static('public'))
const swaggerUi = require('swagger-ui-express');

// sample server...
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('../../swagger/sample.json')));

type serverFactory = (req,res) => MyService

/**
 * @service myserviceid
 */
function bootstrap(app:any, server:serverFactory) {
  // Automatically generated endpoint for ping
  app.get('/sometest/v1/ping/:message/', async function( req, res ) {
    try {
      res.json( await server(req, res).ping(req.params.message) );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
  // Automatically generated endpoint for sayHello
  app.get('/sometest/v1/hello/:name/', async function( req, res ) {
    try {
      res.json( await server(req, res).sayHello(req.params.name) );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
  // Automatically generated endpoint for getDevices
  app.get('/sometest/v1/getDevices/', async function( req, res ) {
    try {
      res.json( await server(req, res).getDevices() );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
  // Automatically generated endpoint for upload
  app.post('/sometest/v1/upload/', async function( req, res ) {
    try {
      res.json( await server(req, res).upload() );
    } catch(e) {
      res.status(e.statusCode || 400);
      res.json( e );
    }
  })
}

// initialize the API endpoint
bootstrap( app, ( req, res ) => new MyService(req, res) )

if (!module.parent) {
  app.listen(1337);
  console.log('listening on port 1337');
}  
```

## License

MIT.
