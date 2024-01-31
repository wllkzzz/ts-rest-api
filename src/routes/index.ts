import express, { Router } from 'express';
import { userRouter } from './userRouter';
import { authRouter } from './authRouter';
const router: Router = express.Router()


router.use('/user', userRouter());
router.use('/auth', authRouter())


export default router;