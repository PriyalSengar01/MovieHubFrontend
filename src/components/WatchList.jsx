import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import Card from './Card';
import { useNavigate } from 'react-router-dom';

const WatchList = () => {
  const [authuser] = useAuth();
  const [list, setList] = useState([]);
  const [movies, setMovies] = useState([]);
  const navigate=useNavigate();
  const[msg,setmsg]=useState("fetchinng watchlist")
  const[state,setstate]=useState(true);

  const fetchMovieDetails = async (imdbID) => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?i=${imdbID}&apikey=${import.meta.env.VITE_API_KEY_OMDB}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      return null;
    }
  };

  useEffect(() => {
    if (!authuser?._id) {
      navigate('/login');
      return;
    }
    const fetchWatchlist = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}${authuser._id}`);
        const watchlist = response.data;
        setList(watchlist);

        const movieDetails = await Promise.all(watchlist.map(item => fetchMovieDetails(item)));
        setMovies(()=>movieDetails);
        if(movies.length==0){
          setmsg("watchlist is empty");
        }
        console.log(movies);
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };

    if (authuser?._id) {

      fetchWatchlist();
    }
  }, [authuser,state]);

  return (
    
    <div>
      <navbar className="navbar">
    <div>MovieHub &#127909;</div>
    
    <div>WatchList</div>
    <div><Link to="/" className='normal'>Home</Link></div>
   
   
  
   
   
   </navbar>
   <div style={{display:"flex",flexWrap:"wrap", justifyContent:"centre",margin:0+" auto", backgroundColor: "rgb(42, 38, 38)",minHeight:700+"px"}}>{movies.length<=0?<Loading msg={msg}/>:movies.map((item)=>{ return <Card img={item.Poster} title={item.Title} year={item.Year} id={item.imdbID} add={true} set={setstate} curr={state}/>

})}</div>
</div>
  );
};

export default WatchList;
