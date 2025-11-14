"use client";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line,
} from "recharts";

const customerGrowthData = [
  { month: "Jan", customers: 120 },
  { month: "Feb", customers: 180 },
  { month: "Mar", customers: 260 },
  { month: "Apr", customers: 340 },
  { month: "May", customers: 420 },
  { month: "Jun", customers: 500 },
];

export default function CustomersPage() {
  return (
    <div className="p-6 text-gray-200 bg-[#0f172a] min-h-screen">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg hover:bg-[#334155] transition">
          <h2 className="text-gray-400 text-sm">Total Customers</h2>
          <p className="text-2xl font-semibold text-blue-400 mt-1">500</p>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg hover:bg-[#334155] transition">
          <h2 className="text-gray-400 text-sm">Active Customers</h2>
          <p className="text-2xl font-semibold text-green-400 mt-1">420</p>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg hover:bg-[#334155] transition">
          <h2 className="text-gray-400 text-sm">New This Month</h2>
          <p className="text-2xl font-semibold text-cyan-400 mt-1">80</p>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg hover:bg-[#334155] transition">
          <h2 className="text-gray-400 text-sm">Churn Rate</h2>
          <p className="text-2xl font-semibold text-red-400 mt-1">3.8%</p>
        </div>
      </div>

      {/* Customer Growth Chart */}
      <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg mb-10">
        <h2 className="text-xl font-semibold mb-4 text-white">Customer Growth Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={customerGrowthData}>
            <defs>
              <linearGradient id="custColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
            <XAxis dataKey="month" stroke="#a1a1aa" />
            <YAxis stroke="#a1a1aa" />
            <Tooltip contentStyle={{ backgroundColor: "#111827", border: "none" }} />
            <Area
              dataKey="customers"
              stroke="#3b82f6"
              fill="url(#custColor)"
              strokeWidth={3}
            />
            <Line dataKey="customers" stroke="#06b6d4" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Top Customers Table */}
      <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Top Customers</h2>
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-gray-400 text-sm">
              <th className="py-2 px-4">Customer</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Total Spent</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                name: "Aarav Sharma",
                email: "aarav@example.com",
                spent: "$2,150",
                status: "Active",
              },
              {
                name: "Riya Mehta",
                email: "riya@example.com",
                spent: "$1,870",
                status: "Active",
              },
              {
                name: "Karan Patel",
                email: "karan@example.com",
                spent: "$1,240",
                status: "Inactive",
              },
              {
                name: "Neha Singh",
                email: "neha@example.com",
                spent: "$980",
                status: "Active",
              },
            ].map((cust, i) => (
              <tr key={i} className="bg-[#0f172a] hover:bg-[#1e293b] transition">
                <td className="py-3 px-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                    {cust.name[0]}
                  </div>
                  {cust.name}
                </td>
                <td className="py-3 px-4 text-gray-400">{cust.email}</td>
                <td className="py-3 px-4 text-blue-400">{cust.spent}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      cust.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {cust.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
