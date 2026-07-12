import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// গ্লোবাল ক্যাশ সঠিকভাবে হ্যান্ডেল করা
const globalWithMongo = global as typeof global & {
  _mongoClient?: MongoClient;
};

let client: MongoClient;

if (!globalWithMongo._mongoClient) {
  globalWithMongo._mongoClient = new MongoClient(process.env.MONGO_DB_URI!, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
  });
}
client = globalWithMongo._mongoClient;

export const auth = betterAuth({
  database: mongodbAdapter(client.db(process.env.AUTH_DB_NAME), {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.BETTER_AUTH_SECRET,
});