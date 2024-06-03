import React, { useState } from 'react'
import "./card.css"
import { useAuth } from '../context/AuthProvider'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const Card = ({img,title,year,id,add,set,curr}) => {
  const navigate=useNavigate();

  const [authuser,setauth]=useAuth();
  const[state,setstate]=useState(true);
  const removeWatchlist = async (movieId,set,state) => {
    console.log(authuser);
    await axios.post(import.meta.env.VITE_API+'remove', { userId: authuser._id, movieId: movieId })
       .then(response => {
         console.log(response.data);
         //setchange(prevChange => !prevChange); 
         setauth(authuser);

         
         toast.success("Movie removed from WatchList", { duration: 1000 })
          //navigate('/login')
          //navigate('/watchList');
          set(!curr);

          
         // setTimeout(() => {
         //    window.location.reload();
         // }, 1000);
       })
       .catch(error => {
         console.error('Error removing movie from watchlist:', error);
       });
   }
  const addToWatchlist = async (movieId) => {
  
    try {
        console.log(authuser._id);
        console.log(movieId);
        console.log(authuser);
        console.log(import.meta.env.VITE_API+'add');
        const response = await axios.post(import.meta.env.VITE_API+'add', {
            userId: authuser._id, 
            movieId: movieId
        });
        //console.log(response);

        toast.success('Movie Added to WatchList!');
        console.log('movie added')
       // setIsAdded(true);
        console.log(response.data); 
    } catch (error) {
        // toast.error('Movie  Already Added to WatchList!');
        // console.error('Error adding movie to watchlist:', error);
        console.log(error);

    }
}
  return (
    <div  className="card"style={{width:200+"px", padding:30+"px"} } >
    <img src={img} alt="Avatar" style={{width:100+"%"}}/>
    <div class="container">
      <h4 style={{textAlign:"center"}}><b>{title}</b></h4> 
     <br></br>
      <p style={{textAlign:"center"}}>{year}</p> 
      <br></br>
      {authuser && !add && <button style={{}} className='normal' onClick={()=>addToWatchlist(id)}>Add to WatchList</button>}
      {add&& <button style={{backgroundColor:"#098E99",textAlign:"center"}} className='normal' onClick={()=>removeWatchlist(id,set,curr)}>Remove</button> }
      
    </div>
  </div>
  )
}

export default Card;