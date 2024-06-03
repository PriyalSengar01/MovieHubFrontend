import React from 'react'
import { useState,useEffect } from 'react'
import Card from './Card';
import "./movie.css"
import Loading from './Loading';
import "./card.css";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const Movie = () => {
const [authuser, setauth] = useAuth();
const[state,setstate]=useState(true);
const[search,setSearch]=useState("");
const[msg,setmsg]=useState("");
const handleLogout = () => {
  try {
    setauth(()=>null);
    localStorage.removeItem("Users");
    setstate(()=>!state)
    console.log(state);
    //toast.success("Logged Out Successfully");
   
  } catch (error) {
    
  }
}
useEffect(() => {
  // Optionally, you can add logic here that should run when the component mounts or updates
  console.log("hii");
  console.log(authuser);
}, [authuser]); // R
const[results,setResults]=useState([]);
const searchMovie=async ()=>{
    console.log(import.meta.env.VITE_API_KEY_OMDB);
    setmsg(()=>`Loading result for ${search}...`)
    if(search==""){
      setmsg(()=>`Enter a movie name`)
      return}
    let data=await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${import.meta.env.VITE_API_KEY_OMDB}&s=${search}`);
    data=await data.json();
    //console.log(object);
    if(data.Response=="False"){
      setResults(()=>[]);
      setmsg(()=>`movies not found for ${search}`)
      return;
    }
    setResults(()=>data.Search);
    console.log(results);

    console.log(data);
   
   
    setmsg(()=>"search result for movies")
  

}

  return (
   <><navbar className="navbar">
    <div>MovieHub &#127909;  </div>
    <div className='search'><input type="text" placeholder='Enter a movie name' value={search} onChange={(e)=>setSearch(e.target.value)} />
   <button className="btn"onClick={searchMovie}>search</button>
   
   
   </div>
   {authuser? <div className='register'><button style={{backgroundColor:"#098E99"}} className="button" onClick={handleLogout} >Logout</button>
   <Link   className="button"to="/watchList" >WatchList</Link>
   </div>:<div className='register'><Link className="button" to="/signup" >SignUp</Link>
   <Link   className="button"to="/login" >Login</Link>
   </div>}
   
   </navbar>

   
   <div style={{display:"flex",flexWrap:"wrap", justifyContent:"centre",margin:0+" auto", backgroundColor: "rgb(42, 38, 38)",minHeight:700+"px"}}>{results.length<=0?<Loading msg={msg}/>:results.map((item)=>{ return <Card img={item.Poster} title={item.Title} year={item.Year} id={item.imdbID}/>

  })}
  
  </div>
  
   </>

  

    
  )

  
  
}

export default Movie