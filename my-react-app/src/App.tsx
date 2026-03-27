// App.tsx
"use client";
import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import ProtectedRoute from "./components/ProtectedRoute";
import axios from "axios";
import { Home, Sparkles } from "lucide-react";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [actionType, setActionType] = useState<"signup" | "login">("signup");

  // 🔐 Check for existing valid session on app mount
  useEffect(() => {
    const checkExistingSession = async () => {
      const token = localStorage.getItem('token');
      const expiry = localStorage.getItem('tokenExpiry');
      const remembered = localStorage.getItem('rememberMe');
      
      if (token && expiry && Date.now() < parseInt(expiry) && remembered === 'true') {
        try {
          await axios.get('http://localhost:5000/api/auth/verify', {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          const response = await axios.get('http://localhost:5000/api/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          setCurrentUser(response.data.user);
          setActionType('login');
          navigate('/welcome');
        } catch {
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExpiry');
          localStorage.removeItem('rememberMe');
        }
      }
    };
    
    checkExistingSession();
  }, [navigate]);

  const handleSuccess = (user: any, type: "signup" | "login") => {
    setCurrentUser(user);
    setActionType(type);
    navigate('/welcome');
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiry");
    localStorage.removeItem("rememberMe");
    setCurrentUser(null);
    navigate('/login');
  };

  // 🎨 Background animations
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes gradient-shift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
      @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      @keyframes pulse-soft { 0%, 100% { opacity: 0.6; } 50% { opacity: 0.9; } }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden", fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif" }}>
      
      {/* Background */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(-45deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #667eea 100%)", backgroundSize: "200% 200%", animation: "gradient-shift 15s ease infinite" }} />
      
      {/* Decorative elements */}
      <div style={{ position: "absolute", top: "15%", right: "12%", width: "140px", height: "140px", background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(20px)", animation: "float 8s ease-in-out infinite", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "20%", left: "8%", width: "100px", height: "100px", background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(15px)", animation: "float 7s ease-in-out infinite reverse", pointerEvents: "none" }} />
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{ position: "absolute", top: `${15 + Math.random() * 70}%`, left: `${5 + Math.random() * 90}%`, width: `${4 + Math.random() * 8}px`, height: "4px", background: "rgba(255,255,255,0.7)", borderRadius: "50%", animation: `pulse-soft ${2 + Math.random() * 2}s ease-in-out infinite`, animationDelay: `${i * 0.3}s`, pointerEvents: "none" }} />
      ))}

      {/* Header */}
      <header style={{ position: "relative", zIndex: 20, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(12px)", borderRadius: "14px", border: "1px solid rgba(255,255,255,0.3)", boxShadow: "0 8px 32px rgba(0,0,0,0.1)" }}>
            <Home size={22} color="#fff" />
          </div>
          <div>
            <h1 style={{ margin: 0, color: "#fff", fontSize: "20px", fontWeight: "700" }}>myHome</h1>
            <p style={{ margin: "2px 0 0", color: "rgba(255,255,255,0.85)", fontSize: "12px" }}>Find your perfect space</p>
          </div>
        </div>
        
        {location.pathname === "/welcome" ? (
          <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 16px", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "12px", fontSize: "12px", fontWeight: "600", cursor: "pointer" }}>
            Logout
          </button>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "6px 14px", background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", borderRadius: "50px", border: "1px solid rgba(255,255,255,0.25)" }}>
            <Sparkles size={14} color="rgba(255,255,255,0.9)" />
            <span style={{ color: "#fff", fontSize: "12px", fontWeight: "600" }}>Get Started</span>
          </div>
        )}
      </header>

      {/* Main Content with Routes */}
      <main style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "calc(100vh - 180px)", padding: "20px" }}>
        <Routes>
          {/* Redirect root to signup */}
          <Route path="/" element={<Navigate to="/signup" replace />} />
          
          {/* Signup Route - Pass navigate callback */}
          <Route path="/signup" element={
            <Signup 
              onSuccess={handleSuccess} 
            />
          } />
          
          {/* Login Route - Pass navigate callback */}
          <Route path="/login" element={
            <Login 
              onSuccess={handleSuccess}
            />
          } />
          
          {/* Welcome Route - Protected */}
          <Route path="/welcome" element={
            <ProtectedRoute>
              <Welcome user={currentUser} type={actionType} onLogout={handleLogout} />
            </ProtectedRoute>
          } />
        </Routes>
      </main>

      {/* Overlay */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 0%, rgba(15,10,41,0.25) 100%)", pointerEvents: "none", zIndex: 5 }} />
    </div>
  );
}