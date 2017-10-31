import {CreateProductComponent} from "../product/create/create-product.component";
import {ViewProductComponent} from "../product/view/view-product.component";
import {EditProductComponent} from "../product/edit/edit-product.component";

import {CreateCategoryComponent} from "../categories/create/create-category.component";
import {ViewCategoryComponent} from "../categories/view/view-category.component";
import {EditCategoryComponent} from "../categories/edit/edit-category.component";

import {HomeComponent} from "../home/home.component";
import {PanelComponent} from "./panel.component";

export const routes = [
    {
        path: '', component: PanelComponent,
        children: [
            {path: '', component: HomeComponent, data : {isCollapsed : 0}},
            {path: 'products', component: ViewProductComponent, data : {isCollapsed : 3}},
            {path: 'products/create', component: CreateProductComponent, data : {isCollapsed : 3}},
            {path: 'product/:id', component: EditProductComponent,data : {isCollapsed : 3}},
            {path: 'categories', component: ViewCategoryComponent, data : {isCollapsed : 3}},
            {path: 'categories/create', component: CreateCategoryComponent,data : {isCollapsed : 3}},
            {path: 'category/:id', component: EditCategoryComponent, data : {isCollapsed : 3}},
        ]
    },

];