const API_KEY = 'ace403c6373ec820507d65f6e359bf40'

const fetchSearch = async (query, page) => {
    const url = new URL("https://api.themoviedb.org/3/search/movie")
    url.searchParams.set('api_key', API_KEY)
    url.searchParams.set('query', query)
    page && url.searchParams.set('page', page)

    return fetch(url).then(res => res.json())
}
const fetchDiscover = async (sort, filter = {}) => {
    const url = new URL("https://api.themoviedb.org/3/discover/movie")
    url.searchParams.set('api_key', API_KEY)

    //Only set parameters that were specified by filter
    sort && url.searchParams.set('sort_by', sort)
    filter.page && url.searchParams.set('page', filter.page)
    filter.minVote && url.searchParams.set('vote_average.gte', filter.minVote)
    filter.maxVote && url.searchParams.set('vote_average.lte', filter.maxVote)
    filter.minYear && url.searchParams.set('primary_release_date.gte', `${filter.minYear}-01-01`)
    filter.maxYear && url.searchParams.set('primary_release_date.lte', `${filter.maxYear}-12-31`)
    filter.maxDate && url.searchParams.set('primary_release_date.lte', filter.maxDate)
    url.searchParams.set('include_adult', filter.showAdult ? true : false)

    if (filter.selectedGenres && filter.selectedGenres.size > 0) {
        let genresStr = `${Array.from(filter.selectedGenres).map(id => id.toString()).join(',')}`
        url.searchParams.set('with_genres', genresStr)
    }
    return fetch(url).then(res => res.json())
}
const fetchTrending = async () => {
    const url = new URL('https://api.themoviedb.org/3/trending/movie/week')
    url.searchParams.set('api_key', API_KEY)
    
    return fetch(url).then(res => res.json())
}
const getMovieDetails = async (id) => {
    //Gets details about one movie
    if (!id) return {}
    const url = new URL(`https://api.themoviedb.org/3/movie/${id}`)
    url.searchParams.set('api_key', API_KEY)
    url.searchParams.set('append_to_response', 'videos,credits,reviews')

    return fetch(url).then(res => res.json())
}
const fetchReviews = async () => {
    const session = await getGuestSession()
    const url = new URL(`https://api.themoviedb.org/3/guest_session/${session.guest_session_id}/rated/movies`)
    url.searchParams.set('api_key', API_KEY)

    return fetch(url).then(resp => resp.json())
}

const getConfig = async () => {
    //API configuration is about images
    const res = await fetch(`https://api.themoviedb.org/3/configuration?api_key=${API_KEY}`)
    const config = await res.json()

    //We also need a list of all genres
    const url = new URL("https://api.themoviedb.org/3/genre/movie/list")
    url.searchParams.set('api_key', API_KEY)
    const genresData = await fetch(url).then(res => res.json())
    const genres = genresData.genres
    return { images: config.images, genres }
}

const postReview = async (movieId, rating) => {
    const postRequest = async (session) => {
        const url = new URL(`https://api.themoviedb.org/3/movie/${movieId}/rating`)
        url.searchParams.set('api_key', API_KEY)
        url.searchParams.set('guest_session_id', session.guest_session_id)
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ value: rating })
        })
        return res.json()
    }

    let session = await getGuestSession()
    let data = await postRequest(session)
    if (data.status_code === 3) { //Code 3 means unauthorized. Retry with new session
        session = await getGuestSession(true)
        data = await postRequest(session)
    }
    //Returns false if couldn't post review
    return data.success
}

const getGuestSession = async (forceNew) => {
    //Check localStorace for already existing session. Otherwise make new one
    //API seems to only expire guest session if it's not used first time within 24h from creation
    const storedSession = localStorage.getItem('guestSession') && JSON.parse(localStorage.getItem('guestSession'))
    if (storedSession && !forceNew)
        return storedSession

    const res = await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${API_KEY}`)
    const sessionData = await res.json()
    if (!sessionData.success) throw new Error('Could not create guest session');
    localStorage.setItem('guestSession', JSON.stringify(sessionData))
    return sessionData
}

export { fetchSearch, fetchDiscover, fetchTrending, getMovieDetails, fetchReviews, getConfig, postReview}