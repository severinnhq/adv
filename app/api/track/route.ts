import { NextRequest, NextResponse } from "next/server";
import { createClient } from "redis";

/*
 * /api/track
 *
 * POST — Record a click event (now with articleId)
 * GET  — Retrieve click events with optional filters
 *
 * Redis keys:
 *   clicks:{articleId}  — sorted set of events per article (score = timestamp ms)
 *   articles            — hash mapping articleId → articleName
 */

interface ClickEvent {
  articleId: string;
  articleName: string;
  id: string;
  label: string;
  timestamp: string;
  userAgent?: string;
  referer?: string;
}

let redisClient: ReturnType<typeof createClient> | null = null;

async function getRedis() {
  if (redisClient && redisClient.isOpen) return redisClient;
  redisClient = createClient({ url: process.env.REDIS_URL });
  redisClient.on("error", (err) => console.error("Redis error:", err));
  await redisClient.connect();
  return redisClient;
}

/* ─── POST ─── */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, label, articleId, articleName } = body;

    if (!id || typeof id !== "string") {
      return NextResponse.json({ error: "Missing 'id'" }, { status: 400 });
    }

    const aid = articleId || "unknown";
    const aname = articleName || aid;
    const redis = await getRedis();
    const now = new Date();

    const event: ClickEvent = {
      articleId: aid,
      articleName: aname,
      id,
      label: label || id,
      timestamp: now.toISOString(),
      userAgent: request.headers.get("user-agent") || undefined,
      referer: request.headers.get("referer") || undefined,
    };

    // Store in article-specific sorted set
    await redis.zAdd(`clicks:${aid}`, {
      score: now.getTime(),
      value: JSON.stringify(event),
    });

    // Also store in global set for cross-article views
    await redis.zAdd("clicks:all", {
      score: now.getTime(),
      value: JSON.stringify(event),
    });

    // Register article
    await redis.hSet("articles", aid, aname);

    return NextResponse.json({ success: true, event }, { status: 201 });
  } catch (err) {
    console.error("Track POST error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

/* ─── GET ─── */
export async function GET(request: NextRequest) {
  try {
    const redis = await getRedis();
    const { searchParams } = new URL(request.url);
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const btn = searchParams.get("btn");
    const article = searchParams.get("article"); // articleId filter

    // Determine which sorted set to query
    const setKey = article ? `clicks:${article}` : "clicks:all";

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

    const rawEvents = await redis.zRangeByScore(setKey, minScore, maxScore);

    let events: ClickEvent[] = rawEvents
      .map((raw) => {
        try { return JSON.parse(raw) as ClickEvent; }
        catch { return null; }
      })
      .filter((e): e is ClickEvent => e !== null);

    if (btn) {
      events = events.filter((e) => e.id === btn);
    }

    events.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    // Stats
    const statsMap: Record<string, { id: string; label: string; count: number }> = {};
    events.forEach((e) => {
      if (!statsMap[e.id]) statsMap[e.id] = { id: e.id, label: e.label, count: 0 };
      statsMap[e.id].count++;
    });
    const stats = Object.values(statsMap).sort((a, b) => b.count - a.count);

    // Get registered articles list
    const articlesHash = await redis.hGetAll("articles");
    const articles = Object.entries(articlesHash).map(([id, name]) => ({ id, name }));

    return NextResponse.json({
      total: events.length,
      stats,
      bestPerformer: stats.length > 0 ? stats[0] : null,
      events,
      articles,
    });
  } catch (err) {
    console.error("Track GET error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}