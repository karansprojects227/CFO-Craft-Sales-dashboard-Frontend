"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function RegisterPage() {
  const router = useRouter();
  const [otpChannel, setOtpChannel] = useState("email"); // "email" or "phone"
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    otpChannel
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState([]);
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

  // 🔥 OTP Sent Flag (switch UI)
  const [otpSent, setOtpSent] = useState(false);

  // OTP Input State
  const [otp, setOtp] = useState("");

  // TIMER STATE
  const [timer, setTimer] = useState(60);
  const [resending, setResending] = useState(false);
  
  // -----------------------------------------
  // Handle Input Change
  // -----------------------------------------
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // -----------------------------------------
  // Register → Send OTP
  // -----------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("OTP sent successfully!");
        setOtpSent(true); // 🔥 Show OTP Verify Form
      } else {
        if (data.errors) {
          setErrors(data.errors); // optional, state me bhi rakh sakte ho
          showPasswordErrors(data.errors); // toast me line by line show
          return;
        }
        else return setError(data.message);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  // -----------------------------------------
  // Verify OTP
  // -----------------------------------------
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE}/api/auth/verify-register-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          otp,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(data.message);
        router.push("/auth/login");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Server error!");
    }
  };

  // -----------------------------------------
  // RESEND OTP
  // -----------------------------------------
  const handleResendOtp = async () => {
    setResending(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials:"include",
        body: JSON.stringify({ ...formData, otpChannel }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage(data.message);
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

  // Update OTP channel inside formData
  useEffect(() => {
    setFormData((prev) => ({ ...prev, otpChannel }));
  }, [otpChannel]);

  // TIMER EFFECT
  useEffect(() => {
    if (!otpSent) return; // timer sirf OTP screen me chalega

    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [otpSent, timer]);

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

          {!otpSent ? (
            <h2 className="text-2xl font-semibold text-center mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
              Create Your Account
            </h2>
          ) : (
            <h2 className="text-2xl font-semibold text-center mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
              OTP sent to <span className="text-blue-500">{formData.email}</span>
            </h2>
          )}

          {!otpSent ? (
            <p className="text-center text-gray-300 text-sm mb-6 sm:mb-8">
              Start tracking your sales and analytics in one place.
            </p>
          ) : null}

          {!otpSent ? (
            // =======================
            // REGISTER FORM
            // =======================
            <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">

              {/* INPUTS */}
              {[
                { name: "name", label: "Full Name", type: "text", placeholder: "John Doe", auto: "name" },
                { name: "phone", label: "Phone Number", type: "phone", placeholder: "+91 9876543210", auto: "tel" },
                { name: "email", label: "Email", type: "email", placeholder: "john@example.com", auto: "email" },
                { name: "password", label: "Password", type: "password", placeholder: "••••••••", auto: "new-password" },
              ].map(({ name, label, type, placeholder, auto }) => (
                <div key={name}>
                  <label className="block text-sm mb-1 text-gray-200">{label}</label>

                  {type === "phone" ? (
                    <PhoneInput
                      country="in"
                      value={formData.phone}
                      onChange={(value, country, e, formattedValue) =>
                        setFormData((prev) => ({
                          ...prev,
                          phone: formattedValue.replace(/[\s-]/g, ""),
                        }))
                      }
                      inputProps={{
                        name: "phone",
                        required: true,
                        autoFocus: false,
                        placeholder: "+91 9876543210",
                      }}
                      inputStyle={{
                        width: "100%",
                        height: "48px",
                        borderRadius: "0.5rem",
                        background: "rgba(255,255,255,0.1)",
                        border: "1px solid rgba(156,163,175,0.3)",
                        color: "#FFF",
                        paddingLeft: "60px",
                      }}
                      buttonStyle={{
                        borderRadius: "0.5rem 0 0 0.5rem",
                        border: "1px solid rgba(156,163,175,0.3)",
                        background: "rgba(255,255,255,0.1)",
                      }}
                      dropdownStyle={{
                        background: "#1f2937",
                        color: "#fff",
                      }}
                    />
                  ) : (
                    <input
                      type={type}
                      name={name}
                      autoComplete={auto}
                      value={formData[name]}
                      onChange={handleChange}
                      placeholder={placeholder}
                      className="w-full px-4 py-3 rounded-lg bg-white/10 border border-gray-400/30 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  )}
                </div>
              ))}

              {/* OTP CHANNEL */}
              <div className="mt-4">
                <label className="block text-sm mb-2 text-gray-200">Send OTP via</label>

                <div className="flex gap-6 items-center text-gray-300 text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="otpChannel"
                      value="email"
                      checked={otpChannel === "email"}
                      onChange={(e) => setOtpChannel(e.target.value)}
                      className="accent-cyan-400"
                    />
                    Email
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="otpChannel"
                      value="phone"
                      checked={otpChannel === "phone"}
                      onChange={(e) => setOtpChannel(e.target.value)}
                      className="accent-cyan-400"
                    />
                    Phone (SMS)
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold 
                    text-white hover:scale-[1.02] transition-transform disabled:opacity-70 text-sm sm:text-base"
              >
                {loading ? "Creating Account..." : "Register"}
              </button>

            </form>
          ) : (
            // =======================
            // OTP VERIFY FORM
            // =======================
            <form onSubmit={handleVerifyOtp} className="space-y-5">

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
                className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 font-semibold 
                    text-white hover:scale-[1.02] transition-transform disabled:opacity-70 text-sm sm:text-base"
              >
                Verify OTP
              </button>
            </form>
          )}

          {/* OR Separator */}
          {!otpSent ? (
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-400/40"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-black px-3 text-gray-300">OR</span>
              </div>
            </div>
          ) : null }

          {/* Google Authentication */}
          {!otpSent ? (
            <button
            onClick={() => {
              window.location.href = `${API_BASE}/api/auth/google`;
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
                Register with Google
              </span>
            </div>
          </button>
          ) : null }
          
          {/* Login Redirect */}
          {!otpSent ? (
            <p className="text-sm text-center mt-5 text-gray-300">
              Already have an account?{" "}
              <a
                href="/auth/login"
                className="text-blue-400 hover:text-cyan-300 font-medium transition-colors"
              >
                Login
              </a>
            </p>
          ) : null }
        

      </div>

      {/* Footer */}
      <p className="text-gray-500 text-xs mt-6 mb-4 text-center z-10">
        © 2025 CFO Craft Inc. All rights reserved.
      </p>

    </div>
  );
}
