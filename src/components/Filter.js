import {useEffect, useRef, useState} from 'react'
import './Filter.scss'
import DualSlider from './DualSlider'

const Filter = ({ onFilterChange, allGenres, showThese }) => {
    const [voteRange, setVoteRange] = useState([])
    const [yearRange, setYearRange] = useState([])
    const [showAdult, setShowAdult] = useState(false)
    const [selectedGenres, setSelectedGenres] = useState(new Set())

    useEffect(() => {
        onFilterChange({
            minVote: voteRange[0],
            maxVote: voteRange[1],
            minYear: yearRange[0],
            maxYear: yearRange[1],
            showAdult,
            selectedGenres
        })
    }, [voteRange, yearRange, showAdult, selectedGenres])

    const toggleGenre = (id) => {
        setSelectedGenres(prev => {
            const newSelected = new Set(prev)
            prev.has(id) ? newSelected.delete(id) : newSelected.add(id)
            return newSelected
        })
        
    }
    return <div className='Filter'>
        <h2>Filter</h2>

        {showThese.includes('rating') && <><h3>Rating</h3>
        <DualSlider minMax={[0, 10]} step={0.1}
                onChange={setVoteRange} />
        </>}
        
        {showThese.includes('release') && <><h3>Release Year</h3>
        <DualSlider minMax={[1850, (new Date()).getFullYear()]}
                onChange={setYearRange} />
        </>}

        {showThese.includes('adult') && <><h3>Adult movies</h3>
            <input type='checkbox' value={showAdult} onChange={() => setShowAdult(prev => !prev)} />
        </>}

        {allGenres && showThese.includes('genres') && <>
            <h3>Genres</h3>
            <div className='movieGenres'>{
                Object.entries(allGenres).map(([key, val]) =>
                    <span
                        key={key}
                        className={`genreItem ${selectedGenres.has(parseInt(key)) && 'selected'}`}
                        onClick={() => toggleGenre(parseInt(key))}>
                            {val}
                    </span>)
            }</div>
        </>}
        
        
    </div>
}

export default Filter