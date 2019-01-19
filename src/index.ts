import Project, {
  printNode,
  InterfaceDeclaration,
  PropertyDeclaration,
  SourceFile,
  FunctionDeclaration,
  ClassDeclaration,
  ImportDeclaration,
  ImportDeclarationStructure,
  SyntaxKind,
  MethodDeclaration,
  Node
} from "ts-simple-ast";
import * as R from "robowr";
import {
  getFunctionDoc,
  getPropertyTypeName,
  getTypeName,
  getTypePath
} from "./utils";
import * as path from "path";
import { getJSDocTypeParameterTags } from "typescript";
import * as immer from "immer";
import { dirname } from "path";
import * as prettier from "prettier";

export interface GenerationOptions {
  path: string;
  reducerPath?: string;
  disableDevtoolsFromContext?: boolean;
  onlyFile?: string;
  router?: boolean;
}

export interface ModelDefinition {
  name: string;
  iface: ClassDeclaration;
  file: SourceFile;
}

export interface TargetFile {
  path: string;
  file: SourceFile;
  classes: { [key: string]: string };
}

export interface SyncInterface {
  name: string;
  file: SourceFile;
  iface: InterfaceDeclaration;
}

export interface GeneratedReducer {
  name: string;
  fileName: string;
  writer: R.CodeWriter;
  writerMainDir: string;
  writerReducerDir: string;
}

const createComment = (wr: R.CodeWriter, txt: string) => {
  const lines = txt.split("\n");
  const longest = lines
    .map(line => line.length)
    .reduce((prev, curr) => Math.max(prev, curr), 0);
  const maxLine = longest + 6;
  const printLine = (txt: string, fill: string, len: number) => {
    let res = txt;
    const fillLen = len - txt.length;
    for (let i = 0; i < fillLen; i++) {
      res = res + fill;
    }
    return res;
  };
  wr.out("/*" + printLine("", "*", maxLine - 3) + "*", true);
  txt.split("\n").forEach(line => {
    wr.out("* " + printLine(line, " ", maxLine - 4) + " *", true);
  });
  wr.out("*" + printLine("", "*", maxLine - 3) + "*/", true);
};

