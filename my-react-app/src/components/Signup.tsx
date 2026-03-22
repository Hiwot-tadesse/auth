import { useState } from "react";
import axios from "axios";
// @ts-ignore
import { User, Lock, ArrowRight, Eye, EyeOff, Home } from "lucide-react";

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

  // 🎨 Color variables for easy theming
  const colors = {
    primary: "#4f46e5",        // Indigo-600
    primaryHover: "#4338ca",   // Indigo-700
    primarySoft: "rgba(79,70,229,0.15)",
    primaryShadow: "rgba(79,70,229,0.35)",
    bgStart: "#1e3a5f",        // Deep blue
    bgEnd: "#4f46e5",          // Indigo
    cardBg: "rgba(255,255,255,0.98)",
    textPrimary: "#1f2937",
    textSecondary: "#6b7280",
    border: "#e5e7eb",
    error: "#dc2626",
    errorBg: "rgba(220,38,38,0.1)",
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
      background: `linear-gradient(135deg, ${colors.bgStart} 0%, ${colors.bgEnd} 100%)`,
      backgroundSize: "200% 200%",
      animation: "gradient-shift 20s ease infinite",
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      position: "relative",
      overflow: "hidden"
    }}>
      
      {/* 🌊 Subtle Background Decorations */}
      <div style={{
        position: "absolute",
        top: "15%",
        right: "10%",
        width: "200px",
        height: "200px",
        background: "radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(30px)",
        animation: "float 10s ease-in-out infinite",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute",
        bottom: "20%",
        left: "15%",
        width: "150px",
        height: "150px",
        background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(25px)",
        animation: "float 8s ease-in-out infinite reverse",
        pointerEvents: "none"
      }} />

      {/* 🎴 Login Card */}
      <div style={{
        width: "100%",
        maxWidth: "420px",
        padding: "40px 36px",
        background: colors.cardBg,
        borderRadius: "24px",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow: "0 25px 80px -30px rgba(0,0,0,0.35)",
        position: "relative",
        zIndex: 10,
        animation: "fadeSlideUp 0.6s ease-out",
        transition: "transform 0.3s ease, box-shadow 0.3s ease"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 35px 90px -35px rgba(0,0,0,0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 25px 80px -30px rgba(0,0,0,0.35)";
      }}
      >
        
        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "60px",
            height: "60px",
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryHover} 100%)`,
            borderRadius: "18px",
            marginBottom: "18px",
            boxShadow: `0 12px 35px -8px ${colors.primaryShadow}`
          }}>
            <Home size={28} color="#fff" strokeWidth={2.5} />
          </div>
          <h2 style={{ 
            margin: "0 0 8px", 
            fontSize: "24px", 
            fontWeight: "700", 
            color: colors.textPrimary
          }}>
            Welcome back
          </h2>
          <p style={{ 
            margin: 0, 
            fontSize: "14px", 
            color: colors.textSecondary,
            lineHeight: 1.5
          }}>
            Sign in to your myHome account
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          
          {/* Username Field */}
          <div>
            <label style={{
              display: "block",
              fontSize: "13px",
              fontWeight: "600",
              color: colors.textPrimary,
              marginBottom: "8px",
              marginLeft: "4px"
            }}>
              Username
            </label>
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: focused === "username" ? colors.primary : "#9ca3af",
                transition: "color 0.2s ease"
              }}>
                <User size={18} />
              </div>
              <input
                type="text"
                placeholder="Enter your username"
                value={form.username}
                onChange={(e) => {
                  setForm({ ...form, username: e.target.value });
                  if (error) setError("");
                }}
                onFocus={() => setFocused("username")}
                onBlur={() => setFocused(null)}
                style={{
                  width: "100%",
                  padding: "14px 16px 14px 46px",
                  borderRadius: "14px",
                  border: `2px solid ${error ? colors.error : focused === "username" ? colors.primary : colors.border}`,
                  backgroundColor: focused === "username" ? "#f9fafb" : "#fff",
                  color: colors.textPrimary,
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.25s ease",
                  boxShadow: focused === "username" && !error ? `0 0 0 4px ${colors.primarySoft}` : "none"
                }}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label style={{
              display: "block",
              fontSize: "13px",
              fontWeight: "600",
              color: colors.textPrimary,
              marginBottom: "8px",
              marginLeft: "4px"
            }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute",
                left: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: focused === "password" ? colors.primary : "#9ca3af",
                transition: "color 0.2s ease"
              }}>
                <Lock size={18} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                  if (error) setError("");
                }}
                onFocus={() => setFocused("password")}
                onBlur={() => setFocused(null)}
                style={{
                  width: "100%",
                  padding: "14px 50px 14px 46px",
                  borderRadius: "14px",
                  border: `2px solid ${error ? colors.error : focused === "password" ? colors.primary : colors.border}`,
                  backgroundColor: focused === "password" ? "#f9fafb" : "#fff",
                  color: colors.textPrimary,
                  fontSize: "15px",
                  outline: "none",
                  transition: "all 0.25s ease",
                  boxShadow: focused === "password" && !error ? `0 0 0 4px ${colors.primarySoft}` : "none"
                }}
              />
              {/* Toggle Password Visibility */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  color: "#9ca3af",
                  cursor: "pointer",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  transition: "color 0.2s ease"
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = colors.primary}
                onMouseLeave={(e) => e.currentTarget.style.color = "#9ca3af"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div style={{ textAlign: "right", marginTop: "-6px" }}>
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                color: colors.primary,
                fontSize: "13px",
                fontWeight: "600",
                cursor: "pointer",
                padding: 0,
                transition: "color 0.2s ease"
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = colors.primaryHover}
              onMouseLeave={(e) => e.currentTarget.style.color = colors.primary}
              onClick={() => console.log("Forgot password")}
            >
              Forgot password?
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              padding: "12px 16px",
              background: colors.errorBg,
              border: `1px solid rgba(220,38,38,0.25)`,
              borderRadius: "12px",
              color: colors.error,
              fontSize: "13px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              animation: "shake 0.4s ease-in-out"
            }}>
              <div style={{
                width: "5px",
                height: "5px",
                background: colors.error,
                borderRadius: "50%",
                flexShrink: 0
              }} />
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "15px 24px",
              marginTop: "8px",
              borderRadius: "16px",
              border: "none",
              background: loading 
                ? `linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)` 
                : `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryHover} 100%)`,
              color: "#fff",
              fontWeight: "600",
              fontSize: "15px",
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading 
                ? "0 8px 25px rgba(0,0,0,0.1)" 
                : `0 14px 45px -12px ${colors.primaryShadow}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              transition: "all 0.3s ease",
              position: "relative",
              overflow: "hidden"
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = `0 20px 55px -15px ${colors.primaryShadow}`;
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `0 14px 45px -12px ${colors.primaryShadow}`;
              }
            }}
          >
            {loading ? (
              <>
                <span style={{
                  width: "18px",
                  height: "18px",
                  border: "2.5px solid rgba(255,255,255,0.4)",
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
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "14px",
          margin: "26px 0",
          color: "#9ca3af",
          fontSize: "12px",
          fontWeight: "500"
        }}>
          <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)` }} />
          <span>or</span>
          <div style={{ flex: 1, height: "1px", background: `linear-gradient(90deg, transparent, ${colors.border}, transparent)` }} />
        </div>

        {/* Sign Up Prompt */}
        <p style={{ 
          textAlign: "center", 
          color: colors.textSecondary, 
          fontSize: "14px",
          margin: 0
        }}>
          Don't have an account?{" "}
          <button 
            type="button"
            style={{
              background: "none",
              border: "none",
              color: colors.primary,
              fontWeight: "600",
              cursor: "pointer",
              padding: 0,
              fontSize: "14px",
              transition: "color 0.2s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = colors.primaryHover}
            onMouseLeave={(e) => e.currentTarget.style.color = colors.primary}
            onClick={() => window.dispatchEvent(new CustomEvent('switch-to-signup'))}
          >
            Create account →
          </button>
        </p>

      </div>

      {/* 🎵 Animations */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
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