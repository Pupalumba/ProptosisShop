import {Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {User} from "../user.model";
import {UserService} from "../user.service";


@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss', '../user.component.scss'],
    providers: [UserService]
})
export class RegisterComponent {
    form: FormGroup;
    private user: User;

    constructor(
        formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService
    ) {
        this.form = formBuilder.group({
            firstname: ['', [
                Validators.required,
            ]],
            lastname: ['', [
                Validators.required,
            ]],
            username: ['', [
                Validators.required,
            ]],
            password: ['', [
                Validators.required,
            ]],
            repassword: ['', [
                Validators.required,
            ]],
        });
    }
    public save() {

        if (!this.form.valid) return;

        if (this.form.value.password !== this.form.value.repassword) return;

        this.user = new User(this.form.value.firstname, this.form.value.lastname,this.form.value.username ,this.form.value.password);

        this.userService.register(this.user)
            .subscribe(
                () => {
                    this.router.navigate(["/"])
                },
                () => alert("Unfortunately we were unable to create your account.")
            );
    }
}
