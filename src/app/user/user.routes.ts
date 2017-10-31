import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

export const routes = [
    {
        path: '', children: [
            { path: '', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
        ]
    },
];