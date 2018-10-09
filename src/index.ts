
  
import Project, { InterfaceDeclaration, SourceFile, FunctionDeclaration } from "ts-simple-ast";
import * as R from 'robowr'
import * as ProgrammerBase from './programmer/service'
import {getFunctionDoc, getPropertyTypeName, getTypeName, getTypePath} from './utils'

import * as path from 'path'
import { getJSDocTypeParameterTags } from "typescript";

export interface GenerationOptions {
  path: string
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
  const reduxModels:{[key:string]:{
    iface:InterfaceDeclaration,
    file:SourceFile
  }} = {}

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
          file: sourceFile 
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
  const createReducerFn = (modelName:string) : R.CodeWriter => {
    if(writerCache[modelName]) return writerCache[modelName]
    // Reducer for some UI state is defined like this...
    reducers.out('', true)
    reducers.out(`export const ${modelName}Reducer = (state:${modelName} /* TODO: default state here*/, action) => {`, true)
    reducers.indent(1)
      reducers.out(`switch (action.type) {`, true)
      const actionReducers = reducers.fork()
      reducers.out('}', true)
      reducers.out('return state', true)
    reducers.indent(-1)
    reducers.out('}', true)   
    writerCache[modelName] = actionReducers
    return actionReducers;  
  }

  // mapeservice classes to the properties
  project.getSourceFiles().forEach( sourceFile => {

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
        reducerImports[returnType] = path.relative( actionsPath, path.dirname(modelFile)) + '/' + path.basename(modelFile, '.ts')

        // the function is not actually needed to be imported here
        reducerImports[f.getName()] = path.relative( actionsPath, path.dirname(functionFile)) + '/' + path.basename(functionFile, '.ts')
        
        if(!isSimpleType(payloadImportType)) {
          actionImports[payloadImportType] = path.relative( actionsPath, path.dirname(functionFile)) + '/' + path.basename(functionFile, '.ts')
        }

        const actionReducers = createReducerFn(returnType)

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
              doc =>doc.getTags().filter( tag => tag.getName() === 'reducer' && tag.getComment()==f.getName() ).length > 0
            ).length > 0
            return isReducer
          })
          .forEach(createTaskFor)        

        /*
        actions.out('', true)
        actions.out('// function which is related to the action... ', true)
        actions.out(`export const fn_${actionID} = (payload:${getTypeName(secondParam.getType())}) => (dispatcher) => { `, true)
        actions.indent(1);
          // Call the actual function
          actions.out('return {', true)
          actions.indent(1)
            actions.out('type : actionsEnums.' + actionName +',', true)
            actions.out('payload',true)
          actions.indent(-1);
          actions.out('}', true)
        actions.indent(-1);
        actions.out('}', true)  
        */        


/*
const actionMapping = {
  [LOAD_REQUEST]: loadRequest,
  [LOAD_SUCCESS]: loadSuccess,
  [LOAD_SINGLE_REQUEST]: loadSingleRequest,
  [LOAD_SINGLE_SUCCESS]: loadSingleSuccess,
  [LOAD_NEW]: loadNewSuccess,
  [LOAD_ERROR]: loadError,

  [CREATE_REQUEST]: createRequest,
  [CREATE_SUCCESS]: createSuccess,
  [CREATE_ERROR]: createError,
*/


      }
      /*
      export const memberRequestCompleted = (members: MemberEntity[]) => {
        return {
          type: actionsEnums.MEMBER_REQUEST_COMPLETED,
          payload: members
        }
      }*/
    })
    sourceFile.getClasses().forEach( c=>{
      
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
