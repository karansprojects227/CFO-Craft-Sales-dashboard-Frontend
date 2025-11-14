"use client";
import { useState } from "react";
import { useUser } from "@/context/UserContext";

export default function ProfilePage() {
  const { user } = useUser();
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    phone: "+91 98765 43210",
    bio: "Software Engineer | Passionate about full-stack development and innovation.",
    role: "Software Engineer",
    theme: "dark",
    notifications: true,
  });

  return (
    <div className="p-6 text-gray-200 bg-[#0f172a] min-h-screen">

      {/* Profile Card */}
      <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg mb-10 flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
          {profile.name[0]}
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-white">{profile.name}</h2>
          <p className="text-gray-400">{profile.email}</p>
          <p className="text-sm mt-1 text-blue-400">{profile.role}</p>
        </div>
      </div>

      {/* Profile Edit Form */}
      <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg mb-10">
        <h2 className="text-xl font-semibold mb-4 text-white">Personal Details</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Full Name</label>
            <input
              type="text"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="w-full p-3 rounded-lg bg-[#0f172a] text-gray-200 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email</label>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
              className="w-full p-3 rounded-lg bg-[#0f172a] text-gray-200 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Phone</label>
            <input
              type="text"
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="w-full p-3 rounded-lg bg-[#0f172a] text-gray-200 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-2">Bio</label>
            <textarea
              rows="3"
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="w-full p-3 rounded-lg bg-[#0f172a] text-gray-200 border border-gray-700 focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>
          <div className="md:col-span-2 text-right">
            <button
              type="button"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      {/* Preferences */}
      <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Dark Mode</span>
            <select
              value={profile.theme}
              onChange={(e) => setProfile({ ...profile, theme: e.target.value })}
              className="bg-[#0f172a] text-gray-200 px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="system">System Default</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Enable Notifications</span>
            <input
              type="checkbox"
              checked={profile.notifications}
              onChange={(e) =>
                setProfile({ ...profile, notifications: e.target.checked })
              }
              className="w-5 h-5 accent-blue-500 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
