import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const navigate = useNavigate();



    const handleLogin = (e) => {

        e.preventDefault();

        axios.post(
            "http://localhost:5000/login",
            {
                Email,
                Password
            }
        )

        .then((res) => {

            alert("Login Successfully");

            navigate("/dashboard");

        })

        .catch((err) => {

            console.log(err);

            alert("Invalid Credentials");

        });
    };




    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-950 px-4">

            {/* LOGIN CARD */}
            <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8">

                {/* HEADER */}
                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold text-white mb-2">
                        Welcome Back
                    </h1>

                    <p className="text-gray-400">
                        Login to your account
                    </p>

                </div>



                {/* FORM */}
                <form
                    onSubmit={handleLogin}
                    className="space-y-6"
                >

                    {/* EMAIL */}
                    <div>

                        <label className="block text-gray-300 mb-2 font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email" required
                            value={Email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                bg-gray-900/70
                                border
                                border-gray-700
                                text-white
                                placeholder-gray-500
                                outline-none
                                transition-all
                                duration-300
                                focus:border-blue-500
                                focus:ring-4
                                focus:ring-blue-500/30
                                focus:scale-[1.02]
                            "
                        />

                    </div>



                    {/* PASSWORD */}
                    <div>

                        <label className="block text-gray-300 mb-2 font-medium">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"  required
                            value={Password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            className="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                bg-gray-900/70
                                border
                                border-gray-700
                                text-white
                                placeholder-gray-500
                                outline-none
                                transition-all
                                duration-300
                                focus:border-purple-500
                                focus:ring-4
                                focus:ring-purple-500/30
                                focus:scale-[1.02]
                            "
                        />

                    </div>



                    {/* LOGIN BUTTON */}
                    <button
                        type="submit"
                        className="
                            w-full
                            py-3
                            rounded-xl
                            bg-gradient-to-r
                            from-blue-600
                            to-purple-600
                            text-white
                            font-semibold
                            text-lg
                            shadow-lg
                            hover:from-blue-700
                            hover:to-purple-700
                            hover:scale-[1.02]
                            active:scale-[0.98]
                            transition-all
                            duration-300
                        "
                    >

                        Login

                    </button>

                </form>



                {/* REGISTER LINK */}
                <p className="text-center text-gray-400 mt-6">

                    Don't have an account?

                    <span
                        onClick={() => navigate("/register")}
                        className="
                            text-blue-400
                            ml-2
                            cursor-pointer
                            hover:text-blue-300
                            transition
                        "
                    >

                        Register

                    </span>

                </p>

            </div>

        </div>
    );
}