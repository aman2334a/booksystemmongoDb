const jwt = require('jsonwebtoken');
const key='mysecretkey'
const userModel=require('./../model/userModel')


const userAuth=(req,res,next)=>{
    if(!req.headers.authorization){
        res.status(400).send("provide token")
    }
    else{
        var token=(req.headers.authorization).split(' ')[1]
        if(!token){
        res.status(400).send("token in not available")
        return
        }
        try{
            var decode = jwt.verify(token, key);
            if(!decode.id){
                res.status(404).send("user Id not found")
                return
                }
                userModel.getUserById(decode.id) 
                .then((resOfUser)=>{
                    if(resOfUser.length>0){
                        req.userId=decode.id
                        return next()
                    }else{
                    res.status(401).send("Unauthorized user")
                    }
                })
                .catch((errofUser)=>{
                    console.log(errofUser)
                    res.status(500).send("something went wrong")
                })
        }
        catch(e){
            console.log(e)
            res.status(400).send("Invalid Token")
        }
       
}
}
module.exports={
    userAuth
}
