import express from 'express';
import uploadCtrl from '../controllers/upload.controller';

const router = express.Router();

router.route('/')
/** GET /api/upload */
    .post(uploadCtrl.uploadFile);

export default router;