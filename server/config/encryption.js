import * as CryptoJS from 'crypto';


export default {
    generateSalt: function () {
        return CryptoJS.randomBytes(128).toString('base64');
    },
    generateHashedPassword: function (salt, pwd) {
        let hmac = CryptoJS.createHmac('sha1', salt);
        return hmac.update(pwd).digest('hex');
    }
};
