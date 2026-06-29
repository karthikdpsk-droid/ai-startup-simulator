import { NextResponse } from "next/server";

export async function POST() {
  // In a JWT-based system, logout is usually handled client-side by deleting the token.
  // However, we can return a success message here for consistency.
  return NextResponse.json({ success: true, message: "Logged out successfully" });
}
