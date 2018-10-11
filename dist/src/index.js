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
var ts_simple_ast_2 = require("ts-simple-ast");
function createProject(settings) {
    return __awaiter(this, void 0, void 0, function () {
        var project, RFs, webclient, services, reduxModels, ifaceHasKey, ACTIONS_PATH, REDUCERS_PATH, ng, enums, actions, reducers, actionImportFork, reducerImportFork, actionImports, reducerImports, actionEnums, writerCache, createReducerFn;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    project = new ts_simple_ast_1.default();
                    project.addExistingSourceFiles([settings.path + "/**/*.ts", settings.path + "/**/*.tsx"]); // , "!**/*.d.ts"
                    RFs = new R.CodeFileSystem();
                    webclient = RFs.getFile('/src/frontend/api/', 'index.ts').getWriter();
                    services = webclient.getState().services = {};
                    reduxModels = {};
                    ifaceHasKey = function (iface, name) {
                        return iface.getProperties().filter(function (p) { return p.getName() == name; }).length > 0;
                    };
                    // https://dsherret.github.io/ts-simple-ast/details/interfaces
                    project.getSourceFiles().forEach(function (sourceFile) {
                        sourceFile.getInterfaces().forEach(function (i) {
                            if (i.getJsDocs().filter(function (doc) { return doc.getTags().filter(function (tag) { return tag.getName() === 'redux'; }).length > 0; }).length > 0) {
                                reduxModels[i.getName()] = {
                                    iface: i,
                                    file: sourceFile,
                                    initFn: null,
                                };
                                // example of adding property to the interface...
                                /*
                                if(i.getName() == 'ShopCartModel') {
                                  i.addProperty({ name: "helloWorld?", type: "TaskState<ShopCartItem>" })
                                }
                                */
                            }
                        });
                    });
                    ACTIONS_PATH = '/src/frontend/api/actions/';
                    REDUCERS_PATH = '/src/frontend/api/reducers/';
                    ng = RFs.getFile('/src/frontend/', 'ng.ts').getWriter();
                    enums = RFs.getFile('/src/frontend/api/common/', 'actionEnums.ts').getWriter();
                    actions = RFs.getFile('/src/frontend/api/actions/', 'actions.ts').getWriter();
                    reducers = RFs.getFile('/src/frontend/api/reducers/', 'reducers.ts').getWriter();
                    // TODO:
                    // - the model AND the function must be imported...
                    reducers.out("import { actionsEnums } from '../common/actionEnums'", true);
                    actions.out("import { actionsEnums } from '../common/actionEnums'", true);
                    actionImportFork = actions.fork();
                    reducerImportFork = reducers.fork();
                    actionImports = {};
                    reducerImports = {};
                    enums.out('export const actionsEnums = {', true);
                    enums.indent(1);
                    actionEnums = enums.fork();
                    enums.indent(-1);
                    enums.out('}', true);
                    writerCache = {};
                    createReducerFn = function (modelName, model) {
                        if (writerCache[modelName])
                            return writerCache[modelName];
                        // Reducer for some UI state is defined like this...
                        var initializer = model.initFn ? model.initFn.getName() + '()' : '{}';
                        reducers.out('', true);
                        reducers.out("export const " + modelName + "Reducer = (state:" + modelName + " = " + initializer + ", action) => {", true);
                        reducers.indent(1);
                        reducers.out("switch (action.type) {", true);
                        var actionReducers = reducers.fork();
                        var actionFn = "ACTION_" + modelName.toUpperCase() + "_FN";
                        actionEnums.out(actionFn + " : \"" + actionFn + "\",", true);
                        actionReducers.indent(1);
                        actionReducers.out("case actionsEnums." + actionFn + ":", true);
                        actionReducers.indent(1);
                        actionReducers.out("return action.payload(state) ", true);
                        actionReducers.indent(-1);
                        actionReducers.indent(-1);
                        reducers.out('}', true);
                        reducers.out('return state', true);
                        reducers.indent(-1);
                        reducers.out('}', true);
                        writerCache[modelName] = actionReducers;
                        return actionReducers;
                    };
                    // mapeservice classes to the properties
                    project.getSourceFiles().forEach(function (sourceFile) {
                        if (path.basename(sourceFile.getFilePath()) == 'ng.ts')
                            return;
                        /*
                        sourceFile.getVariableDeclarations().forEach( d => {
                          console.log('Variable ', d.getName())
                          console.log( getTypeName( d.getInitializer().getType()));
                          // console.log( getTypeName( d.getInit().getType()));
                        })
                        */
                        sourceFile.getFunctions().forEach(function (f) {
                            // console.log(f.getName())
                            // reduxModels
                            var returnType = utils_1.getTypePath(f.getReturnType()).pop();
                            if (f.getParameters().length == 0) {
                                if (reduxModels[returnType]) {
                                    // This is initializer function
                                    reduxModels[returnType].initFn = f;
                                }
                            }
                            var secondParam = f.getParameters()[1];
                            if (!secondParam)
                                return;
                            var payloadType = utils_1.getTypeName(secondParam.getType());
                            var payloadTypePath = utils_1.getTypePath(secondParam.getType());
                            var payloadImportType = payloadTypePath[payloadTypePath.length - 1];
                            var isSimpleType = function (name) {
                                return name === 'string' || name === 'number' || name === 'boolean';
                            };
                            if (reduxModels[returnType]) {
                                var model_1 = reduxModels[returnType];
                                var actionID_1 = (returnType + '_' + f.getName()).toUpperCase();
                                var actionName = 'ACTION_' + actionID_1;
                                actionEnums.out(actionName + " : \"" + actionName + "\",", true);
                                var actionsPath_1 = path.normalize(__dirname.replace('dist/src', '') + ACTIONS_PATH);
                                var reducersPath = path.normalize(__dirname.replace('dist/src', '') + REDUCERS_PATH);
                                var modelFile = model_1.file.getFilePath();
                                var functionFile_1 = sourceFile.getFilePath();
                                actionImports[returnType] = path.relative(actionsPath_1, path.dirname(modelFile)) + '/' + path.basename(modelFile, '.ts');
                                reducerImports[returnType] = path.relative(reducersPath, path.dirname(modelFile)) + '/' + path.basename(modelFile, '.ts');
                                if (model_1.initFn) {
                                    reducerImports[model_1.initFn.getName()] = path.relative(reducersPath, path.dirname(modelFile)) + '/' + path.basename(modelFile, '.ts');
                                }
                                // the function is not actually needed to be imported here
                                reducerImports[f.getName()] = path.relative(actionsPath_1, path.dirname(functionFile_1)) + '/' + path.basename(functionFile_1, '.ts');
                                if (!isSimpleType(payloadImportType)) {
                                    actionImports[payloadImportType] = path.relative(actionsPath_1, path.dirname(functionFile_1)) + '/' + path.basename(functionFile_1, '.ts');
                                }
                                var actionReducers = createReducerFn(returnType, model_1);
                                actionReducers.indent(1);
                                actionReducers.out("case actionsEnums." + actionName + ":", true);
                                actionReducers.indent(1);
                                actionReducers.out("return " + f.getName() + "(state, action.payload) ", true);
                                actionReducers.indent(-1);
                                actionReducers.indent(-1);
                                actions.out('', true);
                                actions.out('// Action which can be dispatched ', true);
                                actions.out("export const action_" + actionID_1 + " = (payload:" + utils_1.getTypeName(secondParam.getType()) + ") => { ", true);
                                actions.indent(1);
                                actions.out('return {', true);
                                actions.indent(1);
                                actions.out('type : actionsEnums.' + actionName + ',', true);
                                actions.out('payload', true);
                                actions.indent(-1);
                                actions.out('}', true);
                                actions.indent(-1);
                                actions.out('}', true);
                                // Call the function which modifies the state...
                                var createTaskFor = function (taskFn) {
                                    var taskName = taskFn.getName();
                                    console.log('Found Task ', taskFn.getName());
                                    actionImports[taskName] = path.relative(actionsPath_1, path.dirname(functionFile_1)) + '/' + path.basename(functionFile_1, '.ts');
                                    var filteredParams = taskFn.getParameters().filter(function (p) { return p.getName() != 'dispatch'; });
                                    var paramStr = filteredParams.map(function (p) { return p.getName() + ':' + utils_1.getTypeName(p.getType()); }).join(', ');
                                    var params = taskFn.getParameters().map(function (p) { return p.getName(); }).join(', ');
                                    var hasState = false;
                                    if (ifaceHasKey(model_1.iface, taskName)) {
                                        console.log('MODEL has key ', taskName);
                                        var upper = taskName.toUpperCase();
                                        actionEnums.out("RUNNING_" + upper + " : \"RUNNING_" + upper + "\",", true);
                                        actionEnums.out("ERROR_" + upper + " : \"ERROR_" + upper + "\",", true);
                                        actionEnums.out("SUCCESS_" + upper + " : \"SUCCESS_" + upper + "\",", true);
                                        hasState = true;
                                    }
                                    actions.out('', true);
                                    actions.out('// function which is related to the action... ', true);
                                    actions.out("export const " + taskName + "Dispatcher = (" + paramStr + ") => async (dispatch) => { ", true);
                                    actions.indent(1);
                                    if (hasState) {
                                        actions.out('try {', true);
                                        actions.indent(1);
                                        actions.out("dispatch({type:'RUNNONG_" + taskName.toUpperCase() + "'})", true);
                                    }
                                    // Call the actual function
                                    actions.out("const value = await " + taskName + "(" + params + ")", true);
                                    actions.out("dispatch( action_" + actionID_1 + "( value ))", true);
                                    if (hasState) {
                                        actions.out("dispatch({type:'SUCCESS_" + taskName.toUpperCase() + "', payload:value})", true);
                                        actions.indent(-1);
                                        actions.out('} catch(e) {', true);
                                        actions.indent(1);
                                        actions.out("dispatch({type:'ERROR_" + taskName.toUpperCase() + "', payload:e})", true);
                                        actions.indent(-1);
                                        actions.out('}', true);
                                    }
                                    actions.indent(-1);
                                    actions.out('}', true);
                                };
                                var taskFn = sourceFile.getFunctions().filter(function (fn) {
                                    // const returnV = getTypePath( fn.getReturnType() ).pop()
                                    var isReducer = fn.getJsDocs().filter(function (doc) { return doc.getTags().filter(function (tag) { return (tag.getName() === 'taskfor') && tag.getComment() == f.getName(); }).length > 0; }).length > 0;
                                    return isReducer;
                                })
                                    .forEach(createTaskFor);
                            }
                        });
                        sourceFile.getClasses().forEach(function (c) {
                            console.log(c.getName());
                            if (c.getJsDocs().filter(function (doc) { return doc.getTags().filter(function (tag) { return tag.getName() === 'simpleredux'; }).length > 0; }).length > 0) {
                                ng.raw(sourceFile.getText(), true);
                                ng.out("import * as immer from 'immer'", true);
                                // Create model of all the variables...
                                ng.out('export interface I' + c.getName() + ' {', true);
                                ng.indent(1);
                                c.getProperties().forEach(function (p) {
                                    ng.out(ts_simple_ast_2.printNode(p.getNameNode().compilerNode) + ': ' + ts_simple_ast_2.printNode(p.getTypeNode().compilerNode), true);
                                    //ng.out('/*', true)
                                    // ng.out(printNode(p.compilerNode), true)
                                    // ng.out(printNode(p.getTypeNode().compilerNode), true)
                                    //ng.out('*/', true)
                                });
                                ng.indent(-1);
                                ng.out('}', true);
                                // Create model of all the variables...
                                ng.out('class R' + c.getName() + ' {', true);
                                ng.indent(1);
                                ng.out('private _inReducer = false', true);
                                var body_1 = ng.fork();
                                ng.indent(-1);
                                ng.out('}', true);
                                ng.out('', true);
                                ng.out("export const " + c.getName() + "Enums = {", true);
                                ng.indent(1);
                                var ng_enums_1 = ng.fork();
                                ng.indent(-1);
                                ng.out('}', true);
                                ng.out('', true);
                                ng.out("export const " + c.getName() + "Reducer = (state:I" + c.getName() + " /* todo: init*/, action) => {", true);
                                ng.indent(1);
                                ng.out('return immer.produce(state, draft => {', true);
                                ng.indent(1);
                                ng.out("switch (action.type) {", true);
                                ng.indent(1);
                                var ng_reducers_1 = ng.fork();
                                ng.indent(-1);
                                ng.out('}', true);
                                ng.indent(-1);
                                ng.out('})', true);
                                ng.indent(-1);
                                ng.out('}', true);
                                body_1.out('private _state?: I' + c.getName(), true);
                                body_1.out('private _dispatch?: (action:any)=>void', true);
                                body_1.out("constructor(state?: I" + c.getName() + ", dispatch?:(action:any)=>void) {", true);
                                body_1.indent(1);
                                body_1.out('this._state = state', true);
                                body_1.out('this._dispatch = dispatch', true);
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
                                    body_1.out('get ' + p.getName() + '() : ' + ts_simple_ast_2.printNode(p.getTypeNode().compilerNode) + '{', true);
                                    body_1.indent(1);
                                    body_1.out('return this._state.' + p.getName(), true);
                                    body_1.indent(-1);
                                    body_1.out('}', true);
                                    body_1.out('set ' + p.getName() + '(value:' + ts_simple_ast_2.printNode(p.getTypeNode().compilerNode) + ') {', true);
                                    body_1.indent(1);
                                    body_1.out('if(this._state) {', true);
                                    body_1.indent(1);
                                    body_1.out("this._state." + p.getName() + " = value", true);
                                    body_1.indent(-1);
                                    body_1.out('} else {', true);
                                    body_1.indent(1);
                                    body_1.out("// dispatch change for item " + p.getName(), true);
                                    body_1.out("this._dispatch({type:'" + r_name + "', payload:value})", true);
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
                                    if (m.isAsync()) {
                                        body_1.out('// is task', true);
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
                                    }
                                    body_1.raw(ts_simple_ast_2.printNode(m.compilerNode), true);
                                    m.getBody().forEachChild(function (n) {
                                    });
                                });
                            }
                        });
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
                    });
                    Object.keys(actionImports).forEach(function (im) {
                        var pathName = actionImports[im];
                        actionImportFork.out("import { " + im + " } from '" + pathName + "'", true);
                    });
                    Object.keys(reducerImports).forEach(function (im) {
                        var pathName = reducerImports[im];
                        reducerImportFork.out("import { " + im + " } from '" + pathName + "'", true);
                    });
                    return [4 /*yield*/, RFs.saveTo('./', false)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, project.save()];
                case 2:
                    _a.sent();
                    console.log('Project saved');
                    return [2 /*return*/];
            }
        });
    });
}
exports.createProject = createProject;
//# sourceMappingURL=index.js.map