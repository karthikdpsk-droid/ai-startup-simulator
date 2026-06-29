import { NextResponse } from "next/server";
import { generateTechStack } from "../../../services/aiService";
import { verifyToken } from "../../../services/authService";

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const user = await verifyToken(token);
    if (!user) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const { ideaData } = await request.json();
    if (!ideaData) {
      return NextResponse.json({ success: false, message: "Idea data is required" }, { status: 400 });
    }

    const techStack = await generateTechStack(ideaData);

    return NextResponse.json({
      success: true,
      message: "Tech stack generated successfully",
      data: techStack
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: "Failed to generate tech stack", error: error.message }, { status: 500 });
  }
}
