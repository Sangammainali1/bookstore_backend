import express from "express"
const router = express.Router();
import { Book } from "../models/bookModels.js";


// route for save a new book
router.post('/',async (request,response) =>{
    try {
       if(!request.body.title||
       !request.body.author||
       !request.body.publishYear
        ) {
            return response.status(400).send({message:'send all required field title, authoe,publishyear'})
        }
        const newBook = {
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book)
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message:error.message});
        
    }
})

// route for get all books from the database
router.get('/',async(request,response)=>{
    try {
        const books = await Book.find({})
        return response.status(200).send({
            count:books.length,
            data:books
        });
    } catch (error) {
        console.log(error);
        return response.status(500).send({message:error.message})
    }
})
// route for get one book from database by id

router.get('/:id',async(request,response)=>{
    try {

        const {id}= request.params;

        const book = await Book.findById(id);
        return response.status(200).json(book);
    } catch (error) {
        console.log(error);
        return response.status(500).send({message:error.message})
    }
})

// route for update a book in database
router.put('/:id',async(request,response)=>{
try {
    if(!request.body.title||
        !request.body.author||
        !request.body.publishYear
         ) {return response.status(400).send({message:'send all required field title, authoe,publishyear'})}

         const {id}= request.params;
         const result = await Book.findByIdAndUpdate(id,request.body);

         if(!result){
            return response.status(404).json({message:"books are not found"})
         }
         return response.status(200).json({message:"books updated successfully"})
} catch (error) {
    console.log(error.message);
    response.status(500).send({message:error.message})
}
})

// route for delete a book 

router.delete('/books/:id',async (request,response)=>{
    try {
        const {id}=request.params;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            return response.status(404).json({message:"books are not found"})
        }
        return response.status(200).json({message:"books deleted successfully"})
    } catch (error) {
        console.log(error.message)
        response.status(500).send({message:error.message})
        
    }
    
})

export default router;
