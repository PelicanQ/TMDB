import { useRef, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import searchIcon from '../images/magglass.png'
import './SearchBar.css'

const SearchBar = () => {
	const [query, setQuery] = useState('')
	let history = useHistory()
	const handleKeyDown = (e) => {
		if (e.key !== 'Enter')
			return
		if (e.target.value == '')
			return history.push('/');
		

		history.push({
			pathname: '/search',
			search: `?q=${e.target.value}`,
			state: {
				query: e.target.value
            }
		})
	}

	return <div className='SearchBar'>
		<input onChange={e => setQuery(e.target.value)} onKeyDown={handleKeyDown} type='text' />
		<Link className='searchIcon' to={{ pathname: '/search', search: `?q=${query}` }}><img  src={searchIcon} /></Link>
	</div>
}

export default SearchBar