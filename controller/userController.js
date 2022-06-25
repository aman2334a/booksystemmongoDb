const userModel=require('./../model/userModel')
const bcrypt=require('bcrypt')
const saltRounds=10
const jwt = require('jsonwebtoken');
const key='mysecretkey'


const passwordEncyption=(password)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.hash(password, saltRounds, function(err, hash) {
            if(err){
                reject(err)
            }else{
                resolve(hash)
            }
        });
    })
}

const passwordCompare=(password,hash)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.compare(password, hash, function(err, result) {
            if(result){
                resolve(result)
            }
            else if(err){
                reject(err)
            }
            else{
                reject("password not matched")
            }
        });
    })
}


const userRegister=(req,res)=>{
    userData=req.body
    if(!userData.username||!userData.password){
        res.status(400).send("Username and Password are mandatory")
        return
    }
    userModel.getUserByUsername(userData.username)
    .then((getUserRes)=>{
        if(getUserRes.length>0){
            res.status(400).send("username already taken")
        }else{
            passwordEncyption(userData.password)
            .then((response)=>{
                userModel.createUser(userData.username,response)
                .then((result)=>{

                    res.status(200).send("Created")
                }).catch((createUserErr)=>{
                    console.log(createUserErr)
                    res.status(500).send("Somthing went wrong")
                })
            })
            .catch((err)=>{
                console.log(err)
                res.status(500).send("Somthing went wrong")
            })
        }
    })  
}


const signin=(req,res)=>{
    var userData=req.body
    if(!userData.username||!userData.password){
        res.status(400).send("Username and Password are mandatory")
    }
    userModel.getUserByUsername(userData.username)
    .then((userResponse)=>{
        if(userResponse.length>0){
            passwordCompare(userData.password,userResponse[0].password)
            .then((passCompareRes)=>{
                console.log(userResponse[0].id)
                var token = jwt.sign({ id: userResponse[0].id }, key);
                res.status(200).send(token)

            }).catch((err1)=>{
                console.log(err1)
                res.status(400).send("Password Doesn't matched")
            })
        }else{
        res.status(404).send("User Not found")
        }

    })
    .catch((err)=>{
        console.log(err)
        res.status(500).send("Something went wrong") 
    })



}



module.exports={
    userRegister,
    signin
}