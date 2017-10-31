import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { BackendService } from "./backend.service";
import { ErrorService } from "./error.service";

import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Injectable()
export class SettingsService {
    bServive: BackendService;
    constructor(private http: Http, private backendServive: BackendService) {
        this.bServive = backendServive;
    }

    getAll(){
        let url = this.bServive.apiUrl +"settings";

        return this.http.get(url)
            .map((response:any) => {
                return JSON.parse(response._body)
            })
            .catch(ErrorService.handleErrors);
    }

    getById(id){
        let url = this.bServive.apiUrl  + "settings/" + id;

        return this.http.get(url)
            .map((response:any) => {
                return JSON.parse(response._body)
            })
            .catch(ErrorService.handleErrors);
    }

    remove(id) {
        let url = this.bServive.apiUrl  + "settings/" + id;
        return this.http.delete(url)
            .map((response:any) => {
                // console.log(response._body);
            })
            .catch(ErrorService.handleErrors);
    }

    update(settings: any) {
        let url = this.bServive.apiUrl  + "settings/" + settings.id;
        return this.http.put(url, settings)
            .map(response => {
                console.log(response);
            })
            .catch(ErrorService.handleErrors);
    }
}