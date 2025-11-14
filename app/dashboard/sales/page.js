"use client";
import { ResponsiveContainer, AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const salesData = [
  { month: "Jan", revenue: 4200, profit: 2100 },
  { month: "Feb", revenue: 3800, profit: 1800 },
  { month: "Mar", revenue: 4600, profit: 2300 },
  { month: "Apr", revenue: 5100, profit: 2500 },
  { month: "May", revenue: 4800, profit: 2400 },
  { month: "Jun", revenue: 5300, profit: 2700 },
];

export default function SalesPage() {
  return (
    <div className="p-6 text-gray-200 bg-[#0f172a] min-h-screen">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg hover:bg-[#334155] transition">
          <h2 className="text-gray-400 text-sm">Total Revenue</h2>
          <p className="text-2xl font-semibold text-blue-400 mt-1">$25,100</p>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg hover:bg-[#334155] transition">
          <h2 className="text-gray-400 text-sm">Total Profit</h2>
          <p className="text-2xl font-semibold text-cyan-400 mt-1">$12,800</p>
        </div>
        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg hover:bg-[#334155] transition">
          <h2 className="text-gray-400 text-sm">Conversion Rate</h2>
          <p className="text-2xl font-semibold text-green-400 mt-1">4.2%</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg mb-10">
        <h2 className="text-xl font-semibold mb-4 text-white">Revenue & Profit Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={salesData}>
            <defs>
              <linearGradient id="revColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
            <XAxis dataKey="month" stroke="#a1a1aa" />
            <YAxis stroke="#a1a1aa" />
            <Tooltip contentStyle={{ backgroundColor: "#111827", border: "none" }} />
            <Area dataKey="revenue" stroke="#3b82f6" fill="url(#revColor)" strokeWidth={3} />
            <Line dataKey="profit" stroke="#06b6d4" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Sales Table */}
      <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-white">Recent Sales</h2>
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-gray-400 text-sm">
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Customer</th>
              <th className="py-2 px-4">Amount</th>
              <th className="py-2 px-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { date: "Nov 9, 2025", customer: "Rohit Sharma", amount: "$420", status: "Completed" },
              { date: "Nov 8, 2025", customer: "Priya Singh", amount: "$310", status: "Pending" },
              { date: "Nov 7, 2025", customer: "Amit Patel", amount: "$520", status: "Completed" },
              { date: "Nov 6, 2025", customer: "Neha Verma", amount: "$270", status: "Refunded" },
            ].map((item, i) => (
              <tr key={i} className="bg-[#0f172a] hover:bg-[#1e293b] transition">
                <td className="py-3 px-4">{item.date}</td>
                <td className="py-3 px-4">{item.customer}</td>
                <td className="py-3 px-4 text-blue-400">{item.amount}</td>
                <td className="py-3 px-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      item.status === "Completed"
                        ? "bg-green-500/20 text-green-400"
                        : item.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {item.status}
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
