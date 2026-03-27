// components/ProtectedRoute.tsx
"use client";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      const expiry = localStorage.getItem("tokenExpiry");
      
      // No token = redirect to login
      if (!token) {
        navigate("/login", { replace: true, state: { from: location.pathname } });
        return;
      }
      
      // Token expired = clear and redirect
      if (expiry && Date.now() > parseInt(expiry)) {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        localStorage.removeItem("rememberMe");
        navigate("/login", { replace: true });
        return;
      }
      
      try {
        // Verify token with backend
        await axios.get("http://localhost:5000/api/auth/verify", {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 5000 // 5 second timeout
        });
        setAuthorized(true);
      } catch (error: any) {
        console.warn("Token verification failed:", error.message);
        
        // Only redirect if it's a 401/403 (invalid token), not network errors
        if (error.response?.status === 401 || error.response?.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("tokenExpiry");
          navigate("/login", { replace: true });
        } else {
          // Network error? Allow access temporarily (optimistic)
          setAuthorized(true);
        }
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, [navigate, location]);

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      }}>
        <div style={{ 
          width: "40px", 
          height: "40px", 
          border: "3px solid rgba(255,255,255,0.3)", 
          borderTopColor: "#fff", 
          borderRadius: "50%", 
          animation: "spin 0.8s linear infinite" 
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  // Only block if explicitly unauthorized
  if (!authorized) return null;
  
  return <>{children}</>;
}