import React, { useState } from "react";
import Profile from "./screen/Profile";
import { House, SquareUser } from "lucide-react";
import Home from "./screen/Home";

const App = () => {
  const [active, setActive] = useState("profile");

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#1f2937,_#020617_70%)] flex justify-center items-center relative">

      {/* Phone Frame */}
      <div className="w-full max-w-md min-h-screen bg-neutral-900/90 backdrop-blur-xl shadow-[0_0_80px_rgba(99,102,241,0.15)] relative pb-28">

        {active === "profile" && <Profile />}
        {active === "home" && <Home setActive={setActive} />}

        {/* Bottom Nav */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[90%] bg-neutral-900/90 backdrop-blur-xl border border-neutral-800 rounded-2xl shadow-2xl flex justify-around py-3">

          <button
            onClick={() => setActive("home")}
            className={`flex flex-col items-center gap-1 ${
              active === "home" ? "text-indigo-400" : "text-neutral-500"
            }`}
          >
            <House />
            <span className="text-xs">Home</span>
          </button>

          <button
            onClick={() => setActive("profile")}
            className={`flex flex-col items-center gap-1 ${
              active === "profile" ? "text-indigo-400" : "text-neutral-500"
            }`}
          >
            <SquareUser />
            <span className="text-xs">Profile</span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default App;
