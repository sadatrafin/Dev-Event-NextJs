import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // If a connection is already established, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection promise doesn't exist, create a new one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }

  try {
    // Await the promise and cache the connection
    cached.conn = await cached.promise;
  } catch (e) {
    // Reset the promise on error so the next attempt can try again
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;