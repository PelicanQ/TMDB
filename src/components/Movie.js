import { Link } from 'react-router-dom'
import missingImg from '../images/roll.png'
import './Movie.scss'

const Movie = ({ movie, CONFIG }) => {
    const imageConfig = CONFIG.current.images
    const apiGenres = CONFIG.current.genres

    const imagePath = movie.poster_path ? `${imageConfig.base_url}${imageConfig.poster_sizes[2]}${movie.poster_path}` : missingImg
    
    return <div className='Movie'>
        <img alt='None' src={imagePath} className={movie.poster_path ? undefined : 'missingPoster'} />
        <Link to={{ pathname: '/movie', search: `id=${movie.id}` }}>
            <div className='overlay'>
                <h2 className='movieTitle'>
                    {movie.original_title} <span>{movie.release_date && movie.release_date.substring(0, 4)}</span>
                </h2>
                {movie.vote_average > 0 && <p style={{ textAlign: 'center' }}> Rating: {movie.vote_average} </p>}
                <p className='movieGenres'> {
                    movie.genre_ids.slice(0, 2).map(genreID => (
                        <span className='genreItem' key={genreID}>{apiGenres[genreID]}</span>))
                } </p>
            </div>
        </Link>
    </div>
}

export default Movie