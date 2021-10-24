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

    const [data, setData] = useState({});

    const [modalDownload, setModalDownload] = useState(false)

    useEffect(() =>{
        axios.post('/book_get', {book: props.title}).then((resp) =>{ 
            setData(resp.data)        
        })
    },[])

    return (
        <div className={style.BookPage}>
            <div style={modalDownload ? {visibility:"visible"} : {visibility:"hidden"} } className={style.wrap_modal_download} onClick={() =>{
                setModalDownload(false)
            }}>
                <div style={modalDownload ? {visibility:"visible"} : {visibility:"hidden"} } className={style.modal_download} onClick={(e) =>{
                    e.stopPropagation()
                }}>

                    <p>Загрузка файла начата</p>

                    <div>
                        Спасибо за то, что используете наш сайт!
                    </div>

                    <button onClick={() =>setModalDownload(false)}>Закрыть это окно</button>

                </div>
            </div>
           

            <div className={style.book}>

                <img className={style.preview} src={data.img ? `../${data.img}` : notFound} alt="" />                    
                <div className={style.type}>
                    {data.section}
                </div>
                <div className={style.title}>
                    {props.title}
                </div>
   
            </div>

            <button onClick={() =>{
                downloadBook(data.section, data.book_name)
                setModalDownload(true)
            }}>Скачать</button>

        </div>
    )
}

export default BookPage