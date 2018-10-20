
  
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
  reducerPath?: string
  disableDevtoolsFromContext?: boolean
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

const createComment = (wr:R.CodeWriter, txt:string) => {
  const lines = txt.split('\n')
  const longest = lines.map( line => line.length ).reduce( (prev,curr) => Math.max(prev,curr), 0)
  const maxLine = longest + 6;
  const printLine = (txt:string, fill:string, len:number) => {
    let res = txt 
    const fillLen = len - txt.length
    for( let i=0 ; i < fillLen; i++) {
      res = res + fill
    }
    return res
  }
  wr.out('/*' + printLine('', '*', maxLine-3)  + '*', true)
  txt.split('\n').forEach(line=>{
    wr.out('* ' + printLine(line, ' ', maxLine-4) + ' *', true)
  })
  wr.out('*' + printLine('', '*', maxLine-3)  + '*/', true)
}

export async function createProject( settings:GenerationOptions) {
  const project = new Project();
  const reducerPath =  '/'+settings.reducerPath+'/'
  project.addExistingSourceFiles([`${settings.path}/**/*.ts`,`${settings.path}/**/*.tsx`]); // , "!**/*.d.ts"
  const RFs = new R.CodeFileSystem()


  const targetFiles:{[key:string]:TargetFile} = {};
  const modelsList:ModelDefinition[] = []
  const generatedFiles:ModelDefinition[] = []
  const dirReducers:{[key:string]:GeneratedReducer[]} = {}

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
        const reducerFileName = sourceDir + reducerPath + c.getName() + '.tsx'
        const ng = RFs.getFile(sourceDir + reducerPath,  c.getName() + '.tsx' ).getWriter()

        if(!dirReducers[sourceDir]) dirReducers[sourceDir] = []

        // in the end create index.ts for each reducer
        dirReducers[sourceDir].push({
          name : c.getName(),
          writer: ng,
          writerMainDir: sourceDir,
          writerReducerDir: sourceDir + reducerPath,
          fileName : reducerFileName
        })

        const targetPath = path.dirname( reducerFileName )
        const sourcePath = path.dirname( sourceFile.getFilePath() )
        const relPath = path.relative(targetPath, sourcePath)

        createComment(ng, `
  Redux Reducers and React Context API Provider/Consumer for state ${c.getName()}
  Generated by ts2redux at ${(new Date()).toISOString()}
  From Source file ${relPath + '/' + path.basename( sourceFile.getFilePath())} 
        `)
        ng.out(``, true)
        ng.raw(sourceFile.getText(), true)

        ng.out(`import * as immer from 'immer'`, true)
        ng.out(`import { connect } from 'react-redux'`, true)
        ng.out(`import { State } from './index'`, true)
        ng.out(`import * as React from 'react'`, true)
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
        ng.out(`export interface Props extends ContainerPropsState, ContainerPropsMethods {}`, true);

        ng.out('export const mapStateToProps = (state : State) : ContainerPropsState => {', true)
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

        ng.out('export const mapDispatchToProps = (dispatch) : ContainerPropsMethods => {', true)
          ng.indent(1)
          ng.out('return {', true)
            ng.indent(1)
            const dispatchMethods = ng.fork()
            ng.indent(-1)
          ng.out('}', true)
          ng.indent(-1)
        ng.out('}', true)        

        ng.out(`export const StateConnector = connect( mapStateToProps, mapDispatchToProps);`, true)     
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

          body.out(`constructor(state?: I${c.getName()}, dispatch?:(action:any)=>void, getState?:()=>any) {`, true)
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
              body.out(`this._dispatch({type:${c.getName()}Enums.${r_name}, payload:value})`, true)
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
            if(m.getParameters().length > 1) {
              throw `Error at ${sourceFile.getFilePath()} in class ${c.getName()} method ${m.getName()} can not have more than 2 parameters at the moment`
            }
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
                  body.out(`this._dispatch({type:${c.getName()}Enums.${r_name}${fpCode}})`, true)    
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

          // https://hackernoon.com/how-to-use-the-new-react-context-api-fce011e7d87
          // https://daveceddia.com/context-api-vs-redux/

          const tsx = (outer) => {
            // const ng = RFs.getFile(sourceDir + '/reducers/',  c.getName() + 'Ctx.tsx' ).getWriter()
            const ng = outer
            // ng.raw(outer.getCode())
            createComment( ng, 'React Context API test');            
            // create context...
            ng.out(`export const ${c.getName()}Context = React.createContext<Props>(null)`, true)
            ng.out(`export const ${c.getName()}Consumer = ${c.getName()}Context.Consumer`, true)
            ng.out(`let instanceCnt = 1`, true)
            ng.out(`export class ${c.getName()}Provider extends React.Component {`, true)
              ng.indent(1)
              ng.out(`state: I${c.getName()} = init_${c.getName()}() `, true)
              ng.out(`__devTools:any = null`, true)
              // devToolsConnection:any = null  
              ng.out(`constructor( props ){`, true)
                ng.indent(1)
                ng.out(`super(props)`, true);
                const binder = ng.fork()
                if(!settings.disableDevtoolsFromContext) {
                  ng.out(`const devs = window['devToolsExtension'] ? window['devToolsExtension'] : null`, true)
                  ng.out(`if(devs) {`, true)
                    ng.indent(1)
                    ng.out(`this.__devTools = devs.connect({name:'${c.getName()}'+instanceCnt++})`, true)
                    ng.out(`this.__devTools.init(this.state)`, true) 
                    ng.out(`this.__devTools.subscribe( msg => {`, true)  
                      ng.indent(1)
                      ng.out(`if (msg.type === 'DISPATCH' && msg.state) {`, true)
                        ng.indent(1)
                        ng.out(`this.setState(JSON.parse(msg.state))`, true)
                        ng.indent(-1)
                      ng.out(`}`, true) 
                      ng.indent(-1)
                    ng.out(`})`, true)                                  
                    ng.indent(-1)
                  ng.out(`}`, true)
                }
                ng.indent(-1)
              ng.out(`}`, true)
              if(!settings.disableDevtoolsFromContext) {
                ng.out(`componentWillUnmount() {`, true)
                  ng.indent(1)
                  ng.out(`if(this.__devTools) this.__devTools.unsubscribe()`, true)
                  ng.indent(-1)
                ng.out(`}`, true)
              }

              // debugger idea
/*
      const newState = TodoListReducer( this.state, action )
      this.devToolsConnection.send('getItems', newState);
      this.setState( newState )
*/

/*

        componentWillUnmount() {
            window.removeEventListener('scroll', this.onScroll.bind(this), false);
        }
*/              

              c.getMethods().forEach( m => {
                const body = ng
                body.raw( m.getModifiers().map( mod => mod.print()+' ' ).join('') )

                binder.out(`this.${m.getName()} = this.${m.getName()}.bind(this)`, true)
                body.out( m.getName() + '(' +  m.getParameters().map( mod => mod.print() ).join(', ') + ')')
                // if(m.getReturnTypeNode()) body.out( ': ' + m.getReturnTypeNode().print() ) 
                body.out( '{', true)
                  body.indent(1)
                  const firstParam = m.getParameters().filter( (a,i) => i<1).map( mod => mod.getName() ).join('')
                  if(m.isAsync()) {
body.out(`(new R${c.getName()}(null, (action) => {`, true)
body.indent(1)
                  
  if(!settings.disableDevtoolsFromContext) { 
    body.out(`const nextState = ${c.getName()}Reducer( this.state, action )`, true) 
    body.out(`if(this.__devTools) this.__devTools.send(action.type, nextState)`, true)  
    body.out(`this.setState(nextState)`, true)
  } else {
    body.out(`this.setState(${c.getName()}Reducer( this.state, action ))`, true)
  }               
  
body.indent(-1)
body.out(`}, () => ({${c.getName()}:this.state})) ).${m.getName()}(${firstParam})`, true);
                  } else {
if(!settings.disableDevtoolsFromContext) { 
  body.out(`const nextState = immer.produce( this.state, draft => ( new R${c.getName()}(draft) ).${m.getName()}(${firstParam}) )`, true)
  body.out(`if(this.__devTools) this.__devTools.send('${m.getName()}', nextState)`, true)   
  body.out(`this.setState(nextState)`, true)
} else {
  body.out(`this.setState(immer.produce( this.state, draft => ( new R${c.getName()}(draft) ).${m.getName()}(${firstParam}) ))`, true)
}           
}
                  body.indent(-1)
                body.out('}', true) 

              })
              ng.out('render() {', true)
                ng.indent(1)
                ng.out(`return (<${c.getName()}Context.Provider value={{...this.state, `, true)
                  ng.indent(1)
                    c.getMethods().forEach( m => {
                      ng.out(m.getName() + ': this.'+m.getName() + ',', true)
                    })
                  ng.indent(-1)
                ng.out(`}}> {this.props.children} `, true)
                ng.out(`</${c.getName()}Context.Provider>)`, true)
                ng.indent(-1)
              ng.out('}', true)
              ng.indent(-1)
            ng.out(`}`, true)  

            // createComment(ng, 'HOC for connecting to properties')
            
            // Disable for now...
            /*
            ng.out(`export function ${c.getName()}HOC(Component) {`, true)
              ng.indent(1)
              ng.out(`return function Connected${c.getName()}(props) {`, true)
                ng.indent(1)
                ng.out(`return (<${c.getName()}Context.Consumer>`, true)
                 ng.indent(1)
                 ng.out(`{data => <Component {...props} {...data} />}`, true)
                 ng.indent(-1)
                ng.out(`</${c.getName()}Context.Consumer>)`, true)
                ng.indent(-1)
              ng.out(`}`, true)
              ng.indent(-1)
            ng.out(`}`, true)   
            */         

          }
          tsx(ng)
      }
    })       
  })  

  Object.keys(dirReducers).forEach( dirName => {
    const list = dirReducers[dirName]
    const wr = RFs.getFile(dirName + reducerPath, 'index.ts').getWriter()
    createComment(wr, `
    Combined Reducers for main application
    Generated by ts2redux at ${(new Date()).toISOString()}
          `)

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
}
