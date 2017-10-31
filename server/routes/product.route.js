import express from 'express';
import validate from 'express-validation';
import paramValidation from '../config/param-validation';
import productCtrl from '../controllers/product.controller';

const router = express.Router();

router.route('/')
/** GET /api/products - Get list of posts */
    .get(productCtrl.list)

    /** POST /api/products - Create new post */
    .post(validate(paramValidation.createPost), productCtrl.create);

router.route('/:productId')
/** GET /api/product/:productId - Get post */
    .get(productCtrl.get)

    /** PUT /api/products/:productId - Update post */
    .put(productCtrl.update)

    /** DELETE /api/products/:productId - Delete post */
    .delete(productCtrl.remove);

/** Load product when API with productId route parameter is hit */
// router.param('productId', productCtrl.load);

export default router;
