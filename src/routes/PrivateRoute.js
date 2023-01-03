import React,{useEffect,useState} from 'react'
import {Navigate,useLocation} from "react-router-dom"
import {useDispatch} from "react-redux"
import {updateHeader} from "../redux/slices/appInfoSlice"
function PrivateRoute({children}) {
    const [loggedIn,setLoggedIn]=useState(true)
    const dispatch=useDispatch()
    const {state}=useLocation()
   console.log(state)
    useEffect(()=>{
   if(state?.headerTitle){
    console.log(state.headerTitle)
    dispatch(updateHeader(state?.headerTitle))
   }
    },[state])
  return (
    <>
    {loggedIn?children:<Navigate to="/" replace="true"/>}
    </>
    
  )
}

export default PrivateRoute