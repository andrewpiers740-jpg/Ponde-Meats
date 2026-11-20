import { NextRequest } from 'next/server';

export const DEFAULT_PASSCODE = 'ponde2026';

export function getAdminPasscode(): string {
  return process.env.ADMIN_PASSCODE || DEFAULT_PASSCODE;
}

/**
 * Checks whether the incoming request contains the valid admin passcode
 * in the X-Admin-Passcode header or Authorization bearer or query parameter.
 */
export function checkAdminPasscode(request: NextRequest): boolean {
  const expected = getAdminPasscode();
  if (!expected) return false;

  const headerCode = request.headers.get('x-admin-passcode');
  if (headerCode && headerCode.trim() === expected.trim()) {
    return true;
  }

  // Also support bearer token
  const authHeader = request.headers.get('authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7).trim();
    if (token === expected.trim()) return true;
  }

  // Query parameter fallback for direct browser verification
  const url = new URL(request.url);
  const queryCode = url.searchParams.get('passcode');
  if (queryCode && queryCode.trim() === expected.trim()) {
    return true;
  }

  return false;
}
