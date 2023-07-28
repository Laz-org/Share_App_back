export interface Address{
    number:string;
    street:string;
    city:string;
    country:string;
}

export interface User {
    _id?:any;
    name:string;
    address:Address;
}

export interface Item {
    _id?:any;
    item_name:string;
    type:string;
    id_owner:any;
    available:boolean;
}

export interface Loan_Request {
    _id?:any;
    id_borrower:any;
    id_item:any;
    start_loan_date:string;
    end_loan_date:string;
    pending: boolean;
    message: string;
}