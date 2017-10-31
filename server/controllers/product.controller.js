import Product from '../models/product.model';
import uploadCtrl from './upload.controller';
import appRoot from 'app-root-path';

let fs = require('fs');

// Product.remove({}).exec(function (err) {
//     if(err){
//         console.log(err);
//         return;
//     }
// });

function load(req, res, next) {

    return Product
        .get(req.params.productId)
        .then(product => {
            return res.json(product);
        })
        .catch(e => next(e));
}

function get(req, res, next) {
    return load(req, res, next);
}

function create(req, res, next) {

    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        sortDescription: req.body.sortDescription,
        categories: req.body.categories,
        attributes: req.body.attributes,
        tags: req.body.tags,
        qty: req.body.qty,
        instock: req.body.instock,
        status: req.body.status,
        sold: req.body.sold,
        price: req.body.price,
        specialPrice: req.body.specialPrice
    });

    let arr = uploadCtrl.getArrayFileNames();
    for (let x = 0; x < arr.length; x++) {
        product.images.gallery[x] = arr[x];
    }

    product.images.highlight = req.body.images.highlight;

    product.save()
        .then(product => {
            uploadCtrl.clearNameFiles();
            res.json(product)
        })
        .catch(e => {
            let dir = appRoot.path + '/src/media/';
            for (let x = 0; x < arr.length; x++) {
                fs.exists(dir + arr[x], function (exists) {
                    if (exists) {
                        console.log('File exists. Deleting now ...');
                        fs.unlinkSync(dir + arr[x]);
                    } else {
                        console.log('File not found, so not deleting.');
                    }
                });
            }
            uploadCtrl.clearNameFiles();
            next(e);
        });
}

function update(req, res, next) {
    Product
        .get(req.params.productId)
        .then((product) => {

            let dir = appRoot.path + '/src/media/';
            let arr = product.images.gallery;
            let gallery = req.body.images.gallery;

            if(uploadCtrl.getArrayFileNames().length > 0){
                for (let x = 0; x < arr.length; x++) {
                    fs.exists(dir + arr[x], function (exists) {
                        if (exists) {
                            console.log('File exists. Deleting now ...');
                            fs.unlinkSync(dir + arr[x]);
                        } else {
                            console.log('File not found, so not deleting.');
                        }
                    });
                }
            }
            else{
                let exists = false;
                for (let x = 0; x < arr.length; x++) {
                    for (let z = 0; z < gallery.length; z++) {
                        if(gallery[z] === arr[x]){
                            exists = true;
                        }
                    }

                    if(!exists){
                        fs.exists(dir + arr[x], function (exists) {
                            if (exists) {
                                console.log('File exists. Deleting now ...');
                                fs.unlinkSync(dir + arr[x]);
                            } else {
                                console.log('File not found, so not deleting.');
                            }
                        });
                    }

                    exists = false;
                }
            }

            return product;
        })
        .then((product) => {
            product.title = req.body.title;
            product.description = req.body.description;
            product.sortDescription = req.body.sortDescription;
            product.categories = req.body.categories;
            product.attributes = req.body.attributes;
            product.tags = req.body.tags;
            product.qty = req.body.qty;
            product.instock = req.body.instock;
            product.status = req.body.status;
            product.sold = req.body.sold;
            product.price = req.body.price;
            product.specialPrice = req.body.specialPrice;

            let arr = uploadCtrl.getArrayFileNames();
            product.images.gallery = [];
            if(uploadCtrl.getArrayFileNames().length > 0) {
                for (let x = 0; x < arr.length; x++) {
                    product.images.gallery[x] = arr[x];
                }

            }
            else{
                product.images.gallery = req.body.images.gallery;

            }


            product.images.highlight = req.body.images.highlight;

            return product;
        })
        .then((product) =>{


            product.save()
                .then(result => {
                    uploadCtrl.clearNameFiles();
                    res.status(200);
                    return res.json(result);
                })
                .catch(e => {
                    let dir = appRoot.path + '/src/media/';
                    let arr = uploadCtrl.getArrayFileNames();
                    for (let x = 0; x < arr.length; x++) {
                        fs.exists(dir + arr[x], function (exists) {
                            if (exists) {
                                console.log('File exists. Deleting now ...');
                                fs.unlinkSync(dir + arr[x]);
                            } else {
                                console.log('File not found, so not deleting.');
                            }
                        });
                    }
                    uploadCtrl.clearNameFiles();
                    res.status(404);
                    return res.send({reason: e});
                });
        })
        .catch(e => res.status(404));
}

function list(req, res, next) {
    const {limit = 50, skip = 0} = req.query;
    Product.list({limit, skip})
        .then(products => {
            res.json(products);
        })
        .catch(e => next(e));
}

function remove(req, res, next) {
    Product
        .get(req.params.productId)
        .then((product) => {
            let dir = appRoot.path + '/src/media/';
            let arr = product.images.gallery;
            for (let x = 0; x < arr.length; x++) {
                fs.exists(dir + arr[x], function (exists) {
                    if (exists) {
                        console.log('File exists. Deleting now ...');
                        fs.unlinkSync(dir + arr[x]);
                    } else {
                        console.log('File not found, so not deleting.');
                    }
                });
            }

            product.remove();
            res.status(200);
            return res.send({reason: 'Product deleted!'});
        })
        .catch(e => next(e));
}

export default {load, get, create, update, list, remove};
