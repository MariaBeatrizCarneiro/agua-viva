const { MongoClient } = require('mongodb');

const DEFAULT_DB_NAME = "agua-viva-db";
const URL = process.env.MONGO_URL ?? `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASS}@cluster0.hedi6sb.mongodb.net/agua-viva-db`
const PORT = process.env.PORT || 3000



let client

async function connectToMongo() {
  try {
    console.log(URL)
    if (!client) {
      client = await MongoClient.connect(URL)
      console.log('Connected to Mongo')
    }
    return client;
  } catch (err) {
    console.log(err)
  }
}

async function connectToCollection(collectionName, dbName = DEFAULT_DB_NAME) {
    const client = await connectToMongo();
    const db = client.db(dbName);
    return db.collection(collectionName);
}

async function closeMongoConnection() {
  try {
    if (client) {
      await client.close()
      client = null
      console.log("MongoDB connection closed.")
    }
  } catch (err) {
    console.log(err)
  }
}

process.on('SIGINT', async () => {
  await closeMongoConnection()
  process.exit(0)
})

process.on('exit', async () => {
  await closeMongoConnection()
})


module.exports = { connectToCollection };
