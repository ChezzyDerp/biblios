import { useState } from 'react';
import './App.css';
import axios from 'axios'
import { Switch, Route, NavLink } from 'react-router-dom'
import  Header from './components/Header/Header';
import FileSaver from 'file-saver'

function getBooks(section){
  axios.get('/')
}

function App() {

  let [booksSections, setBooksSections] = useState([])

  const [booksMainPage, setBooksMainPage] = useState(null)


  useState(() =>{
    // Get books sections
    axios.get('/books/sections').then((resp) =>{
        
      console.log(resp.data)
      setBooksSections(resp.data)
    })
    
    
  },[])

  return (
    <div className="App">
     
        <Header/>
        
       
        <Switch>
          <Route exact path='/' render={() => {
            return  booksSections.map((section) =>{
              return <p><NavLink exact to={section.sectionName}>{section.sectionName}</NavLink></p>
            })
          }}/>
          
          {booksSections.map((section) =>{
            return <Route path={`/${section.sectionName}`} render={() =>{
              return (
                <div>
                  <p>{section.sectionName}</p>
                  {section.books[0].map((book) =>{
                    return(
                      <div>
                          <p>{book.replace('.pdf', '')}</p>
                          <button onClick={() =>{
                            axios.post('/download/book',{section: section.sectionName, book: book}, {responseType: 'blob'}).then((response) =>{
                              const pdfBlob = new Blob([response.data], { type: "application/pdf" })
                              FileSaver(pdfBlob, book)
                             
                            })
                          }}>Скачать книгу</button>
                      </div>
                      
                    )
                  })}
                  
                </div>
                
              )
            }}/>
          })}
        </Switch>
        
        
      
      
    </div>
  );
}

export default App;
