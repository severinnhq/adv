"use client";

import React, { useEffect, useState, useCallback } from "react";

interface ButtonEntry {
  label: string;
  total: number;
  todayCount: number;
  daily: Record<string, number>;
}

interface TrackingResponse {
  buttons: Record<string, ButtonEntry>;
  availableDates: string[];
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("hu-HU", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("hu-HU", { month: "short", day: "numeric" });
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split("T")[0];
}

export default function Dashboard() {
  const [rawData, setRawData] = useState<TrackingResponse>({ buttons: {}, availableDates: [] });
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState("");

  // "all" | "today" | "yesterday" | "custom"
  const [filterMode, setFilterMode] = useState<string>("all");
  const [selectedDates, setSelectedDates] = useState<Set<string>>(new Set());
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const today = getToday();
  const yesterday = getYesterday();

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Always fetch all data, filter client-side
      const res = await fetch("/api/track");
      if (!res.ok) {
        const errText = await res.text();
        console.error("API error", res.status, errText);
        setLoading(false);
        return;
      }
      const text = await res.text();
      const json: TrackingResponse = text
        ? JSON.parse(text)
        : { buttons: {}, availableDates: [] };
      setRawData(json);
      setLastRefresh(new Date().toLocaleTimeString("hu-HU"));
    } catch (err) {
      console.error("Failed to fetch tracking data", err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Determine which dates to include
  const activeDates: Set<string> | null = (() => {
    if (filterMode === "all") return null; // null = all dates
    if (filterMode === "today") return new Set([today]);
    if (filterMode === "yesterday") return new Set([yesterday]);
    if (filterMode === "today+yesterday") return new Set([today, yesterday]);
    // custom
    return selectedDates;
  })();

  // Filter and compute displayed data
  const filteredEntries: [string, { label: string; total: number; todayCount: number }][] = [];
  const buttons = rawData.buttons || {};

  for (const [id, entry] of Object.entries(buttons)) {
    const daily = entry.daily || {};
    let total: number;
    if (activeDates === null) {
      total = Object.values(daily).reduce((s, n) => s + n, 0);
    } else {
      total = 0;
      for (const date of activeDates) {
        total += daily[date] || 0;
      }
    }
    if (total > 0 || activeDates === null) {
      filteredEntries.push([
        id,
        { label: entry.label, total, todayCount: daily[today] || 0 },
      ]);
    }
  }

  filteredEntries.sort((a, b) => b[1].total - a[1].total);
  const totalClicks = filteredEntries.reduce((sum, [, v]) => sum + v.total, 0);
  const availableDates = rawData.availableDates || [];

  const toggleDate = (date: string) => {
    setSelectedDates((prev) => {
      const next = new Set(prev);
      if (next.has(date)) next.delete(date);
      else next.add(date);
      return next;
    });
    setFilterMode("custom");
  };

  const setQuickFilter = (mode: string) => {
    setFilterMode(mode);
    setSelectedDates(new Set());
    setDatePickerOpen(false);
  };

  const resetAll = async () => {
    if (!confirm("Biztos törlöd az ÖSSZES adatot? Ez nem vonható vissza!")) return;
    await fetch("/api/track/reset", { method: "POST" });
    fetchData();
  };

  // Label for the active filter
  const filterLabel = (() => {
    if (filterMode === "all") return null;
    if (filterMode === "today") return "Ma";
    if (filterMode === "yesterday") return "Tegnap";
    if (filterMode === "today+yesterday") return "Ma + Tegnap";
    if (filterMode === "custom" && selectedDates.size > 0) {
      const dates = Array.from(selectedDates).sort();
      if (dates.length <= 3) return dates.map(formatDateShort).join(", ");
      return `${dates.length} nap kiválasztva`;
    }
    return null;
  })();

  const pillStyle = (active: boolean) => ({
    background: active ? "#7c3aed" : "#27272a",
    color: active ? "#fff" : "#a1a1aa",
    border: active ? "1px solid #7c3aed" : "1px solid #3f3f46",
    borderRadius: 20,
    padding: "7px 18px",
    fontSize: 13,
    fontWeight: 600 as const,
    cursor: "pointer" as const,
    transition: "all 0.2s",
    whiteSpace: "nowrap" as const,
  });

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
        background: "#0f0f13",
        color: "#e4e4e7",
        minHeight: "100vh",
        padding: "40px 24px",
      }}
    >
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        {/* ── Header ── */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 32,
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, color: "#fff" }}>
              📊 Kattintás Követő
            </h1>
            <p style={{ fontSize: 13, color: "#71717a", margin: "4px 0 0" }}>
              Utolsó frissítés: {lastRefresh || "..."} · Auto-frissítés 10mp
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={fetchData}
              style={{
                background: "#27272a",
                color: "#e4e4e7",
                border: "1px solid #3f3f46",
                borderRadius: 8,
                padding: "10px 20px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              ↻ Frissítés
            </button>
            <button
              onClick={resetAll}
              style={{
                background: "#450a0a",
                color: "#fca5a5",
                border: "1px solid #7f1d1d",
                borderRadius: 8,
                padding: "10px 20px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              🗑 Összes törlése
            </button>
          </div>
        </div>

        {/* ── Filter Row ── */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 12,
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 14, color: "#a1a1aa", marginRight: 4 }}>Szűrés:</span>

          <button onClick={() => setQuickFilter("all")} style={pillStyle(filterMode === "all")}>
            Összes
          </button>
          <button onClick={() => setQuickFilter("today")} style={pillStyle(filterMode === "today")}>
            Ma
          </button>
          <button
            onClick={() => setQuickFilter("yesterday")}
            style={pillStyle(filterMode === "yesterday")}
          >
            Tegnap
          </button>
          <button
            onClick={() => setQuickFilter("today+yesterday")}
            style={pillStyle(filterMode === "today+yesterday")}
          >
            Ma + Tegnap
          </button>

          {/* Separator */}
          <div style={{ width: 1, height: 24, background: "#3f3f46", margin: "0 4px" }} />

          {/* Custom day picker toggle */}
          <button
            onClick={() => setDatePickerOpen((p) => !p)}
            style={pillStyle(filterMode === "custom")}
          >
            📅 Napok kiválasztása {filterMode === "custom" && selectedDates.size > 0 ? `(${selectedDates.size})` : ""}
          </button>
        </div>

        {/* ── Date Picker Grid ── */}
        {datePickerOpen && (
          <div
            style={{
              background: "#18181b",
              border: "1px solid #27272a",
              borderRadius: 12,
              padding: "16px 20px",
              marginBottom: 16,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <span style={{ fontSize: 13, color: "#a1a1aa" }}>
                Kattints a napokra a kiválasztáshoz (több is választható):
              </span>
              {selectedDates.size > 0 && (
                <button
                  onClick={() => {
                    setSelectedDates(new Set());
                    setFilterMode("all");
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#818cf8",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  Összes törlése
                </button>
              )}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {availableDates.length === 0 ? (
                <span style={{ color: "#52525b", fontSize: 13 }}>Nincs még adat egyetlen napra sem.</span>
              ) : (
                availableDates.map((date) => {
                  const isSelected = selectedDates.has(date);
                  const isToday = date === today;
                  const isYesterday = date === yesterday;
                  return (
                    <button
                      key={date}
                      onClick={() => toggleDate(date)}
                      style={{
                        background: isSelected ? "#4c1d95" : "#27272a",
                        color: isSelected ? "#c4b5fd" : "#a1a1aa",
                        border: isSelected ? "1px solid #6d28d9" : "1px solid #3f3f46",
                        borderRadius: 8,
                        padding: "8px 14px",
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: "pointer",
                        transition: "all 0.15s",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {formatDateShort(date)}
                      {isToday && (
                        <span
                          style={{
                            marginLeft: 6,
                            fontSize: 10,
                            background: "#34d399",
                            color: "#000",
                            padding: "1px 5px",
                            borderRadius: 4,
                            fontWeight: 700,
                          }}
                        >
                          MA
                        </span>
                      )}
                      {isYesterday && (
                        <span
                          style={{
                            marginLeft: 6,
                            fontSize: 10,
                            background: "#fbbf24",
                            color: "#000",
                            padding: "1px 5px",
                            borderRadius: 4,
                            fontWeight: 700,
                          }}
                        >
                          TEGNAP
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* ── Active filter indicator ── */}
        {filterLabel && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#1e1b4b",
              border: "1px solid #3730a3",
              borderRadius: 8,
              padding: "8px 16px",
              marginBottom: 24,
              fontSize: 13,
              color: "#c4b5fd",
            }}
          >
            <span>
              📅 Aktív szűrő: <strong>{filterLabel}</strong>
            </span>
            <button
              onClick={() => setQuickFilter("all")}
              style={{
                background: "none",
                border: "none",
                color: "#818cf8",
                cursor: "pointer",
                fontSize: 14,
                padding: "0 4px",
              }}
            >
              ✕
            </button>
          </div>
        )}

        {/* ── Summary Cards ── */}
        <div style={{ display: "flex", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
          <div
            style={{
              background: "#18181b",
              border: "1px solid #27272a",
              borderRadius: 12,
              padding: "20px 24px",
              flex: "1 1 200px",
            }}
          >
            <p style={{ fontSize: 13, color: "#71717a", margin: "0 0 4px" }}>
              {filterMode === "all" ? "Összes kattintás" : "Kattintás (szűrt)"}
            </p>
            <p style={{ fontSize: 36, fontWeight: 700, color: "#fff", margin: 0 }}>
              {totalClicks}
            </p>
          </div>
          <div
            style={{
              background: "#18181b",
              border: "1px solid #27272a",
              borderRadius: 12,
              padding: "20px 24px",
              flex: "1 1 200px",
            }}
          >
            <p style={{ fontSize: 13, color: "#71717a", margin: "0 0 4px" }}>Aktív gombok</p>
            <p style={{ fontSize: 36, fontWeight: 700, color: "#fff", margin: 0 }}>
              {filteredEntries.length}
            </p>
          </div>
          <div
            style={{
              background: "#18181b",
              border: "1px solid #27272a",
              borderRadius: 12,
              padding: "20px 24px",
              flex: "1 1 200px",
            }}
          >
            <p style={{ fontSize: 13, color: "#71717a", margin: "0 0 4px" }}>Top gomb</p>
            <p
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: "#a78bfa",
                margin: 0,
                marginTop: 6,
              }}
            >
              {filteredEntries.length > 0
                ? `${filteredEntries[0][1].label} (${filteredEntries[0][1].total})`
                : "—"}
            </p>
          </div>
          <div
            style={{
              background: "#18181b",
              border: "1px solid #27272a",
              borderRadius: 12,
              padding: "20px 24px",
              flex: "1 1 200px",
            }}
          >
            <p style={{ fontSize: 13, color: "#71717a", margin: "0 0 4px" }}>Napok az adatban</p>
            <p style={{ fontSize: 36, fontWeight: 700, color: "#fff", margin: 0 }}>
              {availableDates.length}
            </p>
          </div>
        </div>

        {/* ── Table ── */}
        <div
          style={{
            background: "#18181b",
            border: "1px solid #27272a",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #27272a", textAlign: "left" }}>
                <th style={thStyle}>Gomb</th>
                <th style={thStyle}>ID</th>
                <th style={{ ...thStyle, textAlign: "right" }}>Kattintások</th>
                {filterMode === "all" && (
                  <th style={{ ...thStyle, textAlign: "right" }}>Ma</th>
                )}
                <th style={{ ...thStyle, textAlign: "right" }}>%</th>
              </tr>
            </thead>
            <tbody>
              {loading && filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: 40, textAlign: "center", color: "#71717a" }}>
                    Betöltés...
                  </td>
                </tr>
              ) : filteredEntries.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: 40, textAlign: "center", color: "#71717a" }}>
                    {filterMode !== "all"
                      ? "Nincs kattintás a kiválasztott napo(ko)n."
                      : "Még nincsenek kattintások."}
                  </td>
                </tr>
              ) : (
                filteredEntries.map(([id, entry], i) => {
                  const pct = totalClicks > 0 ? (entry.total / totalClicks) * 100 : 0;
                  return (
                    <tr
                      key={id}
                      style={{
                        borderBottom:
                          i < filteredEntries.length - 1 ? "1px solid #27272a" : "none",
                      }}
                    >
                      <td style={{ padding: "14px 20px" }}>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#e4e4e7" }}>
                          {entry.label}
                        </span>
                        <div
                          style={{
                            marginTop: 6,
                            height: 4,
                            borderRadius: 2,
                            background: "#27272a",
                            width: 140,
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              height: "100%",
                              width: `${pct}%`,
                              background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
                              borderRadius: 2,
                              transition: "width 0.5s ease",
                            }}
                          />
                        </div>
                      </td>
                      <td style={{ padding: "14px 20px" }}>
                        <code
                          style={{
                            fontSize: 12,
                            color: "#71717a",
                            background: "#27272a",
                            padding: "2px 8px",
                            borderRadius: 4,
                          }}
                        >
                          {id}
                        </code>
                      </td>
                      <td
                        style={{
                          padding: "14px 20px",
                          textAlign: "right",
                          fontSize: 22,
                          fontWeight: 700,
                          color: "#fff",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {entry.total}
                      </td>
                      {filterMode === "all" && (
                        <td
                          style={{
                            padding: "14px 20px",
                            textAlign: "right",
                            fontSize: 16,
                            fontWeight: 600,
                            color: entry.todayCount > 0 ? "#34d399" : "#3f3f46",
                            fontVariantNumeric: "tabular-nums",
                          }}
                        >
                          {entry.todayCount > 0 ? `+${entry.todayCount}` : "0"}
                        </td>
                      )}
                      <td
                        style={{
                          padding: "14px 20px",
                          textAlign: "right",
                          fontSize: 14,
                          color: "#a1a1aa",
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {pct.toFixed(1)}%
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ── Hosting Note ── */}
        <div
          style={{
            marginTop: 40,
            padding: "16px 20px",
            background: "#1c1917",
            border: "1px solid #292524",
            borderRadius: 10,
            fontSize: 13,
            color: "#78716c",
            lineHeight: 1.6,
          }}
        >
          <strong style={{ color: "#a8a29e" }}>⚠️ Hosting megjegyzés:</strong> Az adatok a szerveren
          egy JSON fájlban tárolódnak (<code style={{ color: "#a8a29e" }}>data/click-data.json</code>
          ). Ez VPS-en (pl. Hetzner, DigitalOcean) örökre megmarad. Vercel-en viszont minden deploy
          után törlődik — ha Vercel-t használsz, érdemes áttérni Vercel KV-ra vagy Turso SQLite-ra.
        </div>
      </div>
    </div>
  );
}

const thStyle: React.CSSProperties = {
  padding: "14px 20px",
  fontSize: 12,
  color: "#71717a",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: 0.5,
};