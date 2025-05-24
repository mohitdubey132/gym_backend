import jwt from 'jsonwebtoken';

export const authorizeUser = (req, res,next) => {
  const { token } = req.body;

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET ?? "uggjjh");
    // console.log("decoded user token", decodedData);
    req.user_role = decodedData.role;
    next()
   
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ success: false, message: 'Token expired' });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
  }
};

export const authorizeRoles = (...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user_role)){
             
            res.json({
                success:false,
                message:"invalid user to access this resource"
            })
        }
        else{
             next();
        }
       
    };
};