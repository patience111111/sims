import axios from "axios";
import React from "react";

export default function StockOut() {

    const [id, setId] = React.useState("");
    const [quantity, setQuantity] = React.useState("");
    const [unitprice, setUnitPrice] = React.useState("");
    const [data, setData] = React.useState([]);

    // CREATE
    const handleStockOut = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(
                "http://localhost:5000/stockout",
                { id, quantity }
            );

            alert(res.data.message);

            setId("");
            setQuantity("");

            fetchData();

        } catch (err) {
            console.log(err);
        }
    };

    // READ
    const fetchData = async () => {
        try {
            const res = await axios.get("http://localhost:5000/stockout");
            setData(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    // DELETE
    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:5000/stockout/${id}`);
        fetchData();
    };

    // UPDATE (simple prompt version)
    const handleUpdate = async (item) => {

        const newQty = prompt("Enter new quantity", item.StockOutQuantity);
        const newPrice = prompt("Enter unit price", item.StockOutUnitPrice);

        if (!newQty || !newPrice) return;

        await axios.put(`http://localhost:5000/stockout/${item.id}`, {
            quantity: newQty,
            unitprice: newPrice
        });

        fetchData();
    };

    return (
        <div className=" min-h-screen bg-gray-950 text-white p-6">

            {/* FORM */}
            <form onSubmit={handleStockOut} className="space-y-4 max-w-md ">

                <input
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="Spare Part ID"
                    className="w-full p-3 bg-gray-800 rounded"
                />

                <input
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Quantity"
                    className="w-full p-3 bg-gray-800 rounded"
                />

                <button className="bg-blue-600 px-4 py-2 rounded">
                    Stock Out
                </button>

            </form>

            {/* TABLE */}
            <div className="mt-10">

                <table className="w-full border border-gray-700">

                    <thead>
                        <tr className="bg-gray-800">
                            <th>ID</th>
                            <th>stockoutquantity</th>
                            <th>stockoutunitprice</th>
                            <th>TotalStockoutQuantity</th>
                            <th>StockoutDate</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id} className="text-center border-t border-gray-700">

                                <td>{item.id}</td>
                                <td>{item.stockoutquantity}</td>
                                <td>{item.stockoutunitprice}</td>
                                <td>{item.stockouttotalprice}</td>
                                <td>{item.StockOutDate}</td>

                                <td className="space-x-2">

                                    <button
                                        onClick={() => handleUpdate(item)}
                                        className="bg-yellow-500 px-2 py-1 rounded"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="bg-red-600 px-2 py-1 rounded"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

        </div>
    );
}