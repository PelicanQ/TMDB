import { useState, useEffect, useRef } from 'react'
import {Route, Switch} from 'react-router-dom'
import Welcome from './components/Welcome'
import SearchResults from './components/SearchResults'
import MovieDetails from './components/MovieDetails'
import Discover from './components/Discover'
import UserReviews from './components/UserReviews'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.scss'
import * as util from './util'

function App() {
    const [isLoaded, setLoaded] = useState(false)
    const CONFIG = useRef({ genres: {}, images: {} }) //Child components need API config for image paths

    useEffect(() => { //Some initial setup
        const asyncFunc = async () => {
            const config = await util.getConfig()
            CONFIG.current.images = config.images //Save the image config and genres in out CONFIG
            config.genres.forEach(genre => CONFIG.current.genres[genre.id] = genre.name)

            let date = new Date() 
            date = [date.getFullYear(), date.getMonth(), date.getDate()]
            date = date.map(elm => elm.toString())
            date[1] = date[1].padStart(2, '0')
            date[2] = date[2].padStart(2, '0')
            CONFIG.current.today = date.join('-') //Get today as string so children dont have to 

            setLoaded(true)
        }
        asyncFunc()
    }, [])

  return (
      <div className="App">
            <Header />

            {isLoaded &&
            <Switch>
                <Route path='/' exact={true} component={(props) =>
                  <Welcome location={props.location} props={props} CONFIG={CONFIG} /> 
                } />
                <Route path='/search' component={({location}) =>
                    <SearchResults CONFIG={CONFIG} location={location} />
                } />
                <Route path='/movie' component={(props) => 
                    <MovieDetails location={props.location} CONFIG={CONFIG} />
                } />
                <Route path='/discover' component={({ location }) =>
                    <Discover location={location} CONFIG={CONFIG} />} />
                <Route path='/userReviews' component={(routeProps) =>
                  <UserReviews CONFIG={CONFIG} />
                } />
                <Route component={() => <p>Page not found</p>
                } />
                
              </Switch>}
            <Footer />
    </div>
  );
}

export default App