import {useEffect, useRef, useState, useCallback} from 'react'
import './Filter.scss'
import DualSlider from './DualSlider'
import { debounce } from 'lodash'

const Filter = ({ onFilterChange, showThese, CONFIG }) => {
    const [voteRange, setVoteRange] = useState([])
    const [yearRange, setYearRange] = useState([])
    const [showAdult, setShowAdult] = useState(false)
    const [selectedGenres, setSelectedGenres] = useState(new Set())
    const allGenres = CONFIG.current.genres

    //Sliders onchange cause many api calls, debounce the updating of filter to parent
    const debouncedFunctionRef = useRef()   
    debouncedFunctionRef.current = (newFilter) => onFilterChange(newFilter);

    const debouncedChange = useCallback(debounce(     //Here Lodash creates the debounced 'onchange' function
        (...args) => debouncedFunctionRef.current(...args),
        200,
    ), []);

    useEffect(() => {
        //Use effect will be called frequently, but onFilterChange will be debounced
        debouncedChange({
            minVote: voteRange[0],
            maxVote: voteRange[1],
            minYear: yearRange[0],
            maxYear: yearRange[1],
            showAdult,
            selectedGenres
        })
    }, [voteRange, yearRange, showAdult, selectedGenres])

    const toggleGenre = (id) => {   //Toggle whether a genre should be included
        setSelectedGenres(prev => {
            const newSelected = new Set(prev) //Not sure if editing prev is good practice
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
        <DualSlider minMax={[1850, CONFIG.current.today.substring(0, 4)]}
                onChange={setYearRange} />
        </>}

        {showThese.includes('adult') && <><h3>Adult Movies</h3>
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