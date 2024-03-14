import express, { response } from "express";
import { PORT,mongoDBURL } from "./config.js"; 
import { mongoose } from "mongoose";
import { Book } from "./models/bookModels.js";
import cors from 'cors';
const app = express()
import booksRoute from './routes/booksRoute.js'
// middleware for parsing req body

app.use(express.json());

// middleware for handling cors policy
// option 1 : allow all origin 
app.use(cors())

// allow custom origin 
// app.use(cors({
//     origin:'http://localhost:5555/',
//     methods:['GET','PUT','POST','DELETE'],
//     allowedHeaders:['Content-Type'],
// }))

app.get('/',(request,response)=>{
    console.log(request)
    return response.status(234).send('hello its me full stack app')
})
app.use('/books',booksRoute);

mongoose.connect(mongoDBURL)
.then(()=>{
console.log('app connected to database')
app.listen(PORT,()=>{
    console.log(`app is listening on ${PORT}`)
})
}).catch((error)=>{
    console.log(error);
});