import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Validators} from "@angular/forms";

@Injectable()
export class ActionsService {

    uploader(files){
        return new Observable(observer => {
            if(files.queue.length > 0){
                files.uploadAll();
                observer.next('files uploaded');

                files.onCompleteAll = () => {
                    observer.complete();
                }
            }
            else {
                observer.complete();
            }
        });
    }

    productFormBuilder(){
        return {
            title: ['', [
                Validators.required,
            ]],
            description: ['', [
                Validators.required,
            ]],
            price: ['', [
                Validators.required,
            ]],
            qty: ['', [
                Validators.required,
            ]],
            instock:['', [
                Validators.required,
            ]],
            status:['', [
                Validators.required,
            ]],
            sortDescription:null,
            gallery: null,
            category: null,
            attributes: null,
            tags:null,
            specialPrice: null,
            spStartDate:null,
            spEndDate:null,
        }
    }

    categoryFormBuilder(){
        return {
            title: ['', [
                Validators.required,
            ]],
            description: ['', [
                Validators.required,
            ]],
            status:['', [
                Validators.required,
            ]],
            sortDescription:null,
            displayMode:null,
            cms:null,
            sortingOptions:null,
            defaultSorting: null
        }
    }
}