import { useEffect, useState } from "react"
import * as util from '../util'
import Movie from './Movie'
import './UserReviews.scss'


const UserReviews = ({CONFIG}) => {
    const [reviews, setReviews] = useState([])
    useEffect(() => {
        const getReviews = async () => {
            const fetchedReviews = await util.fetchReviews()
            console.log(fetchedReviews)
            setReviews(fetchedReviews.results)
        }

        getReviews()
    }, [])
    return <div className='UserReviews'>
        <h2 className='underLine'>Movies you have rated</h2>
        <div className='reviewsList'>
            {reviews.map(reviewdMovie => <div className='userReview' key={reviewdMovie.id}>
                
                <Movie movie={reviewdMovie} CONFIG={CONFIG} />
                <h3>Your rating: <big>{reviewdMovie.rating}</big></h3>
            </div>)}
            
        </div>
    </div>
}

export default UserReviews