import express from 'express';
import authController from '../controllers/authController.js';
import blogController from '../controllers/blogController.js';
import categoryContoller from '../controllers/categoryController.js';
import checkifuserauthenticated from '../middleswares/authmiddleware.js';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,`public/upload/`);
    },
    filename: function(req,file,cb){
        cb(null,`${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({storage:storage});

const route = express.Router();



route.post("/user/register",authController.userRegistration);
route.post("/user/login",authController.userLogin);

// Protected routes

route.get("/get/allblogs",checkifuserauthenticated,blogController.getallblogs);
route.post("/post/blog",checkifuserauthenticated,upload.single("thumbnail"),blogController.addsingleblog);
route.get("/get/blog/:id",checkifuserauthenticated,blogController.getsingleblog);
route.delete("/delete/blog",checkifuserauthenticated,blogController.deleteBlog);
route.get("/get/allcategories",checkifuserauthenticated,categoryContoller.getallcategories);
route.post("/post/addnewcategory",checkifuserauthenticated,categoryContoller.addnewcategory);


export default route;
