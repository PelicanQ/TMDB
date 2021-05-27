import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import * as util from '../util'
import MoviesList from './MoviesList'
import Filter from './Filter'
import NavBar from './NavBar'
import './Discover.scss'

const Discover = ({ CONFIG }) => {
	const [data, setData] = useState({ results: [] })
	const [filter, setFilter] = useState({ selectedGenres: new Set() })
	let history = useHistory()

	useEffect(() => {
		const init = async () => {
			const params = new URLSearchParams(history.location.search)
			const fetchedData = await util.fetchDiscover('popularity.desc', { ...filter, page: params.get('page') })
			setData(fetchedData)
		}
		init() //If filter or location (eg '?page=2') changes, fetch again
	}, [history.location, filter])

	const navPage = (num, absolute) => {
		const newPage = (data.page * !absolute) + num
		if (newPage < 1 || newPage > data.total_pages) return;

		const params = new URLSearchParams(history.location.search)
		params.set('page', newPage)
		history.push(history.location.pathname + '?' + params.toString())
	}

	return <div className='Discover'>

		<p className='listTitle'>Discover</p>
		<Filter onFilterChange={setFilter} CONFIG={CONFIG} showThese={['rating', 'release', 'adult', 'genres']}/>

		<MoviesList movies={data.results} CONFIG={CONFIG} />

		<NavBar page={data.page} maxPages={data.total_pages} navPage={navPage} />
		
	</div>
}

export default Discover
