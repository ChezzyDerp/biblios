import { Link, NavLink } from 'react-router-dom'
import style from './Header.module.css'
import logo from '../../img/logo.svg'
import githubIcon from '../../img/github_icon.svg'

const Header = () =>{
    return(
        <div className={style.Header}>

            <Link className={style.Logo} to='/'>
                <img src={logo} alt="Biblios" />
                <div>
                    Biblios
                </div>
            </Link>

            <div className={style.navItems}>

                <NavLink className={style.navItem} activeClassName={style.active} exact to='/'>
                    Книги
                </NavLink>

                <NavLink className={style.navItem} activeClassName={style.active} to='/articles'>
                    Статьи
                </NavLink>

                <NavLink className={style.navItem} activeClassName={style.active} to='/videos'>
                    Видео
                </NavLink>
                
            </div>
           <div className={style.gitHub}>
                <a href="http://github.com" target="_blank">
                    <p>GitHub</p>
                </a>
                <img src={githubIcon} alt="github" />
               
           </div>
           


           
        </div>
    )
}

export default Header