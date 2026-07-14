interface Env {
  DB: D1Database;
  ADMIN_TOKEN: string;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "https://qasim.live",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
  "Access-Control-Max-Age": "86400",
};

function corsResponse(response: Response): Response {
  const newResponse = new Response(response.body, response);
  Object.entries(CORS_HEADERS).forEach(([key, value]) => {
    newResponse.headers.set(key, value);
  });
  return newResponse;
}

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...CORS_HEADERS,
    },
  });
}

function errorResponse(message: string, status = 400): Response {
  return jsonResponse({ error: message }, status);
}

async function hashIP(ip: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

function getClientIP(request: Request): string {
  // CF-Connecting-IP is set by Cloudflare to the real visitor IP on all proxied requests
  const cfConnectingIP = request.headers.get("CF-Connecting-IP");
  if (cfConnectingIP) return cfConnectingIP;

  // Fallback: X-Forwarded-For (first entry is the originating client IP)
  const xForwardedFor = request.headers.get("X-Forwarded-For");
  if (xForwardedFor) return xForwardedFor.split(",")[0].trim();

  return "unknown";
}

async function checkRateLimit(env: Env, ipHash: string): Promise<boolean> {
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const result = await env.DB
    .prepare("SELECT COUNT(*) as count FROM reviews WHERE ip_hash = ? AND created_at > ?")
    .bind(ipHash, oneHourAgo)
    .first<{ count: number }>();
  
  return (result?.count || 0) < 3; // Max 3 reviews per hour per IP
}

function validateReview(data: unknown): { valid: boolean; error?: string } {
  if (typeof data !== "object" || data === null) {
    return { valid: false, error: "Invalid request body" };
  }

  const { name, role, text, rating } = data as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length < 2 || name.trim().length > 100) {
    return { valid: false, error: "Name must be between 2 and 100 characters" };
  }

  if (typeof role !== "string" || role.trim().length < 2 || role.trim().length > 100) {
    return { valid: false, error: "Role must be between 2 and 100 characters" };
  }

  if (typeof text !== "string" || text.trim().length < 20 || text.trim().length > 1000) {
    return { valid: false, error: "Review text must be between 20 and 1000 characters" };
  }

  if (typeof rating !== "number" || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { valid: false, error: "Rating must be an integer between 1 and 5" };
  }

  return { valid: true };
}

function verifyAdminToken(request: Request, env: Env): boolean {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return false;
  }
  const token = authHeader.substring(7);
  return token === env.ADMIN_TOKEN;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // Handle CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    try {
      // POST /reviews - Submit a new review
      if (path === "/reviews" && request.method === "POST") {
        const body = await request.json();
        const validation = validateReview(body);

        if (!validation.valid) {
          return errorResponse(validation.error!, 400);
        }

        const { name, role, text, rating } = body as { name: string; role: string; text: string; rating: number };
        const ip = getClientIP(request);
        const ipHash = await hashIP(ip);

        // Check rate limit
        const withinLimit = await checkRateLimit(env, ipHash);
        if (!withinLimit) {
          return errorResponse("Rate limit exceeded: Maximum 3 reviews per hour", 429);
        }

        // Insert review
        await env.DB
          .prepare("INSERT INTO reviews (name, role, text, rating, ip_hash) VALUES (?, ?, ?, ?, ?)")
          .bind(name.trim(), role.trim(), text.trim(), rating, ipHash)
          .run();

        return jsonResponse({ success: true, message: "Review submitted for moderation" }, 201);
      }

      // GET /reviews - Get approved reviews
      if (path === "/reviews" && request.method === "GET") {
        const reviews = await env.DB
          .prepare("SELECT id, name, role, text, rating, created_at FROM reviews WHERE approved = 1 ORDER BY created_at DESC")
          .all();

        return jsonResponse(reviews.results);
      }

      // POST /reviews/:id/approve - Approve a review (admin only)
      const approveMatch = path.match(/^\/reviews\/(\d+)\/approve$/);
      if (approveMatch && request.method === "POST") {
        if (!verifyAdminToken(request, env)) {
          return errorResponse("Unauthorized", 401);
        }

        const reviewId = approveMatch[1];
        
        const result = await env.DB
          .prepare("UPDATE reviews SET approved = 1 WHERE id = ?")
          .bind(reviewId)
          .run();

        if (result.meta.changes === 0) {
          return errorResponse("Review not found", 404);
        }

        return jsonResponse({ success: true, message: "Review approved" });
      }

      // GET /reviews/pending - Get pending reviews (admin only)
      if (path === "/reviews/pending" && request.method === "GET") {
        if (!verifyAdminToken(request, env)) {
          return errorResponse("Unauthorized", 401);
        }

        const reviews = await env.DB
          .prepare("SELECT id, name, role, text, rating, ip_hash, created_at FROM reviews WHERE approved = 0 ORDER BY created_at DESC")
          .all();

        return jsonResponse(reviews.results);
      }

      // 404 for unknown routes
      return errorResponse("Not found", 404);
    } catch (error) {
      console.error("Error:", error);
      return errorResponse("Internal server error", 500);
    }
  },
};
