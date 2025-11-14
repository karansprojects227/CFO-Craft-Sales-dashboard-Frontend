"use client";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
import {
  Users,
  DollarSign,
  ShoppingBag,
  ArrowUpRight,
  Activity,
  TrendingUp,
  Target,
  Globe,
  BarChart3,
  Cpu,
} from "lucide-react";

const lineData = [
  { month: "Jan", revenue: 4000, users: 1200 },
  { month: "Feb", revenue: 5500, users: 1350 },
  { month: "Mar", revenue: 7200, users: 1650 },
  { month: "Apr", revenue: 9800, users: 1900 },
  { month: "May", revenue: 11200, users: 2200 },
  { month: "Jun", revenue: 12600, users: 2600 },
];

const pieData = [
  { name: "Product A", value: 45 },
  { name: "Product B", value: 25 },
  { name: "Product C", value: 15 },
  { name: "Services", value: 15 },
];
const COLORS = ["#3b82f6", "#06b6d4", "#a855f7", "#f59e0b"];

const radarData = [
  { metric: "Efficiency", value: 90 },
  { metric: "Growth", value: 75 },
  { metric: "Revenue", value: 95 },
  { metric: "Engagement", value: 85 },
  { metric: "Retention", value: 80 },
];

const barData = [
  { dept: "Finance", score: 92 },
  { dept: "Sales", score: 85 },
  { dept: "Tech", score: 97 },
  { dept: "Support", score: 78 },
  { dept: "Marketing", score: 88 },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#010617] via-[#0a0f2e] to-[#1b1f3a] text-white p-8 space-y-10">

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { title: "Revenue", value: "$1.25M", icon: <DollarSign />, change: "+12.3%" },
          { title: "Users", value: "12,540", icon: <Users />, change: "+8.4%" },
          { title: "Orders", value: "4,210", icon: <ShoppingBag />, change: "+16.1%" },
          { title: "Growth", value: "+23.8%", icon: <TrendingUp />, change: "Steady" },
        ].map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700/40 flex justify-between items-center hover:scale-[1.02] transition-transform"
          >
            <div>
              <p className="text-gray-400 text-sm">{card.title}</p>
              <h2 className="text-2xl font-bold mt-1">{card.value}</h2>
              <p className="text-xs text-green-400 mt-1">{card.change}</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-xl">{card.icon}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Line + Area Chart */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/80 p-6 rounded-2xl border border-gray-800 shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ArrowUpRight className="w-5 h-5 text-blue-400" /> Revenue vs Users Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={lineData}>
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
              <Line dataKey="users" stroke="#06b6d4" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie + Donut Chart */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/80 p-6 rounded-2xl border border-gray-800 shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" /> Product Sales Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={60} outerRadius={110} paddingAngle={5}>
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: "#111827", border: "none" }} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Radar + Bar Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Radar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/80 p-6 rounded-2xl border border-gray-800 shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-400" /> Performance Matrix
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="metric" stroke="#a1a1aa" />
              <Radar dataKey="value" stroke="#a855f7" fill="#a855f7" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Department Scores Bar Chart */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/80 p-6 rounded-2xl border border-gray-800 shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-400" /> Department Productivity
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
              <XAxis dataKey="dept" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip contentStyle={{ backgroundColor: "#111827", border: "none" }} />
              <Bar dataKey="score" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* AI Quick Summary + Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* AI Summary */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-900/40 to-cyan-900/20 backdrop-blur-lg p-6 rounded-2xl border border-blue-800/50 shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-400" /> AI-Powered Quick Insights
          </h3>
          <ul className="space-y-3 text-gray-300 text-sm leading-relaxed">
            <li>⚡ Revenue grew by <span className="text-blue-400 font-medium">12%</span> in the last 30 days.</li>
            <li>🌍 Asia-Pacific region is showing the <span className="text-emerald-400 font-medium">highest growth rate</span>.</li>
            <li>💡 Product B sales jumped by <span className="text-yellow-400 font-medium">25%</span> after campaign launch.</li>
            <li>📊 User retention reached <span className="text-pink-400 font-medium">89%</span> — highest in 6 months.</li>
          </ul>
        </motion.div>

        {/* Activity Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-900/80 p-6 rounded-2xl border border-gray-800 shadow-lg"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-green-400" /> Recent Activities
          </h3>
          <div className="space-y-5">
            {[
              { msg: "Invoice #4031 approved by CFO", time: "2m ago" },
              { msg: "New vendor added: Nova Tech Pvt. Ltd.", time: "15m ago" },
              { msg: "Sales target for Q4 updated", time: "1h ago" },
              { msg: "Server uptime report generated", time: "3h ago" },
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-gray-200 text-sm">{item.msg}</p>
                  <p className="text-gray-500 text-xs">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
