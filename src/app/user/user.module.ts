import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule }  from '@angular/http';
import { MaterialModule } from '@angular/material';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { routes } from './user.routes';

import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {BackendService} from "../config/backend.service";
import {UserService} from "./user.service";
import {ToastModule} from "ng2-toastr";
import {ToastrService} from "../config/toastr.service";

@NgModule({
    declarations: [
        /**
         * Components / Directives/ Pipes
         */
        LoginComponent,
        RegisterComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        RouterModule,
        HttpModule,
        MaterialModule,
        NgbModule,
        ToastModule.forRoot()
        // ApolloModule.forRoot(client)
    ],
    providers: [BackendService,UserService, ToastrService]
})
export class UserModule {
    public static routes = routes;
}