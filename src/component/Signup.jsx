import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import authServices from '../appwrite/auth';
import { login as authLogin } from '../store/authSlice';
import { Input, Button, Logo } from './index';

function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState();
    const { register, handleSubmit } = useForm();

    const createAcc = async (data) => {
        try {
            console.log("Creating account...");
            const account = await authServices.createAccount(data);
            console.log("Account created:", account);

            if (!account) throw new Error("Account creation failed.");

            console.log("Fetching current user...");
            const userData = await authServices.getCurrentUser();
            console.log("Current user data:", userData);

            if (!userData) throw new Error("Failed to fetch current user.");

            dispatch(authLogin({ userData }));
            console.log("Navigating to home...");
            navigate('/');
        } catch (error) {
            console.error("Error during signup:", error);
            setError(error.message || "An unexpected error occurred.");
        }
    };

    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-slate-800 rounded-xl p-10 border border-black/10`}>
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
                <p className="mt-2 text-center text-base text-gray-300">
                    <Link className="font-medium text-primary transition-all duration-200 hover:underline" to="/signup">
                        SignUp
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                <form onSubmit={handleSubmit(createAcc)}>
                    <div className="space-y-5">
                        <Input
                            label="Name"
                            placeholder="Enter Name"
                            type="text"
                            {...register('name', { required: true })}
                        />
                        <Input
                            label="Email"
                            placeholder="Enter email"
                            type="email"
                            {...register('email', {
                                required: true,
                                validate: {
                                    matchPattern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        'Email address must be a valid email',
                                },
                            })}
                        />
                        <Input
                            label="Password"
                            placeholder="Enter password"
                            type="password"
                            {...register('password', { required: true })}
                        />
                        <Button type="submit" className="w-full">
                            Create Account
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
