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
var timers_1 = require("timers");
var TaskState;
(function (TaskState) {
    TaskState[TaskState["UNDEFINED"] = 0] = "UNDEFINED";
    TaskState[TaskState["RUNNING"] = 1] = "RUNNING";
    TaskState[TaskState["ERROR"] = 2] = "ERROR";
    TaskState[TaskState["SUCCESS"] = 3] = "SUCCESS";
})(TaskState = exports.TaskState || (exports.TaskState = {}));
var MSG = 'STATE IS NOW';
var MSG2 = 'AFTER DISPATCH STATE IS';
var DELAY = 1000;
var LAST_NAME = 'I am the last item!!!!';
var STR_CART = 'cart';
var STR_ITEM = 'item';
var PROB_50 = 0.5;
var FRIEND_LIST = [
    'Arthur',
    'John',
    'Martin',
    'Peter'
];
/**
 * @redux true
 */
var TestModel = /** @class */ (function () {
    function TestModel() {
        // model with initializer
        this.items = [];
        this.maxId = 1;
        this.cartId = 1;
        this.shopState = TaskState.UNDEFINED;
        // my shopping carts
        this.carts = {};
        // message to user
        this.userMessage = '';
    }
    // TODO:
    // - ERROR / warning if there are no type initializers
    // - ERROR if there are more than 2 parameters to a reducer
    //   => or you could generate the protocol to be used for dispatching those values
    // - setting value of simple property could be generated
    TestModel.prototype.setUserMessage = function (value) {
        this.userMessage = value;
    };
    // reducer
    TestModel.prototype.add = function (item) {
        console.log(this.maxId);
        this.items.push(__assign({}, item, { id: this.maxId++ }));
    };
    TestModel.prototype.removeFirst = function () {
        this.items.splice(0, 1);
    };
    TestModel.prototype.sort = function () {
        this.items.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
    };
    /**
     * Creates a new shopping cart
     */
    TestModel.prototype.addCart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var key;
            return __generator(this, function (_a) {
                key = 'cart' + (this.cartId++);
                this.carts[key] = {
                    items: [{ id: this.maxId++, name: STR_ITEM }]
                };
                return [2 /*return*/];
            });
        });
    };
    TestModel.prototype.addCartSync = function () {
        var key = 'cart' + (this.cartId++);
        this.carts[key] = {
            items: [{ id: this.maxId++, name: STR_ITEM }]
        };
    };
    TestModel.prototype.addToCart = function (adding) {
        this.carts[adding.cartId].items.push(__assign({}, adding.item, { id: this.maxId++ }));
    };
    TestModel.prototype.setCartNewItem = function (adding) {
        this.carts[adding.cartId].newItemName = name;
    };
    TestModel.prototype.addToCartRandom = function () {
        var _this = this;
        Object.keys(this.carts).forEach(function (cartKey) {
            _this.addToCart({ cartId: cartKey, item: { name: STR_ITEM + _this.maxId++ } });
        });
    };
    TestModel.prototype.renameLast = function (newName) {
        this.items[this.items.length - 1].name = newName;
    };
    // action
    TestModel.prototype.createItem = function (someName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(MSG, this.shopState);
                        if (this.shopState == TaskState.RUNNING) {
                            return [2 /*return*/];
                        }
                        this.shopState = TaskState.RUNNING;
                        return [4 /*yield*/, new Promise(function (res) {
                                timers_1.setTimeout(res, DELAY);
                            })];
                    case 1:
                        _a.sent();
                        console.log(MSG2, this.shopState);
                        this.add({ name: someName });
                        this.shopState = TaskState.SUCCESS;
                        return [2 /*return*/];
                }
            });
        });
    };
    TestModel.prototype.addOneFriend = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.add({ name: name });
                return [2 /*return*/];
            });
        });
    };
    TestModel.prototype.fillSomeFriends = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                FRIEND_LIST.forEach(function (name) {
                    _this.add({ name: name });
                });
                return [2 /*return*/];
            });
        });
    };
    TestModel.prototype.ChangeLastItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.renameLast(LAST_NAME);
                return [2 /*return*/];
            });
        });
    };
    return TestModel;
}());
var immer = require("immer");
var react_redux_1 = require("react-redux");
var mapStateToProps = function (state) {
    return {
        items: state.TestModel.items,
        maxId: state.TestModel.maxId,
        cartId: state.TestModel.cartId,
        shopState: state.TestModel.shopState,
        carts: state.TestModel.carts,
        userMessage: state.TestModel.userMessage,
    };
};
var mapDispatchToProps = function (dispatch) {
    return {
        setUserMessage: function (value) {
            return dispatch(RTestModel.setUserMessage(value));
        },
        add: function (item) {
            return dispatch(RTestModel.add(item));
        },
        removeFirst: function () {
            return dispatch(RTestModel.removeFirst());
        },
        sort: function () {
            return dispatch(RTestModel.sort());
        },
        addCart: function () {
            return dispatch(RTestModel.addCart());
        },
        addCartSync: function () {
            return dispatch(RTestModel.addCartSync());
        },
        addToCart: function (adding) {
            return dispatch(RTestModel.addToCart(adding));
        },
        setCartNewItem: function (adding) {
            return dispatch(RTestModel.setCartNewItem(adding));
        },
        addToCartRandom: function () {
            return dispatch(RTestModel.addToCartRandom());
        },
        renameLast: function (newName) {
            return dispatch(RTestModel.renameLast(newName));
        },
        createItem: function (someName) {
            return dispatch(RTestModel.createItem(someName));
        },
        addOneFriend: function (name) {
            return dispatch(RTestModel.addOneFriend(name));
        },
        fillSomeFriends: function () {
            return dispatch(RTestModel.fillSomeFriends());
        },
        ChangeLastItem: function () {
            return dispatch(RTestModel.ChangeLastItem());
        },
    };
};
exports.StateConnector = react_redux_1.connect(mapStateToProps, mapDispatchToProps);
var init_TestModel = function () {
    var o = new TestModel();
    return {
        items: o.items,
        maxId: o.maxId,
        cartId: o.cartId,
        shopState: o.shopState,
        carts: o.carts,
        userMessage: o.userMessage,
    };
};
/**
 * @generated true
 */
