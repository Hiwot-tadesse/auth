"use client";
import { useState } from "react";
// @ts-ignore
import { Home, LogOut, User, Mail, MapPin, Calendar, Edit, Compass, Sparkles, CheckCircle } from "lucide-react";

interface Props {
  user: any;
  type: "login" | "signup";
  onLogout: () => void;
}

export default function Welcome({ user, type, onLogout }: Props) {
  const [showCelebration] = useState(type === "signup");

  const handleLogout = () => {
    onLogout();
  };

  // Format date nicely
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div style={{
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 30%, #f093fb 70%, #f5576c 100%)",
      backgroundSize: "200% 200%",
      // ✅ FIX: Use separate animation properties (not shorthand)
      animationName: "gradient-shift",
      animationDuration: "18s",
      animationTimingFunction: "ease",
      animationIterationCount: "infinite",
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif"
    }}>
      
      {/* 🌊 Animated Background Elements - Fixed Animations */}
      <div style={{
        position: "absolute",
        top: "10%",
        right: "15%",
        width: "180px",
        height: "180px",
        background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(25px)",
        // ✅ Separate animation properties
        animationName: "float",
        animationDuration: "9s",
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute",
        bottom: "15%",
        left: "10%",
        width: "140px",
        height: "140px",
        background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(20px)",
        // ✅ Separate animation properties with direction
        animationName: "float",
        animationDuration: "7s",
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        animationDirection: "reverse",
        pointerEvents: "none"
      }} />

      {/* ✨ Celebration Confetti (for new signups) - Fixed Animation */}
      {showCelebration && (
        <div style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100px",
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          pointerEvents: "none",
          // ✅ Separate animation properties
          animationName: "fadeSlideDown",
          animationDuration: "0.6s",
          animationTimingFunction: "ease-out",
          animationFillMode: "forwards"
        }}>
          {[...Array(5)].map((_, i) => {
            const duration = 0.5 + i * 0.1;
            const delay = i * 0.15;
            return (
              <Sparkles 
                key={i} 
                size={24 + i * 4} 
                color="#fff" 
                style={{
                  // ✅ Separate animation properties (no shorthand + delay conflict)
                  animationName: "bounce",
                  animationDuration: `${duration}s`,
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                  animationDelay: `${delay}s`,
                  opacity: 0.9
                }} 
              />
            );
          })}
        </div>
      )}

      {/* 🏠 Main Content - Fixed Animation */}
      <div style={{
        position: "relative",
        zIndex: 10,
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "24px 20px 40px",
        // ✅ Separate animation properties
        animationName: "fadeSlideUp",
        animationDuration: "0.7s",
        animationTimingFunction: "ease-out",
        animationFillMode: "forwards"
      }}>
        
        {/* Header with Brand + Logout */}
        <header style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 20px",
          marginBottom: "28px"
        }}>
          {/* Brand */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "52px",
              height: "52px",
              background: "rgba(255,255,255,0.22)",
              backdropFilter: "blur(14px)",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.35)",
              boxShadow: "0 10px 40px rgba(0,0,0,0.12)"
            }}>
              <Home size={26} color="#fff" strokeWidth={2.5} />
            </div>
            <div>
              <h1 style={{ 
                margin: 0, 
                color: "#fff", 
                fontSize: "22px", 
                fontWeight: "800",
                letterSpacing: "-0.5px",
                textShadow: "0 2px 10px rgba(0,0,0,0.15)"
              }}>
                myHome
              </h1>
              <p style={{ 
                margin: "3px 0 0", 
                color: "rgba(255,255,255,0.92)", 
                fontSize: "13px",
                fontWeight: "500"
              }}>
                Find your perfect space
              </p>
            </div>
          </div>
          
          {/* Logout Button */}
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 22px",
              background: "rgba(255,255,255,0.18)",
              backdropFilter: "blur(12px)",
              color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.4)",
              borderRadius: "14px",
              fontWeight: "600",
              fontSize: "14px",
              cursor: "pointer",
              transition: "all 0.25s ease",
              boxShadow: "0 6px 20px rgba(0,0,0,0.1)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.28)";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.18)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.1)";
            }}
          >
            <LogOut size={16} />
            Logout
          </button>
        </header>

        {/* 🎉 Welcome Banner - Fixed Animation */}
        <div style={{
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(20px)",
          borderRadius: "28px",
          padding: "32px 28px",
          marginBottom: "24px",
          border: "1px solid rgba(255,255,255,0.5)",
          boxShadow: "0 25px 80px -20px rgba(0,0,0,0.25)",
          // ✅ Separate animation properties with delay
          animationName: "scaleIn",
          animationDuration: "0.5s",
          animationTimingFunction: "ease-out",
          animationDelay: "0.1s",
          animationFillMode: "both"
        }}>
          <div style={{ textAlign: "center" }}>
            {/* Status Badge */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 22px",
              background: type === "signup" 
                ? "linear-gradient(135deg, #10b981 0%, #059669 100%)" 
                : "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
              borderRadius: "50px",
              marginBottom: "20px",
              boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
            }}>
              <CheckCircle size={18} color="#fff" />
              <span style={{ 
                color: "#fff", 
                fontSize: "14px", 
                fontWeight: "700",
                letterSpacing: "0.3px"
              }}>
                {type === "signup" ? "🎉 Account Created!" : "✨ Welcome Back!"}
              </span>
            </div>
            
            {/* Welcome Message */}
            <h2 style={{ 
              margin: "0 0 12px", 
              fontSize: "32px", 
              fontWeight: "800",
              color: "#1f2937",
              lineHeight: 1.2
            }}>
              Hello, <span style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>
                {user.fullname?.split(' ')[0] || user.username || 'Friend'}!
              </span> 👋
            </h2>
            
            <p style={{ 
              margin: 0, 
              color: "#6b7280", 
              fontSize: "16px",
              maxWidth: "520px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: 1.6
            }}>
              {type === "signup" 
                ? "Your account is all set! Start exploring amazing homes and find the perfect place to call yours."
                : "Great to see you again! Ready to discover your next favorite space?"}
            </p>
          </div>
        </div>

        {/* 👤 Profile Information Card - Fixed Animation */}
        <div style={{
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(20px)",
          borderRadius: "28px",
          padding: "28px",
          border: "1px solid rgba(255,255,255,0.5)",
          boxShadow: "0 25px 80px -20px rgba(0,0,0,0.25)",
          // ✅ Separate animation properties with delay
          animationName: "scaleIn",
          animationDuration: "0.5s",
          animationTimingFunction: "ease-out",
          animationDelay: "0.2s",
          animationFillMode: "both"
        }}>
          <h3 style={{ 
            margin: "0 0 24px", 
            fontSize: "20px", 
            fontWeight: "700",
            color: "#1f2937",
            display: "flex",
            alignItems: "center",
            gap: "10px"
          }}>
            <User size={20} color="#667eea" />
            Your Profile
          </h3>
          
          {/* Profile Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "16px"
          }}>
            {user.fullname && (
              <ProfileField 
                icon={<User size={18} />}
                label="Full Name"
                value={user.fullname}
                color="#667eea"
              />
            )}
            {user.username && (
              <ProfileField 
                icon={<User size={18} />}
                label="Username"
                value={user.username}
                color="#764ba2"
              />
            )}
            {user.email && (
              <ProfileField 
                icon={<Mail size={18} />}
                label="Email Address"
                value={user.email}
                color="#f093fb"
              />
            )}
            {user.location && (
              <ProfileField 
                icon={<MapPin size={18} />}
                label="Location"
                value={user.location}
                color="#f5576c"
              />
            )}
            {user.birthdate && (
              <ProfileField 
                icon={<Calendar size={18} />}
                label="Birth Date"
                value={formatDate(user.birthdate)}
                color="#6366f1"
              />
            )}
          </div>

          {/* Action Buttons */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "14px",
            marginTop: "32px",
            paddingTop: "24px",
            borderTop: "1px solid rgba(0,0,0,0.06)"
          }}>
            <ActionButton 
              icon={<Compass size={18} />}
              text="Explore Homes"
              gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
              onClick={() => console.log("Explore clicked")}
            />
            <ActionButton 
              icon={<Edit size={18} />}
              text="Edit Profile"
              gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
              onClick={() => console.log("Edit clicked")}
            />
          </div>
        </div>

        {/* 💭 Inspirational Quote - Fixed Animation */}
        <div style={{
          marginTop: "28px",
          textAlign: "center",
          // ✅ Separate animation properties with delay
          animationName: "fadeSlideUp",
          animationDuration: "0.6s",
          animationTimingFunction: "ease-out",
          animationDelay: "0.3s",
          animationFillMode: "forwards"
        }}>
          <div style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(12px)",
            borderRadius: "20px",
            padding: "20px 24px",
            border: "1px solid rgba(255,255,255,0.3)",
            display: "inline-block",
            maxWidth: "600px"
          }}>
            <p style={{ 
              margin: 0, 
              color: "#fff", 
              fontSize: "16px", 
              fontWeight: "600",
              fontStyle: "italic",
              lineHeight: 1.5,
              textShadow: "0 1px 3px rgba(0,0,0,0.2)"
            }}>
              "Home is not a place, it's a feeling. Find the space that feels like you."
            </p>
          </div>
        </div>

      </div>

      {/* 🎵 Global Animations - Keyframes only (no changes needed) */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-12px) scale(1.02); }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}

