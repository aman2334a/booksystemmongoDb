const express=require(`express`)
const app=express()
const PORT=8000
// const PORT=process.env.port
const cors=require('cors')
const userController=require('./controller/userController')
const booksController=require('./controller/booksController')

const mongoUserController=require(`./controller/monogDbController/userController`)
const mongoBooksController=require(`./controller/monogDbController/booksController`)

const middleware=require('./middleware/auth')
const  mongoMiddleware=require(`./middleware/mongoAuth/auth`)
// const PORT=process.env.PORT
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())




// --------------------SQL Endpoints-----------------------------







// app.post(`/register`,(req,res)=>{
//     userController.userRegister(req,res)
// })
// app.post(`/signin`,(req,res)=>{
//     userController.signin(req,res)
// })

// app.post('/addbook',middleware.userAuth,(req,res)=>{
//     booksController.addBook(req,res)
// })
// app.get('/getbooks',middleware.userAuth,(req,res)=>{ 
//     booksController.getAllBooks(req,res)
// })
// app.put('/updatebook',middleware.userAuth,(req,res)=>{ 
//     booksController.updateBook(req,res)
// })
// app.get('/getBookById',middleware.userAuth,(req,res)=>{
//     booksController.getbook(req,res)
// })
// app.get('/searchbook',middleware.userAuth,(req,res)=>{
//     booksController.searchbookByAuthorName(req,res)
// })






// ------------------------MongoDb Endpoints-----------------

app.post(`/register`,(req,res)=>{
    mongoUserController.userRegister(req,res)
})
app.post(`/signin`,(req,res)=>{
    mongoUserController.signin(req,res)
})

app.post('/addbook',mongoMiddleware.userAuth,(req,res)=>{
    mongoBooksController.addBook(req,res)
})
app.get('/getbooks',mongoMiddleware.userAuth,(req,res)=>{ 
    mongoBooksController.getAllBooks(req,res)
})
app.put('/updatebook',mongoMiddleware.userAuth,(req,res)=>{ 
    mongoBooksController.updateBook(req,res)
})
app.get('/getBookById',mongoMiddleware.userAuth,(req,res)=>{
    mongoBooksController.getbook(req,res)
})
app.get('/searchbook',mongoMiddleware.userAuth,(req,res)=>{
    mongoBooksController.searchbookByAuthorName(req,res)
})





app.get(`/test`,(req,res)=>{
    res.status(200).send(`hello bro`)
})



app.listen(PORT, (() => {
    console.log(`port ` + PORT)
})) 