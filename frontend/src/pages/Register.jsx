import React from 'react'
import axios from 'axios'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {

    const [UserName, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");

    const navigate = useNavigate();



    const handleRegister = (e) => {

        e.preventDefault();

        axios.post(
            "http://localhost:5000/register",
            {
                UserName,
                Email,
                Password
            }
        )

        .then((res) => {

            alert("Registered Successfully");

            navigate("/login");

        })

        .catch((err) => {

            console.log(err);

        });
    };




    return (

        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black px-4">

            {/* CARD */}
            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-3xl p-8">

                {/* TITLE */}
                <div className="text-center mb-8">

                    <h1 className="text-4xl font-bold text-white mb-2">
                        Create Account
                    </h1>

                    <p className="text-gray-400">
                        Register to continue
                    </p>

                </div>



                {/* FORM */}
                <form
                    onSubmit={handleRegister}
                    className="space-y-6"
                >

                    {/* USERNAME */}
                    <div>

                        <label className="block text-gray-300 mb-2 font-medium">
                            Username
                        </label>

                        <input
                            type="text"
                            placeholder="Enter username"
                            value={UserName}
                            onChange={(e) =>
                                setUsername(e.target.value)
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



                    {/* EMAIL */}
                    <div>

                        <label className="block text-gray-300 mb-2 font-medium">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter email" required
                            value={Email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            className="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                bg-blue-900/70
                                border
                                border-gray-700
                                text-white
                                placeholder-green_500
                                outline-none
                                transition-all
                                duration-300
                                focus:border-purple-500
                                focus:ring-4
                                focus:ring-pink-500/30
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
                            placeholder="Enter password" required
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
                                focus:border-pink-500
                                focus:ring-4
                                focus:ring-pink-500/30
                                focus:scale-[1.02]
                            "
                        />

                    </div>



                    {/* BUTTON */}
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

                        Register

                    </button>

                </form>



                {/* LOGIN LINK */}
                <p className="text-center text-gray-400 mt-6">

                    Already have an account?

                    <span
                        onClick={() => navigate("/login")}
                        className="
                            text-blue-400
                            ml-2
                            cursor-pointer
                            hover:text-blue-300
                            transition
                        "
                    >

                        Login

                    </span>

                </p>

            </div>

        </div>
    );
}