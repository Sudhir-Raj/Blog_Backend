
import categoryModel from "../models/categoryModel.js";

class categoryContoller{

    static getallcategories = async(req,res)=>{
       try {
           
           const fetchallcats = await categoryModel.find({});
           return res.status(200).json(fetchallcats);
        
       } catch (error) {
        return res.status(400).json({message : error.message});
       }

    };

    static addnewcategory = async(req,res)=>{
         
        try {          
            const {title} = req.body;
            if(title){
            const newCat = new categoryModel({
                title,
            });
           const savedCat = await newCat.save();
          
           if(savedCat){
            return res.status(200).json({message : "new category added successfully"});
           }
        }
        else{
            return res.status(400).json({message : "all feilds are required"});
        }
        } catch (error) {
            return res.status(400).json({message : error.message});
        }

    };

}

export default categoryContoller;
