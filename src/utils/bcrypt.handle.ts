import bcrypt from "bcrypt";

const encryptPass = async (pass: string) => {
    const hashPassword = await bcrypt.hash(pass, 10);
    return hashPassword;
}

const verifyPass = async (pass: string, hashPass: string) => {
    const isCorrect = await bcrypt.compare(pass, hashPass);
    return isCorrect;
}

export {encryptPass, verifyPass};