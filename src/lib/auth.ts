import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { createSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase/admin";

const JWT_SECRET =
  process.env.JWT_SECRET || "waldlab-secret-key-change-in-production";
const ACCOUNTS_FILE = path.join(process.cwd(), "src/data/admin-accounts.json");

export interface AdminAccount {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string;
}

export interface JWTPayload {
  email: string;
  id: string;
}

type AdminAccountRow = {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  created_at: string;
};

function rowToAccount(row: AdminAccountRow): AdminAccount {
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    name: row.name,
    createdAt: row.created_at,
  };
}

function readAccountsFromFile(): AdminAccount[] {
  if (!fs.existsSync(ACCOUNTS_FILE)) {
    return [];
  }
  const data = fs.readFileSync(ACCOUNTS_FILE, "utf-8");
  const parsed = JSON.parse(data) as Array<{
    id: string;
    email: string;
    passwordHash: string;
    name: string;
    createdAt: string;
  }>;
  return parsed;
}

function writeAccountsToFile(accounts: AdminAccount[]): void {
  fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(accounts, null, 2), "utf-8");
}

export async function getAdminAccounts(): Promise<AdminAccount[]> {
  if (!isSupabaseConfigured()) {
    return readAccountsFromFile();
  }

  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase.from("admin_accounts").select("*");

  if (error) {
    console.error("Supabase getAdminAccounts:", error);
    throw error;
  }

  return (data as AdminAccountRow[]).map(rowToAccount);
}

export async function initializeAdminAccounts(): Promise<void> {
  const accounts = await getAdminAccounts();
  if (accounts.length > 0) {
    return;
  }

  const defaultEmail = "yhhyun@waldlab.kr";
  const defaultPassword = "walrustican0*";
  const passwordHash = await bcrypt.hash(defaultPassword, 10);
  const defaultAccount: AdminAccount = {
    id: "admin-1",
    email: defaultEmail,
    name: "관리자",
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  if (!isSupabaseConfigured()) {
    writeAccountsToFile([defaultAccount]);
    return;
  }

  const supabase = createSupabaseAdmin();
  const { error } = await supabase.from("admin_accounts").insert({
    id: defaultAccount.id,
    email: defaultAccount.email,
    password_hash: defaultAccount.passwordHash,
    name: defaultAccount.name,
    created_at: defaultAccount.createdAt,
  });

  if (error) {
    console.error("Supabase initializeAdminAccounts:", error);
    throw error;
  }
}

export async function verifyAdminCredentials(
  email: string,
  password: string
): Promise<AdminAccount | null> {
  const accounts = await getAdminAccounts();
  const account = accounts.find((acc) => acc.email === email);

  if (!account) {
    return null;
  }

  const isValid = await bcrypt.compare(password, account.passwordHash);
  return isValid ? account : null;
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export async function addAdminAccount(
  email: string,
  password: string,
  name: string
): Promise<AdminAccount> {
  const accounts = await getAdminAccounts();

  if (accounts.some((acc) => acc.email === email)) {
    throw new Error("Email already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const newAccount: AdminAccount = {
    id: `admin-${Date.now()}`,
    email,
    name,
    passwordHash,
    createdAt: new Date().toISOString(),
  };

  if (!isSupabaseConfigured()) {
    accounts.push(newAccount);
    writeAccountsToFile(accounts);
    return newAccount;
  }

  const supabase = createSupabaseAdmin();
  const { error } = await supabase.from("admin_accounts").insert({
    id: newAccount.id,
    email: newAccount.email,
    password_hash: newAccount.passwordHash,
    name: newAccount.name,
    created_at: newAccount.createdAt,
  });

  if (error) {
    console.error("Supabase addAdminAccount:", error);
    throw error;
  }

  return newAccount;
}

export async function deleteAdminAccount(email: string): Promise<boolean> {
  const accounts = await getAdminAccounts();
  const exists = accounts.some((acc) => acc.email === email);
  if (!exists) {
    return false;
  }

  if (!isSupabaseConfigured()) {
    const filtered = accounts.filter((acc) => acc.email !== email);
    writeAccountsToFile(filtered);
    return true;
  }

  const supabase = createSupabaseAdmin();
  const { error, count } = await supabase
    .from("admin_accounts")
    .delete({ count: "exact" })
    .eq("email", email);

  if (error) {
    console.error("Supabase deleteAdminAccount:", error);
    throw error;
  }

  return (count ?? 0) > 0;
}
