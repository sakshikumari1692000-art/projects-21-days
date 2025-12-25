import React from "react";
import SearchBar from "./SearchBar";
import CartIcon from "../Icons/CartIcon";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">

        {/* Logo (Enhanced Design) */}
        <Link to ="/" className="flex items-center cursor-pointer select-none">
          <span className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Nova
          </span>
          <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent tracking-tight">
            Edge
          </span>
        </Link>

        {/* Search */}
        <div className="flex-1 max-w-xl hidden md:block">
          <SearchBar />
        </div>

        {/* Cart */}
        <Link to="/products" className="flex items-center">
        <button
            className="
            relative
            flex items-center gap-2
            px-4 py-2
            rounded-full
            text-gray-700
            bg-gray-100
            hover:bg-blue-50
            hover:text-blue-600
            transition-all duration-200
            "
        >
        <span className="text-sm font-semibold">
        <CartIcon />
        </span>

        <span
        className="
            absolute -top-1.5 -right-1.5
            min-w-[18px] h-[18px]
            flex items-center justify-center
            bg-blue-600
            text-white
            text-xs font-bold
            rounded-full
            ring-2 ring-white
        "
        >
        2
        </span>
    </button>
    </Link>

      </div>

      {/* Mobile Search */}
      <div className="px-4 pb-3 md:hidden">
        <SearchBar />
      </div>
    </nav>
  );
};

export default Navbar;
