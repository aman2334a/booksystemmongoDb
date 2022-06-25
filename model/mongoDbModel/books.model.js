const mongoose =require(`mongoose`)


const booksSchema=mongoose.Schema({
    name:{type :String},
    price:{type :String},
    author:{type :String},
    created_at:{type :Date},
    created_by:{type:String}
})

var Books = mongoose.model('books', booksSchema);

module.exports={
    Books
}