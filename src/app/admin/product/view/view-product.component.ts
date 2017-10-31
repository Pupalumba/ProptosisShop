import {Component, OnInit, ViewContainerRef} from '@angular/core';
import {ProductService} from "../../../services/products/products.service";
import {Product} from "../../../services/products/products.model";
import {Router} from "@angular/router";
import {ErrorService} from "../../../config/error.service";
import {ToastrService} from "../../../config/toastr.service";

@Component({
    selector: 'view-products',
    styleUrls: [ '../product.component.scss' ,'../../index/panel.component.scss', '../../admin.component.scss'],
    templateUrl: './view-product.component.html',
    providers:[ProductService, ErrorService,ToastrService]
})
export class ViewProductComponent implements OnInit{

    private products: Array<Object> = [];

    constructor(private productService: ProductService,
                private router: Router,
                private toastr: ToastrService,
                private vRef: ViewContainerRef,
                private errorService: ErrorService) {

        this.toastr.setRoot(this.vRef);
    }

    ngOnInit(): void {
        this.get();
    }

    private get() {
        this.productService.getAll()
            .subscribe(
                (res) => {
                    for(let x = 0; x < res.length; x++){
                        let product = new Product(res[x]).parseFromJson();
                        this.products.push(product);
                    }
                },
                (error) => {
                    this.toastr.massageJson(this.errorService.productNotFound());
                    this.toastr.showError();
                }
            );
    }

    public delete(id){
        this.productService.remove(id)
            .subscribe(
            (res) => {
                this.products = [];
                this.get();
            },
            (error) => {
                this.toastr.massageJson(this.errorService.productNotFound());
                this.toastr.showError();
            }
        )
    }
}