import authModel from "../models/authModel.js";
import  jwt  from "jsonwebtoken";
import bcryptjs from "bcryptjs";

 const JWT_SECRET = process.env.JWT_SECRET;  

class authController{
    static userRegistration = async (req,res)=> {
        // console.log(req.body);
        const {username,email,password} = req.body;
        try {
            if(username && email && password){
                const isUser = await authModel.findOne({email : email});
                if(!isUser){
                    
                    const genSalt = await bcryptjs.genSalt(10);
                    const hashedPassword = await bcryptjs.hash(password,genSalt);
                    
                    const newUser = new authModel({
                        username,
                        email,
                        password: hashedPassword,
                    });
                    const savedUser = await newUser.save();
                    if(savedUser){
                        return res.status(200).json({message : "User registered successfully"});
                    }
                }
                else{
                    return res.status(400).json({message : "email already registered"});
                }
            }
            else{
                return res.status(400).json({message : "all fields are required"});
            }
            
        } catch (error) {
            return res.status(400).json({message : error.message});
        }
    };

    static userLogin = async (req,res)=> {
       const {email,password} = req.body;

         try 
         {
            if(email && password){
                const isMail = await authModel.findOne({email:email});
                if(isMail){
                if(email === isMail.email && await bcryptjs.compare(password,isMail.password)){

                      //generate token

                      const token = jwt.sign({userId : isMail._id},JWT_SECRET,{expiresIn : "2d"});

                      return res.status(200).json({ 
                        message :"Login Successful",
                        token,
                        name:isMail.username,  
                        UserId : isMail._id,     
                    });
           
                }
                else{
                    return res.status(400).json({message :"wrong credentials"});
                }
                
               }
               else{
                return res.status(400).json({message :"Email not found"});
               }
            }
            else{
                return res.status(400).json({message :"All fields are required"});
            }
            
         } 
         catch (error) {
            return res.status(400).json({message : error.message});
         }

    };
}

export default authController;