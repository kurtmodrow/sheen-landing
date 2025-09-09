import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body?.email) {
      return NextResponse.json({ error: "Email is required." }, { status: 400 });
    }

    const { data, error } = await supabase
      .schema("waitlist")
      .from("cleaners")
      .insert({
        name: body.name ?? null,
        email: body.email,
        message: body.message ?? null,
        city: body.city ?? null,
        service_area: body.service_area ?? null,
        experience_years: body.experience_years ?? null,
        vehicle: body.vehicle ?? null,
        source: "web",
      })
      .select()
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true, id: data.id });
  } catch (err) {
    return NextResponse.json({ error: err?.message || "Server error" }, { status: 500 });
  }
}
