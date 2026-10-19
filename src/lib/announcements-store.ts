import fs from "fs";
import path from "path";
import type { Announcement, AnnouncementCategory } from "@/types/announcement";
import { createSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";

const ANNOUNCEMENTS_FILE = path.join(
  process.cwd(),
  "src/data/announcements.json"
);

type AnnouncementRow = {
  id: string;
  date: string;
  category: string;
  tag: Announcement["tag"];
  title: Announcement["title"];
  excerpt: Announcement["excerpt"];
  body: Announcement["body"];
  created_at: string;
  updated_at: string;
};

function rowToAnnouncement(row: AnnouncementRow): Announcement {
  return {
    id: row.id,
    date: row.date,
    category: row.category as AnnouncementCategory,
    tag: row.tag,
    title: row.title,
    excerpt: row.excerpt,
    body: row.body,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function announcementToRow(post: Announcement): AnnouncementRow {
  const now = new Date().toISOString();
  return {
    id: post.id,
    date: post.date,
    category: post.category,
    tag: post.tag,
    title: post.title,
    excerpt: post.excerpt,
    body: post.body,
    created_at: post.createdAt ?? now,
    updated_at: post.updatedAt ?? now,
  };
}

function readAnnouncementsFromFile(): Announcement[] {
  const data = fs.readFileSync(ANNOUNCEMENTS_FILE, "utf-8");
  return JSON.parse(data) as Announcement[];
}

function writeAnnouncementsToFile(announcements: Announcement[]): void {
  fs.writeFileSync(
    ANNOUNCEMENTS_FILE,
    JSON.stringify(announcements, null, 2),
    "utf-8"
  );
}

export async function listAnnouncements(): Promise<Announcement[]> {
  if (!isSupabaseConfigured()) {
    return readAnnouncementsFromFile();
  }

  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("announcements")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Supabase listAnnouncements:", error);
    throw error;
  }

  return (data as AnnouncementRow[]).map(rowToAnnouncement);
}

export async function createAnnouncement(
  post: Announcement
): Promise<Announcement> {
  if (!isSupabaseConfigured()) {
    const all = readAnnouncementsFromFile();
    all.unshift(post);
    writeAnnouncementsToFile(all);
    return post;
  }

  const supabase = createSupabaseAdmin();
  const row = announcementToRow(post);
  const { data, error } = await supabase
    .from("announcements")
    .insert(row)
    .select("*")
    .single();

  if (error) {
    console.error("Supabase createAnnouncement:", error);
    throw error;
  }

  return rowToAnnouncement(data as AnnouncementRow);
}

export async function updateAnnouncement(
  post: Announcement
): Promise<Announcement> {
  if (!isSupabaseConfigured()) {
    const all = readAnnouncementsFromFile();
    const index = all.findIndex((p) => p.id === post.id);
    if (index === -1) {
      throw new Error("Post not found");
    }
    all[index] = post;
    writeAnnouncementsToFile(all);
    return post;
  }

  const supabase = createSupabaseAdmin();
  const existing = await supabase
    .from("announcements")
    .select("created_at")
    .eq("id", post.id)
    .maybeSingle();

  if (existing.error) {
    console.error("Supabase updateAnnouncement lookup:", existing.error);
    throw existing.error;
  }
  if (!existing.data) {
    throw new Error("Post not found");
  }

  const row = announcementToRow({
    ...post,
    createdAt: post.createdAt ?? (existing.data.created_at as string),
    updatedAt: new Date().toISOString(),
  });

  const { data, error } = await supabase
    .from("announcements")
    .update({
      date: row.date,
      category: row.category,
      tag: row.tag,
      title: row.title,
      excerpt: row.excerpt,
      body: row.body,
      updated_at: row.updated_at,
    })
    .eq("id", post.id)
    .select("*")
    .single();

  if (error) {
    console.error("Supabase updateAnnouncement:", error);
    throw error;
  }

  return rowToAnnouncement(data as AnnouncementRow);
}

export async function deleteAnnouncement(id: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    const all = readAnnouncementsFromFile();
    const filtered = all.filter((p) => p.id !== id);
    if (filtered.length === all.length) {
      throw new Error("Post not found");
    }
    writeAnnouncementsToFile(filtered);
    return;
  }

  const supabase = createSupabaseAdmin();
  const { error, count } = await supabase
    .from("announcements")
    .delete({ count: "exact" })
    .eq("id", id);

  if (error) {
    console.error("Supabase deleteAnnouncement:", error);
    throw error;
  }
  if (count === 0) {
    throw new Error("Post not found");
  }
}
