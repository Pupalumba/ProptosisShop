export class Product {

    constructor(private obj: any) {
        if (this.obj.primitiveValues) {
            this.primitiveValues();
            this.selectValues();
        }
        else {
            this.parseFromJson();
        }
    }

    title: string;
    description: string;
    categories: Array<string>;
    price: number = 1;
    createdAt: number = Date.now();
    qty: number = 1;
    instock: boolean = true;
    status: boolean = true;

    id: string;
    sortDescription: string;
    images: {
        highlight: number,
        gallery: Array<any>
    };
    attributes: Array<string> = [''];
    tags: Array<string> = [''];
    sold: number = 0;
    specialPrice: {
        price: number,
        startDate: Date;
        endDate: Date;
    };

    private primitiveValues(arg?: any) {
        this.createdAt = this.obj.primitiveValues ? this.obj.primitiveValues.createdAt : Date.now();

        this.title = this.obj.primitiveValues ? this.obj.primitiveValues.title : this.title;
        this.description = this.obj.primitiveValues ? this.obj.primitiveValues.description : this.description;
        this.sortDescription = this.obj.primitiveValues ? this.obj.primitiveValues.sortDescription : this.sortDescription;
        this.price = this.obj.primitiveValues ? this.obj.primitiveValues.price : this.price;
        this.qty = this.obj.primitiveValues ? this.obj.primitiveValues.qty : this.qty;
        this.instock = this.obj.primitiveValues ? this.obj.primitiveValues.instock : this.instock;
        this.status = this.obj.primitiveValues ? this.obj.primitiveValues.status : this.status;
        this.images = {
            highlight: this.obj.images ? this.obj.images.highlight : this.images.highlight,
            gallery: this.obj.images ? this.obj.images.gallery : this.images.gallery
        };

        this.specialPrice = {
            price: this.obj.primitiveValues ? this.obj.primitiveValues.specialPrice : this.specialPrice.price,
            startDate: this.obj.primitiveValues ? this.obj.primitiveValues.spStartDate : this.specialPrice.startDate,
            endDate: this.obj.primitiveValues ? this.obj.primitiveValues.spEndDate : this.specialPrice.endDate
        }
    }

    private selectValues(arg?: any) {
        this.categories = this.obj.selectValues ? this.obj.selectValues.categories : this.categories;
        this.attributes = this.obj.selectValues ? this.obj.selectValues.attributes : this.attributes;
        this.tags = this.obj.selectValues ? this.obj.selectValues.tags : this.tags;
    }

    public setProductAttr(arg: any) {

        this.createdAt = arg.createdAt ? arg.createdAt : this.obj.createdAt;

        this.title = arg.title ? arg.title : this.obj.title;
        this.description = arg.description ? arg.description : this.obj.description;

        this.price = arg.price ? arg.price : this.obj.price;

        this.qty = arg.qty ? arg.qty : this.obj.qty;
        this.instock = arg.instock ? arg.instock : this.obj.instock;
        this.status = arg.status ? arg.status : this.obj.status;

        this.sortDescription = arg.sortDescription ? arg.sortDescription : this.obj.sortDescription;
        this.images = {
            highlight: arg.images.highlight !== undefined ? arg.images.highlight : this.obj.images.highlight,
            gallery: arg.images.gallery.length > 0 ? arg.images.gallery : this.obj.images.gallery
        };

        this.categories = arg.categories.length > 0  ? arg.categories : this.obj.categories;
        this.attributes = arg.attributes.length > 0 ? arg.attributes : this.obj.attributes;
        this.tags = arg.tags.length > 0  ? arg.tags : this.obj.tags;

        this.sold = arg.sold ? arg.sold : this.obj.sold;
        this.specialPrice = {
            price: arg.specialPrice.price ? arg.specialPrice.price : this.obj.specialPrice.price,
            startDate: arg.specialPrice.startDate ? arg.specialPrice.startDate : this.obj.specialPrice.startDate,
            endDate: arg.specialPrice.endDate ? arg.specialPrice.endDate : this.obj.specialPrice.endDate,
        };
    }

    public parseFromJson() {
        this.title = this.obj.title;
        this.description = this.obj.description;
        this.categories = this.obj.categories;
        this.price = this.obj.price;
        this.createdAt = this.obj.createdAt;
        this.qty = this.obj.qty;
        this.instock = this.obj.instock;
        this.status = this.obj.status;

        this.id = this.obj._id;
        this.sortDescription = this.obj.sortDescription;
        this.images = {
            highlight: this.obj.images.highlight,
            gallery: this.obj.images.gallery
        };
        this.attributes = this.obj.attributes;
        this.tags = this.obj.tags;
        this.sold = this.obj.sold;
        this.specialPrice = {
            price: this.obj.specialPrice.price,
            startDate: this.obj.specialPrice.startDate,
            endDate: this.obj.specialPrice.endDate,
        };

        return this;
    }
}