"use client";

import React, { useState } from "react";


const PRODUCT_URL = "https://mirathelle.com/products/ivokut?ref=article";

/* ─── Click Tracking ─── */
const ARTICLE_ID = "mirathelle-ivokut";
const ARTICLE_NAME = "Mirathelle Ivókút - Boróka";

function trackClick(id: string, label: string) {
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ articleId: ARTICLE_ID, articleName: ARTICLE_NAME, id, label }),
  }).catch(() => {});
}

const IMAGES = {
  hero: "https://cdn.shopify.com/s/files/1/0959/5548/5016/files/hf_20260120_001803_76e1785e-01db-4dd8-889b-afa5e4bace68.png?v=1768868971&width=2048",
  catSad: "https://cdn.shopify.com/s/files/1/0959/5548/5016/files/hf_20260120_002022_0fb1b6c3-3e1a-4ca8-9e56-dee852cb4f30.png?v=1768869149&width=2048",
  catBowl1: "https://cdn.shopify.com/s/files/1/0959/5548/5016/files/hf_20260120_002037_f01bd824-acc4-4294-be12-1732447ff26d_346x.png?v=1768869267",
  catBowl2: "https://cdn.shopify.com/s/files/1/0959/5548/5016/files/hf_20260120_002236_dfdec0bc-bd5c-41d2-bf92-b2040ed90ce4_346x.png?v=1768869279",
  catBowl3: "https://cdn.shopify.com/s/files/1/0959/5548/5016/files/hf_20260120_002344_d3e4e1c3-cf9c-48b6-a304-c6d8b7d7ec86_346x.png?v=1768869280",
  catBowl4: "https://cdn.shopify.com/s/files/1/0959/5548/5016/files/hf_20260120_002045_90e771c9-f9e4-4924-bee0-53fef215fb18_346x.png?v=1768869281",
  fountain: "https://cdn.shopify.com/s/files/1/0959/5548/5016/files/f03f4e28-4c0b-495d-93cb-6c7178c86f64_0ab710f8-69fe-46d1-9590-a827c86017e5.png?v=1768869356&width=2048",
  productCard: "https://cdn.shopify.com/s/files/1/0959/5548/5016/files/1af2abe9-c859-441d-8b3e-13918cf53b48_2ea9ba4c-d199-4aa6-b429-731ba1bd2249.png?v=1768870454",
  sidebar1: "https://cdn.shopify.com/s/files/1/0959/5548/5016/files/hf_20260120_000310_40667ffe-dfc4-4cbc-986e-15f4268f3966_308x.png?v=1768867917",
  sidebar2: "https://cdn.shopify.com/s/files/1/0959/5548/5016/files/hf_20260120_000355_74ed8838-6df0-496a-91e5-d00942f2a734_308x.png?v=1768867942",
  sidebar3: "https://cdn.shopify.com/s/files/1/0959/5548/5016/files/ChatGPT_Image_Jan_3_2026_08_46_45_PM_308x.png?v=1768867496",
  sidebarProduct: "https://cdn.shopify.com/s/files/1/0959/5548/5016/files/f03f4e28-4c0b-495d-93cb-6c7178c86f64_0ab710f8-69fe-46d1-9590-a827c86017e5.png?v=1768869356&width=600",
};

/* ─── Small Sub-Components ─── */

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

function ReviewCard({ name, title, text }: { name: string; title: string; text: string }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e8e4dc",
        borderRadius: 12,
        padding: "28px 24px",
        flex: "1 1 340px",
        maxWidth: 500,
      }}
    >
      <div style={{ color: "#d4a34a", fontSize: 18, letterSpacing: 2 }}>★★★★★</div>
      <div
        style={{
          fontSize: 40,
          color: "#d4a34a",
          fontFamily: "'Libre Baskerville', serif",
          lineHeight: 1,
          margin: "8px 0",
        }}
      >
        &ldquo;
      </div>
      <h4
        style={{
          fontFamily: "'Libre Baskerville', serif",
          fontSize: 16,
          fontWeight: 700,
          color: "#2a2520",
          margin: "0 0 12px",
        }}
      >
        {title}
      </h4>
      <p style={{ fontSize: 14, lineHeight: 1.7, color: "#5a5549", margin: "0 0 16px" }}>{text}</p>
      <p style={{ fontSize: 13, fontWeight: 600, color: "#8a7e6e", margin: 0 }}>{name}</p>
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

/* ─── Sidebar Review (compact card with avatar initials) ─── */

