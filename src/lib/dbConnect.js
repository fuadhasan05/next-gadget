import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const collectionNameObj = {
  productsCollection: "products"
}

// ensure single connection reuse in dev/hot reload
let clientPromise;

if (!global._mongoClientPromise) {
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default async function dbConnect(collectionName) {
  const conn = await clientPromise;
  return conn.db(process.env.DB_NAME).collection(collectionName);
}
