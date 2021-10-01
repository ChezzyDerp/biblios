
const path = require('path')
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');





const app = express();

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'public')));

const port = 5000;


let booksSections = [];

let allBooks = [];

fs.readdirSync('./books').forEach((section) =>{


    fs.readdirSync(`./books/${section}`).forEach(book =>{
        
        fs.access(`${__dirname}/public/${book}.jpg`, (error) =>{
            if (error){
                allBooks.push({book_name: book, img: '', section: section})
            }else{
                allBooks.push({book_name: book, img: `${book}.jpg`, section: section})
            }
        })
       
    })
    
})



fs.readdirSync('./books').forEach((section) =>{


    booksInSections = fs.readdirSync(`./books/${section}`)

    booksSections.push({sectionName : section, books : booksInSections})

    
})

app.get('/', (req, resp) =>{
    resp.send('nice')
})
app.get('/books/sections', (req,resp) =>{
    
    resp.send(booksSections)
    
})
app.post('/book_get', (req, resp) =>{
   resp.send(allBooks.find(e => e.book_name == req.body.book))
    
})

app.post('/download/book', (req, resp) =>{
  

    resp.download(`./books/${req.body.section}/${req.body.book}/${req.body.book}.pdf`)

        
})

app.get('/books/get_all', (req,resp) =>{
    resp.send(allBooks)
})

app.listen(port, () =>{
    console.log(`Server listening on ${port} port`)
})
