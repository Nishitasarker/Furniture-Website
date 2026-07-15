import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_DB_URI!;
const DB_NAME = process.env.AUTH_DB_NAME || "furniture_db";

const globalWithMongoose = global as typeof global & { mongoose: any };

export const connectDB = async () => {
  
  if (mongoose.connection.readyState >= 1) return;

  
  if (!globalWithMongoose.mongoose) {
    globalWithMongoose.mongoose = mongoose.connect(MONGODB_URI, {
      dbName: DB_NAME,
      bufferCommands: false, 
    });
  }

  try {
    
    await globalWithMongoose.mongoose;
    console.log("✅ Mongoose Connected");
  } catch (error) {
       globalWithMongoose.mongoose = null;
    throw error;
  }
};