export class Category {

    constructor() {}

    title: string;
    status: boolean = true;
    description: string;
    id: string;
    sortDescription: string;
    images: {
        highlight: number,
        gallery: Array<any>
    };
    products: Array<string> = [];
}