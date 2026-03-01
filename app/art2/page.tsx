"use client";

import React, { useState } from "react";


const PRODUCT_URL = "https://mirathelle.com/products/ivokut?ref=article2";

/* ─── Click Tracking ─── */
const ARTICLE_ID = "mirathelle-ivokut-2";
const ARTICLE_NAME = "Mirathelle Ivókút - 247 Üzenet";

function trackClick(id: string, label: string) {
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ articleId: ARTICLE_ID, articleName: ARTICLE_NAME, id, label }),
  }).catch(() => {});
}

/* ═══════════════════════════════════════════════
   IMAGES — Replace "TODO" URLs with your uploads
   ═══════════════════════════════════════════════ */
const IMAGES = {
  hero: "https://cdn.shopify.com/s/files/1/0959/5548/5016/files/TODO_hero_woman_reading_messages_png.jpg?v=1772323623",
  catSad: "https://cdn.shopify.com/s/files/1/0959/5548/5016/files/TODO_cat_vet_clinic_png.jpg?v=1772322138",
  catBowl1: "https://cdn.shopify.com/s/files/1/0959/5548/5016/files/TODO_cat_sniffing_bowl_turning_away_png.jpg?v=1772322138",
  catBowl2: "https://cdn.shopify.com/s/files/1/0959/5548/5016/files/TODO_cat_sitting_next_to_untouched_bowl_png.jpg?v=1772322138",
  catBowl3: "https://cdn.shopify.com/s/files/1/0959/5548/5016/files/TODO_overhead_water_bowl_cat_paw_png.jpg?v=1772322137",
  catBowl4: "https://cdn.shopify.com/s/files/1/0959/5548/5016/files/TODO_woman_watching_cat_walk_past_bowl_png.jpg?v=1772322137",
  fountain: "https://cdn.shopify.com/s/files/1/0959/5548/5016/files/TODO_fountain_product_shot_png.png?v=1772321943",
  productCard: "https://cdn.shopify.com/s/files/1/0959/5548/5016/files/TODO_fountain_top_view_filtration_png.png?v=1772321942",
  sidebar1: "https://cdn.shopify.com/s/files/1/0959/5548/5016/files/TODO_sidebar_cat_drinking_fountain_png.png?v=1772321943",
  sidebar2: "https://cdn.shopify.com/s/files/1/0959/5548/5016/files/TODO_sidebar_woman_watching_cat_drink_png.png?v=1772321943",
  sidebar3: "https://cdn.shopify.com/s/files/1/0959/5548/5016/files/TODO_sidebar_cat_sleeping_next_to_fountain_png.png?v=1772321942",
};

/* ─── Sub-Components ─── */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #e0dcd5", padding: "18px 0" }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "'Libre Baskerville', 'Georgia', serif",
          fontSize: "15px",
          fontWeight: 600,
          color: "#2a2520",
          textAlign: "left",
          padding: 0,
        }}
      >
        {question}
        <span
          style={{
            fontSize: "20px",
            fontWeight: 300,
            transition: "transform 0.3s ease",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            marginLeft: 12,
            flexShrink: 0,
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? 300 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s ease, opacity 0.3s ease",
          opacity: open ? 1 : 0,
        }}
      >
        <p style={{ marginTop: 12, fontSize: "14px", lineHeight: 1.7, color: "#5a5549" }}>
          {answer}
        </p>
      </div>
    </div>
  );
}

function CTAButton({
  children,
  href,
  variant = "primary",
  trackId,
  trackLabel,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  trackId?: string;
  trackLabel?: string;
}) {
  const isPrimary = variant === "primary";
  return (
    <a
      href={href || PRODUCT_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackId && trackClick(trackId, trackLabel || trackId)}
      style={{
        display: "inline-block",
        background: isPrimary ? "linear-gradient(135deg, #6b4c8a, #8360a6)" : "transparent",
        color: isPrimary ? "#fff" : "#6b4c8a",
        border: isPrimary ? "none" : "2px solid #6b4c8a",
        borderRadius: 8,
        padding: isPrimary ? "16px 40px" : "14px 36px",
        fontFamily: "'Libre Baskerville', serif",
        fontSize: isPrimary ? 16 : 14,
        fontWeight: 700,
        textDecoration: "none",
        letterSpacing: 1,
        textTransform: "uppercase",
        transition: "all 0.3s ease",
        boxShadow: isPrimary ? "0 4px 16px rgba(107,76,138,0.3)" : "none",
        cursor: "pointer",
      }}
    >
      {children}
    </a>
  );
}

/* ═══════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                            */
/* ═══════════════════════════════════════════════════════════ */

