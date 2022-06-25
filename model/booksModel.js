const { reject } = require('bcrypt/promises')
const conn=require('./../dbconfig/config')

const insertBookDetails=(data,userId)=>{
   return new Promise((resolve,reject)=>{
       conn.query(`insert into books (name,price,author,created_by) values ('${data.name}','${data.price}','${data.author}','${userId}')`,(err,result)=>{
           if(err){
               reject(err)
           }else{
               resolve(result)
           }
       })
   })
}

const getbooks=()=>{
    return new Promise((resolve,reject)=>{
        conn.query(`select * from books`,(err,result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}


const updateBook_modelFun=(data)=>{
    return new Promise((resolve,reject)=>{
        conn.query(`update books set name='${data.name}',price='${data.price}',author='${data.author}' where id='${data.id}'`,(err,result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}

const getBookByIdFromDb=(id)=>{
    return new Promise((resolve,reject)=>{
        conn.query(`select * from books where id='${id}'`,(err,result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}

const getBookByAuthorNameFromDb=(name)=>{
    return new Promise((resolve,reject)=>{
        conn.query(`select * from books where author LIkE '${name}%'`,(err,result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}


module.exports={
    insertBookDetails,
    getbooks,
    updateBook_modelFun,
    getBookByIdFromDb,
    getBookByAuthorNameFromDb
}