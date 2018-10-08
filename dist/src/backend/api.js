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
var model_1 = require("./models/model");
/**
 * APIn kuvaus jne.
 *
 * @swagger /src/swagger/server2.json
 * @title JeeJee
 * @service service2
 * @endpoint /sometest/v1/
 * @version 1.0.1
 */
var Server2 = /** @class */ (function () {
    function Server2() {
    }
    Server2.prototype.hello = function (id) {
        var r;
        return 'hi there!';
    };
    return Server2;
}());
exports.Server2 = Server2;
/**
 * APIn kuvaus jne.
 *
 * @swagger /src/swagger/api.json
 * @title First service
 * @service service1
 * @endpoint /sometest2/v1/
 * @version 1.0.1
 *
 */
var ServerInterface = /** @class */ (function () {
    function ServerInterface(req, res) {
        this.req = req;
        this.res = res;
    }
    /**
     *
     * @alias user
     * @method put
     * @param id set user to some value
     * @param user
     * @tag user
     * @tagdescription System users
     */
    ServerInterface.prototype.putUser = function (id, overwrite, user) {
        console.log('overwrite: ', overwrite);
        if (overwrite) {
            console.log('TRUE');
        }
        else {
            console.log('FALSE');
        }
        return { name: 'foobar' };
    };
    /**
     *
     * @alias users
     * @method get
     * @param id set user to some value
     * @param user
     * @tag user
     * @tagdescription System users
     */
    ServerInterface.prototype.getUser = function (id) {
        return { name: 'foobar' };
    };
    /**
     * Etsi dokumentaatiosta tietoja hakusanalla
     * @method get
     * @alias searchByKeyword
     * @query searchKeyword
     * @tag document
     * @tagdescription
     */
    ServerInterface.prototype.searchByKeyword = function (searchKeyword) {
        return ['a', 'b'];
    };
    /**
     *
     * @alias users/friends
     * @method get
     * @param id set user to some value
     * @param user
     * @tag user
     * @tagdescription System users
     */
    ServerInterface.prototype.getUserFriends = function (userId, friendId, filter) {
        console.log('filter: ', filter);
        return [{
                name: 'foobar'
            }];
    };
    /**
     *
     * @alias user
     * @method delete
     * @param id set user to some value
     * @param user
     * @tag user
     * @tagdescription System users
     */
    ServerInterface.prototype.deleteUser = function (id) {
        return { name: 'foobar' };
    };
    ServerInterface.prototype.newfn = function (s) {
        return 'Simple string answer';
    };
    /**
     * List all devices in the system
     * @param {string} id here could be the documentation of the ID value
     */
    ServerInterface.prototype.getDevices = function (id) {
        return [
            { id: 1, name: 'MacBook Pro' },
            { id: 2, name: 'iPhone' },
            { id: 3, name: 'Huawei' },
        ];
    };
    ServerInterface.prototype.allUsers = function () {
        return [
            { name: 'First User' },
            { name: 'Second User' },
        ];
    };
    /**
     * Fetch all users
     * @param id of course the user id
     */
    ServerInterface.prototype.users = function (id) {
        return [
            { name: 'First User' },
            { name: 'Second User' },
        ];
    };
    ServerInterface.prototype.createUser = function (u) {
        return { name: 'foobar' };
    };
    /**
     * Will set the device data
     * @description ok, looks good
     */
    ServerInterface.prototype.setDeviceData = function (createNewDevice) {
        var value = new model_1.SomeReturnValue();
        value.response = createNewDevice.description + ' OK ';
        return value;
    };
    ServerInterface.prototype.obj = function (v) {
        // Test inserting function code inside some file
        function compilerInsertTest() {
            for (var i = 0; i < 10; i++) {
                console.log(i);
            }
            return 1450;
        }
        // Then the client can use that computer generated code...
        var value = new model_1.SomeReturnValue();
        value.myValue = compilerInsertTest();
        return value;
    };
    /**
     * @nogenerate true
     */
    ServerInterface.prototype.test2 = function (id) {
        if (id > 12) {
            throw new Error('Invalid ID number');
        }
        var value = new model_1.SomeReturnValue();
        value.myValue = 12345;
        return value;
    };
    /**
     * Foobar...
     * @param id
     */
    ServerInterface.prototype.test3 = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var value;
            return __generator(this, function (_a) {
                if (id > 12) {
                    throw new Error('Invalid ID number');
                }
                value = new model_1.SomeReturnValue();
                value.myValue = 12345;
                return [2 /*return*/, value];
            });
        });
    };
    ServerInterface.prototype.HelloWorld = function (name) {
        if (name === 'tero')
            throw { errorCode: 403, message: 'What the...' };
        return "Hello World " + name;
    };
    /**
     * Async function returning stuff...
     * @error 404 ErrorNotFound
     */
    ServerInterface.prototype.hello = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(this.req.headers);
                this.res.cookie('hahaa', 'Just set you a cookie');
                if (name === 'tero')
                    throw { errorCode: 403, message: 'User not found' };
                return [2 /*return*/, "Hello " + name + "!!!"];
            });
        });
    };
    /**
     * Custom endpoint behaviour, not well defined at this point
     * @param name
     * @custom true
     */
    ServerInterface.prototype.custom = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(this.req.headers);
                this.res.sendFile(__dirname + '/index.js');
                return [2 /*return*/, 'ok'];
            });
        });
    };
    return ServerInterface;
}());
exports.ServerInterface = ServerInterface;
//# sourceMappingURL=api.js.map