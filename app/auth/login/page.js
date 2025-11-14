"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

export default function LoginPage() {
  
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        // 🔹 http (not https) for local dev
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials:'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // 🔹 Success Message
        setMessage(data.message || "Login successful!");
        setFormData({ email: "", password: "" });
            
        // 🔹 Redirect to dashboard
        setTimeout(() => router.push("/dashboard"), 1200);
      } else {
        // 🔹 Show backend error
        setError(data.message || "Invalid credentials, please try again.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle success && error
  useEffect(() => {
    if (message?.length > 0) {
      toast.success(message);
    }
    if (error?.length > 0) {
      toast.error(error);
    }
  }, [message, error]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-950 via-gray-900 to-gray-800 text-white">

      {/* 🔹 Background Effects */}
      <div className="absolute top-[-10rem] right-[-10rem] w-[25rem] h-[25rem] rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10rem] left-[-10rem] w-[25rem] h-[25rem] rounded-full bg-indigo-500/20 blur-3xl animate-pulse" />

      {/* Logo Section */}
      <div className="mb-8 space-x-3 z-10 mt-2 absolute left-10 top-2">
        <img
          src="https://cfocraft.com/wp-content/uploads/2023/04/WhatsApp-Image-2024-06-17-at-5.12.35-PM-1-e1723554014801.jpeg"
          alt="CFO Craft"
          width={100}
          height={100}
          className="rounded-lg hidden sm:block"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
  
        {/* 🔹 Title */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight pt-5 pb-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text text-center">
          CFO CRAFT
        </h1>

        {/* 🔹 Main Card */}
        <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 transition-all">
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6">Welcome Back</h2>
          <p className="text-center text-gray-300 text-sm sm:text-base mb-8">
            Login to access your sales dashboard.
          </p>

          {/* ✅ Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {["email", "password"].map((field) => (
              <div key={field}>
                <label className="block text-sm mb-1 text-gray-200 capitalize">
                  {field}
                </label>
                <input
                  type={field === "password" ? "password" : "email"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={field === "email" ? "john@example.com" : "••••••••"}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-gray-400/30 text-white placeholder-gray-400 
                    focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold 
                text-white hover:scale-[1.02] transition-transform disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          
          {/* 🔹 Register Redirect */}
          <p className="text-sm text-center mt-5 text-gray-300">
            Don’t have an account?{" "}
            <a
              href="/auth/register"
              className="text-blue-400 hover:text-cyan-300 font-medium transition-colors"
            >
              Register
            </a>
          </p>
          
          {/* 🔹 Forgot Password */}
          <p className="text-sm text-center mt-2">
            <a
              href="/auth/forgot-password"
              className="text-gray-400 hover:text-cyan-300 transition-colors"
            >
              Forgot your password?
            </a>
          </p>
        </div>
          
        {/* 🔹 Footer */}
        <p className="text-gray-500 text-xs mt-2 z-10 text-center">
          © 2025 CFO Craft Inc. All rights reserved.
        </p>
      </div>

    </div>
  );
}
