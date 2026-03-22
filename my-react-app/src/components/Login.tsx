import { useState } from "react";
import axios from "axios";
// @ts-ignore
import { User, Lock, ArrowRight, Eye, EyeOff, Home, Sparkles } from "lucide-react";

interface Form {
  username: string;
  password: string;
}

interface Props {
  onSuccess: (user: any, type: "login") => void;
}

export default function Login({ onSuccess }: Props) {
  const [form, setForm] = useState<Form>({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const validate = () => {
    if (!form.username.trim() || !form.password) {
      setError("Please enter both username and password");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/login", form);
      const user = response.data.user;
      console.log("User logged in:", user);
      localStorage.setItem("token", response.data.token);
      onSuccess(user, "login");
    } catch (err: any) {
      console.error(err.response?.data || err);
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 30%, #f093fb 70%, #f5576c 100%)",
      backgroundSize: "200% 200%",
      animation: "gradient-shift 18s ease infinite",
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      position: "relative",
      overflow: "hidden"
    }}>
      
      {/* 🌊 Animated Background Elements */}
      <div style={{
        position: "absolute",
        top: "20%",
        right: "15%",
        width: "140px",
        height: "140px",
        background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(25px)",
        animation: "float 8s ease-in-out infinite",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute",
        bottom: "25%",
        left: "12%",
        width: "100px",
        height: "100px",
        background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(20px)",
        animation: "float 7s ease-in-out infinite reverse",
        pointerEvents: "none"
      }} />

      {/* ✨ Sparkle particles */}
      {[...Array(5)].map((_, i) => (
        <Sparkles 
          key={i} 
          size={10 + Math.random() * 8} 
          color="rgba(255,255,255,0.5)" 
          style={{
            position: "absolute",
            top: `${15 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
            animation: `pulse ${2 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
            pointerEvents: "none"
          }} 
        />
      ))}

      {/* 🎴 Main Login Card - More Compact */}
      <div style={{
        width: "100%",
        maxWidth: "400px",
        padding: "28px 26px",
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(20px)",
        borderRadius: "24px",
        border: "1px solid rgba(255,255,255,0.5)",
        boxShadow: "0 25px 70px -20px rgba(0,0,0,0.3)",
        position: "relative",
        zIndex: 10,
        animation: "fadeSlideUp 0.6s ease-out",
        transition: "transform 0.3s ease, box-shadow 0.3s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 35px 80px -25px rgba(0,0,0,0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 25px 70px -20px rgba(0,0,0,0.3)";
      }}
      >
        
        {/* Brand Header - Compact */}
        <div style={{ textAlign: "center", marginBottom: "22px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "52px",
            height: "52px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "16px",
            marginBottom: "12px",
            boxShadow: "0 10px 30px -6px rgba(102,126,234,0.4)"
          }}>
            <Home size={24} color="#fff" strokeWidth={2.5} />
          </div>
          <h2 style={{ 
            margin: "0 0 6px", 
            fontSize: "22px", 
            fontWeight: "700", 
            color: "#1f2937",
            letterSpacing: "-0.3px"
          }}>
            Welcome back 👋
          </h2>
          <p style={{ 
            margin: 0, 
            fontSize: "13px", 
            color: "#6b7280",
            lineHeight: 1.4
          }}>
            Sign in to myHome
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          
          {/* Username Field - COMPACT */}
          <div>
            <label style={{
              display: "block",
              fontSize: "12px",
              fontWeight: "600",
              color: "#374151",
              marginBottom: "6px",
              marginLeft: "2px"
            }}>
              Username
            </label>
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: focused === "username" ? "#667eea" : "#9ca3af",
                transition: "color 0.2s ease"
              }}>
                <User size={16} />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={form.username}
                onChange={(e) => {
                  setForm({ ...form, username: e.target.value });
                  if (error) setError("");
                }}
                onFocus={() => setFocused("username")}
                onBlur={() => setFocused(null)}
                style={{
                  width: "100%",
                  padding: "10px 12px 10px 38px",
                  borderRadius: "12px",
                  border: `2px solid ${error ? "#ef4444" : focused === "username" ? "#667eea" : "#e5e7eb"}`,
                  backgroundColor: focused === "username" ? "#f9fafb" : "#fff",
                  color: "#1f2937",
                  fontSize: "14px",
                  outline: "none",
                  transition: "all 0.2s ease",
                  boxShadow: focused === "username" && !error ? "0 0 0 4px rgba(102,126,234,0.1)" : "none",
                  height: "40px",
                  boxSizing: "border-box"
                }}
              />
            </div>
          </div>

          {/* Password Field - COMPACT */}
          <div>
            <label style={{
              display: "block",
              fontSize: "12px",
              fontWeight: "600",
              color: "#374151",
              marginBottom: "6px",
              marginLeft: "2px"
            }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: focused === "password" ? "#667eea" : "#9ca3af",
                transition: "color 0.2s ease"
              }}>
                <Lock size={16} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                  if (error) setError("");
                }}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
                style={{
                  width: "100%",
                  padding: "10px 40px 10px 38px",
                  borderRadius: "12px",
                  border: `2px solid ${error ? "#ef4444" : focused === "password" ? "#667eea" : "#e5e7eb"}`,
                  backgroundColor: focused === "password" ? "#f9fafb" : "#fff",
                  color: "#1f2937",
                  fontSize: "14px",
                  outline: "none",
                  transition: "all 0.2s ease",
                  boxShadow: focused === "password" && !error ? "0 0 0 4px rgba(102,126,234,0.1)" : "none",
                  height: "40px",
                  boxSizing: "border-box"
                }}
              />
              {/* Toggle Password Visibility - Compact */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#9ca3af",
                  cursor: "pointer",
                  padding: "2px",
                  display: "flex",
                  alignItems: "center",
                  transition: "color 0.2s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#667eea"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#9ca3af"}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Forgot Password Link - Compact */}
          <div style={{ textAlign: "right", marginTop: "-4px" }}>
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                color: "#667eea",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer",
                padding: 0,
                transition: "color 0.2s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#4f46e5"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#667eea"}
              onClick={() => console.log("Forgot password clicked")}
            >
              Forgot password?
            </button>
          </div>

          {/* Error Message - Compact */}
          {error && (
            <div style={{
              padding: "10px 14px",
              background: "rgba(239,68,68,0.1)",
              border: "1px solid rgba(239,68,68,0.25)",
              borderRadius: "10px",
              color: "#dc2626",
              fontSize: "12px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              animation: "shake 0.4s ease-in-out"
            }}>
              <div style={{
                width: "5px",
                height: "5px",
                background: "#ef4444",
                borderRadius: "50%",
                flexShrink: 0
              }} />
              {error}
            </div>
          )}

          {/* Submit Button - Compact */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px 20px",
              marginTop: "4px",
              borderRadius: "14px",
              border: "none",
              background: loading 
                ? "linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)" 
                : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "#fff",
              fontWeight: "600",
              fontSize: "14px",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading 
                ? "0 6px 20px rgba(0,0,0,0.1)" 
                : "0 12px 40px -10px rgba(102,126,234,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "all 0.25s ease",
              position: "relative",
              overflow: "hidden",
              height: "44px"
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 18px 45px -12px rgba(102,126,234,0.5)";
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 12px 40px -10px rgba(102,126,234,0.4)";
              }
            }}
          >
            {loading ? (
              <>
                <span style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid rgba(255,255,255,0.4)",
                  borderTopColor: "#fff",
                  borderRadius: "50%",
                  animation: "spin 0.8s linear infinite",
                  display: "inline-block"
                }} />
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Divider - Compact */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          margin: "20px 0",
          color: "#9ca3af",
          fontSize: "11px",
          fontWeight: "500"
        }}>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, #e5e7eb, transparent)" }} />
          <span>or</span>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, #e5e7eb, transparent)" }} />
        </div>

        {/* Sign Up Prompt - Compact */}
        <p style={{ 
          textAlign: "center", 
          color: "#6b7280", 
          fontSize: "13px",
          margin: 0
        }}>
          No account?{" "}
          <button 
            type="button"
            style={{
              background: "none",
              border: "none",
              color: "#667eea",
              fontWeight: "600",
              cursor: "pointer",
              padding: 0,
              fontSize: "13px",
              transition: "color 0.2s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#4f46e5"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#667eea"}
            onClick={() => window.dispatchEvent(new CustomEvent('switch-to-signup'))}
          >
            Sign up →
          </button>
        </p>

      </div>

      {/* 🎵 Global Animations */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.02); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.08); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        input::placeholder { color: #9ca3af; }
      `}</style>
    </div>
  );
}