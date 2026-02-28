import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "click-data.json");

type ButtonData = {
  label: string;
  daily: Record<string, number>;
};
type AllData = Record<string, ButtonData>;

function ensureDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch (e) {
    console.error("Failed to create data dir:", e);
  }
}

function readData(): AllData {
  try {
    ensureDir();
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, "utf-8");
      if (raw.trim().length === 0) return {};
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Failed to read click data:", e);
  }
  return {};
}

function writeData(data: AllData) {
  try {
    ensureDir();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to write click data:", e);
    throw e;
  }
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

// POST - record a click
export async function POST(req: NextRequest) {
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "invalid json body" }, { status: 400 });
    }

    const { id, label } = body;
    if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });

    const data = readData();
    const today = getToday();

    if (!data[id]) {
      data[id] = { label: label || id, daily: {} };
    }
    if (!data[id].daily[today]) {
      data[id].daily[today] = 0;
    }
    data[id].daily[today] += 1;
    if (label) data[id].label = label;

    writeData(data);

    const totalCount = Object.values(data[id].daily).reduce((s, n) => s + n, 0);
    return NextResponse.json({ ok: true, count: totalCount });
  } catch (e) {
    console.error("POST /api/track error:", e);
    return NextResponse.json(
      { error: "server error", detail: String(e) },
      { status: 500 }
    );
  }
}

// GET - return all data, optionally filtered by ?date=2026-02-28
export async function GET(req: NextRequest) {
  try {
    const data = readData();
    const dateFilter = req.nextUrl.searchParams.get("date");
    const today = getToday();

    if (Object.keys(data).length === 0) {
      return NextResponse.json({ buttons: {}, availableDates: [] });
    }

    const response: Record<
      string,
      { label: string; total: number; todayCount: number; daily: Record<string, number> }
    > = {};

    for (const [id, entry] of Object.entries(data)) {
      if (dateFilter) {
        const dayCount = entry.daily?.[dateFilter] || 0;
        if (dayCount > 0) {
          response[id] = {
            label: entry.label,
            total: dayCount,
            todayCount: entry.daily?.[today] || 0,
            daily: { [dateFilter]: dayCount },
          };
        }
      } else {
        const total = Object.values(entry.daily || {}).reduce((s, n) => s + n, 0);
        response[id] = {
          label: entry.label,
          total,
          todayCount: entry.daily?.[today] || 0,
          daily: entry.daily || {},
        };
      }
    }

    const allDates = new Set<string>();
    for (const entry of Object.values(data)) {
      for (const date of Object.keys(entry.daily || {})) {
        allDates.add(date);
      }
    }

    return NextResponse.json({
      buttons: response,
      availableDates: Array.from(allDates).sort().reverse(),
    });
  } catch (e) {
    console.error("GET /api/track error:", e);
    return NextResponse.json(
      { error: "server error", detail: String(e) },
      { status: 500 }
    );
  }
}