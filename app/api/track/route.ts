import { NextRequest, NextResponse } from "next/server";
import { createClient } from "redis";

/*
 * /api/track
 *
 * POST — Record a click event
 * GET  — Retrieve click events with optional filters
 *
 * Storage: Vercel Redis (node-redis)
 *
 * Redis keys:
 *   clicks:all        — sorted set of all events (score = timestamp ms)
 *   clicks:labels     — hash mapping button id → label
 */

interface ClickEvent {
  id: string;
  label: string;
  timestamp: string;
  userAgent?: string;
  referer?: string;
}

/* ─── Redis Client (reuse across warm invocations) ─── */
let redisClient: ReturnType<typeof createClient> | null = null;

async function getRedis() {
  if (redisClient && redisClient.isOpen) return redisClient;

  redisClient = createClient({
    url: process.env.REDIS_URL,
  });

  redisClient.on("error", (err) => console.error("Redis error:", err));
  await redisClient.connect();
  return redisClient;
}

/* ─── POST: Record a click ─── */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, label } = body;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Missing or invalid 'id'" }, { status: 400 });
    }

    const redis = await getRedis();
    const now = new Date();

    const event: ClickEvent = {
      id,
      label: label || id,
      timestamp: now.toISOString(),
      userAgent: request.headers.get("user-agent") || undefined,
      referer: request.headers.get("referer") || undefined,
    };

    // Store event in sorted set (score = ms timestamp for range queries)
    await redis.zAdd("clicks:all", {
      score: now.getTime(),
      value: JSON.stringify(event),
    });

    // Store label mapping
    await redis.hSet("clicks:labels", id, label || id);

    return NextResponse.json({ success: true, event }, { status: 201 });
  } catch (err) {
    console.error("Track POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/* ─── GET: Retrieve clicks ─── */
export async function GET(request: NextRequest) {
  try {
    const redis = await getRedis();
    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const btn = searchParams.get("btn");

    // Score range for sorted set
    let minScore = "-inf";
    let maxScore = "+inf";

    if (from) {
      const d = new Date(from);
      d.setHours(0, 0, 0, 0);
      minScore = d.getTime().toString();
    }
    if (to) {
      const d = new Date(to);
      d.setHours(23, 59, 59, 999);
      maxScore = d.getTime().toString();
    }

    // Fetch from sorted set
    const rawEvents = await redis.zRangeByScore("clicks:all", minScore, maxScore);

    let events: ClickEvent[] = rawEvents
      .map((raw) => {
        try { return JSON.parse(raw) as ClickEvent; }
        catch { return null; }
      })
      .filter((e): e is ClickEvent => e !== null);

    // Filter by button
    if (btn) {
      events = events.filter((e) => e.id === btn);
    }

    // Newest first
    events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Stats
    const statsMap: Record<string, { id: string; label: string; count: number }> = {};
    events.forEach((e) => {
      if (!statsMap[e.id]) statsMap[e.id] = { id: e.id, label: e.label, count: 0 };
      statsMap[e.id].count++;
    });
    const stats = Object.values(statsMap).sort((a, b) => b.count - a.count);

    return NextResponse.json({
      total: events.length,
      stats,
      bestPerformer: stats.length > 0 ? stats[0] : null,
      events,
    });
  } catch (err) {
    console.error("Track GET error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}