// 🧩 Reusable Profile Field Component
function ProfileField({ icon, label, value, color }: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  color: string;
}) {
  return (
    <div style={{
      display: "flex",
      alignItems: "flex-start",
      gap: "14px",
      padding: "18px 20px",
      background: "linear-gradient(135deg, rgba(248,250,252,0.8) 0%, rgba(241,245,249,0.8) 100%)",
      borderRadius: "18px",
      border: "1.5px solid rgba(0,0,0,0.05)",
      transition: "all 0.2s ease"
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = "translateY(-3px)";
      e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,0.08)";
      e.currentTarget.style.borderColor = `${color}30`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "none";
      e.currentTarget.style.borderColor = "rgba(0,0,0,0.05)";
    }}
    >
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "40px",
        height: "40px",
        background: `${color}15`,
        borderRadius: "12px",
        color: color,
        flexShrink: 0
      }}>
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{ 
          margin: "0 0 4px", 
          fontSize: "12px", 
          fontWeight: "600", 
          color: "#6b7280",
          textTransform: "uppercase",
          letterSpacing: "0.5px"
        }}>
          {label}
        </p>
        <p style={{ 
          margin: 0, 
          fontSize: "15px", 
          fontWeight: "600", 
          color: "#1f2937",
          wordBreak: "break-word"
        }}>
          {value}
        </p>
      </div>
    </div>
  );
}

// 🧩 Reusable Action Button Component
function ActionButton({ icon, text, gradient, onClick }: {
  icon: React.ReactNode;
  text: string;
  gradient: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        padding: "16px 20px",
        background: gradient,
        color: "#fff",
        border: "none",
        borderRadius: "18px",
        fontWeight: "700",
        fontSize: "15px",
        cursor: "pointer",
        boxShadow: "0 12px 40px -8px rgba(0,0,0,0.25)",
        transition: "all 0.25s ease",
        position: "relative",
        overflow: "hidden"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 20px 55px -10px rgba(0,0,0,0.35)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 12px 40px -8px rgba(0,0,0,0.25)";
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "translateY(-1px) scale(0.99)";
      }}
    >
      {/* Shine effect */}
      <div style={{
        position: "absolute",
        top: 0,
        left: "-100%",
        width: "100%",
        height: "100%",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
        transition: "left 0.5s ease",
      }} 
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.left = "100%";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.left = "-100%";
      }}
      />
      
      {icon}
      <span>{text}</span>
    </button>
  );
}