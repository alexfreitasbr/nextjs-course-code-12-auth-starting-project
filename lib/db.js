import { MongoClient } from "mongodb";

export async function connectToDatabase(){
    const client = await MongoClient.connect('mongodb+srv://alexfreitasbr:OWSYQBbOU3X8EpQl@next.ni5ex3b.mongodb.net/profiledb?retryWrites=true&w=majority&appName=Next')
    return client
}