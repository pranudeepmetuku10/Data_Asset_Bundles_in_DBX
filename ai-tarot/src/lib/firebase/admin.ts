import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function normalizePrivateKey(raw: string | undefined): string {
  if (!raw) return "";

  // Common cases:
  // - JSON contains "\\n" sequences
  // - JSON contains real newlines
  // - header/footer present but newlines around them were removed
  let k = raw.trim().replace(/\\n/g, "\n");

  if (k.includes("-----BEGIN PRIVATE KEY-----") && !k.includes("\n")) {
    k = k
      .replace("-----BEGIN PRIVATE KEY-----", "-----BEGIN PRIVATE KEY-----\n")
      .replace("-----END PRIVATE KEY-----", "\n-----END PRIVATE KEY-----\n");
  }

  // Ensure header/footer are on their own lines when present.
  k = k
    .replace(/-----BEGIN PRIVATE KEY-----\s*/g, "-----BEGIN PRIVATE KEY-----\n")
    .replace(/\s*-----END PRIVATE KEY-----/g, "\n-----END PRIVATE KEY-----");

  return k;
}

function getServiceAccountOrNull() {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as {
      project_id: string;
      client_email: string;
      private_key: string;
    };
  } catch {
    throw new Error("Invalid FIREBASE_SERVICE_ACCOUNT_JSON (must be JSON).");
  }
}

function requireAdminApp() {
  const existing = getApps();
  if (existing.length > 0) return existing[0]!;

  const serviceAccount = getServiceAccountOrNull();
  if (!serviceAccount) {
    throw new Error("Missing env: FIREBASE_SERVICE_ACCOUNT_JSON");
  }
  if (!serviceAccount.private_key || !serviceAccount.private_key.includes("PRIVATE KEY")) {
    throw new Error(
      "FIREBASE_SERVICE_ACCOUNT_JSON.private_key is missing or malformed. Re-copy the service account JSON exactly (do not edit the private_key field).",
    );
  }

  return initializeApp({
    credential: cert({
      projectId: serviceAccount.project_id,
      clientEmail: serviceAccount.client_email,
      privateKey: normalizePrivateKey(serviceAccount.private_key),
    }),
  });
}

export function getAdminAuth() {
  return getAuth(requireAdminApp());
}

export function getAdminDb() {
  return getFirestore(requireAdminApp());
}

