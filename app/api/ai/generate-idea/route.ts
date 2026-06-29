import { NextResponse } from "next/server";
import { generateStartupIdea, scoreStartupIdea } from "../../../services/aiService";
import { models } from "../../../data/mockData";
import { verifyToken } from "../../../services/authService";

export async function POST(request: Request) {
  try {
    // Auth Check
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    const user = token ? await verifyToken(token) : null;

    const { prompt } = await request.json();
    if (!prompt) {
      return NextResponse.json({ success: false, message: "Prompt is required" }, { status: 400 });
    }

    const userId = user?.id || "guest";
    if (!prompt) {
      return NextResponse.json({ success: false, message: "Prompt is required" }, { status: 400 });
    }

    const result = await generateStartupIdea(prompt);
    const score = await scoreStartupIdea(result);

    const report = await models.Report.create({
      userId,
      prompt,
      result: JSON.stringify(result),
      score: JSON.stringify(score),
      type: "idea"
    });

    return NextResponse.json({
      success: true,
      message: "AI generated idea successfully",
      reportId: report._id,
      data: result,
      score: score
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: "AI generation failed", error: error.message }, { status: 500 });
  }
}
