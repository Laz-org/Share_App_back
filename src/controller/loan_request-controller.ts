import { Router } from "express";
import { loan_requestRepository } from "../repository/loan_request-repository";
import Joi from "joi";


export const loan_requestController = Router();

loan_requestController.get('/', async (req,res) => {
    const loan_requests = await loan_requestRepository.findAll();
    res.json(loan_requests);
});

loan_requestController.get('/:id', async (req,res) => {
    
    const loan_request = await loan_requestRepository.findById(req.params.id);
    if(!loan_request) {
        res.status(404).end('Not Found');
        return;
    }
    res.json(loan_request);
});

loan_requestController.get('/borrower/:id_borrower', async (req,res) => {
    
    const loan_request = await loan_requestRepository.findByBorrower(req.params.id_borrower);
    if(!loan_request) {
        res.status(404).end('Not Found');
        return;
    }
    res.json(loan_request);
});

loan_requestController.get('/item/:id_item', async (req,res) => {
    
    const loan_request = await loan_requestRepository.findByItem(req.params.id_item);
    if(!loan_request) {
        res.status(404).end('Not Found');
        return;
    }
    res.json(loan_request);
});

loan_requestController.post('/', async (req,res) => {
    const validation = loan_requestValidation.validate(req.body, {abortEarly:false});
    if(validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    const loan_request = await loan_requestRepository.persist(req.body);
    res.status(201).json(loan_request);
});

loan_requestController.delete('/:id', async (req,res)=> {
    await loan_requestRepository.remove(req.params.id);
    res.status(204).end();
});


loan_requestController.patch('/:id', async (req,res)=> {
    const validation = loan_requestPatchValidation.validate(req.body, {abortEarly:false});
    if(validation.error) {
        res.status(400).json(validation.error);
        return;
    }
    await loan_requestRepository.update(req.params.id, req.body);
    res.json(req.body);
});


const loan_requestValidation = Joi.object({
    id_borrower: Joi.any().required(),
    id_item: Joi.any().required(),
    start_loan_date: Joi.any().required(),
    end_loan_date: Joi.any().required(),
    pending: Joi.boolean().required(),
    message: Joi.string().required()
});

const loan_requestPatchValidation = Joi.object({
    id_borrower: Joi.any(),
    id_item: Joi.any(),
    start_loan_date: Joi.any(),
    end_loan_date: Joi.any(),
    pending: Joi.boolean(),
    message: Joi.string()
});