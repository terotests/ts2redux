"use strict";
/***********************************************************************************
*                                                                                  *
*   Redux Reducers and React Context API Provider/Consumer for state SimpleModel   *
*   Generated by ts2redux at 2018-10-21T10:34:25.407Z                              *
*   From Source file ../SimpleModel.ts                                             *
*                                                                                  *
***********************************************************************************/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
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
var axios_1 = require("axios");
/**
 * @redux true
 */
var SimpleModel = /** @class */ (function () {
    function SimpleModel() {
        this.items = [];
    }
    SimpleModel.prototype.getItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, axios_1.default.get('https://jsonplaceholder.typicode.com/todos')];
                    case 1:
                        _a.items = (_b.sent()).data;
                        return [2 /*return*/];
                }
            });
        });
    };
    return SimpleModel;
}());
exports.SimpleModel = SimpleModel;
var immer = require("immer");
var react_redux_1 = require("react-redux");
var React = require("react");
exports.mapStateToProps = function (state) {
    return {
        items: state.SimpleModel.items,
    };
};
exports.mapDispatchToProps = function (dispatch) {
    return {
        getItems: function () {
            return dispatch(RSimpleModel.getItems());
        },
    };
};
exports.StateConnector = react_redux_1.connect(exports.mapStateToProps, exports.mapDispatchToProps);
var init_SimpleModel = function () {
    var o = new SimpleModel();
    return {
        items: o.items,
    };
};
/**
 * @generated true
 */
var RSimpleModel = /** @class */ (function () {
    function RSimpleModel(state, dispatch, getState) {
        this._state = state;
        this._dispatch = dispatch;
        this._getState = getState;
    }
    Object.defineProperty(RSimpleModel.prototype, "items", {
        get: function () {
            if (this._getState) {
                return this._getState().SimpleModel.items;
            }
            else {
                return this._state.items;
            }
        },
        set: function (value) {
            if (this._state) {
                this._state.items = value;
            }
            else {
                // dispatch change for item items
                this._dispatch({ type: exports.SimpleModelEnums.SimpleModel_items, payload: value });
            }
        },
        enumerable: true,
        configurable: true
    });
    // is task
    RSimpleModel.prototype.getItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this;
                        return [4 /*yield*/, axios_1.default.get('https://jsonplaceholder.typicode.com/todos')];
                    case 1:
                        _a.items = (_b.sent()).data;
                        return [2 /*return*/];
                }
            });
        });
    };
    RSimpleModel.getItems = function () {
        return function (dispatcher, getState) {
            (new RSimpleModel(null, dispatcher, getState)).getItems();
        };
    };
    return RSimpleModel;
}());
exports.RSimpleModel = RSimpleModel;
exports.SimpleModelEnums = {
    SimpleModel_items: 'SimpleModel_items',
};
exports.SimpleModelReducer = function (state, action) {
    if (state === void 0) { state = init_SimpleModel(); }
    return immer.produce(state, function (draft) {
        switch (action.type) {
            case exports.SimpleModelEnums.SimpleModel_items:
                (new RSimpleModel(draft)).items = action.payload;
                break;
        }
    });
};
/***************************
* React Context API test   *
***************************/
exports.SimpleModelContext = React.createContext(null);
exports.SimpleModelConsumer = exports.SimpleModelContext.Consumer;
var instanceCnt = 1;
var SimpleModelProvider = /** @class */ (function (_super) {
    __extends(SimpleModelProvider, _super);
    function SimpleModelProvider(props) {
        var _this = _super.call(this, props) || this;
        _this.state = init_SimpleModel();
        _this.__devTools = null;
        _this.getItems = _this.getItems.bind(_this);
        var devs = window['devToolsExtension'] ? window['devToolsExtension'] : null;
        if (devs) {
            _this.__devTools = devs.connect({ name: 'SimpleModel' + instanceCnt++ });
            _this.__devTools.init(_this.state);
            _this.__devTools.subscribe(function (msg) {
                if (msg.type === 'DISPATCH' && msg.state) {
                    _this.setState(JSON.parse(msg.state));
                }
            });
        }
        return _this;
    }
    SimpleModelProvider.prototype.componentWillUnmount = function () {
        if (this.__devTools)
            this.__devTools.unsubscribe();
    };
    SimpleModelProvider.prototype.getItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                (new RSimpleModel(null, function (action) {
                    var nextState = exports.SimpleModelReducer(_this.state, action);
                    if (_this.__devTools)
                        _this.__devTools.send(action.type, nextState);
                    _this.setState(nextState);
                }, function () { return ({ SimpleModel: _this.state }); })).getItems();
                return [2 /*return*/];
            });
        });
    };
    SimpleModelProvider.prototype.render = function () {
        return (React.createElement(exports.SimpleModelContext.Provider, { value: __assign({}, this.state, { getItems: this.getItems }) },
            " ",
            this.props.children));
    };
    return SimpleModelProvider;
}(React.Component));
exports.SimpleModelProvider = SimpleModelProvider;
//# sourceMappingURL=SimpleModel.js.map