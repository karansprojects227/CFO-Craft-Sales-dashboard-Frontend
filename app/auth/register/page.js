"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Handle input changes dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        setFormData({ name: "", email: "", password: "" });

        // Redirect to login page after short delay
        setTimeout(() => router.push("/auth/login"), 1500);
      } else {
        setError(data.message || "Something went wrong!");
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
      
      {/* Background Effects */}
      <div className="absolute top-[-10rem] right-[-10rem] w-[25rem] h-[25rem] rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10rem] left-[-10rem] w-[25rem] h-[25rem] rounded-full bg-indigo-500/20 blur-3xl animate-pulse" />

      {/* Logo Section */}
      <div className="mb-8 space-x-3 z-10 mt-2 absolute left-10 top-2 hidden sm:block">
        <img
          src="https://cfocraft.com/wp-content/uploads/2023/04/WhatsApp-Image-2024-06-17-at-5.12.35-PM-1-e1723554014801.jpeg"
          alt="CFO Craft"
          width={100}
          height={100}
          className="rounded-lg"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 md:px-8 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white">

        {/* Logo / Title */}
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight pt-6 pb-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text text-center">
          CFO CRAFT
        </h1>

        {/* Main Card */}
        <div className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8 transition-all">
          <h2 className="text-2xl font-semibold text-center mb-4 sm:mb-6">
            Create Your Account
          </h2>
          <p className="text-center text-gray-300 text-sm mb-6 sm:mb-8">
            Start tracking your sales and analytics in one place.
          </p>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
            {[
              { name: "name", type: "text", placeholder: "John Doe", auto: "name" },
              { name: "email", type: "email", placeholder: "john@example.com", auto: "email" },
              { name: "password", type: "password", placeholder: "••••••••", auto: "new-password" },
            ].map(({ name, type, placeholder, auto }) => (
              <div key={name}>
                <label className="block text-sm mb-1 text-gray-200 capitalize">
                  {name === "name" ? "Full Name" : name}
                </label>
                <input
                  type={type}
                  name={name}
                  autoComplete={auto}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-gray-400/30 text-white placeholder-gray-400 
                    focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all text-sm sm:text-base"
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold 
                text-white hover:scale-[1.02] transition-transform disabled:opacity-70 text-sm sm:text-base"
            >
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>
          
          {/* Login Redirect */}
          <p className="text-sm text-center mt-5 text-gray-300">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="text-blue-400 hover:text-cyan-300 font-medium transition-colors"
            >
              Login
            </a>
          </p>
        </div>
          
        {/* Footer */}
        <p className="text-gray-500 text-xs mt-6 mb-4 text-center z-10">
          © 2025 CFO Craft Inc. All rights reserved.
        </p>
      </div>

    </div>
  );
}
