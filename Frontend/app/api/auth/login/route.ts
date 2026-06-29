import { NextResponse } from "next/server";
import { models } from "../../../data/mockData";
import { comparePassword, generateToken } from "../../../services/authService";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 });
    }

    const user: any = await models.User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 400 });
    }

    const token = await generateToken({ id: user._id, email: user.email });

    return NextResponse.json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: "Login error", error: error.message }, { status: 500 });
  }
}
