const mongoose=require(`mongoose`)

// const mysql=require('mysql')
// var config={
//     host:"localhost",
//     user:"root",
//     password:'',
//     database:"task",
//     dbdriver:'mysqli'
// }

// const conn=mysql.createConnection(config)
// conn.connect(function(err){ 
//     if(err) throw err
// })
// module.exports=conn




// create two collection in your database name as books and users and import the given json files in dbCollection folder then entered your localhost uri here

const uri="your local host uri"

mongoose.connect(uri).then(
    () => { console.log(`monogo connected`) },
    err => { console.log(err) }
  );