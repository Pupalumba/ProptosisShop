import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Location} from '@angular/common';

import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from "../../../config/toastr.service";
import {Category} from "../../../services/category/category.model";
import {CategoryService} from "../../../services/category/category.service";
import {FileUploader} from 'ng2-file-upload';
import {ActionsService} from "../../../config/actions.service";
import {ProductService} from "../../../services/products/products.service";
import {ErrorService} from "../../../config/error.service";
import {Product} from "../../../services/products/products.model";

@Component({
    selector: 'edit-category',
    styleUrls: [ '../category.component.scss' ,'../../index/panel.component.scss'],
    templateUrl: './edit-category.component.html',
    providers: [CategoryService, ToastrService, ErrorService,ActionsService, ProductService]
})
export class EditCategoryComponent implements OnInit{

    public category: Category = new Category();
    public uploader: FileUploader = new FileUploader({url: 'api/upload'});
    public filePreviewPath: Array<SafeUrl> = [];
    public highlight: number = 0;
    public products: Array<any> = [];
    public oldProducts: Array<any> = [];

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
                private route: ActivatedRoute,
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
        this.route.params.subscribe(params => {
            this.get(params['id']);
        });

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

    private get(id) {
        this.categoryService.getById(id)
            .subscribe(
                (res) => {
                    this.category = res;
                    this.highlight = this.category.images.highlight;
                },
                (error) => {
                    console.log(error);
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
            this.category.products.push(id);
            this.oldProducts.splice(id, 1);
        }else{
            this.category.products.splice(selected, 1);
            this.oldProducts.push(id);
        }
    }

    public edit() {
        if (!this.form.valid)
            return;

        this.handler_CategoryEdit();
        this.handler_ProductEdit();


        if (this.uploader.queue.length > 0) {

            this.actionsService.uploader(this.uploader).subscribe(
                (value) => {
                    console.log(value);
                },
                (error) => {
                    this.toastr.massageJson(this.errorService.categoryNotFound());
                    this.toastr.showError();
                },
                () => {
                    this.categoryService.update(this.category)
                        .subscribe(
                            (res) => {
                                this.router.navigate(["admin/index/categories"]);
                            },
                            (error) => {
                                this.toastr.massageJson(this.errorService.categoryNotFound());
                                this.toastr.showError();
                            }
                        );
                }
            );
        }
        else{
            console.log(this.category);
            this.categoryService.update(this.category)
                .subscribe(
                    (res) => {
                        this.router.navigate(["admin/index/categories"]);
                    },
                    (error) => {
                        this.toastr.massageJson(this.errorService.categoryNotFound());
                        this.toastr.showError();
                    }
                );
        }
    }


    private handler_CategoryEdit(){
        this.gallery = [];
        if (this.uploader.queue.length > 0) {
            for (let x = 0; x < this.uploader.queue.length; x++) {
                this.gallery.push(this.uploader.queue[x].file.name);
            }
        }
        else{
            this.gallery = this.category.images.gallery;
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

        for(let z = 0; z < this.oldProducts.length; z++){
            this.productService.getById(this.oldProducts[z])
                .subscribe(
                    (data) => {
                        let product = new Product(data).parseFromJson(),
                            categoryTitle = this.category.title,
                            index = product.categories.indexOf(categoryTitle);
                        if(index !== -1){
                            product.categories.splice(index, 1);
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