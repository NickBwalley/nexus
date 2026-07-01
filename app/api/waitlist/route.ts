import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase/server";
import { waitlistSchema } from "@/lib/validations";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = waitlistSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid waitlist submission", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return NextResponse.json({
      ok: true,
      demo: true,
      message: "Waitlist captured in demo mode. Add Supabase credentials to persist submissions."
    });
  }

  const { data, error } = await supabase
    .from("waitlist")
    .upsert(
      {
        name: parsed.data.name,
        email: parsed.data.email,
        company: parsed.data.company,
        role: parsed.data.role,
        team_size: parsed.data.teamSize,
        provider: parsed.data.provider,
        challenge: parsed.data.challenge
      },
      { onConflict: "email" }
    )
    .select("id")
    .single();

  if (error) {
    return NextResponse.json({ error: "Unable to save waitlist submission" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: data.id });
}
