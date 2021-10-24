import {Route, NavLink} from 'react-router-dom'
import style from './Nav.module.css'
const Nav = (props) =>{
    return(
        <div className={style.Nav}>
            <div className={style.wrap}>
                <p>Книги</p>
                <div className={style.wrap2}>
                    {props.booksSections.map((section) =>{
                        return <NavLink className={style.navItem} activeClassName={style.active} to={"/" + section.name}>{section.name}</NavLink>
                    })
                    }
                </div>
                

            </div>
            
           
            
        </div>
    )
}
export default Nav