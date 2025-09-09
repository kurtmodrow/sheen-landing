// app/api/lead/route.js
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Server-only Supabase client using the SERVICE ROLE key.
 * NEVER expose the service role to the browser.
 */
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

export async function POST(req) {
  try {
    const body = await req.json(); // { name, email, message, source? }

    // Minimal validation
    if (!body?.email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const payload = {
      name: body.name ?? null,
      email: body.email,
      message: body.message ?? null,
      source: body.source ?? "web",
    };

    const { data, error } = await supabase.from("leads").insert(payload).select().single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ ok: true, id: data.id });
  } catch (err) {
    return NextResponse.json(
      { error: err?.message || "Unexpected server error." },
      { status: 500 }
    );
  }
}
