import jwt from 'jsonwebtoken';

// Secret key should be in environment variables in a real app
const JWT_SECRET = process.env.JWT_SECRET || 'smart-parking-secret-key';
const JWT_EXPIRES_IN = '24h';

export interface JWTPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function signJWT(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

export function verifyJWT(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch (error) {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded: any = jwt.decode(token, { complete: true });
    if (!decoded) return true;

    const currentTime = Date.now() / 1000;
    return decoded.payload.exp < currentTime;
  } catch {
    return true;
  }
}
