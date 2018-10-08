"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var ts_simple_ast_1 = require("ts-simple-ast");
var utils = require("../utils");
var getTypeName = utils.getTypeName;
var isSimpleType = utils.isSimpleType;
var getTypePath = utils.getTypePath;
var getSwaggerType = utils.getSwaggerType;
var getMethodDoc = utils.getMethodDoc;
exports.initSwagger = function (wr, service) {
    var base = {
        "swagger": "2.0",
        "basePath": service.endpoint || '/v1/',
        "paths": {},
        "definitions": {},
        "schemes": ["http", "https"],
        "info": {
            "version": service.version,
            "title": service.title || '',
            "description": service.description || '',
            "termsOfService": service.tos || '',
        },
        tags: []
    };
    wr.getState().swagger = base;
    return wr;
};
exports.WriteEndpoint = function (wr, project, clName, method) {
    var _a;
    var methodInfo = getMethodDoc(method);
    if (methodInfo.tags.nogenerate)
        return wr;
    var fc = method.getChildAtIndex(0);
    if (fc && fc.getText().indexOf('private') === 0) {
        console.log('**** skipping private method ', method.getName());
        return wr;
    }
    var methodName = method.getName();
    var methodAlias = methodInfo.tags.alias || methodName;
    var basePath = wr.getState().swagger.basePath;
    var pathParams = [];
    var queryParams = [];
    var bodyParams = [];
    var path = methodAlias.split('/'); // for example "users/documents"
    var methodParams = method.getParameters();
    // TODO: create setting for making params in the query
    // methodInfo.tags.queryparams
    for (var i = 0; i < path.length; i++) {
        if (methodParams[i] && !(methodParams[i].getName() === methodInfo.tags.query) && isSimpleType(methodParams[i].getType())) {
            // only ID types here
            pathParams.push(methodParams[i]);
        }
        else {
            break; // no more
        }
    }
    // collect query parameters after the path parameters
    for (var i = pathParams.length; i < methodParams.length; i++) {
        if (isSimpleType(methodParams[i].getType())) {
            // only ID types here
            queryParams.push(methodParams[i]);
        }
        else {
            break; // no more
        }
    }
    // collect post parameters after the path parameters
    for (var i = (pathParams.length + queryParams.length); i < methodParams.length; i++) {
        bodyParams.push(methodParams[i]);
    }
    var is_post = bodyParams.length > 0;
    var httpMethod = methodInfo.tags.method || (is_post ? 'post' : 'get');
    var pathParamStr = pathParams.map(function (param) {
        return ':' + param.getName();
    }).join('/');
    var addTag = function (tagname, description) {
        var swagger = wr.getState().swagger;
        if (swagger.tags.filter(function (t) { return t.name === tagname; }).length === 0) {
            swagger.tags.push({ name: tagname, description: description });
        }
    };
    var addTagDescription = function (tagname, description) {
        var swagger = wr.getState().swagger;
        var tag = swagger.tags.filter(function (t) { return t.name === tagname; }).pop();
        if (tag && description) {
            tag.description = description;
        }
    };
    // build the path for api path
    var apiPath = '';
    path.forEach(function (pathPart, i) {
        apiPath += pathPart + '/';
        if (pathParams[i]) {
            apiPath += ':' + pathParams[i].getName() + '/';
        }
    });
    wr.out("// Automatically generated endpoint for " + methodName, true);
    wr.out("app." + httpMethod + "('" + basePath + apiPath + "', async function( req, res ) {", true);
    wr.indent(1);
    wr.out('try {', true);
    wr.indent(1);
    var pathArgs = pathParams.map(function (param) { return 'req.params.' + param.getName(); });
    var queryArgs = queryParams.map(function (param) {
        var pname = 'req.query.' + param.getName();
        if (getTypeName(param.getType()) === 'boolean') {
            return "typeof(" + pname + ") === 'undefined' ? " + pname + " : " + pname + " === 'true'";
        }
        return 'req.query.' + param.getName();
    });
    var postArgs = bodyParams.length > 0 ? ['req.body'] : [];
    var paramList = pathArgs.concat(queryArgs, postArgs).join(', ');
    // name of the server
    var servername = methodInfo.tags['using'] || 'server';
    var rParam = '';
    if (methodInfo.tags.custom != null) {
        wr.out("await " + servername + "(req, res)." + methodName + "(" + rParam + paramList + ");", true);
    }
    else {
        wr.out("res.json( await " + servername + "(req, res)." + methodName + "(" + rParam + paramList + ") );", true);
    }
    wr.indent(-1);
    wr.out('} catch(e) {', true);
    wr.indent(1);
    wr.out('res.status(e.statusCode || 400);', true);
    wr.out("res.json( e );", true);
    wr.indent(-1);
    wr.out('}', true);
    wr.indent(-1);
    wr.out("})", true);
    var rArr = getTypePath(method.getReturnType());
    var is_array = rArr[0] === 'Array';
    var rType = rArr.pop();
    var successResponse = {};
    var definitions = {};
    var createClassDef = function (className) {
        var modelClass = utils.findModel(project, className);
        // TODO: find out how to fix this in TypeScript, this if and the if below repeat
        // code too much...
        if (modelClass instanceof ts_simple_ast_1.ClassDeclaration && !definitions[modelClass.getName()]) {
            var props = modelClass.getProperties();
            definitions[modelClass.getName()] = {
                type: 'object',
                properties: __assign({}, props.reduce(function (prev, curr) {
                    var _a;
                    curr.getJsDocs().forEach(function (doc) {
                        console.log('Property comment', curr.getName(), doc.getComment());
                    });
                    var rArr = getTypePath(curr.getType());
                    var is_array = rArr[0] === 'Array';
                    var rType = rArr.pop();
                    var swType = getSwaggerType(rType, is_array);
                    createClassDef(rType);
                    return __assign({}, prev, (_a = {}, _a[curr.getName()] = __assign({}, swType), _a));
                }, {}))
            };
        }
        if (modelClass instanceof ts_simple_ast_1.InterfaceDeclaration && !definitions[modelClass.getName()]) {
            var props = modelClass.getProperties();
            definitions[modelClass.getName()] = {
                type: 'object',
                properties: __assign({}, props.reduce(function (prev, curr) {
                    var _a;
                    var rArr = getTypePath(curr.getType());
                    var is_array = rArr[0] === 'Array';
                    var rType = rArr.pop();
                    var swType = getSwaggerType(rType, is_array);
                    createClassDef(rType);
                    return __assign({}, prev, (_a = {}, _a[curr.getName()] = __assign({}, swType), _a));
                }, {}))
            };
        }
    };
    successResponse['200'] = {
        description: '',
        schema: __assign({}, getSwaggerType(rType, is_array))
    };
    Object.keys(methodInfo.errors).forEach(function (code) {
        successResponse[code] = {
            description: '',
            schema: __assign({}, getSwaggerType(methodInfo.errors[code], false))
        };
        createClassDef(methodInfo.errors[code]);
    });
    createClassDef(rType);
    // generate swagger docs of this endpoin, a simple version so far
    var state = wr.getState().swagger;
    var validParams = method.getParameters();
    // build the path for swagger
    var swaggerPath = '';
    path.forEach(function (pathPart, i) {
        swaggerPath += '/' + pathPart;
        if (pathParams[i]) {
            swaggerPath += '/{' + pathParams[i].getName() + '}';
        }
    });
    // the old simple mapping...
    // const axiosGetVars = getParams.map( param => ('{' + param.getName() + '}' ) ).join('/')
    var taglist = [];
    if (methodInfo.tags.tag) {
        taglist.push(methodInfo.tags.tag);
        addTag(methodInfo.tags.tag, '');
        addTagDescription(methodInfo.tags.tag, methodInfo.tags.tagdescription);
    }
    // NOTE: in Swagger parameter types are
    // -path
    // -query
    // -header (not implemented)
    // -cookie (not implemented)
    var previous = state.paths[swaggerPath];
    state.paths[swaggerPath] = __assign({}, previous, (_a = {}, _a[httpMethod] = {
        "parameters": pathParams.map(function (param) {
            return {
                name: param.getName(),
                in: "path",
                description: methodInfo.tags[param.getName()] || '',
                required: true,
                type: getTypeName(param.getType())
            };
        }).concat(queryParams.map(function (param) {
            return {
                name: param.getName(),
                in: "query",
                description: methodInfo.tags[param.getName()] || '',
                required: !param.isOptional(),
                type: getTypeName(param.getType())
            };
        }), bodyParams.map(function (param) {
            var rArr = getTypePath(param.getType());
            var is_array = rArr[0] === 'Array';
            var rType = rArr.pop();
            var tDef = {
                schema: __assign({}, getSwaggerType(rType, is_array))
            };
            if (isSimpleType(param.getType())) {
                tDef = {
                    type: rType
                };
            }
            else {
                createClassDef(rType);
            }
            return __assign({ name: param.getName(), in: "body", description: methodInfo.tags[param.getName()] || '', required: !param.isOptional() }, tDef);
        })),
        "description": methodInfo.tags.description || methodInfo.comment,
        "summary": methodInfo.tags.summary || methodInfo.tags.description || methodInfo.comment,
        "produces": [
            "application/json"
        ],
        "responses": __assign({}, successResponse),
        "tags": taglist
    }, _a));
    state.definitions = Object.assign(state.definitions, definitions);
    return wr;
};
// write axios client endpoint for method
exports.WriteClientEndpoint = function (wr, project, clName, method) {
    var methodInfo = getMethodDoc(method);
    if (methodInfo.tags.nogenerate)
        return wr;
    var methodName = method.getName();
    // only simple parameters
    var validParams = method.getParameters();
    var getParams = method.getParameters().filter(function (param) { return isSimpleType(param.getType()); });
    var postParams = method.getParameters().filter(function (param) { return !isSimpleType(param.getType()); });
    var is_post = method.getParameters().filter(function (project) { return !isSimpleType(project.getType()); }).length > 0;
    var httpMethod = is_post ? 'post' : 'get';
    // method signature
    var signatureStr = validParams.map(function (project) {
        return project.getName() + ": " + getTypeName(project.getType());
    }).join(', ');
    var paramsStr = getParams.map(function (project) { return project.getName(); }).join(', ');
    var postParamsStr = postParams.map(function (project) { return project.getName(); }).join(', ');
    // setting the body / post varas is not as simple...
    var axiosGetVars = getParams.map(function (param) { return ('${' + param.getName() + '}'); }).join('/');
    if (methodInfo.tags.method) {
        httpMethod = methodInfo.tags.method;
    }
    if (methodInfo.tags.alias) {
        methodName = methodInfo.tags.alias;
    }
    switch (httpMethod) {
        case 'post':
            wr.out("// Service endpoint for " + methodName, true);
            wr.out("async " + methodName + "(" + signatureStr + ") : Promise<" + getTypeName(method.getReturnType()) + "> {", true);
            wr.indent(1);
            if (is_post)
                wr.out('// should be posted', true);
            wr.out('return (await axios.post(`/v1/' + methodName + '/' + axiosGetVars + '`,' + postParamsStr + ')).data;', true);
            wr.indent(-1);
            wr.out("}", true);
            break;
        case 'get':
            wr.out("// Service endpoint for " + methodName, true);
            wr.out("async " + methodName + "(" + signatureStr + ") : Promise<" + getTypeName(method.getReturnType()) + "> {", true);
            wr.indent(1);
            if (is_post)
                wr.out('// should be posted', true);
            wr.out('return (await axios.get(`/v1/' + methodName + '/' + axiosGetVars + '`)).data;', true);
            wr.indent(-1);
            wr.out("}", true);
            break;
        default:
            wr.out("// Service endpoint for " + methodName, true);
            wr.out("async " + methodName + "(" + signatureStr + ") : Promise<" + getTypeName(method.getReturnType()) + "> {", true);
            wr.indent(1);
            if (is_post)
                wr.out('// should be posted', true);
            wr.out('return (await axios.' + httpMethod + '(`/v1/' + methodName + '/' + axiosGetVars + '`)).data;', true);
            wr.indent(-1);
            wr.out("}", true);
    }
    return wr;
};
//# sourceMappingURL=service.js.map