function SidebarReview({
  initials,
  color,
  name,
  date,
  text,
  image,
}: {
  initials: string;
  color: string;
  name: string;
  date: string;
  text: string;
  image?: string;
}) {
  return (
    <div style={{ marginBottom: 20 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            fontFamily: "'Source Sans 3', sans-serif",
            flexShrink: 0,
          }}
        >
          {initials}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#2a2520", lineHeight: 1.2 }}>
            {name}
          </div>
          <div style={{ fontSize: 11, color: "#999" }}>{date}</div>
        </div>
      </div>
      {/* Stars */}
      <div style={{ color: "#f5a623", fontSize: 15, letterSpacing: 1, marginBottom: 8 }}>
        ★★★★★
      </div>
      {/* Text */}
      <p style={{ fontSize: 13, lineHeight: 1.65, color: "#444", margin: 0 }}>{text}</p>
      {/* Optional image  */}
      {image && (
        <img
          src={image}
          alt=""
          style={{ width: "100%", borderRadius: 8, marginTop: 12, objectFit: "cover" }}
        />
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════ */
/*  MAIN COMPONENT                                            */
/* ═══════════════════════════════════════════════════════════ */

export default function MirathelleArticle() {
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
        .hero-cta-bar:hover {
          background: #27ae35;
        }

        .article-img {
          width: 100%;
          border-radius: 10px;
          margin: 24px 0;
        }

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
          display: flex;
          gap: 24px;
          align-items: flex-start;
          margin: 16px 0 24px;
        }
        .moving-water-text {
          flex: 1;
          min-width: 0;
        }
        .moving-water-img {
          flex: 0 0 340px;
          max-width: 340px;
        }

        @media (max-width: 600px) {
          .moving-water-layout {
            flex-direction: column;
          }
          .moving-water-img {
            flex: none;
            max-width: 100%;
          }
        }

        /* Testimonials Grid */

        /* Intro two-column layout */
        .intro-two-col {
          display: flex;
          gap: 24px;
          align-items: flex-start;
          margin: 16px 0 24px;
        }
        .intro-two-col-text {
          flex: 1;
          min-width: 0;
        }
        .intro-two-col-img {
          flex: 0 0 320px;
          max-width: 320px;
        }
        .intro-bullet-block {
          border-left: 3px solid #ddd;
          padding-left: 20px;
          margin-bottom: 8px;
          position: relative;
        }
        .intro-bullet-block::before {
          content: '•';
          position: absolute;
          left: -8px;
          top: 0;
          font-size: 20px;
          color: #999;
          line-height: 1.85;
        }
        @media (max-width: 600px) {
          .intro-two-col {
            flex-direction: column;
          }
          .intro-two-col-img {
            flex: none;
            max-width: 100%;
          }
        }

        /* Testimonials Grid */
        .testimonials-grid {
          padding: 20px 0;
          font-family: inherit;
        }
        .testimonials-title {
          text-align: center;
          font-family: 'Libre Baskerville', serif;
          font-size: 42px;
          font-weight: 700;
          margin-bottom: 60px;
          color: #2a2520;
        }
        .cards-wrapper {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }
        .testimonial-card {
          position: relative;
          background: #ffffff;
          border-radius: 24px;
          padding: 36px 32px 64px;
          box-shadow: 0 12px 35px rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .tc-stars {
          color: #ffc107;
          font-size: 22px;
          letter-spacing: 3px;
          margin-bottom: 18px;
        }
        .tc-quote-icon {
          position: absolute;
          top: 24px;
          right: 24px;
          width: 38px;
          height: 38px;
          background: #64019f;
          color: #ffffff;
          font-size: 28px;
          font-weight: 700;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .testimonial-card h3 {
          font-size: 22px;
          font-weight: 700;
          margin-bottom: 16px;
          color: #2a2520;
        }
        .testimonial-card p {
          font-size: 17px;
          line-height: 1.6;
          color: #333333;
        }
        .tc-reviewer-name {
          position: absolute;
          bottom: 22px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 15px;
          font-weight: 600;
          color: #666666;
        }
        @media (max-width: 900px) {
          .cards-wrapper {
            grid-template-columns: 1fr;
          }
          .testimonials-title {
            font-size: 30px;
          }
        }

        .sidebar-imgs {
          display: flex;
          gap: 10px;
          margin: 24px 0;
        }
        .sidebar-imgs img {
          flex: 1;
          border-radius: 8px;
          object-fit: cover;
          height: 200px;
        }

        /* ── Two-column layout ── */
        .two-col-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          gap: 36px;
          padding: 0 24px;
          align-items: stretch;
        }

        .main-content {
          flex: 1;
          max-width: 720px;
          min-width: 0;
        }

        .right-sidebar {
          width: 320px;
          flex-shrink: 0;
          padding-bottom: 40px;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .right-sidebar { display: none; }
          .two-col-wrapper { justify-content: center; }
        }

        @media (max-width: 768px) {
          .grid-4 { grid-template-columns: repeat(2, 1fr); }
          .sidebar-imgs img { height: 140px; }
        }
      `}</style>

      <div className="article-container">
        {/* ── Top Blog Header Bar ── */}
        <div
          style={{
            background: "linear-gradient(135deg, #6b4c8a, #8360a6)",
            textAlign: "center",
            padding: "18px 20px",
          }}
        >
          <span
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 700,
              color: "#fff",
              fontStyle: "italic",
            }}
          >
            Anna cicanaplója
          </span>
        </div>

        {/* ── Header section (full width, above two-col) ── */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          {/* Breadcrumb */}
          <nav
            style={{
              fontSize: 13,
              color: "#8a7e6e",
              padding: "24px 0 10px",
              fontFamily: "'Source Sans 3', sans-serif",
              maxWidth: 720,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ width: 14, height: 14, background: "#6b4c8a", borderRadius: 3, display: "inline-block", flexShrink: 0 }} />
            <span style={{ cursor: "pointer" }}>Cicák</span>
            <span>›</span>
            <span style={{ cursor: "pointer" }}>Cicák egészsége</span>
            <span>›</span>
            <span style={{ color: "#2a2520" }}>Vesebetegség</span>
          </nav>

          {/* Title */}
          <h1
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(28px, 5vw, 44px)",
              fontWeight: 700,
              lineHeight: 1.25,
              color: "#1a1a1a",
              margin: "16px 0 20px",
              maxWidth: 720,
            }}
          >
            Majdnem Elveszítettem A Második Cicámat Ugyanabban, Ami Az Elsőt Is Elvitte
          </h1>

          {/* Meta with calendar icon */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontSize: 14,
              color: "#64748b",
              padding: "10px 0",
              fontFamily: "'Source Sans 3', sans-serif",
              maxWidth: 720,
            }}
          >
            <div style={{ width: 20, height: 20, background: "#cbd5e1", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: 3 }}>
              <svg viewBox="0 0 110.01 122.88" style={{ width: "100%", height: "100%", fill: "#475569" }}><path d="M1.87,14.69h22.66L24.5,14.3V4.13C24.5,1.86,26.86,0,29.76,0c2.89,0,5.26,1.87,5.26,4.13V14.3l-0.03,0.39 h38.59l-0.03-0.39V4.13C73.55,1.86,75.91,0,78.8,0c2.89,0,5.26,1.87,5.26,4.13V14.3l-0.03,0.39h24.11c1.03,0,1.87,0.84,1.87,1.87 v19.46c0,1.03-0.84,1.87-1.87,1.87H1.87C0.84,37.88,0,37.04,0,36.01V16.55C0,15.52,0.84,14.69,1.87,14.69L1.87,14.69z M0.47,42.19 h109.08c0.26,0,0.46,0.21,0.46,0.46l0,0v79.76c0,0.25-0.21,0.46-0.46,0.46l-109.08,0c-0.25,0-0.47-0.21-0.47-0.46V42.66 C0,42.4,0.21,42.19,0.47,42.19L0.47,42.19L0.47,42.19z"/></svg>
            </div>
            <span>2026. Jan. 18. | 11:11</span>
            <span style={{ margin: "0 4px" }}>-</span>
            <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
              11,228
              <span style={{ width: 16, height: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg viewBox="0 0 122.88 83.78" style={{ width: "100%", height: "100%", fill: "#64748b" }}><path d="M95.73,10.81c10.53,7.09,19.6,17.37,26.48,29.86l0.67,1.22l-0.67,1.21c-6.88,12.49-15.96,22.77-26.48,29.86 C85.46,79.88,73.8,83.78,61.44,83.78c-12.36,0-24.02-3.9-34.28-10.81C16.62,65.87,7.55,55.59,0.67,43.1L0,41.89l0.67-1.22 c6.88-12.49,15.95-22.77,26.48-29.86C37.42,3.9,49.08,0,61.44,0C73.8,0,85.45,3.9,95.73,10.81L95.73,10.81z M60.79,22.17l4.08,0.39 c-1.45,2.18-2.31,4.82-2.31,7.67c0,7.48,5.86,13.54,13.1,13.54c2.32,0,4.5-0.62,6.39-1.72c0.03,0.47,0.05,0.94,0.05,1.42 c0,11.77-9.54,21.31-21.31,21.31c-11.77,0-21.31-9.54-21.31-21.31C39.48,31.71,49.02,22.17,60.79,22.17L60.79,22.17L60.79,22.17z M109,41.89c-5.5-9.66-12.61-17.6-20.79-23.11c-8.05-5.42-17.15-8.48-26.77-8.48c-9.61,0-18.71,3.06-26.76,8.48 c-8.18,5.51-15.29,13.45-20.8,23.11c5.5,9.66,12.62,17.6,20.8,23.1c8.05,5.42,17.15,8.48,26.76,8.48c9.62,0,18.71-3.06,26.77-8.48 C96.39,59.49,103.5,51.55,109,41.89L109,41.89z"/></svg>
              </span>
            </span>
          </div>

          {/* Author + Social Icons Row */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "15px 0",
              borderTop: "1px solid #e2e8f0",
              borderBottom: "1px solid #e2e8f0",
              maxWidth: 720,
              marginBottom: 28,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div style={{ fontSize: 14, color: "#334155" }}>
                Írta: <span style={{ fontWeight: 700 }}>Fodor Anna</span>
              </div>
              <div style={{ fontSize: 14, color: "#334155" }}>
                egy felelősségteljes cica gazdi
              </div>
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

        {/* ══ Two-Column Layout (starts at hero image) ══ */}
        <div className="two-col-wrapper">
          {/* ────────────── LEFT: Main Article ────────────── */}
          <div className="main-content">
            {/* Hero Image */}
            <img src={IMAGES.hero} alt="Boróka cica" style={{ width: "100%", borderRadius: 12, marginBottom: 24 }} />

            {/* ═══ ARTICLE BODY ═══ */}
            <article
              style={{
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: 16,
                lineHeight: 1.85,
                color: "#3a352e",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  margin: "36px 0 16px",
                  color: "#2a2520",
                  lineHeight: 1.4,
                }}
              >
                Megígértem Borókának, hogy jobban fogok vigyázni rá. Tévedtem.
              </h3>

              <p style={{ marginBottom: 16 }}>
                Három éve tartottam a karomban Kormost, utoljára. Veseelégtelenség. Csak 9 éves volt.
              </p>

              <div className="intro-two-col">
                <div className="intro-two-col-text">
                  <div className="intro-bullet-block">
                    <p style={{ marginBottom: 16 }}>
                      Az állatorvos azt mondta, ez gyakori.{" "}
                      <strong><em>A cicák elrejtik a fájdalmat, amíg nem késő.</em></strong>{" "}
                      Mire Kormos abbahagyta az evést, a veséi már tönkrementek. Hónapokig hibáztattam magam.
                      Mit nem vettem észre? Mit csináltam rosszul? Amikor örökbe fogadtam Borókát, megesküdtem, hogy
                      másképp lesz. Ezúttal mindent jól csináltam.
                    </p>
                  </div>
                  <div className="intro-bullet-block">
                    <p style={{ marginBottom: 16 }}>
                      Prémium nedves és száraz táp vegyesen.{" "}
                      <strong><em>Állatorvosi vizsgálat félévente.</em></strong>{" "}
                      Semmi olcsó jutalomfalat. Még speciális vesevédő táplálékkiegészítőt is vettem.
                      Két évig Boróka virágzott. Aztán jöttek a vérvizsgálati eredmények, amiktől megállt a szívem.
                    </p>
                  </div>
                </div>
                <div className="intro-two-col-img">
                  <img src={IMAGES.catSad} alt="Szomorú cica" style={{ width: "100%", borderRadius: 10, objectFit: "cover" }} />
                </div>
              </div>

              <h3
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  margin: "36px 0 16px",
                  color: "#2a2520",
                  lineHeight: 1.4,
                }}
              >
                &ldquo;Korai Veseterhelés Jelei&rdquo;
              </h3>

              <p style={{ marginBottom: 16 }}>
                Ennek a 3 szónak köszönhetem életem legrosszabb napjait.
                <br />
                Hogy lehetséges ez?
              </p>
              <p style={{ marginBottom: 16 }}>
                MINDENT megváltoztattam Kormos halála után. Ezreket költöttem jobb ellátásra. Minden
                cikket elolvastam a cicák veseegészségéről. Mégis itt voltam.{" "}
                <strong><em>Ugyanazt a rémálmot éltem át újra.</em></strong>
              </p>
              <p style={{ marginBottom: 16 }}>
                Nem tudtam aludni. Nem tudtam enni. Valahányszor Boróka elsétált a vizes tálkája
                mellett, rosszul lettem.
              </p>
              <p style={{ marginBottom: 16 }}>Majd egyszer csak kattant valami.</p>
              <p style={{ marginBottom: 16 }}>
                A vizes tálkája.
                <br />
                Ugyanaz a kerámia tál, amit Kormosnál is használtam.
                <br />
                Ugyanaz a csapvíz, ugyanabból a konyhai csapból.
              </p>
              <p style={{ marginBottom: 16 }}>
                Megváltoztattam a tápot.{" "}
                <strong><em>Megváltoztattam az állatorvost. Mindent megváltoztattam, amit LÁTTAM.</em></strong>
                <br />
                De sosem kérdőjeleztem meg a vizet.
              </p>

              <div className="grid-4">
                <img src={IMAGES.catBowl1} alt="Cica és vizes tál" />
                <img src={IMAGES.catBowl2} alt="Cica és vizes tál" />
                <img src={IMAGES.catBowl3} alt="Cica és vizes tál" />
                <img src={IMAGES.catBowl4} alt="Cica és vizes tál" />
              </div>

              <h3
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  margin: "36px 0 16px",
                  color: "#2a2520",
                  lineHeight: 1.4,
                }}
              >
                A Láthatatlan Probléma, Amiről Soha Senki Nem Beszél
              </h3>

              <p style={{ marginBottom: 16 }}>
                Úgy kezdtem kutatni, mintha a cicám élete múlna rajta.
                <br />
                Mert múlott is.
                <br />
                Amit találtam, sokkolt.
              </p>
              <p style={{ marginBottom: 16 }}>
                A cicáknak napi <strong><em>200-300 ml vizet kellene inniuk.</em></strong>{" "}
                A legtöbb cica ennek a felét sem issza meg.
              </p>
              <p style={{ marginBottom: 16 }}>
                Miért? Mert az álló víz a tálban beindítja a túlélési ösztöneiket.
                <br />
                A vadonban az álló víz gyakran veszélyt jelent. Baktériumok. Paraziták. Halál.
              </p>
              <p style={{ marginBottom: 16 }}>
                <strong><em>Ezért kerülik a cicák, anélkül hogy tudnák miért.</em></strong>
                <br />
                Apró kortyokat isznak. Épp annyit, hogy túléljenek. Sosem eleget ahhoz, hogy
                egészségesek legyenek.
              </p>
              <p style={{ marginBottom: 16 }}>És itt tört össze bennem valami:</p>
              <p style={{ marginBottom: 16, fontWeight: 700, fontStyle: "italic" }}>
                A krónikus kiszáradás a vesebetegség első számú oka cicáknál.
              </p>
              <p style={{ marginBottom: 16 }}>
                Nem a rossz táp. Nem a genetika. Nem az életkor.
                <br />
                A víz. Pontosabban a NEM ELÉG víz.
              </p>
              <p style={{ marginBottom: 16 }}>
                Azt hittem, Kormos eleget iszik, mert láttam a tálnál. De alig kortyolgatott.{" "}
                <strong><em>A veséi évekig túlóráztak, hogy szűrjék a méreganyagokat, szinte víz nélkül.</em></strong>
              </p>
              <p style={{ marginBottom: 16 }}>
                És pontosan ugyanezt a helyzetet teremtettem meg Borókánál is.
                <br />
                Ugyanaz a tál. Ugyanaz az álló víz. Ugyanaz a lassú károsodás, amit nem láttam.
              </p>

              <h3
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  margin: "36px 0 16px",
                  color: "#2a2520",
                  lineHeight: 1.4,
                }}
              >
                Miért Változtat Meg Mindent A Mozgó Víz
              </h3>

              <div className="moving-water-layout">
                <div className="moving-water-text">
                  <p style={{ marginBottom: 16 }}>
                    A cicákat vonzza a mozgó víz.
                    <br />
                    Ez be van égetve az agyukba. A folyó víz friss vizet jelent. Biztonságos vizet. Életet.
                  </p>
                  <p style={{ marginBottom: 16 }}>
                    Kutatások szerint a cicák 3x több vizet isznak, ha az áramlik és mozog.
                  </p>
                  <ul style={{ margin: "16px 0", paddingLeft: 24, lineHeight: 2, color: "#3a352e" }}>
                    <li>A bajszuk nem ér az oldalához (amit utálnak).</li>
                    <li>A hang vonzza őket.</li>
                    <li>A mozgás azt üzeni az ösztöneiknek: ez a víz biztonságos.</li>
                  </ul>
                  <p style={{ marginBottom: 16 }}>
                    Találnom kellett egy módot, hogy Borókának 0-24 folyó vizet adjak.
                    <br />
                    Ekkor fedeztem fel a <strong>Mirathelle Macska Ivókutat</strong>.
                  </p>
                </div>
                <div className="moving-water-img">
                  <img src={IMAGES.fountain} alt="Mirathelle Macska Ivókút" style={{ width: "100%", borderRadius: 10, objectFit: "cover" }} />
                </div>
              </div>

              <h3
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  margin: "36px 0 16px",
                  color: "#2a2520",
                  lineHeight: 1.4,
                }}
              >
                Amikor Boróka Először Ivott Igazi Vizet
              </h3>

              <p style={{ marginBottom: 16 }}>
                Ideges voltam, amikor összeszereltem.
                <br />
                Mi van, ha figyelmen kívül hagyja? Mi van, ha már késő?
              </p>
              <p style={{ marginBottom: 16 }}>
                Bedugom a konnektorba. A víz elkezdett folyni egy lágy sugárban.
                <br />
                Boróka fülei felálltak.
                <br />
                Lassan odament. Megszagolta.
              </p>
              <p style={{ marginBottom: 16 }}>
                <strong>Aztán ivott. És ivott. És tovább ivott.</strong>
              </p>
              <p style={{ marginBottom: 16 }}>
                Ott sírtam el magam a konyhámban.
                <br />
                Két év alatt sosem láttam így inni.
              </p>
              <p style={{ marginBottom: 16 }}>
                Az első héten belül változásokat vettem észre.
                <br />
                A szőre fényesebbnek tűnt. Több energiája volt.{" "}
                <strong>Naponta többször ODAMENT a szökőkúthoz.</strong>
              </p>
              <p style={{ marginBottom: 16 }}>
                3 hónap múlva újra vérvizsgálatot csináltattunk.
                <br />
                Az állatorvos értetlenkedett.
                <br />
                <strong>&ldquo;A veseértékei javultak. Min változtatott?&rdquo;</strong>
              </p>
              <p style={{ marginBottom: 24 }}>Csak a vízen. Ennyi.</p>

              <h3
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  margin: "36px 0 16px",
                  color: "#2a2520",
                  lineHeight: 1.4,
                }}
              >
                Mitől Más Ez Az Ivókút
              </h3>

              <p style={{ marginBottom: 16 }}>
                A <strong>Mirathelle Macska Ivókút</strong> nem olyan, mint az olcsó műanyag
                szökőkutak, amik két nap alatt benyálkásodnak.
              </p>
              <p style={{ marginBottom: 16 }}>
                Háromszintű szűrés – mechanikus, aktív szén, ioncserélő, ami eltávolítja a rossz
                ízeket és szagokat.
              </p>
              <p style={{ marginBottom: 16 }}>
                A víz folyamatosan áramlik. Friss és oxigéndús marad. Orvosi minőségű szűrt víz.
                1,8 liter fér bele – szóval nem szárad ki, amíg dolgozol.
              </p>
              <p style={{ marginBottom: 16 }}>
                Halk. Boróka néha mellette alszik.
                <br />
                A tisztítása 5 percet vesz igénybe hetente egyszer.
              </p>
              <p style={{ marginBottom: 16 }}>
                8 hónapja van meg. Boróka több vizet iszik, mint valaha.
                <br />
                Valahányszor hallom azt a lágy csobogást, Kormosra gondolok.
                <br />
                Bárcsak hamarabb tudtam volna.
              </p>

              {/* ═══ PRODUCT CARD ═══ */}
              <div className="product-highlight-card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "28px 32px", flexWrap: "wrap", gap: 16 }}>
                  <div>
                    <h2
                      style={{
                        fontFamily: "'Libre Baskerville', serif",
                        fontSize: 24,
                        fontWeight: 700,
                        color: "#fff",
                        marginBottom: 4,
                      }}
                    >
                      Mirathelle Ivókút
                    </h2>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", fontWeight: 500, margin: 0 }}>
                      4 Hónapnyi Ajándék Szűrővel
                    </p>
                  </div>
                  <a
                    href={PRODUCT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackClick("mid-article-cta", "Ivókút - Közép CTA")}
                    style={{
                      display: "inline-block",
                      background: "#2ecc40",
                      color: "#fff",
                      borderRadius: 8,
                      padding: "16px 40px",
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: 16,
                      fontWeight: 700,
                      textDecoration: "none",
                      letterSpacing: 1.5,
                      textTransform: "uppercase",
                      flexShrink: 0,
                    }}
                  >
                    TOVÁBB
                  </a>
                </div>
              </div>

              <h3
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  margin: "36px 0 16px",
                  color: "#2a2520",
                  lineHeight: 1.4,
                }}
              >
                Azért Osztom Meg, Mert Nekem Senki Nem Mondta El
              </h3>

              <p style={{ marginBottom: 16 }}>
                Miután posztoltam Boróka javulásáról a Facebookon,{" "}
                <strong><em>14 ismerősöm írt, hogy milyen szökőkutat vettem.</em></strong>
              </p>
              <p style={{ marginBottom: 16 }}>
                Hárman már elveszítettek cicát veseproblémák miatt.
                <br />
                Kettőnek a cicája korai figyelmeztető jeleket mutatott.
              </p>
              <p style={{ marginBottom: 16, fontWeight: 700, fontStyle: "italic" }}>
                Egyikük sem tudott az álló víz problémájáról. Ennek az információnak mindenhol ott
                kellene lennie. De nincs.
              </p>
              <p style={{ marginBottom: 16 }}>
                Az állatorvosok azt mondják, &ldquo;ösztönözze a folyadékbevitelt.&rdquo; Nem mondják
                el, MIÉRT nem iszik a cicád.
              </p>
              <p style={{ marginBottom: 16 }}>
                Ezért elmondom mindenkinek, aki hajlandó meghallgatni:
              </p>
              <p style={{ marginBottom: 16, fontWeight: 700, fontStyle: "italic" }}>
                Ha a cicád tálból iszik, valószínűleg nem iszik eleget.
              </p>
              <p style={{ marginBottom: 16 }}>
                Lehet, hogy évekig nem látod a károsodást. De megtörténik.
              </p>

              <h3
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: 22,
                  fontWeight: 700,
                  margin: "36px 0 16px",
                  color: "#2a2520",
                  lineHeight: 1.4,
                }}
              >
                Ne Várd Meg A Vérvizsgálatot, Ami Összetöri A Szíved
              </h3>

              <p style={{ marginBottom: 16 }}>
                Mielőtt lezárom, még egy dolgot szeretnék tisztán elmondani.
                <br />
                Igen, most már nekem is származik belőle hasznom, ha valaki ezen az oldalon keresztül
                vásárol. De ezelőtt is már halálra untattam az összes cicás ismerősömet az
                áradozásommal.
              </p>
              <p style={{ marginBottom: 16 }}>
                A Mirathelle Ivókút kevesebbe kerül, mint egy sürgősségi állatorvosi vizit.
                <br />
                Kevesebbe, mint a táplálékkiegészítők, amikre feleslegesen költöttem.
                <br />
                Kevesebbe, mint a bűntudat, hogy &ldquo;mi lett volna, ha.&rdquo;
              </p>
              <p style={{ marginBottom: 16, fontWeight: 700, fontStyle: "italic" }}>
                Pénzvisszafizetési garanciával jár.
              </p>
              <p style={{ marginBottom: 16 }}>
                Ha a cicád nem iszik többet, visszaküldheted.
                <br />
                De még sosem hallottam, hogy ez megtörtént volna.
                <br />
                A cicák IMÁDJÁK a mozgó vizet. Ez biológia.
              </p>
              <p style={{ marginBottom: 24 }}>
                <a href={PRODUCT_URL} target="_blank" rel="noopener noreferrer" className="inline-link" onClick={() => trackClick("link1-boroka", "👉 Link1 - Megmentette Borókát")}>
                  👉 Kattints Ide, Hogy Megnézd Az Ivókutat, Ami Megmentette Borókát
                </a>
              </p>
              <p style={{ marginBottom: 16 }}>
                Ha elveszítettél már cicát vesebetegségben, tudod milyen fájdalom.
                <br />
                Ha megesküdtél, hogy a következővel jobban vigyázol, így teheted meg.
                <br />
                Ne változtass meg mindent, kivéve az egy dolgot, ami számít.
              </p>
              <p style={{ marginBottom: 16 }}>
                Én majdnem kétszer követtem el ezt a hibát. Boróka most a szökőkútja mellett alszik.
                Egészségesen. Hidratáltan. Biztonságban.
                <br />
                Csak ennyit akartam.
              </p>
              <p style={{ marginBottom: 24 }}>
                <a href={PRODUCT_URL} target="_blank" rel="noopener noreferrer" className="inline-link" onClick={() => trackClick("link2-keszlet", "👉 Link2 - Készleten Van")}>
                  👉 Szerezd Be A Mirathelle Ivókutat, Amíg Készleten Van
                </a>
              </p>
              <p style={{ marginBottom: 16 }}>
                Két választásod van:
                <br />
                Megtartod ugyanazt a vizes tálat, és reménykedsz a legjobbakban.
                <br />
                Vagy 5 percet szánsz egy szökőkút beállítására, ami éveket adhat a cicád életéhez.
              </p>
              <p style={{ marginBottom: 16 }}>
                Tudom, melyiket választottam én.
                <br />
                Boróka minden iváskor megköszöni.
              </p>
              <p style={{ marginBottom: 40 }}>
                <a href={PRODUCT_URL} target="_blank" rel="noopener noreferrer" className="inline-link" onClick={() => trackClick("link3-szurok", "👉 Link3 - Ingyenes Szűrők")}>
                  👉 Nézd Meg, Amég Ingyenes Szűrőket Is Adnak Ajándékba Mellé
                </a>
              </p>
            </article>

            {/* ═══ PRODUCT PURCHASE CARD ═══ */}
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                border: "1px solid #e8e4dc",
                overflow: "hidden",
                marginBottom: 48,
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}
            >
              <img
                src={IMAGES.productCard}
                alt="Mirathelle Ivókút"
                style={{ width: "100%", maxWidth: 400, objectFit: "cover", margin: "0 auto", display: "block" }}
              />
              <div style={{ padding: "28px 24px", textAlign: "center" }}>
                <h2
                  style={{
                    fontFamily: "'Libre Baskerville', serif",
                    fontSize: 22,
                    fontWeight: 700,
                    color: "#2a2520",
                    marginBottom: 8,
                  }}
                >
                  Szerezd Be Még Most Amíg Jár Mellé Ajándék 🎁
                </h2>
                <div style={{ margin: "20px 0" }}>
                  <CTAButton href={PRODUCT_URL} trackId="bottom-card-cta" trackLabel="Alsó Kártya - TOVÁBB A TERMÉKHEZ">TOVÁBB A TERMÉKHEZ</CTAButton>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 32,
                    marginTop: 20,
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#5a5549",
                    flexWrap: "wrap",
                  }}
                >
                  <span>✓ Ingyenes szállítás</span>
                  <span>✓ 4 hónapra elegendő ajándék szűrő</span>
                </div>
              </div>
            </div>

            {/* ═══ REVIEWS (inline) ═══ */}
            <div className="testimonials-grid" style={{ marginBottom: 48 }}>
              <h2 className="testimonials-title">Másoknak is bevált</h2>
              <div className="cards-wrapper">
                {/* CARD 1 */}
                <div className="testimonial-card">
                  <div className="tc-stars">★★★★★</div>
                  <div className="tc-quote-icon">&ldquo;</div>
                  <h3>Tökéletes ivókút nem léte...</h3>
                  <p>
                    A múltban vettem jó néhány ivókutat nagy állatkereskedési láncokból, eddig sosem volt az igazi vagy sosem működött, vagy csak rövid ideig. Féltem is kicsit, amikor ezt megrendeltem, de hatalmas pozitív csalódás volt. Nagyon elégedett vagyok. A rozsdamentes acél megnyugtat a mosások közötti túlzott baktériumszaporodás ellen. Nem is lehetne egyszerűbb felállítani és feltölteni. A macskák pedig imádják. Sokkal több vizet isznak, mióta megkapták. Az is tetszik, hogy jó mennyiségű vizet tárol anélkül, hogy túl sok helyet foglalna.
                  </p>
                  <div className="tc-reviewer-name">Attila D.</div>
                </div>
                {/* CARD 2 */}
                <div className="testimonial-card">
                  <div className="tc-stars">★★★★★</div>
                  <div className="tc-quote-icon">&ldquo;</div>
                  <h3>Hatalmas változás a macska általános egészségi állapotában</h3>
                  <p>
                    Miért nem vettem meg ezt hamarabb? Szinte teljesen hangtalan, és a macskáim több vizet isznak, mint valaha. Óriási változást hozott az emésztésükben! Rendszeresebben végeznek (és nem azok az apró székrekedéses golyócskák, hanem rendes ürülék), és a szőrük is egészségesebbnek tűnik. Csak ügyelj rá, hogy néhány naponta tisztítsd, mert elég csúnyává válhat odabent, de nagyon könnyű szétszedni!
                  </p>
                  <div className="tc-reviewer-name">Kata N.</div>
                </div>
              </div>
            </div>

            {/* ═══ FAQ ═══ */}
            <div style={{ marginBottom: 48 }}>
              <h2
                style={{
                  fontFamily: "'Libre Baskerville', serif",
                  fontSize: 24,
                  fontWeight: 700,
                  textAlign: "center",
                  marginBottom: 28,
                  color: "#2a2520",
                }}
              >
                Gyakran ismételt kérdések
              </h2>
              <FAQItem
                question="Milyen gyakran kell cserélni a szűrőket?"
                answer="A friss, tiszta víz biztosítása érdekében javasoljuk, hogy hetente cserélje ki a szűrőt."
              />
              <FAQItem
                question="Mi történik, ha a macskám nem szereti?"
                answer="Ha a macskád nem szereti vagy kerüli, várj 3–4 napot, hogy megszokja. Ha továbbra is kerüli, tegyél macskamentát a kifolyóra."
              />
              <FAQItem
                question="Mi történik, ha a szivattyú nem működik?"
                answer="Írj nekünk a support@mirathelle.com címre. Gondoskodunk róla, hogy megkapd a szükséges segítséget."
              />
              <FAQItem question="Folyamatosan működik?" answer="Igen, folyamatosan." />
              <FAQItem
                question="Rozsdamentes acélból készült?"
                answer="Igen, 304-es rozsdamentes acélból készült."
              />
            </div>
          </div>

          {/* ────────────── RIGHT: Sticky Sidebar ────────────── */}
          <aside className="right-sidebar">
            {/* Video Placeholder (blank - ready for video embed) */}
            <div
              style={{
                background: "#fff",
                borderRadius: 12,
                border: "1px solid #e8e4dc",
                overflow: "hidden",
                marginTop: 0,
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              }}
            >
              {/* Empty space for video - replace this div with your video embed */}
              <div style={{ width: "100%", aspectRatio: "9/16", background: "#f0ece4" }} />
              <div style={{ padding: 16, textAlign: "center" }}>
                <a
                  href={PRODUCT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackClick("sidebar-cta", "Sidebar Zöld TOVÁBB")}
                  style={{
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
                    transition: "background 0.2s ease",
                  }}
                >
                  TOVÁBB
                </a>
              </div>
            </div>

            {/* 3 Images Stacked Vertically */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 20 }}>
              <video
                src="https://cdn.shopify.com/videos/c/o/v/185659e5dbad4195b8e3e2b16224ac2f.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{ width: "100%", borderRadius: 10, objectFit: "cover" }}
              />
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