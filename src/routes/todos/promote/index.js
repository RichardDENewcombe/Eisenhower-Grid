import { connectToDatabase } from '$lib/db'
import { ObjectId } from 'mongodb'

export async function put(request) {
    try {
        const dbConnection = await connectToDatabase();
        const db = dbConnection.db;
        const collection = db.collection('sveltekit-eisenhowermatrix');

        const todo = JSON.parse(request.body);
        await collection.updateOne({
            _id: ObjectId(todo._id)}, {
                $set: { 
                    rank: todo.rank
                }});

        return {
            status: 200,
            body: {
                status: 'Success'
            }
        }
    } catch(err) {
        return {
            status: 500,
            body: {
                error: `A server error has occurred: ${err}`
            }
        }
    }
}