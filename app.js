const express = require('express');
const app = express();

app.use(express.json());

const books=[];

app.get('/books', (req, res) => {
    if(books.length==0){
        return res.status(404).json({mes:'Books list are empty'})
    }
   res.json(books);
});
let nid=1
app.post('/books', (req, res) => {
    const {title, author} = req.body;
   
    const book = {id: nid++, title, author};
    books.push(book);
    res.status(201).json(book);
});

app.put('/books/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    const {title,author}=req.body;
   const book= books.find(b=>b.id===id)
   if(!book){
    return res.status(404).json({mes:'Book not found'})
   }
   if(title)
    book.title=title;
   if(author)
    book.author=author
res.status(200).json(book)
    
    
})

app.delete('/books/:id',(req,res)=>{
     const id=parseInt(req.params.id);
     const index= books.findIndex(b=>b.id===id)
    
   
     
      if(index===-1){
         return res.status(404).json({mes:'Book not found'})
     }
        
     
    const book =books.splice(index,1)
  
    
     res.status(200).json(book[0])
})


app.listen(3000, () => {
    console.log('Server running on port 3000');
});