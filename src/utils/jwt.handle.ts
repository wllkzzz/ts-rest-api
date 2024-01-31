import { sign, verify } from "jsonwebtoken";


const generateJwt = async (email: string) => {
    const jwt = sign({email}, process.env.JWT_SECRET, {
        expiresIn: "12h"
    });
    return jwt;
};

const verifyJwt = async (token: string) => {
    const checkJwt = verify(token, process.env.JWT_SECRET);
    return checkJwt
}

export {generateJwt, verifyJwt};