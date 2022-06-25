
const { Books } = require(`../../model/mongoDbModel/books.model`)


const addBook = async (req, res) => {
    var bookData = req.body

    var userId = req.userId
    if (!bookData.name || !bookData.price || !bookData.author) {
        res.status(400).send("All fields are important")
        return
    }
    console.log(bookData)
    let createResult = await Books.create({ "name": bookData.name, "price": bookData.price, "author": bookData.author, "created_by": userId })
    res.send(createResult)


}

const getAllBooks = async (req, res) => {
    const books = await Books.find({});
    res.status(200).json(books)
}


const updateBook = async (req, res) => {
    var bookData = req.body
    console.log("update fun",req.body)
    if (!bookData.name || !bookData.price || !bookData.author || !bookData.id) {
        res.status(400).send("All fields are mandatory")

    } else {
        try {

            const updatedBook = await Books.findByIdAndUpdate({ _id: bookData.id }, bookData, { new: true });
            res.status(200).send(`updated`)
        } catch (error) {

        }
    }

}

const getbook = async (req, res) => {

    try {
        let bookId = req.query.id;
        console.log("bookId",bookId)



        const book = await Books.find({ _id: bookId });
        res.status(200).send(book)

    } catch (error) {
        console.log(error)

    }

}

const searchbookByAuthorName = async (req, res) => {
    let authorName = req.query.authorName;


    const foundBook = await Books.find({ $author: { $search: `/"${authorName}/"` } });
    res.status(200).send(foundBook)

}
module.exports = {
    addBook,
    getAllBooks,
    updateBook,
    getbook,
    searchbookByAuthorName
}