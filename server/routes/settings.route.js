import express from 'express';
import settingsCtrl from '../controllers/settings.controller';

const router = express.Router();

router.route('/')
/** GET /api/settings - Get list of posts */
    .get(settingsCtrl.list)

router.route('/:settingsId')
/** GET /api/settings/:settingsId - Get post */
    .get(settingsCtrl.get)

    /** PUT /api/settings/:settingsId - Update post */
    .put(settingsCtrl.update)

    /** DELETE /api/settings/:settingsId - Delete post */
    .delete(settingsCtrl.remove);

export default router;
