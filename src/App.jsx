import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import authServices from './appwrite/auth'
import {login ,logout} from './store/authSlice'
import {Header} from './component/index'
import {Footer} from './component/index'
import { Outlet } from 'react-router-dom'


function App() {
  
  const [loading , setLoading] = useState(true)
  const dispatch = useDispatch() 
  useEffect(()=>{
    authServices.getCurrentUser()
    .then(userData => {
      if(userData){
        dispatch(login({userData}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=>{
    setLoading(false)
    },[])
  })

  return !loading ? (
    <div className='min-h-screen bg-gray-900 flex flex-wrap content-between text-amber-50 '>
      <div className='w-full block m-2 align-top'>
        <Header/>
        <main>
          <Outlet/>
          <div className='min-h-screen bg-gray-900'></div>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null
  
}
export default App
