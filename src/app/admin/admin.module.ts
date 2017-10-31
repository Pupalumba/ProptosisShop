import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule }  from '@angular/http';
import { MaterialModule } from '@angular/material';
import { NgbDropdownConfig, NgbModule, NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import { routes } from './admin.routes';

import {AuthGuard} from "../config/authguard.service";
import {BackendService} from "../config/backend.service";
import {UserService} from "../user/user.service";
import {ToastModule} from "ng2-toastr";

import {SettingsService} from "../config/settings.service";
import {ActionsService} from "../config/actions.service";

@NgModule({
    declarations: [
        /**
         * Components / Directives/ Pipes
         */
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
    providers: [
        NgbDropdownConfig,
        NgbTabsetConfig,
        AuthGuard,
        BackendService,
        UserService,
        ActionsService
    ]
})
export class AdminModule {
    public static routes = routes;
}