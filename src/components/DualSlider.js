import { useState, useEffect } from 'react'
import './DualSlider.scss'

const DualSlide = ({ onChange, minMax = [0, 100], step = 1 }) => {
    const [min, setMin] = useState(minMax[0])
    const [max, setMax] = useState(minMax[1])

    useEffect(() => {
        onChange([min, max])
    }, [min, max])

    const updateMin = (e) => { //Prevent min from going greater than max
        const newVal = parseFloat(e.target.value) > max ? max : parseFloat(e.target.value)
        setMin(newVal)
    }
    const updateMax = (e) => { //Prevent max from going less than min
        const newVal = parseFloat(e.target.value) < min ? min : parseFloat(e.target.value)
        setMax(newVal)
    }

    return <div className='DualSlider'>
        <p>
            <span>Min {min}</span>
            <input value={min} onChange={updateMin} type='range' min={minMax[0]} max={minMax[1]} step={step} />
        </p>
        <p>
            <span>Max {max}</span>
            <input value={max} onChange={updateMax} type='range' min={minMax[0]} max={minMax[1]} step={step} />
        </p>
    </div>
}

export default DualSlide