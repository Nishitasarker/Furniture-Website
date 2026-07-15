import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

if (!process.env.MONGO_DB_URI) throw new Error("MONGO_DB_URI is missing");

const client = new MongoClient(process.env.MONGO_DB_URI);

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: mongodbAdapter(client.db(process.env.AUTH_DB_NAME || "furniture_db")),
  emailAndPassword: { enabled: true },
  secret: process.env.BETTER_AUTH_SECRET!,
  trustedOrigins: ["https://e-commerce-app-seven-rho-12.vercel.app"]
});