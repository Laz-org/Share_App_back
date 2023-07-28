import { Router } from "express";
import { userRepository } from "../repository/user-repository";
import Joi from "joi";


export const userController = Router();

userController.get('/', async (req,res) => {
    const users = await userRepository.findAll();
    res.json(users);
});

userController.get('/:id', async (req,res) => {
    
    const user = await userRepository.findById(req.params.id);
    if(!user) {
        res.status(404).end('Not Found');
        return;
    }
    res.json(user);
});

userController.get('/name/:name', async (req,res) => {
    
    const user = await userRepository.findByName(req.params.name);
    if(!user) {
        res.status(404).end('Not Found');
        return;
    }
    res.json(user);
});

userController.post('/', async (req,res) => {
    const validation = userValidation.validate(req.body, {abortEarly:false});
    if(validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    const user = await userRepository.persist(req.body);
    res.status(201).json(user);
});

userController.delete('/:id', async (req,res)=> {
    await userRepository.remove(req.params.id);
    res.status(204).end();
});


userController.patch('/:id', async (req,res)=> {
    const validation = userPatchValidation.validate(req.body, {abortEarly:false});
    if(validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    await userRepository.update(req.params.id, req.body);
    res.json(req.body);
});


const userValidation = Joi.object({
    name: Joi.string().required(),
    address: Joi.object( {
        number: Joi.string(),
        street: Joi.string(),
        city: Joi.string(),
        country: Joi.string()
    }).required()
});

const userPatchValidation = Joi.object({
    name: Joi.string(),
    address: Joi.object( {
        number: Joi.string(),
        street: Joi.string(),
        city: Joi.string(),
        country: Joi.string()
    })
});