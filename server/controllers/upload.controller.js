import express from 'express';
import appRoot from 'app-root-path';
import encryption from '../config/encryption';
let multer = require('multer');

const router = express.Router();
let FileName = '';
let arrFileNames = [];

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let dir = appRoot.path+'/src/media/';
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        setFileName(file.originalname);
        arrFileNames.push(FileName);
        cb(null, FileName);
    }
});

let upload = multer({ //multer settings
    storage: storage
}).single('file');

function uploadFile(req, res) {
    upload(req,res,function(err){
        if(err){
            res.json({error_code:1,err_desc:err});
            return;
        }

        res.send(200);
    });
}

function clearNameFiles() {
    arrFileNames = [];
}

function getArrayFileNames() {
    return arrFileNames;
}

function setFileName(name) {

    let rx = name.match(/\.([A-Z])+/gi);

    let salt = encryption.generateSalt();
    FileName = encryption.generateHashedPassword(salt, name) + rx[0];
}

export default { uploadFile, getArrayFileNames, clearNameFiles };