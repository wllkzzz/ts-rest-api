import { sign } from "jsonwebtoken";


const generateJwt = async (email: string) => {
    const jwt = sign({email}, process.env.JWT_SECRET, {
        expiresIn: "12h"
    });
    return jwt;
};

export {generateJwt};