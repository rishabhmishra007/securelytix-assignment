import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            status: "failure",
            message: "unauthorized - absent token"
        })
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        if(!decode){
            return res.status(401).json({
                status: "failure",
                message: "Unauthorized - invalid token"
            })
        }

        req.userId = decode.userId;
        next();
    } catch (error) {
        return res.status(400).json({
                status: "failure",
                message: error.message
            })
    }
}