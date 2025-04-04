import React from 'react'
import authServices from '../../appwrite/auth'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlice'
import { useNavigate } from 'react-router-dom'
function LogoutBtn() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logoutHandler =()=>{
        authServices.logout()
        .then(()=>{
            dispatch(logout());
            navigate('/login');
        })
        .catch(error=> console.log("LogoutBtn :: logoutHandler :: Error :: ", error))
        
    }
    return (
        <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold rounded inline-block px-6 py-2 duration-200 " onClick={logoutHandler}>
            Logout
        </button>
    )
}

export default LogoutBtn
