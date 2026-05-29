import React from 'react'

export default function Logout() {
    const navigate = useNavigate();
    const handleLogout = () => {
        // Clear any authentication tokens or user data from local storage
        localStorage.removeItem("authToken");
        navigate("/login");
    };
    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}