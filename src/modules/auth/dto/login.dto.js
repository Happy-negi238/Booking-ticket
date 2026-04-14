import Joi from "joi";
import BaseDto from "../../../common/dto/base.dto.js";

class LoginDto extends BaseDto {
    static schema = Joi.object({
        email: Joi.string().email().lowercase().required(),
        password: Joi.string().length(8).message(
            "Password must be 8 length"
        ).required(),
    })
}

export default LoginDto;
