import {Component, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from "../user.model";
import {UserService} from "../user.service";
import {ToastrService} from "../../config/toastr.service";

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss', '../user.component.scss']
})
export class LoginComponent {
    form: FormGroup;
    private user: User;

    constructor(formBuilder: FormBuilder,
                private router: Router,
                private userService: UserService,
                private toastr: ToastrService,
                private vRef: ViewContainerRef) {

        this.form = formBuilder.group({
            username: ['', [
                Validators.required,
            ]],
            password: ['', [
                Validators.required,
            ]],
        });

        this.toastr.setRoot(this.vRef);
    }

    public load() {
        if (!this.form.valid) return;
        this.user = new User(
            this.form.value.firstname,
            this.form.value.lastname,
            this.form.value.username,
            this.form.value.password);

        if (this.router.url === '/user') {
            this.userService.login(this.user)
                .subscribe(
                    (responce) => {
                        this.router.navigate(["/"])
                    },
                    (error) => {
                        this.toastr.massageJson(error._body);
                        this.toastr.showError();
                    }
                );
        }
        else {
            this.userService.loginAdmin(this.user)
                .subscribe(
                    (response) => {
                        this.router.navigate(["admin/index"])
                    },
                    (error) => {
                        this.toastr.massageJson(error._body);
                        this.toastr.showError();
                    }
                );
        }

    }
}