import { MongoClient } from "mongodb";

//Connexion à la base de données mongodb en se servant d'une variable d'environnement qui sera dans le .env
export const connection = new MongoClient(process.env.DATABASE_URL!);

const cleanup = () => {
    connection.close();
    process.exit();
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);