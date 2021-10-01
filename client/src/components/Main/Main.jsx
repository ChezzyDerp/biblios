import style from './Main.module.css'
import notFound from '../../img/img_not_found.png'
import axios from 'axios'
import { NavLink } from 'react-router-dom'



const Main = (props) =>{





    return (
        <div className={style.Main}>
            
            <div className={style.wrap}>


            
            {props.books.map((book) =>{
                return (
                    <NavLink exact to={`${book.section}/${book.book_name}`}>
                    <div className={style.book}>

                       <img className={style.preview} src={book.img || notFound} alt="" />                    
                       <div className={style.type}>
                            {book.section}
                        </div>
                        <div className={style.title}>
                            {book.book_name}
                        </div>

                        
                    </div>
                    </NavLink>
                )
            })}
            </div>


        </div>
    )
}

export default Main