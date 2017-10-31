"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var error_service_1 = require("../../config/error.service");
require("rxjs/add/operator/do");
require("rxjs/add/operator/map");
var ProductService = (function () {
    function ProductService(http, backendServive) {
        this.http = http;
        this.backendServive = backendServive;
        this.bServive = backendServive;
    }
    ProductService.prototype.getAll = function () {
        var url = this.bServive.apiUrl + "products";
        return this.http.get(url)
            .map(function (response) {
            return JSON.parse(response._body);
        })
            .catch(error_service_1.ErrorService.handleErrors);
    };
    ProductService.prototype.getById = function (id) {
        var url = this.bServive.apiUrl + "products/" + id;
        return this.http.get(url)
            .map(function (response) {
            return JSON.parse(response._body);
        })
            .catch(error_service_1.ErrorService.handleErrors);
    };
    ProductService.prototype.create = function (product) {
        var url = this.bServive.apiUrl + "products";
        return this.http.post(url, product)
            .map(function (response) {
            console.log(response);
        })
            .catch(error_service_1.ErrorService.handleErrors);
    };
    ProductService.prototype.remove = function (id) {
        var url = this.bServive.apiUrl + "products/" + id;
        return this.http.delete(url)
            .map(function (response) {
            // console.log(response._body);
        })
            .catch(error_service_1.ErrorService.handleErrors);
    };
    ProductService.prototype.update = function (product) {
        var url = this.bServive.apiUrl + "products/" + product.id;
        return this.http.put(url, product)
            .map(function (response) {
            console.log(response);
        })
            .catch(error_service_1.ErrorService.handleErrors);
    };
    return ProductService;
}());
ProductService = __decorate([
    core_1.Injectable()
], ProductService);
exports.ProductService = ProductService;
