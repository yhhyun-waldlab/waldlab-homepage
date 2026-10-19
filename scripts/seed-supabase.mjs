/**
 * Seed Supabase from src/data/*.json (run after supabase/schema.sql).
 * Requires .env.local: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function loadEnvLocal() {
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) return;
  const text = fs.readFileSync(envPath, "utf-8");
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const announcementsPath = path.join(root, "src/data/announcements.json");
const accountsPath = path.join(root, "src/data/admin-accounts.json");

const announcements = JSON.parse(fs.readFileSync(announcementsPath, "utf-8"));
const accounts = JSON.parse(fs.readFileSync(accountsPath, "utf-8"));

const announcementRows = announcements.map((a) => ({
  id: a.id,
  date: a.date,
  category: a.category,
  tag: a.tag,
  title: a.title,
  excerpt: a.excerpt,
  body: a.body,
  created_at: a.createdAt ?? new Date().toISOString(),
  updated_at: a.updatedAt ?? a.createdAt ?? new Date().toISOString(),
}));

const accountRows = accounts.map((a) => ({
  id: a.id,
  email: a.email,
  password_hash: a.passwordHash,
  name: a.name,
  created_at: a.createdAt ?? new Date().toISOString(),
}));

const { error: annError } = await supabase
  .from("announcements")
  .upsert(announcementRows, { onConflict: "id" });

if (annError) {
  console.error("announcements upsert failed:", annError.message);
  process.exit(1);
}

const { error: accError } = await supabase
  .from("admin_accounts")
  .upsert(accountRows, { onConflict: "id" });

if (accError) {
  console.error("admin_accounts upsert failed:", accError.message);
  process.exit(1);
}

console.log(
  `Seeded ${announcementRows.length} announcements, ${accountRows.length} admin account(s).`
);
