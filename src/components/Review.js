import { useState } from 'react'
import './Review.scss'

const Review = ({ details }) => {
    const MAX_LEN = 400
    const exceeding = details.content.length > MAX_LEN
    let end = MAX_LEN
    if (exceeding)
        end = details.content.lastIndexOf(' ', MAX_LEN)
    if (end === -1) {
        end = MAX_LEN
    }

    const [collapsed, setCollapsed] = useState(exceeding)

    return <div className='Review'>
        <h3 className='spreadHoriz'>
            {details.author}
            <span>{details.created_at.substring(0, details.created_at.indexOf('T'))}</span>
        </h3>
        <p>{
            collapsed ? details.content.substring(0, end) : details.content
        }</p>
        {exceeding && <span style={{ cursor: 'pointer' }} onClick={() => setCollapsed(prev => !prev)}>
            <i>{collapsed ? 'Show More' : 'Hide'}</i>
        </span>}
    </div>
}

export default Review