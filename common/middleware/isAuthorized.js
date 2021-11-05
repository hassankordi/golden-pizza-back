const jwt = require("jsonwebtoken");
const rbac = require("../rbac/rbac");

module.exports = (endpoint)=>{
   

    return async (req , res , next)=>{
        // console.log(req.headers.authorization);

        if(req.headers.authorization){
            const token = req.headers.authorization.split(" ")[1];
            console.log(token);
            // 1636041681
            console.log(new Date());
    
            const decoded = jwt.verify(token ,  process.env.SECRET_KEY);
            console.log(decoded);
            req.user = decoded;
            const isAllow = await rbac.can(decoded.role,endpoint)
            console.log('is allow' + isAllow);
            if(isAllow){
                next();
            }
            else{
                res.json({message:'un Authorized ya bro'})
            }
    

        }else{
            res.json({message:'authorization is a must '})

        }

       
       
    }
    
}