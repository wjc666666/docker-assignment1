const { MongoClient } = require('mongodb');
const fs = require('fs');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();
        const database = client.db('tmdb_movies');  
        const movies = JSON.parse(fs.readFileSync('seeding.json', 'utf8')); 
        const collection = database.collection('movies'); 
        const result = await collection.insertMany(movies);
        console.log(`${result.insertedCount} documents were inserted`);
    } catch (error) {
        console.error(error);
    } finally {
        await client.close();
    }
}

run().catch(console.error);
console.log(`Connecting to database at ${uri}`); 
await client.connect();
console.log("Connected successfully to MongoDB");

