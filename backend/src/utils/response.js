class ApiResponse {
    static success(res, data, message = 'Success', statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
        });
    }

    static error(res, message = 'Internal Server Error', statusCode = 500, error = null) {
        return res.status(statusCode).json({
            success: false,
            error: message,
            details: error ? error.message || error : undefined,
        });
    }

    static created(res, data, message = 'Resource created successfully') {
        return this.success(res, data, message, 201);
    }
}

module.exports = ApiResponse;
