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
var path = require("path");
var createComment = function (wr, txt) {
    var lines = txt.split('\n');
    var longest = lines.map(function (line) { return line.length; }).reduce(function (prev, curr) { return Math.max(prev, curr); }, 0);
    var maxLine = longest + 6;
    var printLine = function (txt, fill, len) {
        var res = txt;
        var fillLen = len - txt.length;
        for (var i = 0; i < fillLen; i++) {
            res = res + fill;
        }
        return res;
    };
    wr.out('/*' + printLine('', '*', maxLine - 3) + '*', true);
    txt.split('\n').forEach(function (line) {
        wr.out('* ' + printLine(line, ' ', maxLine - 4) + ' *', true);
    });
    wr.out('*' + printLine('', '*', maxLine - 3) + '*/', true);
};
function createProject(settings) {
    return __awaiter(this, void 0, void 0, function () {
        var project, reducerPath, RFs, targetFiles, modelsList, generatedFiles, dirReducers, JSTags;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    project = new ts_simple_ast_1.default();
                    reducerPath = '/' + settings.reducerPath + '/';
                    project.addExistingSourceFiles([settings.path + "/**/*.ts", settings.path + "/**/*.tsx"]); // , "!**/*.d.ts"
                    RFs = new R.CodeFileSystem();
                    targetFiles = {};
                    modelsList = [];
                    generatedFiles = [];
                    dirReducers = {};
                    JSTags = function (c, name) {
                        var res = [];
                        c.getJsDocs().forEach(function (doc) { return doc.getTags().forEach(function (tag) {
                            if (tag.getName() === name)
                                res.push(tag.getComment());
                        }); });
                        return res;
                    };
                    project.getSourceFiles().forEach(function (sourceFile) {
                        sourceFile.getClasses().forEach(function (c) {
                            JSTags(c, 'generated').forEach(function (model) {
                                generatedFiles.push({
                                    name: '',
                                    iface: c,
                                    file: sourceFile
                                });
                            });
                            JSTags(c, 'redux').forEach(function (model) {
                                modelsList.push({
                                    name: model,
                                    iface: c,
                                    file: sourceFile
                                });
                            });
                        });
                    });
                    // mapeservice classes to the properties
                    project.getSourceFiles().forEach(function (sourceFile) {
                        // do not process target files
                        if (generatedFiles.filter(function (m) { return m.file.getFilePath() == sourceFile.getFilePath(); }).length > 0) {
                            return;
                        }
                        sourceFile.getClasses().forEach(function (c) {
                            if (c.getJsDocs().filter(function (doc) { return doc.getTags().filter(function (tag) { return tag.getName() === 'redux'; }).length > 0; }).length > 0) {
                                var sourceDir = path.normalize(path.relative(process.cwd(), path.dirname(sourceFile.getFilePath())));
                                var reducerFileName = sourceDir + reducerPath + c.getName() + '.tsx';
                                var ng_1 = RFs.getFile(sourceDir + reducerPath, c.getName() + '.tsx').getWriter();
                                if (!dirReducers[sourceDir])
                                    dirReducers[sourceDir] = [];
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
                                createComment(ng_1, "\n  Redux Reducers and React Context API Provider/Consumer for state " + c.getName() + "\n  Generated by ts2redux at " + (new Date()).toISOString() + "\n  From Source file " + (relPath + '/' + path.basename(sourceFile.getFilePath())) + " \n        ");
                                ng_1.out("", true);
                                ng_1.raw(sourceFile.getText(), true);
                                ng_1.out("import * as immer from 'immer'", true);
                                ng_1.out("import { connect } from 'react-redux'", true);
                                ng_1.out("import { State } from './index'", true);
                                ng_1.out("import * as React from 'react'", true);
                                // Create model of all the variables...
                                ng_1.out("", true);
                                ng_1.out("export interface ContainerPropsMethods {", true);
                                ng_1.indent(1);
                                var propsMethods_1 = ng_1.fork();
                                ng_1.indent(-1);
                                ng_1.out("}", true);
                                ng_1.out('export interface I' + c.getName() + ' {', true);
                                ng_1.indent(1);
                                c.getProperties().forEach(function (p) {
                                    ng_1.out(p.getNameNode().print() + ': ' + p.getTypeNode().print(), true);
                                });
                                ng_1.indent(-1);
                                ng_1.out('}', true);
                                ng_1.out('', true);
                                ng_1.out("export interface ContainerPropsState extends I" + c.getName() + " {}", true);
                                ng_1.out("export interface Props extends ContainerPropsState, ContainerPropsMethods {}", true);
                                ng_1.out('export const mapStateToProps = (state : State) : ContainerPropsState => {', true);
                                ng_1.indent(1);
                                ng_1.out('return {', true);
                                ng_1.indent(1);
                                c.getProperties().forEach(function (p) {
                                    ng_1.out(p.getName() + (": state." + c.getName() + ".") + p.getName() + ',', true);
                                });
                                ng_1.indent(-1);
                                ng_1.out('}', true);
                                ng_1.indent(-1);
                                ng_1.out('}', true);
                                ng_1.out('export const mapDispatchToProps = (dispatch) : ContainerPropsMethods => {', true);
                                ng_1.indent(1);
                                ng_1.out('return {', true);
                                ng_1.indent(1);
                                var dispatchMethods_1 = ng_1.fork();
                                ng_1.indent(-1);
                                ng_1.out('}', true);
                                ng_1.indent(-1);
                                ng_1.out('}', true);
                                ng_1.out("export const StateConnector = connect( mapStateToProps, mapDispatchToProps);", true);
                                ng_1.out('', true);
                                // Create model of all the variables...
                                ng_1.out('const init_' + c.getName() + ' = () => {', true);
                                ng_1.indent(1);
                                ng_1.out('const o = new ' + c.getName() + '();', true);
                                ng_1.out('return {', true);
                                ng_1.indent(1);
                                c.getProperties().forEach(function (p) {
                                    ng_1.out(p.getName() + ': o.' + p.getName() + ',', true);
                                });
                                ng_1.indent(-1);
                                ng_1.out('}', true);
                                ng_1.indent(-1);
                                ng_1.out('}', true);
                                // Create model of all the variables...
                                ng_1.raw("\n/**\n * @generated true\n */", true);
                                ng_1.out('export class R' + c.getName() + ' {', true);
                                ng_1.indent(1);
                                var body_1 = ng_1.fork();
                                ng_1.indent(-1);
                                ng_1.out('}', true);
                                ng_1.out('', true);
                                ng_1.out("export const " + c.getName() + "Enums = {", true);
                                ng_1.indent(1);
                                var ng_enums_1 = ng_1.fork();
                                ng_1.indent(-1);
                                ng_1.out('}', true);
                                ng_1.out('', true);
                                ng_1.out("export const " + c.getName() + "Reducer = (state:I" + c.getName() + " = init_" + c.getName() + "(), action) => {", true);
                                ng_1.indent(1);
                                ng_1.out('return immer.produce(state, draft => {', true);
                                ng_1.indent(1);
                                ng_1.out("switch (action.type) {", true);
                                ng_1.indent(1);
                                var ng_reducers_1 = ng_1.fork();
                                ng_1.indent(-1);
                                ng_1.out('}', true);
                                ng_1.indent(-1);
                                ng_1.out('})', true);
                                ng_1.indent(-1);
                                ng_1.out('}', true);
                                body_1.out('private _state?: I' + c.getName(), true);
                                body_1.out('private _dispatch?: (action:any)=>void', true);
                                body_1.out('private _getState?: ()=>any', true); // I'+c.getName(), true)
                                body_1.out("constructor(state?: I" + c.getName() + ", dispatch?:(action:any)=>void, getState?:()=>any) {", true);
                                body_1.indent(1);
                                body_1.out('this._state = state', true);
                                body_1.out('this._dispatch = dispatch', true);
                                body_1.out('this._getState = getState', true);
                                body_1.indent(-1);
                                body_1.out('}', true);
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
                                c.getProperties().forEach(function (p) {
                                    var r_name = c.getName() + "_" + p.getName();
                                    body_1.out('get ' + p.getName() + '() : ' + p.getTypeNode().print() + '{', true);
                                    body_1.indent(1);
                                    body_1.out('if(this._getState) {', true);
                                    body_1.indent(1);
                                    var stateName = c.getName();
                                    body_1.out('return this._getState().' + stateName + '.' + p.getName(), true);
                                    body_1.indent(-1);
                                    body_1.out('} else {', true);
                                    body_1.indent(1);
                                    body_1.out('return this._state.' + p.getName(), true);
                                    body_1.indent(-1);
                                    body_1.out('}', true);
                                    body_1.indent(-1);
                                    body_1.out('}', true);
                                    body_1.out('set ' + p.getName() + '(value:' + p.getTypeNode().print() + ') {', true);
                                    body_1.indent(1);
                                    body_1.out('if(this._state) {', true);
                                    body_1.indent(1);
                                    body_1.out("this._state." + p.getName() + " = value", true);
                                    body_1.indent(-1);
                                    body_1.out('} else {', true);
                                    body_1.indent(1);
                                    body_1.out("// dispatch change for item " + p.getName(), true);
                                    body_1.out("this._dispatch({type:" + c.getName() + "Enums." + r_name + ", payload:value})", true);
                                    body_1.indent(-1);
                                    body_1.out('}', true);
                                    // body.out('this._'+p.getName()+' = value', true)
                                    body_1.indent(-1);
                                    body_1.out('}', true);
                                    ng_enums_1.out(r_name + " : '" + r_name + "',", true);
                                    ng_reducers_1.out("case " + c.getName() + "Enums." + r_name + ": ", true);
                                    ng_reducers_1.indent(1);
                                    ng_reducers_1.out("(new R" + c.getName() + "(draft))." + p.getName() + " = action.payload", true);
                                    ng_reducers_1.out('break;', true);
                                    ng_reducers_1.indent(-1);
                                    // ng_reducers
                                });
                                body_1.out('', true);
                                c.getMethods().forEach(function (m) {
                                    if (m.getParameters().length > 1) {
                                        throw "Error at " + sourceFile.getFilePath() + " in class " + c.getName() + " method " + m.getName() + " can not have more than 2 parameters at the moment";
                                    }
                                    var pName = m.getParameters().filter(function (a, i) { return i < 1; }).map(function (mod) { return mod.getName(); }).join('');
                                    if (m.isAsync()) {
                                        body_1.out('// is task', true);
                                        body_1.raw(m.print(), true);
                                    }
                                    else {
                                        body_1.out('// is a reducer', true);
                                        var r_name = c.getName() + "_" + m.getName();
                                        var param_name = m.getParameters().length > 0 ? 'action.payload' : '';
                                        ng_enums_1.out(r_name + " : '" + r_name + "',", true);
                                        ng_reducers_1.out("case " + c.getName() + "Enums." + r_name + ": ", true);
                                        ng_reducers_1.indent(1);
                                        ng_reducers_1.out("(new R" + c.getName() + "(draft))." + m.getName() + "(" + param_name + ")", true);
                                        ng_reducers_1.out('break;', true);
                                        ng_reducers_1.indent(-1);
                                        body_1.raw(m.getModifiers().map(function (mod) { return mod.print() + ' '; }).join(''));
                                        body_1.out(m.getName() + '(' + m.getParameters().map(function (mod) { return mod.print(); }).join(', ') + ')');
                                        if (m.getReturnTypeNode())
                                            body_1.out(': ' + m.getReturnTypeNode().print());
                                        body_1.out('{', true);
                                        body_1.indent(1);
                                        body_1.out('if(this._state) {', true);
                                        body_1.indent(1);
                                        m.getBody().forEachChild(function (ch) {
                                            body_1.out(ch.print(), true);
                                        });
                                        body_1.indent(-1);
                                        body_1.out('} else {', true);
                                        var firstParam = m.getParameters().filter(function (a, i) { return i < 1; }).map(function (mod) { return mod.getName(); }).join('');
                                        var fpCode = firstParam.length > 0 ? ",payload: " + firstParam + " " : '';
                                        body_1.indent(1);
                                        body_1.out("this._dispatch({type:" + c.getName() + "Enums." + r_name + fpCode + "})", true);
                                        body_1.indent(-1);
                                        body_1.out('}', true);
                                        body_1.indent(-1);
                                        body_1.out('}', true);
                                    }
                                    // generate the static version
                                    body_1.out('', true);
                                    body_1.out('static ');
                                    body_1.out(m.getModifiers().filter(function (mod) { return mod.getText() != 'async'; }).map(function (mod) { return mod.print() + ' '; }).join(''));
                                    body_1.out(m.getName() + '(' + m.getParameters().map(function (mod) { return mod.print(); }).join(', ') + ')');
                                    propsMethods_1.out(m.getName() + '? : (' + m.getParameters().map(function (mod) { return mod.print(); }).join(', ') + ') => any', true);
                                    dispatchMethods_1.out(m.getName() + ' : (' + m.getParameters().map(function (mod) { return mod.print(); }).join(', ') + ') => {', true);
                                    dispatchMethods_1.indent(1);
                                    dispatchMethods_1.out("return dispatch(R" + c.getName() + "." + m.getName() + "(" + pName + "))", true);
                                    dispatchMethods_1.indent(-1);
                                    dispatchMethods_1.out('},', true);
                                    if (m.getReturnTypeNode())
                                        body_1.out(': ' + m.getReturnTypeNode().print());
                                    body_1.out('{', true);
                                    body_1.indent(1);
                                    body_1.out("return (dispatcher, getState) => {", true);
                                    body_1.indent(1);
                                    body_1.out("(new R" + c.getName() + "(null, dispatcher, getState))." + m.getName() + "(" + pName + ")", true);
                                    body_1.indent(-1);
                                    body_1.out('}', true);
                                    body_1.indent(-1);
                                    body_1.out('}', true);
                                });
                                // https://hackernoon.com/how-to-use-the-new-react-context-api-fce011e7d87
                                // https://daveceddia.com/context-api-vs-redux/
                                var tsx = function (outer) {
                                    // const ng = RFs.getFile(sourceDir + '/reducers/',  c.getName() + 'Ctx.tsx' ).getWriter()
                                    var ng = outer;
                                    // ng.raw(outer.getCode())
                                    createComment(ng, 'React Context API test');
                                    // create context...
                                    ng.out("export const " + c.getName() + "Context = React.createContext<Props>(null)", true);
                                    ng.out("export const " + c.getName() + "Consumer = " + c.getName() + "Context.Consumer", true);
                                    ng.out("let instanceCnt = 1", true);
                                    ng.out("export class " + c.getName() + "Provider extends React.Component {", true);
                                    ng.indent(1);
                                    ng.out("state: I" + c.getName() + " = init_" + c.getName() + "() ", true);
                                    ng.out("__devTools:any = null", true);
                                    // devToolsConnection:any = null  
                                    ng.out("constructor( props ){", true);
                                    ng.indent(1);
                                    ng.out("super(props)", true);
                                    var binder = ng.fork();
                                    if (!settings.disableDevtoolsFromContext) {
                                        ng.out("const devs = window['devToolsExtension'] ? window['devToolsExtension'] : null", true);
                                        ng.out("if(devs) {", true);
                                        ng.indent(1);
                                        ng.out("this.__devTools = devs.connect({name:'" + c.getName() + "'+instanceCnt++})", true);
                                        ng.out("this.__devTools.init(this.state)", true);
                                        ng.out("this.__devTools.subscribe( msg => {", true);
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
                                        ng.out("componentWillUnmount() {", true);
                                        ng.indent(1);
                                        ng.out("if(this.__devTools) this.__devTools.unsubscribe()", true);
                                        ng.indent(-1);
                                        ng.out("}", true);
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
                                    c.getMethods().forEach(function (m) {
                                        var body = ng;
                                        body.raw(m.getModifiers().map(function (mod) { return mod.print() + ' '; }).join(''));
                                        binder.out("this." + m.getName() + " = this." + m.getName() + ".bind(this)", true);
                                        body.out(m.getName() + '(' + m.getParameters().map(function (mod) { return mod.print(); }).join(', ') + ')');
                                        // if(m.getReturnTypeNode()) body.out( ': ' + m.getReturnTypeNode().print() ) 
                                        body.out('{', true);
                                        body.indent(1);
                                        var firstParam = m.getParameters().filter(function (a, i) { return i < 1; }).map(function (mod) { return mod.getName(); }).join('');
                                        if (m.isAsync()) {
                                            body.out("(new R" + c.getName() + "(null, (action) => {", true);
                                            body.indent(1);
                                            if (!settings.disableDevtoolsFromContext) {
                                                body.out("const nextState = " + c.getName() + "Reducer( this.state, action )", true);
                                                body.out("if(this.__devTools) this.__devTools.send(action.type, nextState)", true);
                                                body.out("this.setState(nextState)", true);
                                            }
                                            else {
                                                body.out("this.setState(" + c.getName() + "Reducer( this.state, action ))", true);
                                            }
                                            body.indent(-1);
                                            body.out("}, () => ({" + c.getName() + ":this.state})) )." + m.getName() + "(" + firstParam + ")", true);
                                        }
                                        else {
                                            if (!settings.disableDevtoolsFromContext) {
                                                body.out("const nextState = immer.produce( this.state, draft => ( new R" + c.getName() + "(draft) )." + m.getName() + "(" + firstParam + ") )", true);
                                                body.out("if(this.__devTools) this.__devTools.send('" + m.getName() + "', nextState)", true);
                                                body.out("this.setState(nextState)", true);
                                            }
                                            else {
                                                body.out("this.setState(immer.produce( this.state, draft => ( new R" + c.getName() + "(draft) )." + m.getName() + "(" + firstParam + ") ))", true);
                                            }
                                        }
                                        body.indent(-1);
                                        body.out('}', true);
                                    });
                                    ng.out('render() {', true);
                                    ng.indent(1);
                                    ng.out("return (<" + c.getName() + "Context.Provider value={{...this.state, ", true);
                                    ng.indent(1);
                                    c.getMethods().forEach(function (m) {
                                        ng.out(m.getName() + ': this.' + m.getName() + ',', true);
                                    });
                                    ng.indent(-1);
                                    ng.out("}}> {this.props.children} ", true);
                                    ng.out("</" + c.getName() + "Context.Provider>)", true);
                                    ng.indent(-1);
                                    ng.out('}', true);
                                    ng.indent(-1);
                                    ng.out("}", true);
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
                                };
                                tsx(ng_1);
                            }
                        });
                    });
                    Object.keys(dirReducers).forEach(function (dirName) {
                        var list = dirReducers[dirName];
                        var wr = RFs.getFile(dirName + reducerPath, 'index.ts').getWriter();
                        createComment(wr, "\n    Combined Reducers for main application\n    Generated by ts2redux at " + (new Date()).toISOString() + "\n          ");
                        wr.out("import * as redux from 'redux';", true);
                        list.forEach(function (m) {
                            wr.out("import { " + m.name + "Reducer, I" + m.name + " } from './" + m.name + "';", true);
                        });
                        wr.out("export interface State {", true);
                        wr.indent(1);
                        list.forEach(function (m) {
                            wr.out(m.name + ": I" + m.name, true);
                        });
                        wr.indent(-1);
                        wr.out('}', true);
                        wr.out("export const reducers = redux.combineReducers<State>({", true);
                        wr.indent(1);
                        list.forEach(function (m) {
                            wr.out(m.name + ": " + m.name + "Reducer,", true);
                        });
                        wr.indent(-1);
                        wr.out('})', true);
                    });
                    return [4 /*yield*/, RFs.saveTo('./', false)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, project.save()];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
exports.createProject = createProject;
//# sourceMappingURL=index.js.map