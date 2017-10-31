import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Category } from "./category.model";
import { BackendService } from "../../config/backend.service";
import { ErrorService } from "../../config/error.service";

import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Injectable()
export class CategoryService {
    bServive: BackendService;
    constructor(private http: Http, private backendServive: BackendService) {
        this.bServive = backendServive;
    }

    getAll(){
        let url = this.bServive.apiUrl +"categories";

        return this.http.get(url)
            .map((response:any) => {
                return JSON.parse(response._body)
            });
    }

    getById(id){
        let url = this.bServive.apiUrl  + "categories/" + id;

        return this.http.get(url)
            .map((response:any) => {
                return JSON.parse(response._body)
            })
    }

    create(category: Category) {
        let url = this.bServive.apiUrl +"categories";

        return this.http.post(url, category)
            .map(response => {
                console.log(response);
            })
    }

    remove(id) {
        let url = this.bServive.apiUrl  + "categories/" + id;
        return this.http.delete(url)
            .map((response:any) => {
                console.log(response._body);
            })
    }

    update(category: Category) {
        let url = this.bServive.apiUrl  + "categories/" + category._id;
        return this.http.put(url, category)
            .map(response => {
                console.log(response);
            })
    }
}