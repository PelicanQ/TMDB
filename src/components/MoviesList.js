import Movie from './Movie'
import './MoviesList.scss'

const MoviesList = ({ movies, CONFIG, className = '' }) => {
    console.log("In MoviesList className ", className)
    return <div className={`MoviesList ${className}`}> {
            movies.length === 0 ? <p>No results</p> : 
            movies.map(movie => 
                <Movie key={movie.id} CONFIG={CONFIG} movie={movie} /> 
            )}
    </div>


}

export default MoviesList