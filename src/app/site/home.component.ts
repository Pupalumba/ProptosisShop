import {Component, OnInit} from '@angular/core';
import {BackendService} from "../config/backend.service";
import {UserService} from "../user/user.service";
import {Router} from '@angular/router';

@Component({
    selector: 'home',  // <home></home>
    styleUrls: ['./home.component.scss'],
    templateUrl: './home.component.html',
    providers: [BackendService, UserService]
})
export class HomeComponent implements OnInit {
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
                () => this.router.navigate(["/"]),
                (error) => alert(error)
            );
    }

    login() {
        let token = this.bService.getToken();

        if (token) {
            this.uService.login({token: token})
                .subscribe(
                    () => this.router.navigate(["/"]),
                    (error) => alert(error)
                );
        }
    }
}