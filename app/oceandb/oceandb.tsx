"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";

/* ─── Types ─── */
interface ClickEvent {
  id: string;
  label: string;
  timestamp: string;
  userAgent?: string;
  referer?: string;
}

interface ButtonStat {
  id: string;
  label: string;
  count: number;
}

interface TrackResponse {
  total: number;
  stats: ButtonStat[];
  bestPerformer: ButtonStat | null;
  events: ClickEvent[];
}

/* ─── Helpers ─── */
function formatDate(d: Date): string {
  return d.toISOString().split("T")[0];
}

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("hu-HU", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function getToday(): string {
  return formatDate(new Date());
}

function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return formatDate(d);
}

/* ─── Color map for buttons ─── */
const BUTTON_COLORS: Record<string, string> = {
  "sticky-bar": "#2ecc40",
  "mid-article-cta": "#6b4c8a",
  "link1-boroka": "#e07c5a",
  "link2-keszlet": "#d4a34a",
  "link3-szurok": "#1da1f2",
  "bottom-card-cta": "#e60023",
  "sidebar-cta": "#3b5998",
};

const FALLBACK_COLOR = "#2dd4bf";

/* ═══════════════════════════════════════════════ */
/*  MAIN DASHBOARD                                 */
/* ═══════════════════════════════════════════════ */

type FilterPreset = "all" | "today" | "yesterday" | "today+yesterday" | "custom";

