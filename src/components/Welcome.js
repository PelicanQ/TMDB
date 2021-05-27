import { useState, useEffect } from 'react'
import * as util from '../util'
import Collapsable from './Collapsable'
import './Welcome.scss'

const Welcome = ({ CONFIG, props }) => {
	const [topVoted, setTopVoted] = useState([])
	const [newest, setNewest] = useState([])
	const [trending, setTredning] = useState([])

	useEffect(() => {
		const init = async () => { //Fetch a variety of movies
			const todayStr = CONFIG.current.today
			const topMovies = await util.fetchDiscover('vote_average.desc')
			const newMovies = await util.fetchDiscover('primary_release_date.desc', { maxDate: todayStr })
			const trending = await util.fetchTrending()	
			setTopVoted(topMovies.results)
			setNewest(newMovies.results)
			setTredning(trending.results)
		}
		init()
	}, [])

	return <div className='Welcome'>

		<Collapsable title='Trending' CONFIG={CONFIG} movies={trending} />

		<Collapsable title='Top Voted' CONFIG={CONFIG} movies={topVoted} />

		<Collapsable title='Newest' CONFIG={CONFIG} movies={newest} />
	</div>

}

export default Welcome