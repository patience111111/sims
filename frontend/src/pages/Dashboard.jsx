import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = React.useState({});

    React.useEffect(() => {

        axios.get("http://localhost:5000/dashboard")
            .then((res) => {
                setDashboard(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);

    return (

        <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-gray-900 p-6 md:p-10">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">

                <div>

                    <h1 className="text-5xl font-bold text-white">
                        Dashboard
                    </h1>

                    <p className="text-gray-400 mt-3 text-lg">
                        Admin  inventory analytics center
                    </p>

                </div>

                {/* STATUS */}
                <div className="mt-5 md:mt-0 px-6 py-3 rounded-2xl bg-green-500/10 border border-green-500/20 backdrop-blur-xl shadow-xl">

                    <p className="text-green-400 font-semibold">
                        System Active
                    </p>

                </div>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* PARTS */}
                <div className="relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:scale-[1.03] transition-all duration-300">

                    <div className="relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center text-3xl mb-6">
                            📦
                        </div>

                        <h2 className="text-gray-400 text-lg">Total Spare Parts</h2>

                        <p className="text-5xl font-bold mt-4 text-blue-400">
                            {dashboard.totalParts}
                        </p>
                    </div>

                </div>

                {/* STOCK */}
                <div className="relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:scale-[1.03] transition-all duration-300">

                    <div className="relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center text-3xl mb-6">
                            📈
                        </div>

                        <h2 className="text-gray-400 text-lg">Total Stock</h2>

                        <p className="text-5xl font-bold mt-4 text-green-400">
                            {dashboard.totalStock}
                        </p>
                    </div>

                </div>

                {/* VALUE */}
                <div className="relative overflow-hidden bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl hover:scale-[1.03] transition-all duration-300">

                    <div className="relative z-10">
                        <div className="w-16 h-16 rounded-2xl bg-pink-500/20 flex items-center justify-center text-3xl mb-6">
                            💰
                        </div>

                        <h2 className="text-gray-400 text-lg">Inventory Value</h2>

                        <p className="text-4xl font-bold mt-4 text-pink-400">
                            {dashboard.totalValue} RWF
                        </p>
                    </div>

                </div>

            </div>

            {/* QUICK ACTIONS */}
            <div className="mt-12">

                <h2 className="text-2xl font-bold text-white mb-6">
                    Quick Actions
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    {/* SPARE PART */}
                    <button
                        onClick={() => navigate("/sparepart")}
                        className="bg-blue-600/20 border border-blue-500/20 backdrop-blur-xl rounded-2xl p-6 text-white hover:bg-blue-600/30 hover:scale-[1.03] transition-all duration-300"
                    >
                        ➕ Add Spare Part
                    </button>

                    {/* STOCK IN */}
                    <button
                        onClick={() => navigate("/stockin")}
                        className="bg-green-600/20 border border-green-500/20 backdrop-blur-xl rounded-2xl p-6 text-white hover:bg-green-600/30 hover:scale-[1.03] transition-all duration-300"
                    >
                        📥 Stock In
                    </button>

                    {/* STOCK OUT */}
                    <button
                        onClick={() => navigate("/stockout")}
                        className="bg-red-600/20 border border-red-500/20 backdrop-blur-xl rounded-2xl p-6 text-white hover:bg-red-600/30 hover:scale-[1.03] transition-all duration-300"
                    >
                        📤 Stock Out
                    </button>

                    {/* REPORTS */}
                    <button
                        onClick={() => navigate("/reports")}
                        className="bg-cyan-600/20 border border-cyan-500/20 backdrop-blur-xl rounded-2xl p-6 text-white hover:bg-cyan-600/30 hover:scale-[1.03] transition-all duration-300"
                    >
                        📊 Reports
                    </button>

                </div>

            </div>

        </div>
    );
}