"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSearchParams, useRouter } from "next/navigation";

export default function VerifyOtpPage() {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60); // 60s timer
  const [resending, setResending] = useState(false);
  const [otpSent, setOtpSent] = useState(true); // OTP has already been sent
  
  const searchParams = useSearchParams();
  const email = searchParams.get("email"); // fetch email from URL params

  // TIMER EFFECT
  useEffect(() => {
    if (!otpSent || timer === 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [otpSent, timer]);

  // HANDLE OTP VERIFY
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }
  
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        credentials: "include", // important for cookies (JWT)
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
    
      const data = await res.json();
    
      if (!res.ok) {
        toast.error(data.message || "Invalid OTP");
        return;
      }
    
      // Redirect
      router.push("/dashboard");
    
    } catch (err) {
      console.error("Verify OTP Frontend Error:", err);
      toast.error("Something went wrong. Please try again.");
    }
  };

  // HANDLE RESEND OTP
  const handleResendOtp = async () => {
    setResending(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("OTP resent successfully!");
        setTimer(60); // Reset timer
      } else {
        toast.error(data.message || "Unable to resend OTP");
      }
    } catch (err) {
      toast.error("Server error. Try again later.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-950 via-gray-900 to-gray-800 text-white px-4">
      
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

        <h2 className="text-4xl font-extrabold text-center mb-6 tracking-wide bg-gradient-to-r from-cyan-300 to-blue-400 bg-clip-text text-transparent">
          Verify OTP
        </h2>

        <p className="text-center text-gray-300 mb-8 text-sm">
          OTP has been sent to <span className="text-cyan-300 font-medium">{email}</span>
        </p>

        <form onSubmit={handleVerifyOtp} className="space-y-5">
          {/* OTP Input */}
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 6-digit OTP"
            maxLength={6}
            className="w-full px-5 py-3.5 text-lg rounded-xl bg-white/10 backdrop-blur-md border border-white/20 focus:ring-2 focus:ring-cyan-400 outline-none text-white placeholder-gray-400 shadow-[inset_0_0_15px_rgba(0,0,0,0.3)]"
            aria-label="OTP Input"
          />

          {/* Resend + Timer */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-300">
              {timer > 0 ? (
                <>Resend in <span className="text-cyan-400 font-semibold">{timer}s</span></>
              ) : (
                <span className="text-green-400 font-medium">You can resend OTP</span>
              )}
            </span>

            <button
              type="button"
              disabled={timer > 0 || resending}
              onClick={handleResendOtp}
              className={`font-semibold ${timer > 0 || resending ? "text-gray-500 cursor-not-allowed" : "text-cyan-300 hover:text-cyan-200"}`}
              aria-label="Resend OTP"
            >
              {resending ? "Resending..." : "Resend OTP"}
            </button>
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg hover:shadow-cyan-500/40 hover:brightness-110 transition-all duration-200 active:scale-[0.97]"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}
