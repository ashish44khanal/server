const express =require('express');
const loginController=require('../controllers/LoginControllers');
const router=express.Router();
const multer = require('multer');

const storage=multer.diskStorage({
    destination:'./images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.filename}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

//@route GET & POST - /login/
const {
    getUsers,
    userLogin,
    register,
    userUpdate,
    registerValiations
}=require('../Controllers/LoginControllers')
router.get('/',getUsers);
router.post('/register',registerValiations,register);
router.post('/',userLogin);
router.put('/:id',userUpdate);

module.exports=router