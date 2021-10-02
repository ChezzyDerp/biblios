import { useState } from 'react';
import './App.css';
import axios from 'axios'
import { Switch, Route, NavLink } from 'react-router-dom'
import  Header from './components/Header/Header';
import FileSaver from 'file-saver'
import Nav from './components/Nav/Nav';
import Main from './components/Main/Main';
import BookPage from './components/BookPage/BookPage';




function getBooksSection(setBooksSections){
  axios.get('/books/sections').then((resp) =>{  
    resp.data.forEach((obj) =>{
      setBooksSections(booksSections => [...booksSections, {name: obj.sectionName, books: [obj.books]}])
    })
  })
}

function App() {

  const [booksSections, setBooksSections] = useState([])
  const [booksMainPage, setBooksMainPage] = useState([])
  const [booksInSection, setBooksInSection] = useState([])

  useState(() =>{
    getBooksSection(setBooksSections)
    
    axios.get('/books/get_all').then((resp) =>{
      setBooksMainPage(resp.data)
    }) 

  },[])

  return (
    <div className='App'>
        

        <div className="Header">
            <Header className='Header'/> 
        </div>
        <div className="Nav">
            <Nav className='Nav' booksSections={booksSections}/> 
        </div>
        <div className="Main">
            <Route exact  path='/' render={() => <Main className="Main" books={booksMainPage}/>}/>
            {booksSections.map((section) =>{
              return (section.books.map(bookI =>{
                return (bookI.map((book) =>{
                  return <Route path={`/${section.name}/${book}`} render={() =>{
                    return (
                      <BookPage  title={book}/>
                    )
                  }}/>
                }))
              }))
            })}
          {booksSections.map((section) =>{
            
                return (
                    <Route exact path={`/${section.name}`} render={() =>{
                      return <Main books={booksMainPage.filter(book => book.section == section.name)}/>
                  }}/>
                )
              })
            }

            
        </div>
       
        
        
      
      
    </div>
  );
}

export default App;
