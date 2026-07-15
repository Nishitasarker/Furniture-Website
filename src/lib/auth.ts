import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

if (!process.env.MONGO_DB_URI) throw new Error("MONGO_DB_URI is missing");

const client = new MongoClient(process.env.MONGO_DB_URI);

const baseURL = (process.env.BETTER_AUTH_URL || "").trim().replace(/\/$/, "");
if (!baseURL) throw new Error("BETTER_AUTH_URL is missing");

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
if (!googleClientId || !googleClientSecret) {
  throw new Error("Google OAuth credentials are missing");
}

export const auth = betterAuth({
  baseURL,
  database: mongodbAdapter(client.db(process.env.AUTH_DB_NAME || "furniture_db")),
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    },
  },
  secret: process.env.BETTER_AUTH_SECRET!,
  trustedOrigins: [baseURL],
});