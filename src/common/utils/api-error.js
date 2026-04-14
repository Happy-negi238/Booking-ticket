class ApiErros extends Error{
    constructor(statusCode , message){
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message = "Bad Request"){
        return new ApiErros(400, message);
    }

    static conflict(message = "Conflict found"){
        return new ApiErros(409, message);
    }

    static unauthorized(message = "unauthorized"){
        return new ApiErros(401, message)
    }
}

export default ApiErros
