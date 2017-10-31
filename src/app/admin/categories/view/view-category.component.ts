import {Component, OnInit, ViewContainerRef} from "@angular/core";

import {CategoryService} from "../../../services/category/category.service";
import {ToastrService} from "../../../config/toastr.service";
import {ErrorService} from "../../../config/error.service";

@Component({
    selector: 'view-category',
    styleUrls: [ 'view-category.component.scss','../category.component.scss' , '../../index/panel.component.scss'],
    templateUrl: './view-category.component.html',
    providers:[ToastrService,CategoryService, ErrorService]
})
export class ViewCategoryComponent implements OnInit{

    private categories: Array<any> = [];
    private highlight: Array<any> = [];

    constructor(private categoryService: CategoryService,
                private toastr: ToastrService,
                private vRef: ViewContainerRef,
                private errorService: ErrorService){
        this.toastr.setRoot(this.vRef);
    }

    ngOnInit(): void {
       this.get();
    }

    private  get(){
        this.categoryService.getAll()
            .subscribe(
                (data) => {
                    this.categories = data;
                    this.highlight = [];
                    for(let x = 0; x < data.length; x++){
                        this.highlight.push(parseInt(data[x].images.highlight));
                    }

                    console.log(this.highlight);
                },
                (error) => {
                    this.toastr.massageJson(this.errorService.categoryNotFound());
                    this.toastr.showError();
                }
            );
    }

    public delete(id){
        this.categoryService.remove(id)
            .subscribe(
                (res) => {
                    this.categories = [];
                    this.get();
                },
                (error) => {
                    this.toastr.massageJson(this.errorService.categoryDelete());
                    this.toastr.showError();
                }
            )
    }
}