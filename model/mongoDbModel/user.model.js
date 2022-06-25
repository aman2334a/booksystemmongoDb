const mongoose =require(`mongoose`)


const userSchema=new mongoose.Schema({
    username:{type :String},
    password:{type :String},
    created_at:{type :Date},
    created_by:{type:Number}
})

var Users = mongoose.model('users', userSchema);

module.exports={
    Users
}