
  
import Project, { InterfaceDeclaration, SourceFile, FunctionDeclaration } from "ts-simple-ast";
import * as R from 'robowr'
import * as ProgrammerBase from './programmer/service'
import {getFunctionDoc, getPropertyTypeName, getTypeName, getTypePath} from './utils'

import * as path from 'path'
import { getJSDocTypeParameterTags } from "typescript";

import { printNode } from "ts-simple-ast";
import * as immer from 'immer'

export interface GenerationOptions {
  path: string
}

export interface ModelDefinition { 
  iface:InterfaceDeclaration,
  file:SourceFile,
  initFn?:FunctionDeclaration,
}

export async function createProject( settings:GenerationOptions) {
  const project = new Project();

  project.addExistingSourceFiles([`${settings.path}/**/*.ts`,`${settings.path}/**/*.tsx`]); // , "!**/*.d.ts"
  const RFs = new R.CodeFileSystem()
  
  // create one dummy file for setting the context for the services
  const webclient = RFs.getFile('/src/frontend/api/', 'index.ts').getWriter()
  
  // map services to state
  const services = webclient.getState().services = {}
  
  // Collection of all the UI state models in the system...
  const reduxModels:{[key:string]:ModelDefinition} = {}

  const ifaceHasKey = (iface:InterfaceDeclaration, name:string) : boolean => {
    return iface.getProperties().filter( p => p.getName() == name ).length > 0
  }

  // https://dsherret.github.io/ts-simple-ast/details/interfaces

  project.getSourceFiles().forEach( sourceFile => {
    sourceFile.getInterfaces().forEach( i => {
      if( i.getJsDocs().filter(
           doc =>doc.getTags().filter( tag => tag.getName() === 'redux' ).length > 0
      ).length > 0 ) {
        reduxModels[i.getName()] = {
          iface: i,
          file: sourceFile,
          initFn: null,
        }
        // example of adding property to the interface...
        /*
        if(i.getName() == 'ShopCartModel') {
          i.addProperty({ name: "helloWorld?", type: "TaskState<ShopCartItem>" })
        }
        */
      }       
    })
  })

  // is this the real path ? 
  const ACTIONS_PATH =  '/src/frontend/api/actions/';
  const REDUCERS_PATH =  '/src/frontend/api/reducers/';

  const ng = RFs.getFile('/src/frontend/', 'ng.ts').getWriter()

  const enums = RFs.getFile('/src/frontend/api/common/', 'actionEnums.ts').getWriter()
  const actions = RFs.getFile('/src/frontend/api/actions/', 'actions.ts').getWriter()
  const reducers = RFs.getFile('/src/frontend/api/reducers/', 'reducers.ts').getWriter()

  // TODO:
  // - the model AND the function must be imported...
  reducers.out(`import { actionsEnums } from '../common/actionEnums'`, true)
  actions.out(`import { actionsEnums } from '../common/actionEnums'`, true)

  const actionImportFork = actions.fork()
  const reducerImportFork = reducers.fork()
  const actionImports:{[key:string]:string} = {}
  const reducerImports:{[key:string]:string} = {}
          
  enums.out('export const actionsEnums = {', true)
  enums.indent(1)
  const actionEnums = enums.fork()
  enums.indent(-1)
  enums.out('}', true)  

  const writerCache:{[key:string]:R.CodeWriter} = {}
  const createReducerFn = (modelName:string, model:ModelDefinition) : R.CodeWriter => {
    if(writerCache[modelName]) return writerCache[modelName]
    // Reducer for some UI state is defined like this...
    const initializer = model.initFn ? model.initFn.getName() + '()' : '{}'; 
    reducers.out('', true)
    reducers.out(`export const ${modelName}Reducer = (state:${modelName} = ${initializer}, action) => {`, true)
    reducers.indent(1)
      reducers.out(`switch (action.type) {`, true)
      const actionReducers = reducers.fork()

      const actionFn = "ACTION_"+modelName.toUpperCase() + "_FN"
      actionEnums.out(`${actionFn} : "${actionFn}",`, true)
      actionReducers.indent(1)
      actionReducers.out(`case actionsEnums.${actionFn}:`, true)
        actionReducers.indent(1)
        actionReducers.out(`return action.payload(state) `, true)
        actionReducers.indent(-1)
      actionReducers.indent(-1)
    
      reducers.out('}', true)
      reducers.out('return state', true)
    reducers.indent(-1)
    reducers.out('}', true)   
    writerCache[modelName] = actionReducers
    return actionReducers;  
  }

  // mapeservice classes to the properties
  project.getSourceFiles().forEach( sourceFile => {

    if(path.basename(sourceFile.getFilePath()) == 'ng.ts') return;

    /*
    sourceFile.getVariableDeclarations().forEach( d => {
      console.log('Variable ', d.getName())
      console.log( getTypeName( d.getInitializer().getType()));
      // console.log( getTypeName( d.getInit().getType()));
    })
    */

    sourceFile.getFunctions().forEach( f => {
      // console.log(f.getName())
      // reduxModels
      const returnType = getTypePath(f.getReturnType()).pop()      

      if( f.getParameters().length == 0 ) {
        if(reduxModels[returnType]) {
          // This is initializer function
          reduxModels[returnType].initFn = f;
        }
      }

      const secondParam = f.getParameters()[1]
      if(!secondParam) return
      const payloadType = getTypeName(secondParam.getType())
      const payloadTypePath = getTypePath(secondParam.getType())
      const payloadImportType = payloadTypePath[payloadTypePath.length - 1]
      const isSimpleType = (name:string) : boolean => {
        return name ==='string' || name === 'number' || name === 'boolean'
      }
      if(reduxModels[returnType]) {
        const model = reduxModels[returnType]
        const actionID = (returnType + '_' + f.getName()).toUpperCase()
        const actionName = 'ACTION_'+ actionID;
        actionEnums.out(`${actionName} : "${actionName}",`, true)

        const actionsPath = path.normalize(__dirname.replace('dist/src', '') + ACTIONS_PATH);
        const reducersPath = path.normalize(__dirname.replace('dist/src', '') + REDUCERS_PATH);

        const modelFile = model.file.getFilePath()
        const functionFile = sourceFile.getFilePath();
        
        actionImports[returnType] = path.relative( actionsPath, path.dirname(modelFile)) + '/' + path.basename(modelFile, '.ts')
        reducerImports[returnType] = path.relative( reducersPath, path.dirname(modelFile)) + '/' + path.basename(modelFile, '.ts')
        if(model.initFn) {
          reducerImports[model.initFn.getName()] = path.relative( reducersPath, path.dirname(modelFile)) + '/' + path.basename(modelFile, '.ts')
        }

        // the function is not actually needed to be imported here
        reducerImports[f.getName()] = path.relative( actionsPath, path.dirname(functionFile)) + '/' + path.basename(functionFile, '.ts')
        
        if(!isSimpleType(payloadImportType)) {
          actionImports[payloadImportType] = path.relative( actionsPath, path.dirname(functionFile)) + '/' + path.basename(functionFile, '.ts')
        }

        const actionReducers = createReducerFn(returnType, model)

        actionReducers.indent(1)
        actionReducers.out(`case actionsEnums.${actionName}:`, true)
          actionReducers.indent(1)
          actionReducers.out(`return ${f.getName()}(state, action.payload) `, true)
          actionReducers.indent(-1)
        actionReducers.indent(-1)
        
        actions.out('', true)
        actions.out('// Action which can be dispatched ', true)
        actions.out(`export const action_${actionID} = (payload:${getTypeName(secondParam.getType())}) => { `, true)
        actions.indent(1);
          actions.out('return {', true)
          actions.indent(1)
            actions.out('type : actionsEnums.' + actionName +',', true)
            actions.out('payload',true)
          actions.indent(-1);
          actions.out('}', true)
        actions.indent(-1);
        actions.out('}', true)   

        // Call the function which modifies the state...

        const createTaskFor = (taskFn:FunctionDeclaration) => {

          const taskName = taskFn.getName()
          console.log('Found Task ', taskFn.getName())
          actionImports[taskName] = path.relative( actionsPath, path.dirname(functionFile)) + '/' + path.basename(functionFile, '.ts')          
          
          const filteredParams = taskFn.getParameters().filter( p => p.getName() != 'dispatch' );

          const paramStr = filteredParams.map(
            p => p.getName() + ':' + getTypeName( p.getType() )
          ).join(', ');
          const params = taskFn.getParameters().map(
            p => p.getName()
          ).join(', ');

          let hasState = false
          if(ifaceHasKey(model.iface,taskName)) {
            console.log('MODEL has key ', taskName)
            const upper = taskName.toUpperCase()
            actionEnums.out(`RUNNING_${upper} : "RUNNING_${upper}",`, true)
            actionEnums.out(`ERROR_${upper} : "ERROR_${upper}",`, true)
            actionEnums.out(`SUCCESS_${upper} : "SUCCESS_${upper}",`, true)
            hasState = true
          }
        
          actions.out('', true)
          actions.out('// function which is related to the action... ', true)
          actions.out(`export const ${taskName}Dispatcher = (${paramStr}) => async (dispatch) => { `, true)
          actions.indent(1);
            if(hasState) {
              actions.out('try {', true)
              actions.indent(1)
              actions.out(`dispatch({type:'RUNNONG_${taskName.toUpperCase()}'})`, true)
            }
            // Call the actual function
            actions.out(`const value = await ${taskName}(${params})`, true)
            actions.out(`dispatch( action_${actionID}( value ))`, true)
            if(hasState) {
              actions.out(`dispatch({type:'SUCCESS_${taskName.toUpperCase()}', payload:value})`, true)              
              actions.indent(-1)
              actions.out('} catch(e) {', true)
              actions.indent(1)
              actions.out(`dispatch({type:'ERROR_${taskName.toUpperCase()}', payload:e})`, true)
              actions.indent(-1)
              actions.out('}', true)
            }
          actions.indent(-1);
          actions.out('}', true)         
        }

        const taskFn = sourceFile.getFunctions().filter( fn => {
            // const returnV = getTypePath( fn.getReturnType() ).pop()
            const isReducer = fn.getJsDocs().filter(
              doc =>doc.getTags().filter( tag => (tag.getName() === 'taskfor') && tag.getComment()==f.getName() ).length > 0
            ).length > 0
            return isReducer
          })
          .forEach(createTaskFor)               

      }
    })
    sourceFile.getClasses().forEach( c=>{
      console.log(c.getName())
      if( c.getJsDocs().filter(
        doc =>doc.getTags().filter( tag => tag.getName() === 'simpleredux' ).length > 0
      ).length > 0 ) {      
        ng.raw(sourceFile.getText(), true)
        ng.out(`import * as immer from 'immer'`, true)
        // Create model of all the variables...
        ng.out('export interface I' + c.getName()+ ' {', true)
        ng.indent(1)
          c.getProperties().forEach( p => {
            ng.out(printNode(p.getNameNode().compilerNode)+': ' + printNode( p.getTypeNode().compilerNode ), true)
            //ng.out('/*', true)
            // ng.out(printNode(p.compilerNode), true)
            // ng.out(printNode(p.getTypeNode().compilerNode), true)
            //ng.out('*/', true)
          })
        ng.indent(-1)
        ng.out('}', true)

        // Create model of all the variables...
        ng.out('class R' + c.getName()+ ' {', true)
        ng.indent(1)
        const body = ng.fork()
        ng.indent(-1)
        ng.out('}', true) 

        ng.out('', true)
        ng.out(`export const ${c.getName()}Enums = {`, true)
        ng.indent(1)
        const ng_enums = ng.fork()
        ng.indent(-1)
        ng.out('}', true) 
        ng.out('', true)


        ng.out(`export const ${c.getName()}Reducer = (state:I${c.getName()} /* todo: init*/, action) => {`, true)
        ng.indent(1)
          ng.out('return immer.produce(state, draft => {', true)
          ng.indent(1)
            ng.out(`switch (action.type) {`, true)
            ng.indent(1)
            const ng_reducers = ng.fork()
            ng.indent(-1)
            ng.out('}', true)
          ng.indent(-1)
          ng.out('})', true)
        ng.indent(-1)
        ng.out('}', true)   
            
        

          body.out('private _state?: I'+c.getName(), true)
          body.out('private _dispatch?: (action:any)=>void', true)

          body.out(`constructor(state?: I${c.getName()}, dispatch?:(action:any)=>void) {`, true)
            body.indent(1)
            body.out('this._state = state', true)
            body.out('this._dispatch = dispatch', true)
            body.indent(-1)
          body.out('}', true)
          /*c.getProperties().forEach( p => {
            body.out('private _' + p.getName()+': ' + printNode(p.getTypeNode().compilerNode), true)
          })
          */
/*
export const ShopCartModelReducer = (state:ITestModel = {}, action) => {
  switch (action.type) {
    (new TestModel(state)).
  }
}
*/
          c.getProperties().forEach( p => {
            const r_name = `${c.getName()}_${p.getName()}`
            body.out('get ' + p.getName()+'() : ' + printNode(p.getTypeNode().compilerNode) + '{', true)
            body.indent(1)
            body.out('return this._state.'+p.getName(), true)
            body.indent(-1)
            body.out('}', true)
            body.out('set ' + p.getName()+'(value:' + printNode(p.getTypeNode().compilerNode) + ') {', true)
            body.indent(1)
            body.out('if(this._state) {', true)
              body.indent(1)
              body.out(`this._state.${p.getName()} = value`, true)
              body.indent(-1)
            body.out('} else {', true)
              body.indent(1)
              body.out(`// dispatch change for item ${p.getName()}`, true)
              body.out(`this._dispatch({type:'${r_name}', payload:value})`, true)
              body.indent(-1)
            body.out('}', true)
            // body.out('this._'+p.getName()+' = value', true)
            body.indent(-1)
            body.out('}', true)
            ng_enums.out(`${r_name} : '${r_name}',`, true)

            ng_reducers.out(`case ${c.getName()}Enums.${r_name}: `, true)
            ng_reducers.indent(1)
            ng_reducers.out(`(new R${c.getName()}(draft)).${p.getName()} = action.payload`, true);
            ng_reducers.out('break;', true)
            ng_reducers.indent(-1)
          
            // ng_reducers
          })

          body.out('', true)
          c.getMethods().forEach( m => {
            if(m.isAsync()) {
              body.out('// is task', true)
              body.raw( printNode(m.compilerNode) , true)    
            } else {
              body.out('// is a reducer', true)
              const r_name = `${c.getName()}_${m.getName()}`
              const param_name = m.getParameters().length > 0 ? 'action.payload' : '';
              ng_enums.out(`${r_name} : '${r_name}',`, true)              
              ng_reducers.out(`case ${c.getName()}Enums.${r_name}: `, true)
              ng_reducers.indent(1)
              ng_reducers.out(`(new R${c.getName()}(draft)).${m.getName()}(${param_name})`, true);
              ng_reducers.out('break;', true)
              ng_reducers.indent(-1)
              
              body.raw( m.getModifiers().map( mod => printNode(mod.compilerNode) ).join(' ') )
              body.out( m.getName() + '(' +  m.getParameters().map( mod => printNode(mod.compilerNode) ).join(', ') + ')')
              if(m.getReturnTypeNode()) body.out( ': ' + printNode( m.getReturnTypeNode().compilerNode ) )
              body.out( '{', true)
                body.indent(1)
                body.out('if(this._state) {', true)
                  body.indent(1)
                  m.getBody().forEachChild( ch => {
                    body.out(printNode(ch.compilerNode), true)
                  })
                  body.indent(-1)
                body.out('} else {', true)
                  const firstParam = m.getParameters().filter( (a,i) => i<1).map( mod => mod.getName() ).join('')
                  const fpCode = firstParam.length > 0 ? `,payload: ${firstParam} ` : '';
                  body.indent(1)
                  body.out(`this._dispatch({type:'${r_name}'${fpCode}})`, true)    
                  body.indent(-1)
                  body.out('}', true)
                body.indent(-1)
              body.out('}', true)
              // body.raw( printNode(m.compilerNode) , true)    


            }
                    
            m.getBody().forEachChild( n => {
              
            })
          })
          
       

      }
    })  
    /*
    sourceFile.getClasses().forEach( c=>{
      if( services[c.getName()] ) {
        const serviceinfo:any = services[c.getName()]
        ProgrammerBase.initSwagger( webclient, serviceinfo )
        const injectWriter = new R.CodeWriter();      
        c.getMethods().forEach( m => {
          ProgrammerBase.WriteEndpoint( injectWriter, project, c, m )
          // if(clientWriter) ProgrammerBase.WriteClientEndpoint( clientWriter, project, c, m )
        })  
        // inject declaration to some function...
        project.getSourceFiles().forEach( s => {
          s.getFunctions().forEach( f => {
            const info = getFunctionDoc(f)
            // console.log(f.getName(), info)
            if(info.tags.service === serviceinfo.service ) {
              f.setBodyText(writer => {
                writer.setIndentationLevel('  ').write(injectWriter.getCode())
              }) 
            }
          })
        })
        // create swagger file
        const swaggerPath:any = serviceinfo.swagger;
        if( swaggerPath ) {
          const swagger = RFs.getFile(path.dirname(swaggerPath), path.basename(swaggerPath)).getWriter()
          swagger.raw( JSON.stringify( swagger.getState().swagger, null, 2 ) )        
        }        
      }
    }) 
    */       
  })  

  Object.keys( actionImports ).forEach( im => {
    const pathName = actionImports[im]
    actionImportFork.out(`import { ${im} } from '${pathName}'`, true)
  })

  Object.keys( reducerImports ).forEach( im => {
    const pathName = reducerImports[im]
    reducerImportFork.out(`import { ${im} } from '${pathName}'`, true)
  })  

  await RFs.saveTo('./', false );
  await project.save()  
  console.log('Project saved')
}
