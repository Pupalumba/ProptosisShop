import { Observable } from "rxjs/Rx";
import { Response } from "@angular/http";
import {Injectable} from "@angular/core";

@Injectable()
export class ErrorService {

    handleErrors(error?: Response) {
        return Observable.throw(error);
    }

    allProductsNotFound(error?: Response){
        return {reason: 'Unable to load full list of products'};
    }

    categoryNotFound(error?: Response){
        return {reason: 'Unable to load category'};
    }

    categoryDelete(error?: Response){
        return {reason: "Can't delete category"};
    }

    productNotFound(error?: Response){
        return {reason: 'Product not found'};
    }
}