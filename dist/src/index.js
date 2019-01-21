"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts_simple_ast_1 = require("ts-simple-ast");
var R = require("robowr");
var utils_1 = require("./utils");
var path = require("path");
var prettier = require("prettier");
var createComment = function (wr, txt) {
    var lines = txt.split("\n");
    var longest = lines
        .map(function (line) { return line.length; })
        .reduce(function (prev, curr) { return Math.max(prev, curr); }, 0);
    var maxLine = longest + 6;
    var printLine = function (txt, fill, len) {
        var res = txt;
        var fillLen = len - txt.length;
        for (var i = 0; i < fillLen; i++) {
            res = res + fill;
        }
        return res;
    };
    wr.out("/*" + printLine("", "*", maxLine - 3) + "*", true);
    txt.split("\n").forEach(function (line) {
        wr.out("* " + printLine(line, " ", maxLine - 4) + " *", true);
    });
    wr.out("*" + printLine("", "*", maxLine - 3) + "*/", true);
};
function createProject(settings) {
    return __awaiter(this, void 0, void 0, function () {
        var project, reducerPath, RFs, targetFiles, modelsList, generatedFiles, dirReducers, JSTags, hasJSTag, getOptionalityOf, getPropTypeString, prettierConfig;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    project = new ts_simple_ast_1.default();
                    reducerPath = "/" + settings.reducerPath + "/";
                    project.addExistingSourceFiles([
                        settings.path + "/**/*.ts",
                        settings.path + "/**/*.tsx"
                    ]); // , "!**/*.d.ts"
                    RFs = new R.CodeFileSystem();
                    targetFiles = {};
                    modelsList = [];
                    generatedFiles = [];
                    dirReducers = {};
                    JSTags = function (c, name) {
                        var res = [];
                        c.getJsDocs().forEach(function (doc) {
                            return doc.getTags().forEach(function (tag) {
                                if (tag.getName() === name)
                                    res.push(tag.getComment());
                            });
                        });
                        return res;
                    };
                    hasJSTag = function (c, name) {
                        var has = false;
                        c.getJsDocs().forEach(function (doc) {
                            return doc.getTags().forEach(function (tag) {
                                if (tag.getName() === name) {
                                    has = true;
                                }
                            });
                        });
                        return has;
                    };
                    project.getSourceFiles().forEach(function (sourceFile) {
                        sourceFile.getClasses().forEach(function (c) {
                            JSTags(c, "generated").forEach(function (model) {
                                generatedFiles.push({
                                    name: "",
                                    iface: c,
                                    file: sourceFile
                                });
                            });
                            JSTags(c, "redux").forEach(function (model) {
                                modelsList.push({
                                    name: model,
                                    iface: c,
                                    file: sourceFile
                                });
                            });
                        });
                    });
                    getOptionalityOf = function (p) {
                        return ((p.hasQuestionToken() ? "?" : "") + (p.hasExclamationToken() ? "!" : ""));
                    };
                    getPropTypeString = function (p) {
                        if (!p.getTypeNode()) {
                            var initVal = p.getInitializer();
                            if (initVal && initVal.getType() && initVal.getType().getApparentType()) {
                                var apparentType = initVal.getType().getApparentType();
                                // convert apparent types
                                var str = apparentType.getSymbol().getEscapedName();
                                if (str === "Number")
                                    return "number";
                                if (str === "Boolean")
                                    return "boolean";
                                if (str === "String")
                                    return "string";
                                if (str === "__object")
                                    return "any";
                                if (apparentType.getTypeArguments()) {
                                    return utils_1.getTypeName(apparentType);
                                }
                                return str;
                            }
                            else {
                                throw "Type must be specified!!!";
                            }
                        }
                        else {
                            return p.getTypeNode().print();
                        }
                    };
                    // mapeservice classes to the properties
                    project.getSourceFiles().forEach(function (sourceFile) {
                        // do not process target files
                        if (generatedFiles.filter(function (m) { return m.file.getFilePath() == sourceFile.getFilePath(); }).length > 0) {
                            return;
                        }
                        sourceFile.getClasses().forEach(function (c) {
                            if (c
                                .getJsDocs()
                                .filter(function (doc) {
                                return doc.getTags().filter(function (tag) { return tag.getName() === "redux"; }).length > 0;
                            }).length > 0) {
                                console.log("ts2redux: Transpiling ", sourceFile.getFilePath());
                                var sourceDir = path.normalize(path.relative(process.cwd(), path.dirname(sourceFile.getFilePath())));
                                var reducerFileName = sourceDir + reducerPath + c.getName() + ".tsx";
                                var ng_1 = RFs.getFile(sourceDir + reducerPath, c.getName() + ".tsx").getWriter();
                                var reducerMethods_1 = c
                                    .getMethods()
                                    .filter(function (m) { return typeof m.getReturnTypeNode() === "undefined"; });
                                var selectorMethods_1 = c.getGetAccessors().filter(function (m) {
                                    if (typeof m.getReturnTypeNode() !== "undefined") {
                                        return true;
                                    }
                                    return false;
                                });
                                if (!dirReducers[sourceDir])
                                    dirReducers[sourceDir] = [];
                                // const inputSet:{[key:string]:Node} = {}
                                // in the end create index.ts for each reducer
                                dirReducers[sourceDir].push({
                                    name: c.getName(),
                                    writer: ng_1,
                                    writerMainDir: sourceDir,
                                    writerReducerDir: sourceDir + reducerPath,
                                    fileName: reducerFileName
                                });
                                var targetPath = path.dirname(reducerFileName);
                                var sourcePath = path.dirname(sourceFile.getFilePath());
                                var relPath = path.relative(targetPath, sourcePath);
                                createComment(ng_1, "\n  Redux Reducers and React Context API Provider/Consumer for state " + c.getName() + "\n  Generated by ts2redux from Source file " + (relPath +
                                    "/" +
                                    path.basename(sourceFile.getFilePath())) + " \n        ");
                                ng_1.out("", true);
                                var myFile = project.createSourceFile("tmpSourceFile.ts", sourceFile.getText());
                                var imports = myFile.getImportDeclarations();
                                for (var _i = 0, imports_1 = imports; _i < imports_1.length; _i++) {
                                    var importDeclaration = imports_1[_i];
                                    var moduleSpecifier = importDeclaration.getModuleSpecifier();
                                    var moduleSpecifierValue = importDeclaration.getModuleSpecifierValue();
                                    if (moduleSpecifierValue.indexOf(".") == 0) {
                                        importDeclaration.setModuleSpecifier(path.relative(targetPath, path.normalize(sourcePath + "/" + moduleSpecifierValue)));
                                    }
                                }
                                ng_1.raw(myFile.getText(), true);
                                myFile.delete();
                                ng_1.out("import * as immer from 'immer'", true);
                                if (selectorMethods_1.length > 0) {
                                    ng_1.out("import { createSelector } from 'reselect'", true);
                                }
                                ng_1.out("import { connect } from 'react-redux'", true);
                                ng_1.out("import { IState } from './index'", true);
                                ng_1.out("import * as React from 'react'", true);
                                // Create model of all the variables...
                                ng_1.out("", true);
                                ng_1.out("export interface IContainerPropsMethods {", true);
                                ng_1.indent(1);
                                var propsMethods_1 = ng_1.fork();
                                // ng.out(`ReduxDispatch: (action:any) => void;`, true);
                                ng_1.indent(-1);
                                ng_1.out("}", true);
                                ng_1.out("export interface I" + c.getName() + " {", true);
                                ng_1.indent(1);
                                c.getProperties().forEach(function (p) {
                                    ng_1.out(p.getNameNode().print() +
                                        getOptionalityOf(p) +
                                        ": " +
                                        getPropTypeString(p), true);
                                });
                                ng_1.indent(-1);
                                ng_1.out("}", true);
                                var selFns_1 = ng_1.fork();
                                ng_1.out("", true);
                                if (selectorMethods_1.length > 0) {
                                    ng_1.out("export interface IContainerPropsState extends I" + c.getName() + " {", true);
                                    ng_1.indent(1);
                                    selectorMethods_1.forEach(function (m) {
                                        ng_1.out(m.getName() + ": " + m.getReturnTypeNode().print(), true);
                                    });
                                    ng_1.indent(-1);
                                    ng_1.out("}", true);
                                }
                                else {
                                    ng_1.out("export type IContainerPropsState = I" + c.getName(), true);
                                }
                                ng_1.out("export interface IProps extends IContainerPropsState, IContainerPropsMethods {}", true);
                                ng_1.out("\n        function pick<T, K extends keyof T>(o: T, ...props: K[]) {\n          return props.reduce((a, e) => ({ ...a, [e]: o[e] }), {}) as Pick<T, K>;\n        }        \n        export function mapStateToPropsWithKeys<K extends keyof IContainerPropsState>(\n          state: IState,\n          keys: K[]\n        ): Pick<IContainerPropsState, K> {\n          return pick(state." + c.getName() + " as IContainerPropsState, ...keys);\n        }               \n\n        ", true);
                                ng_1.out("export const mapStateToProps = (state : IState) : IContainerPropsState => {", true);
                                ng_1.indent(1);
                                ng_1.out("return {", true);
                                ng_1.indent(1);
                                c.getProperties().forEach(function (p) {
                                    ng_1.out(p.getName() + (": state." + c.getName() + ".") + p.getName() + ",", true);
                                });
                                selectorMethods_1.forEach(function (m) {
                                    ng_1.out(m.getName() +
                                        ": " +
                                        m.getName() +
                                        ("Selector(state." + c.getName() + "),"), true);
                                });
                                ng_1.indent(-1);
                                ng_1.out("}", true);
                                ng_1.indent(-1);
                                ng_1.out("}", true);
                                ng_1.out("\n          function mapDispatchToPropsWithKeys<K extends keyof IContainerPropsMethods> (dispatch: any, keys:K[]): Pick<IContainerPropsMethods, K> {\n            return pick(mapDispatchToProps(dispatch), ...keys);\n          };\n          ", true);
                                ng_1.out("export const mapDispatchToProps = (dispatch:any) : IContainerPropsMethods => {", true);
                                ng_1.indent(1);
                                ng_1.out("return {", true);
                                ng_1.indent(1);
                                var dispatchMethods_1 = ng_1.fork();
                                /*
                                ng.out(
                                  `ReduxDispatch: (action:any) => { return dispatch(action) },`,
                                  true
                                );
                                */
                                ng_1.indent(-1);
                                ng_1.out("}", true);
                                ng_1.indent(-1);
                                ng_1.out("}", true);
                                ng_1.out("\n        export function ConnectKeys<K extends keyof I" + c.getName() + ", J extends keyof IContainerPropsMethods>(keys: K[], methods:J[]) {\n          return connect(\n            (state: IState) => mapStateToPropsWithKeys(state, keys),\n            (dispatch: any) => mapDispatchToPropsWithKeys(dispatch, methods)\n          );\n        }      \n        \n        ");
                                ng_1.out("export const StateConnector = connect( mapStateToProps, mapDispatchToProps);", true);
                                ng_1.out("", true);
                                // Create model of all the variables...
                                ng_1.out("const init" + c.getName() + " = () => {", true);
                                ng_1.indent(1);
                                ng_1.out("const o = new " + c.getName() + "();", true);
                                ng_1.out("return {", true);
                                ng_1.indent(1);
                                c.getProperties().forEach(function (p) {
                                    ng_1.out(p.getName() + ": o." + p.getName() + ",", true);
                                });
                                ng_1.indent(-1);
                                ng_1.out("}", true);
                                ng_1.indent(-1);
                                ng_1.out("}", true);
                                ng_1.out("const initWithMethods" + c.getName() + " = () => {", true);
                                ng_1.indent(1);
                                ng_1.out("const o = new " + c.getName() + "();", true);
                                ng_1.out("return {", true);
                                ng_1.indent(1);
                                c.getProperties().forEach(function (p) {
                                    ng_1.out(p.getName() + ": o." + p.getName() + ",", true);
                                });
                                reducerMethods_1.forEach(function (m) {
                                    ng_1.out(m.getName() + ": o." + m.getName() + ",", true);
                                });
                                selectorMethods_1.forEach(function (m) {
                                    ng_1.out(m.getName() + ": o." + m.getName() + ",", true);
                                });
                                // ng.out(`ReduxDispatch: (action:any) => null,`, true);
                                ng_1.indent(-1);
                                ng_1.out("}", true);
                                ng_1.indent(-1);
                                ng_1.out("}", true);
                                // Create model of all the variables...
                                ng_1.raw("\n/**\n * @generated true\n */", true);
                                ng_1.out("export class R" + c.getName() + " {", true);
                                ng_1.indent(1);
                                var body_1 = ng_1.fork();
                                ng_1.indent(-1);
                                ng_1.out("}", true);
                                ng_1.out("", true);
                                ng_1.out("export const " + c.getName() + "Enums = {", true);
                                ng_1.indent(1);
                                var ng_enums_1 = ng_1.fork();
                                ng_1.indent(-1);
                                ng_1.out("}", true);
                                ng_1.out("", true);
                                ng_1.out("export const " + c.getName() + "Reducer = (state:I" + c.getName() + " = init" + c.getName() + "(), action:any ) => {", true);
                                ng_1.indent(1);
                                ng_1.out("return immer.produce(state, draft => {", true);
                                ng_1.indent(1);
                                ng_1.out("switch (action.type) {", true);
                                ng_1.indent(1);
                                var ng_reducers_1 = ng_1.fork();
                                ng_1.indent(-1);
                                ng_1.out("}", true);
                                ng_1.indent(-1);
                                ng_1.out("})", true);
                                ng_1.indent(-1);
                                ng_1.out("}", true);
                                body_1.out("private _state?: I" + c.getName(), true);
                                body_1.out("private _dispatch?: (action:any)=>void", true);
                                body_1.out("private _getState?: ()=>any", true); // I'+c.getName(), true)
                                body_1.out("constructor(state?: I" + c.getName() + ", dispatch?:(action:any)=>void, getState?:()=>any) {", true);
                                body_1.indent(1);
                                body_1.out("this._state = state", true);
                                body_1.out("this._dispatch = dispatch", true);
                                body_1.out("this._getState = getState", true);
                                body_1.indent(-1);
                                body_1.out("}", true);
                                c.getProperties().forEach(function (p) {
                                    if (selectorMethods_1.length > 0) {
                                        selFns_1.out("export const " + p.getName() + "SelectorFn = (state:I" + c.getName() + ") : " + (getPropTypeString(p) +
                                            (p.hasQuestionToken()
                                                ? " | undefined"
                                                : "")) + " => state." + p.getName(), true);
                                    }
                                    var optionality = p.hasQuestionToken() ? "| undefined" : "";
                                    var r_name = c.getName() + "_" + p.getName();
                                    body_1.out("get " +
                                        p.getName() +
                                        "() : " +
                                        getPropTypeString(p) +
                                        optionality +
                                        " {", true);
                                    body_1.indent(1);
                                    body_1.out("if(this._getState) {", true);
                                    body_1.indent(1);
                                    var stateName = c.getName();
                                    body_1.out("return this._getState()." + stateName + "." + p.getName(), true);
                                    body_1.indent(-1);
                                    body_1.out("} else {", true);
                                    body_1.indent(1);
                                    body_1.out("if(this._state) { return this._state." + p.getName() + " }", true);
                                    body_1.indent(-1);
                                    body_1.out("}", true);
                                    if (p.hasQuestionToken()) {
                                        body_1.out("return undefined", true);
                                    }
                                    else {
                                        body_1.out("throw 'Invalid State in " + r_name + "'", true);
                                    }
                                    body_1.indent(-1);
                                    body_1.out("}", true);
                                    body_1.out("set " +
                                        p.getName() +
                                        "(value:" +
                                        getPropTypeString(p) +
                                        optionality +
                                        ") {", true);
                                    body_1.indent(1);
                                    body_1.out("if(this._state && (typeof(value) !== 'undefined')) {", true);
                                    body_1.indent(1);
                                    body_1.out("this._state." + p.getName() + " = value", true);
                                    body_1.indent(-1);
                                    body_1.out("} else {", true);
                                    body_1.indent(1);
                                    body_1.out("// dispatch change for item " + p.getName(), true);
                                    body_1.out("if(this._dispatch) { this._dispatch({type:" + c.getName() + "Enums." + r_name + ", payload:value}) }", true);
                                    body_1.indent(-1);
                                    body_1.out("}", true);
                                    // body.out('this._'+p.getName()+' = value', true)
                                    body_1.indent(-1);
                                    body_1.out("}", true);
                                    ng_enums_1.out(r_name + " : '" + r_name + "',", true);
                                    ng_reducers_1.out("case " + c.getName() + "Enums." + r_name + ": ", true);
                                    ng_reducers_1.indent(1);
                                    ng_reducers_1.out("(new R" + c.getName() + "(draft))." + p.getName() + " = action.payload", true);
                                    ng_reducers_1.out("break;", true);
                                    ng_reducers_1.indent(-1);
                                    // ng_reducers
                                });
                                body_1.out("", true);
                                selectorMethods_1.forEach(function (m) {
                                    var rvNode = m.getReturnTypeNode();
                                    if (rvNode) {
                                        var inputSet_1 = {};
                                        m.getBody().forEachDescendant(function (node, traversal) {
                                            switch (node.getKind()) {
                                                case ts_simple_ast_1.SyntaxKind.PropertyAccessExpression:
                                                    // could be this.
                                                    if (node.getFirstChild().getKind() === ts_simple_ast_1.SyntaxKind.ThisKeyword) {
                                                        inputSet_1[node.getChildAtIndex(2).print()] = node;
                                                    }
                                                    break;
                                            }
                                        });
                                        var properties_1 = {};
                                        var methods_1 = {};
                                        c.getMethods().forEach(function (m) {
                                            methods_1[m.getName()] = m;
                                        });
                                        c.getProperties().forEach(function (p) {
                                            properties_1[p.getName()] = p;
                                        });
                                        Object.keys(inputSet_1).forEach(function (key) {
                                            if (methods_1[key])
                                                throw "Using Methods in selectors not allowed: " + c.getName() + "." + key;
                                        });
                                        var propsKeys = Object.keys(inputSet_1).filter(function (key) { return properties_1[key] != null; });
                                        selFns_1.out("export const " + m.getName() + "SelectorFnCreator = () => createSelector([");
                                        selFns_1.out(propsKeys.map(function (key) { return key + "SelectorFn"; }).join(","));
                                        selFns_1.out("],(");
                                        selFns_1.out(propsKeys.map(function (key) { return key; }).join(","));
                                        selFns_1.out(") => {", true);
                                        selFns_1.indent(1);
                                        selFns_1.out("const o = new " + c.getName() + "()", true);
                                        propsKeys.forEach(function (key) { return selFns_1.out("o." + key + " = " + key, true); });
                                        selFns_1.out("return o." + m.getName(), true);
                                        selFns_1.indent(-1);
                                        selFns_1.out("})", true);
                                        selFns_1.out("export const " + m.getName() + "Selector = " + m.getName() + "SelectorFnCreator()", true);
                                        return;
                                    }
                                });
                                c.getMethods().forEach(function (m) {
                                    var rvNode = m.getReturnTypeNode();
                                    var rvMethod = false;
                                    if (m.compilerNode.modifiers) {
                                        m.compilerNode.modifiers.forEach(function (mm) {
                                            if (mm.getText() === "private")
                                                rvMethod = true;
                                        });
                                    }
                                    if (rvNode) {
                                        rvMethod = true;
                                    }
                                    var typeArgs = m
                                        .getTypeParameters()
                                        .map(function (p) { return p.print(); })
                                        .join(",");
                                    var typeArgStr = typeArgs.length > 0 ? "<" + typeArgs + ">" : "";
                                    if (!rvMethod && m.getParameters().length > 1) {
                                        throw "Error at " + sourceFile.getFilePath() + " in class " + c.getName() + " method " + m.getName() + " can not have more than 2 parameters at the moment";
                                    }
                                    var pName = m
                                        .getParameters()
                                        .filter(function (a, i) { return i < 1; })
                                        .map(function (mod) { return mod.getName(); })
                                        .join("");
                                    if (m.isAsync()) {
                                        if (hasJSTag(m, "dispatch")) {
                                            body_1.out("\nasync " + m.getName() + "(action:any) {\n  if(typeof(this._dispatch) !== \"undefined\") {\n    this._dispatch(action);              \n  }\n}\n              ", true);
                                        }
                                        else {
                                            body_1.raw(m.print(), true);
                                        }
                                    }
                                    else {
                                        // body.out('// is a reducer', true)
                                        var r_name = c.getName() + "_" + m.getName();
                                        var param_name = m.getParameters().length > 0 ? "action.payload" : "";
                                        ng_enums_1.out(r_name + " : '" + r_name + "',", true);
                                        if (!rvMethod) {
                                            ng_reducers_1.out("case " + c.getName() + "Enums." + r_name + ": ", true);
                                            ng_reducers_1.indent(1);
                                            ng_reducers_1.out("(new R" + c.getName() + "(draft))." + m.getName() + "(" + param_name + ")", true);
                                            ng_reducers_1.out("break;", true);
                                            ng_reducers_1.indent(-1);
                                        }
                                        body_1.raw(m
                                            .getModifiers()
                                            .map(function (mod) { return mod.print() + " "; })
                                            .join(""));
                                        body_1.out(m.getName() +
                                            typeArgStr +
                                            "(" +
                                            m
                                                .getParameters()
                                                .map(function (mod) { return mod.print(); })
                                                .join(", ") +
                                            ")");
                                        if (m.getReturnTypeNode())
                                            body_1.out(": " + m.getReturnTypeNode().print());
                                        body_1.out("{", true);
                                        body_1.indent(1);
                                        if (rvMethod) {
                                            m.getBody().forEachChild(function (ch) {
                                                body_1.out(ch.print(), true);
                                            });
                                        }
                                        else {
                                            body_1.out("if(this._state) {", true);
                                            body_1.indent(1);
                                            m.getBody().forEachChild(function (ch) {
                                                body_1.out(ch.print(), true);
                                            });
                                            body_1.indent(-1);
                                            body_1.out("} else {", true);
                                            var firstParam = m
                                                .getParameters()
                                                .filter(function (a, i) { return i < 1; })
                                                .map(function (mod) { return mod.getName(); })
                                                .join("");
                                            var fpCode = firstParam.length > 0 ? ",payload: " + firstParam + " " : "";
                                            body_1.indent(1);
                                            body_1.out("if(this._dispatch) { this._dispatch({type:" + c.getName() + "Enums." + r_name + fpCode + "}) }", true);
                                            body_1.indent(-1);
                                            body_1.out("}", true);
                                        }
                                        body_1.indent(-1);
                                        body_1.out("}", true);
                                    }
                                    // generate the static version
                                    if (!rvMethod) {
                                        body_1.out("", true);
                                        body_1.out("public static ");
                                        body_1.out(m
                                            .getModifiers()
                                            .filter(function (mod) { return mod.getText() != "async" && mod.getText() != "public"; })
                                            .map(function (mod) { return mod.print() + " "; })
                                            .join(""));
                                        body_1.out(m.getName() +
                                            typeArgStr +
                                            "(" +
                                            m
                                                .getParameters()
                                                .map(function (mod) { return mod.print(); })
                                                .join(", ") +
                                            ")");
                                        propsMethods_1.out(m.getName() +
                                            " : " +
                                            typeArgStr +
                                            "(" +
                                            m
                                                .getParameters()
                                                .map(function (mod) { return mod.print(); })
                                                .join(", ") +
                                            ") => any", true);
                                        if (hasJSTag(m, "dispatch")) {
                                            dispatchMethods_1.out("\n              " + m.getName() + ": (action: any) => {\n                return dispatch(action);\n              },              \n              ");
                                        }
                                        else {
                                            dispatchMethods_1.out(m.getName() +
                                                " : " +
                                                typeArgStr +
                                                "(" +
                                                m
                                                    .getParameters()
                                                    .map(function (mod) { return mod.print(); })
                                                    .join(", ") +
                                                ") => {", true);
                                            dispatchMethods_1.indent(1);
                                            dispatchMethods_1.out("return dispatch(R" + c.getName() + "." + m.getName() + "(" + pName + "))", true);
                                            dispatchMethods_1.indent(-1);
                                            dispatchMethods_1.out("},", true);
                                        }
                                        if (m.getReturnTypeNode())
                                            body_1.out(": " + m.getReturnTypeNode().print());
                                        body_1.out("{", true);
                                        body_1.indent(1);
                                        body_1.out("return (dispatcher:any, getState:any) => {", true);
                                        body_1.indent(1);
                                        body_1.out("(new R" + c.getName() + "(undefined, dispatcher, getState))." + m.getName() + "(" + pName + ")", true);
                                        body_1.indent(-1);
                                        body_1.out("}", true);
                                        body_1.indent(-1);
                                        body_1.out("}", true);
                                    }
                                });
                                // https://hackernoon.com/how-to-use-the-new-react-context-api-fce011e7d87
                                // https://daveceddia.com/context-api-vs-redux/
                                var tsx = function (outer) {
                                    // const ng = RFs.getFile(sourceDir + '/reducers/',  c.getName() + 'Ctx.tsx' ).getWriter()
                                    var ng = outer;
                                    // ng.raw(outer.getCode())
                                    createComment(ng, "React Context API component");
                                    // create context...
                                    ng.out("export const " + c.getName() + "Context = React.createContext<IProps>(initWithMethods" + c.getName() + "())", true);
                                    ng.out("export const " + c.getName() + "Consumer = " + c.getName() + "Context.Consumer", true);
                                    ng.out("let instanceCnt = 1", true);
                                    ng.out("export class " + c.getName() + "Provider extends React.Component {", true);
                                    ng.indent(1);
                                    ng.out("public state: I" + c.getName() + " = init" + c.getName() + "() ", true);
                                    ng.out("public lastSetState: I" + c.getName(), true);
                                    ng.out("private __devTools:any = null", true);
                                    // for each selector...
                                    // this.__selector1 = getCompletedListSelectorFnCreator()
                                    selectorMethods_1.forEach(function (m) {
                                        ng.out("private __selector" + m.getName() + ":any = null", true);
                                    });
                                    // devToolsConnection:any = null
                                    ng.out("constructor( props:any ){", true);
                                    ng.indent(1);
                                    ng.out("super(props)", true);
                                    ng.out("this.lastSetState = this.state", true);
                                    var binder = ng.fork();
                                    // for each selector
                                    // this.__selector1 = getCompletedListSelectorFnCreator()
                                    selectorMethods_1.forEach(function (m) {
                                        ng.out("this.__selector" + m.getName() + " = " + m.getName() + "SelectorFnCreator()", true);
                                    });
                                    if (!settings.disableDevtoolsFromContext) {
                                        ng.out("const devs = window['__REDUX_DEVTOOLS_EXTENSION__'] ? window['__REDUX_DEVTOOLS_EXTENSION__'] : null", true);
                                        ng.out("if(devs) {", true);
                                        ng.indent(1);
                                        ng.out("this.__devTools = devs.connect({name:'" + c.getName() + "'+instanceCnt++})", true);
                                        ng.out("this.__devTools.init(this.state)", true);
                                        ng.out("this.__devTools.subscribe( (msg:any) => {", true);
                                        ng.indent(1);
                                        ng.out("if (msg.type === 'DISPATCH' && msg.state) {", true);
                                        ng.indent(1);
                                        ng.out("this.setState(JSON.parse(msg.state))", true);
                                        ng.indent(-1);
                                        ng.out("}", true);
                                        ng.indent(-1);
                                        ng.out("})", true);
                                        ng.indent(-1);
                                        ng.out("}", true);
                                    }
                                    ng.indent(-1);
                                    ng.out("}", true);
                                    if (!settings.disableDevtoolsFromContext) {
                                        ng.out("public componentWillUnmount() {", true);
                                        ng.indent(1);
                                        ng.out("if(this.__devTools) { this.__devTools.unsubscribe() }", true);
                                        ng.indent(-1);
                                        ng.out("}", true);
                                    }
                                    ng.out("public setStateSync(state: I" + c.getName() + ") {", true);
                                    ng.indent(1);
                                    ng.out("this.lastSetState = state", true);
                                    ng.out("this.setState(state)", true);
                                    ng.indent(-1);
                                    ng.out("}", true);
                                    reducerMethods_1.forEach(function (m) {
                                        var typeArgs = m
                                            .getTypeParameters()
                                            .map(function (p) { return p.print(); })
                                            .join(",");
                                        var typeArgStr = typeArgs.length > 0 ? "<" + typeArgs + ">" : "";
                                        var body = ng;
                                        body.raw(m
                                            .getModifiers()
                                            .map(function (mod) { return mod.print() + " "; })
                                            .join(""));
                                        binder.out("this." + m.getName() + " = this." + m.getName() + ".bind(this)", true);
                                        body.out(m.getName() +
                                            typeArgStr +
                                            "(" +
                                            m
                                                .getParameters()
                                                .map(function (mod) { return mod.print(); })
                                                .join(", ") +
                                            ")");
                                        // if(m.getReturnTypeNode()) body.out( ': ' + m.getReturnTypeNode().print() )
                                        body.out("{", true);
                                        body.indent(1);
                                        var firstParam = m
                                            .getParameters()
                                            .filter(function (a, i) { return i < 1; })
                                            .map(function (mod) { return mod.getName(); })
                                            .join("");
                                        if (m.isAsync()) {
                                            body.out("(new R" + c.getName() + "(undefined, (action:any) => {", true);
                                            body.indent(1);
                                            if (!settings.disableDevtoolsFromContext) {
                                                body.out("const nextState = " + c.getName() + "Reducer( this.lastSetState, action )", true);
                                                body.out("if(this.__devTools) { this.__devTools.send(action.type, nextState) }", true);
                                                body.out("this.setStateSync(nextState)", true);
                                            }
                                            else {
                                                body.out("this.setStateSync(" + c.getName() + "Reducer( this.lastSetState, action ))", true);
                                            }
                                            body.indent(-1);
                                            body.out("}, () => ({" + c.getName() + ":this.lastSetState})) )." + m.getName() + "(" + firstParam + ")", true);
                                        }
                                        else {
                                            if (!settings.disableDevtoolsFromContext) {
                                                body.out("const nextState = immer.produce( this.state, draft => ( new R" + c.getName() + "(draft) )." + m.getName() + "(" + firstParam + ") )", true);
                                                body.out("if(this.__devTools) { this.__devTools.send('" + m.getName() + "', nextState) } ", true);
                                                body.out("this.setStateSync(nextState)", true);
                                            }
                                            else {
                                                body.out("this.setStateSync(immer.produce( this.state, draft => ( new R" + c.getName() + "(draft) )." + m.getName() + "(" + firstParam + ") ))", true);
                                            }
                                        }
                                        body.indent(-1);
                                        body.out("}", true);
                                    });
                                    ng.out("public render() {", true);
                                    ng.indent(1);
                                    ng.out("return (<" + c.getName() + "Context.Provider value={{...this.state, ", true);
                                    ng.indent(1);
                                    reducerMethods_1.forEach(function (m) {
                                        ng.out(m.getName() + ": this." + m.getName() + ",", true);
                                    });
                                    // getCompletedList: this.__selector1(this.state), // TODO: fix this
                                    selectorMethods_1.forEach(function (m) {
                                        // ng.out(`this.__selector${m.getName()} = ${m.getName()}SelectorFnCreator()`, true)
                                        ng.out(m.getName() + (": this.__selector" + m.getName() + "(this.state),"), true);
                                    });
                                    // ng.out("ReduxDispatch: (action:any) => null,", true);
                                    ng.indent(-1);
                                    ng.out("}}> {this.props.children} ", true);
                                    ng.out("</" + c.getName() + "Context.Provider>)", true);
                                    ng.indent(-1);
                                    ng.out("}", true);
                                    ng.indent(-1);
                                    ng.out("}", true);
                                };
                                tsx(ng_1);
                            }
                        });
                    });
                    Object.keys(dirReducers).forEach(function (dirName) {
                        var list = dirReducers[dirName];
                        var wr = RFs.getFile(dirName + reducerPath, "index.ts").getWriter();
                        createComment(wr, "\n    Combined Reducers for main application\n    Generated by ts2redux\n          ");
                        wr.out("import * as redux from 'redux';", true);
                        if (settings.router) {
                            wr.out("import { connectRouter } from 'connected-react-router'", true);
                        }
                        list.forEach(function (m) {
                            var _a = [m.name + "Reducer", "I" + m.name]
                                .sort()
                                .reverse(), first = _a[0], second = _a[1];
                            wr.out("import { " + second + ", " + first + " } from './" + m.name + "';", true);
                        });
                        wr.out("export interface IState {", true);
                        wr.indent(1);
                        list.forEach(function (m) {
                            wr.out(m.name + ": I" + m.name, true);
                        });
                        wr.indent(-1);
                        wr.out("}", true);
                        wr.out("// use reducerObject if you combine reducers manually", true);
                        wr.out("// for example when using connected-react-router", true);
                        wr.out("export const reducerObject = {", true);
                        wr.indent(1);
                        list.forEach(function (m) {
                            wr.out(m.name + ": " + m.name + "Reducer,", true);
                        });
                        wr.indent(-1);
                        wr.out("}", true);
                        wr.out("export const reducers = redux.combineReducers<IState>(reducerObject)", true);
                    });
                    return [4 /*yield*/, prettier.resolveConfig(process.cwd())];
                case 1:
                    prettierConfig = _a.sent();
                    return [4 /*yield*/, RFs.saveTo("./", { usePrettier: true, prettierConfig: prettierConfig })];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, project.save()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createProject = createProject;
//# sourceMappingURL=index.js.map