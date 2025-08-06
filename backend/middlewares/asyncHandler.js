const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((error) => {
        res.status(500).json({message: error?.message || "Something went wrong"
 || "Something went wrong"
})
    });
    
}

export default asyncHandler;