"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @redux true
 */
var WaspModel = /** @class */ (function () {
    function WaspModel() {
        this.speed = 10;
        this.lastId = 1;
        this.wasps = {};
    }
    WaspModel.prototype.addWasp = function (pos) {
        var o = { x: 0, y: 0 };
        o.id = this.lastId++;
        o.x = pos.x;
        o.y = pos.y;
        o.dx = 1 - 2 * Math.random();
        o.dy = 1 - 2 * Math.random();
        o.color = 'red';
        this.wasps[o.id] = o;
    };
    WaspModel.prototype.incSpeed = function (value) {
        this.speed = this.speed + value;
    };
    WaspModel.prototype.setColor = function (value) {
        if (this.wasps[value.waspId])
            this.wasps[value.waspId].color = value.colorValue;
    };
    WaspModel.prototype.step = function () {
        var _this = this;
        var list = Object.keys(this.wasps).map(function (i) { return _this.wasps[i]; });
        if (list.length === 0) {
            return;
        }
        var center = list.reduce(function (prev, curr) {
            return {
                x: prev.x + curr.x,
                y: prev.y + curr.y
            };
        }, { x: 0, y: 0 });
        center.x = center.x / list.length;
        center.y = center.y / list.length;
        for (var _i = 0, _a = Object.keys(this.wasps); _i < _a.length; _i++) {
            var key = _a[_i];
            var wasp = this.wasps[key];
            var x = center.x - wasp.x;
            var y = center.y - wasp.y;
            var len = Math.sqrt(x * x + y * y);
            if (len > 20) {
                wasp.dx += (x / len);
                wasp.dy += (y / len);
            }
            wasp.steps = 0;
            wasp.x += wasp.dx;
            wasp.y += wasp.dy;
            if (wasp.x < 0 || wasp.x > 300)
                wasp.dx = wasp.dx * -1;
            if (wasp.y < 0 || wasp.y > 300)
                wasp.dy = wasp.dy * -1;
            wasp.steps++;
        }
    };
    return WaspModel;
}());
//# sourceMappingURL=WaspModel.js.map