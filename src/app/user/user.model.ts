export class User {

    constructor(f: string, l: string, u: string,p: string){
        this.firstname = f;
        this.lastname = l;
        this.username = u;
        this.password = p;
    }
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    public avatar: string;
    public token: string;
    public roles: Array<string>
}