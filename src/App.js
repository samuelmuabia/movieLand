import {useEffect , useState} from "react";
import './App.css'; 
import searchIcon from './search.svg';
import MovieCard from "./MovieCard.tsx";
const API_URL = 'https://www.omdbapi.com/?apikey=c032e2d7';
const movie = {
    "Title": "Batman",
    "Year": "1989",
    "imdbID": "tt0096895",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMTYwNjAyODIyMF5BMl5BanBnXkFtZTYwNDMwMDk2._V1_SX300.jpg"
}
const App = () =>{
    const [movies , setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const searchMovies = async(title) =>{
        const response = await fetch(`${API_URL}&s=${title}`);
        const data  = await response.json();
        // console.log(data.Search);
        setMovies(data.Search);
    }
    useEffect(()=>{
     searchMovies('Batman');
    },[]);

    return(
        <div className="app">
            <h1>MovieLand</h1>
            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src={searchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
  
            {
                  
                    movies?.length >0 
                    ? (
                        <div className = "container">
                        {movies.map( (movie) => (
                            <MovieCard key={movie.imdbID} movie={movie}/>

                        ))}
                        </div> 
                       )
                    :
                    
                    (
                        <div className="empty">
                            <h2>No movies found</h2>
                        </div>
                    )
                     
            }

               
            </div>
    );
}

export default App;