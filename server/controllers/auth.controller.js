import jwt from 'jsonwebtoken';
// import httpStatus from 'http-status';
import config from '../config/config';
import encryption from '../config/encryption';
import User from '../models/user.model';

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
    // Ideally you'll fetch this from the db
    // Idea here was to show how jwt works with simplicity
    let reqPassword = req.body.password;
    let reqUsername = req.body.username;

    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, config.jwtSecret, function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                // if everything is good, save to request for use in other routes
                User.get(decoded.id)
                    .then(function (u) {
                        return res.json({
                            token
                        });
                    })
                    .catch(function (error) {
                        res.status(400);
                        return res.send({reason: 'Invalid user token!'});
                    });
            }
        });
    }
    else {
        User.getUserByUsername(reqUsername)
            .then(function (u) {
                if (encryption.generateHashedPassword(u.salt, reqPassword) === u.hashPass) {
                    token = jwt.sign({
                        id: u._id,
                        roles: u.roles
                    }, config.jwtSecret);

                    return res.json({
                        token
                    });
                } else {
                    res.status(400);
                    return res.send({reason: 'Invalid username or password!'});
                }
            })
            .catch(function (error) {
                res.status(400);
                return res.send({reason: 'Invalid username or password!'});
            });
    }
}

function loginAdmin(req, res, next) {
    // Ideally you'll fetch this from the db
    // Idea here was to show how jwt works with simplicity
    let reqPassword = req.body.password;
    let reqUsername = req.body.username;

    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, config.jwtSecret, function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                // if everything is good, save to request for use in other routes
                User.get(decoded.id)
                    .then(function (u) {
                        if (u.roles.indexOf('admin') !== -1) {
                            return res.json({
                                token
                            });
                        }
                        else {
                            res.status(400);
                            return res.send({reason: 'Invalid user token!'});
                        }
                    })
                    .catch(function (error) {
                        res.status(400);
                        return res.send({reason: 'Invalid user token!'});
                    });
            }
        });
    }
    else {
        User.getUserByUsername(reqUsername)
            .then(function (u) {
                if (encryption.generateHashedPassword(u.salt, reqPassword) === u.hashPass && u.roles.indexOf('admin') !== -1) {
                    token = jwt.sign({
                        id: u._id,
                        roles: u.roles
                    }, config.jwtSecret);

                    return res.json({
                        token
                    });
                } else {
                    res.status(400);
                    return res.send({reason: 'Invalid username or password!'});
                }
            })
            .catch(function (error) {
                res.status(400);
                return res.send({reason: 'Invalid username or password!'});
            });
    }
}

function logout(req, res, next) {
    return res.json({
        token: ""
    });
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
    // req.user is assigned by jwt middleware if valid token is provided
    return res.json({
        user: req.user,
        num: Math.random() * 100
    });
}

export default {login, loginAdmin, logout, getRandomNumber};
