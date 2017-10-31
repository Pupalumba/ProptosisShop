import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import categoryCtrl from '../controllers/category.controller';

const router = express.Router();

router.route('/')
/** GET /api/categories - Get list of categories */
    .get(categoryCtrl.list)

    /** POST /api/categories - Create new post */
    .post(categoryCtrl.create);

router.route('/:categoryId')
/** GET /api/category/:categoryId - Get post */
    .get(categoryCtrl.get)

    /** PUT /api/categories/:categoryId - Update post */
    .put(categoryCtrl.update)

    /** DELETE /api/categories/:categoryId - Delete post */
    .delete(categoryCtrl.remove);


export default router;
