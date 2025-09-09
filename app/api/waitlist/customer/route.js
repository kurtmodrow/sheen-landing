import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { auth: { persistSession: false } }
);

export async function POST(req) {
  const body = await req.json();
  if (!body?.email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const { data, error } = await supabase
    .schema("waitlist")
    .from("customer")
    .insert({
      name: body.name ?? null,
      email: body.email,
      phone: body.phone ?? null,
      message: body.message ?? null,
      source: "web",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true, id: data.id });
}