export default function OceanDB() {
  const [data, setData] = useState<TrackResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [preset, setPreset] = useState<FilterPreset>("all");
  const [customFrom, setCustomFrom] = useState(getYesterday());
  const [customTo, setCustomTo] = useState(getToday());
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const perPage = 25;

  /* Build query params based on filters */
  const buildUrl = useCallback(() => {
    const params = new URLSearchParams();
    const today = getToday();
    const yesterday = getYesterday();

    switch (preset) {
      case "today":
        params.set("from", today);
        params.set("to", today);
        break;
      case "yesterday":
        params.set("from", yesterday);
        params.set("to", yesterday);
        break;
      case "today+yesterday":
        params.set("from", yesterday);
        params.set("to", today);
        break;
      case "custom":
        params.set("from", customFrom);
        params.set("to", customTo);
        break;
    }

    return `/api/track?${params.toString()}`;
  }, [preset, customFrom, customTo]);

  /* Fetch data */
  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(buildUrl());
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json: TrackResponse = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }, [buildUrl]);

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchData]);

  const buttonStats = data?.stats || [];
  const bestPerformer = data?.bestPerformer || null;
  const totalClicks = data?.total || 0;

  const displayEvents = useMemo(() => {
    if (!data) return [];
    if (!selectedButton) return data.events;
    return data.events.filter((e) => e.id === selectedButton);
  }, [data, selectedButton]);

  const totalPages = Math.ceil(displayEvents.length / perPage);
  const pagedData = displayEvents.slice((currentPage - 1) * perPage, currentPage * perPage);
  const resetPage = () => setCurrentPage(1);

  return (
    <div style={{ fontFamily: "'IBM Plex Mono', 'JetBrains Mono', monospace", background: "#0a0e1a", color: "#c8d6e5", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        .ocean-header {
          background: linear-gradient(135deg, #0a0e1a 0%, #0d1b2a 50%, #1b2838 100%);
          border-bottom: 1px solid rgba(45, 212, 191, 0.15);
          padding: 28px 32px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .ocean-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 28px;
          font-weight: 700;
          background: linear-gradient(135deg, #2dd4bf, #22d3ee, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 4px;
        }
        .ocean-subtitle {
          font-size: 13px;
          color: #4a5568;
          letter-spacing: 2px;
          text-transform: uppercase;
        }
        .ocean-body {
          padding: 24px 32px;
          max-width: 1400px;
          margin: 0 auto;
        }
        .filter-bar {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 24px;
          align-items: center;
        }
        .filter-btn {
          padding: 8px 18px;
          border-radius: 6px;
          border: 1px solid #1e293b;
          background: #111827;
          color: #94a3b8;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        .filter-btn:hover { border-color: #2dd4bf; color: #e2e8f0; }
        .filter-btn.active {
          background: rgba(45, 212, 191, 0.12);
          border-color: #2dd4bf;
          color: #2dd4bf;
        }
        .custom-date-input {
          padding: 7px 12px;
          border-radius: 6px;
          border: 1px solid #1e293b;
          background: #111827;
          color: #e2e8f0;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          color-scheme: dark;
        }
        .custom-date-input:focus { outline: none; border-color: #2dd4bf; }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 16px;
          margin-bottom: 28px;
        }
        .stat-card {
          background: #111827;
          border: 1px solid #1e293b;
          border-radius: 12px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.25s;
          position: relative;
          overflow: hidden;
        }
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--accent);
          opacity: 0.6;
        }
        .stat-card:hover {
          border-color: #2dd4bf;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        .stat-card.selected {
          border-color: #2dd4bf;
          background: rgba(45, 212, 191, 0.06);
        }
        .stat-card.best::after {
          content: '🏆 BEST';
          position: absolute;
          top: 12px; right: 12px;
          font-size: 10px;
          font-weight: 700;
          color: #fbbf24;
          letter-spacing: 1px;
        }
        .stat-count {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 32px;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 6px;
        }
        .stat-label {
          font-size: 12px;
          color: #64748b;
          line-height: 1.4;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .stat-id { font-size: 11px; color: #374151; margin-top: 4px; }
        .stat-pct { font-size: 11px; color: #4a5568; margin-top: 2px; }
        .stat-bar {
          height: 4px;
          border-radius: 2px;
          background: #1e293b;
          margin-top: 12px;
          overflow: hidden;
        }
        .stat-bar-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 0.5s ease;
        }
        .summary-row {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }
        .summary-box {
          background: #111827;
          border: 1px solid #1e293b;
          border-radius: 12px;
          padding: 20px 24px;
          flex: 1;
          min-width: 180px;
        }
        .summary-number {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 36px;
          font-weight: 700;
          color: #2dd4bf;
        }
        .summary-label {
          font-size: 12px;
          color: #4a5568;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-top: 4px;
        }
        .event-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        .event-table th {
          text-align: left;
          padding: 12px 16px;
          color: #4a5568;
          font-weight: 600;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          border-bottom: 1px solid #1e293b;
          background: #0f172a;
        }
        .event-table td {
          padding: 10px 16px;
          border-bottom: 1px solid rgba(30,41,59,0.5);
          color: #94a3b8;
        }
        .event-table tr:hover td { background: rgba(45, 212, 191, 0.03); }
        .dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 8px;
        }
        .pagination {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-top: 20px;
          align-items: center;
        }
        .page-btn {
          padding: 6px 14px;
          border-radius: 6px;
          border: 1px solid #1e293b;
          background: #111827;
          color: #94a3b8;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .page-btn:hover { border-color: #2dd4bf; color: #e2e8f0; }
        .page-btn:disabled { opacity: 0.3; cursor: default; }
        .page-info { font-size: 12px; color: #4a5568; }
        .table-wrap {
          background: #111827;
          border: 1px solid #1e293b;
          border-radius: 12px;
          overflow: hidden;
        }
        .clear-filter {
          font-size: 11px;
          color: #ef4444;
          cursor: pointer;
          padding: 4px 10px;
          border: 1px solid rgba(239,68,68,0.3);
          border-radius: 4px;
          background: transparent;
          font-family: 'IBM Plex Mono', monospace;
          transition: all 0.2s;
        }
        .clear-filter:hover { background: rgba(239,68,68,0.1); }
        .refresh-btn {
          padding: 6px 14px;
          border-radius: 6px;
          border: 1px solid #1e293b;
          background: #111827;
          color: #94a3b8;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .refresh-btn:hover { border-color: #2dd4bf; color: #2dd4bf; }
        .live-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 6px;
          animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .empty-state {
          text-align: center;
          padding: 60px 20px;
        }
        .empty-state h3 {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 20px;
          color: #4a5568;
          margin-bottom: 8px;
        }
        .empty-state p { font-size: 13px; color: #374151; }
        .error-box {
          background: rgba(239, 68, 68, 0.08);
          border: 1px solid rgba(239, 68, 68, 0.3);
          border-radius: 12px;
          padding: 24px;
          text-align: center;
          color: #ef4444;
          font-size: 14px;
          margin-bottom: 24px;
        }
      `}</style>

      {/* Header */}
      <div className="ocean-header">
        <div>
          <h1 className="ocean-title">OceanDB</h1>
          <p className="ocean-subtitle">Click Analytics · Live Dashboard</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <label style={{ fontSize: 12, color: "#4a5568", display: "flex", alignItems: "center", cursor: "pointer" }}>
            <span className="live-dot" style={{ background: autoRefresh ? "#2ecc40" : "#374151" }} />
            <input type="checkbox" checked={autoRefresh} onChange={(e) => setAutoRefresh(e.target.checked)} style={{ display: "none" }} />
            {autoRefresh ? "LIVE" : "PAUSED"}
          </label>
          <button className="refresh-btn" onClick={() => { setLoading(true); fetchData(); }}>↻ Refresh</button>
        </div>
      </div>

      <div className="ocean-body">
        {/* Filter Bar */}
        <div className="filter-bar">
          {([
            ["all", "All Time"],
            ["today", "Today"],
            ["yesterday", "Yesterday"],
            ["today+yesterday", "Today + Yesterday"],
            ["custom", "Custom Range"],
          ] as [FilterPreset, string][]).map(([key, label]) => (
            <button
              key={key}
              className={`filter-btn ${preset === key ? "active" : ""}`}
              onClick={() => { setPreset(key); resetPage(); setSelectedButton(null); }}
            >
              {label}
            </button>
          ))}
          {preset === "custom" && (
            <>
              <input type="date" className="custom-date-input" value={customFrom} onChange={(e) => { setCustomFrom(e.target.value); resetPage(); }} />
              <span style={{ color: "#4a5568" }}>→</span>
              <input type="date" className="custom-date-input" value={customTo} onChange={(e) => { setCustomTo(e.target.value); resetPage(); }} />
            </>
          )}
          {selectedButton && (
            <button className="clear-filter" onClick={() => { setSelectedButton(null); resetPage(); }}>
              ✕ Clear: {selectedButton}
            </button>
          )}
        </div>

        {error && (
          <div className="error-box">
            Failed to load: {error}
            <br />
            <button className="refresh-btn" style={{ marginTop: 12 }} onClick={fetchData}>Try again</button>
          </div>
        )}

        {loading && !data && <div style={{ textAlign: "center", padding: 80, color: "#4a5568" }}>Loading...</div>}

        {data && (
          <>
            {/* Summary */}
            <div className="summary-row">
              <div className="summary-box">
                <div className="summary-number">{totalClicks.toLocaleString()}</div>
                <div className="summary-label">Total Clicks</div>
              </div>
              <div className="summary-box">
                <div className="summary-number">{buttonStats.length}</div>
                <div className="summary-label">Unique Buttons</div>
              </div>
              <div className="summary-box">
                <div className="summary-number" style={{ color: "#fbbf24" }}>
                  {bestPerformer ? bestPerformer.count.toLocaleString() : "—"}
                </div>
                <div className="summary-label">🏆 Best: {bestPerformer?.id || "—"}</div>
              </div>
              <div className="summary-box">
                <div className="summary-number" style={{ color: buttonStats.length > 0 ? "#ef4444" : "#4a5568" }}>
                  {buttonStats.length > 0 ? buttonStats[buttonStats.length - 1].count.toLocaleString() : "—"}
                </div>
                <div className="summary-label">⚠ Worst: {buttonStats.length > 0 ? buttonStats[buttonStats.length - 1].id : "—"}</div>
              </div>
            </div>

            {totalClicks === 0 && (
              <div className="empty-state">
                <h3>No clicks recorded yet</h3>
                <p>Clicks from MirathelleArticle will appear here in real-time.</p>
                <p style={{ marginTop: 8, color: "#2dd4bf" }}>Auto-refreshes every 10 seconds.</p>
              </div>
            )}

            {/* Stat Cards */}
            {buttonStats.length > 0 && (
              <div className="stats-grid">
                {buttonStats.map((btn) => {
                  const pct = totalClicks > 0 ? (btn.count / totalClicks) * 100 : 0;
                  const color = BUTTON_COLORS[btn.id] || FALLBACK_COLOR;
                  const isBest = bestPerformer?.id === btn.id;
                  const isSelected = selectedButton === btn.id;
                  return (
                    <div
                      key={btn.id}
                      className={`stat-card ${isBest ? "best" : ""} ${isSelected ? "selected" : ""}`}
                      style={{ "--accent": color } as React.CSSProperties}
                      onClick={() => { setSelectedButton(isSelected ? null : btn.id); resetPage(); }}
                    >
                      <div className="stat-count">{btn.count.toLocaleString()}</div>
                      <div className="stat-label" title={btn.label}>{btn.label}</div>
                      <div className="stat-id">{btn.id}</div>
                      <div className="stat-pct">{pct.toFixed(1)}% of total</div>
                      <div className="stat-bar">
                        <div className="stat-bar-fill" style={{ width: `${pct}%`, background: color }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Event Table */}
            {displayEvents.length > 0 && (
              <>
                <div className="table-wrap">
                  <table className="event-table">
                    <thead>
                      <tr>
                        <th style={{ width: 50 }}>#</th>
                        <th>Button ID</th>
                        <th>Label</th>
                        <th>Timestamp</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pagedData.map((e, i) => (
                        <tr key={i}>
                          <td style={{ color: "#374151" }}>{(currentPage - 1) * perPage + i + 1}</td>
                          <td>
                            <span className="dot" style={{ background: BUTTON_COLORS[e.id] || FALLBACK_COLOR }} />
                            {e.id}
                          </td>
                          <td style={{ color: "#cbd5e1" }}>{e.label}</td>
                          <td>{formatTimestamp(e.timestamp)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {totalPages > 1 && (
                  <div className="pagination">
                    <button className="page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage((p) => p - 1)}>← Prev</button>
                    <span className="page-info">Page {currentPage} of {totalPages} · {displayEvents.length} events</span>
                    <button className="page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage((p) => p + 1)}>Next →</button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}