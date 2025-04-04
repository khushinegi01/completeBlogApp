import React , {useState} from 'react'
import authServices from '../appwrite/auth'
import {useDispatch} from 'react-redux'
import {login as authLogin} from '../store/authSlice'
import {Link , useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import {Input , Button ,Logo} from './index'



function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error ,setError] = useState("")
    const {register , handleSubmit} = useForm()
    const login = async (data)=>{
        setError("")
        try {
            const session = await authServices.login(data)
            if(session){
                const userData = await authServices.getCurrentUser()
                if(userData)
                    dispatch(authLogin({userData}))
                    navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className='flex items-center justify-center w-full'>
            <div className={`mx-auto w-full max-w-lg bg-slate-800 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%"/>
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Log into your account</h2>
                <p className="mt-2 text-center text-base text-gray-300">
                    Don't have an account ? 
                    <Link to='/signup' className="font-medium text-primary transition-all duration-200 hover:underline"> SignUp </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(login)} className='mt-8'>
                    <div className='space-y-5'>
                        <Input 
                            label= 'Email'
                            placeholder = 'Enter email'
                            type = 'email'
                            {...register("email",{
                                required : true,
                                validate : {
                                    matchPattern : value => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid email"
                                }
                            })} 
                        />
                        <Input
                            label = "Password"
                            placeholder = "Enter password"
                            type = 'password'
                            {...register("password",{
                                required : true
                            })}
                        />
                        <Button type='submit' className="w-full hover:bg-blue-800 duration-200">
                            Login
                        </Button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login
