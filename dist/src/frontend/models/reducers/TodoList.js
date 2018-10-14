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
var axios_1 = require("axios");
/**
 * @redux true
 */
var TodoList = /** @class */ (function () {
    function TodoList() {
        this.items = [];
        this.state = 'UNDEFINED';
    }
    TodoList.prototype.getItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.state === 'RUNNING')
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        this.state = 'RUNNING';
                        _a = this;
                        return [4 /*yield*/, axios_1.default.get('https://jsonplaceholder.typicode.com/todos')];
                    case 2:
                        _a.items = (_b.sent()).data;
                        this.state = 'LOADED';
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        this.state = {
                            type: 'ERROR',
                            error: e_1
                        };
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return TodoList;
}());
var immer = require("immer");
var react_redux_1 = require("react-redux");
var mapStateToProps = function (state) {
    return {
        items: state.TodoList.items,
        state: state.TodoList.state,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        getItems: function () {
            return dispatch(RTodoList.getItems());
        },
    };
};
exports.StateConnector = react_redux_1.connect(mapStateToProps, mapDispatchToProps);
var init_TodoList = function () {
    var o = new TodoList();
    return {
        items: o.items,
        state: o.state,
    };
};
/**
 * @generated true
 */
var RTodoList = /** @class */ (function () {
    function RTodoList(state, dispatch, getState) {
        this._state = state;
        this._dispatch = dispatch;
        this._getState = getState;
    }
    Object.defineProperty(RTodoList.prototype, "items", {
        get: function () {
            if (this._getState) {
                return this._getState().TodoList.items;
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
                this._dispatch({ type: 'TodoList_items', payload: value });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RTodoList.prototype, "state", {
        get: function () {
            if (this._getState) {
                return this._getState().TodoList.state;
            }
            else {
                return this._state.state;
            }
        },
        set: function (value) {
            if (this._state) {
                this._state.state = value;
            }
            else {
                // dispatch change for item state
                this._dispatch({ type: 'TodoList_state', payload: value });
            }
        },
        enumerable: true,
        configurable: true
    });
    // is task
    RTodoList.prototype.getItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, e_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.state === 'RUNNING')
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        this.state = 'RUNNING';
                        _a = this;
                        return [4 /*yield*/, axios_1.default.get('https://jsonplaceholder.typicode.com/todos')];
                    case 2:
                        _a.items = (_b.sent()).data;
                        this.state = 'LOADED';
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _b.sent();
                        this.state = {
                            type: 'ERROR',
                            error: e_2
                        };
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RTodoList.getItems = function () {
        return function (dispatcher, getState) {
            (new RTodoList(null, dispatcher, getState)).getItems();
        };
    };
    return RTodoList;
}());
exports.RTodoList = RTodoList;
exports.TodoListEnums = {
    TodoList_items: 'TodoList_items',
    TodoList_state: 'TodoList_state',
};
exports.TodoListReducer = function (state, action) {
    if (state === void 0) { state = init_TodoList(); }
    return immer.produce(state, function (draft) {
        switch (action.type) {
            case exports.TodoListEnums.TodoList_items:
                (new RTodoList(draft)).items = action.payload;
                break;
            case exports.TodoListEnums.TodoList_state:
                (new RTodoList(draft)).state = action.payload;
                break;
        }
    });
};
//# sourceMappingURL=TodoList.js.map