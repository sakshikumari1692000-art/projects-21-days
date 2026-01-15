import React, { useState } from "react";
import { useSelector } from "react-redux";
import SavedLocations from "../components/SavedLocations";

const Home = ({ setActive }) => {
  const userName = useSelector((state) => state.app.userData.name);
  const { walletBalance } = useSelector((state) => state.app.userData);
  const [destinationLocation, setDestinationLocation] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const savedPlaces = useSelector((store) => store.app.savedPlaces);

  return (
    <div className="p-6 space-y-8">

      {/* Header Card (same style as Profile header) */}
      <div className="bg-neutral-800/80 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-neutral-700 flex justify-between items-center">
        <div>
          <p className="text-xs text-neutral-400">Good Evening</p>
          <h1 className="text-xl font-semibold text-white">{userName}</h1>
        </div>

        <button
          onClick={() => setActive("profile")}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-600 text-white text-sm font-semibold shadow-lg"
        >
          ₹ {walletBalance}
        </button>
      </div>

      {/* Ride Card */}
      <div className="bg-neutral-800/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-neutral-700 space-y-7">

        <h2 className="text-lg font-semibold text-white">Book a Ride</h2>

        {/* Pickup */}
        <div>
          <p className="text-xs text-neutral-400 mb-1">Pickup</p>
          <input
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            placeholder="Enter pickup location"
            className="w-full px-5 py-4 rounded-xl bg-neutral-900 border border-neutral-700 focus:ring-2 focus:ring-indigo-500 outline-none text-white placeholder-neutral-500"
          />
        </div>

        {/* Destination */}
        <div>
          <p className="text-xs text-neutral-400 mb-1">Destination</p>
          <input
            value={destinationLocation}
            onChange={(e) => setDestinationLocation(e.target.value)}
            placeholder="Where are you going?"
            className="w-full px-5 py-4 rounded-xl bg-neutral-900 border border-neutral-700 focus:ring-2 focus:ring-purple-500 outline-none text-white placeholder-neutral-500"
          />
        </div>

        {/* Saved Places */}
        <div className="space-y-3">
          <p className="text-xs text-neutral-400 uppercase tracking-wider">
            Saved Places
          </p>

          {savedPlaces.map((data) => (
            <div
              key={data.id}
              onClick={() => setDestinationLocation(data.address)}
              className="flex justify-between items-center px-5 py-4 rounded-xl bg-neutral-900 hover:bg-neutral-700 cursor-pointer transition border border-neutral-700"
            >
              <p className="text-white font-medium">{data.type}</p>
              <span className="text-xs text-neutral-400">Tap to select</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-600 text-white font-bold shadow-lg hover:opacity-90 transition">
          Start Ride
        </button>

      </div>

      <SavedLocations
        changeDestinationFlag={true}
        setDestinationLocation={setDestinationLocation}
      />

    </div>
  );
};

export default Home;
