import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader, Palette } from "lucide-react";
import API from "../services/api";

const VerifyEmail = () => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [status, setStatus]   = useState("loading");
    const [message, setMessage] = useState("");
    const [debugInfo, setDebugInfo] = useState("");

    useEffect(() => {
        if (!token) {
            setStatus("error");
            setMessage("No verification token found in the link.");
            return;
        }

        console.log("[VerifyEmail] token:", token);

        // Use the shared API service — reads VITE_API_URL (Railway URL in production)
        API.get(`/auth/verify-email?token=${encodeURIComponent(token)}`)
            .then((res) => {
                console.log("[VerifyEmail] success:", res.data);
                const msg = res.data || "";
                if (msg.toLowerCase().includes("already")) {
                    setStatus("already");
                } else {
                    setStatus("success");
                }
                setMessage(msg);
            })
            .catch((err) => {
                const httpStatus = err?.response?.status;
                const errData    = err?.response?.data;
                console.error("[VerifyEmail] error:", httpStatus, errData, err.message);
                setStatus("error");
                setMessage(
                    (typeof errData === "string" ? errData : errData?.message) ||
                    "Invalid or expired verification link."
                );
            });
    }, [token]);

    const Icon = () => {
        if (status === "loading") return <Loader size={56} className="verify-icon spin" />;
        if (status === "success") return <CheckCircle size={56} className="verify-icon success" />;
        if (status === "already") return <CheckCircle size={56} className="verify-icon gold" />;
        return <XCircle size={56} className="verify-icon error" />;
    };

    const title = {
        loading: "Verifying your email…",
        success: "Email Verified! 🎉",
        already: "Already Verified",
        error: "Verification Failed",
    }[status];

    return (
        <div className="auth-page page-wrapper">
            <div className="auth-bg">
                <img
                    src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=80"
                    alt=""
                    className="auth-bg-img"
                />
                <div className="auth-bg-overlay" />
            </div>

            <div className="container auth-container">
                <motion.div
                    className="auth-card glass-card"
                    initial={{ opacity: 0, y: 30, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: "center", padding: "3rem 2rem" }}
                >
                    {/* Logo */}
                    <Link to="/" className="navbar-logo" style={{ justifyContent: "center", marginBottom: "2rem" }}>
                        <Palette size={22} />
                        <span className="logo-text">Art<span className="italic">Gallery</span></span>
                    </Link>

                    {/* Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                        style={{ marginBottom: "1.5rem" }}
                    >
                        <Icon />
                    </motion.div>

                    <h2 className="auth-title" style={{ marginBottom: "1rem" }}>{title}</h2>

                    {status !== "loading" && (
                        <>
                            <p style={{ color: "var(--text-muted)", marginBottom: "1rem", lineHeight: 1.6 }}>
                                {message}
                            </p>

                            {/* Debug info — shows exact error from backend */}
                            {debugInfo && (
                                <p style={{
                                    fontSize: "0.75rem",
                                    color: "#f87171",
                                    background: "rgba(239,68,68,0.1)",
                                    border: "1px solid rgba(239,68,68,0.2)",
                                    borderRadius: "0.5rem",
                                    padding: "0.5rem 0.75rem",
                                    marginBottom: "1.5rem",
                                    wordBreak: "break-all",
                                    textAlign: "left"
                                }}>
                                    🔍 <strong>Debug:</strong> {debugInfo}
                                </p>
                            )}

                            {(status === "success" || status === "already") && (
                                <Link to="/login" className="btn btn-primary btn-lg">
                                    Go to Login
                                </Link>
                            )}

                            {status === "error" && (
                                <Link to="/register" className="btn btn-outline btn-lg">
                                    Register Again
                                </Link>
                            )}
                        </>
                    )}
                </motion.div>
            </div>

            {/* Minimal inline styles for the new icons */}
            <style>{`
                .verify-icon { display: block; margin: 0 auto; }
                .verify-icon.success { color: #22c55e; }
                .verify-icon.gold    { color: #f59e0b; }
                .verify-icon.error   { color: #ef4444; }
                .verify-icon.spin    { color: var(--gold); animation: spin 1s linear infinite; }
                @keyframes spin { to { transform: rotate(360deg); } }
            `}</style>
        </div>
    );
};

export default VerifyEmail;
