"use client";
import { useState } from "react";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    theme: "dark",
    language: "English",
    notifications: true,
    twoFactorAuth: false,
    autoUpdate: true,
  });

  return (
    <div className="p-6 text-gray-200 bg-[#0f172a] min-h-screen">

      {/* Settings Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg hover:bg-[#334155] transition">
          <h2 className="text-gray-400 text-sm">Theme</h2>
          <select
            value={settings.theme}
            onChange={(e) =>
              setSettings({ ...settings, theme: e.target.value })
            }
            className="mt-2 w-full bg-[#0f172a] text-gray-200 px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
          >
            <option value="dark">Dark</option>
            <option value="light">Light</option>
            <option value="system">System Default</option>
          </select>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg hover:bg-[#334155] transition">
          <h2 className="text-gray-400 text-sm">Language</h2>
          <select
            value={settings.language}
            onChange={(e) =>
              setSettings({ ...settings, language: e.target.value })
            }
            className="mt-2 w-full bg-[#0f172a] text-gray-200 px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Spanish">Spanish</option>
          </select>
        </div>

        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg hover:bg-[#334155] transition">
          <h2 className="text-gray-400 text-sm">Notifications</h2>
          <label className="inline-flex items-center mt-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) =>
                setSettings({ ...settings, notifications: e.target.checked })
              }
              className="w-5 h-5 accent-blue-500"
            />
            <span className="ml-3 text-gray-200">Enable Notifications</span>
          </label>
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg mb-10">
        <h2 className="text-xl font-semibold mb-4 text-white">Advanced Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Two-Factor Authentication</span>
            <input
              type="checkbox"
              checked={settings.twoFactorAuth}
              onChange={(e) =>
                setSettings({ ...settings, twoFactorAuth: e.target.checked })
              }
              className="w-5 h-5 accent-blue-500 cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Automatic Updates</span>
            <input
              type="checkbox"
              checked={settings.autoUpdate}
              onChange={(e) =>
                setSettings({ ...settings, autoUpdate: e.target.checked })
              }
              className="w-5 h-5 accent-blue-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Save Changes Button */}
      <div className="text-right">
        <button
          type="button"
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
