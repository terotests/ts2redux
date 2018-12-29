"use strict";
/************************************************************************************
 *                                                                                   *
 *   Redux Reducers and React Context API Provider/Consumer for state GenericModel   *
 *   Generated by ts2redux from Source file ../GenericModel.ts                       *
 *                                                                                   *
 ************************************************************************************/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var SomeList = /** @class */ (function () {
    function SomeList() {
        this.items = [];
    }
    SomeList.prototype.forItems = function (fn) {
        this.items.forEach(fn);
    };
    SomeList.prototype.addItems = function (items) {
        console.log("Generic SomeList::addItems was called...");
        console.log(this);
        this.items = this.items.concat(items);
    };
    return SomeList;
}());
exports.SomeList = SomeList;
/**
 * @redux true
 */
var GenericModel = /** @class */ (function () {
    function GenericModel() {
        this.sum = 0;
        this.isLoading = {};
        // This is not a good idea with Immer...
        this.list = new SomeList();
    }
    GenericModel.prototype.refreshSum = function () {
        this.sum = this.list.items.reduce(function (prev, curr) { return prev + curr.value(); }, 0);
    };
    GenericModel.prototype.addItems = function (items) {
        console.log(this);
        this.list.addItems(items);
        this.refreshSum();
    };
    GenericModel.prototype.inc = function () {
        this.sum++;
    };
    GenericModel.prototype.testLoading = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    return GenericModel;
}());
exports.GenericModel = GenericModel;
var immer = require("immer");
var react_redux_1 = require("react-redux");
var React = require("react");
exports.mapStateToProps = function (state) {
    return {
        sum: state.GenericModel.sum,
        isLoading: state.GenericModel.isLoading,
        list: state.GenericModel.list
    };
};
exports.mapDispatchToProps = function (dispatch) {
    return {
        refreshSum: function () {
            return dispatch(RGenericModel.refreshSum());
        },
        addItems: function (items) {
            return dispatch(RGenericModel.addItems(items));
        },
        inc: function () {
            return dispatch(RGenericModel.inc());
        },
        testLoading: function () {
            return dispatch(RGenericModel.testLoading());
        }
    };
};
exports.StateConnector = react_redux_1.connect(exports.mapStateToProps, exports.mapDispatchToProps);
var initGenericModel = function () {
    var o = new GenericModel();
    return {
        sum: o.sum,
        isLoading: o.isLoading,
        list: o.list
    };
};
var initWithMethodsGenericModel = function () {
    var o = new GenericModel();
    return {
        sum: o.sum,
        isLoading: o.isLoading,
        list: o.list,
        refreshSum: o.refreshSum,
        addItems: o.addItems,
        inc: o.inc,
        testLoading: o.testLoading
    };
};
/**
 * @generated true
 */
