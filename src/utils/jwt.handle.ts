import { sign } from "jsonwebtoken";


const generateJwt = async (id: string) => {
    const jwt = sign({id}, process.env.JWT_SECRET, {
        expiresIn: "12h"
    });
    return jwt;
};

export {generateJwt};