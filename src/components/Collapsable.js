import { useState } from 'react'
import dropArrow from '../images/arrow.png'
import MoviesList from './MoviesList'

const Collapsable = ({ CONFIG, movies, title }) => {
	const [collapsed, setCollapsed] = useState(true)

	return <>
		<h2 className='listTitle clickable' onClick={() => setCollapsed(prev => !prev)}>
			{title}
			<img alt='' className={`dropDownArrow ${collapsed ? '' : 'rotated' }`} src={dropArrow} />
		</h2>
		<MoviesList className={collapsed ? 'collapsed' : ''} movies={movies} CONFIG={CONFIG} />
	</>
}

export default Collapsable