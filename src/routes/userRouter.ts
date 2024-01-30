
import { createNewUser, deleteUser, getAllUsers, getUserId, updateUser } from '../controllers/userController';
import express, { Router } from 'express';
const router: Router = express.Router()


const userRouter = () => {
    
    router.get('/users', getAllUsers);

    router.post('/users', createNewUser);

    router.get('/users/:id', getUserId);

    router.patch('/users/:id', updateUser);

    router.delete('/users/:id', deleteUser);

    return router
}

export {userRouter}