import SearchBar from './SearchBar'
import { NavLink } from 'react-router-dom'
import './Header.scss'

const Header = (props) => {

    //NavLinks because they have activeStyles
    return <div className='Header'>
        <NavLink to='/'><h1>Movies</h1></NavLink>
        <ul className='navBar'>
            <NavLink to='/discover' activeClassName='activeLink'><li>Discover</li></NavLink>
            <NavLink to='/userReviews' activeClassName='activeLink'><li>Your Reviews</li></NavLink>
        </ul>
        <SearchBar />
    </div>
}

export default Header