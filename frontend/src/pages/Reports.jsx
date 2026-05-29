import axios from "axios";
import React from "react";

export default function Report() {

    const [report, setReport] = React.useState([]);




    // FETCH REPORT
    React.useEffect(() => {

        axios.get("http://localhost:5000/report")

            .then((res) => {

                setReport(res.data);

            })

            .catch((err) => {

                console.log(err);

            });

    }, []);




    return (

        <div className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-gray-900 p-6 md:p-10">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">

                <div>

                    <h1 className="text-4xl font-bold text-white">
                        Inventory Report
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Monitor all spare parts in your inventory
                    </p>

                </div>



                {/* TOTAL ITEMS */}
                <div className="mt-4 md:mt-0 bg-white/10 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-4 shadow-xl">

                    <h2 className="text-gray-400 text-sm">
                        Total Spare Parts
                    </h2>

                    <p className="text-3xl font-bold text-cyan-400">
                        {report.length}
                    </p>

                </div>

            </div>



            {/* TABLE CARD */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

                {/* TOP BAR */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-white/5">

                    <div>

                        <h2 className="text-2xl font-semibold text-white">
                            Spare Parts Table
                        </h2>

                        <p className="text-gray-400 text-sm mt-1">
                            Inventory tracking and stock analysis
                        </p>

                    </div>



                    <button
                        className="
                            px-5
                            py-2
                            rounded-xl
                            bg-gradient-to-r
                            from-cyan-500
                            to-blue-600
                            text-white
                            font-semibold
                            shadow-lg
                            hover:scale-[1.03]
                            transition-all
                            duration-300
                        "
                        onClick={()=>window.print()}
                    >

                        Export Report

                    </button>

                </div>



                {/* TABLE */}
                <div className="overflow-x-auto">

                    <table className="w-full text-left">

                        <thead className="bg-white/5 border-b border-white/10">

                            <tr>

                                <th className="p-5 text-cyan-400 font-semibold">
                                    ID
                                </th>

                                <th className="p-5 text-cyan-400 font-semibold">
                                    Spare Part
                                </th>

                                <th className="p-5 text-cyan-400 font-semibold">
                                    Category
                                </th>

                                <th className="p-5 text-cyan-400 font-semibold">
                                    Quantity
                                </th>

                                <th className="p-5 text-cyan-400 font-semibold">
                                    Unit Price
                                </th>

                                <th className="p-5 text-cyan-400 font-semibold">
                                    Total Price
                                </th>

                                <th className="p-5 text-cyan-400 font-semibold">
                                    Status
                                </th>

                            </tr>

                        </thead>



                        <tbody>

                            {
                                report.map((item) => (

                                    <tr
                                        key={item.id}
                                        className="
                                            border-b
                                            border-white/5
                                            hover:bg-white/5
                                            transition-all
                                            duration-300
                                        "
                                    >

                                        {/* ID */}
                                        <td className="p-5 text-gray-300">
                                            #{item.id}
                                        </td>



                                        {/* NAME */}
                                        <td className="p-5">

                                            <div className="flex items-center gap-3">

                                                <div className="
                                                    w-10
                                                    h-10
                                                    rounded-full
                                                    bg-cyan-500/20
                                                    flex
                                                    items-center
                                                    justify-center
                                                    text-cyan-400
                                                    font-bold
                                                ">

                                                    {item.Name.charAt(0)}

                                                </div>

                                                <span className="text-white font-medium">

                                                    {item.Name}

                                                </span>

                                            </div>

                                        </td>



                                        {/* CATEGORY */}
                                        <td className="p-5 text-gray-300">
                                            {item.Category}
                                        </td>



                                        {/* QUANTITY */}
                                        <td className="p-5">

                                            <span className="
                                                px-4
                                                py-1
                                                rounded-full
                                                bg-green-500/20
                                                text-green-400
                                                text-sm
                                                font-semibold
                                            ">

                                                {item.Quantity}

                                            </span>

                                        </td>



                                        {/* UNIT PRICE */}
                                        <td className="p-5 text-gray-300">
                                            {item.UnitPrice} RWF
                                        </td>



                                        {/* TOTAL PRICE */}
                                        <td className="p-5 text-cyan-300 font-semibold">
                                            {item.TotalPrice} RWF
                                        </td>



                                        {/* STATUS */}
                                        <td className="p-5">

                                            {
                                                item.Quantity > 5 ? (

                                                    <span className="
                                                        px-4
                                                        py-1
                                                        rounded-full
                                                        bg-green-500/20
                                                        text-green-400
                                                        text-sm
                                                        font-semibold
                                                    ">

                                                        In Stock

                                                    </span>

                                                ) : (

                                                    <span className="
                                                        px-4
                                                        py-1
                                                        rounded-full
                                                        bg-red-500/20
                                                        text-red-400
                                                        text-sm
                                                        font-semibold
                                                    ">

                                                        Low Stock

                                                    </span>
                                                )
                                            }

                                        </td>

                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}