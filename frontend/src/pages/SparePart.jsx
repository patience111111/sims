import axios from "axios";
import React from "react";

export default function SparePart() {

    const [name, setName] = React.useState("");
    const [category, setCategory] = React.useState("");
    const [quantity, setQuantity] = React.useState("");
    const [unitprice, setUnitPrice] = React.useState("");

    // 👉 Spare parts database (name + category + price in RWF)
    const sparePartsData = {
        "Car": [
            { name: "Brake Pads", price: 60000 },
            { name: "Spark Plug", price: 5000 },
            { name: "Car Battery", price: 150000 },
            { name: "Air Filter", price: 20000 },
            { name: "Oil Filter", price: 12000 },
            { name: "Headlight Bulb", price: 10000 },
            { name: "Clutch Kit", price: 250000 }
        ],
        "Motorcycle": [
            { name: "Chain", price: 30000 },
            { name: "Brake Shoes", price: 15000 },
            { name: "Clutch Plates", price: 50000 },
            { name: "Spark Plug", price: 3000 },
            { name: "Mirror", price: 10000 },
            { name: "Tyre", price: 50000 },
            { name: "Battery", price: 40000 }
        ]
    };

    // 👉 When category changes
    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
        setName("");
        setUnitPrice("");
    };

    // 👉 When spare part is selected
    const handleNameChange = (e) => {
        const selectedName = e.target.value;
        setName(selectedName);

        const found = sparePartsData[category]?.find(
            (item) => item.name === selectedName
        );

        if (found) {
            setUnitPrice(found.price);
        } else {
            setUnitPrice("");
        }
    };

    const handleSparepart = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5000/addsparepart",
                {
                    name,
                    category,
                    quantity,
                    unitprice
                }
            );

            alert(res.data.message);

            setName("");
            setCategory("");
            setQuantity("");
            setUnitPrice("");

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-950 px-4">

            <div className="w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8">

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        Add Spare Part
                    </h1>
                    <p className="text-gray-400">
                        Manage inventory efficiently
                    </p>
                </div>

                <form onSubmit={handleSparepart} className="space-y-6">

                    {/* CATEGORY */}
                    <div>
                        <label className="block text-gray-300 mb-2 font-medium">
                            Category
                        </label>

                        <select
                            value={category}
                            onChange={handleCategoryChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-900/70 border border-gray-700 text-white"
                        >
                            <option value="">Select Category</option>
                            <option value="Car">Car</option>
                            <option value="Motorcycle">Motorcycle</option>
                        </select>
                    </div>

                    
                    <div>
                        <label className="block text-gray-300 mb-2 font-medium">
                            Spare Part Name
                        </label>

                        <select
                            value={name}
                            onChange={handleNameChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-900/70 border border-gray-700 text-white"
                        >
                            <option value="">Select Spare Part</option>

                            {sparePartsData[category]?.map((item, index) => (
                                <option key={index} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* QUANTITY */}
                    <div>
                        <label className="block text-gray-300 mb-2 font-medium">
                            Quantity
                        </label>

                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-gray-900/70 border border-gray-700 text-white"
                        />
                    </div>

                    {/* UNIT PRICE (AUTO) */}
                    <div>
                        <label className="block text-gray-300 mb-2 font-medium">
                            Unit Price (RWF)
                        </label>

                        <input
                            type="number"
                            value={unitprice}
                            readOnly
                            className="w-full px-4 py-3 rounded-xl bg-gray-800 text-white border border-gray-700"
                        />
                    </div>

                    {/* BUTTON */}
                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
                    >
                        Add Spare Part
                    </button>

                </form>

            </div>
        </div>
    );
}