"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ResetPasswordPage() {
  const { userId } = useParams();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/auth/reset-password/${userId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message || "Password reset successful!");
        setPassword("");
        setConfirmPassword("");

        // Redirect to login page after 2s
        setTimeout(() => router.push("/auth/login"), 2000);
      } else {
        setError(data.error || "Failed to reset password!");
      }
    } catch {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-950 via-gray-900 to-gray-800 text-white px-4">
      {/* 🔹 Background Effects */}
      <div className="absolute top-[-10rem] right-[-10rem] w-[25rem] h-[25rem] rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-[-10rem] left-[-10rem] w-[25rem] h-[25rem] rounded-full bg-indigo-500/20 blur-3xl animate-pulse" />

      {/* 🔹 Logo Section */}
      <div className="flex items-center mb-8 space-x-3 z-10 mt-2">
        <img
          src="https://cfocraft.com/wp-content/uploads/2023/04/WhatsApp-Image-2024-06-17-at-5.12.35-PM-1-e1723554014801.jpeg"
          alt="CFO Craft"
          width={55}
          height={55}
          className="rounded-lg"
          loading="lazy"
        />
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
          CFO Craft
        </h1>
      </div>

      {/* 🔹 Main Card */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-8 transition-all space-y-5"
      >
        <h2 className="text-2xl font-semibold text-center">Reset Password</h2>
        <p className="text-gray-300 text-center text-sm mb-4">
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
          className={`w-full py-3 rounded-lg font-semibold text-white transition-all flex items-center justify-center space-x-2
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

        {/* ✅ Status Messages */}
        {message && (
          <p className="text-green-400 text-center text-sm mt-2">{message}</p>
        )}
        {error && (
          <p className="text-red-400 text-center text-sm mt-2">{error}</p>
        )}
      </form>

      {/* 🔹 Footer */}
      <p className="text-gray-500 text-xs mt-10 z-10">
        © 2025 CFO Craft Inc. All rights reserved.
      </p>
    </div>
  );
}
