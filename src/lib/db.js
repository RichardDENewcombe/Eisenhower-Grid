import { MongoClient } from 'mongodb';

const MONGODB_URI = import.meta.env.VITE_MONGODB_URI
const MONGODB_DB = import.meta.env.VITE_MONGODB_DB
let cached = null;

const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

export async function connectToDatabase() {

    if (cached) {
        return cached;
    }

    try {
    const promise = await MongoClient.connect(MONGODB_URI, opts).then((client) => {
        return {
            client,
            db: client.db(MONGODB_DB)
        }
    });
    cached = promise;
    return await promise;
    } catch(err) {
            console.log(`A db connection error has occurred - ${err}`)
    }
}