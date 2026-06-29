import { NextResponse } from "next/server";
import { models } from "../../../../data/mockData";
import { verifyToken } from "../../../../services/authService";

export async function GET(request: Request, context: { params: any }) {
  try {
    const params = context.params?.then ? await context.params : context.params;
    const id = params?.id;

    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const user = await verifyToken(token);
    if (!user) return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });

    const report: any = await models.Report.findOne({ _id: id, userId: user.id });
    if (!report) {
      return NextResponse.json({ success: false, message: "Report not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: {
        id: report._id,
        userId: report.userId,
        prompt: report.prompt,
        type: report.type,
        createdAt: report.createdAt,
        result: JSON.parse(report.result),
        score: report.score ? JSON.parse(report.score) : null
      }
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: "Failed to get report", error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: any }) {
  try {
    const params = context.params?.then ? await context.params : context.params;
    const id = params?.id;

    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const user = await verifyToken(token);
    if (!user) return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });

    const report = await models.Report.findOneAndDelete({ _id: id, userId: user.id });
    if (!report) {
      return NextResponse.json({ success: false, message: "Report not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Report deleted successfully" });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: "Failed to delete report", error: error.message }, { status: 500 });
  }
}
