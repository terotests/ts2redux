
  
import Project, { InterfaceDeclaration, SourceFile, FunctionDeclaration, ClassDeclaration, ImportDeclaration, ImportDeclarationStructure} from "ts-simple-ast";
import * as R from 'robowr'
import * as ProgrammerBase from './programmer/service'
import {getFunctionDoc, getPropertyTypeName, getTypeName, getTypePath} from './utils'

import * as path from 'path'
import { getJSDocTypeParameterTags } from "typescript";
import * as immer from 'immer'
import { dirname } from "path";


export interface GenerationOptions {
  path: string
}

export interface ModelDefinition {
  name:string 
  iface:ClassDeclaration,
  file:SourceFile,
}

export interface TargetFile { 
  path:string,
  file:SourceFile,
  classes:{[key:string]:string}
}

export interface SyncInterface { 
  name:string
  file:SourceFile
  iface:InterfaceDeclaration
}

export interface GeneratedReducer { 
  name: string
  fileName: string
  writer: R.CodeWriter
  writerMainDir: string
  writerReducerDir: string
}


export async function createProject( settings:GenerationOptions) {
  const project = new Project();

  project.addExistingSourceFiles([`${settings.path}/**/*.ts`,`${settings.path}/**/*.tsx`]); // , "!**/*.d.ts"
  const RFs = new R.CodeFileSystem()
  
  // create one dummy file for setting the context for the services
  const webclient = RFs.getFile('/src/frontend/api/', 'index.ts').getWriter()

  const targetFiles:{[key:string]:TargetFile} = {};
  const syncInterfaces:SyncInterface[] = [];
  const modelsList:ModelDefinition[] = []
  const generatedFiles:ModelDefinition[] = []

  const dirReducers:{[key:string]:GeneratedReducer[]} = {}

  const ng = RFs.getFile('/src/frontend/', 'ng.ts').getWriter()

  // NOTE:
  // https://daveceddia.com/context-api-vs-redux/

  const JSTags = (c:InterfaceDeclaration|ClassDeclaration|FunctionDeclaration, name:string) : string[] => {
    const res:string[] = []
    c.getJsDocs().forEach(
      doc => doc.getTags().forEach( tag => {
        if( tag.getName() === name ) res.push( tag.getComment() )
      })
    )   
    return res 
  }

  project.getSourceFiles().forEach( sourceFile => {
    sourceFile.getClasses().forEach( c=>{
      JSTags( c, 'generated').forEach( model => {
        generatedFiles.push({
          name: '',
          iface : c,
          file : sourceFile
        })
      })    
      JSTags( c, 'redux').forEach( model => {
        modelsList.push({
          name: model,
          iface : c,
          file : sourceFile
        })
      })    
    })
    sourceFile.getInterfaces().forEach( i => {
      JSTags( i, 'sync').forEach( model => {
        console.log('Syncing ', model)
        syncInterfaces.push({
          name: model,
          iface : i,
          file : sourceFile
        })
      })
    })
  })

  // mapeservice classes to the properties
  project.getSourceFiles().forEach( sourceFile => {

    // do not process target files
    if( generatedFiles.filter( m => m.file.getFilePath() == sourceFile.getFilePath() ).length > 0 ) {
      return;
    }

    sourceFile.getClasses().forEach( c=>{
      if( c.getJsDocs().filter(
        doc =>doc.getTags().filter( tag => tag.getName() === 'redux' ).length > 0
      ).length > 0 ) {      

        const sourceDir = path.normalize( path.relative( process.cwd(), path.dirname( sourceFile.getFilePath() ) ) )
        console.log('sourceDir', sourceDir)
        const reducerFileName = sourceDir + '/reducers/' +  c.getName() + '.ts'
        const ng = RFs.getFile(sourceDir + '/reducers/',  c.getName() + '.ts' ).getWriter()

        if(!dirReducers[sourceDir]) dirReducers[sourceDir] = []

        // in the end create index.ts for each reducer
        dirReducers[sourceDir].push({
          name : c.getName(),
          writer: ng,
          writerMainDir: sourceDir,
          writerReducerDir: sourceDir + '/reducers/',
          fileName : reducerFileName
        })
        
        ng.raw(sourceFile.getText(), true)
        ng.out(`import * as immer from 'immer'`, true)
        ng.out(`import { connect } from 'react-redux'`, true)
        ng.out(`import { State } from './index'`, true)
        // Create model of all the variables...
        
        ng.out(``, true)
        ng.out(`export interface ContainerPropsMethods {`, true)
          ng.indent(1)
          const propsMethods = ng.fork()
          ng.indent(-1)
        ng.out(`}`, true)

        ng.out('export interface I' + c.getName()+ ' {', true)
        ng.indent(1)
          c.getProperties().forEach( p => {
            ng.out(p.getNameNode().print()+': ' +  p.getTypeNode().print(), true)
          })
        ng.indent(-1)
        ng.out('}', true)

        ng.out('', true)
        ng.out(`export interface ContainerPropsState extends I${c.getName()} {}`, true);
        ng.out(`export interface Props extends I${c.getName()}, ContainerPropsMethods {}`, true);

        ng.out('const mapStateToProps = (state : State) : ContainerPropsState => {', true)
          ng.indent(1)
          ng.out('return {', true)
            ng.indent(1)
            c.getProperties().forEach( p => {
              ng.out(p.getName()+`: state.${c.getName()}.` +  p.getName() + ',', true)
            })            
            ng.indent(-1)
          ng.out('}', true)
          ng.indent(-1)
        ng.out('}', true)

        ng.out('const mapDispatchToProps = (dispatch) : ContainerPropsMethods => {', true)
          ng.indent(1)
          ng.out('return {', true)
            ng.indent(1)
            const dispatchMethods = ng.fork()
            ng.indent(-1)
          ng.out('}', true)
          ng.indent(-1)
        ng.out('}', true)        

        ng.out(`export const StateConnector = connect( mapStateToProps, mapDispatchToProps);`, true)

/*
const mapStateToProps = (state : State) : ContainerPropsState => {
  return {
    taskState : state.TestModelReducer.shopState,  
    members: state.TestModelReducer.items
  };
}
const mapDispatchToProps = (dispatch) : ContainerPropsMethods => {
  return {
    loadMembers: () => {
      return dispatch(RTestModel.createItem('Jeee!!!'))
    },
    fillSomeFriends: () => {
      return dispatch(RTestModel.fillSomeFriends())
    },
    createItem: (name:string) => {
      return dispatch(RTestModel.createItem(name))
    },     
    ChangeLastItem: () => {
      return dispatch(RTestModel.ChangeLastItem())
    },
    addToCartRandom: () => {
      return dispatch(RTestModel.addToCartRandom())
    },
    addCart: () => {
      return dispatch(RTestModel.addCart())
    }  
  };
}
*/       

        ng.out('', true)
        // Create model of all the variables...
        ng.out('const init_' + c.getName()+ ' = () => {', true)
          ng.indent(1)
          ng.out('const o = new '+c.getName()+'();', true);
          ng.out('return {', true)
            ng.indent(1)
            c.getProperties().forEach( p => {
              ng.out(p.getName() + ': o.' + p.getName()  + ',', true)
            })
            ng.indent(-1)
          ng.out('}', true)
          ng.indent(-1)
        ng.out('}', true)

        // Create model of all the variables...

        ng.raw(`
/**
 * @generated true
 */`, true)

        ng.out('export class R' + c.getName()+ ' {', true)
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


        ng.out(`export const ${c.getName()}Reducer = (state:I${c.getName()} = init_${c.getName()}(), action) => {`, true)
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
          body.out('private _getState?: ()=>any', true); // I'+c.getName(), true)

          body.out(`constructor(state?: I${c.getName()}, dispatch?:(action:any)=>void, getState?:()=>I${c.getName()}) {`, true)
            body.indent(1)
            body.out('this._state = state', true)
            body.out('this._dispatch = dispatch', true)
            body.out('this._getState = getState', true)
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
            body.out('get ' + p.getName()+'() : ' + p.getTypeNode().print() + '{', true)
            body.indent(1)
            body.out('if(this._getState) {', true)
              body.indent(1)
              const stateName = c.getName()
              body.out('return this._getState().' + stateName +'.' + p.getName(), true)
              body.indent(-1)
            body.out('} else {', true) 
              body.indent(1) 
              body.out('return this._state.'+p.getName(), true)
              body.indent(-1)
            body.out('}', true)              
            body.indent(-1)
            body.out('}', true)
            body.out('set ' + p.getName()+'(value:' + p.getTypeNode().print() + ') {', true)
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
            const pName = m.getParameters().filter( (a,i) => i<1).map( mod => mod.getName() ).join('')
            if(m.isAsync()) {
              body.out('// is task', true)
              body.raw( m.print(), true)   
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
              
              body.raw( m.getModifiers().map( mod => mod.print()+' ' ).join('') )
              body.out( m.getName() + '(' +  m.getParameters().map( mod => mod.print() ).join(', ') + ')')
              if(m.getReturnTypeNode()) body.out( ': ' + m.getReturnTypeNode().print() ) 
              body.out( '{', true)
                body.indent(1)
                body.out('if(this._state) {', true)
                  body.indent(1)
                  m.getBody().forEachChild( ch => {
                    body.out(ch.print(), true)
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
            } 
            // generate the static version
            body.out('', true)             
            body.out('static ')
            body.out( m.getModifiers().filter(mod => mod.getText() != 'async').map( mod => mod.print() +' ' ).join('') )
            body.out( m.getName() + '(' +  m.getParameters().map( mod => mod.print() ).join(', ') + ')')

            propsMethods.out( m.getName() + '? : (' +  m.getParameters().map( mod => mod.print() ).join(', ') + ') => any', true)
            dispatchMethods.out( m.getName() + ' : (' +  m.getParameters().map( mod => mod.print() ).join(', ') + ') => {', true)
              dispatchMethods.indent(1)
              dispatchMethods.out(`return dispatch(R${c.getName()}.${m.getName()}(${pName}))`, true)
              dispatchMethods.indent(-1)
            dispatchMethods.out('},', true)

            if(m.getReturnTypeNode()) body.out( ': ' + m.getReturnTypeNode().print() )
            body.out( '{', true)
              body.indent(1)
              body.out(`return (dispatcher, getState) => {`, true)
                body.indent(1)
                
                body.out(`(new R${c.getName()}(null, dispatcher, getState)).${m.getName()}(${pName})`, true);
                body.indent(-1)
              body.out('}', true)
              body.indent(-1)
            body.out('}', true)            
            
          })

          // NOTE: sync is not used ATM.
          syncInterfaces.forEach( decl => {
            console.log('SYNC', decl.name)
            if(decl.name == c.getName()) {
              console.log(`Syncing ${c.getName()} -> ${decl.iface.getName()}`)
              decl.iface.getProperties().forEach( p => {
                console.log( ' *)', p.getName())
              })
              c.getProperties().forEach( p => {
                const has = decl.iface.getProperties().filter( ip => ip.getName() == p.getName() )
                if(has.length == 0 ) {
                  const imports = decl.file.getImportDeclarations();
                  let hadImport = false
                  imports.forEach( i => {
                    // i
                    console.log('NameSpace getModuleSpecifierValue', i.getModuleSpecifierValue())
                    const ns = i.getNamespaceImport()
                    if(ns) {
                      console.log('NameSpace import', ns.getText())
                      if(ns.getText() == 'TestModelModule') hadImport = true
                    }                      
                    const named = i.getNamedImports()
                    named.forEach( n => {
                      console.log(' - ', n.getText())
                    })
                  })
                  if(!hadImport) {
                    const n:ImportDeclarationStructure = {moduleSpecifier:'jee'}
                    decl.file.addImportDeclaration({
                      namespaceImport:'TestModelModule',
                      moduleSpecifier: "../ng"
                  })
                  }
                }
              })
                      
            }
          })          
          
       

      }
    })       
  })  

  Object.keys(dirReducers).forEach( dirName => {
    const list = dirReducers[dirName]
    const wr = RFs.getFile(dirName + '/reducers/', 'index.ts').getWriter()

    wr.out(`import * as redux from 'redux';`, true)
    list.forEach( m => {
      wr.out(`import { ${m.name}Reducer, I${m.name} } from './${m.name}';`, true)
    })
    wr.out(`export interface State {`, true)
      wr.indent(1)
      list.forEach( m => {
        wr.out(`${m.name}: I${m.name}`, true)
      })      
      wr.indent(-1)
    wr.out('}', true)
    wr.out(`export const reducers = redux.combineReducers<State>({`, true)
      wr.indent(1)
      list.forEach( m => {
        wr.out(`${m.name}: ${m.name}Reducer,`, true)
      })      
      wr.indent(-1)
    wr.out('})', true)

  })


  await RFs.saveTo('./', false );
  await project.save()  
  console.log('Project saved')
}
