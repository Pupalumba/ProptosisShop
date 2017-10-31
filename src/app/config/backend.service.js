"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BackendService = (function () {
    function BackendService() {
        this.apiUrl = "api/";
    }
    BackendService.prototype.setToken = function (obj) {
        var data = JSON.parse(obj._body);
        sessionStorage.setItem('token', data.token.toString());
    };
    BackendService.prototype.getToken = function () {
        return sessionStorage.getItem('token');
    };
    BackendService.prototype.isAuthenticated = function () {
        return !!sessionStorage.getItem('token');
    };
    return BackendService;
}());
exports.BackendService = BackendService;