export default function MirathelleArticle2() {
  return (
    <div
      style={{
        fontFamily: "'Source Sans 3', 'Source Sans Pro', 'Georgia', serif",
        color: "#2a2520",
        background: "#faf8f4",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <style>{`
        .article-container a:hover { opacity: 0.85; }

        .hero-cta-bar {
          position: fixed;
          bottom: 16px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 100;
          background: #2ecc40;
          text-align: center;
          padding: 16px 20px;
          box-shadow: 0 -2px 12px rgba(0,0,0,0.15);
          border-radius: 12px;
          width: 90%;
          max-width: 600px;
          display: block;
          color: #fff;
          text-decoration: none;
          font-family: 'Source Sans 3', sans-serif;
          font-weight: 700;
          font-size: 16px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
        }
        .hero-cta-bar:hover { background: #27ae35; }

        .article-img { width: 100%; border-radius: 10px; margin: 24px 0; }

        .grid-4 {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          margin: 24px 0;
        }
        .grid-4 img {
          width: 100%;
          border-radius: 8px;
          aspect-ratio: 1;
          object-fit: cover;
        }

        .product-highlight-card {
          background: linear-gradient(135deg, #6b4c8a, #8360a6);
          border-radius: 16px;
          overflow: hidden;
          margin: 40px 0;
          border: none;
        }

        .inline-link {
          color: #6b4c8a;
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .moving-water-layout {
          display: flex; gap: 24px; align-items: flex-start; margin: 16px 0 24px;
        }
        .moving-water-text { flex: 1; min-width: 0; }
        .moving-water-img { flex: 0 0 340px; max-width: 340px; }
        @media (max-width: 600px) {
          .moving-water-layout { flex-direction: column; }
          .moving-water-img { flex: none; max-width: 100%; }
        }

        .intro-two-col {
          display: flex; gap: 24px; align-items: flex-start; margin: 16px 0 24px;
        }
        .intro-two-col-text { flex: 1; min-width: 0; }
        .intro-two-col-img { flex: 0 0 320px; max-width: 320px; }
        .intro-bullet-block {
          border-left: 3px solid #ddd; padding-left: 20px;
          margin-bottom: 8px; position: relative;
        }
        .intro-bullet-block::before {
          content: '•'; position: absolute; left: -8px; top: 0;
          font-size: 20px; color: #999; line-height: 1.85;
        }
        @media (max-width: 600px) {
          .intro-two-col { flex-direction: column; }
          .intro-two-col-img { flex: none; max-width: 100%; }
        }

        .testimonials-grid { padding: 20px 0; font-family: inherit; }
        .testimonials-title {
          text-align: center; font-family: 'Libre Baskerville', serif;
          font-size: 42px; font-weight: 700; margin-bottom: 60px; color: #2a2520;
        }
        .cards-wrapper { display: grid; grid-template-columns: repeat(2, 1fr); gap: 32px; }
        .testimonial-card {
          position: relative; background: #ffffff; border-radius: 24px;
          padding: 36px 32px 64px; box-shadow: 0 12px 35px rgba(0,0,0,0.08);
          display: flex; flex-direction: column; align-items: center; text-align: center;
        }
        .tc-stars { color: #ffc107; font-size: 22px; letter-spacing: 3px; margin-bottom: 18px; }
        .tc-quote-icon {
          position: absolute; top: 24px; right: 24px;
          width: 38px; height: 38px; background: #64019f; color: #ffffff;
          font-size: 28px; font-weight: 700; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .testimonial-card h3 { font-size: 22px; font-weight: 700; margin-bottom: 16px; color: #2a2520; }
        .testimonial-card p { font-size: 17px; line-height: 1.6; color: #333333; }
        .tc-reviewer-name {
          position: absolute; bottom: 22px; left: 50%; transform: translateX(-50%);
          font-size: 15px; font-weight: 600; color: #666666;
        }
        @media (max-width: 900px) {
          .cards-wrapper { grid-template-columns: 1fr; }
          .testimonials-title { font-size: 30px; }
        }

        .two-col-wrapper {
          max-width: 1200px; margin: 0 auto; display: flex;
          gap: 36px; padding: 0 24px; align-items: stretch;
        }
        .main-content { flex: 1; max-width: 720px; min-width: 0; }
        .right-sidebar { width: 320px; flex-shrink: 0; padding-bottom: 40px; }
        @media (max-width: 1024px) {
          .right-sidebar { display: none; }
          .two-col-wrapper { justify-content: center; }
        }
      `}</style>

      <div className="article-container">
        {/* ── Top Blog Header Bar ── */}
        <div style={{ background: "linear-gradient(135deg, #6b4c8a, #8360a6)", textAlign: "center", padding: "18px 20px" }}>
          <span style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, color: "#fff", fontStyle: "italic" }}>
            Anna cicanaplója
          </span>
        </div>

        {/* ── Header section ── */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          {/* Breadcrumb */}
          <nav style={{ fontSize: 13, color: "#8a7e6e", padding: "24px 0 10px", fontFamily: "'Source Sans 3', sans-serif", maxWidth: 720, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 14, height: 14, background: "#6b4c8a", borderRadius: 3, display: "inline-block", flexShrink: 0 }} />
            <span style={{ cursor: "pointer" }}>Cicák</span>
            <span>›</span>
            <span style={{ cursor: "pointer" }}>Cicák egészsége</span>
            <span>›</span>
            <span style={{ color: "#2a2520" }}>Vesebetegség megelőzése</span>
          </nav>

          {/* Title */}
          <h1 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: "clamp(28px, 5vw, 44px)", fontWeight: 700, lineHeight: 1.25, color: "#1a1a1a", margin: "16px 0 20px", maxWidth: 720 }}>
            247 Üzenetet Kaptam Boróka Története Után. Mind Ugyanazt Kérdezte.
          </h1>

          {/* Meta */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: "#64748b", padding: "10px 0", fontFamily: "'Source Sans 3', sans-serif", maxWidth: 720 }}>
            <div style={{ width: 20, height: 20, background: "#cbd5e1", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: 3 }}>
              <svg viewBox="0 0 110.01 122.88" style={{ width: "100%", height: "100%", fill: "#475569" }}><path d="M1.87,14.69h22.66L24.5,14.3V4.13C24.5,1.86,26.86,0,29.76,0c2.89,0,5.26,1.87,5.26,4.13V14.3l-0.03,0.39 h38.59l-0.03-0.39V4.13C73.55,1.86,75.91,0,78.8,0c2.89,0,5.26,1.87,5.26,4.13V14.3l-0.03,0.39h24.11c1.03,0,1.87,0.84,1.87,1.87 v19.46c0,1.03-0.84,1.87-1.87,1.87H1.87C0.84,37.88,0,37.04,0,36.01V16.55C0,15.52,0.84,14.69,1.87,14.69L1.87,14.69z M0.47,42.19 h109.08c0.26,0,0.46,0.21,0.46,0.46l0,0v79.76c0,0.25-0.21,0.46-0.46,0.46l-109.08,0c-0.25,0-0.47-0.21-0.47-0.46V42.66 C0,42.4,0.21,42.19,0.47,42.19L0.47,42.19L0.47,42.19z"/></svg>
            </div>
            <span>2026. Feb. 12. | 09:34</span>
            <span style={{ margin: "0 4px" }}>-</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              14,891
              <span style={{ width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg viewBox="0 0 122.88 83.78" style={{ width: "100%", height: "100%", fill: "#64748b" }}><path d="M95.73,10.81c10.53,7.09,19.6,17.37,26.48,29.86l0.67,1.22l-0.67,1.21c-6.88,12.49-15.96,22.77-26.48,29.86 C85.46,79.88,73.8,83.78,61.44,83.78c-12.36,0-24.02-3.9-34.28-10.81C16.62,65.87,7.55,55.59,0.67,43.1L0,41.89l0.67-1.22 c6.88-12.49,15.95-22.77,26.48-29.86C37.42,3.9,49.08,0,61.44,0C73.8,0,85.45,3.9,95.73,10.81L95.73,10.81z M60.79,22.17l4.08,0.39 c-1.45,2.18-2.31,4.82-2.31,7.67c0,7.48,5.86,13.54,13.1,13.54c2.32,0,4.5-0.62,6.39-1.72c0.03,0.47,0.05,0.94,0.05,1.42 c0,11.77-9.54,21.31-21.31,21.31c-11.77,0-21.31-9.54-21.31-21.31C39.48,31.71,49.02,22.17,60.79,22.17L60.79,22.17L60.79,22.17z M109,41.89c-5.5-9.66-12.61-17.6-20.79-23.11c-8.05-5.42-17.15-8.48-26.77-8.48c-9.61,0-18.71,3.06-26.76,8.48 c-8.18,5.51-15.29,13.45-20.8,23.11c5.5,9.66,12.62,17.6,20.8,23.1c8.05,5.42,17.15,8.48,26.76,8.48c9.62,0,18.71-3.06,26.77-8.48 C96.39,59.49,103.5,51.55,109,41.89L109,41.89z"/></svg>
              </span>
            </span>
          </div>

          {/* Author + Social Icons */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "15px 0", borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", maxWidth: 720, marginBottom: 28 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div style={{ fontSize: 14, color: "#334155" }}>Írta: <span style={{ fontWeight: 700 }}>Fodor Anna</span></div>
              <div style={{ fontSize: 14, color: "#334155" }}>egy felelősségteljes cica gazdi</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <a href="#" style={{ width: 35, height: 35, borderRadius: "50%", background: "#3b5998", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: "#fff" }}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" style={{ width: 35, height: 35, borderRadius: "50%", background: "#1da1f2", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: "#fff" }}><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" style={{ width: 35, height: 35, borderRadius: "50%", background: "#e60023", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: "#fff" }}><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.443.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.242 0-2.407-.651-2.807-1.416 0 0-.614 2.34-.762 2.91-.275 1.061-1.02 2.393-1.52 3.201 1.144.35 2.356.535 3.609.535 6.621 0 11.987-5.367 11.987-11.987C23.97 5.39 18.592.026 11.971.026L12.017 0z"/></svg>
              </a>
              <a href="#" style={{ width: 35, height: 35, borderRadius: "50%", background: "#25d366", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: "#fff" }}><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
              <a href="#" style={{ width: 35, height: 35, borderRadius: "50%", background: "#333333", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: "#fff" }}><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </a>
            </div>
          </div>
        </div>

        {/* ══ Two-Column Layout ══ */}
        <div className="two-col-wrapper">
          {/* ────────────── LEFT: Main Article ────────────── */}
          <div className="main-content">
            {/* Hero Image */}
            <img src={IMAGES.hero} alt="Boróka cica" style={{ width: "100%", borderRadius: 12, marginBottom: 24 }} />

            {/* ═══ ARTICLE BODY ═══ */}
            <article style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, lineHeight: 1.85, color: "#3a352e" }}>

              {/* ─── SECTION 1: The Response ─── */}
              <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, fontWeight: 700, margin: "36px 0 16px", color: "#2a2520", lineHeight: 1.4 }}>
                Nem számítottam erre.
              </h3>

              <p style={{ marginBottom: 16 }}>
                Amikor megosztottam, mi történt Borókával és Kormossal, azt hittem, pár ismerős elolvassa. Talán ír valaki, hogy &ldquo;jaj, szegény cica.&rdquo;
              </p>

              <div className="intro-two-col">
                <div className="intro-two-col-text">
                  <div className="intro-bullet-block">
                    <p style={{ marginBottom: 16 }}>
                      Ehelyett 247 üzenetet kaptam. Két hét alatt. Anyukák írtak, akiknek a cicájuk pont most kapott rossz vérvizsgálatot. Idős gazdik, akik már{" "}
                      <strong><em>elveszítettek macskát vesebetegségben.</em></strong>{" "}
                      Fiatalok, akik az első cicájukat nevelik és meg akarják előzni a bajt.
                    </p>
                  </div>
                  <div className="intro-bullet-block">
                    <p style={{ marginBottom: 16 }}>
                      De a legtöbb üzenetben ugyanaz a mondat volt:{" "}
                      <strong><em>&ldquo;Nálunk is van egy tál a konyhában. A cicám alig iszik belőle. Ez normális?&rdquo;</em></strong>
                    </p>
                    <p style={{ marginBottom: 16 }}>
                      Nem. Nem normális.
                      <br />
                      És ez az a mondat, ami miatt leültem és megírtam ezt az oldalt.
                    </p>
                  </div>
                </div>
                <div className="intro-two-col-img">
                  <img src={IMAGES.catSad} alt="Szomorú cica" style={{ width: "100%", borderRadius: 10, objectFit: "cover" }} />
                </div>
              </div>

              {/* ─── SECTION 2: Why Cats Don't Drink ─── */}
              <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, fontWeight: 700, margin: "36px 0 16px", color: "#2a2520", lineHeight: 1.4 }}>
                Miért Nem Iszik A Cicád – A Válasz, Amit Az Állatorvosod Sosem Magyaráz El Rendesen
              </h3>

              <p style={{ marginBottom: 16 }}>Az állatorvosok azt mondják: &ldquo;ösztönözze a folyadékbevitelt.&rdquo;</p>
              <p style={{ marginBottom: 16 }}>De nem mondják el, MIÉRT nem iszik a cicád. Nem magyarázzák el, mit jelent ez valójában.</p>
              <p style={{ marginBottom: 16 }}>Szóval elmondom én.</p>
              <p style={{ marginBottom: 16 }}>A cicák sivatagi állatokból fejlődtek. Az ősük, az afrikai vadmacska, szinte soha nem ivott álló vízből. A vadonban az álló víz veszélyt jelent. Baktériumok. Paraziták. Mérgek.</p>
              <p style={{ marginBottom: 16 }}><strong><em>Ez az ösztön ma is ott van minden házi cicában.</em></strong> Nem tanult viselkedés – az agyuk mélyére van égetve.</p>

              <div className="grid-4">
                <img src={IMAGES.catBowl1} alt="Cica és vizes tál" />
                <img src={IMAGES.catBowl2} alt="Cica és vizes tál" />
                <img src={IMAGES.catBowl3} alt="Cica és vizes tál" />
                <img src={IMAGES.catBowl4} alt="Cica és vizes tál" />
              </div>

              <p style={{ marginBottom: 16 }}>Amikor a cicád odamegy a tálhoz, megszagolja, és elsétál mellette – nem azért teszi, mert nem szomjas.</p>
              <p style={{ marginBottom: 16 }}>Azért teszi, mert minden sejtje azt mondja:{" "}<strong><em>ez a víz nem biztonságos.</em></strong></p>
              <p style={{ marginBottom: 16 }}>Iszik belőle? Igen. A minimumot. Épp annyit, amennyi a túléléshez kell.<br />De nem eleget ahhoz, hogy egészséges legyen.</p>

              {/* ─── SECTION 3: The Numbers ─── */}
              <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, fontWeight: 700, margin: "36px 0 16px", color: "#2a2520", lineHeight: 1.4 }}>
                A Számok, Amiktől Rosszul Lettem
              </h3>

              <p style={{ marginBottom: 16 }}>A cicáknak napi <strong><em>200-300 ml vizet kellene inniuk.</em></strong> A legtöbb tálból ivó cica ennek a felét sem issza meg.</p>
              <p style={{ marginBottom: 16 }}>Nem azért, mert nem szomjas. Azért, mert az ösztönei nem engedik.</p>
              <p style={{ marginBottom: 16 }}>És most jön a rész, amit bárcsak valaki elmondott volna, mielőtt Kormost elveszítettem:</p>
              <p style={{ marginBottom: 16, fontWeight: 700, fontStyle: "italic" }}>A krónikus, enyhe kiszáradás a vesebetegség első számú megelőzhető oka cicáknál.</p>
              <p style={{ marginBottom: 16 }}>Nem a rossz táp. Nem a genetika. Nem az életkor.<br />A víz. Pontosabban: a NEM ELÉG víz.</p>
              <p style={{ marginBottom: 16 }}>Amikor egy cica évekig keveset iszik, a veséinek egyre töményebb vizeletet kell feldolgozniuk. Minden nap egy kicsit több stressz. Minden nap egy kicsit több károsodás.</p>
              <p style={{ marginBottom: 16 }}><strong><em>A veséi nem egy nap alatt mennek tönkre.</em></strong> Évekig tartó, csendes folyamat. Kívülről semmi nem látszik. A cicád játszik, dorombol, eszik. Közben a veséi lassan, napról napra veszítenek a teljesítményükből.</p>
              <p style={{ marginBottom: 16 }}>Mire a vérvizsgálat emelkedett értékeket mutat, a károsodás már visszafordíthatatlan.</p>
              <p style={{ marginBottom: 16 }}>Ez történt Kormossal. 9 évig ivott csapvizet egy tálból. Mire észrevettem, késő volt.</p>
              <p style={{ marginBottom: 16 }}>És majdnem ez történt Borókával is.</p>

              {/* ─── SECTION 4: Fresh Bowl Not Enough ─── */}
              <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, fontWeight: 700, margin: "36px 0 16px", color: "#2a2520", lineHeight: 1.4 }}>
                &ldquo;De Én Naponta Cserélem A Vizet!&rdquo;
              </h3>

              <p style={{ marginBottom: 16 }}>Ez volt a 247 üzenetből a leggyakoribb mondat.</p>
              <p style={{ marginBottom: 16 }}>Én is ezt csináltam. Minden nap friss csapvíz, tiszta tál. Azt hittem, elég.</p>
              <p style={{ marginBottom: 16 }}>Nem elég. És most elmagyarázom, miért.</p>
              <p style={{ marginBottom: 16 }}>A probléma nem a víz frissessége.{" "}<strong><em>A probléma maga a tál.</em></strong></p>
              <p style={{ marginBottom: 16 }}>Az álló víz – akár 5 perce töltötted – nem mozog. Nem áramlik. A cicád orra számára ez &ldquo;halott&rdquo; víz.</p>
              <p style={{ marginBottom: 16 }}>A csapvízben ráadásul klór van, nehézfémek, vegyszermaradványok. Te nem érzed.{" "}<strong><em>A cicád orra igen.</em></strong></p>
              <p style={{ marginBottom: 16 }}>Megszagolja. Megérzi, hogy &ldquo;nem tiszta.&rdquo; És elmegy.</p>
              <p style={{ marginBottom: 16 }}>Attól, hogy naponta háromszor cseréled a vizet, a tál attól még tál marad. Az álló víz attól még álló víz. Az ösztön attól még azt mondja: kerüld el.</p>

              {/* ─── SECTION 5: Moving Water ─── */}
              <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, fontWeight: 700, margin: "36px 0 16px", color: "#2a2520", lineHeight: 1.4 }}>
                Miért Változtat Meg Mindent A Mozgó Víz
              </h3>

              <div className="moving-water-layout">
                <div className="moving-water-text">
                  <p style={{ marginBottom: 16 }}>A mozgó víz más.</p>
                  <p style={{ marginBottom: 16 }}>A cicák agyában a folyó víz = friss víz = biztonságos víz. Ez nem nevelés kérdése – ez evolúció.</p>
                  <p style={{ marginBottom: 16 }}>Kutatások szerint a cicák <strong>akár háromszor annyi vizet isznak</strong>, ha az áramlik.</p>
                  <ul style={{ margin: "16px 0", paddingLeft: 24, lineHeight: 2, color: "#3a352e" }}>
                    <li>A bajszuk nem ér az oldalához (amit utálnak).</li>
                    <li>A hang vonzza őket.</li>
                    <li>A mozgás azt üzeni az ösztöneiknek: ez a víz biztonságos.</li>
                  </ul>
                  <p style={{ marginBottom: 16 }}>Ezt láttam Borókánál. Az első napon, amikor bekapcsoltam a szökőkutat, odament és ivott. Huszonöt másodpercig.{" "}<strong><em>Két év alatt nem láttam így inni.</em></strong></p>
                  <p style={{ marginBottom: 16 }}>Az első héten naponta ötször-hatszor láttam a kútnál. A második héten észrevettem, hogy az alomban nagyobbak a nedves csomók. Több vizelet. Hígabb vizelet. Kevesebb stressz a veséken.</p>
                  <p style={{ marginBottom: 16 }}>Nyolc hét után a vérvizsgálata stabilizálódott. Az állatorvos azt kérdezte:{" "}<strong>&ldquo;Min változtatott?&rdquo;</strong></p>
                  <p style={{ marginBottom: 16 }}>Csak a vízen.</p>
                </div>
                <div className="moving-water-img">
                  <img src={IMAGES.fountain} alt="Mirathelle Macska Ivókút" style={{ width: "100%", borderRadius: 10, objectFit: "cover" }} />
                </div>
              </div>

              {/* ─── SECTION 6: Other Experiences ─── */}
              <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, fontWeight: 700, margin: "36px 0 16px", color: "#2a2520", lineHeight: 1.4 }}>
                Amit Boróka Óta Más Gazdiktól Hallottam
              </h3>

              <p style={{ marginBottom: 16 }}>Azok közül, akik írtak, 34-en megvették ugyanazt a szökőkutat. Nem kértem rá senkit – csak megosztottam, mit használok.</p>
              <p style={{ marginBottom: 16 }}>3 héten belül 28-an írtak vissza.</p>
              <p style={{ marginBottom: 16 }}>Szinte minden üzenet ugyanúgy kezdődött: <strong><em>&ldquo;Nem hittem volna.&rdquo;</em></strong></p>
              <p style={{ marginBottom: 16 }}>Judit 7 éves cirmos kandúrja a harmadik naptól iszik rendesen. &ldquo;Azelőtt naponta egyszer láttam a tálnál. Most háromszor-négyszer megyek el mellette, és ott ül és iszik.&rdquo;</p>
              <p style={{ marginBottom: 16 }}>Gábor 12 éves perzsa macskájának a szőre két hét alatt változott meg. &ldquo;Fényesebb, puhább. Az állatorvos azt mondta, a jobb hidratáltság látszik rajta.&rdquo;</p>
              <p style={{ marginBottom: 16 }}>Zsófi csaknem elveszítette az 5 éves cicáját. Emelkedett veseértékek, pont mint Borókánál. Három hónappal a szökőkút után a következő kontroll normál tartományban volt.{" "}<strong><em>&ldquo;Sírtam az állatorvosi rendelőben.&rdquo;</em></strong></p>
              <p style={{ marginBottom: 16 }}>Nem tudományos tanulmány. Nem klinikai vizsgálat. Csak emberek, akik változtattak egy dolgon – és látták az eredményt.</p>

              {/* ─── SECTION 7: Product Differentiation ─── */}
              <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, fontWeight: 700, margin: "36px 0 16px", color: "#2a2520", lineHeight: 1.4 }}>
                Mitől Más A Mirathelle Ivókút
              </h3>

              <p style={{ marginBottom: 16 }}>Mielőtt megvettem a sajátomat, megnéztem jó néhány szökőkutat. A legtöbb olcsó műanyag, ami két nap alatt benyálkásodik. A szivattyú hangos. A szűrő nem szűr semmit. A cicák megszagolják és elmennek – pont mint a tálnál.</p>
              <p style={{ marginBottom: 16 }}>A <strong>Mirathelle Ivókút</strong> más.</p>
              <p style={{ marginBottom: 16 }}>304-es rozsdamentes acél – nem műanyag, ami baktériumokat gyűjt.</p>
              <p style={{ marginBottom: 16 }}>Háromszintű szűrés: mechanikus szűrő, aktív szén, ioncserélő. Eltávolítja a klórt, a nehézfémeket, a rossz ízeket és szagokat.{" "}<strong><em>Orvosi minőségű szűrt víz.</em></strong></p>
              <p style={{ marginBottom: 16 }}>A víz folyamatosan áramlik. Friss és oxigéndús marad.<br />1,8 liter fér bele – nem szárad ki, amíg dolgozol.</p>
              <p style={{ marginBottom: 16 }}>Halk. Boróka néha mellette alszik.<br />A tisztítása 5 percet vesz igénybe hetente egyszer.</p>
              <p style={{ marginBottom: 16 }}>10 hónapja van meg. Boróka több vizet iszik, mint valaha.</p>

              {/* ═══ PRODUCT CARD ═══ */}
              <div className="product-highlight-card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "28px 32px", flexWrap: "wrap", gap: 16 }}>
                  <div>
                    <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Mirathelle Ivókút</h2>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", fontWeight: 500, margin: 0 }}>4 Hónapnyi Ajándék Szűrővel</p>
                  </div>
                  <a
                    href={PRODUCT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick("mid-article-cta", "Ivókút - Közép CTA")}
                    style={{ display: "inline-block", background: "#2ecc40", color: "#fff", borderRadius: 8, padding: "16px 40px", fontFamily: "'Source Sans 3', sans-serif", fontSize: 16, fontWeight: 700, textDecoration: "none", letterSpacing: 1.5, textTransform: "uppercase", flexShrink: 0 }}
                  >
                    MEGNÉZEM
                  </a>
                </div>
              </div>

              {/* ─── SECTION 8: Close ─── */}
              <h3 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, fontWeight: 700, margin: "36px 0 16px", color: "#2a2520", lineHeight: 1.4 }}>
                Ne Várd Meg A Vérvizsgálatot, Ami Összetöri A Szíved
              </h3>

              <p style={{ marginBottom: 16 }}>Amikor Kormos meghalt, listát írtam arról, mit csináltam volna másképp.</p>
              <p style={{ marginBottom: 16 }}>A víz nem volt rajta a listán.</p>
              <p style={{ marginBottom: 16 }}>Ha rajta lett volna, talán Kormos ma is itt lenne.</p>
              <p style={{ marginBottom: 16 }}>Nem tudom visszahozni Kormost. De meg tudtam menteni Borókát. És ezt az oldalt azért írtam, hogy te ne veszíts el éveket – és ne veszítsd el a cicádat – mire rájössz, amit én túl későn tanultam meg.</p>
              <p style={{ marginBottom: 16 }}>A Mirathelle Ivókút kevesebbe kerül, mint egyetlen sürgősségi állatorvosi vizit.<br />Kevesebbe, mint a táplálékkiegészítők, amikre feleslegesen költöttem.<br />Kevesebbe, mint a bűntudat, hogy &ldquo;mi lett volna, ha.&rdquo;</p>
              <p style={{ marginBottom: 16, fontWeight: 700, fontStyle: "italic" }}>Pénzvisszafizetési garanciával jár.</p>
              <p style={{ marginBottom: 16 }}>Ha a cicád nem iszik többet, visszaküldheted. De a cicák imádják a mozgó vizet. Ez biológia. Még sosem küldték vissza.</p>
              <p style={{ marginBottom: 24 }}>
                <a href={PRODUCT_URL} target="_blank" rel="noopener noreferrer" className="inline-link" onClick={() => trackClick("link1-boroka", "👉 Link1 - Megnézem az ivókutat")}>
                  👉 Kattints ide, hogy megnézd a Mirathelle Ivókutat
                </a>
              </p>
              <p style={{ marginBottom: 16 }}>Boróka most a szökőkútja mellett alszik. Egészségesen. Hidratáltan. Biztonságban.</p>
              <p style={{ marginBottom: 16 }}>Bárcsak hamarabb tudtam volna.<br />Most már te is tudod.</p>
              <p style={{ marginBottom: 40 }}>
                <a href={PRODUCT_URL} target="_blank" rel="noopener noreferrer" className="inline-link" onClick={() => trackClick("link2-keszlet", "👉 Link2 - Ajándék szűrők")}>
                  👉 Szerezd be, amíg jár mellé 4 hónapnyi ajándék szűrő
                </a>
              </p>
            </article>

            {/* ═══ PRODUCT PURCHASE CARD ═══ */}
            <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e8e4dc", overflow: "hidden", marginBottom: 48, boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
              <img src={IMAGES.productCard} alt="Mirathelle Ivókút" style={{ width: "100%", maxWidth: 400, objectFit: "cover", margin: "0 auto", display: "block" }} />
              <div style={{ padding: "28px 24px", textAlign: "center" }}>
                <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 22, fontWeight: 700, color: "#2a2520", marginBottom: 8 }}>
                  Szerezd Be Még Most Amíg Jár Mellé Ajándék 🎁
                </h2>
                <div style={{ margin: "20px 0" }}>
                  <CTAButton href={PRODUCT_URL} trackId="bottom-card-cta" trackLabel="Alsó Kártya - TOVÁBB A TERMÉKHEZ">TOVÁBB A TERMÉKHEZ</CTAButton>
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 20, fontSize: 14, fontWeight: 600, color: "#5a5549", flexWrap: "wrap" }}>
                  <span>✓ Ingyenes szállítás</span>
                  <span>✓ 4 hónapra elegendő ajándék szűrő</span>
                </div>
              </div>
            </div>

            {/* ═══ REVIEWS ═══ */}
            <div className="testimonials-grid" style={{ marginBottom: 48 }}>
              <h2 className="testimonials-title">Másoknak is bevált</h2>
              <div className="cards-wrapper">
                <div className="testimonial-card">
                  <div className="tc-stars">★★★★★</div>
                  <div className="tc-quote-icon">&ldquo;</div>
                  <h3>Tökéletes ivókút nem léte...</h3>
                  <p>A múltban vettem jó néhány ivókutat nagy állatkereskedési láncokból, eddig sosem volt az igazi vagy sosem működött, vagy csak rövid ideig. Féltem is kicsit, amikor ezt megrendeltem, de hatalmas pozitív csalódás volt. Nagyon elégedett vagyok. A rozsdamentes acél megnyugtat a mosások közötti túlzott baktériumszaporodás ellen. Nem is lehetne egyszerűbb felállítani és feltölteni. A macskák pedig imádják. Sokkal több vizet isznak, mióta megkapták.</p>
                  <div className="tc-reviewer-name">Attila D.</div>
                </div>
                <div className="testimonial-card">
                  <div className="tc-stars">★★★★★</div>
                  <div className="tc-quote-icon">&ldquo;</div>
                  <h3>Hatalmas változás a macska általános egészségi állapotában</h3>
                  <p>Miért nem vettem meg ezt hamarabb? Szinte teljesen hangtalan, és a macskáim több vizet isznak, mint valaha. Óriási változást hozott az emésztésükben! Rendszeresebben végeznek, és a szőrük is egészségesebbnek tűnik. Csak ügyelj rá, hogy néhány naponta tisztítsd, mert elég csúnyává válhat odabent, de nagyon könnyű szétszedni!</p>
                  <div className="tc-reviewer-name">Kata N.</div>
                </div>
              </div>
            </div>

            {/* ═══ FAQ ═══ */}
            <div style={{ marginBottom: 48 }}>
              <h2 style={{ fontFamily: "'Libre Baskerville', serif", fontSize: 24, fontWeight: 700, textAlign: "center", marginBottom: 28, color: "#2a2520" }}>
                Gyakran ismételt kérdések
              </h2>
              <FAQItem question="Milyen gyakran kell cserélni a szűrőket?" answer="A friss, tiszta víz biztosítása érdekében javasoljuk, hogy hetente cserélje ki a szűrőt." />
              <FAQItem question="Mi történik, ha a macskám nem szereti?" answer="Ha a macskád nem szereti vagy kerüli, várj 3–4 napot, hogy megszokja. Ha továbbra is kerüli, tegyél macskamentát a kifolyóra." />
              <FAQItem question="Mi történik, ha a szivattyú nem működik?" answer="Írj nekünk a support@mirathelle.com címre. Gondoskodunk róla, hogy megkapd a szükséges segítséget." />
              <FAQItem question="Folyamatosan működik?" answer="Igen, folyamatosan." />
              <FAQItem question="Rozsdamentes acélból készült?" answer="Igen, 304-es rozsdamentes acélból készült." />
            </div>
          </div>

          {/* ────────────── RIGHT: Sidebar ────────────── */}
          <aside className="right-sidebar">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Video/GIF with TOVÁBB button overlay */}
              <div style={{ position: "relative", borderRadius: 10, overflow: "hidden" }}>
                <video
                  src="https://cdn.shopify.com/videos/c/o/v/185659e5dbad4195b8e3e2b16224ac2f.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{ width: "100%", display: "block", objectFit: "cover" }}
                />
                <a
                  href={PRODUCT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick("sidebar-cta", "Sidebar Zöld TOVÁBB")}
                  style={{
                    position: "absolute",
                    bottom: 16,
                    left: 16,
                    right: 16,
                    display: "block",
                    background: "#2ecc40",
                    color: "#fff",
                    borderRadius: 8,
                    padding: "14px 20px",
                    fontFamily: "'Source Sans 3', sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    textDecoration: "none",
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    textAlign: "center",
                  }}
                >
                  MEGNÉZEM
                </a>
              </div>
              <img src={IMAGES.sidebar1} alt="Cica" style={{ width: "100%", borderRadius: 10, objectFit: "cover" }} />
              <img src={IMAGES.sidebar2} alt="Cica" style={{ width: "100%", borderRadius: 10, objectFit: "cover" }} />
              <img src={IMAGES.sidebar3} alt="Cica" style={{ width: "100%", borderRadius: 10, objectFit: "cover" }} />
            </div>
          </aside>
        </div>
      </div>

      {/* ── Fixed Bottom CTA ── */}
      <a
        href={PRODUCT_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="hero-cta-bar"
        onClick={() => trackClick("sticky-bar", "Sticky Bottom CTA")}
      >
        → KÉREM A MEGOLDÁST
      </a>
    </div>
  );
}