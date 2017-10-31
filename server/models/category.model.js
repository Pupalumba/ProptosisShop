import Promise from 'bluebird';
import mongoose from 'mongoose';
import APIError from '../helpers/APIError';

/**
 * Product Schema
 */
const CategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    sortDescription:{
        type: String,
    },
    images: {
        highlight: {
            type: String
        },
        gallery:{
            type: []
        },
    },
    status: {
        type: Boolean,
        required: true
    },
    products: {
        type: []
    }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
CategorySchema.method({
});

/**
 * Statics
 */
CategorySchema.statics = {
    /**
     * Get product
     * @param {ObjectId} id - The objectId of product.
     * @returns {Promise<Product, APIError>}
     */
    get(id) {
        return this.findById(id)
            .exec()
            .then((category) => {
                if (category) {
                    return category;
                }
                // const err = new APIError('No such product exists!', httpStatus.NOT_FOUND);
                // return Promise.reject(err);
            });
    },

    /**
     * List products in descending order of 'createdAt' timestamp.
     * @param {number} skip - Number of posts to be skipped.
     * @param {number} limit - Limit number of products to be returned.
     * @returns {Promise<Product[]>}
     */
    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .sort({ createdAt: -1 })
            .skip(+skip)
            .limit(+limit)
            .exec();
    }
};

/**
 * @typedef Product
 */
export default mongoose.model('Category', CategorySchema);
