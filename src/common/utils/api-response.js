class ApiResponse{
    static created(res, message = "created successfully", data = null){
        return res.status(201).json({
            message,
            data
        })
    }

    static ok(res, message = "All ok", data = null){
        return res.status(200).json({
            message,
            data
        })
    }
}

export default ApiResponse;