var RGenericModel = /** @class */ (function (_super) {
    __extends(RGenericModel, _super);
    function RGenericModel(state, dispatch, getState) {
        var _this = _super.call(this) || this;
        _this._state = state;
        _this._dispatch = dispatch;
        _this._getState = getState;
        return _this;
    }
    Object.defineProperty(RGenericModel.prototype, "sum", {
        get: function () {
            if (this._getState) {
                return this._getState().GenericModel.sum;
            }
            else {
                if (this._state) {
                    return this._state.sum;
                }
            }
            throw "Invalid State in GenericModel_sum";
        },
        set: function (value) {
            if (this._state && typeof value !== "undefined") {
                this._state.sum = value;
            }
            else {
                // dispatch change for item sum
                if (this._dispatch) {
                    this._dispatch({
                        type: exports.GenericModelEnums.GenericModel_sum,
                        payload: value
                    });
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RGenericModel.prototype, "isLoading", {
        get: function () {
            if (this._getState) {
                return this._getState().GenericModel.isLoading;
            }
            else {
                if (this._state) {
                    return this._state.isLoading;
                }
            }
            throw "Invalid State in GenericModel_isLoading";
        },
        set: function (value) {
            if (this._state && typeof value !== "undefined") {
                this._state.isLoading = value;
            }
            else {
                // dispatch change for item isLoading
                if (this._dispatch) {
                    this._dispatch({
                        type: exports.GenericModelEnums.GenericModel_isLoading,
                        payload: value
                    });
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RGenericModel.prototype, "list", {
        get: function () {
            if (this._getState) {
                return this._getState().GenericModel.list;
            }
            else {
                if (this._state) {
                    return this._state.list;
                }
            }
            throw "Invalid State in GenericModel_list";
        },
        set: function (value) {
            if (this._state && typeof value !== "undefined") {
                this._state.list = value;
            }
            else {
                // dispatch change for item list
                if (this._dispatch) {
                    this._dispatch({
                        type: exports.GenericModelEnums.GenericModel_list,
                        payload: value
                    });
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    RGenericModel.prototype.refreshSum = function () {
        if (this._state) {
            this.sum = this.list.items.reduce(function (prev, curr) { return prev + curr.value(); }, 0);
        }
        else {
            if (this._dispatch) {
                this._dispatch({ type: exports.GenericModelEnums.GenericModel_refreshSum });
            }
        }
    };
    RGenericModel.refreshSum = function () {
        return function (dispatcher, getState) {
            new RGenericModel(undefined, dispatcher, getState).refreshSum();
        };
    };
    RGenericModel.prototype.addItems = function (items) {
        if (this._state) {
            console.log(this);
            this.list.addItems(items);
            this.refreshSum();
        }
        else {
            if (this._dispatch) {
                this._dispatch({
                    type: exports.GenericModelEnums.GenericModel_addItems,
                    payload: items
                });
            }
        }
    };
    RGenericModel.addItems = function (items) {
        return function (dispatcher, getState) {
            new RGenericModel(undefined, dispatcher, getState).addItems(items);
        };
    };
    RGenericModel.prototype.inc = function () {
        if (this._state) {
            this.sum++;
        }
        else {
            if (this._dispatch) {
                this._dispatch({ type: exports.GenericModelEnums.GenericModel_inc });
            }
        }
    };
    RGenericModel.inc = function () {
        return function (dispatcher, getState) {
            new RGenericModel(undefined, dispatcher, getState).inc();
        };
    };
    RGenericModel.prototype.testLoading = function () {
        return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); });
    };
    RGenericModel.testLoading = function () {
        return function (dispatcher, getState) {
            new RGenericModel(undefined, dispatcher, getState).testLoading();
        };
    };
    return RGenericModel;
}(GenericModel));
exports.RGenericModel = RGenericModel;
exports.GenericModelEnums = {
    GenericModel_sum: "GenericModel_sum",
    GenericModel_isLoading: "GenericModel_isLoading",
    GenericModel_list: "GenericModel_list",
    GenericModel_refreshSum: "GenericModel_refreshSum",
    GenericModel_addItems: "GenericModel_addItems",
    GenericModel_inc: "GenericModel_inc"
};
exports.GenericModelReducer = function (state, action) {
    if (state === void 0) { state = initGenericModel(); }
    return immer.produce(state, function (draft) {
        switch (action.type) {
            case exports.GenericModelEnums.GenericModel_sum:
                new RGenericModel(draft).sum = action.payload;
                break;
            case exports.GenericModelEnums.GenericModel_isLoading:
                new RGenericModel(draft).isLoading = action.payload;
                break;
            case exports.GenericModelEnums.GenericModel_list:
                new RGenericModel(draft).list = action.payload;
                break;
            case exports.GenericModelEnums.GenericModel_refreshSum:
                new RGenericModel(draft).refreshSum();
                break;
            case exports.GenericModelEnums.GenericModel_addItems:
                new RGenericModel(draft).addItems(action.payload);
                break;
            case exports.GenericModelEnums.GenericModel_inc:
                new RGenericModel(draft).inc();
                break;
        }
    });
};
/********************************
 * React Context API component   *
 ********************************/
exports.GenericModelContext = React.createContext(initWithMethodsGenericModel());
exports.GenericModelConsumer = exports.GenericModelContext.Consumer;
var instanceCnt = 1;
var GenericModelProvider = /** @class */ (function (_super) {
    __extends(GenericModelProvider, _super);
    function GenericModelProvider(props) {
        var _this = _super.call(this, props) || this;
        _this.state = initGenericModel();
        _this.__devTools = null;
        _this.lastSetState = _this.state;
        _this.refreshSum = _this.refreshSum.bind(_this);
        _this.addItems = _this.addItems.bind(_this);
        _this.inc = _this.inc.bind(_this);
        _this.testLoading = _this.testLoading.bind(_this);
        var devs = window["devToolsExtension"]
            ? window["devToolsExtension"]
            : null;
        if (devs) {
            _this.__devTools = devs.connect({ name: "GenericModel" + instanceCnt++ });
            _this.__devTools.init(_this.state);
            _this.__devTools.subscribe(function (msg) {
                if (msg.type === "DISPATCH" && msg.state) {
                    _this.setState(JSON.parse(msg.state));
                }
            });
        }
        return _this;
    }
    GenericModelProvider.prototype.componentWillUnmount = function () {
        if (this.__devTools) {
            this.__devTools.unsubscribe();
        }
    };
    GenericModelProvider.prototype.setStateSync = function (state) {
        this.lastSetState = state;
        this.setState(state);
    };
    GenericModelProvider.prototype.refreshSum = function () {
        var nextState = immer.produce(this.state, function (draft) {
            return new RGenericModel(draft).refreshSum();
        });
        if (this.__devTools) {
            this.__devTools.send("refreshSum", nextState);
        }
        this.setStateSync(nextState);
    };
    GenericModelProvider.prototype.addItems = function (items) {
        var nextState = immer.produce(this.state, function (draft) {
            return new RGenericModel(draft).addItems(items);
        });
        if (this.__devTools) {
            this.__devTools.send("addItems", nextState);
        }
        this.setStateSync(nextState);
    };
    GenericModelProvider.prototype.inc = function () {
        var nextState = immer.produce(this.state, function (draft) {
            return new RGenericModel(draft).inc();
        });
        if (this.__devTools) {
            this.__devTools.send("inc", nextState);
        }
        this.setStateSync(nextState);
    };
    GenericModelProvider.prototype.testLoading = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                new RGenericModel(undefined, function (action) {
                    var nextState = exports.GenericModelReducer(_this.lastSetState, action);
                    if (_this.__devTools) {
                        _this.__devTools.send(action.type, nextState);
                    }
                    _this.setStateSync(nextState);
                }, function () { return ({ GenericModel: _this.lastSetState }); }).testLoading();
                return [2 /*return*/];
            });
        });
    };
    GenericModelProvider.prototype.render = function () {
        return (React.createElement(exports.GenericModelContext.Provider, { value: __assign({}, this.state, { refreshSum: this.refreshSum, addItems: this.addItems, inc: this.inc, testLoading: this.testLoading }) },
            " ",
            this.props.children));
    };
    return GenericModelProvider;
}(React.Component));
exports.GenericModelProvider = GenericModelProvider;
//# sourceMappingURL=GenericModel.js.map