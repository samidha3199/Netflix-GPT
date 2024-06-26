import Header from './Header'
import useNowPlayingMovies from "../hooks/useNowPlayingMovies"
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'
import usePopularMovies from '../hooks/usePopularMovies'
import useUpcomingMovies from "../hooks/useUpcomingMovie"
import useTopRatedMovies from "../hooks/useTopRatedMovie"

const Browse = () => {
    useNowPlayingMovies()
    usePopularMovies()
    useUpcomingMovies()
    useTopRatedMovies() 


    return (
        <div>
            <Header/>
            <MainContainer/>
            <SecondaryContainer/>
        </div>
    );
}

export default Browse;
