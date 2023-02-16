const jwt =require("jsonwebtoken");
require('dotenv').config()


const verifyJWT = (req,res,next) => {
  const authHeader = req.headers.authorization;

    console.log("fhbj",authHeader);
  jwt.verify(authHeader,process.env.JWTPRIVATEKEY,(err,decoded)=>{
    
    if(err) return res.status(403).json({
      
      message:"access token is not valid"
    });
    next();
  })
}


module.exports = verifyJWT