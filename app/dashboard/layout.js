"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  X,
  LogOut,
  Home,
  BarChart3,
  Users,
  Settings,
  UserCircle,
  ShoppingBag,
  User,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { useUser } from "@/context/UserContext";

export default function DashboardLayout({ children }) {
  const { setUser, user } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const fileInputRef = useRef(null);

  // ✅ Check user details exist in DB
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/user/checkUserExist", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        // --- USER EXISTS ---
        if (data.success === true) {
          return; // do nothing
        }

        // --- USER DOES NOT EXIST ---
        toast.error("User does not exist anymore. Please register again.");
        router.replace("/auth/register");

      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Network error!");
        router.replace("/auth/login");
      }
    };

    checkUser();
  }, [router]);

  // ✅ profile click upload image handle
  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  // ✅ send upload images and fecth images
  const handleImageChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;
    
      const formData = new FormData();
      formData.append("profile", file);
      formData.append("id", user._id);
    
      const res = await fetch("http://localhost:5000/upload-profile", {
        method: "POST",
        body: formData,
      });
    
      // ❗ If backend returns any error code (400, 404, 500)
      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
      
        return toast.error(
          errorData?.message || "Upload failed! Something went wrong."
        );
      }
    
      const data = await res.json();
    
      toast.success(data.message);
    
      if (data.user?.profilePic) {
        setUser((prev) => ({
          ...prev,
          profilePic: `http://localhost:5000/uploads/${data.user.profilePic}`,
        }));
      }
    
    } catch (error) {
      console.error("Upload error:", error);
    
      // ❗Network level errors (server off etc.)
      toast.error(error.message || "Failed to upload image!");
    }
  };

  // ✅ Detect mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [router]);

  // ✅ Check authentication before showing UI
  useEffect(() => {
    let hasRun = false; // prevent double run in dev mode

    const checkAuth = async () => {
      if (hasRun) return;
      hasRun = true;

      try {
        const res = await fetch("http://localhost:5000/api/protected", {
          method: "GET",
          credentials: "include",
        });

        const userData = await res.json();

        if (res.ok) {
          setIsAuthenticated(true);
          const userId = userData.user.id;

          try {
            const userDet = await fetch(
              `http://localhost:5000/api/fetchUserData?id=${userId}`,
              {
                method: "GET",
                credentials: "include",
              }
            );

            const userDetails = await userDet.json();

            if (userDetails?.user) {
              setUser(userDetails.user);

              // ✅ Show toast only if it's a fresh login (not a refresh)
              const hasShownToast = sessionStorage.getItem("welcomeShown");
              if (!hasShownToast) {
                toast.success(userData.message);
                toast.success("Welcome back, " + userDetails.user.name + "!");
                sessionStorage.setItem("welcomeShown", "true");
              }
            } else {
              toast.error("Failed to fetch user details");
            }
          } catch (err) {
            console.error("Auth check failed:", err);
            setIsAuthenticated(false);
            toast.error("Access denied! Please Login");
            router.replace("/auth/login");
          }
        } else {
          setIsAuthenticated(false);
          toast.error("Access denied! Please Login");
          router.replace("/auth/login");
        }
      } catch (err) {
        setIsAuthenticated(false);
        toast.error("Access denied! Please Login");
        router.replace("/auth/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, setUser]);
  
  // ✅ Logout function
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        sessionStorage.removeItem("welcomeShown"); // 🧹 reset toast flag
        toast.success("Logout successful!");
        router.replace("/auth/login");
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const links = [
    { name: "Dashboard", href: "/dashboard", icon: <Home className="w-5 h-5" /> },
    { name: "Sales", href: "/dashboard/sales", icon: <ShoppingBag className="w-5 h-5" /> },
    { name: "Analytics", href: "/dashboard/analytics", icon: <BarChart3 className="w-5 h-5" /> },
    { name: "Customers", href: "/dashboard/customers", icon: <Users className="w-5 h-5" /> },
    { name: "Profile", href: "/dashboard/profile", icon: <UserCircle className="w-5 h-5" /> },
    { name: "Settings", href: "/dashboard/settings", icon: <Settings className="w-5 h-5" /> },
  ];

  // 🔒 Don't show anything while checking or unauthenticated
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-950 text-white">
        <motion.div
          className="flex flex-col items-center space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-400 text-sm tracking-wide">Verifying user...</p>
        </motion.div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // 🚫 Prevents dashboard from flashing
  }

  // ✅ Authenticated User Dashboard
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={
          isMobile
            ? {
                x: sidebarOpen ? 0 : "100%",
                width: "100%",
                opacity: sidebarOpen ? 1 : 0,
              }
            : {
                width: sidebarOpen ? 200 : 80,
              }
        }
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 18,
        }}
        className={`bg-gray-900/70 backdrop-blur-xl border-r border-gray-800 flex flex-col overflow-hidden
          ${isMobile ? "fixed top-0 right-0 h-full z-50" : "hidden sm:flex"}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-800">

          {/* 🖼️ Show image only on mobile when sidebar is open */}
          {isMobile && sidebarOpen && (
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src="https://cfocraft.com/wp-content/uploads/2023/04/WhatsApp-Image-2024-06-17-at-5.12.35-PM-1-e1723554014801.jpeg" // ✅ replace with your actual logo path
              alt="CFO Craft Logo"
              className="w-12 rounded-sm object-cover absolute"
            />
          )}

          <motion.h1
            key={sidebarOpen ? "open" : "closed"}
            initial={{ opacity: 0 }}
            animate={{ opacity: sidebarOpen ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="text-xl font-bold whitespace-nowrap pl-14 sm:p-0"
          >
            {sidebarOpen && "CFO CRAFT"}
          </motion.h1>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>

        <nav className="flex flex-col mt-6 space-y-2 px-2">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => isMobile && setSidebarOpen(false)} // auto-close on mobile
              className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200 ease-out ${
                pathname === link.href
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {link.icon}
              <AnimatePresence>
                {sidebarOpen && (
                  <motion.span
                    key={link.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {link.name}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          ))}
        </nav>

        <div className="mt-auto border-t border-gray-800 p-4">
          <motion.button
            whileHover={{ scale: 0.97 }}
            whileTap={{ scale: 0.93 }}
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full px-4 py-2 bg-red-600/90 hover:bg-red-700 rounded-lg transition-all cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Logout</span>}
          </motion.button>
        </div>
      </motion.aside>
        
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="bg-gray-900/60 backdrop-blur-lg px-6 py-4 border-b border-gray-800 flex items-center justify-between z-10">
          <h2 className="text-lg font-semibold tracking-wide">
            {pathname.split("/")[2]?.toUpperCase() || "DASHBOARD"}
          </h2>
          <input
            className="bg-gray-800/80 border border-gray-700 rounded-md py-1.5 px-3.5 outline-none text-sm text-gray-300 hidden sm:block focus:border-blue-500"
            type="search"
            placeholder="Search..."
          />
          <div className="flex items-center space-x-4">
            <span className="text-gray-400 hidden sm:inline">
              Welcome, {user.name}
            </span>

            {/* Profile Image OR Default Icon */}
            {user.profilePic !== "default-user" ? (
              <img
                src={user.profilePic}
                alt="profile"
                onClick={handleImageClick}
                className="w-10 h-10 rounded-full border border-gray-700 cursor-pointer hover:opacity-80 object-cover"
                onError={(e) => {
                  e.target.onerror = null; // avoid infinite loop
                  setUser((prev) => ({ ...prev, profilePic: "default-user" }));
                }}
              />
            ) : (
              <div
                onClick={handleImageClick}
                className="w-10 h-10 rounded-full border border-gray-700 cursor-pointer hover:opacity-80 flex items-center justify-center bg-gray-800"
              >
                <User className="w-6 h-6 text-gray-400" />
              </div>
            )}

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
              name="profile"
            />

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setSidebarOpen(true)}
              className="text-gray-400 hover:text-white transition-colors cursor-pointer block sm:hidden"
            >
              <Menu size={20} />
            </motion.button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
