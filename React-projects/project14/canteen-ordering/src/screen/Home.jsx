import React from "react";
import { useGetRestaurantData } from "../Hook";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import RestaurantCard from "../components/RestaurantCard";

const Home = () => { 
  useGetRestaurantData();
  const restaurantData = useSelector(
    (state) => state.app.restaurantData
  );

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <h1 className="text-2xl font-bold text-orange-600">
          🍽️ Canteen
        </h1>

        <Link to="/cart">
          <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
            Cart
          </button>
        </Link>
      </nav>

      {/* Restaurant Grid */}
      <div
        className="
          p-6 grid gap-6
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          place-items-center
        "
      >
        {restaurantData.map((obj) => (
          <RestaurantCard key={obj.id} data={obj} />
        ))}
      </div>
    </div>
  );
};

export default Home;
