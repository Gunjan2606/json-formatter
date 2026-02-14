"use client";

import { useState, useMemo, useCallback } from "react";
import jwt from "jsonwebtoken";

export type Algorithm = "HS256" | "HS384" | "HS512" | "RS256" | "RS384" | "RS512" | "ES256" | "ES384" | "ES512";

export interface DecodedJWT {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
  isValid: boolean;
  raw: {
    header: string;
    payload: string;
    signature: string;
  };
  warnings: SecurityWarning[];
}

export interface SecurityWarning {
  type: "critical" | "warning" | "info";
  message: string;
  field?: string;
}

const STANDARD_CLAIMS: Record<string, string> = {
  iss: "Issuer - identifies the principal that issued the JWT",
  sub: "Subject - identifies the principal that is the subject of the JWT",
  aud: "Audience - identifies the recipients that the JWT is intended for",
  exp: "Expiration Time - time after which the JWT must not be accepted",
  nbf: "Not Before - time before which the JWT must not be accepted",
  iat: "Issued At - time at which the JWT was issued",
  jti: "JWT ID - unique identifier for the JWT",
};

function analyzeSecurityWarnings(decoded: { header: { alg?: string }; payload: string | { exp?: number; nbf?: number; [key: string]: unknown } }): SecurityWarning[] {
  const warnings: SecurityWarning[] = [];

  // If payload is a string, we can't analyze it
  if (typeof decoded.payload === "string") {
    return warnings;
  }

  // Check algorithm
  if (decoded.header.alg === "none") {
    warnings.push({
      type: "critical",
      message: "Algorithm is 'none' - signature verification disabled! This is a critical security risk.",
      field: "alg",
    });
  }

  // Check expiration
  if (!decoded.payload.exp) {
    warnings.push({
      type: "warning",
      message: "Missing 'exp' (expiration) claim - token never expires. Recommended to set expiration.",
      field: "exp",
    });
  } else {
    const now = Math.floor(Date.now() / 1000);
    if (decoded.payload.exp < now) {
      warnings.push({
        type: "warning",
        message: `Token expired ${new Date(decoded.payload.exp * 1000).toLocaleString()}`,
        field: "exp",
      });
    }
  }

  // Check nbf
  if (decoded.payload.nbf) {
    const now = Math.floor(Date.now() / 1000);
    if (decoded.payload.nbf > now) {
      warnings.push({
        type: "info",
        message: `Token not valid before ${new Date(decoded.payload.nbf * 1000).toLocaleString()}`,
        field: "nbf",
      });
    }
  }

  // Check for sensitive data patterns
  const payloadString = JSON.stringify(decoded.payload).toLowerCase();
  const sensitivePatterns = ["password", "ssn", "credit", "card", "secret", "private"];

  sensitivePatterns.forEach((pattern) => {
    if (payloadString.includes(pattern)) {
      warnings.push({
        type: "warning",
        message: `Possible sensitive data detected: "${pattern}". JWTs are not encrypted - avoid storing sensitive data.`,
      });
    }
  });

  // Check token size
  const tokenSize = JSON.stringify(decoded).length;
  if (tokenSize > 8192) {
    warnings.push({
      type: "info",
      message: `Large token size (${tokenSize} bytes). Consider reducing payload size for better performance.`,
    });
  }

  return warnings;
}

function decodeJWT(token: string): DecodedJWT | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid JWT format - must have 3 parts");
    }

    const decoded = jwt.decode(token, { complete: true });
    if (!decoded) {
      throw new Error("Failed to decode JWT");
    }

    const warnings = analyzeSecurityWarnings(decoded);

    return {
      header: decoded.header as unknown as Record<string, unknown>,
      payload: typeof decoded.payload === "string" ? {} : (decoded.payload as unknown as Record<string, unknown>),
      signature: parts[2],
      isValid: false, // Will be updated during verification
      raw: {
        header: parts[0],
        payload: parts[1],
        signature: parts[2],
      },
      warnings,
    };
  } catch (error) {
    console.error("Decode error:", error);
    return null;
  }
}

function verifyJWT(token: string, secret: string, algorithm: Algorithm): { valid: boolean; error?: string } {
  try {
    jwt.verify(token, secret, { algorithms: [algorithm] });
    return { valid: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return { valid: false, error: errorMessage };
  }
}

function generateJWT(header: Record<string, unknown>, payload: Record<string, unknown>, secret: string, algorithm: Algorithm): string {
  try {
    return jwt.sign(payload, secret, {
      algorithm,
      header: header as { alg: string; [key: string]: unknown },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to generate JWT: ${errorMessage}`);
  }
}

export function useJWTDecoder() {
  const [token, setToken] = useState("");
  const [secret, setSecret] = useState("");
  const [algorithm, setAlgorithm] = useState<Algorithm>("HS256");
  const [generatedToken, setGeneratedToken] = useState("");

  const decoded = useMemo(() => {
    if (!token) return null;
    return decodeJWT(token);
  }, [token]);

  const verified = useMemo(() => {
    if (!token || !secret) return null;
    return verifyJWT(token, secret, algorithm);
  }, [token, secret, algorithm]);

  const generate = useCallback(
    (header: Record<string, unknown>, payload: Record<string, unknown>) => {
      if (!secret) {
        throw new Error("Secret is required");
      }
      const newToken = generateJWT(header, payload, secret, algorithm);
      setGeneratedToken(newToken);
      return newToken;
    },
    [secret, algorithm]
  );

  const clear = useCallback(() => {
    setToken("");
    setSecret("");
    setGeneratedToken("");
  }, []);

  return {
    token,
    setToken,
    secret,
    setSecret,
    algorithm,
    setAlgorithm,
    decoded,
    verified,
    generate,
    generatedToken,
    clear,
    STANDARD_CLAIMS,
  };
}
