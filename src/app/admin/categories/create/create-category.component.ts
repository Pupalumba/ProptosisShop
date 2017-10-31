import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Location} from '@angular/common';

import {Router} from '@angular/router';
import {ToastrService} from "../../../config/toastr.service";
import {Category} from "../../../services/category/category.model";
import {CategoryService} from "../../../services/category/category.service";
import {FileUploader} from 'ng2-file-upload';
import {ActionsService} from "../../../config/actions.service";
import {ProductService} from "../../../services/products/products.service";
import {ErrorService} from "../../../config/error.service";

import {Product} from "../../../services/products/products.model";

@Component({
    selector: 'create-category',
    styleUrls: [ '../category.component.scss' ,'../../index/panel.component.scss'],
    templateUrl: './create-category.component.html',
    providers: [CategoryService, ToastrService, ErrorService,ActionsService, ProductService]
})
export class CreateCategoryComponent implements OnInit{

    public category: Category = new Category();
    public uploader: FileUploader = new FileUploader({url: 'api/upload'});
    public filePreviewPath: Array<SafeUrl> = [];
    public highlight: number = 0;
    public products: Array<any> = [];

    public value: Array<string>;
    public actions:boolean = true;
    public selectValues: Object = {
        attributes: Array<string>(),
        categories: Array<string>(),
        tags: Array<string>(),
    };

    private form: FormGroup;
    private gallery: Array<any> = [];

    constructor(formBuilder: FormBuilder,
                private router: Router,
                private categoryService: CategoryService,
                private toastr: ToastrService,
                private vRef: ViewContainerRef,
                private sanitizer: DomSanitizer,
                private location: Location,
                private actionsService: ActionsService,
                private productService: ProductService,
                private errorService: ErrorService) {

        this.form = formBuilder.group(this.actionsService.categoryFormBuilder());

        this.uploader.onAfterAddingFile = (fileItem) => {
            this.filePreviewPath.push(this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(fileItem._file))));
        };

        this.toastr.setRoot(this.vRef);
    }

    ngOnInit(): void {
        this.productService.getAll()
            .subscribe(
                (data) => {
                    this.products = data;
                },
                (error) => {
                    this.toastr.massageJson(this.errorService.productNotFound());
                    this.toastr.showError();
                }
            );
    }


    public back(){
        this.location.back();
    }

    public removeItem(i) {
        this.filePreviewPath.splice(i, 1);
        this.uploader.queue[i].remove();
    }

    public setHighlightImage(index){
        this.highlight = index;
    }

    public addProductToCategory(id){

        let selected = this.category.products.indexOf(id);
        if(selected === -1){
            this.category.products.push(id)
        }else{
            this.category.products.splice(id, 1)
        }
    }

    public create() {
        if (!this.form.valid)
            return;

        this.handler_CategoryEdit();
        this.handler_ProductEdit();

        this.actionsService.uploader(this.uploader).subscribe(
            (value) => {
                console.log(value);
            },
            (error) => {
                this.toastr.massageJson(this.errorService.productNotFound());
                this.toastr.showError();
            },
            () => {
                this.categoryService.create(this.category)
                    .subscribe(
                        (res) => {
                            this.router.navigate(["admin/index/categories"]);
                        },
                        (error) => {
                            this.toastr.massageJson(this.errorService.productNotFound());
                            this.toastr.showError();
                        }
                    );
            }
        );
    }

    private handler_CategoryEdit(){
        for (let x = 0; x < this.uploader.queue.length; x++) {
            this.gallery.push(this.uploader.queue[x].file.name);
        }

        this.category.title = this.form.value.title;
        this.category.status = this.form.value.status;
        this.category.description = this.form.value.description;
        this.category.sortDescription = this.form.value.sortDescription;
        this.category.images = {
            highlight: this.highlight,
            gallery: this.gallery
        };
    }

    private handler_ProductEdit(){

        for(let x = 0; x < this.category.products.length; x++){
            this.productService.getById(this.category.products[x])
                .subscribe(
                    (data) => {
                        let product = new Product(data).parseFromJson(),
                            categoryTitle = this.category.title;

                        let selected = product.categories.indexOf(categoryTitle);
                        if(selected === -1){
                            product.categories.push(categoryTitle);

                            this.productService.update(product)
                                .subscribe(
                                    (res) => {
                                        this.router.navigate(["admin/index/categories"]);
                                    },
                                    (error) => {
                                        this.toastr.massageJson(this.errorService.productNotFound());
                                        this.toastr.showError();
                                    }
                                );
                        }
                    },
                    (error) => {
                        this.toastr.massageJson(this.errorService.productNotFound());
                        this.toastr.showError();
                    }
                );
        }
    }
}