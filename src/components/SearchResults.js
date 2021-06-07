import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import * as util from '../util'
import MoviesList from './MoviesList'
import Filter from './Filter'
import NavBar from './NavBar'
import './SearchResults.scss'


const SearchResults = ({ CONFIG }) => {
	const [data, setData] = useState({ results: [] })
	const [filter, setFilter] = useState({})
	let history = useHistory()
	
	useEffect(() => { //Will be called when search query changes in url
		const getSearch = async () => {
			const params = new URLSearchParams(history.location.search)
			if (!params.get('q')) return;

			const fetchedData = await util.fetchSearch(params.get('q'), params.get('page'))
			setData(fetchedData)
		}
		getSearch()
	}, [history.location])
	
	const navPage = (direction, absolute) => { //Called by next/prev page buttons
		const newPage = (data.page * !absolute) + direction
		if (newPage < 1 || newPage > data.total_pages) return;
		
		const params = new URLSearchParams(history.location.search)
		params.set('page', newPage)
		history.push(history.location.pathname + '?' + params.toString())
	}

	const params = new URLSearchParams(history.location.search)

	return <div className='SearchResults'>
		<p className='listTitle'><small>Showing results for:</small> {params.get('q')}</p>

		<Filter onFilterChange={setFilter} showThese={['rating']} CONFIG={CONFIG}/>
		<MoviesList
			CONFIG={CONFIG}
			movies={data.results.filter(movie =>
				movie.vote_average >= (filter.minVote || 0) && movie.vote_average <= (filter.maxVote || 10)
		)}/>

		<NavBar page={data.page} maxPages={data.total_pages} navPage={navPage} />
	</div> 
}

export default SearchResults
