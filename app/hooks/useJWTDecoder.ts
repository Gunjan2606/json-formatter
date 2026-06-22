"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { decodeJwt, decodeProtectedHeader, jwtVerify, SignJWT } from "jose";

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

function analyzeSecurityWarnings(decoded: {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
}): SecurityWarning[] {
  const warnings: SecurityWarning[] = [];

  if (decoded.header.alg === "none") {
    warnings.push({
      type: "critical",
      message: "Algorithm is 'none' - signature verification disabled! This is a critical security risk.",
      field: "alg",
    });
  }

  if (!decoded.payload.exp) {
    warnings.push({
      type: "warning",
      message: "Missing 'exp' (expiration) claim - token never expires. Recommended to set expiration.",
      field: "exp",
    });
  } else {
    const now = Math.floor(Date.now() / 1000);
    if ((decoded.payload.exp as number) < now) {
      warnings.push({
        type: "warning",
        message: `Token expired ${new Date((decoded.payload.exp as number) * 1000).toLocaleString()}`,
        field: "exp",
      });
    }
  }

  if (decoded.payload.nbf) {
    const now = Math.floor(Date.now() / 1000);
    if ((decoded.payload.nbf as number) > now) {
      warnings.push({
        type: "info",
        message: `Token not valid before ${new Date((decoded.payload.nbf as number) * 1000).toLocaleString()}`,
        field: "nbf",
      });
    }
  }

  const payloadString = JSON.stringify(decoded.payload).toLowerCase();
  const sensitivePatterns = ["password", "ssn", "credit", "card", "secret", "private"];
  sensitivePatterns.forEach((pat) => {
    if (payloadString.includes(pat)) {
      warnings.push({
        type: "warning",
        message: `Possible sensitive data detected: "${pat}". JWTs are not encrypted - avoid storing sensitive data.`,
      });
    }
  });

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
    const parts = token.trim().split(".");
    if (parts.length !== 3) {
      throw new Error("Invalid JWT format - must have 3 parts");
    }

    const header = decodeProtectedHeader(token) as Record<string, unknown>;
    const payload = decodeJwt(token) as Record<string, unknown>;
    const warnings = analyzeSecurityWarnings({ header, payload });

    return {
      header,
      payload,
      signature: parts[2],
      isValid: false,
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

async function verifyJWT(
  token: string,
  secret: string,
  algorithm: Algorithm
): Promise<{ valid: boolean; error?: string }> {
  if (!algorithm.startsWith("HS")) {
    return {
      valid: false,
      error:
        "RS/ES algorithm verification requires a PEM public key. Only HS256/384/512 are supported for browser-based verification.",
    };
  }
  try {
    const key = new TextEncoder().encode(secret);
    await jwtVerify(token, key, { algorithms: [algorithm] });
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      error: error instanceof Error ? error.message : "Verification failed",
    };
  }
}

async function generateJWT(
  header: Record<string, unknown>,
  payload: Record<string, unknown>,
  secret: string,
  algorithm: Algorithm
): Promise<string> {
  if (!algorithm.startsWith("HS")) {
    throw new Error(
      "RS/ES algorithm generation requires PEM key pairs. Only HS256/384/512 are supported."
    );
  }
  const key = new TextEncoder().encode(secret);
  return await new SignJWT(payload)
    .setProtectedHeader({ ...header, alg: algorithm })
    .sign(key);
}

export function useJWTDecoder() {
  const [token, setToken] = useState("");
  const [secret, setSecret] = useState("");
  const [algorithm, setAlgorithm] = useState<Algorithm>("HS256");
  const [generatedToken, setGeneratedToken] = useState("");
  const [verified, setVerified] = useState<{ valid: boolean; error?: string } | null>(null);

  const decoded = useMemo(() => {
    if (!token) return null;
    return decodeJWT(token);
  }, [token]);

  // Verify asynchronously whenever token, secret, or algorithm changes
  useEffect(() => {
    if (!token || !secret) {
      setVerified(null);
      return;
    }
    verifyJWT(token, secret, algorithm).then(setVerified);
  }, [token, secret, algorithm]);

  const generate = useCallback(
    async (header: Record<string, unknown>, payload: Record<string, unknown>) => {
      if (!secret) throw new Error("Secret is required");
      const newToken = await generateJWT(header, payload, secret, algorithm);
      setGeneratedToken(newToken);
      return newToken;
    },
    [secret, algorithm]
  );

  const clear = useCallback(() => {
    setToken("");
    setSecret("");
    setGeneratedToken("");
    setVerified(null);
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
