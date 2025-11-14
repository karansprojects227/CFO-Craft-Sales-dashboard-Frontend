"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function useAuthCheck() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/protected", {
          method: "GET",
          credentials: "include", // sends cookie automatically
        });

        if (res.ok) {
          const data = await res.json();
          console.log("✅ Auth verified:", data);
          setAuthenticated(true);
        } else {
          console.log("❌ Not authorized. Redirecting to login...");
          router.push("/auth/login");
        }
      } catch (err) {
        console.error("Error verifying auth:", err);
        router.push("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  return { loading, authenticated };
}
