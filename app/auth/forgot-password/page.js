"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // ✅ for showing loading spinner
  
  // 🔥 OTP Sent Flag (switch UI)
  const [otpSent, setOtpSent] = useState(false);

  // OTP Input State
  const [otp, setOtp] = useState("");

  const [timer, setTimer] = useState(60);
  const [resending, setResending] = useState(false);

  // -----------------------------------------
  // Check Email → Send OTP
  // -----------------------------------------
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

      if (res.ok) {
        setMessage(data.message)
        setOtpSent(true)
      }
      else setError(data.error || "Failed to send reset link");
    } catch {
      setError("Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------------------
  // Verify OTP
  // -----------------------------------------
  const handleResetPasswordVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/verify-reset-password-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email:email,
          otp,
        }),
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        setMessage(data.message);
        router.push(`/auth/reset-password/${data.userId}`);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      toast.error("Server error!");
    }
  };

  // -----------------------------------------
  // RESEND OTP
  // -----------------------------------------
  const handleResendOtp = async () => {
    setResending(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials:"include",
        body: JSON.stringify({ ...formData, otpChannel }),
      });

      const data = await res.json();

      if (data.success) {
        setTimer(60); // timer reset
      } else {
        setMessage(data.message);
      }
    } catch (err) {
      setError(err);
    }

    setResending(false);
  };

  // -----------------------------------------
  // Toast Alerts
  // -----------------------------------------
  useEffect(() => {
    if (message) toast.success(message);
    if (error) toast.error(error);
  }, [message, error]);

  // TIMER EFFECT
  useEffect(() => {
    if (!otpSent) return; // timer sirf OTP screen me chalega

    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [otpSent, timer]);

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

            <h1 className="text-2xl font-semibold text-center mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">Forgot Password</h1>

            {!otpSent ? (
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-sm p-6 space-y-4"
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
              
            </form>
            ) : (
              // =======================
            // OTP VERIFY FORM
            // =======================
            <form onSubmit={handleResetPasswordVerifyOtp} className="space-y-5">

              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6-digit OTP"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-gray-400/30 text-white"
              />

              {/* RESEND + TIMER */}
              <div className="flex items-center justify-between mt-2 text-sm">

                {/* TIMER */}
                <span className="text-gray-300">
                  {timer > 0 ? (
                    <>Resend in <span className="text-cyan-400 font-semibold">{timer}s</span></>
                  ) : (
                    <span className="text-green-400">You can resend OTP</span>
                  )}
                </span>
                
                {/* RESEND BUTTON */}
                <button
                  type="button"
                  disabled={timer > 0 || resending}
                  onClick={handleResendOtp}
                  className={`text-cyan-400 underline disabled:opacity-50 cursor-pointer`}
                >
                  {resending ? "Resending..." : "Resend OTP"}
                </button>
              </div>
                
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 font-semibold"
              >
                Verify OTP
              </button>
            </form>
            )}

          </div>

    </div>
  );
}