export async function createProject(settings: GenerationOptions) {
  const project = new Project();
  const reducerPath = "/" + settings.reducerPath + "/";
  project.addExistingSourceFiles([
    `${settings.path}/**/*.ts`,
    `${settings.path}/**/*.tsx`
  ]); // , "!**/*.d.ts"
  const RFs = new R.CodeFileSystem();

  const targetFiles: { [key: string]: TargetFile } = {};
  const modelsList: ModelDefinition[] = [];
  const generatedFiles: ModelDefinition[] = [];
  const dirReducers: { [key: string]: GeneratedReducer[] } = {};

  // NOTE:
  // https://daveceddia.com/context-api-vs-redux/

  const JSTags = (
    c: InterfaceDeclaration | ClassDeclaration | FunctionDeclaration,
    name: string
  ): string[] => {
    const res: string[] = [];
    c.getJsDocs().forEach(doc =>
      doc.getTags().forEach(tag => {
        if (tag.getName() === name) res.push(tag.getComment());
      })
    );
    return res;
  };

  project.getSourceFiles().forEach(sourceFile => {
    sourceFile.getClasses().forEach(c => {
      JSTags(c, "generated").forEach(model => {
        generatedFiles.push({
          name: "",
          iface: c,
          file: sourceFile
        });
      });
      JSTags(c, "redux").forEach(model => {
        modelsList.push({
          name: model,
          iface: c,
          file: sourceFile
        });
      });
    });
  });

  const getOptionalityOf = (p: PropertyDeclaration) => {
    return (
      (p.hasQuestionToken() ? "?" : "") + (p.hasExclamationToken() ? "!" : "")
    );
  };

  const getPropTypeString = (p: PropertyDeclaration): string => {
    if (!p.getTypeNode()) {
      const initVal = p.getInitializer();
      if (initVal && initVal.getType() && initVal.getType().getApparentType()) {
        const apparentType = initVal.getType().getApparentType();

        // convert apparent types
        const str = apparentType.getSymbol().getEscapedName();
        if (str === "Number") return "number";
        if (str === "Boolean") return "boolean";
        if (str === "String") return "string";
        if (str === "__object") return "any";

        if (apparentType.getTypeArguments()) {
          return getTypeName(apparentType);
        }
        return str;
      } else {
        throw "Type must be specified!!!";
      }
    } else {
      return p.getTypeNode().print();
    }
  };

  // mapeservice classes to the properties
  project.getSourceFiles().forEach(sourceFile => {
    // do not process target files
    if (
      generatedFiles.filter(
        m => m.file.getFilePath() == sourceFile.getFilePath()
      ).length > 0
    ) {
      return;
    }

    sourceFile.getClasses().forEach(c => {
      if (
        c
          .getJsDocs()
          .filter(
            doc =>
              doc.getTags().filter(tag => tag.getName() === "redux").length > 0
          ).length > 0
      ) {
        console.log("ts2redux: Transpiling ", sourceFile.getFilePath());

        const sourceDir = path.normalize(
          path.relative(process.cwd(), path.dirname(sourceFile.getFilePath()))
        );
        const reducerFileName = sourceDir + reducerPath + c.getName() + ".tsx";
        const ng = RFs.getFile(
          sourceDir + reducerPath,
          c.getName() + ".tsx"
        ).getWriter();

        const reducerMethods = c
          .getMethods()
          .filter(m => typeof m.getReturnTypeNode() === "undefined");
        const selectorMethods = c.getGetAccessors().filter(m => {
          if (typeof m.getReturnTypeNode() !== "undefined") {
            return true;
          }
          return false;
        });

        if (!dirReducers[sourceDir]) dirReducers[sourceDir] = [];
        // const inputSet:{[key:string]:Node} = {}

        // in the end create index.ts for each reducer
        dirReducers[sourceDir].push({
          name: c.getName(),
          writer: ng,
          writerMainDir: sourceDir,
          writerReducerDir: sourceDir + reducerPath,
          fileName: reducerFileName
        });

        const targetPath = path.dirname(reducerFileName);
        const sourcePath = path.dirname(sourceFile.getFilePath());
        const relPath = path.relative(targetPath, sourcePath);

        createComment(
          ng,
          `
  Redux Reducers and React Context API Provider/Consumer for state ${c.getName()}
  Generated by ts2redux from Source file ${relPath +
    "/" +
    path.basename(sourceFile.getFilePath())} 
        `
        );
        ng.out(``, true);

        const myFile = project.createSourceFile(
          "tmpSourceFile.ts",
          sourceFile.getText()
        );

        const imports = myFile.getImportDeclarations();
        for (let importDeclaration of imports) {
          const moduleSpecifier = importDeclaration.getModuleSpecifier();
          const moduleSpecifierValue = importDeclaration.getModuleSpecifierValue();
          if (moduleSpecifierValue.indexOf(".") == 0) {
            importDeclaration.setModuleSpecifier(
              path.relative(
                targetPath,
                path.normalize(sourcePath + "/" + moduleSpecifierValue)
              )
            );
          }
        }
        ng.raw(myFile.getText(), true);
        myFile.delete();

        ng.out(`import * as immer from 'immer'`, true);
        if (selectorMethods.length > 0) {
          ng.out(`import { createSelector } from 'reselect'`, true);
        }
        ng.out(`import { connect } from 'react-redux'`, true);
        ng.out(`import { IState } from './index'`, true);
        ng.out(`import * as React from 'react'`, true);
        // Create model of all the variables...

        ng.out(``, true);
        ng.out(`export interface IContainerPropsMethods {`, true);
        ng.indent(1);
        const propsMethods = ng.fork();
        ng.out(`ReduxDispatch: (action:any) => void;`, true);
        ng.indent(-1);
        ng.out(`}`, true);

        ng.out("export interface I" + c.getName() + " {", true);
        ng.indent(1);
        c.getProperties().forEach(p => {
          ng.out(
            p.getNameNode().print() +
              getOptionalityOf(p) +
              ": " +
              getPropTypeString(p),
            true
          );
        });
        ng.indent(-1);
        ng.out("}", true);

        const selFns = ng.fork();
        ng.out("", true);
        if (selectorMethods.length > 0) {
          ng.out(
            `export interface IContainerPropsState extends I${c.getName()} {`,
            true
          );
          ng.indent(1);
          selectorMethods.forEach(m => {
            ng.out(m.getName() + ": " + m.getReturnTypeNode().print(), true);
          });
          ng.indent(-1);
          ng.out(`}`, true);
        } else {
          ng.out(`export type IContainerPropsState = I${c.getName()}`, true);
        }
        ng.out(
          `export interface IProps extends IContainerPropsState, IContainerPropsMethods {}`,
          true
        );

        ng.out(
          `
        function pick<T, K extends keyof T>(o: T, ...props: K[]) {
          return props.reduce((a, e) => ({ ...a, [e]: o[e] }), {}) as Pick<T, K>;
        }        
        export function mapStateToPropsWithKeys<K extends keyof IContainerPropsState>(
          state: IState,
          keys: K[]
        ): Pick<IContainerPropsState, K> {
          return pick(state.${c.getName()} as IContainerPropsState, ...keys);
        }               

        `,
          true
        );

        ng.out(
          "export const mapStateToProps = (state : IState) : IContainerPropsState => {",
          true
        );
        ng.indent(1);
        ng.out("return {", true);
        ng.indent(1);
        c.getProperties().forEach(p => {
          ng.out(
            p.getName() + `: state.${c.getName()}.` + p.getName() + ",",
            true
          );
        });
        selectorMethods.forEach(m => {
          ng.out(
            m.getName() +
              ": " +
              m.getName() +
              `Selector(state.${c.getName()}),`,
            true
          );
        });
        ng.indent(-1);
        ng.out("}", true);
        ng.indent(-1);
        ng.out("}", true);

        ng.out(
          `
          function mapDispatchToPropsWithKeys<K extends keyof IContainerPropsMethods> (dispatch: any, keys:K[]): Pick<IContainerPropsMethods, K> {
            return pick(mapDispatchToProps(dispatch), ...keys);
          };
          `,
          true
        );

        ng.out(
          "export const mapDispatchToProps = (dispatch:any) : IContainerPropsMethods => {",
          true
        );
        ng.indent(1);
        ng.out("return {", true);
        ng.indent(1);
        const dispatchMethods = ng.fork();
        ng.out(
          `ReduxDispatch: (action:any) => { return dispatch(action) },`,
          true
        );
        ng.indent(-1);
        ng.out("}", true);
        ng.indent(-1);
        ng.out("}", true);

        ng.out(`
        export function ConnectKeys<K extends keyof I${c.getName()}, J extends keyof IContainerPropsMethods>(keys: K[], methods:J[]) {
          return connect(
            (state: IState) => mapStateToPropsWithKeys(state, keys),
            (dispatch: any) => mapDispatchToPropsWithKeys(dispatch, methods)
          );
        }      
        
        `);

        ng.out(
          `export const StateConnector = connect( mapStateToProps, mapDispatchToProps);`,
          true
        );
        ng.out("", true);
        // Create model of all the variables...
        ng.out("const init" + c.getName() + " = () => {", true);
        ng.indent(1);
        ng.out("const o = new " + c.getName() + "();", true);
        ng.out("return {", true);
        ng.indent(1);
        c.getProperties().forEach(p => {
          ng.out(p.getName() + ": o." + p.getName() + ",", true);
        });
        ng.indent(-1);
        ng.out("}", true);
        ng.indent(-1);
        ng.out("}", true);

        ng.out("const initWithMethods" + c.getName() + " = () => {", true);
        ng.indent(1);
        ng.out("const o = new " + c.getName() + "();", true);
        ng.out("return {", true);
        ng.indent(1);
        c.getProperties().forEach(p => {
          ng.out(p.getName() + ": o." + p.getName() + ",", true);
        });
        reducerMethods.forEach(m => {
          ng.out(m.getName() + ": o." + m.getName() + ",", true);
        });
        selectorMethods.forEach(m => {
          ng.out(m.getName() + ": o." + m.getName() + ",", true);
        });

        ng.out(`ReduxDispatch: (action:any) => null,`, true);
        ng.indent(-1);
        ng.out("}", true);
        ng.indent(-1);
        ng.out("}", true);

        // Create model of all the variables...

        ng.raw(
          `
/**
 * @generated true
 */`,
          true
        );

        ng.out("export class R" + c.getName() + " {", true);
        ng.indent(1);
        const body = ng.fork();
        ng.indent(-1);
        ng.out("}", true);

        ng.out("", true);
        ng.out(`export const ${c.getName()}Enums = {`, true);
        ng.indent(1);
        const ng_enums = ng.fork();
        ng.indent(-1);
        ng.out("}", true);
        ng.out("", true);

        ng.out(
          `export const ${c.getName()}Reducer = (state:I${c.getName()} = init${c.getName()}(), action:any ) => {`,
          true
        );
        ng.indent(1);
        ng.out("return immer.produce(state, draft => {", true);
        ng.indent(1);
        ng.out(`switch (action.type) {`, true);
        ng.indent(1);
        const ng_reducers = ng.fork();
        ng.indent(-1);
        ng.out("}", true);
        ng.indent(-1);
        ng.out("})", true);
        ng.indent(-1);
        ng.out("}", true);

        body.out("private _state?: I" + c.getName(), true);
        body.out("private _dispatch?: (action:any)=>void", true);
        body.out("private _getState?: ()=>any", true); // I'+c.getName(), true)

        body.out(
          `constructor(state?: I${c.getName()}, dispatch?:(action:any)=>void, getState?:()=>any) {`,
          true
        );
        body.indent(1);
        body.out("this._state = state", true);
        body.out("this._dispatch = dispatch", true);
        body.out("this._getState = getState", true);
        body.indent(-1);
        body.out("}", true);

        c.getProperties().forEach(p => {
          if (selectorMethods.length > 0) {
            selFns.out(
              `export const ${p.getName()}SelectorFn = (state:I${c.getName()}) : ${getPropTypeString(
                p
              ) +
                (p.hasQuestionToken()
                  ? " | undefined"
                  : "")} => state.${p.getName()}`,
              true
            );
          }

          const optionality = p.hasQuestionToken() ? "| undefined" : "";

          const r_name = `${c.getName()}_${p.getName()}`;
          body.out(
            "get " +
              p.getName() +
              "() : " +
              getPropTypeString(p) +
              optionality +
              " {",
            true
          );
          body.indent(1);
          body.out("if(this._getState) {", true);
          body.indent(1);
          const stateName = c.getName();
          body.out(
            "return this._getState()." + stateName + "." + p.getName(),
            true
          );
          body.indent(-1);
          body.out("} else {", true);
          body.indent(1);
          body.out(
            "if(this._state) { return this._state." + p.getName() + " }",
            true
          );
          body.indent(-1);
          body.out("}", true);
          if (p.hasQuestionToken()) {
            body.out(`return undefined`, true);
          } else {
            body.out(`throw 'Invalid State in ${r_name}'`, true);
          }
          body.indent(-1);
          body.out("}", true);
          body.out(
            "set " +
              p.getName() +
              "(value:" +
              getPropTypeString(p) +
              optionality +
              ") {",
            true
          );
          body.indent(1);
          body.out(
            `if(this._state && (typeof(value) !== 'undefined')) {`,
            true
          );
          body.indent(1);
          body.out(`this._state.${p.getName()} = value`, true);
          body.indent(-1);
          body.out("} else {", true);
          body.indent(1);
          body.out(`// dispatch change for item ${p.getName()}`, true);
          body.out(
            `if(this._dispatch) { this._dispatch({type:${c.getName()}Enums.${r_name}, payload:value}) }`,
            true
          );
          body.indent(-1);
          body.out("}", true);
          // body.out('this._'+p.getName()+' = value', true)
          body.indent(-1);
          body.out("}", true);

          ng_enums.out(`${r_name} : '${r_name}',`, true);

          ng_reducers.out(`case ${c.getName()}Enums.${r_name}: `, true);
          ng_reducers.indent(1);
          ng_reducers.out(
            `(new R${c.getName()}(draft)).${p.getName()} = action.payload`,
            true
          );
          ng_reducers.out("break;", true);
          ng_reducers.indent(-1);

          // ng_reducers
        });

        body.out("", true);
        selectorMethods.forEach(m => {
          const rvNode = m.getReturnTypeNode();
          if (rvNode) {
            const inputSet: { [key: string]: Node } = {};
            m.getBody().forEachDescendant((node, traversal) => {
              switch (node.getKind()) {
                case SyntaxKind.PropertyAccessExpression:
                  // could be this.
                  if (
                    node.getFirstChild().getKind() === SyntaxKind.ThisKeyword
                  ) {
                    inputSet[node.getChildAtIndex(2).print()] = node;
                  }
                  break;
              }
            });

            const properties: { [key: string]: PropertyDeclaration } = {};
            const methods: { [key: string]: MethodDeclaration } = {};
            c.getMethods().forEach(m => {
              methods[m.getName()] = m;
            });
            c.getProperties().forEach(p => {
              properties[p.getName()] = p;
            });
            Object.keys(inputSet).forEach(key => {
              if (methods[key])
                throw `Using Methods in selectors not allowed: ${c.getName()}.${key}`;
            });

            const propsKeys = Object.keys(inputSet).filter(
              key => properties[key] != null
            );

            selFns.out(
              `export const ${m.getName()}SelectorFnCreator = () => createSelector([`
            );
            selFns.out(propsKeys.map(key => key + "SelectorFn").join(","));
            selFns.out(`],(`);
            selFns.out(propsKeys.map(key => key).join(","));
            selFns.out(") => {", true);
            selFns.indent(1);
            selFns.out(`const o = new ${c.getName()}()`, true);
            propsKeys.forEach(key => selFns.out(`o.${key} = ${key}`, true));
            selFns.out(`return o.${m.getName()}`, true);
            selFns.indent(-1);
            selFns.out(`})`, true);

            selFns.out(
              `export const ${m.getName()}Selector = ${m.getName()}SelectorFnCreator()`,
              true
            );
            return;
          }
        });
        c.getMethods().forEach(m => {
          const rvNode = m.getReturnTypeNode();
          let rvMethod = false;
          if (m.compilerNode.modifiers) {
            m.compilerNode.modifiers.forEach(mm => {
              if (mm.getText() === "private") rvMethod = true;
            });
          }
          if (rvNode) {
            rvMethod = true;
          }
          const typeArgs = m
            .getTypeParameters()
            .map(p => p.print())
            .join(",");
          const typeArgStr = typeArgs.length > 0 ? "<" + typeArgs + ">" : "";

          if (!rvMethod && m.getParameters().length > 1) {
            throw `Error at ${sourceFile.getFilePath()} in class ${c.getName()} method ${m.getName()} can not have more than 2 parameters at the moment`;
          }
          const pName = m
            .getParameters()
            .filter((a, i) => i < 1)
            .map(mod => mod.getName())
            .join("");

          if (m.isAsync()) {
            // body.out('// is task', true)
            body.raw(m.print(), true);
          } else {
            // body.out('// is a reducer', true)
            const r_name = `${c.getName()}_${m.getName()}`;
            const param_name =
              m.getParameters().length > 0 ? "action.payload" : "";
            ng_enums.out(`${r_name} : '${r_name}',`, true);
            if (!rvMethod) {
              ng_reducers.out(`case ${c.getName()}Enums.${r_name}: `, true);
              ng_reducers.indent(1);
              ng_reducers.out(
                `(new R${c.getName()}(draft)).${m.getName()}(${param_name})`,
                true
              );
              ng_reducers.out("break;", true);
              ng_reducers.indent(-1);
            }

            body.raw(
              m
                .getModifiers()
                .map(mod => mod.print() + " ")
                .join("")
            );
            body.out(
              m.getName() +
                typeArgStr +
                "(" +
                m
                  .getParameters()
                  .map(mod => mod.print())
                  .join(", ") +
                ")"
            );
            if (m.getReturnTypeNode())
              body.out(": " + m.getReturnTypeNode().print());
            body.out("{", true);
            body.indent(1);
            if (rvMethod) {
              m.getBody().forEachChild(ch => {
                body.out(ch.print(), true);
              });
            } else {
              body.out("if(this._state) {", true);
              body.indent(1);
              m.getBody().forEachChild(ch => {
                body.out(ch.print(), true);
              });
              body.indent(-1);
              body.out("} else {", true);
              const firstParam = m
                .getParameters()
                .filter((a, i) => i < 1)
                .map(mod => mod.getName())
                .join("");
              const fpCode =
                firstParam.length > 0 ? `,payload: ${firstParam} ` : "";
              body.indent(1);
              body.out(
                `if(this._dispatch) { this._dispatch({type:${c.getName()}Enums.${r_name}${fpCode}}) }`,
                true
              );
              body.indent(-1);
              body.out("}", true);
            }

            body.indent(-1);
            body.out("}", true);
          }
          // generate the static version

          if (!rvMethod) {
            body.out("", true);
            body.out("public static ");
            body.out(
              m
                .getModifiers()
                .filter(
                  mod => mod.getText() != "async" && mod.getText() != "public"
                )
                .map(mod => mod.print() + " ")
                .join("")
            );
            body.out(
              m.getName() +
                typeArgStr +
                "(" +
                m
                  .getParameters()
                  .map(mod => mod.print())
                  .join(", ") +
                ")"
            );

            propsMethods.out(
              m.getName() +
                " : " +
                typeArgStr +
                "(" +
                m
                  .getParameters()
                  .map(mod => mod.print())
                  .join(", ") +
                ") => any",
              true
            );
            dispatchMethods.out(
              m.getName() +
                " : " +
                typeArgStr +
                "(" +
                m
                  .getParameters()
                  .map(mod => mod.print())
                  .join(", ") +
                ") => {",
              true
            );
            dispatchMethods.indent(1);
            dispatchMethods.out(
              `return dispatch(R${c.getName()}.${m.getName()}(${pName}))`,
              true
            );
            dispatchMethods.indent(-1);
            dispatchMethods.out("},", true);

            if (m.getReturnTypeNode())
              body.out(": " + m.getReturnTypeNode().print());
            body.out("{", true);
            body.indent(1);
            body.out(`return (dispatcher:any, getState:any) => {`, true);
            body.indent(1);

            body.out(
              `(new R${c.getName()}(undefined, dispatcher, getState)).${m.getName()}(${pName})`,
              true
            );
            body.indent(-1);
            body.out("}", true);
            body.indent(-1);
            body.out("}", true);
          }
        });

        // https://hackernoon.com/how-to-use-the-new-react-context-api-fce011e7d87
        // https://daveceddia.com/context-api-vs-redux/

        const tsx = outer => {
          // const ng = RFs.getFile(sourceDir + '/reducers/',  c.getName() + 'Ctx.tsx' ).getWriter()
          const ng = outer;
          // ng.raw(outer.getCode())
          createComment(ng, "React Context API component");
          // create context...
          ng.out(
            `export const ${c.getName()}Context = React.createContext<IProps>(initWithMethods${c.getName()}())`,
            true
          );
          ng.out(
            `export const ${c.getName()}Consumer = ${c.getName()}Context.Consumer`,
            true
          );
          ng.out(`let instanceCnt = 1`, true);
          ng.out(
            `export class ${c.getName()}Provider extends React.Component {`,
            true
          );
          ng.indent(1);
          ng.out(`public state: I${c.getName()} = init${c.getName()}() `, true);
          ng.out(`public lastSetState: I${c.getName()}`, true);
          ng.out(`private __devTools:any = null`, true);

          // for each selector...
          // this.__selector1 = getCompletedListSelectorFnCreator()
          selectorMethods.forEach(m => {
            ng.out(`private __selector${m.getName()}:any = null`, true);
          });

          // devToolsConnection:any = null
          ng.out(`constructor( props:any ){`, true);
          ng.indent(1);
          ng.out(`super(props)`, true);
          ng.out(`this.lastSetState = this.state`, true);
          const binder = ng.fork();
          // for each selector
          // this.__selector1 = getCompletedListSelectorFnCreator()
          selectorMethods.forEach(m => {
            ng.out(
              `this.__selector${m.getName()} = ${m.getName()}SelectorFnCreator()`,
              true
            );
          });

          if (!settings.disableDevtoolsFromContext) {
            ng.out(
              `const devs = window['__REDUX_DEVTOOLS_EXTENSION__'] ? window['__REDUX_DEVTOOLS_EXTENSION__'] : null`,
              true
            );
            ng.out(`if(devs) {`, true);
            ng.indent(1);
            ng.out(
              `this.__devTools = devs.connect({name:'${c.getName()}'+instanceCnt++})`,
              true
            );
            ng.out(`this.__devTools.init(this.state)`, true);
            ng.out(`this.__devTools.subscribe( (msg:any) => {`, true);
            ng.indent(1);
            ng.out(`if (msg.type === 'DISPATCH' && msg.state) {`, true);
            ng.indent(1);
            ng.out(`this.setState(JSON.parse(msg.state))`, true);
            ng.indent(-1);
            ng.out(`}`, true);
            ng.indent(-1);
            ng.out(`})`, true);
            ng.indent(-1);
            ng.out(`}`, true);
          }
          ng.indent(-1);
          ng.out(`}`, true);
          if (!settings.disableDevtoolsFromContext) {
            ng.out(`public componentWillUnmount() {`, true);
            ng.indent(1);
            ng.out(
              `if(this.__devTools) { this.__devTools.unsubscribe() }`,
              true
            );
            ng.indent(-1);
            ng.out(`}`, true);
          }
          ng.out(`public setStateSync(state: I${c.getName()}) {`, true);
          ng.indent(1);
          ng.out(`this.lastSetState = state`, true);
          ng.out(`this.setState(state)`, true);
          ng.indent(-1);
          ng.out(`}`, true);

          reducerMethods.forEach(m => {
            const typeArgs = m
              .getTypeParameters()
              .map(p => p.print())
              .join(",");
            const typeArgStr = typeArgs.length > 0 ? "<" + typeArgs + ">" : "";
            const body = ng;
            body.raw(
              m
                .getModifiers()
                .map(mod => mod.print() + " ")
                .join("")
            );

            binder.out(
              `this.${m.getName()} = this.${m.getName()}.bind(this)`,
              true
            );
            body.out(
              m.getName() +
                typeArgStr +
                "(" +
                m
                  .getParameters()
                  .map(mod => mod.print())
                  .join(", ") +
                ")"
            );
            // if(m.getReturnTypeNode()) body.out( ': ' + m.getReturnTypeNode().print() )
            body.out("{", true);
            body.indent(1);
            const firstParam = m
              .getParameters()
              .filter((a, i) => i < 1)
              .map(mod => mod.getName())
              .join("");
            if (m.isAsync()) {
              body.out(
                `(new R${c.getName()}(undefined, (action:any) => {`,
                true
              );
              body.indent(1);

              if (!settings.disableDevtoolsFromContext) {
                body.out(
                  `const nextState = ${c.getName()}Reducer( this.lastSetState, action )`,
                  true
                );
                body.out(
                  `if(this.__devTools) { this.__devTools.send(action.type, nextState) }`,
                  true
                );
                body.out(`this.setStateSync(nextState)`, true);
              } else {
                body.out(
                  `this.setStateSync(${c.getName()}Reducer( this.lastSetState, action ))`,
                  true
                );
              }

              body.indent(-1);
              body.out(
                `}, () => ({${c.getName()}:this.lastSetState})) ).${m.getName()}(${firstParam})`,
                true
              );
            } else {
              if (!settings.disableDevtoolsFromContext) {
                body.out(
                  `const nextState = immer.produce( this.state, draft => ( new R${c.getName()}(draft) ).${m.getName()}(${firstParam}) )`,
                  true
                );
                body.out(
                  `if(this.__devTools) { this.__devTools.send('${m.getName()}', nextState) } `,
                  true
                );
                body.out(`this.setStateSync(nextState)`, true);
              } else {
                body.out(
                  `this.setStateSync(immer.produce( this.state, draft => ( new R${c.getName()}(draft) ).${m.getName()}(${firstParam}) ))`,
                  true
                );
              }
            }
            body.indent(-1);
            body.out("}", true);
          });
          ng.out("public render() {", true);
          ng.indent(1);
          ng.out(
            `return (<${c.getName()}Context.Provider value={{...this.state, `,
            true
          );
          ng.indent(1);
          reducerMethods.forEach(m => {
            ng.out(m.getName() + ": this." + m.getName() + ",", true);
          });
          // getCompletedList: this.__selector1(this.state), // TODO: fix this
          selectorMethods.forEach(m => {
            // ng.out(`this.__selector${m.getName()} = ${m.getName()}SelectorFnCreator()`, true)
            ng.out(
              m.getName() + `: this.__selector${m.getName()}(this.state),`,
              true
            );
          });
          ng.out("ReduxDispatch: (action:any) => null,", true);
          ng.indent(-1);
          ng.out(`}}> {this.props.children} `, true);
          ng.out(`</${c.getName()}Context.Provider>)`, true);
          ng.indent(-1);
          ng.out("}", true);
          ng.indent(-1);
          ng.out(`}`, true);
        };
        tsx(ng);
      }
    });
  });

  Object.keys(dirReducers).forEach(dirName => {
    const list = dirReducers[dirName];
    const wr = RFs.getFile(dirName + reducerPath, "index.ts").getWriter();
    createComment(
      wr,
      `
    Combined Reducers for main application
    Generated by ts2redux
          `
    );

    wr.out(`import * as redux from 'redux';`, true);
    if (settings.router) {
      wr.out(`import { connectRouter } from 'connected-react-router'`, true);
    }
    list.forEach(m => {
      const [first, second] = [`${m.name}Reducer`, `I${m.name}`]
        .sort()
        .reverse();
      wr.out(`import { ${second}, ${first} } from './${m.name}';`, true);
    });
    wr.out(`export interface IState {`, true);
    wr.indent(1);
    list.forEach(m => {
      wr.out(`${m.name}: I${m.name}`, true);
    });
    wr.indent(-1);
    wr.out("}", true);
    wr.out("// use reducerObject if you combine reducers manually", true);
    wr.out("// for example when using connected-react-router", true);
    wr.out(`export const reducerObject = {`, true);
    wr.indent(1);
    list.forEach(m => {
      wr.out(`${m.name}: ${m.name}Reducer,`, true);
    });
    wr.indent(-1);
    wr.out("}", true);
    wr.out(
      `export const reducers = redux.combineReducers<IState>(reducerObject)`,
      true
    );
  });

  const prettierConfig = await prettier.resolveConfig(process.cwd());
  await RFs.saveTo("./", { usePrettier: true, prettierConfig });
  await project.save();
}
