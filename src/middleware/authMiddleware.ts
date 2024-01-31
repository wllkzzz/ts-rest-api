import express, { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { verifyJwt } from '../utils/jwt.handle';

interface RequestExt extends Request {
    user?: string | JwtPayload;
    headers: {
        authorization?: string;
    };
}

const checkAuth = async function(req: RequestExt, res: Response, next: NextFunction) {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: "Not authorized." });
        }

        const verify = verifyJwt(token);

        if (verify) {
            req.user = verify;
        }

        next();
    } catch (e) {
        res.status(401).json({ message: "Not authorized." });
    }
};

export {checkAuth};
