
import jwt from "jsonwebtoken";
import authModel from "../models/authModel.js";

const checkifuserauthenticated = async(req,res,next)=>{
      let token;
      const {authorization} = req.headers;
      if(authorization && authorization.startsWith("Bearer")){
            try {

            token = authorization.split(" ")[1];

            //verify token
            const {userId} = jwt.verify(token,"Baigan");
            
            //get user from token

            req.user = await authModel.findById(userId).select("--password");
            next();
            
        } catch (error) {
            return res.status(401).json({message : "unAuthorized user1"});
            
        }

      }
      else{
        return res.status(401).json({message : "unAuthorized user2"});

      }

};

export default checkifuserauthenticated;