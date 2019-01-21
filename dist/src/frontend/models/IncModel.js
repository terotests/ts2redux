"use strict";
/**
 * @redux true
 */
Object.defineProperty(exports, "__esModule", { value: true });
var IncModel = /** @class */ (function () {
    function IncModel() {
        this.cnt = 0;
    }
    IncModel.prototype.increment = function () {
        this.cnt++;
    };
    IncModel.prototype.decrement = function () {
        this.cnt--;
    };
    return IncModel;
}());
exports.IncModel = IncModel;
//# sourceMappingURL=IncModel.js.map