var ReduxUIState = /** @class */ (function () {
    function ReduxUIState() {
    }
    Object.defineProperty(ReduxUIState.prototype, "isLoading", {
        get: function () {
            return this._isLoading;
        },
        set: function (value) {
            // Action updateisLoading
            this._isLoading = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReduxUIState.prototype, "userRole", {
        get: function () {
            return this._userRole;
        },
        set: function (value) {
            // Action updateuserRole
            this._userRole = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ReduxUIState.prototype, "userName", {
        get: function () {
            return this._userName;
        },
        set: function (value) {
            // Action updateuserName
            this._userName = value;
        },
        enumerable: true,
        configurable: true
    });
    return ReduxUIState;
}());
//# sourceMappingURL=reducer.js.map