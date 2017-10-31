import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule }  from '@angular/http';
import { MaterialModule } from '@angular/material';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { routes } from './home.routes';
import {ProductComponent} from "./product/product.component";

@NgModule({
    declarations: [
        /**
         * Components / Directives/ Pipes
         */
        ProductComponent
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
    ]
})
export class HomeModule {
    public static routes = routes;
}