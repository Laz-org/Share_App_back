import { ObjectId } from "mongodb";
import { Loan_Request } from "../entities";
import { connection } from "./connection"


const collection = connection.db('share_app').collection<Loan_Request>('loan_request');

export const loan_requestRepository = {
    findAll(){
        return collection.find().toArray();
    },

    findById(_id:string) {
        return collection.findOne(new ObjectId(_id));
    },

    findByBorrower(id_borrower:string) {
        return collection.find({id_borrower:id_borrower}).toArray();
    },

    findByItem(id_item:string) {
        return collection.find({id_item:id_item}).toArray();
    },

    async persist(loan_request:Loan_Request) {
        const result= await collection.insertOne(loan_request);
        loan_request._id = result.insertedId; //On assigne l'id auto-généré à l'objet loan_request
        return loan_request;
    },

    remove(_id:string) {
        return collection.deleteOne({_id:new ObjectId(_id)});
    },
    
    update(_id:string, loan_request:Loan_Request) {
        return collection.updateOne({_id:new ObjectId(_id)}, {$set:loan_request});
    }
}