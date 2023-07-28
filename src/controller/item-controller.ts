import { Router } from "express";
import { itemRepository } from "../repository/item-repository";
import Joi from "joi";


export const itemController = Router();

itemController.get('/', async (req,res) => {
    const items = await itemRepository.findAll();
    res.json(items);
});

itemController.get('/:id', async (req,res) => {
    
    const item = await itemRepository.findById(req.params.id);
    if(!item) {
        res.status(404).end('Not Found');
        return;
    }
    res.json(item);
});

itemController.get('/owner/:id_owner', async (req,res) => {
    
    const item = await itemRepository.findByOwner(req.params.id_owner);
    if(!item) {
        res.status(404).end('Not Found');
        return;
    }
    res.json(item);
});

itemController.post('/', async (req,res) => {
    const validation = itemValidation.validate(req.body, {abortEarly:false});
    if(validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    const item = await itemRepository.persist(req.body);
    res.status(201).json(item);
});

itemController.delete('/:id', async (req,res)=> {
    await itemRepository.remove(req.params.id);
    res.status(204).end();
});


itemController.patch('/:id', async (req,res)=> {
    const validation = itemPatchValidation.validate(req.body, {abortEarly:false});
    if(validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    await itemRepository.update(req.params.id, req.body);
    res.json(req.body);
});


const itemValidation = Joi.object({
    item_name: Joi.string().required(),
    type: Joi.string().required(),
    id_owner: Joi.any().required(),
    available: Joi.boolean().required()
});

const itemPatchValidation = Joi.object({
    item_name: Joi.string(),
    type: Joi.string(),
    id_owner: Joi.any(),
    available: Joi.boolean()
});