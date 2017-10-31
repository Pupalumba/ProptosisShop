// import { getString, setString } from "application-settings";
import {Observable} from "rxjs/Rx";


export class BackendService {
    apiUrl = "api/";

    private authenticated: boolean;

    setToken(obj: any){
        let data = JSON.parse(obj._body);
        sessionStorage.setItem('token', data.token.toString());
    }

    getToken(){
        return sessionStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        return !!sessionStorage.getItem('token');
    }
}