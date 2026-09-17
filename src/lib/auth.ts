import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const JWT_SECRET = process.env.JWT_SECRET || 'waldlab-secret-key-change-in-production';
const ACCOUNTS_FILE = path.join(process.cwd(), 'src/data/admin-accounts.json');

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

// Read admin accounts from file
export function getAdminAccounts(): AdminAccount[] {
  if (!fs.existsSync(ACCOUNTS_FILE)) {
    return [];
  }
  const data = fs.readFileSync(ACCOUNTS_FILE, 'utf-8');
  return JSON.parse(data);
}

// Save admin accounts to file
function saveAdminAccounts(accounts: AdminAccount[]): void {
  fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(accounts, null, 2), 'utf-8');
}

// Initialize default admin account if none exist
export async function initializeAdminAccounts(): Promise<void> {
  const accounts = getAdminAccounts();
  if (accounts.length === 0) {
    const defaultEmail = 'yhhyun@waldlab.kr';
    const defaultPassword = 'walrustican0*';
    const passwordHash = await bcrypt.hash(defaultPassword, 10);
    
    const defaultAccount: AdminAccount = {
      id: 'admin-1',
      email: defaultEmail,
      name: '관리자',
      passwordHash,
      createdAt: new Date().toISOString(),
    };
    
    saveAdminAccounts([defaultAccount]);
  }
}

// Verify admin credentials
export async function verifyAdminCredentials(
  email: string,
  password: string
): Promise<AdminAccount | null> {
  const accounts = getAdminAccounts();
  const account = accounts.find((acc) => acc.email === email);
  
  if (!account) {
    return null;
  }
  
  const isValid = await bcrypt.compare(password, account.passwordHash);
  return isValid ? account : null;
}

// Generate JWT token
export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

// Verify JWT token
export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

// Add new admin account
export async function addAdminAccount(
  email: string,
  password: string,
  name: string
): Promise<AdminAccount> {
  const accounts = getAdminAccounts();
  
  // Check if email already exists
  if (accounts.some((acc) => acc.email === email)) {
    throw new Error('Email already exists');
  }
  
  const passwordHash = await bcrypt.hash(password, 10);
  const newAccount: AdminAccount = {
    id: `admin-${Date.now()}`,
    email,
    name,
    passwordHash,
    createdAt: new Date().toISOString(),
  };
  
  accounts.push(newAccount);
  saveAdminAccounts(accounts);
  
  return newAccount;
}

// Delete admin account
export function deleteAdminAccount(email: string): boolean {
  const accounts = getAdminAccounts();
  const filtered = accounts.filter((acc) => acc.email !== email);
  
  if (filtered.length === accounts.length) {
    return false; // Account not found
  }
  
  saveAdminAccounts(filtered);
  return true;
}
