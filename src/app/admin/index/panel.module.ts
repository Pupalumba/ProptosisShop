import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {MaterialModule} from '@angular/material';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {routes} from './panel.routes';

import {CreateProductComponent} from "../product/create/create-product.component";
import {ViewProductComponent} from "../product/view/view-product.component";
import {EditProductComponent} from "../product/edit/edit-product.component";

import {CreateCategoryComponent} from "../categories/create/create-category.component";
import {ViewCategoryComponent} from "../categories/view/view-category.component";
import {EditCategoryComponent} from "../categories/edit/edit-category.component";

import {HomeComponent} from "../home/home.component";
import {PanelComponent} from "./panel.component";
import {FileSelectDirective, FileDropDirective} from 'ng2-file-upload';
import {Select2Module} from 'ng2-select2';

@NgModule({
    declarations: [
        /**
         * Components / Directives/ Pipes
         */
        PanelComponent,
        CreateProductComponent,
        ViewProductComponent,
        EditProductComponent,
        CreateCategoryComponent,
        ViewCategoryComponent,
        EditCategoryComponent,
        HomeComponent,
        FileSelectDirective
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
        Select2Module
        // ApolloModule.forRoot(client)
    ]
})
export class PanelModule {
    public static routes = routes;
}