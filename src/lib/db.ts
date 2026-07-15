import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_DB_URI!;
const DB_NAME = process.env.AUTH_DB_NAME || "furniture_db";

const globalWithMongoose = global as typeof global & { mongoose: any };

export const connectDB = async () => {
  // যদি অলরেডি কানেক্টেড থাকে
  if (mongoose.connection.readyState >= 1) return;

  // কানেকশন প্রমিস সেট করা
  if (!globalWithMongoose.mongoose) {
    globalWithMongoose.mongoose = mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
      bufferCommands: false, // এটি ফলস থাকলে অবশ্যই await নিশ্চিত করতে হবে
    });
  }

  try {
    // প্রমিসটি রিজলভ হওয়া পর্যন্ত অপেক্ষা করুন
    await globalWithMongoose.mongoose;
    console.log("✅ Mongoose Connected");
  } catch (error) {
    // এরর হলে গ্লোবাল ক্যাশ ক্লিয়ার করুন যাতে পরেরবার আবার চেষ্টা করা যায়
    globalWithMongoose.mongoose = null;
    throw error;
  }
};