
const express = require('express');
const fs = require('fs')
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.json())

const port = 5000;


let booksSections = [];


fs.readdirSync('./books').forEach((section) =>{

    let booksInSections = [];

    booksInSections = fs.readdirSync(`./books/${section}`)

    booksSections.push({sectionName : section, books : [booksInSections]})

    
})

app.get('/', (req, resp) =>{
    resp.send('nice')
})
app.get('/books/sections', (req,resp) =>{
    resp.send(booksSections)
})
app.post('/download/book', (req, resp) =>{
  

    resp.download(`./books/${req.body.section}/${req.body.book}`)
        
})
app.get('/books/get', (req,resp) =>{
    
})

app.listen(port, () =>{
    console.log(`Server listening on ${port} port`)
})
