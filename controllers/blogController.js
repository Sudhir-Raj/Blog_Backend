
import blogModel from "../models/blogModel.js"

class blogController{
    static getallblogs = async (req,res)=>{
         
        const fetchallblogs = await blogModel.find({user : req.user._id});

          return res.status(200).json(fetchallblogs);


    };

    static deleteBlog = async (req,res)=>{
        
        try {
            
            const {id} = req.body;
            const blogtodelete = await blogModel.findByIdAndDelete(id);
            return res.status(200).json({message : "Blog deleted successfully"});
        } catch (error) {
            console.log(error);
            return res.status(400).json({message : "Cannot be delected"});
            
        }
          
    };

    static addsingleblog = async (req,res)=>{
        
        const{title,category,description} = req.body;
        try {
           
            if(title && category && description){
                
                const addblog = new blogModel({
                   
                    title : title,
                    description: description,
                    category: category,
                    thumbnail : req.file.filename,
                    user : req.user._id,

                });

                const savedblog = await addblog.save();
                if(savedblog){
             return res.status(200).json({message : "Blog added successfully"});

                }

            }
            else{
             return res.status(400).json({message : "All fields are required"});

            }

            
        } catch (error) {
       
             return res.status(400).json({message : error.message});
            
        }

    };

    static getsingleblog = async (req,res)=>{
       
        const {id} = req.params;

        try {

            if(id){
               
                const fetchblogbyid = await blogModel.findById(id);
             return res.status(200).json(fetchblogbyid);
                
            }
            else{
             return res.status(400).json({message : "Invalid URL"});

            }
            
        } catch (error) {
            return res.status(400).json({message : error.message});
            
        }
          
    };

}

export default blogController;