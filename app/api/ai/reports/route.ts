import { NextResponse } from "next/server";
import { models } from "../../../data/mockData";
import { verifyToken } from "../../../services/authService";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const user = await verifyToken(token);
    if (!user) return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });

    const reports: any[] = await models.Report.find({ userId: user.id });

    // Parse stringified results
    const parsedReports = reports.map((r: any) => ({
      id: r._id,
      userId: r.userId,
      prompt: r.prompt,
      type: r.type,
      createdAt: r.createdAt,
      result: JSON.parse(r.result),
      score: r.score ? JSON.parse(r.score) : null
    }));

    return NextResponse.json({
      success: true,
      total: reports.length,
      data: parsedReports
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: "Failed to get reports", error: error.message }, { status: 500 });
  }
}
