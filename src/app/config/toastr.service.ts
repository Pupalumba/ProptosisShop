
import {ToastsManager} from "ng2-toastr";
import {Injectable} from "@angular/core";

@Injectable()
export class ToastrService {
    massage: string;

    constructor(private toastr: ToastsManager) {}

    setRoot(vRef){
        this.toastr.setRootViewContainerRef(vRef);
    }

    massageJson(obj){
        this.massage = obj.reason;
    }

    showSuccess() {
        this.toastr.success(this.massage);
    }

    showError() {
        this.toastr.error(this.massage);
    }

    showWarning() {
        this.toastr.warning(this.massage);
    }

    showInfo() {
        this.toastr.info(this.massage);
    }
}