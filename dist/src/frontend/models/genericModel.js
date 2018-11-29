"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SomeList = /** @class */ (function () {
    function SomeList() {
        this.items = [];
    }
    SomeList.prototype.forItems = function (fn) {
        this.items.forEach(fn);
    };
    SomeList.prototype.addItems = function (items) {
        console.log('Generic SomeList::addItems was called...');
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
        this.list = new SomeList();
    }
    GenericModel.prototype.refreshSum = function () {
        this.sum = this.list.items.reduce(function (prev, curr) { return prev + curr.value(); }, 0);
    };
    GenericModel.prototype.addItems = function (items) {
        this.list.addItems(items);
        this.refreshSum();
    };
    GenericModel.prototype.inc = function () {
        this.sum++;
    };
    return GenericModel;
}());
exports.GenericModel = GenericModel;
//# sourceMappingURL=genericModel.js.map