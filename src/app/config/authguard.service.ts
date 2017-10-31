import {Injectable} from "@angular/core";
import {CanActivate, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {BackendService} from "./backend.service";
import {UserService} from "../user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private bService: BackendService,
                private services: UserService) {
    }

    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        let token = this.bService.getToken();
        if (token) {
            return this.services.login({token: token})
                .map(
                    (response) => {
                        if (response.status == '200') {
                            return true;
                        } else {
                            this.router.navigate(['admin']);
                            return false;
                        }
                    },
                    (error) => alert(error)
                );
        } else {
            this.router.navigate(['admin']);
            return false;
        }
    }
}