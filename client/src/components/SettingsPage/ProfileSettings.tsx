import React from "react";
import sliderImage from "../../assets/Slider1.jpg";
import avatarImage from "../../assets/Avatar.svg";

const ProfileSettings: React.FC = () => {
  return (
    <div className="relative">
      <div className="relative">
        <img
          src={sliderImage}
          alt="Cover Image"
          className="w-full p-5 object-cover h-100 opacity-50 "
        />
        <img
          src={avatarImage}
          alt="Avatar Image"
          className="absolute left-8 bottom-[-15px]"
        />
      </div>
      <div className="mt-10 ml-5">
        <h1 className="font-bold text-3xl">Edit Profile</h1>
      </div>
      <div className="mt-4 ml-5 space-y-4 mr-10">
        <div>
          <label>User Name</label>
          <input
            className="bg-transparent rounded border-1 w-full p-2 mt-3 text-white"
            placeholder="Add a User Name"
          />
        </div>
        <div>
          <label>Bio</label>
          <textarea
            className="bg-transparent rounded border-1 w-full p-2 mt-3 text-white"
            rows={4}
            placeholder="Add Bio"
          />
        </div>
        <div>
          <label>URL</label>
          <input
            className="bg-transparent rounded border-1 w-full p-2 mt-3 text-white"
            placeholder="Add a URL"
          />
        </div>
        <div className="mb-2">
          <label>Email Address</label>
          <input
            className="bg-transparent rounded border-1 w-full p-2 mt-3 text-white"
            placeholder="Add a Email Address"
          />
        </div>
        <div className="flex justify-end mt-6">
          <button className="bg-blue-400 px-6 py-3 rounded-2xl cursor-pointer">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
