import { Link, useLocation } from "react-router-dom";

export default function Navbar() {

  const location = useLocation();

  const menu = [
    { name: "Dashboard", path: "/Dashboard" },
    { name: "SparePart", path: "/sparepart" },
    { name: "Stock In", path: "/stockin" },
    { name: "Stock Out", path: "/stockout" },
    { name: "Reports", path: "/reports" },
  ];

  return (

    <div className="w-72 h-screen bg-gray-900 text-white flex flex-col shadow-2xl">

      {/* LOGO SECTION */}
      <div className="p-6 border-b border-gray-700">

        <h1 className="text-3xl font-extrabold tracking-wide text-blue-400">

          SIMS

        </h1>

        <p className="text-gray-400 mt-2 text-sm">

          Stock Inventory Management System

        </p>

      </div>

      {/* MENU */}
      <div className="flex-1 p-5">

        <ul className="space-y-3">

          {menu.map((item, index) => (

            <li key={index}>

              <Link
                to={item.path}
                className={`block px-4 py-3 rounded-xl transition duration-300 font-medium

                ${
                  location.pathname === item.path
                    ? "bg-blue-500 text-white shadow-lg"
                    : "hover:bg-gray-800 text-gray-300"
                }
                `}
              >

                {item.name}

              </Link>

            </li>

          ))}

        </ul>

      </div>

      {/* FOOTER / LOGOUT */}
      <div className="p-5 border-t border-gray-700">

        <Link
          to="/login"
          className="block text-center bg-red-500 hover:bg-red-600 transition duration-300 py-3 rounded-xl font-semibold"
        >

          Logout

        </Link>
        <div>

          {/* <footer className=""> Alright reserved<footer> */}
        </div>

      </div>

    </div>

  );
}