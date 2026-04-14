import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class RegisterDto extends BaseDto{
    static schema = Joi.object({
        firstName: Joi.string().trim().min(2).max(30).required(),
        lastName: Joi.string().trim().min(2).max(30).optional(),
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().length(8).message(
            "Password must be 8 length"
        ).required(),
    })
}

export default RegisterDto;
