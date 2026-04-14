import Joi from "joi";

class BaseDto {
    static schema = Joi.object({});

    static validate(data) {
        const { value, error } = this.schema.validate(data, {
            abortEarly: false,
            stripUnknown: true
        })

        if(error) {
            const errors = error.details.map(item => item.message);
            return { error: errors, value: null}
        }
        return { value, error: null}
    }
}

export default BaseDto;
