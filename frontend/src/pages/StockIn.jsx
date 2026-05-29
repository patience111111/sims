import axios from "axios";
import React from "react";

export default function StockIn() {

    const [id, setId] = React.useState("");
    const [quantity, setQuantity] = React.useState("");

    const handleStockIn = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5000/stockin",
                { id, quantity }
            );

            alert(res.data.message);

            setId("");
            setQuantity("");

        } catch (err) {
            console.log(err);
            alert("Failed to add stock");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-blue-950 to-gray-900 px-4">

            <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-3xl overflow-hidden">

                {/* HEADER */}
                <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-6 text-center">
                    <h1 className="text-4xl font-bold text-white">Stock In</h1>
                    <p className="text-green-100 mt-2">Increase inventory quantity</p>
                </div>

                {/* FORM */}
                <form onSubmit={handleStockIn} className="p-8 space-y-6">

                    {/* ID */}
                    <input
                        type="number"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        placeholder="Spare Part ID"
                        className="w-full px-4 py-3 rounded-2xl bg-gray-900/70 border border-gray-700 text-white outline-none focus:ring-4 focus:ring-green-500/30 focus:border-green-500"
                    />

                    {/* QUANTITY */}
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Quantity"
                        className="w-full px-4 py-3 rounded-2xl bg-gray-900/70 border border-gray-700 text-white outline-none focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-500"
                    />

                    {/* BUTTONS */}
                    <div className="flex gap-3">

                        {/* RESET */}
                        <button
                            type="button"
                            onClick={() => {
                                setId("");
                                setQuantity("");
                            }}
                            className="w-1/2 py-3 rounded-2xl bg-gray-700 text-white hover:bg-gray-600 transition"
                        >
                            Reset
                        </button>

                        {/* SUBMIT */}
                        <button
                            type="submit"
                            className="w-1/2 py-3 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold hover:scale-[1.05] transition"
                        >
                            Add Stock
                        </button>

                    </div>

                </form>

            </div>
        </div>
    );
}