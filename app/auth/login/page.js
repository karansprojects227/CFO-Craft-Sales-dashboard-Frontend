"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState(""); // email / phone
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [requiresPassword, setRequiresPassword] = useState(false);
  const [requiresOtp, setRequiresOtp] = useState(false);

  const [loading, setLoading] = useState(false);

  // TIMER STATE
  const [timer, setTimer] = useState(30);
  const [resending, setResending] = useState(false);

  // Input handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "identifier") setIdentifier(value);
    if (name === "password") setPassword(value);
    if (name === "otp") setOtp(value);
  };

  // First request → Tell backend only email
  const handleEmailCheck = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: identifier }),
      });

      const data = await res.json();

      if (data.requiresPassword) {
        setRequiresPassword(true);
        toast.success(data.message);
      } else if (data.requiresOtp) {
        setRequiresOtp(true);
        toast.success(data.message);
      } else if (res.ok) {
        router.push("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error('err');
    }
    setLoading(false);
  };

  // Password Login
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/checkpass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: identifier,
          password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/dashboard");
      } else {
        toast.error(data.message);
      }

    } catch (err) {
      toast.error("Server error");
    }

    setLoading(false);
  };

  // OTP Login
  const handleOtpLogin = async (e) => {
    e.preventDefault();
    if (!otp) return toast.error("Enter OTP!");

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-login-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials:"include",
        body: JSON.stringify({ email: identifier, otp }),
      });

      const data = await res.json();

      if (res.ok) router.push("/dashboard");
      else toast.error(data.message);
    } catch {
      toast.error("Server error");
    }
    setLoading(false);
  };

  // -----------------------------------------
  // RESEND OTP
  // -----------------------------------------
  const handleResendOtp = async () => {
    setResending(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, otpChannel }),
      });

      const data = await res.json();

      if (data.success) {
        setTimer(30); // timer reset
      } else {
        toast.success(data.message);
      }
    } catch (err) {
      toast.error(err);
    }

    setResending(false);
  };

  // TIMER EFFECT
  useEffect(() => {
    if (!requiresOtp) return; // timer sirf OTP screen me chalega

    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [requiresOtp, timer]);

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

          {!requiresOtp ? (
            <>
              <h2 className="text-3xl font-semibold text-center mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">Welcome Back</h2>
              <p className="text-center text-gray-300 mb-6">Login to access your dashboard.</p>
            </>
          ) : (
            <h2 className="text-2xl font-semibold text-center mb-6 text-cyan-400">
              OTP sent to <span className="text-blue-400">{identifier}</span>
            </h2>
          )}

          {/* STEP 1 → Enter Email */}
          {!requiresPassword && !requiresOtp && (
            <form onSubmit={handleEmailCheck} className="space-y-4">
              <input
                type="text"
                name="identifier"
                value={identifier}
                onChange={handleChange}
                placeholder="Email or Phone"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-gray-400/30 text-white"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold 
                text-white hover:scale-[1.02] transition-transform disabled:opacity-70 text-sm sm:text-base cursor-pointer"
              >
                {loading ? "Checking..." : "Continue"}
              </button>
            </form>
          )}

          {/* STEP 2 → Password Login */}
          {requiresPassword && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-gray-400/30 text-white"
              />
              <button
                type="submit"
                disabled={loading || !password}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold 
                text-white hover:scale-[1.02] transition-transform disabled:opacity-70 text-sm sm:text-base cursor-pointer"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          )}

          {/* STEP 3 → OTP Login */}
          {requiresOtp && (
            // =======================
            // OTP VERIFY FORM
            // =======================
            <form onSubmit={handleOtpLogin} className="space-y-5">

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

          {/* OR */}
          {!requiresOtp && (
            <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-400/40"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-black px-3 text-gray-300">OR</span>
            </div>
          </div>
          )}

          {/* Google Login */}
          {!requiresOtp && (
            <button
            onClick={() => {
              window.location.href = "http://localhost:5000/api/auth/google";
            }}
            className="relative w-full flex items-center justify-center gap-3 py-3 
                       rounded-xl overflow-hidden group cursor-pointer 
                       backdrop-blur-xl bg-white/5 border border-white/10 
                       transition-all duration-300 hover:border-cyan-400/50"
          >
          
            {/* Glow Border Animation */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 
                            opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500"></div>

            <div className="relative z-10 flex items-center gap-3">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-6 h-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]"
              />

              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text font-medium text-base tracking-wide 
                               drop-shadow-[0_2px_5px_rgba(0,0,0,0.4)]">
                Continue with Google
              </span>
            </div>
          </button>
          )}

          {!requiresOtp && (
            <p className="text-sm text-center mt-5 text-gray-300">
            Don’t have an account?{" "}
            <a href="/auth/register" className="text-blue-400">Register</a>
          </p>
          )}

          </div>
    
          {/* Footer */}
          <p className="text-gray-500 text-xs mt-6 mb-4 text-center z-10">
            © 2025 CFO Craft Inc. All rights reserved.
          </p>
    
    </div>
  );
}
