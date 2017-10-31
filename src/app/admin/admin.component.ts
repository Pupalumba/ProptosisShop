import { Component } from '@angular/core';
import {BackendService} from "../config/backend.service";
import {UserService} from "../user/user.service";
import {Router} from '@angular/router';


@Component({
    selector: 'admin',
    styleUrls: [ './admin.component.scss' ],
    templateUrl: './admin.component.html',
    providers: [BackendService, UserService]
})
export class AdminComponent {
    bService: BackendService;

    constructor(private router: Router,
                private uService: UserService,
                backendService: BackendService) {
        this.bService = backendService;

    }

    public ngOnInit() {
        this.login();
    }

    logout() {
        let token = this.bService.getToken();
        this.uService.logout({token: token})
            .subscribe(
                () => this.router.navigate(["admin/index"]),
                (error) => alert(error)
            );
    }

    login() {
        let token = this.bService.getToken();
        if (token) {
            this.uService.loginAdmin({token: token})
                .subscribe(
                    (res:any) => {
                        if (res.status !== 200) {
                            this.router.navigate(['admin/login']);
                        }
                    },
                    (error) =>{
                        this.router.navigate(['admin/login']);
                    }
                );
        }
        else{
            this.router.navigate(['admin/login']);
            return false;
        }
    }
}