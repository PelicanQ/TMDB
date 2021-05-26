import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
import './Header.scss'

const Header = (props) => {
    return <div className='Header'>
        <Link to='/'><h1>Movies</h1></Link>
        <ul className='navBar'>
            

            <Link to='/discover'><li>Discover</li></Link>
            <Link to='/userReviews'><li>Your Reviews</li></Link>
        </ul>
        <SearchBar />
    </div>
}

export default Header