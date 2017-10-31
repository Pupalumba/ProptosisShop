import {UserModule} from "../user/user.module";
import {PanelModule} from "./index/panel.module";
import {AuthGuard} from "../config/authguard.service";

export const routes = [
    {path: 'login', loadChildren: () => UserModule},
    {path: 'index', loadChildren: () => PanelModule},
];
