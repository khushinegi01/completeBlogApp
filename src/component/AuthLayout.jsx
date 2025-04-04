import React from 'react'
import {useState , useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export function Protector({
    children ,
    authenticator = true
}) {
    const authStatus = useSelector(state => state.auth.status)
    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)
    useEffect(()=>{
        if(authenticator && authStatus !== authenticator){
            navigate('/login')
        }
        else if(!authenticator && authStatus !== authenticator){
            navigate('/')
        }
        setLoader(false)
    },[authStatus,authenticator,navigate])
    return loader ? <h1>Loading...Please Wait !!!</h1> : <>{children}</>
}


