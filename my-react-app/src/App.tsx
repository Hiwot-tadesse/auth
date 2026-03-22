import { useState, useEffect } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
// @ts-ignore
import { Home, Sparkles, ArrowLeft, ArrowRight } from "lucide-react";

type Page = "signup" | "login" | "welcome";

export default function App() {
  const [page, setPage] = useState<Page>("signup");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [actionType, setActionType] = useState<"signup" | "login">("signup");
  const [mounted, setMounted] = useState(false);
  const [pageTransition, setPageTransition] = useState<"enter" | "exit">("enter");

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSuccess = (user: any, type: "signup" | "login") => {
    setCurrentUser(user);
    setActionType(type);
    setPageTransition("exit");
    setTimeout(() => {
      setPage("welcome");
      setPageTransition("enter");
    }, 200);
  };

  const handlePageChange = (newPage: Page) => {
    setPageTransition("exit");
    setTimeout(() => {
      setPage(newPage);
      setPageTransition("enter");
    }, 200);
  };

  // 🎨 Background gradient animation keyframes
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes gradient-shift {
        0%, 100% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-10px) rotate(2deg); }
      }
      @keyframes pulse-soft {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 0.9; }
      }
      .animate-gradient { animation: gradient-shift 12s ease infinite; background-size: 200% 200%; }
      .animate-float { animation: float 6s ease-in-out infinite; }
      .animate-pulse-soft { animation: pulse-soft 3s ease-in-out infinite; }
      .page-enter { animation: fadeSlideIn 0.4s ease-out forwards; }
      .page-exit { animation: fadeSlideOut 0.3s ease-in forwards; }
      @keyframes fadeSlideIn {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes fadeSlideOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-12px); }
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      position: "relative",
      overflow: "hidden",
      fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif"
    }}>
      
      {/* 🌌 Animated Mesh Gradient Background */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(-45deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #667eea 100%)",
        backgroundSize: "200% 200%",
        animation: "gradient-shift 15s ease infinite"
      }} />

      {/* ✨ Floating Decorative Elements */}
      <div style={{
        position: "absolute",
        top: "15%",
        right: "12%",
        width: "140px",
        height: "140px",
        background: "radial-gradient(circle, rgba(255,255,255,0.25) 0%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(20px)",
        animation: "float 8s ease-in-out infinite",
        pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute",
        bottom: "20%",
        left: "8%",
        width: "100px",
        height: "100px",
        background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(15px)",
        animation: "float 7s ease-in-out infinite reverse",
        pointerEvents: "none"
      }} />
      
      {/* ✨ Sparkle particles */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          top: `${15 + Math.random() * 70}%`,
          left: `${5 + Math.random() * 90}%`,
          width: `${4 + Math.random() * 8}px`,
          height: "4px",
          background: "rgba(255,255,255,0.7)",
          borderRadius: "50%",
          animation: `pulse-soft ${2 + Math.random() * 2}s ease-in-out infinite`,
          animationDelay: `${i * 0.3}s`,
          pointerEvents: "none"
        }} />
      ))}

      {/* 🏠 Branded Header */}
      <header style={{
        position: "relative",
        zIndex: 20,
        padding: "20px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: "1200px",
        margin: "0 auto"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "44px",
            height: "44px",
            background: "rgba(255,255,255,0.2)",
            backdropFilter: "blur(12px)",
            borderRadius: "14px",
            border: "1px solid rgba(255,255,255,0.3)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
          }}>
            <Home size={22} color="#fff" />
          </div>
          <div>
            <h1 style={{ 
              margin: 0, 
              color: "#fff", 
              fontSize: "20px", 
              fontWeight: "700",
              letterSpacing: "-0.3px"
            }}>
              myHome
            </h1>
            <p style={{ 
              margin: "2px 0 0", 
              color: "rgba(255,255,255,0.85)", 
              fontSize: "12px",
              fontWeight: "500"
            }}>
              Find your perfect space
            </p>
          </div>
        </div>
        
        {/* Optional: Theme toggle or language selector could go here */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 14px",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
          borderRadius: "50px",
          border: "1px solid rgba(255,255,255,0.25)"
        }}>
          <Sparkles size={14} color="rgba(255,255,255,0.9)" />
          <span style={{ color: "#fff", fontSize: "12px", fontWeight: "600" }}>
            {page === "welcome" ? "Welcome!" : "Get Started"}
          </span>
        </div>
      </header>

      {/* 🎴 Main Content Area with Page Transitions */}
      <main style={{
        position: "relative",
        zIndex: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 180px)",
        padding: "20px"
      }}>
        <div 
          key={page}
          className={pageTransition === "enter" ? "page-enter" : "page-exit"}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center"
          }}
        >
          {page === "signup" && <Signup onSuccess={handleSuccess} />}
          {page === "login" && <Login onSuccess={handleSuccess} />}
          {page === "welcome" && currentUser && (
            <Welcome user={currentUser} type={actionType} />
          )}
        </div>
      </main>

      {/* 🔄 Bottom CTA Navigation - Enhanced */}
      {page !== "welcome" && (
        <div style={{
          position: "fixed",
          bottom: "24px",
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          zIndex: 30,
          padding: "0 16px"
        }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            padding: "14px 20px",
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(16px)",
            borderRadius: "20px",
            border: "1px solid rgba(255,255,255,0.35)",
            boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
            animation: mounted ? "fadeSlideIn 0.5s ease-out" : "none"
          }}>
            {/* Icon */}
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "36px",
              height: "36px",
              background: "rgba(255,255,255,0.25)",
              borderRadius: "10px"
            }}>
              {page === "signup" ? (
                <ArrowLeft size={18} color="#fff" />
              ) : (
                <ArrowRight size={18} color="#fff" />
              )}
            </div>
            
            {/* Text */}
            <div style={{ textAlign: "left" }}>
              <p style={{ 
                margin: 0, 
                color: "#fff", 
                fontSize: "13px", 
                fontWeight: "600",
                lineHeight: 1.3
              }}>
                {page === "signup" 
                  ? "Already have an account?" 
                  : "New to myHome?"}
              </p>
              <p style={{ 
                margin: "2px 0 0", 
                color: "rgba(255,255,255,0.85)", 
                fontSize: "12px" 
              }}>
                {page === "signup" 
                  ? "Sign in to continue" 
                  : "Create your free account"}
              </p>
            </div>

            {/* Action Button */}
            <button 
              onClick={() => handlePageChange(page === "signup" ? "login" : "signup")}
              style={{
                padding: "10px 20px",
                background: "linear-gradient(135deg, #fff 0%, #f8f9ff 100%)",
                color: "#667eea",
                border: "none",
                borderRadius: "14px",
                fontWeight: "700",
                fontSize: "13px",
                cursor: "pointer",
                boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                transition: "all 0.25s ease",
                display: "flex",
                alignItems: "center",
                gap: "6px"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 12px 35px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = "translateY(0) scale(0.98)";
              }}
            >
              {page === "signup" ? "Sign In" : "Sign Up"}
              {page === "signup" ? <ArrowRight size={14} /> : <ArrowRight size={14} />}
            </button>
          </div>
        </div>
      )}

      {/* 🎵 Subtle overlay for depth */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at center, transparent 0%, rgba(15,10,41,0.25) 100%)",
        pointerEvents: "none",
        zIndex: 5
      }} />
    </div>
  );
}