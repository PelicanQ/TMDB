import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import * as util from '../util'
import Poster from './Poster'
import Review from './Review'
import ReviewForm from './ReviewForm'
import './MovieDetails.scss'
import missingProfilePic from '../images/missingProfile.png'
import dropArrow from '../images/arrow.png'

const MovieDetials = ({ location, CONFIG }) => {
    const [details, setDetails] = useState({})
    const [isLoaded, setLoaded] = useState(false)  //We'll only render after api call
    const [actorsCollapsed, setActorsCollapsed] = useState(true)
    const imgConf = CONFIG.current.images
    const profileBaseUrl = imgConf.base_url + imgConf.profile_sizes[1]
    let history = useHistory()
   
    useEffect(() => {//Fetch details on mount
        const init = async () => {
            const params = new URLSearchParams(location.search)
            const fetchedMovie = await util.getMovieDetails(params.get('id'))   

            if (!fetchedMovie) //If failed, Go back to root
                return history.replace('/')

            //Success, go ahed with render
            setDetails(fetchedMovie)
            setLoaded(true)
        }
        init()
    }, [])

    const onSubmit = async (rating) => { //Return boolean indicating success to ReviewForm
        return util.postReview(details.id, parseFloat(rating))
    }

    return <div className='MovieDetails'>{isLoaded && (<>
        <div className='posterContainer'>
            <Poster details={details} CONFIG={CONFIG} />
        </div>
        <div className='detailsText'>
            <h2 className='spreadHoriz underLine'>Description <span><small>Score</small> {details.vote_average}</span></h2>
                
            <p style={{marginBottom: '1em'}}>{details.overview || 'None Available'}</p>
                
            <span className=''>{details.genres.map(genre => <span className='genreItem' key={genre.name}>{genre.name}</span>)}</span>

            <h2 className='underLine clickable'
                onClick={() => setActorsCollapsed(prev => !prev)}>
                Actors <img className={`dropDownArrow ${actorsCollapsed ? '' : 'rotated'}`} src={dropArrow} />
            </h2>
            <ul className={`actorsList ${actorsCollapsed && 'collapsed'}`}>{
                details.credits.cast.length > 0 ? details.credits.cast.map(actor =>
                    <li className='actorItem' key={actor.id}>
                        <img className={`${!actor.profile_path && 'missingProfile'}`} src={actor.profile_path ? profileBaseUrl + actor.profile_path : missingProfilePic} alt='No pic' />
                        {actor.name}
                    </li>)
                    :
                    (<li>No Data</li>)
            }</ul>

            <h2 className='underLine'>Rate Movie</h2>
            <ReviewForm onSubmit={onSubmit} />
            
            <h2 className='underLine'>Reviews <span style={{fontSize: '0.7em'}}>({details.reviews.results.length})</span></h2>
            <div className='reviewsList'>
                {details.reviews.results.map(reviewData => <Review key={reviewData.id} details={reviewData} />  )}
            </div>
        </div>
        
    </>)}
    </div>
}

export default MovieDetials