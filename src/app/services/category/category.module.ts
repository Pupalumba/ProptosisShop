import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule }  from '@angular/http';
import { MaterialModule } from '@angular/material';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { routes } from './user.routes';

import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {BackendService} from "../../config/backend.service";
import {CategoryService} from "./category.service";


@NgModule({
    declarations: [
        /**
         * Components / Directives/ Pipes
         */
        LoginComponent,
        RegisterComponent
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
        // ApolloModule.forRoot(client)
    ],
    providers: [BackendService,CategoryService]
})
export class CategoryModule {
    public static routes = routes;
}