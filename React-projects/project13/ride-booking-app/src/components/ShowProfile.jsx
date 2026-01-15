import { Mail, Phone, Star, User } from "lucide-react";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfileData } from "../Store/appStore";

const ShowProfile = () => {
  const dispatch = useDispatch();
  const { name, email, phoneNumber } = useSelector(
    (state) => state.app.userData
  );
  const { rating, rides } = useSelector((state) => state.app.userStats);

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [currentProfileData, setCurrentProfileData] = useState({
    name,
    email,
    phoneNumber,
  });

  function HandleEdit() {
    setIsEditingProfile(!isEditingProfile);
  }

  function handleProfileDataChange() {
    dispatch(updateProfileData(currentProfileData));
    setIsEditingProfile(false);
  }

  return (
    <div className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-3xl p-8 text-white shadow-2xl border border-neutral-700">
  
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-wide">Your Profile</h1>
        <button
          onClick={HandleEdit}
          className="px-5 py-2 rounded-full text-sm font-medium bg-neutral-700 hover:bg-neutral-600 transition"
        >
          {isEditingProfile ? "Cancel" : "Edit Profile"}
        </button>
      </div>
  
      {/* Avatar & Stats */}
      <div className="flex items-center gap-6 mb-10">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
          <User size={34} className="text-white" />
        </div>
  
        <div>
          <p className="text-2xl font-semibold">{name}</p>
          <div className="flex items-center gap-4 mt-2 text-sm text-neutral-300">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-medium">{rating}</span>
            </div>
            <div className="h-1 w-1 bg-neutral-500 rounded-full" />
            <span>{rides} Rides</span>
          </div>
        </div>
      </div>
  
      {/* View Mode */}
      {!isEditingProfile && (
        <div className="space-y-5">
          <div className="flex items-center gap-4 bg-neutral-800 p-4 rounded-xl border border-neutral-700">
            <Mail className="text-indigo-400" />
            <p className="text-sm">{email}</p>
          </div>
  
          <div className="flex items-center gap-4 bg-neutral-800 p-4 rounded-xl border border-neutral-700">
            <Phone className="text-indigo-400" />
            <p className="text-sm">{phoneNumber}</p>
          </div>
        </div>
      )}
  
      {/* Edit Mode */}
      {isEditingProfile && (
        <div className="space-y-5">
          <Input label="Full Name" value={currentProfileData.name}
            onChange={(e) =>
              setCurrentProfileData({ ...currentProfileData, name: e.target.value })
            }
          />
          <Input label="Email" value={currentProfileData.email}
            onChange={(e) =>
              setCurrentProfileData({ ...currentProfileData, email: e.target.value })
            }
          />
          <Input label="Phone Number" value={currentProfileData.phoneNumber}
            onChange={(e) =>
              setCurrentProfileData({ ...currentProfileData, phoneNumber: e.target.value })
            }
          />
  
          <button
            onClick={handleProfileDataChange}
            className="w-full mt-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition"
          >
            Save Profile
          </button>
        </div>
      )}
  
    </div>
  );
  
};

const Input = ({ label, value, onChange }) => (
  <div>
    <label className="text-xs text-neutral-400 uppercase tracking-wider">
      {label}
    </label>
    <input
      value={value}
      onChange={onChange}
      className="w-full mt-1 px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-white"
    />
  </div>
);


export default ShowProfile;