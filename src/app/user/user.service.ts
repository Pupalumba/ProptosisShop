import { Injectable, ViewContainerRef } from "@angular/core";
import { Http, Headers } from "@angular/http";
import { User } from "./user.model";
import { BackendService } from "../config/backend.service";
import { ErrorService } from "../config/error.service";

import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

@Injectable()
export class UserService {
    bServive: BackendService;
    constructor(private http: Http,
                private backendServive: BackendService) {
        this.bServive = backendServive;
    }

    register(user: User) {
        let url = this.bServive.apiUrl +"users";

        return this.http.post(url, user)
            .map(response => {
                this.bServive.setToken(response);
                return response;
            })
            .catch(ErrorService.handleErrors);
    }

    login(user: any) {
        let url = this.bServive.apiUrl  + "auth/login";
        return this.http.post(url, user)
            .map(response => {
                this.bServive.setToken(response);
                return response;
            })
            .catch(ErrorService.handleErrors);
    }

    loginAdmin(user: any) {
        let url = this.bServive.apiUrl  + "auth/login/admin";
        return this.http.post(url, user)
            .map(response => {
                this.bServive.setToken(response);
                return response;
            })
            .catch(ErrorService.handleErrors);
    }

    logout(user: any){
        let url = this.bServive.apiUrl  + "auth/logout";
        let headers =  new Headers();
        headers.append('Authorization', 'Bearer ' + this.bServive.getToken());
        return this.http.post(url, user, {headers: headers })
            .map(response => {
                    this.bServive.setToken(response);
                    return response;
                })
            .catch(ErrorService.handleErrors);
    }
}