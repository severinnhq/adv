"use client";

import React, { useState } from "react";


const PRODUCT_URL = "https://mirathelle.com/products/ivokut?ref=advertorial";

/* ─── Click Tracking ─── */
function trackClick(id: string, label: string) {
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, label }),
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

export default function MirathelleAdvert() {
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


        .advert-container a:hover { opacity: 0.85; }

        .hero-cta-bar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: linear-gradient(135deg, #6b4c8a, #8360a6);
          text-align: center;
          padding: 14px 20px;
          box-shadow: 0 2px 12px rgba(107,76,138,0.25);
        }
        .hero-cta-bar a {
          color: #fff;
          text-decoration: none;
          font-family: 'Libre Baskerville', serif;
          font-weight: 700;
          font-size: 15px;
          letter-spacing: 1px;
        }

        .article-img {
          width: 100%;
          border-radius: 10px;
          margin: 24px 0;
        }

        .grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
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
          background: linear-gradient(145deg, #f5f0ea, #ede7dd);
          border-radius: 16px;
          overflow: hidden;
          margin: 40px 0;
          border: 1px solid #ddd6ca;
        }

        .inline-link {
          color: #6b4c8a;
          font-weight: 700;
          text-decoration: underline;
          text-underline-offset: 3px;
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
          align-items: flex-start;
        }

        .main-content {
          flex: 1;
          max-width: 720px;
          min-width: 0;
        }

        .right-sidebar {
          width: 320px;
          flex-shrink: 0;
          position: sticky;
          top: 70px;
          max-height: calc(100vh - 90px);
          overflow-y: auto;
          padding-bottom: 40px;
        }

        /* Hide scrollbar on sidebar */
        .right-sidebar::-webkit-scrollbar { width: 0; }
        .right-sidebar { scrollbar-width: none; }

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

      <div className="advert-container">
        {/* ── Sticky CTA Bar ── */}
        <div className="hero-cta-bar">
          <a href={PRODUCT_URL} onClick={() => trackClick("sticky-bar", "Sticky Header CTA")}>→ KÉREM A MEGOLDÁST</a>
        </div>

        {/* ── Header section (full width, above two-col) ── */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          {/* Breadcrumb */}
          <nav
            style={{
              fontSize: 13,
              color: "#8a7e6e",
              padding: "20px 0 10px",
              fontFamily: "'Source Sans 3', sans-serif",
              maxWidth: 720,
            }}
          >
            <span style={{ cursor: "pointer" }}>Cicák</span>
            <span style={{ margin: "0 8px" }}>›</span>
            <span style={{ cursor: "pointer" }}>Cicák egészsége</span>
            <span style={{ margin: "0 8px" }}>›</span>
            <span style={{ color: "#2a2520" }}>Vesebetegség</span>
          </nav>

          {/* Title */}
          <h1
            style={{
              fontFamily: "'Libre Baskerville', serif",
              fontSize: "clamp(22px, 4vw, 32px)",
              fontWeight: 700,
              lineHeight: 1.35,
              color: "#2a2520",
              margin: "16px 0 12px",
              maxWidth: 720,
            }}
          >
            Majdnem Elveszítettem A Második Cicámat Ugyanabban, Ami Az Elsőt Is Elvitte
          </h1>

          {/* Meta */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 13,
              color: "#8a7e6e",
              marginBottom: 24,
              fontFamily: "'Source Sans 3', sans-serif",
              flexWrap: "wrap",
              maxWidth: 720,
            }}
          >
            <span>2026. Jan. 18.</span>
            <span>|</span>
            <span>11:11</span>
            <span>-</span>
            <span>11,228</span>
          </div>

          {/* Author */}
          <div style={{ fontSize: 14, color: "#5a5549", marginBottom: 8, maxWidth: 720 }}>
            Írta: <strong>Fodor Anna</strong>
          </div>
          <div style={{ fontSize: 13, fontStyle: "italic", color: "#8a7e6e", marginBottom: 28, maxWidth: 720 }}>
            egy felelősségteljes cica gazdi
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
                Három éve tartottam a karomban Kormost, utoljára.
                <br />
                Veseelégtelenség. Csak 9 éves volt.
              </p>
              <p style={{ marginBottom: 16 }}>
                Az állatorvos azt mondta, ez gyakori.{" "}
                <strong><em>A cicák elrejtik a fájdalmat, amíg nem késő.</em></strong>{" "}
                Mire Kormos abbahagyta az evést, a veséi már tönkrementek.
              </p>
              <p style={{ marginBottom: 16 }}>
                Hónapokig hibáztattam magam.
                <br />
                Mit nem vettem észre? Mit csináltam rosszul?
              </p>
              <p style={{ marginBottom: 16 }}>
                Amikor örökbe fogadtam Borókát, megesküdtem, hogy másképp lesz.
                <br />
                Ezúttal mindent jól csináltam.
              </p>
              <p style={{ marginBottom: 16 }}>
                Prémium nedves és száraz táp vegyesen.{" "}
                <strong><em>Állatorvosi vizsgálat félévente.</em></strong>{" "}
                Semmi olcsó jutalomfalat. Még speciális vesevédő táplálékkiegészítőt is vettem.
              </p>
              <p style={{ marginBottom: 16 }}>
                Két évig Boróka virágzott.
                <br />
                Aztán jöttek a vérvizsgálati eredmények, amiktől megállt a szívem.
              </p>

              <img src={IMAGES.catSad} alt="Szomorú cica" className="article-img" />

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

              <img src={IMAGES.fountain} alt="Mirathelle Macska Ivókút" className="article-img" />

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
                <div style={{ textAlign: "center", padding: "36px 24px" }}>
                  <h2
                    style={{
                      fontFamily: "'Libre Baskerville', serif",
                      fontSize: 24,
                      fontWeight: 700,
                      color: "#2a2520",
                      marginBottom: 8,
                    }}
                  >
                    Mirathelle Ivókút
                  </h2>
                  <p style={{ fontSize: 14, color: "#6b4c8a", fontWeight: 600, marginBottom: 24 }}>
                    4 Hónapnyi Ajándék Szűrővel
                  </p>
                  <CTAButton href={PRODUCT_URL} trackId="mid-article-cta" trackLabel="Ivókút - Közép CTA">TOVÁBB</CTAButton>
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
                <a href={PRODUCT_URL} className="inline-link" onClick={() => trackClick("link1-boroka", "👉 Link1 - Megmentette Borókát")}>
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
                <a href={PRODUCT_URL} className="inline-link" onClick={() => trackClick("link2-keszlet", "👉 Link2 - Készleten Van")}>
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
                <a href={PRODUCT_URL} className="inline-link" onClick={() => trackClick("link3-szurok", "👉 Link3 - Ingyenes Szűrők")}>
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
                style={{ width: "100%", objectFit: "cover", maxHeight: 360 }}
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
                Másoknak is bevált
              </h2>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
                <ReviewCard
                  name="Attila D."
                  title="Tökéletes ivókút nem léte..."
                  text="A múltban vettem jó néhány ivókutat nagy állatkereskedési láncokból, eddig sosem volt az igazi. Féltem is kicsit, amikor ezt megrendeltem, de hatalmas pozitív csalódás volt. A rozsdamentes acél megnyugtat. A macskák pedig imádják. Sokkal több vizet isznak, mióta megkapták."
                />
                <ReviewCard
                  name="Kata N."
                  title="Hatalmas változás a macska általános egészségi állapotában"
                  text="Miért nem vettem meg ezt hamarabb? Szinte teljesen hangtalan, és a macskáim több vizet isznak, mint valaha. Óriási változást hozott az emésztésükben! A szőrük is egészségesebbnek tűnik."
                />
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

            {/* Sidebar images */}
            <div className="sidebar-imgs">
              <img src={IMAGES.sidebar1} alt="Cica" />
              <img src={IMAGES.sidebar2} alt="Cica" />
              <img src={IMAGES.sidebar3} alt="Cica" />
            </div>

            {/* Final CTA */}
            <div style={{ textAlign: "center", padding: "40px 0 60px" }}>
              <CTAButton href={PRODUCT_URL} trackId="final-cta" trackLabel="Legalsó Tovább gomb">Tovább</CTAButton>
            </div>
          </div>

          {/* ────────────── RIGHT: Sticky Sidebar ────────────── */}
          <aside className="right-sidebar">
            {/* Product Widget */}
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
              <img
                src={IMAGES.sidebarProduct}
                alt="Mirathelle Ivókút"
                style={{ width: "100%", objectFit: "cover", height: 200 }}
              />
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

            {/* Sidebar Reviews */}
            <div style={{ marginTop: 28, padding: "0 4px" }}>
              <SidebarReview
                initials="SR"
                color="#6b4c8a"
                name="Szabó Rita"
                date="2 napja"
                text="Végre felelős gazdi vagyok! Korábban mindig aggódtam, hogy Max elég vizet iszik-e, de mióta megvan a Mirathelle, nyugodt vagyok. Látom, hogy folyamatosan issza a friss, szűrt vizet - már nem kell aggódnom a veseproblémák miatt. A legjobb befektetés volt, amit valaha tettem a cicám egészségéért. Minden felelős macskgazdának ajánlom!"
                image={IMAGES.sidebar1}
              />

              <div style={{ borderTop: "1px solid #eee", margin: "12px 0" }} />

              <SidebarReview
                initials="FP"
                color="#d4a34a"
                name="Ferenczi Petra"
                date="3 napja"
                text="Mindenki kérdezte tőlem, hogy mi változott, mert a cicám szőre teljesen megújult. Megmondom: az ivókút. Mióta megvan, háromszor annyi vizet iszik, mint előtte. Az állatorvos is megdicsérte a legutóbbi vizsgálaton."
                image={IMAGES.sidebar2}
              />

              <div style={{ borderTop: "1px solid #eee", margin: "12px 0" }} />

              <SidebarReview
                initials="KM"
                color="#e07c5a"
                name="Kovács Mária"
                date="5 napja"
                text="Két cicám van és mindkettő imádja. Az első naptól elkezdtek többet inni. Teljesen halk, könnyen tisztítható. Nem értem, miért nem vettem hamarabb!"
              />

              <div style={{ borderTop: "1px solid #eee", margin: "12px 0" }} />

              <SidebarReview
                initials="NT"
                color="#5a9e6f"
                name="Nagy Tamás"
                date="1 hete"
                text="A macskám 12 éves és az állatorvos figyelmeztett a vesékre. Azóta, hogy megvan az ivókút, a vérvizsgálati eredményei stabilak. Megérte minden forintot."
              />
            </div>
          </aside>
        </div>

        {/* Footer */}
        <div
          style={{
            background: "#2a2520",
            padding: "40px 20px",
            textAlign: "center",
            color: "#8a7e6e",
            fontSize: 13,
          }}
        >
          <p>© 2026 Mirathelle. Minden jog fenntartva.</p>
        </div>
      </div>
    </div>
  );
}