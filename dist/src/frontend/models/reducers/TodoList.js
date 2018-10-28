"use strict";
/********************************************************************************
*                                                                               *
*   Redux Reducers and React Context API Provider/Consumer for state TodoList   *
*   Generated by ts2redux from Source file ../TodoList.ts                       *
*                                                                               *
********************************************************************************/
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
var SortOrder;
(function (SortOrder) {
    SortOrder["ASC"] = "asc";
    SortOrder["DESC"] = "desc";
})(SortOrder = exports.SortOrder || (exports.SortOrder = {}));
var sortFn = function (order) { return function (a, b) {
    if (order === SortOrder.ASC)
        return a.id - b.id;
    return b.id - a.id;
}; };
/**
 * @redux true
 */
var TodoList = /** @class */ (function () {
    function TodoList() {
        this.items = [];
        this.state = 'UNDEFINED';
        this.sortOrder = SortOrder.ASC;
        this.listStart = 0;
        this.listPageLength = 10;
        this.listTitle = 'Title of List';
    }
    Object.defineProperty(TodoList.prototype, "listToDisplay", {
        // Example of memoized list using reselect
        get: function () {
            return this.items
                .filter(function (item) { return item.completed; })
                .sort(sortFn(this.sortOrder))
                .slice(this.listStart, this.listStart + this.listPageLength);
        },
        enumerable: true,
        configurable: true
    });
    TodoList.prototype.nextPage = function () {
        this.listStart += this.listPageLength;
    };
    TodoList.prototype.prevPage = function () {
        this.listStart -= this.listPageLength;
        if (this.listStart < 0)
            this.listStart = 0;
    };
    TodoList.prototype.toggleSortOrder = function () {
        this.sortOrder = this.sortOrder == SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
    };
    TodoList.prototype.clearTodoList = function () {
        this.items = [];
    };
    TodoList.prototype.reverse = function () {
        this.items.reverse();
    };
    TodoList.prototype.sortById = function () {
        this.items.sort(function (a, b) { return a.id - b.id; });
    };
    TodoList.prototype.sortByTitle = function () {
        this.items.sort(function (a, b) { return a.title.localeCompare(b.title); });
    };
    TodoList.prototype.sortByCompletion = function () {
        var toNumber = function (value) { return value ? 1 : 0; };
        this.items.sort(function (a, b) { return toNumber(a.completed) - toNumber(b.completed); });
    };
    TodoList.prototype.setTitle = function (value) {
        this.listTitle = value;
    };
    /**
     * Fetch items from json placeholder service
     */
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
                        this.state = 'ERROR';
                        this.stateError = e_1;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return TodoList;
}());
exports.TodoList = TodoList;
var immer = require("immer");
var reselect_1 = require("reselect");
var react_redux_1 = require("react-redux");
var React = require("react");
exports.itemsSelectorFn = function (state) { return state.items; };
exports.stateSelectorFn = function (state) { return state.state; };
exports.stateErrorSelectorFn = function (state) { return state.stateError; };
exports.sortOrderSelectorFn = function (state) { return state.sortOrder; };
exports.listStartSelectorFn = function (state) { return state.listStart; };
exports.listPageLengthSelectorFn = function (state) { return state.listPageLength; };
exports.listTitleSelectorFn = function (state) { return state.listTitle; };
exports.listToDisplaySelectorFnCreator = function () { return reselect_1.createSelector([exports.itemsSelectorFn, exports.sortOrderSelectorFn, exports.listStartSelectorFn, exports.listPageLengthSelectorFn], function (items, sortOrder, listStart, listPageLength) {
    var o = new TodoList();
    o.items = items;
    o.sortOrder = sortOrder;
    o.listStart = listStart;
    o.listPageLength = listPageLength;
    return o.listToDisplay;
}); };
exports.listToDisplaySelector = exports.listToDisplaySelectorFnCreator();
exports.mapStateToProps = function (state) {
    return {
        items: state.TodoList.items,
        state: state.TodoList.state,
        stateError: state.TodoList.stateError,
        sortOrder: state.TodoList.sortOrder,
        listStart: state.TodoList.listStart,
        listPageLength: state.TodoList.listPageLength,
        listTitle: state.TodoList.listTitle,
        listToDisplay: exports.listToDisplaySelector(state.TodoList),
    };
};
exports.mapDispatchToProps = function (dispatch) {
    return {
        nextPage: function () {
            return dispatch(RTodoList.nextPage());
        },
        prevPage: function () {
            return dispatch(RTodoList.prevPage());
        },
        toggleSortOrder: function () {
            return dispatch(RTodoList.toggleSortOrder());
        },
        clearTodoList: function () {
            return dispatch(RTodoList.clearTodoList());
        },
        reverse: function () {
            return dispatch(RTodoList.reverse());
        },
        sortById: function () {
            return dispatch(RTodoList.sortById());
        },
        sortByTitle: function () {
            return dispatch(RTodoList.sortByTitle());
        },
        sortByCompletion: function () {
            return dispatch(RTodoList.sortByCompletion());
        },
        setTitle: function (value) {
            return dispatch(RTodoList.setTitle(value));
        },
        getItems: function () {
            return dispatch(RTodoList.getItems());
        },
    };
};
exports.StateConnector = react_redux_1.connect(exports.mapStateToProps, exports.mapDispatchToProps);
var initTodoList = function () {
    var o = new TodoList();
    return {
        items: o.items,
        state: o.state,
        stateError: o.stateError,
        sortOrder: o.sortOrder,
        listStart: o.listStart,
        listPageLength: o.listPageLength,
        listTitle: o.listTitle,
    };
};
var initWithMethodsTodoList = function () {
    var o = new TodoList();
    return {
        items: o.items,
        state: o.state,
        stateError: o.stateError,
        sortOrder: o.sortOrder,
        listStart: o.listStart,
        listPageLength: o.listPageLength,
        listTitle: o.listTitle,
        nextPage: o.nextPage,
        prevPage: o.prevPage,
        toggleSortOrder: o.toggleSortOrder,
        clearTodoList: o.clearTodoList,
        reverse: o.reverse,
        sortById: o.sortById,
        sortByTitle: o.sortByTitle,
        sortByCompletion: o.sortByCompletion,
        setTitle: o.setTitle,
        getItems: o.getItems,
        listToDisplay: o.listToDisplay,
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
                if (this._state) {
                    return this._state.items;
                }
            }
            return undefined;
        },
        set: function (value) {
            if (this._state && (typeof (value) !== 'undefined')) {
                this._state.items = value;
            }
            else {
                // dispatch change for item items
                if (this._dispatch) {
                    this._dispatch({ type: exports.TodoListEnums.TodoList_items, payload: value });
                }
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
                if (this._state) {
                    return this._state.state;
                }
            }
            return undefined;
        },
        set: function (value) {
            if (this._state && (typeof (value) !== 'undefined')) {
                this._state.state = value;
            }
            else {
                // dispatch change for item state
                if (this._dispatch) {
                    this._dispatch({ type: exports.TodoListEnums.TodoList_state, payload: value });
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RTodoList.prototype, "stateError", {
        get: function () {
            if (this._getState) {
                return this._getState().TodoList.stateError;
            }
            else {
                if (this._state) {
                    return this._state.stateError;
                }
            }
            return undefined;
        },
        set: function (value) {
            if (this._state && (typeof (value) !== 'undefined')) {
                this._state.stateError = value;
            }
            else {
                // dispatch change for item stateError
                if (this._dispatch) {
                    this._dispatch({ type: exports.TodoListEnums.TodoList_stateError, payload: value });
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RTodoList.prototype, "sortOrder", {
        get: function () {
            if (this._getState) {
                return this._getState().TodoList.sortOrder;
            }
            else {
                if (this._state) {
                    return this._state.sortOrder;
                }
            }
            return undefined;
        },
        set: function (value) {
            if (this._state && (typeof (value) !== 'undefined')) {
                this._state.sortOrder = value;
            }
            else {
                // dispatch change for item sortOrder
                if (this._dispatch) {
                    this._dispatch({ type: exports.TodoListEnums.TodoList_sortOrder, payload: value });
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RTodoList.prototype, "listStart", {
        get: function () {
            if (this._getState) {
                return this._getState().TodoList.listStart;
            }
            else {
                if (this._state) {
                    return this._state.listStart;
                }
            }
            return undefined;
        },
        set: function (value) {
            if (this._state && (typeof (value) !== 'undefined')) {
                this._state.listStart = value;
            }
            else {
                // dispatch change for item listStart
                if (this._dispatch) {
                    this._dispatch({ type: exports.TodoListEnums.TodoList_listStart, payload: value });
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RTodoList.prototype, "listPageLength", {
        get: function () {
            if (this._getState) {
                return this._getState().TodoList.listPageLength;
            }
            else {
                if (this._state) {
                    return this._state.listPageLength;
                }
            }
            return undefined;
        },
        set: function (value) {
            if (this._state && (typeof (value) !== 'undefined')) {
                this._state.listPageLength = value;
            }
            else {
                // dispatch change for item listPageLength
                if (this._dispatch) {
                    this._dispatch({ type: exports.TodoListEnums.TodoList_listPageLength, payload: value });
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RTodoList.prototype, "listTitle", {
        get: function () {
            if (this._getState) {
                return this._getState().TodoList.listTitle;
            }
            else {
                if (this._state) {
                    return this._state.listTitle;
                }
            }
            return undefined;
        },
        set: function (value) {
            if (this._state && (typeof (value) !== 'undefined')) {
                this._state.listTitle = value;
            }
            else {
                // dispatch change for item listTitle
                if (this._dispatch) {
                    this._dispatch({ type: exports.TodoListEnums.TodoList_listTitle, payload: value });
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    // is a reducer
    RTodoList.prototype.nextPage = function () {
        if (this._state) {
            this.listStart += this.listPageLength;
        }
        else {
            if (this._dispatch) {
                this._dispatch({ type: exports.TodoListEnums.TodoList_nextPage });
            }
        }
    };
    RTodoList.nextPage = function () {
        return function (dispatcher, getState) {
            (new RTodoList(undefined, dispatcher, getState)).nextPage();
        };
    };
    // is a reducer
    RTodoList.prototype.prevPage = function () {
        if (this._state) {
            this.listStart -= this.listPageLength;
            if (this.listStart < 0)
                this.listStart = 0;
        }
        else {
            if (this._dispatch) {
                this._dispatch({ type: exports.TodoListEnums.TodoList_prevPage });
            }
        }
    };
    RTodoList.prevPage = function () {
        return function (dispatcher, getState) {
            (new RTodoList(undefined, dispatcher, getState)).prevPage();
        };
    };
    // is a reducer
    RTodoList.prototype.toggleSortOrder = function () {
        if (this._state) {
            this.sortOrder = this.sortOrder == SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
        }
        else {
            if (this._dispatch) {
                this._dispatch({ type: exports.TodoListEnums.TodoList_toggleSortOrder });
            }
        }
    };
    RTodoList.toggleSortOrder = function () {
        return function (dispatcher, getState) {
            (new RTodoList(undefined, dispatcher, getState)).toggleSortOrder();
        };
    };
    // is a reducer
    RTodoList.prototype.clearTodoList = function () {
        if (this._state) {
            this.items = [];
        }
        else {
            if (this._dispatch) {
                this._dispatch({ type: exports.TodoListEnums.TodoList_clearTodoList });
            }
        }
    };
    RTodoList.clearTodoList = function () {
        return function (dispatcher, getState) {
            (new RTodoList(undefined, dispatcher, getState)).clearTodoList();
        };
    };
    // is a reducer
    RTodoList.prototype.reverse = function () {
        if (this._state) {
            this.items.reverse();
        }
        else {
            if (this._dispatch) {
                this._dispatch({ type: exports.TodoListEnums.TodoList_reverse });
            }
        }
    };
    RTodoList.reverse = function () {
        return function (dispatcher, getState) {
            (new RTodoList(undefined, dispatcher, getState)).reverse();
        };
    };
    // is a reducer
    RTodoList.prototype.sortById = function () {
        if (this._state) {
            this.items.sort(function (a, b) { return a.id - b.id; });
        }
        else {
            if (this._dispatch) {
                this._dispatch({ type: exports.TodoListEnums.TodoList_sortById });
            }
        }
    };
    RTodoList.sortById = function () {
        return function (dispatcher, getState) {
            (new RTodoList(undefined, dispatcher, getState)).sortById();
        };
    };
    // is a reducer
    RTodoList.prototype.sortByTitle = function () {
        if (this._state) {
            this.items.sort(function (a, b) { return a.title.localeCompare(b.title); });
        }
        else {
            if (this._dispatch) {
                this._dispatch({ type: exports.TodoListEnums.TodoList_sortByTitle });
            }
        }
    };
    RTodoList.sortByTitle = function () {
        return function (dispatcher, getState) {
            (new RTodoList(undefined, dispatcher, getState)).sortByTitle();
        };
    };
    // is a reducer
    RTodoList.prototype.sortByCompletion = function () {
        if (this._state) {
            var toNumber_1 = function (value) { return value ? 1 : 0; };
            this.items.sort(function (a, b) { return toNumber_1(a.completed) - toNumber_1(b.completed); });
        }
        else {
            if (this._dispatch) {
                this._dispatch({ type: exports.TodoListEnums.TodoList_sortByCompletion });
            }
        }
    };
    RTodoList.sortByCompletion = function () {
        return function (dispatcher, getState) {
            (new RTodoList(undefined, dispatcher, getState)).sortByCompletion();
        };
    };
    // is a reducer
    RTodoList.prototype.setTitle = function (value) {
        if (this._state) {
            this.listTitle = value;
        }
        else {
            if (this._dispatch) {
                this._dispatch({ type: exports.TodoListEnums.TodoList_setTitle, payload: value });
            }
        }
    };
    RTodoList.setTitle = function (value) {
        return function (dispatcher, getState) {
            (new RTodoList(undefined, dispatcher, getState)).setTitle(value);
        };
    };
    // is task
    /**
     * Fetch items from json placeholder service
     */
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
                        this.state = 'ERROR';
                        this.stateError = e_2;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RTodoList.getItems = function () {
        return function (dispatcher, getState) {
            (new RTodoList(undefined, dispatcher, getState)).getItems();
        };
    };
    return RTodoList;
}());
exports.RTodoList = RTodoList;
exports.TodoListEnums = {
    TodoList_items: 'TodoList_items',
    TodoList_state: 'TodoList_state',
    TodoList_stateError: 'TodoList_stateError',
    TodoList_sortOrder: 'TodoList_sortOrder',
    TodoList_listStart: 'TodoList_listStart',
    TodoList_listPageLength: 'TodoList_listPageLength',
    TodoList_listTitle: 'TodoList_listTitle',
    TodoList_nextPage: 'TodoList_nextPage',
    TodoList_prevPage: 'TodoList_prevPage',
    TodoList_toggleSortOrder: 'TodoList_toggleSortOrder',
    TodoList_clearTodoList: 'TodoList_clearTodoList',
    TodoList_reverse: 'TodoList_reverse',
    TodoList_sortById: 'TodoList_sortById',
    TodoList_sortByTitle: 'TodoList_sortByTitle',
    TodoList_sortByCompletion: 'TodoList_sortByCompletion',
    TodoList_setTitle: 'TodoList_setTitle',
};
exports.TodoListReducer = function (state, action) {
    if (state === void 0) { state = initTodoList(); }
    return immer.produce(state, function (draft) {
        switch (action.type) {
            case exports.TodoListEnums.TodoList_items:
                (new RTodoList(draft)).items = action.payload;
                break;
            case exports.TodoListEnums.TodoList_state:
                (new RTodoList(draft)).state = action.payload;
                break;
            case exports.TodoListEnums.TodoList_stateError:
                (new RTodoList(draft)).stateError = action.payload;
                break;
            case exports.TodoListEnums.TodoList_sortOrder:
                (new RTodoList(draft)).sortOrder = action.payload;
                break;
            case exports.TodoListEnums.TodoList_listStart:
                (new RTodoList(draft)).listStart = action.payload;
                break;
            case exports.TodoListEnums.TodoList_listPageLength:
                (new RTodoList(draft)).listPageLength = action.payload;
                break;
            case exports.TodoListEnums.TodoList_listTitle:
                (new RTodoList(draft)).listTitle = action.payload;
                break;
            case exports.TodoListEnums.TodoList_nextPage:
                (new RTodoList(draft)).nextPage();
                break;
            case exports.TodoListEnums.TodoList_prevPage:
                (new RTodoList(draft)).prevPage();
                break;
            case exports.TodoListEnums.TodoList_toggleSortOrder:
                (new RTodoList(draft)).toggleSortOrder();
                break;
            case exports.TodoListEnums.TodoList_clearTodoList:
                (new RTodoList(draft)).clearTodoList();
                break;
            case exports.TodoListEnums.TodoList_reverse:
                (new RTodoList(draft)).reverse();
                break;
            case exports.TodoListEnums.TodoList_sortById:
                (new RTodoList(draft)).sortById();
                break;
            case exports.TodoListEnums.TodoList_sortByTitle:
                (new RTodoList(draft)).sortByTitle();
                break;
            case exports.TodoListEnums.TodoList_sortByCompletion:
                (new RTodoList(draft)).sortByCompletion();
                break;
            case exports.TodoListEnums.TodoList_setTitle:
                (new RTodoList(draft)).setTitle(action.payload);
                break;
        }
    });
};
/***************************
* React Context API test   *
***************************/
exports.TodoListContext = React.createContext(initWithMethodsTodoList());
exports.TodoListConsumer = exports.TodoListContext.Consumer;
var instanceCnt = 1;
var TodoListProvider = /** @class */ (function (_super) {
    __extends(TodoListProvider, _super);
    function TodoListProvider(props) {
        var _this = _super.call(this, props) || this;
        _this.state = initTodoList();
        _this.__devTools = null;
        _this.__selectorlistToDisplay = null;
        _this.nextPage = _this.nextPage.bind(_this);
        _this.prevPage = _this.prevPage.bind(_this);
        _this.toggleSortOrder = _this.toggleSortOrder.bind(_this);
        _this.clearTodoList = _this.clearTodoList.bind(_this);
        _this.reverse = _this.reverse.bind(_this);
        _this.sortById = _this.sortById.bind(_this);
        _this.sortByTitle = _this.sortByTitle.bind(_this);
        _this.sortByCompletion = _this.sortByCompletion.bind(_this);
        _this.setTitle = _this.setTitle.bind(_this);
        _this.getItems = _this.getItems.bind(_this);
        _this.__selectorlistToDisplay = exports.listToDisplaySelectorFnCreator();
        var devs = window['devToolsExtension'] ? window['devToolsExtension'] : null;
        if (devs) {
            _this.__devTools = devs.connect({ name: 'TodoList' + instanceCnt++ });
            _this.__devTools.init(_this.state);
            _this.__devTools.subscribe(function (msg) {
                if (msg.type === 'DISPATCH' && msg.state) {
                    _this.setState(JSON.parse(msg.state));
                }
            });
        }
        return _this;
    }
    TodoListProvider.prototype.componentWillUnmount = function () {
        if (this.__devTools) {
            this.__devTools.unsubscribe();
        }
    };
    TodoListProvider.prototype.nextPage = function () {
        var nextState = immer.produce(this.state, function (draft) { return (new RTodoList(draft)).nextPage(); });
        if (this.__devTools)
            this.__devTools.send('nextPage', nextState);
        this.setState(nextState);
    };
    TodoListProvider.prototype.prevPage = function () {
        var nextState = immer.produce(this.state, function (draft) { return (new RTodoList(draft)).prevPage(); });
        if (this.__devTools)
            this.__devTools.send('prevPage', nextState);
        this.setState(nextState);
    };
    TodoListProvider.prototype.toggleSortOrder = function () {
        var nextState = immer.produce(this.state, function (draft) { return (new RTodoList(draft)).toggleSortOrder(); });
        if (this.__devTools)
            this.__devTools.send('toggleSortOrder', nextState);
        this.setState(nextState);
    };
    TodoListProvider.prototype.clearTodoList = function () {
        var nextState = immer.produce(this.state, function (draft) { return (new RTodoList(draft)).clearTodoList(); });
        if (this.__devTools)
            this.__devTools.send('clearTodoList', nextState);
        this.setState(nextState);
    };
    TodoListProvider.prototype.reverse = function () {
        var nextState = immer.produce(this.state, function (draft) { return (new RTodoList(draft)).reverse(); });
        if (this.__devTools)
            this.__devTools.send('reverse', nextState);
        this.setState(nextState);
    };
    TodoListProvider.prototype.sortById = function () {
        var nextState = immer.produce(this.state, function (draft) { return (new RTodoList(draft)).sortById(); });
        if (this.__devTools)
            this.__devTools.send('sortById', nextState);
        this.setState(nextState);
    };
    TodoListProvider.prototype.sortByTitle = function () {
        var nextState = immer.produce(this.state, function (draft) { return (new RTodoList(draft)).sortByTitle(); });
        if (this.__devTools)
            this.__devTools.send('sortByTitle', nextState);
        this.setState(nextState);
    };
    TodoListProvider.prototype.sortByCompletion = function () {
        var nextState = immer.produce(this.state, function (draft) { return (new RTodoList(draft)).sortByCompletion(); });
        if (this.__devTools)
            this.__devTools.send('sortByCompletion', nextState);
        this.setState(nextState);
    };
    TodoListProvider.prototype.setTitle = function (value) {
        var nextState = immer.produce(this.state, function (draft) { return (new RTodoList(draft)).setTitle(value); });
        if (this.__devTools)
            this.__devTools.send('setTitle', nextState);
        this.setState(nextState);
    };
    /**
     * Fetch items from json placeholder service
     */
    TodoListProvider.prototype.getItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                (new RTodoList(undefined, function (action) {
                    var nextState = exports.TodoListReducer(_this.state, action);
                    if (_this.__devTools) {
                        _this.__devTools.send(action.type, nextState);
                    }
                    _this.setState(nextState);
                }, function () { return ({ TodoList: _this.state }); })).getItems();
                return [2 /*return*/];
            });
        });
    };
    TodoListProvider.prototype.render = function () {
        return (React.createElement(exports.TodoListContext.Provider, { value: __assign({}, this.state, { nextPage: this.nextPage, prevPage: this.prevPage, toggleSortOrder: this.toggleSortOrder, clearTodoList: this.clearTodoList, reverse: this.reverse, sortById: this.sortById, sortByTitle: this.sortByTitle, sortByCompletion: this.sortByCompletion, setTitle: this.setTitle, getItems: this.getItems, listToDisplay: this.__selectorlistToDisplay(this.state) }) },
            " ",
            this.props.children));
    };
    return TodoListProvider;
}(React.Component));
exports.TodoListProvider = TodoListProvider;
//# sourceMappingURL=TodoList.js.map