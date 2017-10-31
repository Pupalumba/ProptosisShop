import express from 'express';
import userRoutes from './user.route';
import authRoutes from './auth.route';
import postRoutes from './post.route';
import productRoutes from './product.route';
import categoryRoutes from './category.route';
import uploadRoutes from './upload.route';
import settingsRoutes from './settings.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount user routes at /users
router.use('/users', userRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

router.use('/posts', postRoutes);

router.use('/products', productRoutes);

router.use('/categories', categoryRoutes);

router.use('/upload', uploadRoutes);

router.use('/settings', settingsRoutes);

export default router;