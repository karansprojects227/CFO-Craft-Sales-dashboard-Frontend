"use client";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const trafficData = [
  { month: "Jan", users: 3200, sessions: 2800 },
  { month: "Feb", users: 4100, sessions: 3500 },
  { month: "Mar", users: 4800, sessions: 4200 },
  { month: "Apr", users: 5300, sessions: 4600 },
  { month: "May", users: 5900, sessions: 5200 },
  { month: "Jun", users: 6500, sessions: 5700 },
];

const deviceData = [
  { name: "Mobile", value: 63 },
  { name: "Desktop", value: 27 },
  { name: "Tablet", value: 10 },
];

const COLORS = ["#3b82f6", "#06b6d4", "#10b981"];

export default function AnalyticsPage() {
  return (
    <div className="p-6 text-gray-200 bg-[#0f172a] min-h-screen">

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg hover:bg-[#334155] transition">
          <h2 className="text-gray-400 text-sm">Total Users</h2>
          <p className="text-2xl font-semibold text-blue-400 mt-1">6,500</p>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg hover:bg-[#334155] transition">
          <h2 className="text-gray-400 text-sm">Total Sessions</h2>
          <p className="text-2xl font-semibold text-cyan-400 mt-1">5,700</p>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg hover:bg-[#334155] transition">
          <h2 className="text-gray-400 text-sm">Bounce Rate</h2>
          <p className="text-2xl font-semibold text-yellow-400 mt-1">28%</p>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg hover:bg-[#334155] transition">
          <h2 className="text-gray-400 text-sm">Avg. Session Duration</h2>
          <p className="text-2xl font-semibold text-green-400 mt-1">4m 12s</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        {/* Traffic Overview */}
        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Traffic Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trafficData}>
              <defs>
                <linearGradient id="usersColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis dataKey="month" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip contentStyle={{ backgroundColor: "#111827", border: "none" }} />
              <Area
                dataKey="users"
                stroke="#3b82f6"
                fill="url(#usersColor)"
                strokeWidth={3}
              />
              <Line dataKey="sessions" stroke="#06b6d4" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Device Usage */}
        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-white">Device Usage</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={deviceData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {deviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip contentStyle={{ backgroundColor: "#111827", border: "none" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Pages Table */}
      <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Top Pages</h2>
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-gray-400 text-sm">
              <th className="py-2 px-4">Page</th>
              <th className="py-2 px-4">Views</th>
              <th className="py-2 px-4">Avg. Time</th>
              <th className="py-2 px-4">Bounce Rate</th>
            </tr>
          </thead>
          <tbody>
            {[
              { page: "/home", views: "12,300", time: "3m 45s", bounce: "22%" },
              { page: "/products", views: "9,840", time: "2m 57s", bounce: "30%" },
              { page: "/pricing", views: "6,420", time: "2m 14s", bounce: "35%" },
              { page: "/contact", views: "4,180", time: "1m 52s", bounce: "40%" },
            ].map((item, i) => (
              <tr key={i} className="bg-[#0f172a] hover:bg-[#1e293b] transition">
                <td className="py-3 px-4">{item.page}</td>
                <td className="py-3 px-4 text-blue-400">{item.views}</td>
                <td className="py-3 px-4">{item.time}</td>
                <td className="py-3 px-4 text-yellow-400">{item.bounce}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
