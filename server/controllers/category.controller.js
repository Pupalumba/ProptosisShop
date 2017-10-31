import Category from '../models/category.model';
import uploadCtrl from './upload.controller';
import appRoot from 'app-root-path';
let fs = require('fs');
// Category.remove({}).exec(function (err) {
//     if(err){
//         console.log(err);
//         return;
//     }
// });

function load(req, res, next) {

    return Category
        .get(req.params.categoryId)
        .then(category => {
            return res.json(category);
        })
        .catch(e => next(e));
}

function get(req, res, next) {
    return load(req, res, next);
}

function create(req, res, next) {
    const category = new Category({
        title: req.body.title,
        description: req.body.description,
        sortDescription: req.body.sortDescription,
        status: req.body.status,
        products: req.body.products
    });

    let arr = uploadCtrl.getArrayFileNames();
    for (let x = 0; x < arr.length; x++) {
        category.images.gallery[x] = arr[x];
    }

    category.images.highlight = req.body.images.highlight;

    category.save()
        .then(category => {
            uploadCtrl.clearNameFiles();
            res.json(category)
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
    Category
        .get(req.params.categoryId)
        .then((category) => {

            let dir = appRoot.path + '/src/media/';
            let arr = category.images.gallery;
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

            return category;
        })
        .then((category) => {
            category.title = req.body.title;
            category.description = req.body.description;
            category.sortDescription = req.body.sortDescription;
            category.status = req.body.status;
            category.products = req.body.products;

            let arr = uploadCtrl.getArrayFileNames();
            category.images.gallery = [];
            if(uploadCtrl.getArrayFileNames().length > 0) {
                for (let x = 0; x < arr.length; x++) {
                    category.images.gallery[x] = arr[x];
                }

                category.images.highlight = arr[req.body.images.highlight];
            }
            else{
                category.images.gallery = req.body.images.gallery;
                category.images.highlight = req.body.images.highlight;
            }

            return category;
        })
        .then((category) =>{
            category.save()
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
    Category.list({limit, skip})
        .then(category => {
            res.json(category);
        })
        .catch(e => next(e));
}

function remove(req, res, next) {

    Category
        .get(req.params.categoryId)
        .then((category) => {
            let dir = appRoot.path + '/src/media/';
            let arr = category.images.gallery;
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

            category.remove();
            res.status(200);
            return res.send({reason: 'Category deleted!'});
        })
        .catch(e => next(e));
}

export default {load, get, create, update, list, remove};