var RTestModel = /** @class */ (function () {
    function RTestModel(state, dispatch, getState) {
        this._state = state;
        this._dispatch = dispatch;
        this._getState = getState;
    }
    Object.defineProperty(RTestModel.prototype, "items", {
        get: function () {
            if (this._getState) {
                return this._getState().TestModel.items;
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
                this._dispatch({ type: 'TestModel_items', payload: value });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RTestModel.prototype, "maxId", {
        get: function () {
            if (this._getState) {
                return this._getState().TestModel.maxId;
            }
            else {
                return this._state.maxId;
            }
        },
        set: function (value) {
            if (this._state) {
                this._state.maxId = value;
            }
            else {
                // dispatch change for item maxId
                this._dispatch({ type: 'TestModel_maxId', payload: value });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RTestModel.prototype, "cartId", {
        get: function () {
            if (this._getState) {
                return this._getState().TestModel.cartId;
            }
            else {
                return this._state.cartId;
            }
        },
        set: function (value) {
            if (this._state) {
                this._state.cartId = value;
            }
            else {
                // dispatch change for item cartId
                this._dispatch({ type: 'TestModel_cartId', payload: value });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RTestModel.prototype, "shopState", {
        get: function () {
            if (this._getState) {
                return this._getState().TestModel.shopState;
            }
            else {
                return this._state.shopState;
            }
        },
        set: function (value) {
            if (this._state) {
                this._state.shopState = value;
            }
            else {
                // dispatch change for item shopState
                this._dispatch({ type: 'TestModel_shopState', payload: value });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RTestModel.prototype, "carts", {
        get: function () {
            if (this._getState) {
                return this._getState().TestModel.carts;
            }
            else {
                return this._state.carts;
            }
        },
        set: function (value) {
            if (this._state) {
                this._state.carts = value;
            }
            else {
                // dispatch change for item carts
                this._dispatch({ type: 'TestModel_carts', payload: value });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RTestModel.prototype, "userMessage", {
        get: function () {
            if (this._getState) {
                return this._getState().TestModel.userMessage;
            }
            else {
                return this._state.userMessage;
            }
        },
        set: function (value) {
            if (this._state) {
                this._state.userMessage = value;
            }
            else {
                // dispatch change for item userMessage
                this._dispatch({ type: 'TestModel_userMessage', payload: value });
            }
        },
        enumerable: true,
        configurable: true
    });
    // is a reducer
    RTestModel.prototype.setUserMessage = function (value) {
        if (this._state) {
            this.userMessage = value;
        }
        else {
            this._dispatch({ type: 'TestModel_setUserMessage', payload: value });
        }
    };
    RTestModel.setUserMessage = function (value) {
        return function (dispatcher, getState) {
            (new RTestModel(null, dispatcher, getState)).setUserMessage(value);
        };
    };
    // is a reducer
    RTestModel.prototype.add = function (item) {
        if (this._state) {
            console.log(this.maxId);
            this.items.push(__assign({}, item, { id: this.maxId++ }));
        }
        else {
            this._dispatch({ type: 'TestModel_add', payload: item });
        }
    };
    RTestModel.add = function (item) {
        return function (dispatcher, getState) {
            (new RTestModel(null, dispatcher, getState)).add(item);
        };
    };
    // is a reducer
    RTestModel.prototype.removeFirst = function () {
        if (this._state) {
            this.items.splice(0, 1);
        }
        else {
            this._dispatch({ type: 'TestModel_removeFirst' });
        }
    };
    RTestModel.removeFirst = function () {
        return function (dispatcher, getState) {
            (new RTestModel(null, dispatcher, getState)).removeFirst();
        };
    };
    // is a reducer
    RTestModel.prototype.sort = function () {
        if (this._state) {
            this.items.sort(function (a, b) {
                return a.name.localeCompare(b.name);
            });
        }
        else {
            this._dispatch({ type: 'TestModel_sort' });
        }
    };
    RTestModel.sort = function () {
        return function (dispatcher, getState) {
            (new RTestModel(null, dispatcher, getState)).sort();
        };
    };
    // is task
    /**
     * Creates a new shopping cart
     */
    RTestModel.prototype.addCart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var key;
            return __generator(this, function (_a) {
                key = 'cart' + (this.cartId++);
                this.carts[key] = {
                    items: [{ id: this.maxId++, name: STR_ITEM }]
                };
                return [2 /*return*/];
            });
        });
    };
    RTestModel.addCart = function () {
        return function (dispatcher, getState) {
            (new RTestModel(null, dispatcher, getState)).addCart();
        };
    };
    // is a reducer
    RTestModel.prototype.addCartSync = function () {
        if (this._state) {
            var key = 'cart' + (this.cartId++);
            this.carts[key] = {
                items: [{ id: this.maxId++, name: STR_ITEM }]
            };
        }
        else {
            this._dispatch({ type: 'TestModel_addCartSync' });
        }
    };
    RTestModel.addCartSync = function () {
        return function (dispatcher, getState) {
            (new RTestModel(null, dispatcher, getState)).addCartSync();
        };
    };
    // is a reducer
    RTestModel.prototype.addToCart = function (adding) {
        if (this._state) {
            this.carts[adding.cartId].items.push(__assign({}, adding.item, { id: this.maxId++ }));
        }
        else {
            this._dispatch({ type: 'TestModel_addToCart', payload: adding });
        }
    };
    RTestModel.addToCart = function (adding) {
        return function (dispatcher, getState) {
            (new RTestModel(null, dispatcher, getState)).addToCart(adding);
        };
    };
    // is a reducer
    RTestModel.prototype.setCartNewItem = function (adding) {
        if (this._state) {
            this.carts[adding.cartId].newItemName = name;
        }
        else {
            this._dispatch({ type: 'TestModel_setCartNewItem', payload: adding });
        }
    };
    RTestModel.setCartNewItem = function (adding) {
        return function (dispatcher, getState) {
            (new RTestModel(null, dispatcher, getState)).setCartNewItem(adding);
        };
    };
    // is a reducer
    RTestModel.prototype.addToCartRandom = function () {
        var _this = this;
        if (this._state) {
            Object.keys(this.carts).forEach(function (cartKey) {
                _this.addToCart({ cartId: cartKey, item: { name: STR_ITEM + _this.maxId++ } });
            });
        }
        else {
            this._dispatch({ type: 'TestModel_addToCartRandom' });
        }
    };
    RTestModel.addToCartRandom = function () {
        return function (dispatcher, getState) {
            (new RTestModel(null, dispatcher, getState)).addToCartRandom();
        };
    };
    // is a reducer
    RTestModel.prototype.renameLast = function (newName) {
        if (this._state) {
            this.items[this.items.length - 1].name = newName;
        }
        else {
            this._dispatch({ type: 'TestModel_renameLast', payload: newName });
        }
    };
    RTestModel.renameLast = function (newName) {
        return function (dispatcher, getState) {
            (new RTestModel(null, dispatcher, getState)).renameLast(newName);
        };
    };
    // is task
    // action
    RTestModel.prototype.createItem = function (someName) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(MSG, this.shopState);
                        if (this.shopState == TaskState.RUNNING) {
                            return [2 /*return*/];
                        }
                        this.shopState = TaskState.RUNNING;
                        return [4 /*yield*/, new Promise(function (res) {
                                timers_1.setTimeout(res, DELAY);
                            })];
                    case 1:
                        _a.sent();
                        console.log(MSG2, this.shopState);
                        this.add({ name: someName });
                        this.shopState = TaskState.SUCCESS;
                        return [2 /*return*/];
                }
            });
        });
    };
    RTestModel.createItem = function (someName) {
        return function (dispatcher, getState) {
            (new RTestModel(null, dispatcher, getState)).createItem(someName);
        };
    };
    // is task
    RTestModel.prototype.addOneFriend = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.add({ name: name });
                return [2 /*return*/];
            });
        });
    };
    RTestModel.addOneFriend = function (name) {
        return function (dispatcher, getState) {
            (new RTestModel(null, dispatcher, getState)).addOneFriend(name);
        };
    };
    // is task
    RTestModel.prototype.fillSomeFriends = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                FRIEND_LIST.forEach(function (name) {
                    _this.add({ name: name });
                });
                return [2 /*return*/];
            });
        });
    };
    RTestModel.fillSomeFriends = function () {
        return function (dispatcher, getState) {
            (new RTestModel(null, dispatcher, getState)).fillSomeFriends();
        };
    };
    // is task
    RTestModel.prototype.ChangeLastItem = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.renameLast(LAST_NAME);
                return [2 /*return*/];
            });
        });
    };
    RTestModel.ChangeLastItem = function () {
        return function (dispatcher, getState) {
            (new RTestModel(null, dispatcher, getState)).ChangeLastItem();
        };
    };
    return RTestModel;
}());
exports.RTestModel = RTestModel;
exports.TestModelEnums = {
    TestModel_items: 'TestModel_items',
    TestModel_maxId: 'TestModel_maxId',
    TestModel_cartId: 'TestModel_cartId',
    TestModel_shopState: 'TestModel_shopState',
    TestModel_carts: 'TestModel_carts',
    TestModel_userMessage: 'TestModel_userMessage',
    TestModel_setUserMessage: 'TestModel_setUserMessage',
    TestModel_add: 'TestModel_add',
    TestModel_removeFirst: 'TestModel_removeFirst',
    TestModel_sort: 'TestModel_sort',
    TestModel_addCartSync: 'TestModel_addCartSync',
    TestModel_addToCart: 'TestModel_addToCart',
    TestModel_setCartNewItem: 'TestModel_setCartNewItem',
    TestModel_addToCartRandom: 'TestModel_addToCartRandom',
    TestModel_renameLast: 'TestModel_renameLast',
};
exports.TestModelReducer = function (state, action) {
    if (state === void 0) { state = init_TestModel(); }
    return immer.produce(state, function (draft) {
        switch (action.type) {
            case exports.TestModelEnums.TestModel_items:
                (new RTestModel(draft)).items = action.payload;
                break;
            case exports.TestModelEnums.TestModel_maxId:
                (new RTestModel(draft)).maxId = action.payload;
                break;
            case exports.TestModelEnums.TestModel_cartId:
                (new RTestModel(draft)).cartId = action.payload;
                break;
            case exports.TestModelEnums.TestModel_shopState:
                (new RTestModel(draft)).shopState = action.payload;
                break;
            case exports.TestModelEnums.TestModel_carts:
                (new RTestModel(draft)).carts = action.payload;
                break;
            case exports.TestModelEnums.TestModel_userMessage:
                (new RTestModel(draft)).userMessage = action.payload;
                break;
            case exports.TestModelEnums.TestModel_setUserMessage:
                (new RTestModel(draft)).setUserMessage(action.payload);
                break;
            case exports.TestModelEnums.TestModel_add:
                (new RTestModel(draft)).add(action.payload);
                break;
            case exports.TestModelEnums.TestModel_removeFirst:
                (new RTestModel(draft)).removeFirst();
                break;
            case exports.TestModelEnums.TestModel_sort:
                (new RTestModel(draft)).sort();
                break;
            case exports.TestModelEnums.TestModel_addCartSync:
                (new RTestModel(draft)).addCartSync();
                break;
            case exports.TestModelEnums.TestModel_addToCart:
                (new RTestModel(draft)).addToCart(action.payload);
                break;
            case exports.TestModelEnums.TestModel_setCartNewItem:
                (new RTestModel(draft)).setCartNewItem(action.payload);
                break;
            case exports.TestModelEnums.TestModel_addToCartRandom:
                (new RTestModel(draft)).addToCartRandom();
                break;
            case exports.TestModelEnums.TestModel_renameLast:
                (new RTestModel(draft)).renameLast(action.payload);
                break;
        }
    });
};
//# sourceMappingURL=TestModel.js.map