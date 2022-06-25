
const conn=require('./../dbconfig/config')

const createUser=(username,password)=>{
    return new Promise((resolve,reject)=>{
        conn.query(`insert into user(username,password)value('${username}','${password}')`,(err,result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}

const getUserByUsername=(username)=>{
    return new Promise((resolve,reject)=>[
        conn.query(`select id,password from user where username='${username}'`,(err,result)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(result)
            }
        })
    ])
}


const getUserByUsernameAndPassword=(username,password)=>{
    return new Promise((resolve,reject)=>{
        conn.query(`select * from user where username='${username}' and password='${password}'`,(err,result)=>{
            if(err){
                reject(err)
            }
            else{
                resolve(result)
            }
        })
    })
}

const getUserById=(id)=>{
    return new Promise((resolve,reject)=>{
        conn.query(`select username from user where id='${id}'`,(err,result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
            
        })
    })
}
module.exports={
    createUser,
    getUserByUsername,
    getUserByUsernameAndPassword,
    getUserById
}