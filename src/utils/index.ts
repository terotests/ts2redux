import * as ts from 'typescript'
import { TypeChecker, SourceFile, Project, FunctionDeclaration, ArrowFunction, MethodDeclaration, ClassDeclaration, InterfaceDeclaration, Type, PropertyDeclaration } from "ts-simple-ast";

// Interface method signatures

export type InterfaceOrClass = ClassDeclaration | InterfaceDeclaration

export const findModel = ( project:Project, className:string ) : InterfaceOrClass => {
  let res:InterfaceOrClass = null
  project.getSourceFiles().forEach( s => {
    s.getClasses().forEach( cl => {
      if( cl.getName() === className ) {
        const info = getClassDoc( cl )
        if(info.tags.model != null) {
          res = cl
        }            
      }
    })
    s.getInterfaces().forEach( cl => {
      if( cl.getName() === className ) {
        const info = getClassDoc( cl )
        if(info.tags.model != null) {
          res = cl
        }            
      }
    })
  })  
  return res
}

export class JSDocParams {
  comment : string = ''
  tags : {[key:string] : string} = {}
  params : {[key:string] : string} = {}
  errors: {[key:string ] : string} = {}
}

export const getFunctionDoc = ( method:FunctionDeclaration) : JSDocParams => {
  const res = new JSDocParams
  method.getJsDocs().forEach( doc => {
    if(doc.getComment()) {
      res.comment = doc.getComment()
    }
    doc.getTags().forEach( tag => {
      if(tag.getName() === 'error') {
        const str = tag.getComment()
        const code = str.split(' ')[0]
        const comment = str.split(' ').pop()
        res.errors[code] = comment
        return
      }
      if(tag.getName() === 'param') {
        const cn:any = tag.compilerNode
        res.params[cn.name.escapedText] = tag.getComment()
      } else {
        res.tags[tag.getName()] = tag.getComment()
      }     
    })
  })
  return res
}

export const getMethodDoc = ( method:MethodDeclaration) : JSDocParams => {
  const res = new JSDocParams
  method.getJsDocs().forEach( doc => {
    if(doc.getComment()) {
      res.comment = doc.getComment()
    }
    doc.getTags().forEach( tag => {
      if(tag.getName() === 'error') {
        const str = tag.getComment()
        const code = str.split(' ')[0]
        const comment = str.split(' ').pop()
        res.errors[code] = comment
        return
      }
      if(tag.getName() === 'param') {
        const cn:any = tag.compilerNode
        res.params[cn.name.escapedText] = tag.getComment()
      } else {
        res.tags[tag.getName()] = tag.getComment()
      }     
    })
  })
  return res
}

export const getClassDoc = ( method:InterfaceOrClass) : JSDocParams => {
  const res = new JSDocParams
  method.getJsDocs().forEach( doc => {
    if(doc.getComment()) {
      res.comment = doc.getComment()
    }
    doc.getTags().forEach( tag => {    
      if(tag.getName() === 'param') {
        const cn:any = tag.compilerNode
        res.params[cn.name.escapedText] = tag.getComment()
      } else {
        res.tags[tag.getName()] = tag.getComment()
      }     
    })
  })
  return res
}

export const getSwaggerType = function(name:string, is_array:boolean = false) : any {
  if(is_array) return {
    type : 'array',
    items : {...getSwaggerType( name )}
  }
  if(name ==='string' || name === 'number' || name === 'boolean' || name === 'any') return { type:name };
  return {'$ref' : '#/definitions/' + name}
}

export const isSimpleType = function(cType:any) : boolean {
  const tp = cType.compilerType
  if(tp.flags & ts.TypeFlags.Number) {
    return true
  }            
  if(tp.flags & ts.TypeFlags.String) {
    return true
  }      
  if(tp.flags & ts.TypeFlags.Boolean) {
    return true
  }         
  return false
}

export const isBoolean = function(cType:any) : boolean {
  const tp = cType.compilerType
  if(tp.flags & ts.TypeFlags.Boolean) {
    return true
  }         
  return false
}

export const getTypePath = function(cType:any, current:string[] = []) : string[] {
  const tp = cType.compilerType
  if(tp.flags & ts.TypeFlags.Number) {
    return ['number']
  }            
  if(tp.flags & ts.TypeFlags.String) {
    return ['string']
  } 
  if(tp.flags & ts.TypeFlags.Boolean) {
    return ['boolean']
  }              
  if(tp.symbol) {
    const res = [tp.symbol.escapedName]
    let end = []
    if(cType.getTypeArguments().length > 0 ) {
      cType.getTypeArguments().forEach( arg => {
        end = [...end, ...getTypePath(arg)]
      });
    }
    return [...res, ...end]
  }
  return ['any']  
}

export const getPropertyTypeName = function(p:PropertyDeclaration) : string {
  const cType = p.getType()
  return cType.compilerType.symbol.getEscapedName() + ''
}

export const getTypeName = function(cType:any) : string {
  const tp = cType.compilerType
  if(tp.flags & ts.TypeFlags.Number) {
    return 'number'
  }            
  if(tp.flags & ts.TypeFlags.String) {
    return 'string'
  }
  if(tp.flags & ts.TypeFlags.Boolean) {
    return 'boolean'
  }               
  if(tp.symbol) {
    let typeName = tp.symbol.escapedName + '';
    if(cType.getTypeArguments().length > 0 ) {
      typeName += '<' + cType.getTypeArguments().map( arg => {
        // console.log(arg)
        return getTypeName(arg)
      }) + '>';  
    }
    return typeName
  }
  return 'any'  
}

export const getMethodReturnTypeName = function(checker:TypeChecker, m:MethodDeclaration) : string {
  const cType = m.getReturnType()  
  const tp = cType.compilerType
  if(tp.flags & ts.TypeFlags.Number) {
    return 'number'
  }            
  if(tp.flags & ts.TypeFlags.String) {
    return 'string'
  }    
  if(tp.flags & ts.TypeFlags.Boolean) {
    return 'boolean'
  }           
  if(tp.flags & ts.TypeFlags.Union) {
    console.log('-union type found')
    return cType.getUnionTypes().map( t => getTypeName(t) ).join('|')
  }            
  if(tp.symbol) {
    let typeName = tp.symbol.escapedName + '';
    if(cType.getTypeArguments().length > 0 ) {
      typeName += '<' + cType.getTypeArguments().map( arg => {
        // console.log(arg)
        return getTypeName(arg)
      }) + '>';  
    }
    return typeName
  }
  return 'any'  
}
