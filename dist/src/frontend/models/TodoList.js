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
        this.state = "UNDEFINED";
        this.sortOrder = SortOrder.ASC;
        this.listStart = 0;
        this.listPageLength = 10;
        this.listTitle = "Title of TODO -list";
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
    TodoList.prototype.findMaxId = function () {
        var max = 0;
        this.items.forEach(function (item) {
            if (item.id > max)
                max = item.id;
        });
        return max;
    };
    TodoList.prototype.nextPage = function () {
        this.listStart += this.listPageLength;
    };
    TodoList.prototype.prevPage = function () {
        this.listStart -= this.listPageLength;
        if (this.listStart < 0)
            this.listStart = 0;
    };
    TodoList.prototype.toggleSortOrder = function () {
        this.sortOrder =
            this.sortOrder == SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;
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
        var toNumber = function (value) { return (value ? 1 : 0); };
        this.items.sort(function (a, b) { return toNumber(a.completed) - toNumber(b.completed); });
    };
    TodoList.prototype.setTitle = function (value) {
        this.listTitle = value;
    };
    TodoList.prototype.addLotOfItems = function (cnt) {
        var maxId = this.findMaxId();
        for (var i = 0; i < cnt; i++) {
            this.items.push({
                id: i + maxId,
                userId: 123 + i,
                completed: Math.random() > 0.5 ? true : false,
                title: "New Task " + i
            });
        }
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
                        if (this.state === "RUNNING")
                            return [2 /*return*/];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        this.state = "RUNNING";
                        _a = this;
                        return [4 /*yield*/, axios_1.default.get("https://jsonplaceholder.typicode.com/todos")];
                    case 2:
                        _a.items = (_b.sent()).data;
                        this.state = "LOADED";
                        return [3 /*break*/, 4];
                    case 3:
                        e_1 = _b.sent();
                        this.state = "ERROR";
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
//# sourceMappingURL=TodoList.js.map