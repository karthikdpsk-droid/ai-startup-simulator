import { NextResponse } from "next/server";
import { generateRoadmap } from "../../../services/aiService";
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

    const roadmap = await generateRoadmap(ideaData);

    return NextResponse.json({
      success: true,
      message: "Roadmap generated successfully",
      data: roadmap
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: "Failed to generate roadmap", error: error.message }, { status: 500 });
  }
}
