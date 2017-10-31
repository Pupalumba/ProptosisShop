"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = require("rxjs/Rx");
var ErrorService = (function () {
    function ErrorService() {
    }
    ErrorService.handleErrors = function (error) {
        return Rx_1.Observable.throw(error);
    };
    ErrorService.allProductsNotFound = function (error) {
        return Rx_1.Observable.throw('Unable to load full list of products');
    };
    ErrorService.categoryNotFound = function (error) {
        return Rx_1.Observable.throw('Unable to load category');
    };
    ErrorService.productNotFound = function (error) {
        return Rx_1.Observable.throw('Product not found');
    };
    return ErrorService;
}());
exports.ErrorService = ErrorService;
