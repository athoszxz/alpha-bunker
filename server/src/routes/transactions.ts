import { CreateTransaction } from "../controllers";
import Router from "express";

const route = Router();

route.route("/transactions")
    .post(new CreateTransaction().handle.bind(new CreateTransaction()));

export default route;

/*
password correct
{
    "agency": 444,
    "agency_dig": 4,
    "number": 44444,
    "number_dig": 4,
    "cpf": 78952866355,
    "password": "123456",
    "agency_dest": 123,
    "agency_dest_dig": 4,
    "number_dest": 45678,
    "number_dest_dig": 9,
    "cpf_dest": 45647855625,
    "amount": 50
}
*/