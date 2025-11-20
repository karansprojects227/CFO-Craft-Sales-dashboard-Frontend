"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ResetPasswordPage() {
  const { userId } = useParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/reset-password/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, confirmPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Password reset successful!");
        setPassword("");
        setConfirmPassword("");

        // Redirect to login page after 2s
        setTimeout(() => router.push("/auth/login"), 2000);
      } else {
        if (data.errors) {
          setErrors(data.errors); // optional, state me bhi rakh sakte ho
          showPasswordErrors(data.errors); // toast me line by line show
          return;
        }
        else{
          setError(data.error || "Failed to reset password!");
        }
      }
    } catch {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const showPasswordErrors = (errors) => {
    toast.error(
      <div>
        {errors.map((err, index) => (
          <div key={index}>{err}</div> // line by line show
        ))}
      </div>,
      {
        duration: 5000,
        position: "top-right",
      }
    );
  };

  // -----------------------------------------
  // Toast Alerts
  // -----------------------------------------
  useEffect(() => {
    if (message) toast.success(message);
    if (error) toast.error(error);
  }, [message, error]);

  return (
    <div className="min-h-screen flex items-center flex-col justify-center bg-gradient-to-br from-blue-950 via-gray-900 to-gray-800 px-4">
          
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
    
          {/* Logo / Title */}
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight pt-6 pb-4 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text text-center">
            CFO CRAFT
          </h1>

          <div className="relative w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 sm:p-12 shadow-[0_0_80px_rgba(0,255,255,0.15)] overflow-hidden">

            {/* Glow Effects */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-cyan-500/20 blur-3xl rounded-full -z-10"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full -z-10"></div>

      {/* 🔹 Main Card */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-s p-6 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">Reset Password</h2>
        <p className="text-center text-gray-300 text-sm">
          Enter and confirm your new password below.
        </p>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-gray-400/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          required
        />

        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-gray-400/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
          required
        />

        {/* ✅ Button with Spinner */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center space-x-2 cursor-pointer
            ${loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-[1.02]"
            }`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Resetting...</span>
            </>
          ) : (
            "Reset Password"
          )}
        </button>

      </form>

      </div>

      {/* 🔹 Footer */}
      <p className="text-gray-500 text-xs mt-10 z-10">
        © 2025 CFO Craft Inc. All rights reserved.
      </p>
    
    </div>
  );
}
