import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import fs from 'fs';
import path from 'path';
import type { Announcement } from '@/types/announcement';

const ANNOUNCEMENTS_FILE = path.join(
  process.cwd(),
  'src/data/announcements.json'
);

function getAnnouncements(): Announcement[] {
  const data = fs.readFileSync(ANNOUNCEMENTS_FILE, 'utf-8');
  return JSON.parse(data);
}

function saveAnnouncements(announcements: Announcement[]): void {
  fs.writeFileSync(
    ANNOUNCEMENTS_FILE,
    JSON.stringify(announcements, null, 2),
    'utf-8'
  );
}

function verifyAdmin(req: NextRequest): boolean {
  const token = req.cookies.get('admin_token')?.value;
  if (!token) return false;
  return verifyToken(token) !== null;
}

// GET - List all posts (admin view)
export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const announcements = getAnnouncements();
    return NextResponse.json({ posts: announcements });
  } catch (error) {
    console.error('Error reading announcements:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new post
export async function POST(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const newPost = await req.json();
    const announcements = getAnnouncements();

    // Add metadata
    const post: Announcement = {
      ...newPost,
      id: newPost.id || `post-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    announcements.unshift(post); // Add to beginning
    saveAnnouncements(announcements);

    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update existing post
export async function PUT(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const updatedPost = await req.json();
    const announcements = getAnnouncements();

    const index = announcements.findIndex((p) => p.id === updatedPost.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    announcements[index] = {
      ...updatedPost,
      updatedAt: new Date().toISOString(),
    };
    saveAnnouncements(announcements);

    return NextResponse.json({ success: true, post: announcements[index] });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete post
export async function DELETE(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    const announcements = getAnnouncements();
    const filtered = announcements.filter((p) => p.id !== id);

    if (filtered.length === announcements.length) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    saveAnnouncements(filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
