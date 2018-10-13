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
var MSG2 = 'AFTER DISPATH STATE IS';
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
 * @simpleredux true
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
    }
    // reducer
    TestModel.prototype.add = function (item) {
        console.log(this.maxId);
        this.items.push(__assign({}, item, { id: this.maxId++ }));
    };
    // Adding a new shopping cart
    TestModel.prototype.addCart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var key;
            return __generator(this, function (_a) {
                key = 'cart' + (this.cartId++);
                this.carts[key] = {
                    items: [{ name: STR_ITEM }]
                };
                return [2 /*return*/];
            });
        });
    };
    TestModel.prototype.addToCart = function (adding) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.carts[adding.cartId].items.push(adding.item);
                return [2 /*return*/];
            });
        });
    };
    TestModel.prototype.addToCartRandom = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                Object.keys(this.carts).forEach(function (cartKey) {
                    if (Math.random() < PROB_50)
                        _this.addToCart({ cartId: cartKey, item: { name: STR_ITEM + _this.maxId++ } });
                });
                return [2 /*return*/];
            });
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
var init_TestModel = function () {
    var o = new TestModel();
    return {
        items: o.items,
        maxId: o.maxId,
        cartId: o.cartId,
        shopState: o.shopState,
        carts: o.carts,
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
                return this._getState().TestModelReducer.items;
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
                return this._getState().TestModelReducer.maxId;
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
                return this._getState().TestModelReducer.cartId;
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
                return this._getState().TestModelReducer.shopState;
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
                return this._getState().TestModelReducer.carts;
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
    // is task
    // Adding a new shopping cart
    RTestModel.prototype.addCart = function () {
        return __awaiter(this, void 0, void 0, function () {
            var key;
            return __generator(this, function (_a) {
                key = 'cart' + (this.cartId++);
                this.carts[key] = {
                    items: [{ name: STR_ITEM }]
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
    // is task
    RTestModel.prototype.addToCart = function (adding) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.carts[adding.cartId].items.push(adding.item);
                return [2 /*return*/];
            });
        });
    };
    RTestModel.addToCart = function (adding) {
        return function (dispatcher, getState) {
            (new RTestModel(null, dispatcher, getState)).addToCart(adding);
        };
    };
    // is task
    RTestModel.prototype.addToCartRandom = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                Object.keys(this.carts).forEach(function (cartKey) {
                    if (Math.random() < PROB_50)
                        _this.addToCart({ cartId: cartKey, item: { name: STR_ITEM + _this.maxId++ } });
                });
                return [2 /*return*/];
            });
        });
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
    TestModel_add: 'TestModel_add',
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
            case exports.TestModelEnums.TestModel_add:
                (new RTestModel(draft)).add(action.payload);
                break;
            case exports.TestModelEnums.TestModel_renameLast:
                (new RTestModel(draft)).renameLast(action.payload);
                break;
        }
    });
};
//# sourceMappingURL=TestModel.js.map