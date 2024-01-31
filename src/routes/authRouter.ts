import { login, registration } from '../controllers/authController';
import express, { Router } from 'express';
const router: Router = express.Router()


const authRouter = () => {
    
    router.post('/registration', registration );

    router.post('/login', login);


    return router
}

export {authRouter}