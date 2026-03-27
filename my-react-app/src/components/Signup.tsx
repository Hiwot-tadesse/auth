"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { User, Mail, Lock, MapPin, Calendar, ArrowRight, Eye, EyeOff, Home, Sparkles, CheckCircle, Shield, AlertCircle } from "lucide-react";

interface Form {
  fullname: string;
  username: string;
  email: string;
  password: string;
  location: string;
  birthdate: string;
}

interface Props {
  onSuccess: (user: Form, type: "signup") => void;
}

export default function Signup({ onSuccess }: Props) {
  const navigate = useNavigate();
  const [form, setForm] = useState<Form>({
    fullname: "", username: "", email: "", password: "", location: "", birthdate: ""
  });
  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const sanitize = (value: string) => value.trim().replace(/[<>]/g, "");

  // 🔐 Strong Password Validation
  const validatePassword = (pwd: string) => {
    const checks = [
      { test: /.{8,}/, label: "8+ characters", passed: false },
      { test: /[a-z]/, label: "Lowercase letter", passed: false },
      { test: /[A-Z]/, label: "Uppercase letter", passed: false },
      { test: /\d/, label: "Number", passed: false },
      { test: /[@$!%*?&]/, label: "Special character", passed: false },
    ];
    
    checks.forEach(check => {
      check.passed = check.test.test(pwd);
    });
    
    const passedCount = checks.filter(c => c.passed).length;
    const strength = passedCount <= 2 ? "weak" : passedCount <= 4 ? "medium" : "strong";
    
    return { checks, strength, passedCount };
  };

  const passwordStrength = validatePassword(form.password);

  const validate = () => {
    let newErrors: any = {};
    if (!form.fullname.trim()) newErrors.fullname = "Required";
    if (!form.username.trim()) newErrors.username = "Required";
    if (!form.email.trim()) newErrors.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = "Invalid email";
    if (!form.password) newErrors.password = "Required";
    else if (passwordStrength.passedCount < 5) newErrors.password = "Password too weak";
    if (!form.location.trim()) newErrors.location = "Required";
    if (!form.birthdate) newErrors.birthdate = "Required";
    if (!acceptTerms) newErrors.terms = "Must accept terms";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError(null);
    
    if (!acceptTerms) {
      setErrors({ terms: "You must accept the terms and conditions" });
      return;
    }
    
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const cleanedForm = {
      fullname: sanitize(form.fullname),
      username: sanitize(form.username),
      email: sanitize(form.email.toLowerCase()),
      password: form.password,
      location: sanitize(form.location),
      birthdate: form.birthdate,
    };

    try {
      setLoading(true);
      
      // ✅ Correct endpoint: /api/auth/signup (matches backend route)
      const res = await axios.post("http://localhost:5000/api/auth/signup", cleanedForm);
      
      // ✅ No verification check - backend sends welcome email in background
      // Just proceed to success (user is auto-logged in with token)
      console.log("✅ User signed up:", res.data.user);
      onSuccess(res.data.user, "signup");
      
    } catch (err: any) {
      console.error("❌ Signup error:", err);
      
      // Handle specific error cases
      if (err.response?.status === 404) {
        setApiError("Server endpoint not found. Please check backend is running.");
      } else if (err.response?.status === 400) {
        setErrors({ general: err.response.data.error || "Invalid input" });
      } else if (err.response?.status === 500) {
        setApiError("Server error. Please try again later.");
      } else {
        setApiError(err.response?.data?.error || "Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { key: "fullname", label: "Full Name", icon: <User size={16} />, type: "text", placeholder: "Full Name" },
    { key: "username", label: "Username", icon: <User size={16} />, type: "text", placeholder: "Username" },
    { key: "email", label: "Email", icon: <Mail size={16} />, type: "email", placeholder: "Email" },
    { key: "password", label: "Password", icon: <Lock size={16} />, type: "password", placeholder: "Password", showToggle: true },
    { key: "location", label: "Location", icon: <MapPin size={16} />, type: "text", placeholder: "Location" },
    { key: "birthdate", label: "Birthdate", icon: <Calendar size={16} />, type: "date", placeholder: "" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 30%, #f093fb 70%, #f5576c 100%)",
      backgroundSize: "200% 200%",
      // ✅ Animation: Separate properties (no shorthand + delay conflict)
      animationName: "gradient-shift",
      animationDuration: "18s",
      animationTimingFunction: "ease",
      animationIterationCount: "infinite",
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
      position: "relative",
      overflow: "hidden"
    }}>
      
      {/* Background Elements - Fixed Animations */}
      <div style={{ 
        position: "absolute", 
        top: "20%", 
        right: "15%", 
        width: "140px", 
        height: "140px", 
        background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)", 
        borderRadius: "50%", 
        filter: "blur(25px)",
        animationName: "float",
        animationDuration: "8s",
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
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
        animationName: "float",
        animationDuration: "7s",
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        animationDirection: "reverse",
        pointerEvents: "none" 
      }} />

      {/* Sparkle Particles - Fixed Animations */}
      {[...Array(5)].map((_, i) => {
        const duration = 2 + Math.random() * 2;
        const delay = i * 0.3;
        return (
          <Sparkles 
            key={i} 
            size={10 + Math.random() * 8} 
            color="rgba(255,255,255,0.5)" 
            style={{ 
              position: "absolute", 
              top: `${15 + Math.random() * 70}%`, 
              left: `${10 + Math.random() * 80}%`,
              // ✅ Separate animation properties (no shorthand + delay conflict)
              animationName: "pulse",
              animationDuration: `${duration}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
              animationDelay: `${delay}s`,
              pointerEvents: "none" 
            }} 
          />
        );
      })}

      {/* Main Card - Fixed Animation */}
      <div style={{
        width: "100%",
        maxWidth: "440px",
        padding: "28px 26px",
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(20px)",
        borderRadius: "24px",
        border: "1px solid rgba(255,255,255,0.5)",
        boxShadow: "0 25px 70px -20px rgba(0,0,0,0.3)",
        position: "relative",
        zIndex: 10,
        // ✅ Separate animation properties
        animationName: "fadeSlideUp",
        animationDuration: "0.6s",
        animationTimingFunction: "ease-out",
        animationFillMode: "forwards"
      }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "52px", height: "52px", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", borderRadius: "16px", marginBottom: "12px", boxShadow: "0 10px 30px -6px rgba(102,126,234,0.4)" }}>
            <Home size={24} color="#fff" strokeWidth={2.5} />
          </div>
          <h2 style={{ margin: "0 0 4px", fontSize: "22px", fontWeight: "700", color: "#1f2937" }}>Create account 👋</h2>
          <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>Join myHome in seconds</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          
          {/* API Error Alert */}
          {apiError && (
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 16px",
              background: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "12px",
              color: "#dc2626",
              fontSize: "13px",
              fontWeight: "500"
            }}>
              <AlertCircle size={16} />
              {apiError}
            </div>
          )}
          
          {/* Name Fields */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {fields.slice(0, 2).map((field) => (
              <div key={field.key}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "6px", marginLeft: "2px" }}>{field.label}</label>
                <CompactInput field={field} value={form[field.key as keyof Form]} onChange={(value) => setForm({ ...form, [field.key]: value })} onFocus={() => setFocused(field.key)} onBlur={() => setFocused(null)} isFocused={focused === field.key} error={errors[field.key]} />
              </div>
            ))}
          </div>

          {/* Email */}
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "6px", marginLeft: "2px" }}>{fields[2].label}</label>
            <CompactInput field={fields[2]} value={form.email} onChange={(value) => setForm({ ...form, email: value })} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} isFocused={focused === "email"} error={errors.email} />
          </div>

          {/* Password with Strength Meter */}
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "6px", marginLeft: "2px" }}>{fields[3].label}</label>
            <CompactInput field={fields[3]} value={form.password} onChange={(value) => setForm({ ...form, password: value })} onFocus={() => setFocused("password")} onBlur={() => setFocused(null)} isFocused={focused === "password"} error={errors.password} showPasswordToggle onTogglePassword={() => setShowPassword(!showPassword)} showPassword={showPassword} />
            
            {/* Password Strength Meter */}
            {form.password && (
              <div style={{ marginTop: "8px", padding: "10px", background: "#f9fafb", borderRadius: "10px", border: "1px solid #e5e7eb" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <Shield size={14} color={passwordStrength.strength === "strong" ? "#10b981" : passwordStrength.strength === "medium" ? "#f59e0b" : "#ef4444"} />
                  <span style={{ fontSize: "11px", fontWeight: "600", color: passwordStrength.strength === "strong" ? "#10b981" : passwordStrength.strength === "medium" ? "#f59e0b" : "#ef4444", textTransform: "uppercase" }}>
                    Strength: {passwordStrength.strength}
                  </span>
                </div>
                <div style={{ display: "flex", gap: "4px", marginBottom: "8px" }}>
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div key={level} style={{ flex: 1, height: "4px", borderRadius: "2px", background: level <= passwordStrength.passedCount ? (passwordStrength.strength === "strong" ? "#10b981" : passwordStrength.strength === "medium" ? "#f59e0b" : "#ef4444") : "#e5e7eb" }} />
                  ))}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
                  {passwordStrength.checks.map((check, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10px", color: check.passed ? "#10b981" : "#9ca3af" }}>
                      <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: check.passed ? "#10b981" : "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {check.passed && <CheckCircle size={8} color="#fff" />}
                      </div>
                      {check.label}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Location & Birthdate */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            {fields.slice(4, 6).map((field) => (
              <div key={field.key}>
                <label style={{ display: "block", fontSize: "12px", fontWeight: "600", color: "#374151", marginBottom: "6px", marginLeft: "2px" }}>{field.label}</label>
                <CompactInput field={field} value={form[field.key as keyof Form]} onChange={(value) => setForm({ ...form, [field.key]: value })} onFocus={() => setFocused(field.key)} onBlur={() => setFocused(null)} isFocused={focused === field.key} error={errors[field.key]} />
              </div>
            ))}
          </div>

          {/* Terms & Conditions */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginTop: "4px" }}>
            <input
              type="checkbox"
              id="terms"
              checked={acceptTerms}
              onChange={(e) => {
                setAcceptTerms(e.target.checked);
                if (errors.terms) setErrors({ ...errors, terms: "" });
              }}
              style={{ width: "16px", height: "16px", marginTop: "2px", accentColor: "#667eea", cursor: "pointer" }}
            />
            <label htmlFor="terms" style={{ fontSize: "12px", color: "#6b7280", lineHeight: 1.4, cursor: "pointer" }}>
              I agree to the <button type="button" style={{ background: "none", border: "none", color: "#667eea", cursor: "pointer", fontWeight: "600", padding: 0, textDecoration: "underline" }}>Terms of Service</button> and <button type="button" style={{ background: "none", border: "none", color: "#667eea", cursor: "pointer", fontWeight: "600", padding: 0, textDecoration: "underline" }}>Privacy Policy</button>
            </label>
          </div>
          {errors.terms && <p style={{ margin: "4px 0 0 28px", color: "#ef4444", fontSize: "11px" }}>{errors.terms}</p>}

          {/* General Error */}
          {errors.general && (
            <div style={{ padding: "10px 14px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.25)", borderRadius: "10px", color: "#dc2626", fontSize: "12px", fontWeight: "500", display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "5px", height: "5px", background: "#ef4444", borderRadius: "50%", flexShrink: 0 }} />
              {errors.general}
            </div>
          )}

          {/* Submit Button */}
          <button type="submit" disabled={loading} style={{ width: "100%", padding: "12px 20px", marginTop: "8px", borderRadius: "14px", border: "none", background: loading ? "linear-gradient(135deg, #9ca3af 0%, #6b7280 100%)" : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "#fff", fontWeight: "600", fontSize: "14px", cursor: loading ? "not-allowed" : "pointer", boxShadow: loading ? "0 6px 20px rgba(0,0,0,0.1)" : "0 12px 40px -10px rgba(102,126,234,0.4)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", height: "44px" }}>
            {loading ? (
              <><span style={{ width: "16px", height: "16px", border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff", borderRadius: "50%", animationName: "spin", animationDuration: "0.8s", animationTimingFunction: "linear", animationIterationCount: "infinite", display: "inline-block" }} />Creating...</>
            ) : (
              <><CheckCircle size={16} />Create Account<ArrowRight size={16} /></>
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "18px 0", color: "#9ca3af", fontSize: "11px", fontWeight: "500" }}>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, #e5e7eb, transparent)" }} /><span>or</span>
          <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, transparent, #e5e7eb, transparent)" }} />
        </div>

        {/* Login Prompt */}
        <p style={{ textAlign: "center", color: "#6b7280", fontSize: "13px", margin: 0 }}>
          Already have an account?{" "}
          <button 
            type="button" 
            style={{
              background: "none",
              border: "none",
              color: "#667eea",
              fontWeight: "700",
              cursor: "pointer",
              padding: 0,
              fontSize: "13px",
              transition: "color 0.2s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#4f46e5"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#667eea"}
            onClick={() => navigate('/login')}
          >
            Sign in →
          </button>
        </p>
      </div>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes gradient-shift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes float { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-8px) scale(1.02); } }
        @keyframes pulse { 0%, 100% { opacity: 0.4; transform: scale(1); } 50% { opacity: 0.9; transform: scale(1.08); } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: #9ca3af; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.5); cursor: pointer; }
      `}</style>
    </div>
  );
}

// Compact Input Component
interface CompactInputProps {
  field: { key: string; label: string; icon: React.ReactNode; type: string; placeholder: string; showToggle?: boolean; };
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  isFocused: boolean;
  error?: string;
  showPasswordToggle?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

function CompactInput({ field, value, onChange, onFocus, onBlur, isFocused, error, showPasswordToggle, showPassword, onTogglePassword }: CompactInputProps) {
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: isFocused ? "#667eea" : "#9ca3af", transition: "color 0.2s ease", pointerEvents: "none" }}>{field.icon}</div>
      <input type={field.type} placeholder={field.placeholder} value={value} onChange={(e) => onChange(e.target.value)} onFocus={onFocus} onBlur={onBlur} style={{ width: "100%", padding: "10px 12px 10px 38px", paddingRight: showPasswordToggle ? "36px" : "12px", borderRadius: "12px", border: `2px solid ${error ? "#ef4444" : isFocused ? "#667eea" : "#e5e7eb"}`, backgroundColor: isFocused ? "#f9fafb" : "#fff", color: "#1f2937", fontSize: "14px", outline: "none", transition: "all 0.2s ease", boxShadow: isFocused && !error ? "0 0 0 4px rgba(102,126,234,0.1)" : "none", height: "40px", boxSizing: "border-box" }} />
      {showPasswordToggle && onTogglePassword && (
        <button type="button" onClick={onTogglePassword} style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#9ca3af", cursor: "pointer", padding: "2px", display: "flex", alignItems: "center" }} onMouseEnter={(e) => e.currentTarget.style.color = "#667eea"} onMouseLeave={(e) => e.currentTarget.style.color = "#9ca3af"}>
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
      {error && <p style={{ margin: "4px 0 0 2px", color: "#ef4444", fontSize: "11px", fontWeight: "500", display: "flex", alignItems: "center", gap: "4px" }}><span style={{ display: "inline-block", width: "4px", height: "4px", background: "#ef4444", borderRadius: "50%" }} />{error}</p>}
    </div>
  );
}