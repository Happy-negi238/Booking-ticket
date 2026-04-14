import ApiErros from "../utils/api-error.js";

const validate = (DtoClass) => {
    return (req, res, next) => {
        const {value, error} = DtoClass.validate(req.body);
        if(error) throw ApiErros.badRequest(res, error);

        req.body = value;
        next();
    }
}

export default validate;
