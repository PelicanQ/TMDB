import { useState } from 'react'
import './ReviewForm.scss'

const ReviewForm = ({ onSubmit }) => {
    const [rating, setRating] = useState('')
    const [untouched, setUntouced] = useState(true)  //Just to make submit button gray before user has touched it
    const [message, setMessage] = useState('')

    const submit = async (e) => {
        e.preventDefault()
        const success = await onSubmit(parseFloat(rating))
        if (success) {
            setUntouced(true)
            setRating('')
            setMessage('Successfully submitted!')
        }
        else {
            setMessage('Submission failed')
        }
        setTimeout(() => {
            setMessage('')
        }, 3000)
    }
    const onRatingChange = (e) => {
        setUntouced(false)
        setRating(e.target.value)
    }
    return <form className='ReviewForm' onSubmit={submit}>
        <p className='ratingSlider'>
            <input  value={rating} onChange={onRatingChange} type='range' min='0.5' max='10' step='0.5' />
            <span>{untouched ? '-' : rating.padEnd(3, ".0")}/10</span>
        </p>
        <input className='submitButton clickable' value='Submit' type='submit' disabled={untouched} /> <span style={{fontSize: '0.8em'}}>{message}</span>
    </form>

    /*const old = <input onChange={onChange}
            name='userName'
            className='userNameInput'
            type='text' />
        
        <h3>Review</h3>

        <textarea
            name='userReviewText'
            onChange={onChange}
            className='userReviewText'
            placeholder='Write your review here'></textarea>*/
}

export default ReviewForm