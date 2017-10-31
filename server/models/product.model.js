import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Product Schema
 */
const ProductSchema = new mongoose.Schema({
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
    categories: {
        type: [],
    },
    attributes: {
        type: []
    },
    tags: {
        type: []
    },
    qty: {
        type: Number,
        required: true
    },
    instock: {
        type: Boolean,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    sold:{
        type: Number,
        default: 0
    },
    price: {
        type: String,
        required: true
    },
    specialPrice:{
        price: {
            type: Number
        },
        startDate:{
            type: Date
        },
        endDate:{
            type: Date
        }
    },
    createdAt: {
        type: Date,
        default: Date.now
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
ProductSchema.method({
});

/**
 * Statics
 */
ProductSchema.statics = {
    /**
     * Get product
     * @param {ObjectId} id - The objectId of product.
     * @returns {Promise<Product, APIError>}
     */
    get(id) {
        return this.findById(id)
            .exec()
            .then((product) => {
                if (product) {
                    return product;
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
export default mongoose.model('Product', ProductSchema);
