"use strict";
/*************************************************************************************
 *                                                                                    *
 *   Redux Reducers and React Context API Provider/Consumer for state UIHelperModel   *
 *   Generated by ts2redux from Source file ../UIHelper.ts                            *
 *                                                                                    *
 *************************************************************************************/
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
Object.defineProperty(exports, "__esModule", { value: true });
var UIHelperModel = /** @class */ (function () {
    function UIHelperModel() {
        this.showWasps = false;
    }
    UIHelperModel.prototype.toggle = function () {
        this.showWasps = !this.showWasps;
    };
    return UIHelperModel;
}());
var immer = require("immer");
var react_redux_1 = require("react-redux");
var React = require("react");
exports.showWaspsSelectorFn = function (state) {
    return state.showWasps;
};
exports.mapStateToProps = function (state) {
    return {
        showWasps: state.UIHelperModel.showWasps
    };
};
exports.mapDispatchToProps = function (dispatch) {
    return {
        toggle: function () {
            return dispatch(RUIHelperModel.toggle());
        }
    };
};
exports.StateConnector = react_redux_1.connect(exports.mapStateToProps, exports.mapDispatchToProps);
var initUIHelperModel = function () {
    var o = new UIHelperModel();
    return {
        showWasps: o.showWasps
    };
};
var initWithMethodsUIHelperModel = function () {
    var o = new UIHelperModel();
    return {
        showWasps: o.showWasps,
        toggle: o.toggle
    };
};
/**
 * @generated true
 */
var RUIHelperModel = /** @class */ (function () {
    function RUIHelperModel(state, dispatch, getState) {
        this._state = state;
        this._dispatch = dispatch;
        this._getState = getState;
    }
    Object.defineProperty(RUIHelperModel.prototype, "showWasps", {
        get: function () {
            if (this._getState) {
                return this._getState().UIHelperModel.showWasps;
            }
            else {
                if (this._state) {
                    return this._state.showWasps;
                }
            }
            return undefined;
        },
        set: function (value) {
            if (this._state && typeof value !== "undefined") {
                this._state.showWasps = value;
            }
            else {
                // dispatch change for item showWasps
                if (this._dispatch) {
                    this._dispatch({
                        type: exports.UIHelperModelEnums.UIHelperModel_showWasps,
                        payload: value
                    });
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    // is a reducer
    RUIHelperModel.prototype.toggle = function () {
        if (this._state) {
            this.showWasps = !this.showWasps;
        }
        else {
            if (this._dispatch) {
                this._dispatch({ type: exports.UIHelperModelEnums.UIHelperModel_toggle });
            }
        }
    };
    RUIHelperModel.toggle = function () {
        return function (dispatcher, getState) {
            new RUIHelperModel(undefined, dispatcher, getState).toggle();
        };
    };
    return RUIHelperModel;
}());
exports.RUIHelperModel = RUIHelperModel;
exports.UIHelperModelEnums = {
    UIHelperModel_showWasps: "UIHelperModel_showWasps",
    UIHelperModel_toggle: "UIHelperModel_toggle"
};
exports.UIHelperModelReducer = function (state, action) {
    if (state === void 0) { state = initUIHelperModel(); }
    return immer.produce(state, function (draft) {
        switch (action.type) {
            case exports.UIHelperModelEnums.UIHelperModel_showWasps:
                new RUIHelperModel(draft).showWasps = action.payload;
                break;
            case exports.UIHelperModelEnums.UIHelperModel_toggle:
                new RUIHelperModel(draft).toggle();
                break;
        }
    });
};
/***************************
 * React Context API test   *
 ***************************/
exports.UIHelperModelContext = React.createContext(initWithMethodsUIHelperModel());
exports.UIHelperModelConsumer = exports.UIHelperModelContext.Consumer;
var instanceCnt = 1;
var UIHelperModelProvider = /** @class */ (function (_super) {
    __extends(UIHelperModelProvider, _super);
    function UIHelperModelProvider(props) {
        var _this = _super.call(this, props) || this;
        _this.state = initUIHelperModel();
        _this.__devTools = null;
        _this.lastSetState = _this.state;
        _this.toggle = _this.toggle.bind(_this);
        var devs = window["devToolsExtension"]
            ? window["devToolsExtension"]
            : null;
        if (devs) {
            _this.__devTools = devs.connect({ name: "UIHelperModel" + instanceCnt++ });
            _this.__devTools.init(_this.state);
            _this.__devTools.subscribe(function (msg) {
                if (msg.type === "DISPATCH" && msg.state) {
                    _this.setState(JSON.parse(msg.state));
                }
            });
        }
        return _this;
    }
    UIHelperModelProvider.prototype.componentWillUnmount = function () {
        if (this.__devTools) {
            this.__devTools.unsubscribe();
        }
    };
    UIHelperModelProvider.prototype.setStateSync = function (state) {
        this.lastSetState = state;
        this.setState(state);
    };
    UIHelperModelProvider.prototype.toggle = function () {
        var nextState = immer.produce(this.state, function (draft) {
            return new RUIHelperModel(draft).toggle();
        });
        if (this.__devTools) {
            this.__devTools.send("toggle", nextState);
        }
        this.setStateSync(nextState);
    };
    UIHelperModelProvider.prototype.render = function () {
        return (React.createElement(exports.UIHelperModelContext.Provider, { value: __assign({}, this.state, { toggle: this.toggle }) },
            " ",
            this.props.children));
    };
    return UIHelperModelProvider;
}(React.Component));
exports.UIHelperModelProvider = UIHelperModelProvider;
//# sourceMappingURL=UIHelperModel.js.map