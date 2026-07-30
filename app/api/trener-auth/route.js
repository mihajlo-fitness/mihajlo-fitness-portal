import { NextResponse } from "next/server";

export async function POST(request) {
  const { password } = await request.json();

  if (!process.env.COACH_PASSWORD) {
    return NextResponse.json(
      { ok: false, error: "COACH_PASSWORD nije podešen na serveru." },
      { status: 500 }
    );
  }

  if (password === process.env.COACH_PASSWORD) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set("coach_session", "authenticated", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30, // 30 dana
      path: "/",
    });
    return res;
  }

  return NextResponse.json({ ok: false, error: "Pogrešna lozinka." }, { status: 401 });
}
