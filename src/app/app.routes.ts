import {Routes} from '@angular/router';
import {HomeComponent} from './site/home.component';
import {NoContentComponent} from './no-content';
import {AdminComponent} from "./admin/admin.component";

export const ROUTES: Routes = [
    {path: '',component: HomeComponent, loadChildren: './site#HomeModule'},
    {path: 'admin',component: AdminComponent, loadChildren: './admin#AdminModule'},
    {path: '**', component: NoContentComponent},

];
