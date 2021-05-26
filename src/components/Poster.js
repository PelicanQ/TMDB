import { useState } from 'react'
import crossImg from '../images/cross.png'
import missingBackdrop from '../images/rollBackdrop.png'
import playImg from '../images/play.png'
import './Poster.scss'   

const Poster = ({ details, CONFIG }) => {
    const [showTrailer, setTrailer] = useState(false)
    const imageConf = CONFIG.current.images
    const backdropPath = details.backdrop_path ? `${imageConf.base_url}/${imageConf.backdrop_sizes[2]}/${details.backdrop_path}` : missingBackdrop
    const hasVideo = details.videos.results.length > 0
    
    return <>
        {hasVideo && showTrailer &&  <img id='closeTrailer' width='50' height='50' src={crossImg} alt='cross' onClick={() => setTrailer(prev => !prev)} />}

        <div className='Poster'>
            {hasVideo && showTrailer && <iframe
            className='trailerFrame'
            frameBorder='0'
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title='Trailer'
            src={`https://www.youtube.com/embed/${details.videos.results.find(vid => vid.site.toLowerCase() === 'youtube').key
        }`}></iframe>}

        <img className='posterImg' src={backdropPath} />

        {(!showTrailer || !hasVideo)  && <div className='overlay' onClick={() => setTrailer(true)}>
            {hasVideo && <img src={playImg} className='playIcon' />}
            <div className='overlayText'>
                <h1>{`${details.title} ${details.release_date.substring(0, 4)}`}</h1>
                    <p><i>{details.tagline}</i></p>
                    
            </div>
        </div>}
        
    </div>
    </>

}

export default Poster