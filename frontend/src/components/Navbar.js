import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <Link to="/">
                <h1 className='project-title'> JP-Reps </h1>
            </Link>
            <Link to="/"> Home </Link>
            <Link to="/"> Word List </Link>
            <Link to="/"> Kanji </Link>
        </nav>
    )
}
 
export default Navbar