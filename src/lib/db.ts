import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_DB_URI!;
const DB_NAME = process.env.AUTH_DB_NAME || "furniture_db";

// গ্লোবাল ক্যাশ ব্যবহার করুন যাতে বারবার কানেকশন না হয়
const globalWithMongoose = global as typeof global & { mongoose: any };

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  if (!globalWithMongoose.mongoose) {
    globalWithMongoose.mongoose = mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
      bufferCommands: false,
    });
  }

  await globalWithMongoose.mongoose;
  console.log("✅ Mongoose Connected");
};