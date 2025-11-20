"use client";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ for showing loading spinner

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) setMessage(data.message);
      else setError(data.error || "Failed to send reset link");
    } catch {
      setError("Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-950 via-gray-900 to-gray-800 text-white">
      <h1 className="text-2xl font-semibold mb-6">Forgot Password</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white/10 p-6 rounded-xl space-y-4"
      >
        <input
          type="email"
          placeholder="Enter your regitered email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
              <span>Sending...</span>
            </>
          ) : (
            "Send Reset Link"
          )}
        </button>

        {/* ✅ Message Handling */}
        {message && (
          <p className="text-green-400 text-sm text-center mt-2">{message}</p>
        )}
        {error && (
          <p className="text-red-400 text-sm text-center mt-2">{error}</p>
        )}
      </form>
    </div>
  );
}
