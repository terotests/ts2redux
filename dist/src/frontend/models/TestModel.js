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
function getTestObj() {
    return { name: 'OK' };
}
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
        // Default initializers work :)
        this.str_init_test = 'OK?';
        this.bool_init_test = false;
        this.obj_init_test = getTestObj();
        this.rand_init_test = Math.floor(Math.random() * 5);
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
        var key = 'cart' + (this.cartId++);
        this.carts[key] = {
            items: [{ id: this.maxId++, name: STR_ITEM }]
        };
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
//# sourceMappingURL=TestModel.js.map