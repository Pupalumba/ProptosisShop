
import {UserModule} from "../user/user.module";
import {ProductComponent} from "./product/product.component";

export const routes = [
    {path: 'user', loadChildren: () => UserModule},
    {path: 'products', component: ProductComponent},
];
