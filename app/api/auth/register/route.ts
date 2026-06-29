import { NextResponse } from "next/server";
import { models } from "../../../data/mockData";
import { hashPassword } from "../../../services/authService";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: "All fields are required" }, { status: 400 });
    }

    const existingUser = await models.User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ success: false, message: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);
    const user = await models.User.create({ name, email, password: hashedPassword });

    return NextResponse.json({
      success: true,
      message: "User created successfully",
      data: { id: user._id, name: user.name, email: user.email }
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: "Signup error", error: error.message }, { status: 500 });
  }
}
