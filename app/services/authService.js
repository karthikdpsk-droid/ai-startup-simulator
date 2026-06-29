/**
 * Auth Service for JWT simulation.
 */
import { SignJWT, jwtVerify } from "jose";

const SECRET = new TextEncoder().encode("secretkey"); // In real apps, use env

export const generateToken = async (payload) => {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(SECRET);
};

export const verifyToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch {
    return null;
  }
};

// Mock bcrypt (for demo purposes)
export const hashPassword = async (pw) => `hashed_${pw}`;
export const comparePassword = async (pw, hashed) => `hashed_${pw}` === hashed;
