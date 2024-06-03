import { useState } from 'react'

import "./index.css"
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import Movie from './components/Movie'
import Login from './components/Login'
import SignUp from './components/Signup'
import { Toaster } from 'react-hot-toast'
import WatchList from './components/WatchList'



//import './App.css'

function App() {
 

  return (
    <BrowserRouter className="app">
    <Routes>
        <Route path='/' element={<Movie />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/watchList' element={<WatchList/>} />

      
    </Routes>
    <Toaster/>
   
</BrowserRouter>
  )
}

export default App
