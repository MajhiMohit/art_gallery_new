import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { EXHIBITIONS, ARTWORKS } from "../data/mockData";
import { ArrowRight, Calendar, User, Layers } from "lucide-react";

// Fallback gradient backgrounds per index if image fails
const FALLBACK_GRADIENTS = [
    "linear-gradient(135deg, #1a3a4a 0%, #0d2233 50%, #1b5f7a 100%)",
    "linear-gradient(135deg, #2a1a3a 0%, #1a0d33 50%, #4a1b7a 100%)",
    "linear-gradient(135deg, #1a3a2a 0%, #0d3320 50%, #1b7a4a 100%)",
];

const Exhibitions = () => {
    return (
        <div className="page-wrapper">
            <div className="container" style={{ paddingTop: "3rem", paddingBottom: "4rem" }}>
                <motion.div
                    className="text-center mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <p className="section-eyebrow">Curated Collections</p>
                    <h1 className="section-title italic">Current Exhibitions</h1>
                    <div className="gold-divider" />
                    <p style={{ color: "var(--text-muted)", fontSize: "0.95rem", marginTop: "1rem", maxWidth: "560px", margin: "1rem auto 0" }}>
                        Immerse yourself in thoughtfully curated collections spanning civilizations, mediums, and eras.
                    </p>
                </motion.div>

                <div style={{ display: "flex", flexDirection: "column", gap: "2rem", marginTop: "2.5rem" }}>
                    {EXHIBITIONS.map((ex, i) => {
                        const artworks = ARTWORKS.filter((a) => ex.artworkIds.includes(a.id));

                        // Calculate days remaining
                        const endDate = new Date(ex.endDate);
                        const now = new Date();
                        const daysLeft = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
                        const isActive = daysLeft > 0;
                        const startDate = new Date(ex.startDate);
                        const totalDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
                        const elapsed = Math.ceil((now - startDate) / (1000 * 60 * 60 * 24));
                        const progress = Math.min(100, Math.max(0, (elapsed / totalDays) * 100));

                        return (
                            <motion.div
                                key={ex.id}
                                className="exhibition-detail-card glass-card"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.15 }}
                                style={{ border: ex.featured ? "1px solid rgba(var(--gold-rgb, 27, 175, 209), 0.35)" : undefined }}
                            >
                                {/* Cover Image */}
                                <div className="exhibition-detail-image" style={{ background: FALLBACK_GRADIENTS[i % FALLBACK_GRADIENTS.length] }}>
                                    <img
                                        src={ex.coverImage}
                                        alt={ex.title}
                                        onError={(e) => {
                                            e.target.style.display = "none";
                                        }}
                                    />
                                    {/* Overlay gradient for readability */}
                                    <div style={{
                                        position: "absolute",
                                        inset: 0,
                                        background: "linear-gradient(to right, rgba(9,22,31,0.5) 0%, transparent 60%)",
                                        pointerEvents: "none"
                                    }} />
                                    {ex.featured && (
                                        <span className="badge badge-gold exhibition-featured-badge">✦ Featured</span>
                                    )}
                                    {/* Status badge */}
                                    <span style={{
                                        position: "absolute",
                                        bottom: "1rem",
                                        left: "1rem",
                                        padding: "0.3rem 0.75rem",
                                        borderRadius: "100px",
                                        fontSize: "0.72rem",
                                        fontFamily: "'Space Grotesk', sans-serif",
                                        letterSpacing: "0.08em",
                                        background: isActive ? "rgba(30,160,100,0.85)" : "rgba(160,56,56,0.85)",
                                        color: "#fff",
                                        backdropFilter: "blur(8px)",
                                    }}>
                                        {isActive ? `● On View · ${daysLeft}d left` : "● Concluded"}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="exhibition-detail-content">
                                    <span className="badge badge-gold mb-2">{ex.theme}</span>
                                    <h2 className="font-display" style={{ fontSize: "1.8rem", marginBottom: "0.4rem", lineHeight: 1.2 }}>
                                        {ex.title}
                                    </h2>

                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.4rem" }}>
                                        <User size={13} style={{ color: "var(--text-muted)" }} />
                                        <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", margin: 0 }}>
                                            Curated by <span style={{ color: "var(--gold)" }}>{ex.curator}</span>
                                        </p>
                                    </div>

                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
                                        <Calendar size={13} style={{ color: "var(--text-muted)" }} />
                                        <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                                            {new Date(ex.startDate).toLocaleDateString("en-US", { month: "long", day: "numeric" })} –{" "}
                                            {new Date(ex.endDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                                        </span>
                                    </div>

                                    {/* Progress bar */}
                                    <div style={{ marginBottom: "1.25rem" }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                                            <span style={{ fontSize: "0.7rem", color: "var(--text-muted)", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}>Exhibition Progress</span>
                                            <span style={{ fontSize: "0.7rem", color: "var(--gold)", fontFamily: "'Space Grotesk', sans-serif" }}>{Math.round(progress)}%</span>
                                        </div>
                                        <div style={{ height: "4px", background: "var(--border)", borderRadius: "100px", overflow: "hidden" }}>
                                            <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(to right, var(--gold-light), var(--gold))", borderRadius: "100px", transition: "width 1s ease" }} />
                                        </div>
                                    </div>

                                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
                                        {ex.description}
                                    </p>

                                    {/* Artwork thumbnails */}
                                    <div style={{ marginBottom: "1.5rem" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.6rem" }}>
                                            <Layers size={13} style={{ color: "var(--text-muted)" }} />
                                            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                                                {artworks.length} Artwork{artworks.length !== 1 ? "s" : ""} in Collection
                                            </span>
                                        </div>
                                        <div className="exhibition-artworks-row">
                                            {artworks.slice(0, 4).map((a) => (
                                                <Link key={a.id} to={`/artwork/${a.id}`} className="exhibition-artwork-thumb" title={a.title}>
                                                    <img
                                                        src={a.image}
                                                        alt={a.title}
                                                        onError={(e) => {
                                                            e.target.style.display = "none";
                                                            e.target.parentElement.style.background = "var(--bg-glass)";
                                                        }}
                                                    />
                                                </Link>
                                            ))}
                                            {artworks.length > 4 && (
                                                <span className="exhibition-artwork-more">+{artworks.length - 4}</span>
                                            )}
                                        </div>
                                    </div>

                                    <Link to="/gallery" className="btn btn-outline btn-sm">
                                        Explore Artworks <ArrowRight size={14} />
                                    </Link>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Exhibitions;
