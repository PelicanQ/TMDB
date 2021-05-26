import { useState } from 'react'
import './ReviewForm.scss'

const ReviewForm = ({ onSubmit }) => {
    const [rating, setRating] = useState(null)
    const [untouched, setUntouced] = useState(true)
    const [message, setMessage] = useState('')
    const submit = async (e) => {
        e.preventDefault()
        const success = await onSubmit(parseFloat(rating))
        console.log(success)
        if (success) {
            setUntouced(true)
            setRating(null)
            setMessage('Successfully submitted!')
            setTimeout(() => {
                setMessage('')
            }, 3000)
        }
        else {
            setMessage('Submission failed')
            setTimeout(() => {
                setMessage('')
            }, 3000)
        }
    }
    const onRatingChange = (e) => {
        setUntouced(false)
        setRating(e.target.value)
    }
    return <form className='ReviewForm' onSubmit={submit}>
        <p>
            <input value={rating} onChange={onRatingChange} type='range' min='0.5' max='10' step='0.5' />
            Score: {untouched ? '-' : rating}/10
        </p>
        <input type='submit' disabled={untouched} /> <span style={{fontSize: '0.8em'}}>{message}</span>
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