import { NextResponse } from "next/server";
import { models } from "../../data/mockData";
import { verifyToken } from "../../services/authService";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const userPayload = await verifyToken(token);
    if (!userPayload) return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });

    const user: any = await models.User.findOne({ _id: userPayload.id });
    if (!user) return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });

    const userReports = await models.Report.find({ userId: user._id });

    return NextResponse.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        stats: {
          totalReports: userReports.length,
          status: "Founders Edition 🚀"
        }
      }
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: "Failed to get profile", error: error.message }, { status: 500 });
  }
}
