const Login=require('../models/Login')
const jwt =require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


function generateAccessToken(user) {
    return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '1800s' });
  }
 exports.registerValiations = [
	body('username').not().isEmpty().trim().withMessage('username is required'),
	body('password')
		.isLength({ min: 4 })
		.withMessage('Password must be 4 characters long')
];


exports.register = async (req, res) => {
	const { username, password } = req.body;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		
		// Hash password
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
		try {
        let admin_login=new Login(username,hash);
        logingin=await admin_login.create()
        console.log("loggiiningin",logingin);
        
        if(logingin.length>=1){
            const token=generateAccessToken({user:logingin})
            res.status(200).json({
                err:false,
                msg:'user created in successfully',
                user:logingin,
                token
            })
        }
        else{
            res.status(401).json({
                err:true,
                msg:'Username or password does not match'
            })
        }
		} catch (error) {
			return res.status(500).json({ errors: error });
		}
	} catch (error) {
		return res.status(500).json({ errors: error });
	}
};

exports.getUsers=async(req,res,next)=>{
    try {
        const [users]=await Login.findAll();
        res.status(200).json(users)
    } catch (error) {
        next(error);
    }
}
exports.userLogin=async(req,res,next)=>{
    try {
        let {username,password}=req.body;  
        // bycript 
        
        const [user] = await Login.findUser(username);
        console.log(user.length)
		if (user.length>=1) {
			const matched = await bcrypt.compare(password, user[0].password);
			if (matched) {
				const token = generateAccessToken(user[0])
				return res
					.status(200)
					.json({ msg: 'You have login successfully',token,user});
			} else {
				return res
					.status(401)
					.json({ errors: [{ msg: 'Password is not correct' }] });
			}
		} else {
			return res.status(404).json({ errors: [{ msg: 'user not found' }] });
		}
       
    } catch (error) {
        next(error);        
    }

}
exports.userUpdate=async(req,res,next)=>{
    try {
        const id=req.params.id
        let {username,password}=req.body;
        // Hash password
		const salt = await bcrypt.genSalt(10);
		const hash = await bcrypt.hash(password, salt);
        let update=new Login(username,hash);
        update=await update.updateAdmin(id);
        if(update.length>=1){
            res.status(200).json({
                err:false,
                msg:'Account Updated successfully',
            })
        }
        else{
            res.status(401).json({
                err:true,
                msg:'Error while updating the user'
            })
        }       
    } catch (error) {
        next(error);        
    }
}