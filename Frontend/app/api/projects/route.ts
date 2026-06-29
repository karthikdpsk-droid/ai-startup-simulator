import { NextResponse } from "next/server";
import { models } from "../../data/mockData";
import { verifyToken } from "../../services/authService";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const user = await verifyToken(token);
    if (!user) return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });

    const projects = await models.Project.find({ userId: user.id });

    return NextResponse.json({
      success: true,
      total: projects.length,
      data: projects
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, message: "Failed to get projects", error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const token = authHeader?.split(" ")[1];
    if (!token) return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const user = await verifyToken(token);
    if (!user) return NextResponse.json({ success: false, message: "Invalid token" }, { status: 401 });
    const body = await request.json();

    const project = await models.Project.create({
      userId: user.id,
      ...body
    });

    return NextResponse.json({ success: true, project });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
