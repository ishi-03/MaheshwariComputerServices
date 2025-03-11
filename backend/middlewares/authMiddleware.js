import jwt from 'jsonwebtoken'
import User from '../models/userModels.js'
import asyncHandler from './asyncHandler.js'


//if token not valid throw error

const authenticate = asyncHandler(async(req, res, next) => {
    let token;  

    //read 'JWT' from jwt cookie  
    token = req.cookies.jwt;
    if(token){
        try{
            //decode jwt
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // console.log("Decoded Token:", decoded);

            req.user = await User.findById(decoded.userId).select("-password");
            // console.log("User:", req.user);
            next();
        }catch(error){
            res.status(401)
            throw new Error("Not authorized, token failed")
        }
    }else{
        res.status(401)
        throw new Error("Not authorized, no token");
    }
});

//check for admin 

const authorizeAdmin = (req,res,next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401).send("Not Authorized as admin.")
    }
}

export {authenticate,authorizeAdmin};