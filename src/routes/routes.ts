// routes/routes.ts
import { Router } from 'express';
import { registration, authorization } from '../controllers/userControllers';
import {
    registrationAdmin,
    authorizationAdmin,
    addSpecialist,
} from '../controllers/adminControllers';

const router = Router();

router.post('/signup', registration);
router.post('/login', authorization);

router.post('/admin/signup', registrationAdmin);
router.post('/admin/login', authorizationAdmin);

router.post('/admin/specialists/add', addSpecialist);

export { router };
