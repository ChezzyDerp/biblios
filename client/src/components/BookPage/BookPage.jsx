import style from './BookPage.module.css'
import notFound from '../../img/img_not_found.png'
import { useEffect, useState } from 'react'
import axios  from 'axios'
import FileSaver from 'file-saver'
function downloadBook(section, book){
    axios.post('/download/book',{section: section, book: book}, {responseType: 'blob'}).then((response) =>{
      const pdfBlob = new Blob([response.data], { type: "application/pdf" })
      FileSaver(pdfBlob, book + '.pdf')
    })
  }


const BookPage = (props) =>{

    let [data, setData] = useState({});

    useEffect(() =>{
        axios.post('/book_get', {book: props.title}).then((resp) =>{ 
            setData(resp.data)
            console.log(resp.data)
        
        })
    },[])

    return (
        <div className={style.BookPage}>

            <div className={style.book}>
                {console.log(data.img)}
                <img className={style.preview} src={`../${data.img}`|| notFound} alt="" />                    
                <div className={style.type}>
                    {data.section}
                </div>
                <div className={style.title}>
                    {props.title}
                </div>

                        
            </div>

            <button onClick={() =>{
                downloadBook(data.section, data.book_name)
            }}>Скачать</button>

        </div>
    )
}

export default BookPage