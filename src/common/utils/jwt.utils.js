import jwt from 'jsonwebtoken';

const generateAccessToken  = (payload) => {
    return jwt.sign({userId: payload}, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m"
    })
}

const verifyAccessToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (error) {
        return null;
    }
}

const generateRefereshToken = (payload) => {
    return jwt.sign({userId : payload}, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d',
    })
}

const verifyRefereshToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
        return null;
    }
}

export{
    generateAccessToken,
    verifyAccessToken,
    generateRefereshToken,
    verifyRefereshToken
}
