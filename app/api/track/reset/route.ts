import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "click-data.json");

export async function POST() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify({}), "utf-8");
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("POST /api/track/reset error:", e);
    return NextResponse.json(
      { error: "server error", detail: String(e) },
      { status: 500 }
    );
  }
}