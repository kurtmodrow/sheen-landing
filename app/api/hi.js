export async function POST(req) {
  try {
    const body = await req.json();
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://sheeni-server.onrender.com";

    const r = await fetch(`${API_BASE}/waitlist/customer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await r.json().catch(() => ({}));
    return new Response(JSON.stringify(data), {
      status: r.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Proxy failed' }), { status: 500 });
  }
}
