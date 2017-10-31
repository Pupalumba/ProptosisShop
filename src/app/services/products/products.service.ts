import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Product } from "./products.model";
import { BackendService } from "../../config/backend.service";
import { ErrorService } from "../../config/error.service";

import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Injectable()
export class ProductService {
    bServive: BackendService;
    constructor(private http: Http, private backendService: BackendService) {
        this.bServive = backendService;
    }

    getAll(){
        let url = this.bServive.apiUrl +"products";

        return this.http.get(url)
            .map((response:any) => {
                return JSON.parse(response._body)
            })
    }

    getById(id){
        let url = this.bServive.apiUrl  + "products/" + id;

        return this.http.get(url)
            .map((response:any) => {
                return JSON.parse(response._body)
            })
    }

    create(product: Product) {
        let url = this.bServive.apiUrl +"products";

        return this.http.post(url, product)
            .map(response => {
                console.log(response);
            })
    }

    remove(id) {
        let url = this.bServive.apiUrl  + "products/" + id;
        return this.http.delete(url)
            .map((response:any) => {
                console.log(response._body);
            })
    }

    update(product: Product) {
        let url = this.bServive.apiUrl  + "products/" + product.id;
        return this.http.put(url, product)
            .map(response => {
                console.log(response);
            })
    }
}