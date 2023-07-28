import { ObjectId } from "mongodb";
import { Item } from "../entities";
import { connection } from "./connection"


const collection = connection.db('share_app').collection<Item>('item');

export const itemRepository = {
    findAll(){
        return collection.find().toArray();
    },

    findById(_id:string) {
        return collection.findOne(new ObjectId(_id));
    },

    findByOwner(id_owner:string) {
        return collection.find({id_owner:id_owner}).toArray();
    },

    async persist(item:Item) {
        const result= await collection.insertOne(item);
        item._id = result.insertedId; //On assigne l'id auto-généré à l'objet item
        return item;
    },

    remove(_id:string) {
        return collection.deleteOne({_id:new ObjectId(_id)});
    },
    
    update(_id:string, item:Item) {
        return collection.updateOne({_id:new ObjectId(_id)}, {$set:item});
    }
}