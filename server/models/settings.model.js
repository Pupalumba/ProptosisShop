import mongoose from 'mongoose';
import APIError from '../helpers/APIError';

const SettingsSchema = new mongoose.Schema({
});

SettingsSchema.method({});

SettingsSchema.statics = {

    get(id) {
        return this.findById(id)
            .exec()
            .then((category) => {
                if (category) {
                    return category;
                }
            });
    },

    list({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .sort({ createdAt: -1 })
            .skip(+skip)
            .limit(+limit)
            .exec();
    }
};


export default mongoose.model('Settings', SettingsSchema);
