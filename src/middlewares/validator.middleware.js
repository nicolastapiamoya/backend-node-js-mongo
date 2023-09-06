export const validateSchema = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body)
        next()
    } catch (error) {
        const errorMessage = {
            status: 400,
            message: error.issues.map(err => err.message),
            payload: {}
        }
        return res.status(400).json(errorMessage)
    }

}