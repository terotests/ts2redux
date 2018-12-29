"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// separating code from the model
function incMe(obj) {
    obj.cnt++;
}
/**
 * @redux true
 */
var IncModel = /** @class */ (function () {
    function IncModel() {
        this.cnt = 0;
    }
    IncModel.prototype.increment = function () {
        incMe(this);
    };
    IncModel.prototype.decrement = function () {
        this.cnt--;
    };
    return IncModel;
}());
exports.IncModel = IncModel;
//# sourceMappingURL=IncModel.js.map