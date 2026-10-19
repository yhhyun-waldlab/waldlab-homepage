import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import type { Announcement } from "@/types/announcement";
import {
  createAnnouncement,
  deleteAnnouncement,
  listAnnouncements,
  updateAnnouncement,
} from "@/lib/announcements-store";

function verifyAdmin(req: NextRequest): boolean {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return false;
  return verifyToken(token) !== null;
}

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const announcements = await listAnnouncements();
    return NextResponse.json({ posts: announcements });
  } catch (error) {
    console.error("Error reading announcements:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const newPost = await req.json();
    const now = new Date().toISOString();

    const post: Announcement = {
      ...newPost,
      id: newPost.id || `post-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };

    const saved = await createAnnouncement(post);
    return NextResponse.json({ success: true, post: saved });
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updatedPost = (await req.json()) as Announcement;
    const announcements = await listAnnouncements();
    const existing = announcements.find((p) => p.id === updatedPost.id);

    if (!existing) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const merged: Announcement = {
      ...existing,
      ...updatedPost,
      id: existing.id,
      createdAt: existing.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const saved = await updateAnnouncement(merged);
    return NextResponse.json({ success: true, post: saved });
  } catch (error) {
    console.error("Error updating post:", error);
    const message = error instanceof Error ? error.message : "";
    if (message === "Post not found") {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    await deleteAnnouncement(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    const message = error instanceof Error ? error.message : "";
    if (message === "Post not found") {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
