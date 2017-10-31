import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {Location} from '@angular/common';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import {Router, ActivatedRoute} from '@angular/router';
import {ToastrService} from "../../../config/toastr.service";
import {Product} from "../../../services/products/products.model";
import {ProductService} from "../../../services/products/products.service";
import {FileUploader} from 'ng2-file-upload';
import {ActionsService} from "../../../config/actions.service";
import {ErrorService} from "../../../config/error.service";
import {CategoryService} from "../../../services/category/category.service";

@Component({
    selector: 'edit-product',
    styleUrls: ['../product.component.scss', '../../index/panel.component.scss','../../index/panel.component.scss'],
    templateUrl: './edit-product.component.html',
    providers: [ProductService, CategoryService, ToastrService,ErrorService, ActionsService]
})
export class EditProductComponent implements OnInit {
    public product: Product;
    public categories: Array<any> = [];
    public categoriesTitle: Array<any> = [];

    public uploader: FileUploader = new FileUploader({url: 'api/upload'});
    public filePreviewPath: Array<SafeUrl> = [];
    public highlight: number;
    public options: Select2Options;

    public value: Array<string>;

    public selectValues: Object = {
        attributes: Array<string>(),
        categories: Array<string>(),
        tags: Array<string>(),
    };

    private form: FormGroup;
    private gallery: Array<any> = [];
    private oldCategories: Array<any> = [];


    constructor(formBuilder: FormBuilder,
                private router: Router,
                private route: ActivatedRoute,
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

    private get(id) {
        this.productService.getById(id)
            .subscribe(
                (res) => {
                    let product = new Product(res).parseFromJson();
                    this.product = product;
                    this.highlight = product.images.highlight;
                    this.oldCategories = product.categories;
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    public getCategories(){
        this.categoryService.getAll()
            .subscribe(
                (data) => {
                    for(let x = 0; x< data.length ; x++){
                        this.categoriesTitle.push(data[x].title);
                    }

                    this.categories = data;

                },
                (error) => {
                    this.toastr.massageJson(this.errorService.categoryNotFound());
                    this.toastr.showError();
                }
            );
    }

    public back() {
        this.location.back();
    }

    public ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.get(params['id']);
        });

        this.getCategories();
    }

    public removeItem(i) {

        this.filePreviewPath.splice(i, 1);

        if (this.uploader.queue[i]) {
            this.uploader.queue[i].remove();
        }
        else {
            this.product.images.gallery.splice(i, 1);
            console.log(this.product)
        }
    }

    public setHighlightImage(index) {
        this.highlight = index;
    }

    public getSelectValues(data: { value: string[] }, key): void {
        this.selectValues[key] = data.value;
    }

    public edit() {
        this.handler_ProductEdit();
        this.handler_CategoryEdit();

        if (this.uploader.queue.length > 0) {

            this.actionsService.uploader(this.uploader).subscribe(
                (value) => {
                    console.log(value);
                },
                (error) => {
                    this.toastr.massageJson(this.errorService.productNotFound());
                    this.toastr.showError();
                },
                () => {
                    this.productService.update(this.product)
                        .subscribe(
                            (res) => {
                                this.router.navigate(["admin/index/products"]);
                            },
                            (error) => {
                                this.toastr.massageJson(this.errorService.productNotFound());
                                this.toastr.showError();
                            }
                        );
                }
            );
        }
        else{
            this.productService.update(this.product)
                .subscribe(
                    (res) => {
                        this.router.navigate(["admin/index/products"]);
                    },
                    (error) => {
                        this.toastr.massageJson(this.errorService.productNotFound());
                        this.toastr.showError();
                    }
                );
        }
    }

    private handler_CategoryEdit(){

        for(let x = 0; x < this.product.categories.length; x++){
            for(let z = 0; z < this.categories.length; z++){
                if(this.categories[z].title === this.product.categories[x]){
                    this.categoryService.getById(this.categories[z]._id)
                        .subscribe(
                            (data) => {
                                let category = data,
                                    productId = this.product.id;

                                let selected = category.products.indexOf(productId);
                                if(selected === -1){
                                    category.products.push(productId);

                                    this.categoryService.update(category)
                                        .subscribe(
                                            (res) => {
                                                this.router.navigate(["admin/index/products"]);
                                            },
                                            (error) => {
                                                this.toastr.massageJson(this.errorService.categoryNotFound());
                                                this.toastr.showError();
                                            }
                                        );
                                }
                            },
                            (error) => {
                                this.toastr.massageJson(this.errorService.categoryNotFound());
                                this.toastr.showError();
                            }
                        );
                }
            }
        }

        for(let z = 0; z < this.oldCategories.length; z++){

            if(this.product.categories.indexOf(this.oldCategories[z]) === -1){
                for(let t = 0; t < this.categories.length; t++){
                    if(this.categories[t].title === this.oldCategories[z]){
                        this.categoryService.getById(this.categories[t]._id)
                            .subscribe(
                                (data) => {
                                    let category = data,
                                        productId = this.product.id,
                                        selected = category.products.indexOf(productId);


                                    if(selected !== -1){
                                        category.products.splice(selected, 1);
                                        this.categoryService.update(category)
                                            .subscribe(
                                                (res) => {
                                                    this.router.navigate(["admin/index/products"]);
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
        }
    }

    private handler_ProductEdit(){

        this.gallery = [];
        if (this.uploader.queue.length > 0) {
            for (let x = 0; x < this.uploader.queue.length; x++) {
                this.gallery.push(this.uploader.queue[x].file.name);
            }
        }
        else{
            this.gallery = this.product.images.gallery;
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

        this.product.setProductAttr(newProduct);

    }
}