const {Users}=require(`../../model/mongoDbModel/user.model`)
const bcrypt=require('bcrypt')
const saltRounds=10
const jwt = require('jsonwebtoken');
const key='mysecretkey'


const userRegister=async(req,res)=>{
    console.log(Users)
    userData = req.body
    userData.created_at=new Date()
    if(!userData.username||!userData.password){
        res.status(400).send("Username and Password are mandatory")
        return
    }
    let userNameResult=await Users.find({"username":userData.username})
    if(userNameResult.length){
        res.status(400).send(`username already exist`)
        return
    }
    let hashPassword=await passwordEncyption(userData.password)
    userData.password=hashPassword
    const createResult = await Users.create(userData);
    console.log(createResult)
    if(createResult){
        res.status(200).send(`created`)
    }else{
        res.status(500).send(`Something went wrong`)
    }


     
}



const signin=async (req,res)=>{
    var userData=req.body
    if(!userData.username||!userData.password){
        res.status(400).send("Username and Password are mandatory")
        return
    }
    let userNameResult=await Users.find({"username":userData.username})
    // console.log(userNameResult)
    if(userNameResult.length){
        try{

            let passwordCompareresult=await passwordCompare(userData.password,userNameResult[0].password)
            if(passwordCompareresult){
                var token = jwt.sign({ id: userNameResult[0].id }, key);
                res.status(200).send(token)

            }
        }
        catch(e){
            console.log(e)
            res.status(400).send(`wrong password`)
        }
    }else{
        res.status(400).send(`wrong user name`)

    }
    

}


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
    // console.log(`password and hash::`,password,hash)
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

module.exports={
    userRegister,passwordCompare,passwordEncyption,signin
}