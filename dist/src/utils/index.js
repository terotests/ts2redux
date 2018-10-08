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
var ts = require("typescript");
exports.findModel = function (project, className) {
    var res = null;
    project.getSourceFiles().forEach(function (s) {
        s.getClasses().forEach(function (cl) {
            if (cl.getName() === className) {
                var info = exports.getClassDoc(cl);
                if (info.tags.model != null) {
                    res = cl;
                }
            }
        });
        s.getInterfaces().forEach(function (cl) {
            if (cl.getName() === className) {
                var info = exports.getClassDoc(cl);
                if (info.tags.model != null) {
                    res = cl;
                }
            }
        });
    });
    return res;
};
var JSDocParams = /** @class */ (function () {
    function JSDocParams() {
        this.comment = '';
        this.tags = {};
        this.params = {};
        this.errors = {};
    }
    return JSDocParams;
}());
exports.JSDocParams = JSDocParams;
exports.getFunctionDoc = function (method) {
    var res = new JSDocParams;
    method.getJsDocs().forEach(function (doc) {
        if (doc.getComment()) {
            res.comment = doc.getComment();
        }
        doc.getTags().forEach(function (tag) {
            if (tag.getName() === 'error') {
                var str = tag.getComment();
                var code = str.split(' ')[0];
                var comment = str.split(' ').pop();
                res.errors[code] = comment;
                return;
            }
            if (tag.getName() === 'param') {
                var cn = tag.compilerNode;
                res.params[cn.name.escapedText] = tag.getComment();
            }
            else {
                res.tags[tag.getName()] = tag.getComment();
            }
        });
    });
    return res;
};
exports.getMethodDoc = function (method) {
    var res = new JSDocParams;
    method.getJsDocs().forEach(function (doc) {
        if (doc.getComment()) {
            res.comment = doc.getComment();
        }
        doc.getTags().forEach(function (tag) {
            if (tag.getName() === 'error') {
                var str = tag.getComment();
                var code = str.split(' ')[0];
                var comment = str.split(' ').pop();
                res.errors[code] = comment;
                return;
            }
            if (tag.getName() === 'param') {
                var cn = tag.compilerNode;
                res.params[cn.name.escapedText] = tag.getComment();
            }
            else {
                res.tags[tag.getName()] = tag.getComment();
            }
        });
    });
    return res;
};
exports.getClassDoc = function (method) {
    var res = new JSDocParams;
    method.getJsDocs().forEach(function (doc) {
        if (doc.getComment()) {
            res.comment = doc.getComment();
        }
        doc.getTags().forEach(function (tag) {
            if (tag.getName() === 'param') {
                var cn = tag.compilerNode;
                res.params[cn.name.escapedText] = tag.getComment();
            }
            else {
                res.tags[tag.getName()] = tag.getComment();
            }
        });
    });
    return res;
};
exports.getSwaggerType = function (name, is_array) {
    if (is_array === void 0) { is_array = false; }
    if (is_array)
        return {
            type: 'array',
            items: __assign({}, exports.getSwaggerType(name))
        };
    if (name === 'string' || name === 'number' || name === 'boolean' || name === 'any')
        return { type: name };
    return { '$ref': '#/definitions/' + name };
};
exports.isSimpleType = function (cType) {
    var tp = cType.compilerType;
    if (tp.flags & ts.TypeFlags.Number) {
        return true;
    }
    if (tp.flags & ts.TypeFlags.String) {
        return true;
    }
    if (tp.flags & ts.TypeFlags.Boolean) {
        return true;
    }
    return false;
};
exports.isBoolean = function (cType) {
    var tp = cType.compilerType;
    if (tp.flags & ts.TypeFlags.Boolean) {
        return true;
    }
    return false;
};
exports.getTypePath = function (cType, current) {
    if (current === void 0) { current = []; }
    var tp = cType.compilerType;
    if (tp.flags & ts.TypeFlags.Number) {
        return ['number'];
    }
    if (tp.flags & ts.TypeFlags.String) {
        return ['string'];
    }
    if (tp.flags & ts.TypeFlags.Boolean) {
        return ['boolean'];
    }
    if (tp.symbol) {
        var res = [tp.symbol.escapedName];
        var end_1 = [];
        if (cType.getTypeArguments().length > 0) {
            cType.getTypeArguments().forEach(function (arg) {
                end_1 = end_1.concat(exports.getTypePath(arg));
            });
        }
        return res.concat(end_1);
    }
    return ['any'];
};
exports.getPropertyTypeName = function (p) {
    var cType = p.getType();
    return cType.compilerType.symbol.getEscapedName() + '';
};
exports.getTypeName = function (cType) {
    var tp = cType.compilerType;
    if (tp.flags & ts.TypeFlags.Number) {
        return 'number';
    }
    if (tp.flags & ts.TypeFlags.String) {
        return 'string';
    }
    if (tp.flags & ts.TypeFlags.Boolean) {
        return 'boolean';
    }
    if (tp.symbol) {
        var typeName = tp.symbol.escapedName + '';
        if (cType.getTypeArguments().length > 0) {
            typeName += '<' + cType.getTypeArguments().map(function (arg) {
                // console.log(arg)
                return exports.getTypeName(arg);
            }) + '>';
        }
        return typeName;
    }
    return 'any';
};
exports.getMethodReturnTypeName = function (checker, m) {
    var cType = m.getReturnType();
    var tp = cType.compilerType;
    if (tp.flags & ts.TypeFlags.Number) {
        return 'number';
    }
    if (tp.flags & ts.TypeFlags.String) {
        return 'string';
    }
    if (tp.flags & ts.TypeFlags.Boolean) {
        return 'boolean';
    }
    if (tp.flags & ts.TypeFlags.Union) {
        console.log('-union type found');
        return cType.getUnionTypes().map(function (t) { return exports.getTypeName(t); }).join('|');
    }
    if (tp.symbol) {
        var typeName = tp.symbol.escapedName + '';
        if (cType.getTypeArguments().length > 0) {
            typeName += '<' + cType.getTypeArguments().map(function (arg) {
                // console.log(arg)
                return exports.getTypeName(arg);
            }) + '>';
        }
        return typeName;
    }
    return 'any';
};
//# sourceMappingURL=index.js.map