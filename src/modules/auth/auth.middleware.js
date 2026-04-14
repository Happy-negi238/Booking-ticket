import ApiErros from "../../common/utils/api-error.js";
import { verifyAccessToken } from "../../common/utils/jwt.utils.js";

async function authenticationMiddleware(req, res, next){
    const header = req.headers['authorization'];

    if(!header || !header.startsWith('Bearer ')) throw ApiErros.unauthorized("User need to login");

    const token = header.split(" ")[1];
    if(!token) throw ApiErros.badRequest("Authorization header must have bearer with token");

    const decode = verifyAccessToken(token);
    if(!decode) throw ApiErros.unauthorized("Token session expires");

    next();
}

export default authenticationMiddleware;
