const booksModel=require('./../model/booksModel')

const addBook=(req,res)=>{
    var bookData=req.body
    var userId=req.userId
    if(!bookData.name||!bookData.price||!bookData.author){
        res.status(400).send("All fields are important")
        return
    }
    booksModel.insertBookDetails(bookData,userId)
    .then((addBookRes)=>{
        res.status(200).send("created")
    })
    .catch((addBookErr)=>{
        console.log(addBookErr)
        res.status(500).send("Something went wrong")
    })

}

const getAllBooks=(req,res)=>{
    booksModel.getbooks()
    .then((getBooksRes)=>{
        res.send(getBooksRes)
    })
    .catch((getBooksErr)=>{
        console.log(getBooksErr)
        res.status(500).send("something went wrong")
    })
}


const updateBook=async (req,res)=>{
    var bookData=req.body
    if(!bookData.name||!bookData.price||!bookData.author||!bookData.id){
        res.status(400).send("All fields are mandatory")
        
    }else{
        try{   
            let resForUpdate=await booksModel.updateBook_modelFun(bookData)
            res.status(200).send("updated")
        }catch(e){
            res.status(500).send("Something went wrong")
        }
    }

}

const getbook=async(req,res)=>{
    let bookId=req.query.id
    try{
        let bookRes= await booksModel.getBookByIdFromDb(bookId)
        res.status(200).send(bookRes)
    }
    catch(e){
        console.log(e)
        res.status(500).send("Something went wrong")
    }
    

    
}

const searchbookByAuthorName=async(req,res)=>{
    let authorName=req.query.authorName
        try{
            let response=await booksModel.getBookByAuthorNameFromDb(authorName)
            res.status(200).send(response)
        }catch(e){
            console.log(e)
            res.status(500).send("Something went wrong")
        }

}

module.exports={
    addBook,
    getAllBooks,
    updateBook,
    getbook,
    searchbookByAuthorName
}