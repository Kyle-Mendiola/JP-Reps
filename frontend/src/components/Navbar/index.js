import { Link } from 'react-router-dom'
import "./navbar.css"

const Navbar = () => {
    return (
        <nav>
            <Link to="/">
                <h1 className='project-title'> JP-Reps </h1>
            </Link>
            <Link to="/"> Home </Link>
            <Link to="/word-list"> Word List </Link>
            <Link to="/kanji"> Kanji </Link>
        </nav>
    )
}
 
export default Navbar