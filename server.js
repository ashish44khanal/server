require("dotenv").config();

const express=require('express');
const cors =require('cors');
const path = require( "path" );
const app =express();
app.use(cors());

// middlewares 
app.use(express.json()); //parse json bodies into the request object

// routes
app.get('/',async(req,res)=>{
    await res.send('hello')
}) 
app.use('/login',require('./routes/LoginRoutes'));

// route for image 
app.use('/', express.static(path.join(__dirname, '/')));

app.use((err,req,res,next)=>{
    console.log(err.stack);
    console.log(err.name);
    console.log(err.code);

    res.status(500).json({
        err:'true',
        message:'something went wrong',
    });
});

// listen on pc port 
const PORT =process.env.PORT || 4000;
app.listen(PORT,()=>console.log(`Sever running on port ${PORT}`));