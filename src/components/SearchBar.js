import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import searchIcon from '../images/magglass.png'
import './SearchBar.scss'

const SearchBar = () => {
	const [query, setQuery] = useState('')
	let history = useHistory() //I'll handle routing here. Makes component less generic though

	const handleKeyDown = (e) => {
		if (e.key !== 'Enter')
			return;
		if (query == '')
			return history.push('/'); //If enter was clicked with no search term, go to home
		
		history.push({
			pathname: '/search',
			search: `?q=${query}`
		})
	}

	return <div className='SearchBar'>
		<input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={handleKeyDown} type='text' placeholder='Search...' />
		<Link className='searchIcon' to={{ pathname: '/search', search: `?q=${query}` }}><img  src={searchIcon} /></Link>
	</div>
}

export default SearchBar