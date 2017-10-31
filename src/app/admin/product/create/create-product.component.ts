import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Location} from '@angular/common';

import {Router} from '@angular/router';
import {ToastrService} from "../../../config/toastr.service";
import {Product} from "../../../services/products/products.model";
import {ProductService} from "../../../services/products/products.service";
import {FileUploader} from 'ng2-file-upload';
import {ActionsService} from "../../../config/actions.service";
import {CategoryService} from "../../../services/category/category.service";
import {ErrorService} from "../../../config/error.service";

@Component({
    selector: 'create-products',
    styleUrls: [ '../product.component.scss' , '../../index/panel.component.scss','../../index/panel.component.scss'],
    templateUrl: './create-product.component.html',
    providers: [ProductService, CategoryService,ToastrService, ActionsService,ErrorService]
})
export class CreateProductComponent implements OnInit{

    public product: Product;
    public categories: Array<any> = [];
    public uploader: FileUploader = new FileUploader({url: 'api/upload'});
    public filePreviewPath: Array<SafeUrl> = [];
    public highlight: number = 0;
    public options: Select2Options;

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
                private productService: ProductService,
                private categoryService: CategoryService,
                private toastr: ToastrService,
                private vRef: ViewContainerRef,
                private sanitizer: DomSanitizer,
                private location: Location,
                private actionsService: ActionsService,
                private errorService: ErrorService) {

        this.form = formBuilder.group(this.actionsService.productFormBuilder());

        this.uploader.onAfterAddingFile = (fileItem) => {
            this.filePreviewPath.push(this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(fileItem._file))));
        };

        this.options = {
            width: '100%',
            multiple: true,
            theme: 'classic',
            closeOnSelect: true
        };

        this.toastr.setRoot(this.vRef);
    }


    ngOnInit(): void {
        this.getCategories();
    }

    public getCategories(){
        this.categoryService.getAll()
            .subscribe(
                (data) => {
                    for(let x = 0; x< data.length ; x++){
                        this.categories.push(data[x].title);
                    }

                },
                (error) => {
                    this.toastr.massageJson(this.errorService.categoryNotFound());
                    this.toastr.showError();
                }
            );
    }

    public editCategory(category){
        this.categoryService.update(category)
            .subscribe(
                (data) => {
                    console.log(data);
                },
                (error) => {
                    this.toastr.massageJson(this.errorService.categoryNotFound());
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

    public getSelectValues(data: {value: string[]}, key): void {
        this.selectValues[key] = data.value;
    }

    public create() {

        if (!this.form.valid)
            return;

        for (let x = 0; x < this.uploader.queue.length; x++) {
            this.gallery.push(this.uploader.queue[x].file.name);
        }

        let newProduct = new Product({
            primitiveValues: this.form.value,
            selectValues: {
                categories: this.selectValues['categories'],
                attributes: this.selectValues['attributes'],
                tags: this.selectValues['tags']
            },
            images: {
                highlight: this.highlight,
                gallery: this.gallery
            }
        });

        this.product = newProduct;

        // this.actionsService.uploader(this.uploader).subscribe(
        //     (value) => {
        //         console.log(value);
        //     },
        //     (error) => {
        //         this.toastr.massageJson(this.errorService.productNotFound());
        //         this.toastr.showError();
        //     },
        //     () => {
        //         this.productService.create(this.product)
        //             .subscribe(
        //                 (res) => {
        //                     this.router.navigate(["admin/index/products"]);
        //                 },
        //                 (error) => {
        //                     this.toastr.massageJson(this.errorService.productNotFound());
        //                     this.toastr.showError();
        //                 }
        //             );
        //     }
        // );
    }

}